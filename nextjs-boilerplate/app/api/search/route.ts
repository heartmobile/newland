// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

// Represents your live raw products payload dictionary format
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
 * Searches the Wikipedia API using the high-level device model (e.g., "iPad 2") 
 * to fetch clean product illustrations instead of hardware part photos.
 */
async function fetchWikipediaDeviceImage(modelText: string): Promise<string | null> {
  if (!modelText) return null;

  try {
    const wikiUrl = `https://wikipedia.org{encodeURIComponent(
      modelText
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
    console.error(`Wikipedia image fetch failure for model: ${modelText}`, error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return NextResponse.json([]);
  }

  // 1. Flatten the product dictionary into an array structure for processing
  const productsArray = Object.values(mobileSentrixProducts);

  // 2. Filter listings where the item title or device model matches the query string
  const filteredProducts = productsArray.filter(product => 
    product.name?.toLowerCase().includes(query) || 
    product.model_text?.toLowerCase().includes(query)
  );

  // 3. Resolve matching Wikipedia device coverage illustrations in parallel
  const integratedResults = await Promise.all(
    filteredProducts.map(async (product) => {
      const wikiImage = await fetchWikipediaDeviceImage(product.model_text);

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
