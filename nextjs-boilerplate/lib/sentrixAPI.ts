// lib/sentrixApi.ts
import { generateOAuthHeader } from './authSigner';

export interface CartItemInput { sku?: string; entity_id?: string; qty: number; update?: number; }
export interface TaxIdentifier { vat_prefix: string; vat_number: string | number; }

export interface CustomerRegistrationInput {
  firstname: string; lastname: string; username: string; account_type?: 'personal' | 'business';
  email: string; mobile: string; pre_mobile: number; prefix_main_country_id: string;
  password: string; company_short: string; company: string; company_website?: string;
  street: [string, string?]; city: string; region: string; postcode: string;
  country_id: string; telephone: string; pre_address_mobile: number; prefix_country_id: string;
  vat_numbers?: TaxIdentifier[]; user_code?: string; describes_business?: string;
}

export interface AddressPayload {
  firstname: string; lastname: string; street: [string, string?]; city: string;
  country_id: string; region: string | number; postcode: string | number;
  prefix?: string; telephone: string | number; company: string; company_short?: string;
  vat_numbers?: TaxIdentifier[];
}

export interface OrderInput {
  quote_id: string; billing_id: string; shipping_id: string;
  shipping_method: string; payment_method: 'mygateway'; po_number: string;
}

export class SentrixApiService {
  private baseUrl: string;
  private creds: { consumerKey: string; consumerSecret: string; accessToken: string; accessTokenSecret: string };

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_MOBILE_SENTRIX_BASE_URL || 'https://mobilesentrix.com';
    this.creds = {
      consumerKey: process.env.SENTRIX_CONSUMER_KEY || '',
      consumerSecret: process.env.SENTRIX_CONSUMER_SECRET || '',
      accessToken: process.env.SENTRIX_ACCESS_TOKEN || '',
      accessTokenSecret: process.env.SENTRIX_ACCESS_TOKEN_SECRET || ''
    };
  }

  private async request(path: string, method: string, body?: any): Promise<any> {
    const destinationUrl = `${this.baseUrl}${path}`;
    const authorizationHeader = generateOAuthHeader(method, destinationUrl, this.creds);

    const config: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': authorizationHeader }
    };

    if (body) config.body = JSON.stringify(body);

    const response = await fetch(destinationUrl, config);
    if (!response.ok) throw new Error(`API Error: ${response.status}`);
    return response.json();
  }

  async createCustomer(customerData: CustomerRegistrationInput): Promise<any> {
    return this.request('/api/rest/createcustomer', 'POST', { customrest: "1", ...customerData });
  }

  async searchCustomers(query: string): Promise<any> {
    return this.request(`/api/rest/searchcustomers?q=${encodeURIComponent(query)}`, 'GET');
  }

  async generateMagicLoginToken(email: string): Promise<any> {
    return this.request('/api/rest/generatetoken', 'POST', { customrest: 1, email });
  }

  buildAutoLoginRedirectUrl(consumerName: string, callback: string, token: string): string {
    return `${this.baseUrl}/oauth/authorize/identifier?` +
      `consumer=${encodeURIComponent(consumerName)}&authtype=1&flowentry=SignIn` +
      `&consumer_key=${encodeURIComponent(this.creds.consumerKey)}` +
      `&consumer_secret=${encodeURIComponent(this.creds.consumerSecret)}` +
      `&callback=${encodeURIComponent(callback)}&customer_email=${encodeURIComponent(token)}`;
  }

  async addCustomerAddress(customerId: string | number, addressData: AddressPayload): Promise<any> {
    return this.request(`/api/rest/customers/${customerId}/addresses`, 'POST', { customrest: 1, ...addressData });
  }

  async updateCustomerAddress(addressId: string | number, addressData: AddressPayload): Promise<any> {
    return this.request(`/api/rest/customers/addresses/${addressId}`, 'PUT', addressData);
  }

  async getCart(): Promise<any> { return this.request('/api/rest/cart', 'GET', { customrest: 1 }); }
  async modifyCartItems(products: CartItemInput[]): Promise<any> { return this.request('/api/rest/cart', 'POST', { customrest: 1, products }); }
  async clearCart(): Promise<any> { return this.request('/api/rest/cart', 'DELETE', { customrest: 1 }); }

  async createOrder(orderData: OrderInput): Promise<any> {
    return this.request('/api/rest/createorder', 'POST', { customrest: "1", ...orderData });
  }
}
