import { NextResponse } from 'next/server';
import { SentrixApiService } from '@/lib/api/sentrix';

// 1. GET: Fetch Active Shopping Cart Details
export async function GET() {
  try {
    const apiService = new SentrixApiService();
    const cartData = await apiService.getCart();
    return NextResponse.json(cartData, { status: 200 });
  } catch (error: any) {
    console.error("Cart GET Proxy Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error fetching cart' }, { status: 500 });
  }
}

// 2. POST: Unified Handler for Adding, Updating, and Removing Items
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Expecting an array under products: [{ sku, qty, update }]
    if (!body.products || !Array.isArray(body.products)) {
      return NextResponse.json({ error: "Missing or invalid 'products' payload array structure." }, { status: 400 });
    }

    const apiService = new SentrixApiService();
    const responseData = await apiService.modifyCartItems(body.products);
    return NextResponse.json(responseData, { status: 200 });
  } catch (error: any) {
    console.error("Cart POST Mutation Proxy Error:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error changing cart items' }, { status: 500 });
  }
}
