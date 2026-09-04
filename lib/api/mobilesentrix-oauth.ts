const ACCESS_TOKEN_ENDPOINT = '/oauth/authorize/identifiercallback';
const PREPRODUCTION_HOST = 'preprod.mobilesentrix.com';
const REQUEST_TIMEOUT_MS = 10_000;
const MAX_RESPONSE_BYTES = 32_768;
const MAX_OAUTH_VALUE_LENGTH = 2_048;

export interface MobileSentrixAccessTokenResult {
  accessToken: string;
  accessTokenSecret: string;
}

export class MobileSentrixOAuthError extends Error {
  constructor(public readonly upstreamStatus?: number) {
    super('MobileSentrix OAuth exchange failed.');
    this.name = 'MobileSentrixOAuthError';
  }
}

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new MobileSentrixOAuthError();
  }

  return value;
}

function getPreproductionOrigin(): string {
  const rawUrl = requiredEnvironmentVariable(
    'MOBILESENTRIX_PREPRODUCTION_API_URL'
  );

  let url: URL;

  try {
    url = new URL(rawUrl);
  } catch {
    throw new MobileSentrixOAuthError();
  }

  const validPath = url.pathname === '/' || url.pathname === '';

  if (
    url.protocol !== 'https:' ||
    url.hostname !== PREPRODUCTION_HOST ||
    url.username ||
    url.password ||
    url.search ||
    url.hash ||
    !validPath
  ) {
    throw new MobileSentrixOAuthError();
  }

  return url.origin;
}

function validateOAuthValue(value: string): string {
  const normalized = value.trim();

  if (
    !normalized ||
    normalized.length > MAX_OAUTH_VALUE_LENGTH ||
    /[\u0000-\u001F\u007F]/.test(normalized)
  ) {
    throw new MobileSentrixOAuthError();
  }

  return normalized;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function requiredString(
  object: Record<string, unknown>,
  key: string
): string {
  const value = object[key];

  if (typeof value !== 'string' || !value.trim()) {
    throw new MobileSentrixOAuthError();
  }

  return value.trim();
}

export async function exchangeMobileSentrixAccessToken(
  oauthToken: string,
  oauthVerifier: string
): Promise<MobileSentrixAccessTokenResult> {
  const consumerKey = requiredEnvironmentVariable(
    'MOBILESENTRIX_CONSUMER_KEY'
  );

  const consumerSecret = requiredEnvironmentVariable(
    'MOBILESENTRIX_CONSUMER_SECRET'
  );

  const token = validateOAuthValue(oauthToken);
  const verifier = validateOAuthValue(oauthVerifier);

  const requestUrl =
    `${getPreproductionOrigin()}${ACCESS_TOKEN_ENDPOINT}`;

  let response: Response;

  try {
    response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consumer_key: consumerKey,
        consumer_secret: consumerSecret,
        oauth_token: token,
        oauth_verifier: verifier,
      }),
      cache: 'no-store',
      redirect: 'error',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    throw new MobileSentrixOAuthError();
  }

  if (!response.ok) {
    throw new MobileSentrixOAuthError(response.status);
  }

  const contentType = response.headers.get('content-type')?.toLowerCase() || '';

  if (!contentType.includes('application/json')) {
    throw new MobileSentrixOAuthError(response.status);
  }

  const rawBody = await response.text();

  if (new TextEncoder().encode(rawBody).byteLength > MAX_RESPONSE_BYTES) {
    throw new MobileSentrixOAuthError(response.status);
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(rawBody);
  } catch {
    throw new MobileSentrixOAuthError(response.status);
  }

  if (!isRecord(parsed)) {
    throw new MobileSentrixOAuthError(response.status);
  }

  if (
    parsed.status !== undefined &&
    Number(parsed.status) !== 1
  ) {
    throw new MobileSentrixOAuthError(response.status);
  }

  if (!isRecord(parsed.data)) {
    throw new MobileSentrixOAuthError(response.status);
  }

  return {
    accessToken: requiredString(parsed.data, 'access_token'),
    accessTokenSecret: requiredString(parsed.data, 'access_token_secret'),
  };
}
