import { BaseApiClient } from './client';

export interface VatNumber {
  vat_prefix: string;
  vat_number: string;
}

export interface CustomerRegistrationInput {
  customrest: 1;
  firstname: string;
  lastname: string;
  username: string;
  account_type?: 'personal' | 'business';
  email: string;
  mobile: string;
  pre_mobile: number;
  prefix_main_country_id: string;
  password: string;
  company_short: string;
  company: string;
  company_website?: string;
  street: [string, string?];
  city: string;
  region: string;
  postcode: string;
  country_id: string;
  telephone: string;
  prefix: string;
  prefix_country_id: string;
  vat_numbers?: VatNumber[];
  user_code?: string;
  describes_business?: string;
}

export interface CartProductInput {
  sku?: string;
  entity_id?: string;
  qty: number;
  update?: 1;
}

export interface OrderInput {
  customrest: 1;
  quote_id: string;
  billing_id: string;
  shipping_id: string;
  shipping_method: string;
  payment_method: 'mygateway';
  po_number?: string;
}

export class SentrixApiService extends BaseApiClient {
  async getCart(): Promise<unknown> {
    return this.request('/api/rest/cart', 'GET');
  }

  async modifyCartItems(products: CartProductInput[]): Promise<unknown> {
    return this.request('/api/rest/cart', 'POST', { customrest: 1, products });
  }

  async clearCart(): Promise<unknown> {
    return this.request('/api/rest/cart', 'DELETE', { customrest: 1 });
  }

  async createCustomer(input: CustomerRegistrationInput): Promise<{ success: boolean; message: string }> {
    return this.request('/api/rest/createcustomer', 'POST', input);
  }

  async createOrder(input: OrderInput): Promise<{ status: number; increment_id: string; order_id: string }> {
    return this.request('/api/rest/createorder', 'POST', input);
  }
}

export function isSentrixConfigured(): boolean {
  return Boolean(
    process.env.MOBILESENTRIX_API_URL &&
      process.env.MOBILESENTRIX_CONSUMER_KEY &&
      process.env.MOBILESENTRIX_CONSUMER_SECRET &&
      process.env.MOBILESENTRIX_ACCESS_TOKEN &&
      process.env.MOBILESENTRIX_ACCESS_TOKEN_SECRET
  );
}

export function createSentrixClient(): SentrixApiService {
  return new SentrixApiService();
}
