import { NextResponse } from 'next/server';
import { SentrixApiService } from '@/lib/mobile-sentrixapi';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit') || 20);
    const page = Number(searchParams.get('page') || 1);

    const apiService = new SentrixApiService();
    // Utilizes the paginated engine block method inside your class file
    const listData = await apiService.getOrdersPaginated(page, limit);

    return NextResponse.json(listData, { status: 200 });
  } catch (error: any) {
    console.error("Orders List Route Exception:", error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error compiling order history logs.' },
      { status: 500 }
    );
  }
}
