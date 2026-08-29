import { NextResponse } from 'next/server';
import { SentrixApiService } from '@/lib/api/sentrix';
import { readJsonObject, requireSupplierAccess, routeError, RequestValidationError } from '@/lib/security/supplier-api';

// 1. GET: Fetch Active Shopping Cart Details
export async function GET(request: Request) {
  const denied = requireSupplierAccess(request, 'read');
  if (denied) return denied;
  try {
    const apiService = new SentrixApiService();
    const cartData = await apiService.getCart();
    return NextResponse.json(cartData, { status: 200 });
  } catch (error: unknown) {
    return routeError(error, 'get cart');
  }
}

// 2. POST: Unified Handler for Adding, Updating, and Removing Items
export async function DELETE(request: Request) {
  const denied = requireSupplierAccess(request, 'mutation');
  if (denied) return denied;
  try {
    const responseData = await new SentrixApiService().clearCart();
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: unknown) {
    return routeError(error, 'clear cart');
  }
}

export async function POST(request: Request) {
  const denied = requireSupplierAccess(request, 'mutation');
  if (denied) return denied;
  try {
    const body = await readJsonObject(request);
    
    // Expecting an array under products: [{ sku, qty, update }]
    if (!Array.isArray(body.products) || body.products.length < 1 || body.products.length > 50) {
      throw new RequestValidationError("'products' must contain between 1 and 50 items.");
    }
    const products = body.products.map((item) => {
      if (!item || typeof item !== 'object' || Array.isArray(item)) throw new RequestValidationError('Each cart item must be an object.');
      const value = item as Record<string, unknown>;
      const sku = typeof value.sku === 'string' ? value.sku.trim() : '';
      const entityId = typeof value.entity_id === 'string' ? value.entity_id.trim() : '';
      const qty = Number(value.qty);
      if ((!sku && !entityId) || !Number.isInteger(qty) || qty < 0 || qty > 100) {
        throw new RequestValidationError('Each cart item requires a SKU or entity ID and a quantity from 0 to 100.');
      }
      return { ...(sku ? { sku } : { entity_id: entityId }), qty, ...(value.update === 1 ? { update: 1 as const } : {}) };
    });

    const apiService = new SentrixApiService();
    const responseData = await apiService.modifyCartItems(products);
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: unknown) {
    return routeError(error, 'modify cart');
  }
}
