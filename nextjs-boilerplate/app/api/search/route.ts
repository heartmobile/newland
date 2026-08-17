// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 1. Pull secure configuration from environment variables
const BASE_URL = process.env.MOBILESENTRIX_BASE_URL || 'https://mobilesentrix.com'; // Adjust to your specific API host if different
const CONSUMER_KEY = process.env.MOBILESENTRIX_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.MOBILESENTRIX_CONSUMER_SECRET || '';
const ACCESS_TOKEN = process.env.MOBILESENTRIX_ACCESS_TOKEN || '';
const ACCESS_TOKEN_SECRET = process.env.MOBILESENTRIX_ACCESS_TOKEN_SECRET || '';

/**
 * STRATEGY MAPPING LAYER:
 * Converts raw product text into accurate, authoritative Wikipedia Article Titles.
 */
function mapProductToWikipediaTitle(brand: string, model: string): string {
  const cleanBrand = (brand || '').toLowerCase().trim();
  const cleanModel = (model || '').toLowerCase().trim();

  // Rule 1: Specific Apple generational remapping
  if (cleanBrand === 'apple' || cleanModel.includes('ipad') || cleanModel.includes('iphone')) {
    if (cleanModel === 'ipad 2') return 'iPad (2nd generation)';
    if (cleanModel === 'ipad 3') return 'iPad (3rd generation)';
    if (cleanModel === 'ipad 4') return 'iPad (4th generation)';
    if (cleanModel === 'iphone 15 pro') return 'iPhone 15 Pro';
    return model || 'iPhone';
  }

  // Rule 2: Corporate brand isolation adjustments
  if (cleanBrand === 'google') return 'Google Pixel';
  if (cleanBrand === 'samsung') return 'Samsung Galaxy';
  if (cleanBrand === 'motorola') return 'Motorola Mobility';

  return model || brand || 'Smartphone';
}

/**
 * FETCH LAYER (WIKIPEDIA):
 * Contacts the explicit MediaWiki engine for high-res device thumbnails
 */
async function fetchWikipediaDeviceImage(brand: string, model: string): Promise<string | null> {
  const wikiTargetTitle = mapProductToWikipediaTitle(brand, model);

  try {
    const wikiUrl = `https://wikipedia.org{encodeURIComponent(
      wikiTargetTitle
    )}&prop=pageimages&format=json&pithumbsize=400&origin=*`;

    const res = await fetch(wikiUrl);
    if (!res.ok) return null;

    const data = await res.json();
    const pages = data.query?.pages;

    if (pages) {
      const pageId = Object.keys(pages);
      if (pageId && pageId !== "-1" && pages[pageId].thumbnail) {
        return pages[pageId].thumbnail.source;
      }
    }
    return null;
  } catch (error) {
    console.error(`Wikipedia Mapping Engine failed for: ${wikiTargetTitle}`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    // 2. Build the live REST URL as requested in Image 1 & 3
    // Pulls maximum 15 items and filters by device matching text parameters
    const liveApiUrl = `${BASE_URL}/api/rest/products?limit=15&page=1&pageinfo=1&search=${encodeURIComponent(query)}`;

    // 3. Mount pre-requirement authorization tokens as specified in Image 1
    const mobileSentrixResponse = await fetch(liveApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // Pass validation security credentials cleanly on every request cycle
        'X-Consumer-Key': CONSUMER_KEY,
        'X-Consumer-Secret': CONSUMER_SECRET,
        'X-Access-Token': ACCESS_TOKEN,
        'X-Access-Token-Secret': ACCESS_TOKEN_SECRET,
      },
      next: { revalidate: 30 } // Cache inventory states for 30 seconds to speed up typing
    });

    if (!mobileSentrixResponse.ok) {
      throw new Error(`MobileSentrix API rejected connection with status: ${mobileSentrixResponse.status}`);
    }

    const rawData = await mobileSentrixResponse.json();
    
    // Flatten dictionary format if incoming object records are keyed by ID integers
    const productsArray = Array.isArray(rawData) ? rawData : Object.values(rawData);

    // 4. Parallel asynchronous fetching mapping directly to the live data response arrays
    const integratedResults = await Promise.all(
      productsArray.map(async (product: any) => {
        const wikiImage = await fetchWikipediaDeviceImage(
          product.manufacturer_text, 
          product.model_text
        );

        return {
          id: product.entity_id,
          sku: product.sku,
          name: product.name,
          price: parseFloat(product.price || '0').toFixed(2),
          brand: product.manufacturer_text || 'Generic',
          deviceModel: product.model_text || 'Hardware',
          displayImage: wikiImage || product.default_image || '/images/no-image.png'
        };
      })
    );

    return NextResponse.json(integratedResults);

  } catch (error: any) {
    console.error("Live integration search failure:", error.message);
    return NextResponse.json({ error: 'Failed to stream live results' }, { status: 500 });
  }
}
