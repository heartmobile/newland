import { NextRequest, NextResponse } from 'next/server';

import {
  exchangeMobileSentrixAccessToken,
  MobileSentrixOAuthError,
} from '@/lib/api/mobilesentrix-oauth';

import {
  oauthBootstrapEnabled,
  OAUTH_BOOTSTRAP_COOKIE,
  verifyOAuthBootstrapState,
} from '@/lib/security/mobilesentrix-oauth-bootstrap';

const SECURITY_HEADERS = {
  'Cache-Control': 'no-store, max-age=0',
  Pragma: 'no-cache',
  'Referrer-Policy': 'no-referrer',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
  'Content-Security-Policy':
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'",
};

function responseWithClearedBootstrapCookie(
  body: object,
  status: number
): NextResponse {
  const response = NextResponse.json(body, {
    status,
    headers: SECURITY_HEADERS,
  });

  response.cookies.set({
    name: OAUTH_BOOTSTRAP_COOKIE,
    value: '',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/api/auth/callback',
    maxAge: 0,
  });

  return response;
}

export async function GET(request: NextRequest) {
  if (!oauthBootstrapEnabled()) {
    return responseWithClearedBootstrapCookie(
      { error: 'MobileSentrix OAuth bootstrap is disabled.' },
      503
    );
  }

  const bootstrapState =
    request.cookies.get(OAUTH_BOOTSTRAP_COOKIE)?.value;

  if (
    !bootstrapState ||
    !verifyOAuthBootstrapState(bootstrapState)
  ) {
    return responseWithClearedBootstrapCookie(
      { error: 'Invalid or expired OAuth bootstrap session.' },
      401
    );
  }

  const oauthToken =
    request.nextUrl.searchParams.get('oauth_token')?.trim();

  const oauthVerifier =
    request.nextUrl.searchParams.get('oauth_verifier')?.trim();

  if (!oauthToken || !oauthVerifier) {
    return responseWithClearedBootstrapCookie(
      { error: 'Missing OAuth callback parameters.' },
      400
    );
  }

  try {
    const result = await exchangeMobileSentrixAccessToken(
      oauthToken,
      oauthVerifier
    );

    /*
     * Bootstrap-only exception:
     * These values are shown once to the authenticated operator so they
     * can be transferred directly into Vercel Environment Variables.
     *
     * They must never be logged, committed, cached, or exposed through
     * normal storefront/API responses.
     */
    return responseWithClearedBootstrapCookie(
      {
        ok: true,
        message:
          'MobileSentrix OAuth exchange succeeded. Copy these values directly into Vercel, then disable OAuth bootstrap.',
        access_token: result.accessToken,
        access_token_secret: result.accessTokenSecret,
      },
      200
    );
  } catch (error) {
    const upstreamStatus =
      error instanceof MobileSentrixOAuthError
        ? error.upstreamStatus
        : undefined;

    console.warn(
      JSON.stringify({
        event: 'mobilesentrix_oauth_exchange_failed',
        upstreamStatus: upstreamStatus ?? null,
        error:
          error instanceof Error
            ? error.name
            : 'UnknownError',
      })
    );

    return responseWithClearedBootstrapCookie(
      { error: 'MobileSentrix OAuth exchange failed.' },
      502
    );
  }
}

export function POST() {
  return NextResponse.json(
    { error: 'Method not allowed. OAuth callback requires GET.' },
    {
      status: 405,
      headers: {
        ...SECURITY_HEADERS,
        Allow: 'GET',
      },
    }
  );
}
