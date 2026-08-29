import { type NextRequest, NextResponse } from 'next/server';
import { searchDeviceIndex } from '@/lib/device-index';

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get('q')?.trim() || '';
  if (!query) return NextResponse.json([]);
  if (query.length > 100) {
    return NextResponse.json({ error: 'Search query is too long.' }, { status: 400 });
  }

  return NextResponse.json(searchDeviceIndex(query), {
    headers: { 'Cache-Control': 'no-store' },
  });
}
