import { NextResponse } from 'next/server';
import { submitExternalOrder, CreateOrderPayload } from '@/lib/sentrixApi';

export async function POST(request: Request) {
  try {
    // Parse the payload sent from your frontend checkout screen
    const body = await request.json();

    // Enforce payload formatting based on your API requirements docs
    const verifiedPayload: CreateOrderPayload = {
      customrest: "1",               // Hardcoded per your specification requirements
      quote_id: String(body.quote_id),
      billing_id: String(body.billing_id),
      shipping_id: String(body.shipping_id),
      shipping_method: body.shipping_method,
      payment_method: "mygateway",   // Hardcoded per your specification for Net Terms
      po_number: body.po_number || "N/A",
    };

    // Forward the payload down to your core external backend service engine
    const externalApiResponse = await submitExternalOrder(verifiedPayload);

    // Return the successful order object back to the browser user interface
    return NextResponse.json(externalApiResponse, { status: 200 });

  } catch (error: any) {
    console.error("Order Routing Error Caught:", error);
    
    return NextResponse.json(
      { error: error.message || 'Internal Server Error processing order layout' },
      { status: 500 }
    );
  }
}
