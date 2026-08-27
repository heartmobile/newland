import * as crypto from 'crypto';

function oauthEncode(value: string): string {
  return encodeURIComponent(value).replace(/[!'()*]/g, (character) =>
    `%${character.charCodeAt(0).toString(16).toUpperCase()}`
  );
}

export interface ApiClientConfig {
  baseUrl?: string;
  consumerKey?: string;
  consumerSecret?: string;
  accessToken?: string;
  accessTokenSecret?: string;
}

/**
 * OAuth 1.0 signature generation for MobileSentrix API
 */
function generateOAuth1Signature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  accessTokenSecret: string
): string {
  // Create parameter string (sorted)
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${oauthEncode(key)}=${oauthEncode(params[key])}`)
    .join('&');

  // Base string for signature
  const baseString = [
    method.toUpperCase(),
    oauthEncode(url),
    oauthEncode(sortedParams),
  ].join('&');

  // Signing key
  const signingKey = `${oauthEncode(consumerSecret)}&${oauthEncode(accessTokenSecret)}`;

  // HMAC-SHA1 signature
  const signature = crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');

  return signature;
}

/**
 * Generate OAuth 1.0 Authorization header
 */
function generateOAuth1Header(
  method: string,
  url: string,
  bodyParams: Record<string, string>,
  consumerKey: string,
  consumerSecret: string,
  accessToken: string,
  accessTokenSecret: string
): string {
  // OAuth protocol parameters
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_token: accessToken,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_version: '1.0',
  };

  // Combine for signature calculation
  const allParams = { ...oauthParams, ...bodyParams };
  const signature = generateOAuth1Signature(
    method,
    url,
    allParams,
    consumerSecret,
    accessTokenSecret
  );

  // Build Authorization header
  oauthParams.oauth_signature = signature;
  const authHeader = Object.entries(oauthParams)
    .map(([key, value]) => `${oauthEncode(key)}="${oauthEncode(value)}"`)
    .join(', ');

  return `OAuth ${authHeader}`;
}

export class BaseApiClient {
  protected baseUrl: string;
  protected consumerKey: string;
  protected consumerSecret: string;
  protected accessToken: string;
  protected accessTokenSecret: string;

  constructor(config?: ApiClientConfig) {
    this.baseUrl = config?.baseUrl || process.env.MOBILESENTRIX_API_URL || 'https://preprod.mobilesentrix.ca';
    this.consumerKey = config?.consumerKey || process.env.MOBILESENTRIX_CONSUMER_KEY || '';
    this.consumerSecret = config?.consumerSecret || process.env.MOBILESENTRIX_CONSUMER_SECRET || '';
    this.accessToken = config?.accessToken || process.env.MOBILESENTRIX_ACCESS_TOKEN || '';
    this.accessTokenSecret = config?.accessTokenSecret || process.env.MOBILESENTRIX_ACCESS_TOKEN_SECRET || '';

    if (!this.consumerKey || !this.consumerSecret || !this.accessToken || !this.accessTokenSecret) {
      throw new Error('MobileSentrix OAuth credentials are not configured.');
    }
  }

  protected async request<T = any>(
    endpoint: string,
    method: string = 'GET',
    bodyData?: Record<string, unknown>,
    queryParams: Record<string, string> = {},
    _bearerToken?: string
  ): Promise<T> {
    const baseUrl = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const query = Object.entries(queryParams)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, value]) => `${oauthEncode(key)}=${oauthEncode(value)}`)
      .join('&');
    const url = query ? `${baseUrl}?${query}` : baseUrl;

    // JSON bodies are not OAuth 1.0 signature parameters; query parameters are.
    const body = bodyData ? JSON.stringify(bodyData) : undefined;
    
    // Generate OAuth 1.0 header
    const authHeader = generateOAuth1Header(
      method,
      baseUrl,
      queryParams,
      this.consumerKey,
      this.consumerSecret,
      this.accessToken,
      this.accessTokenSecret
    );

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `MobileSentrix API Error (${response.status}): ${errorText || response.statusText}`
      );
    }

    return response.json();
  }
}

// Alias for routes expecting SentrixApiService
export class SentrixApiService extends BaseApiClient {}
export default BaseApiClient;
