import { NextResponse } from 'next/server';
import { SentrixApiService } from '@/lib/api';

export async function GET() {
  try {
    const api = new SentrixApiService();
    const data = await api.getProducts();

    const productsArray = Object.values(data);

    return NextResponse.json(productsArray);
  } catch (error: any) {
    console.error('Error fetching MobileSentrix parts:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch parts' },
      { status: 500 }
    );
  }
}
