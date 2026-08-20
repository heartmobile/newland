import { BaseApiClient } from './client';

export interface OrderItem {
  item_id: string;
  sku: string;
  name: string;
  qty_ordered: number;
  price: number;
  row_total: number;
}

export interface ShippingAddress {
  firstname: string;
  lastname: string;
  street: string[];
  city: string;
  region: string;
  postcode: string;
  country_id: string;
  telephone: string;
}

export interface MobileSentrixOrder {
  entity_id: string;
  increment_id: string; // Human-readable order #
  status: string;
  state: string;
  grand_total: number;
  subtotal: number;
  shipping_amount: number;
  tax_amount: number;
  customer_id: string;
  created_at: string;
  items: OrderItem[];
  shipping_address?: ShippingAddress;
}

export interface CartItemPayload {
  sku: string;
  qty: number;
}

export interface CartResponse {
  cart_id: string;
  items: Array<{
    item_id: number;
    sku: string;
    qty: number;
    price: number;
    name: string;
  }>;
  subtotal: number;
  grand_total: number;
}

export interface OrderQueryParams {
  page?: string;
  limit?: string;
  customer_id?: string;
  status?: string;
}

export class OrdersApiService extends BaseApiClient {
  /**
   * Fetch a list of orders (filterable by customer_id or status)
   */
  async getOrders(
    params: OrderQueryParams = {},
    bearerToken?: string
  ): Promise<MobileSentrixOrder[]> {
    const queryParams: Record<string, string> = {};
    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.customer_id) queryParams.customer_id = params.customer_id;
    if (params.status) queryParams.status = params.status;

    return this.request<MobileSentrixOrder[]>(
      '/api/rest/orders',
      'GET',
      undefined,
      queryParams,
      bearerToken
    );
  }

  /**
   * Fetch a single order by ID or Increment ID
   */
  async getOrderById(
    orderId: string,
    bearerToken?: string
  ): Promise<MobileSentrixOrder> {
    return this.request<MobileSentrixOrder>(
      `/api/rest/orders/${orderId}`,
      'GET',
      undefined,
      {},
      bearerToken
    );
  }

  /**
   * Fetch active cart or quote for a user
   */
  async getCart(bearerToken?: string): Promise<CartResponse> {
    return this.request<CartResponse>(
      '/api/rest/cart',
      'GET',
      undefined,
      {},
      bearerToken
    );
  }

  /**
   * Add an item to the current cart
   */
  async addToCart(
    item: CartItemPayload,
    bearerToken?: string
  ): Promise<CartResponse> {
    return this.request<CartResponse>(
      '/api/rest/cart/items',
      'POST',
      item,
      {},
      bearerToken
    );
  }

  /**
   * Submit/Place an order from an active cart
   */
  async placeOrder(
    cartId: string,
    paymentMethod: string,
    bearerToken?: string
  ): Promise<MobileSentrixOrder> {
    return this.request<MobileSentrixOrder>(
      '/api/rest/orders/checkout',
      'POST',
      { cart_id: cartId, payment_method: paymentMethod },
      {},
      bearerToken
    );
  }
}
