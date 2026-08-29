import { NextResponse } from 'next/server';
import {
  SentrixApiService,
  type OrderInput,
} from '@/lib/api/sentrix';
import { readJsonObject, requireSupplierAccess, routeError, RequestValidationError } from '@/lib/security/supplier-api';

export async function POST(request: Request) {
  const denied = requireSupplierAccess(request, 'mutation');
  if (denied) return denied;
  try {
    const body = await readJsonObject(request);
    const apiService = new SentrixApiService();

    // Combined payload strictly adhering to MobileSentrix specifications
    const required = ['quote_id', 'billing_id', 'shipping_id', 'shipping_method'] as const;
    for (const field of required) {
      if (typeof body[field] !== 'string' || !body[field].trim() || body[field].length > 100) {
        throw new RequestValidationError(`Invalid ${field}.`);
      }
    }
    const orderPayload: OrderInput = {
      customrest: 1,
      quote_id: String(body.quote_id),
      billing_id: String(body.billing_id),
      shipping_id: String(body.shipping_id),
      shipping_method: String(body.shipping_method),
      payment_method: 'mygateway',
      po_number: typeof body.po_number === 'string' && body.po_number.length <= 100 ? body.po_number : undefined,
    };

    // Trigger your background SDK method 
    const checkoutResponse = await apiService.createOrder(orderPayload);
    return NextResponse.json(checkoutResponse, { status: 200 });

  } catch (error: unknown) {
    return routeError(error, 'create order');
  }
}
