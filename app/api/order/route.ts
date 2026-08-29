import { NextResponse } from 'next/server';
import { OrdersApiService } from '@/lib/api/orders';
import { requireSupplierAccess, routeError, RequestValidationError } from '@/lib/security/supplier-api';

export async function GET(request: Request) {
  const denied = requireSupplierAccess(request, 'read');
  if (denied) return denied;
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit') || 20);
    const page = Number(searchParams.get('page') || 1);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100 || !Number.isInteger(page) || page < 1) {
      throw new RequestValidationError('Invalid pagination.');
    }

    const apiService = new OrdersApiService();
    const listData = await apiService.getOrders({
      page: String(page),
      limit: String(limit),
    });

    return NextResponse.json(listData, { status: 200 });
  } catch (error: unknown) {
    return routeError(error, 'list orders');
  }
}
