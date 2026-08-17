import { NextResponse } from 'next/server';
import { SentrixApiService, OrderInput } from '@/lib/sentrixApi';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiService = new SentrixApiService();

    const orderPayload: OrderInput = {
      quote_id: String(body.quote_id),
      billing_id: String(body.billing_id),
      shipping_id: String(body.shipping_id),
      shipping_method: body.shipping_method,
      payment_method: "mygateway",
      po_number: body.po_number || "N/A",
    };

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
