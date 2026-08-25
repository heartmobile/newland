import * as crypto from 'crypto';

export interface ApiClientConfig {
  baseUrl?: string;
  consumerKey?: string;
  consumerSecret?: string;
  accessToken?: string;
  accessTokenSecret?: string;
}

/**
 * OAuth 1.0 signature generation for MobileSentrix API (Supports 2-Legged & 3-Legged)
 */
function generateOAuth1Signature(
  method: string,
  url: string,
  params: Record<string, string>,
  consumerSecret: string,
  accessTokenSecret: string = ''
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

  // In 2-legged OAuth, signingKey becomes `${consumerSecret}&`
  const signingKey = `${encodeURIComponent(consumerSecret)}&${encodeURIComponent(accessTokenSecret)}`;

  // HMAC-SHA1 signature
  return crypto
    .createHmac('sha1', signingKey)
    .update(baseString)
    .digest('base64');
}

/**
 * Generate OAuth 1.0 Authorization header
 */
function generateOAuth1Header(
  method: string,
  url: string,
  bodyParams: Record<string, any>,
  consumerKey: string,
  consumerSecret: string,
  accessToken: string = '',
  accessTokenSecret: string = ''
): string {
  // OAuth protocol parameters
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_version: '1.0',
  };

  // Only append oauth_token if an access token actually exists
  if (accessToken) {
    oauthParams.oauth_token = accessToken;
  }

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
    .map(([key, value]) => `${key}="${encodeURIComponent(value)}"`)
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

    // Only Consumer Key and Secret are mandatory for 2-Legged OAuth
    if (!this.consumerKey || !this.consumerSecret) {
      throw new Error('MobileSentrix Consumer Key and Consumer Secret are not configured.');
    }
  }

  protected async request<T = any>(
    endpoint: string,
    method: string = 'GET',
    bodyData?: Record<string, any>
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    
    // Prepare body
    const body = bodyData ? JSON.stringify(bodyData) : undefined;
    
    // Generate OAuth 1.0 header
    const authHeader = generateOAuth1Header(
      method,
      url,
      bodyData || {},
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
