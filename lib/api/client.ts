export interface ApiClientConfig {
  apiKey?: string;
  baseUrl?: string;
}

export class BaseApiClient {
  protected apiKey: string;
  protected baseUrl: string;

  constructor(config?: ApiClientConfig) {
    this.apiKey = config?.apiKey || process.env.MOBILESENTRIX_API_KEY || '';
    this.baseUrl = config?.baseUrl || process.env.MOBILESENTRIX_API_URL || 'https://www.mobilesentrix.com/api';
  }

  protected async request<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`,
      ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error (${response.status}): ${errorText || response.statusText}`);
    }

    return response.json();
  }
}

// Alias for routes expecting SentrixApiService
export class SentrixApiService extends BaseApiClient {}
export default BaseApiClient;
