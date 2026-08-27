import { NextResponse } from 'next/server';
import { ProductsApiService } from '@/lib/api/products';
import { calculateRetailPrice, getReleaseYear } from '@/lib/pricing';

export async function GET() {
  try {
    const products = await new ProductsApiService().getProducts();
    const parts = products.flatMap((product) => {
      const supplierCost = Number(product.special_price ?? product.price);
      const releaseYear = getReleaseYear(product.name);
      if (!releaseYear || !Number.isFinite(supplierCost) || supplierCost <= 0) return [];

      const pricing = calculateRetailPrice({
        landedCost: supplierCost,
        releaseYear,
        brand: /apple|iphone/i.test(product.manufacturer_text || product.name)
          ? 'Apple'
          : /samsung|galaxy/i.test(product.manufacturer_text || product.name)
            ? 'Samsung'
            : /google|pixel/i.test(product.manufacturer_text || product.name)
              ? 'Google'
              : 'Other',
      });

      return [{
        id: product.entity_id,
        sku: product.sku,
        name: product.name,
        price: pricing.price.toFixed(2),
        releaseYear,
        image: product.image_url || product.default_image || null,
        inStock: Boolean(product.is_in_stock),
      }];
    });

    return NextResponse.json(parts);
  } catch (error) {
    console.error('MobileSentrix parts request failed:', error);
    return NextResponse.json({ error: 'Parts inventory is unavailable.' }, { status: 502 });
  }
}
