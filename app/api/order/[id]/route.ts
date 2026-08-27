import { NextResponse } from 'next/server';
import { OrdersApiService } from '@/lib/api/orders';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const order = await new OrdersApiService().getOrderById(id);

    return NextResponse.json(order, { status: 200 });
  } catch (error: any) {
    console.error("Order Route Exception:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error retrieving order details.' },
      { status: 500 }
    );
  }
}
