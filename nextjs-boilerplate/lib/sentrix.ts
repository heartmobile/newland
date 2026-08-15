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

export interface SentrixClient {
  listProducts(): Promise<SentrixProduct[]>;
  getProductBySku(sku: string): Promise<SentrixProduct | null>;
  getStock(skus: string[]): Promise<Record<string, number>>;
}

export function isSentrixConfigured(): boolean {
  return Boolean(process.env.SENTRIX_API_URL && process.env.SENTRIX_API_KEY);
}

export function createSentrixClient(): SentrixClient {
  if (!isSentrixConfigured()) {
    throw new Error('MobileSentrix API credentials are not configured.');
  }

  throw new Error(
    'MobileSentrix integration remains disabled until the official API documentation is available.',
  );
}
