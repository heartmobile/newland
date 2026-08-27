export interface CustomerRegistrationInput {
  email: string;
  firstName: string;
  lastName: string;
  companyName?: string;
  phone?: string;
}
export interface SentrixProduct {
  id: string;
  sku: string;
  title: string;
  category: string;
  compatibility: string;
  wholesalePrice: number;
  stockQuantity: number;
  inStock: boolean;
}

export interface SentrixCartItem {
  sku: string;
  quantity: number;
  price: number;
  title: string;
}

export interface SentrixCart {
  items: SentrixCartItem[];
  subtotal: number;
  total: number;
}

export interface SentrixClient {
  listProducts(): Promise<SentrixProduct[]>;
  getProductBySku(sku: string): Promise<SentrixProduct | null>;
  getStock(skus: string[]): Promise<Record<string, number>>;
  getCart(): Promise<SentrixCart>;
  modifyCartItems(products: any[]): Promise<any>;
}

export class SentrixApiService implements SentrixClient {
  async listProducts(): Promise<SentrixProduct[]> {
    throw new Error('Not implemented');
  }

  async getProductBySku(sku: string): Promise<SentrixProduct | null> {
    throw new Error('Not implemented');
  }

  async getStock(skus: string[]): Promise<Record<string, number>> {
    throw new Error('Not implemented');
  }

  async getCart(): Promise<SentrixCart> {
    throw new Error('MobileSentrix integration remains disabled until the official API documentation is available.');
  }

  async modifyCartItems(products: any[]): Promise<any> {
    throw new Error('MobileSentrix integration remains disabled until the official API documentation is available.');
  }
}

export function isSentrixConfigured(): boolean {
  return Boolean(process.env.SENTRIX_API_URL && process.env.SENTRIX_API_KEY);
}

export function createSentrixClient(): SentrixClient {
  if (!isSentrixConfigured()) {
    throw new Error('MobileSentrix API credentials are not configured.');
  }

  return new SentrixApiService();
}
