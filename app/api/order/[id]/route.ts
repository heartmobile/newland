import { NextResponse } from 'next/server';
import { OrdersApiService } from '@/lib/api/orders';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit') || 20);
    const page = Number(searchParams.get('page') || 1);

    const apiService = new OrdersApiService();
    const listData = await apiService.getOrders({
      page: String(page),
      limit: String(limit),
    });

    return NextResponse.json(listData, { status: 200 });
  } catch (error: any) {
    console.error("Orders List Route Exception:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error compiling order history logs.' },
      { status: 500 }
    );
  }
}
