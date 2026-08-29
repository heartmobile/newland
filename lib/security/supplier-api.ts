import { randomUUID, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

const MINIMUM_INTERNAL_KEY_LENGTH = 32;
const MAX_JSON_BYTES = 32_768;

function safeEqual(left: string, right: string): boolean {
  const leftBytes = Buffer.from(left);
  const rightBytes = Buffer.from(right);
  return leftBytes.length === rightBytes.length && timingSafeEqual(leftBytes, rightBytes);
}

function hasInternalAccess(request: Request): boolean {
  const expectedKey = process.env.HEART_MOBILE_INTERNAL_API_KEY;
  if (!expectedKey || expectedKey.length < MINIMUM_INTERNAL_KEY_LENGTH) return false;
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) return false;
  return safeEqual(authorization.slice(7), expectedKey);
}

function noStoreJson(body: object, status: number, extraHeaders: HeadersInit = {}) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extraHeaders },
  });
}

function auditAccess(request: Request, access: 'read' | 'mutation', result: 'allowed' | 'denied' | 'disabled') {
  const requestId = request.headers.get('x-vercel-id') || randomUUID();
  const event = {
    timestamp: new Date().toISOString(),
    event: 'supplier_access',
    requestId,
    method: request.method,
    route: new URL(request.url).pathname,
    access,
    result,
  };
  const message = JSON.stringify(event);
  if (result === 'allowed') console.info(message);
  else console.warn(message);
}

function requireInternalAccess(request: Request): NextResponse | null {
  if (hasInternalAccess(request)) return null;
  return noStoreJson(
    { error: 'Unauthorized.' },
    401,
    { 'WWW-Authenticate': 'Bearer realm="Heart Mobile internal API"' },
  );
}

export function requireSupplierAccess(
  request: Request,
  mode: 'read' | 'mutation',
): NextResponse | null {
  const denied = requireInternalAccess(request);
  if (denied) {
    auditAccess(request, mode, 'denied');
    return denied;
  }

  const enabled = mode === 'mutation'
    ? process.env.MOBILESENTRIX_MUTATIONS_ENABLED === 'true'
    : process.env.MOBILESENTRIX_READS_ENABLED === 'true';

  if (!enabled) {
    auditAccess(request, mode, 'disabled');
    return noStoreJson(
      { error: `Supplier ${mode === 'mutation' ? 'mutations are' : 'reads are'} disabled.` },
      503,
    );
  }
  auditAccess(request, mode, 'allowed');
  return null;
}

export async function readJsonObject(request: Request): Promise<Record<string, unknown>> {
  const contentType = request.headers.get('content-type')?.split(';', 1)[0].trim().toLowerCase();
  if (contentType !== 'application/json') throw new RequestValidationError('Content-Type must be application/json.');

  const declaredLength = Number(request.headers.get('content-length') || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_JSON_BYTES) {
    throw new RequestValidationError('Request body is too large.', 413);
  }

  const raw = await request.text();
  if (Buffer.byteLength(raw, 'utf8') > MAX_JSON_BYTES) throw new RequestValidationError('Request body is too large.', 413);

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new RequestValidationError('Request body must contain valid JSON.');
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new RequestValidationError('Request body must be a JSON object.');
  }
  return parsed as Record<string, unknown>;
}

export class RequestValidationError extends Error {
  constructor(message: string, public readonly status = 400) {
    super(message);
    this.name = 'RequestValidationError';
  }
}

export function routeError(error: unknown, operation: string): NextResponse {
  if (error instanceof RequestValidationError) {
    return noStoreJson({ error: error.message }, error.status);
  }
  console.error(`[supplier-api] ${operation} failed`, error instanceof Error ? error.name : 'UnknownError');
  return noStoreJson({ error: 'Supplier operation failed.' }, 502);
}
