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

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() || '';

  if (!query) return NextResponse.json([]);

  try {
    const products = await new ProductsApiService().getProducts({
      limit: '15',
      page: '1',
      search: query,
    });

    const results = products.flatMap((product) => {
      const supplierCost = Number(product.special_price ?? product.price);
      const releaseYear = getReleaseYear(product.name);
      if (!releaseYear || !Number.isFinite(supplierCost) || supplierCost <= 0) return [];

      const pricing = calculateRetailPrice({
        landedCost: supplierCost,
        releaseYear,
        brand: getBrand(product),
      });

      return [{
        id: product.entity_id,
        sku: product.sku,
        name: product.name,
        price: pricing.price.toFixed(2),
        brand: getBrand(product),
        deviceModel: product.device_model_text || product.model_text || product.name,
        displayImage: product.image_url || product.default_image || null,
        releaseYear,
      }];
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('MobileSentrix device search failed:', error);
    return NextResponse.json({ error: 'Device search is unavailable.' }, { status: 502 });
  }
}
