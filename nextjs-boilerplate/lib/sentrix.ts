import OAuth from 'oauth-1.0a';
import crypto from 'crypto';

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
  listProducts(page?: number, pageSize?: number): Promise<SentrixProduct[]>;
  getProductBySku(sku: string): Promise<SentrixProduct | null>;
  getStock(skus: string[]): Promise<Record<string, number>>;
}

export function isSentrixConfigured(): boolean {
  return Boolean(
    process.env.SENTRIX_API_URL && 
    process.env.SENTRIX_CONSUMER_KEY && 
    process.env.SENTRIX_CONSUMER_SECRET
  );
}

// Concrete internal schema matching MobileSentrix Magento framework outputs
interface MagentoCustomAttribute {
  attribute_code: string;
  value: string | string[];
}

interface MobileSentrixProductItem {
  id: number;
  sku: string;
  name: string;
  price: number;
  status: number;
  type_id: string;
  custom_attributes?: MagentoCustomAttribute[];
}

interface MagentoSearchResponse {
  items: MobileSentrixProductItem[];
  search_criteria: Record<string, any>;
  total_count: number;
}

interface MagentoStockItem {
  item_id: number;
  product_id: number;
  stock_id: number;
  qty: number;
  is_in_stock: boolean;
}

export function createSentrixClient(): SentrixClient {
  if (!isSentrixConfigured()) {
    throw new Error('MobileSentrix API credentials are not configured.');
  }

  const baseUrl = process.env.SENTRIX_API_URL!.replace(/\/$/, '');
  const consumerKey = process.env.SENTRIX_CONSUMER_KEY!;
  const consumerSecret = process.env.SENTRIX_CONSUMER_SECRET!;

  const oauth = new OAuth({
    consumer: { key: consumerKey, secret: consumerSecret },
    signature_method: 'HMAC-SHA256',
    hash_function(base_string, key) {
      return crypto.createHmac('sha256', key).update(base_string).digest('base64');
    },
  });

  async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const fullUrl = `${baseUrl}${endpoint}`;
    const method = options.method || 'GET';

    const requestData = {
      url: fullUrl,
      method: method,
      data: options.body ? JSON.parse(options.body as string) : undefined,
    };

    const authHeaders = oauth.toHeader(oauth.authorize(requestData));

    const response = await fetch(fullUrl, {
      ...options,
      headers: {
        ...authHeaders,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`MobileSentrix API Error: ${response.status} ${response.statusText}`);
    }

    return response.json() as Promise<T>;
  }

  // Extract nested properties hidden inside the Magento custom attribute matrix
  function getCustomAttribute(item: MobileSentrixProductItem, code: string): string {
    if (!item.custom_attributes) return 'N/A';
    const attr = item.custom_attributes.find(a => a.attribute_code === code);
    if (!attr) return 'N/A';
    return Array.isArray(attr.value) ? attr.value.join(', ') : String(attr.value);
  }

  function mapToSentrixProduct(item: MobileSentrixProductItem, stockQty = 0): SentrixProduct {
    return {
      id: String(item.id),
      sku: item.sku,
      title: item.name,
      category: getCustomAttribute(item, 'category_ids') || 'Parts',
      compatibility: getCustomAttribute(item, 'device_compatibility') || getCustomAttribute(item, 'model'),
      wholesalePrice: Number(item.price),
      stockQuantity: stockQty,
      inStock: item.status === 1 && stockQty > 0,
    };
  }

  return {
    async listProducts(page = 1, pageSize = 20): Promise<SentrixProduct[]> {
      // Standard search criteria syntax formatting required by the system catalog engine
      const queryParams = new URLSearchParams({
        'searchCriteria[currentPage]': String(page),
        'searchCriteria[pageSize]': String(pageSize),
      });

      const data = await request<MagentoSearchResponse>(`/rest/V1/products?${queryParams.toString()}`);
      
      // Default lists omit localized inventory matrix arrays; maps data safely with 0 baseline inventory
      return data.items.map(item => mapToSentrixProduct(item, 0));
    },

    async getProductBySku(sku: string): Promise<SentrixProduct | null> {
      try {
        const encodedSku = encodeURIComponent(sku);
        
        // Parallel fetching across core details and active logistical tracking endpoints
        const [productData, stockData] = await Promise.all([
          request<MobileSentrixProductItem>(`/rest/V1/products/${encodedSku}`),
          request<MagentoStockItem>(`/rest/V1/stockItems/${encodedSku}`).catch(() => ({ qty: 0, is_in_stock: false } as MagentoStockItem))
        ]);

        return mapToSentrixProduct(productData, Number(stockData.qty || 0));
      } catch (error) {
        if (error instanceof Error && error.message.includes('404')) {
          return null;
        }
        throw error;
      }
    },

    async getStock(skus: string[]): Promise<Record<string, number>> {
      if (skus.length === 0) return {};

      const stockMap: Record<string, number> = {};

      // Batched catalog search wrapper query matching active targets
      const queryParams = new URLSearchParams();
      skus.forEach((sku, index) => {
        queryParams.append(`searchCriteria[filterGroups][0][filters][${index}][field]`, 'sku');
        queryParams.append(`searchCriteria[filterGroups][0][filters][${index}][value]`, sku);
        queryParams.append(`searchCriteria[filterGroups][0][filters][${index}][conditionType]`, 'eq');
      });

      try {
        const data = await request<MagentoSearchResponse>(`/rest/V1/products?${queryParams.toString()}`);
        
        // Processes downstream updates via separate dynamic references if properties exist
        for (const item of data.items) {
          const qtyAttr = getCustomAttribute(item, 'quantity') || getCustomAttribute(item, 'qty');
          stockMap[item.sku] = qtyAttr !== 'N/A' ? Number(qtyAttr) : 0;
        }

        // Fill remaining requested items not found in response with 0
        skus.forEach(sku => {
          if (!(sku in stockMap)) stockMap[sku] = 0;
        });

      } catch {
        skus.forEach(sku => { stockMap[sku] = 0; });
      }

      return stockMap;
    },
  };
}
