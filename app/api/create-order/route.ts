import { NextResponse } from 'next/server';
import { SentrixApiService, OrderInput } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiService = new SentrixApiService();

    // Combined payload strictly adhering to MobileSentrix specifications
    const orderPayload: OrderInput = {
      customrest: 1,                                  // Required by supplier documentation
      ordertype: body.ordertype !== undefined ? Number(body.ordertype) : 0, // Fallback to 0 if missing
      quote_id: Number(body.quote_id),                // Must be a Number, not String
      billing_id: Number(body.billing_id),            // Must be a Number, not String
      shipping_id: Number(body.shipping_id),          // Must be a Number, not String
      shipping_method: body.shipping_method || "flatrate3_flatrate3", 
      payment_method: body.payment_method || "mygateway",
      // Keep your custom fields if your SentrixApiService supports them:
      po_number: body.po_number || "N/A",             
    };

    // Trigger your background SDK method 
    const checkoutResponse = await apiService.createOrder(orderPayload);
    return NextResponse.json(checkoutResponse, { status: 200 });

  } catch (error: any) {
    console.error("Order Routing Error Caught:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
