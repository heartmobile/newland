import { BaseApiClient } from './client'; // ✅ CORRECT (singular)

export interface MobileSentrixProduct {
  entity_id: string;
  sku: string;
  name: string;
  price: number;
  special_price?: number;
  status: number; // 1 = Enabled, 2 = Disabled
  qty: number;
  is_in_stock: boolean;
  category_ids: string[];
  image_url?: string;
  description?: string;
  short_description?: string;
  brand?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductListQueryParams {
  page?: string;
  limit?: string;
  category_id?: string;
  search?: string;
  sku?: string;
}

export interface Category {
  category_id: string;
  parent_id: string;
  name: string;
  is_active: boolean;
  position: number;
  level: number;
  children?: Category[];
}

export class ProductsApiService extends BaseApiClient {
  /**
   * Fetch a paginated list of products from Mobile Sentrix catalog
   */
  async getProducts(
    params: ProductListQueryParams = {},
    bearerToken?: string
  ): Promise<MobileSentrixProduct[]> {
    const queryParams: Record<string, string> = {};
    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.category_id) queryParams.category_id = params.category_id;
    if (params.search) queryParams.search = params.search;
    if (params.sku) queryParams.sku = params.sku;

    return this.request<MobileSentrixProduct[]>(
      '/api/rest/products',
      'GET',
      undefined,
      queryParams,
      bearerToken
    );
  }

  /**
   * Fetch a single product by entity ID or SKU
   */
  async getProductBySku(
    sku: string,
    bearerToken?: string
  ): Promise<MobileSentrixProduct> {
    return this.request<MobileSentrixProduct>(
      `/api/rest/products/${encodeURIComponent(sku)}`,
      'GET',
      undefined,
      {},
      bearerToken
    );
  }

  /**
   * Fetch categories tree from Mobile Sentrix catalog
   */
  async getCategories(bearerToken?: string): Promise<Category[]> {
    return this.request<Category[]>(
      '/api/rest/categories',
      'GET',
      undefined,
      {},
      bearerToken
    );
  }
}
