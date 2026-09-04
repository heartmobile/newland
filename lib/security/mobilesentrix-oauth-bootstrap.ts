import {
  createHmac,
  randomBytes,
  timingSafeEqual,
} from 'node:crypto';

export const OAUTH_BOOTSTRAP_COOKIE = 'hm_ms_oauth_bootstrap';
export const OAUTH_BOOTSTRAP_TTL_SECONDS = 600;

const MINIMUM_BOOTSTRAP_PASSWORD_LENGTH = 32;

function getBootstrapPassword(): string | null {
  const value =
    process.env.MOBILESENTRIX_OAUTH_BOOTSTRAP_PASSWORD?.trim();

  if (!value || value.length < MINIMUM_BOOTSTRAP_PASSWORD_LENGTH) {
    return null;
  }

  return value;
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);

  return (
    a.length === b.length &&
    timingSafeEqual(a, b)
  );
}

export function oauthBootstrapEnabled(): boolean {
  return (
    process.env.MOBILESENTRIX_OAUTH_BOOTSTRAP_ENABLED === 'true'
  );
}

export function hasOAuthBootstrapAccess(
  request: Request
): boolean {
  const password = getBootstrapPassword();

  if (!password) return false;

  const authorization =
    request.headers.get('authorization');

  if (!authorization?.startsWith('Basic ')) {
    return false;
  }

  try {
    const decoded = Buffer.from(
      authorization.slice(6),
      'base64'
    ).toString('utf8');

    const separator = decoded.indexOf(':');

    if (separator < 0) return false;

    const username = decoded.slice(0, separator);
    const suppliedPassword = decoded.slice(separator + 1);

    return (
      username === 'heartmobile' &&
      safeEqual(suppliedPassword, password)
    );
  } catch {
    return false;
  }
}

export function createOAuthBootstrapState(): string {
  const password = getBootstrapPassword();

  if (!password) {
    throw new Error(
      'OAuth bootstrap password is not configured.'
    );
  }

  const issuedAt = Math.floor(Date.now() / 1000);
  const nonce = randomBytes(24).toString('base64url');

  const payload = `${issuedAt}.${nonce}`;

  const signature = createHmac('sha256', password)
    .update(payload)
    .digest('base64url');

  return `${payload}.${signature}`;
}

export function verifyOAuthBootstrapState(
  value: string
): boolean {
  const password = getBootstrapPassword();

  if (!password) return false;

  const parts = value.split('.');

  if (parts.length !== 3) return false;

  const [issuedAtRaw, nonce, suppliedSignature] = parts;

  const issuedAt = Number(issuedAtRaw);
  const now = Math.floor(Date.now() / 1000);

  if (
    !Number.isInteger(issuedAt) ||
    !nonce ||
    issuedAt > now + 30 ||
    now - issuedAt > OAUTH_BOOTSTRAP_TTL_SECONDS
  ) {
    return false;
  }

  const payload = `${issuedAtRaw}.${nonce}`;

  const expectedSignature = createHmac(
    'sha256',
    password
  )
    .update(payload)
    .digest('base64url');

  return safeEqual(
    suppliedSignature,
    expectedSignature
  );
}
