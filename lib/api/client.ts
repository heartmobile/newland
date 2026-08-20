import * as crypto from 'crypto';

export interface ApiClientConfig {
  baseUrl?: string;
  consumerKey?: string;
  consumerSecret?: string;
}

/**
 * OAuth 1.0 signature generation ( Consumer Key & Secret only )
 */
export function generateOAuth1Signature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string
): string {
  // Create parameter string (sorted)
  const sortedParams = Object.keys(params)
    .sort()
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  // Base string for signature
  const baseString = [
    method.toUpperCase(),
    encodeURIComponent(url),
    encodeURIComponent(sortedParams),
  ].join('&');

  // Signing key using Consumer Secret
  const signingKey = `${encodeURIComponent(consumerSecret)}&`;

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
export function generateOAuth1Header(
  method: string,
  url: string,
  bodyParams: Record<string, any>,
  consumerKey: string,
  consumerSecret: string
): string {
  // OAuth protocol parameters
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
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
    consumerSecret
  );

  // Build Authorization header
  oauthParams.oauth_signature = signature;
  const authHeader = Object.entries(oauthParams)
    .map(([key, value]) => `${key}="${encodeURIComponent(value)}"`)
    .join(', ');

  return `OAuth ${authHeader}`;
}

export class BaseApiClient {
  protected baseUrl: string;
  protected consumerKey: string;
  protected consumerSecret: string;

  constructor(config?: ApiClientConfig) {
    this.baseUrl =
      config?.baseUrl ||
      process.env.MOBILESENTRIX_API_URL ||
      'https://www.mobilesentrix.ca/api';
    this.consumerKey =
      config?.consumerKey || process.env.MOBILESENTRIX_CONSUMER_KEY || '';
    this.consumerSecret =
      config?.consumerSecret || process.env.MOBILESENTRIX_CONSUMER_SECRET || '';

    // Softened check for 2-key authorization
    if (!this.consumerKey || !this.consumerSecret) {
      console.warn(
        '⚠️ MobileSentrix Consumer Key or Secret missing. API calls will fail until configured.'
      );
    }
  }

  protected async request<T = any>(
    endpoint: string,
    method: string = 'GET',
    bodyData?: Record<string, any>
  ): Promise<T> {
    const url = `${this.baseUrl}${
      endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    }`;

    // Prepare body
    const body = bodyData ? JSON.stringify(bodyData) : undefined;

    // Generate OAuth 1.0 header using only Consumer Key and Secret
    const authHeader = generateOAuth1Header(
      method,
      url,
      bodyData || {},
      this.consumerKey,
      this.consumerSecret
    );

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `MobileSentrix API Error (${response.status}): ${
          errorText || response.statusText
        }`
      );
    }

    return response.json();
  }
}

// Aliases and default exports for backwards compatibility across routes
export class SentrixApiService extends BaseApiClient {}
export default BaseApiClient;
