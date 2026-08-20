import { NextRequest, NextResponse } from 'next/server';

const MINIMUM_PASSWORD_LENGTH = 16;

function unauthorized(message = 'Admin credentials are required.') {
  return new NextResponse(message, {
    status: 401,
    headers: {
      'Cache-Control': 'no-store',
      'WWW-Authenticate': 'Basic realm="Heart Mobile Admin", charset="UTF-8"',
    },
  });
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminUsername || !adminPassword || adminPassword.length < MINIMUM_PASSWORD_LENGTH) {
      return new NextResponse('Admin access is not configured.', {
        status: 503,
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith('Basic ')) {
      return unauthorized();
    }

    let suppliedCredentials: string;
    try {
      suppliedCredentials = atob(authorization.slice(6));
    } catch {
      return unauthorized('Invalid admin credentials.');
    }

    const separatorIndex = suppliedCredentials.indexOf(':');
    if (separatorIndex === -1) {
      return unauthorized('Invalid admin credentials.');
    }

    const username = suppliedCredentials.slice(0, separatorIndex);
    const password = suppliedCredentials.slice(separatorIndex + 1);

    if (username !== adminUsername || password !== adminPassword) {
      return unauthorized('Invalid admin credentials.');
    }
  }
export default function AdminPage() {
  return (
    <div>
      <h1>Admin Dashboard</h1>
    </div>
  );
}
