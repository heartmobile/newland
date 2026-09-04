import { NextRequest, NextResponse } from 'next/server';

import {
  createOAuthBootstrapState,
  hasOAuthBootstrapAccess,
  oauthBootstrapEnabled,
  OAUTH_BOOTSTRAP_COOKIE,
  OAUTH_BOOTSTRAP_TTL_SECONDS,
} from '@/lib/security/mobilesentrix-oauth-bootstrap';

const AUTHORIZE_ENDPOINT = '/oauth/authorize/identifier';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  Pragma: 'no-cache',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
};

function errorResponse(message: string, status: number) {
  return NextResponse.json(
    { error: message },
    {
      status,
      headers: NO_STORE_HEADERS,
    }
  );
}

export async function GET(request: NextRequest) {
  if (!oauthBootstrapEnabled()) {
    return errorResponse(
      'MobileSentrix OAuth bootstrap is disabled.',
      503
    );
  }

  if (!hasOAuthBootstrapAccess(request)) {
    return new NextResponse('Authentication required.', {
      status: 401,
      headers: {
        ...NO_STORE_HEADERS,
        'WWW-Authenticate':
          'Basic realm="Heart Mobile MobileSentrix OAuth bootstrap"',
      },
    });
  }

  const rawBaseUrl =
    process.env.MOBILESENTRIX_PREPRODUCTION_API_URL?.trim();

  const consumerName =
    process.env.MOBILESENTRIX_CONSUMER_NAME?.trim();

  const consumerKey =
    process.env.MOBILESENTRIX_CONSUMER_KEY?.trim();

  const consumerSecret =
    process.env.MOBILESENTRIX_CONSUMER_SECRET?.trim();

  if (
    !rawBaseUrl ||
    !consumerName ||
    !consumerKey ||
    !consumerSecret
  ) {
    return errorResponse(
      'MobileSentrix OAuth configuration is incomplete.',
      500
    );
  }

  let baseUrl: URL;

  try {
    baseUrl = new URL(rawBaseUrl);
  } catch {
    return errorResponse(
      'Invalid MobileSentrix preproduction URL.',
      500
    );
  }

  if (
    baseUrl.protocol !== 'https:' ||
    baseUrl.hostname !== 'preprod.mobilesentrix.com' ||
    baseUrl.username ||
    baseUrl.password ||
    baseUrl.search ||
    baseUrl.hash
  ) {
    return errorResponse(
      'Invalid MobileSentrix preproduction origin.',
      500
    );
  }

  const callbackUrl = new URL(
    '/api/auth/callback',
    request.nextUrl.origin
  ).toString();

  const authorizationUrl = new URL(
    AUTHORIZE_ENDPOINT,
    baseUrl.origin
  );

  authorizationUrl.search = new URLSearchParams({
    consumer: consumerName,
    authtype: '1',
    flowentry: 'SignIn',
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    callback: callbackUrl,
  }).toString();

  const response = NextResponse.redirect(
    authorizationUrl,
    302
  );

  response.headers.set('Cache-Control', 'no-store');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Referrer-Policy', 'no-referrer');

  response.cookies.set({
    name: OAUTH_BOOTSTRAP_COOKIE,
    value: createOAuthBootstrapState(),
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/api/auth/callback',
    maxAge: OAUTH_BOOTSTRAP_TTL_SECONDS,
  });

  return response;
}
