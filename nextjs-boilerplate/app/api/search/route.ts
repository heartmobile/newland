// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

// 1. Core integration environment variables
const BASE_URL = process.env.MOBILESENTRIX_BASE_URL || 'https://mobilesentrix.com';
const CONSUMER_KEY = process.env.MOBILESENTRIX_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.MOBILESENTRIX_CONSUMER_SECRET || '';
const ACCESS_TOKEN = process.env.MOBILESENTRIX_ACCESS_TOKEN || '';
const ACCESS_TOKEN_SECRET = process.env.MOBILESENTRIX_ACCESS_TOKEN_SECRET || '';

/**
 * DYNAMIC CLEANING ENGINE:
 * Automatically formats variations into exact Wikipedia page titles on the fly.
 * No hardcoded device lists needed.
 */
function mapProductToWikipediaTitle(brand: string, model: string): string {
  if (model && model.trim().length > 0) {
    const cleanModel = model.trim();
    
    // Automatically catches all iPads and appends correct grammatical generation suffixes
    if (/^ipad\s+\d+$/i.test(cleanModel)) {
      const match = cleanModel.match(/\d+/);
      const digit = match ? match[0] : '';
      
      let suffix = 'th';
      if (digit === '1') suffix = 'st';
      if (digit === '2') suffix = 'nd';
      if (digit === '3') suffix = 'rd';

      return `iPad (${digit}${suffix} generation)`; 
    }
    return cleanModel;
  }

  // Fallback string scrubber if base model_text fields ever return missing or empty values
  const cleanBrand = (brand || '').trim();
  const cleanModelFallback = (model || '').trim();
  return `${cleanBrand} ${cleanModelFallback}`
    .replace(/\(.*?\)/g, '')                     
    .replace(/lcd|compatible|battery|screen|assembly/i, '') 
    .replace(/[^a-zA-Z0-9\s-]/g, '')             
    .trim();
}

/**
 * FETCH LAYER (WIKIPEDIA):
 * Queries the live Open MediaWiki engine for primary device page thumbnails
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
      if (pageId && pageId[0] !== "-1" && pages[pageId[0]].thumbnail) {
        return pages[pageId[0]].thumbnail.source;
      }
    }
    return null;
  } catch (error) {
    console.error(`Wikipedia Engine bypass for title: ${wikiTargetTitle}`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    // 2. Formulate production URL paths matching your inventory API documentation
    const liveApiUrl = `${BASE_URL}/api/rest/products?limit=15&page=1&pageinfo=1&search=${encodeURIComponent(query)}`;

    // 3. Mount pre-requirement credentials to authenticate the inbound request stream
    const mobileSentrixResponse = await fetch(liveApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Consumer-Key': CONSUMER_KEY,
        'X-Consumer-Secret': CONSUMER_SECRET,
        'X-Access-Token': ACCESS_TOKEN,
        'X-Access-Token-Secret': ACCESS_TOKEN_SECRET,
      },
      next: { revalidate: 30 } 
    });

    if (!mobileSentrixResponse.ok) {
      throw new Error(`MobileSentrix server responded with code: ${mobileSentrixResponse.status}`);
    }

    const rawData = await mobileSentrixResponse.json();
    
    // Support object dictionaries and indexed lists uniformly
    const productsArray = Array.isArray(rawData) ? rawData : Object.values(rawData);

    // 4. Concurrently pull Wikipedia images for all filtered results in parallel
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
    console.error("Live lookup routing exception:", error.message);
    return NextResponse.json({ error: 'Failed to complete query execution' }, { status: 500 });
  }
}
