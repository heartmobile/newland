import { NextResponse } from 'next/server';
import {
  SentrixApiService,
  type OrderInput,
} from '@/lib/api/sentrix';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiService = new SentrixApiService();

    // Combined payload strictly adhering to MobileSentrix specifications
    const orderPayload: OrderInput = {
      customrest: 1,
      quote_id: String(body.quote_id),
      billing_id: String(body.billing_id),
      shipping_id: String(body.shipping_id),
      shipping_method: body.shipping_method || 'flatrate3_flatrate3',
      payment_method: 'mygateway',
      po_number: body.po_number || undefined,
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
