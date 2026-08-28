// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ProductsApiService } from '@/lib/api/products';
import { calculateRetailPrice, getReleaseYear } from '@/lib/pricing';

function getBrand(product: { manufacturer_text?: string; name: string }): 'Apple' | 'Samsung' | 'Google' | 'Other' {
  const brand = product.manufacturer_text || product.name;
  if (/apple|iphone/i.test(brand)) return 'Apple';
  if (/samsung|galaxy/i.test(brand)) return 'Samsung';
  if (/google|pixel/i.test(brand)) return 'Google';
  return 'Other';
}

/**
 * DYNAMIC CLEANING ENGINE:
 * Automatically formats variations into exact Wikipedia page titles on the fly.
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

  const cleanBrand = (brand || '').trim();
  const cleanModelFallback = (model || '').trim();
  return `${cleanBrand} ${cleanModelFallback}`
    .replace(/\(.*?\)/g, '')                     
    .replace(/lcd|compatible|battery|screen|assembly/i, '')  
    .replace(/[^a-zA-Z0-9\s-]/g, '')               
    .trim();
}

/**
 * FETCH LAYER (WIKIPEDIA FALLBACK):
 * Queries the live Open MediaWiki engine for device page thumbnails if product images are missing.
 */
async function fetchWikipediaDeviceImage(brand: string, model: string): Promise<string | null> {
  const wikiTargetTitle = mapProductToWikipediaTitle(brand, model);

  try {
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
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
    console.error(`Wikipedia Engine fallback error for title: ${wikiTargetTitle}`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() || '';

  if (!query) return NextResponse.json([]);

  try {
    // 1. Fetch products using your service layer
    const products = await new ProductsApiService().getProducts({
      limit: '15',
      page: '1',
      search: query,
    });

    // 2. Map results concurrently to process pricing and fetch fallback images if needed
    const results = await Promise.all(
      products.flatMap(async (product) => {
        const supplierCost = Number(product.special_price ?? product.price);
        const releaseYear = getReleaseYear(product.name);
        if (!releaseYear || !Number.isFinite(supplierCost) || supplierCost <= 0) return [];

        const pricing = calculateRetailPrice({
          landedCost: supplierCost,
          releaseYear,
          brand: getBrand(product),
        });

        const brandName = product.manufacturer_text || getBrand(product);
        const modelName = product.device_model_text || product.model_text || product.name;

        // Check native images first; if missing, fall back to the Wikipedia scraper engine
       let displayImage: string | null = product.image_url || product.default_image || null;
        if (!displayImage) {
          displayImage = await fetchWikipediaDeviceImage(brandName, modelName);
        }

        return [{
          id: product.entity_id,
          sku: product.sku,
          name: product.name,
          price: pricing.price.toFixed(2),
          brand: getBrand(product),
          deviceModel: modelName,
          displayImage: displayImage || '/images/no-image.png',
          releaseYear,
        }];
      })
    );

    // Flatten results array since flatMap inside Promise.all can produce nested arrays
    return NextResponse.json(results.flat());

  } catch (error) {
    console.error('MobileSentrix device search failed:', error);
    return NextResponse.json({ error: 'Device search is unavailable.' }, { status: 502 });
  }
}
