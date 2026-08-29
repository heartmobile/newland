import { NextResponse } from 'next/server';
import { OrdersApiService } from '@/lib/api/orders';
import { requireSupplierAccess, routeError, RequestValidationError } from '@/lib/security/supplier-api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = requireSupplierAccess(request, 'read');
  if (denied) return denied;
  try {
    const { id } = await params;
    if (!/^[A-Za-z0-9_-]{1,100}$/.test(id)) throw new RequestValidationError('Invalid order ID.');
    const order = await new OrdersApiService().getOrderById(id);

    return NextResponse.json(order, { status: 200 });
  } catch (error: unknown) {
    return routeError(error, 'get order');
  }
}
