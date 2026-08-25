import { NextResponse } from 'next/server';
import { OrdersApiService, CartItemPayload } from '@/lib/api';

// 1. GET: Fetch Active Shopping Cart Details
export async function GET() {
  try {
    const apiService = new OrdersApiService();
    const cartData = await apiService.getCart();
    return NextResponse.json(cartData, { status: 200 });
  } catch (error: any) {
    console.error("Cart GET Proxy Error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error fetching cart' },
      { status: 500 }
    );
  }
}

// 2. POST: Unified Handler for Adding, Updating, and Removing Items
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Expecting an array under products: [{ sku, qty }]
    if (!body.products || !Array.isArray(body.products)) {
      return NextResponse.json(
        { error: "Missing or invalid 'products' payload array structure." },
        { status: 400 }
      );
    }

    const apiService = new OrdersApiService();
    const results = [];

    // Loop through product updates and dispatch via OrdersApiService
    for (const item of body.products as CartItemPayload[]) {
      const updatedCart = await apiService.addToCart({
        sku: item.sku,
        qty: item.qty,
      });
      results.push(updatedCart);
    }

    return NextResponse.json({ success: true, cart: results }, { status: 200 });
  } catch (error: any) {
    console.error("Cart POST Mutation Proxy Error:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error changing cart items' },
      { status: 500 }
    );
  }
}
