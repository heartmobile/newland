// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

// This is your raw MobileSentrix product shape mock data dictionary
const mobileSentrixProducts: Record<string, any> = {
  "73": {
    "entity_id": "73",
    "sku": "107082005005",
    "name": "LCD Compatible For iPad 2 (Premium) asdwqeqsad",
    "price": "33.4000",
    "manufacturer_text": "Apple",
    "model_text": "iPad 2",
    "default_image": "https://mobilesentrix.com"
  },
  "74": {
    "entity_id": "74",
    "sku": "107082005039",
    "name": "Replacement battery Compatible For iPad 2 (Premium)",
    "price": "12.1900",
    "manufacturer_text": "Apple",
    "model_text": "iPad 2",
    "default_image": "https://mobilesentrix.com"
  }
};

/**
 * STRATEGY MAPPING LAYER:
 * Converts raw product meta-strings into exact, authoritative Wikipedia Article Titles.
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
    // Fallback default if it's an unmapped Apple device
    return model || 'iPhone';
  }

  // Rule 2: Corporate brand isolation adjustments
  if (cleanBrand === 'google') return 'Google Pixel';
  if (cleanBrand === 'samsung') return 'Samsung Galaxy';
  if (cleanBrand === 'motorola') return 'Motorola Mobility';

  // Rule 3: Catch-all fallback default 
  return model || brand || 'Smartphone';
}

/**
 * FETCH LAYER:
 * Contacts the explicit MediaWiki engine for high-res device thumbnails
 */
async function fetchWikipediaDeviceImage(brand: string, model: string): Promise<string | null> {
  // Resolve our clean mapped title target
  const wikiTargetTitle = mapProductToWikipediaTitle(brand, model);

  try {
    // We request a 400px thumbnail asset specifically targeting our exact page identifier title
    const wikiUrl = `https://wikipedia.org{encodeURIComponent(
      wikiTargetTitle
    )}&prop=pageimages&format=json&pithumbsize=400&origin=*`;

    const res = await fetch(wikiUrl);
    if (!res.ok) return null;

    const data = await res.json();
    const pages = data.query?.pages;

    if (pages) {
      const pageId = Object.keys(pages);
      // Verify if a real page was matched (-1 implies Wikipedia did not find the article title)
      if (pageId && pageId[0] !== "-1" && pages[pageId[0]].thumbnail) {
        return pages[pageId[0]].thumbnail.source;
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

  const productsArray = Object.values(mobileSentrixProducts);

  // Filter items matching the query text string inside titles or brand structures
  const filteredProducts = productsArray.filter(product => 
    product.name?.toLowerCase().includes(query) || 
    product.model_text?.toLowerCase().includes(query)
  );

  // Parallel asynchronous fetching mapped directly to the cleaned title array rows
  const integratedResults = await Promise.all(
    filteredProducts.map(async (product) => {
      const wikiImage = await fetchWikipediaDeviceImage(
        product.manufacturer_text, 
        product.model_text
      );

      return {
        id: product.entity_id,
        sku: product.sku,
        name: product.name,
        price: parseFloat(product.price || '0').toFixed(2),
        brand: product.manufacturer_text,
        deviceModel: product.model_text,
        displayImage: wikiImage || product.default_image || '/images/no-image.png'
      };
    })
  );

  return NextResponse.json(integratedResults);
}
