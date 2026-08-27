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

function generateOAuth1Header(
  consumerKey: string,
  consumerSecret: string,
  accessToken: string,
  accessTokenSecret: string
): string {
  const oauthParams: Record<string, string> = {
    oauth_consumer_key: consumerKey,
    oauth_token: accessToken,
    oauth_signature_method: 'PLAINTEXT',
    oauth_timestamp: Math.floor(Date.now() / 1000).toString(),
    oauth_nonce: crypto.randomBytes(16).toString('hex'),
    oauth_version: '1.0a',
    oauth_signature: `${oauthEncode(consumerSecret)}&${oauthEncode(accessTokenSecret)}`,
  };

  return `OAuth ${Object.entries(oauthParams)
    .map(([key, value]) => `${oauthEncode(key)}="${oauthEncode(value)}"`)
    .join(', ')}`;
}

export class BaseApiClient {
  protected baseUrl: string;
  protected consumerKey: string;
  protected consumerSecret: string;
  protected accessToken: string;
  protected accessTokenSecret: string;

  constructor(config?: ApiClientConfig) {
    this.baseUrl = (config?.baseUrl || process.env.MOBILESENTRIX_API_URL || 'https://www.mobilesentrix.com').replace(/\/$/, '');
    this.consumerKey = config?.consumerKey || process.env.MOBILESENTRIX_CONSUMER_KEY || '';
    this.consumerSecret = config?.consumerSecret || process.env.MOBILESENTRIX_CONSUMER_SECRET || '';
    this.accessToken = config?.accessToken || process.env.MOBILESENTRIX_ACCESS_TOKEN || '';
    this.accessTokenSecret = config?.accessTokenSecret || process.env.MOBILESENTRIX_ACCESS_TOKEN_SECRET || '';

    if (!this.consumerKey || !this.consumerSecret || !this.accessToken || !this.accessTokenSecret) {
      throw new Error('MobileSentrix OAuth credentials are not configured.');
    }
  }

  protected async request<T = unknown>(
    endpoint: string,
    method: string = 'GET',
    bodyData?: object,
    queryParams: Record<string, string> = {},
    _bearerToken?: string
  ): Promise<T> {
    const baseUrl = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const query = new URLSearchParams(queryParams).toString();
    const url = query ? `${baseUrl}?${query}` : baseUrl;
    const response = await fetch(url, {
      method,
      headers: {
        Accept: 'application/json',
        ...(bodyData ? { 'Content-Type': 'application/json' } : {}),
        Authorization: generateOAuth1Header(
          this.consumerKey,
          this.consumerSecret,
          this.accessToken,
          this.accessTokenSecret
        ),
      },
      ...(bodyData ? { body: JSON.stringify(bodyData) } : {}),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`MobileSentrix API Error (${response.status}): ${errorText || response.statusText}`);
    }

    return response.json() as Promise<T>;
  }
}

export default BaseApiClient;
