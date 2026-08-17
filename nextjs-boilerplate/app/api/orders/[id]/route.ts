import { NextResponse } from 'next/server';
import { SentrixApiService } from '@/lib/mobile-sentrixapi';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    // Extract the variable directly from the boxed path parameter layout
    const orderId = context.params.id;

    if (!orderId) {
      return NextResponse.json(
        { error: "Required boxed order reference string identifier is missing." }, 
        { status: 400 }
      );
    }

    const apiService = new SentrixApiService();
    const orderDetails = await apiService.getOrderById(orderId);

    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error: any) {
    console.error(`Boxed Order Error on ID parameter:`, error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error sorting single order summary maps.' },
      { status: 500 }
    );
  }
}
