import { BaseApiClient } from './clients'; // ✅ Pointing to existing file

export type BrokenScreensOrderType = 'rma' | 'dv_rma' | 'consignmentonerma' | 'core';

export interface AttachOrderPayload {
  customrest?: string;
  order_type: BrokenScreensOrderType;
  label_type?: string;
  customer_id: number;
  customer_address_id: number;
  bs_increment_id: string;
  store_id?: number;
  bs_order_id?: number;
  order_ship_info?: string;
  admin_id?: number;
}

export interface AttachedOrder {
  order_type: BrokenScreensOrderType | string;
  increment_id: string;
  entity_id: number | null;
  bs_increment_id: string;
}

export interface AttachOrderSuccessResponse {
  status: 1;
  data: AttachedOrder[];
}

export interface AttachOrderErrorResponse {
  status: 0;
  message: string;
}

export type AttachOrderResponse = AttachOrderSuccessResponse | AttachOrderErrorResponse;

export interface CustomerShippingLabelPayload {
  customrest?: string;
  is_pre_send_label?: boolean;
  label_type?: string;
  fedex_label_type?: string;
  tracking_number: string;
  customer_id: number;
  customer_email?: string;
  customer_name?: string;
  order_id: number;
  order_increment_id?: string;
  shipping_type_label?: string;
  shipping_type?: string;
  order_company?: string;
  amount_charged?: number;
  admin_name?: string;
}

export interface CustomerShippingLabelResponse {
  status: 1 | 0;
  message: string;
}

export interface ReceivePackagePayload {
  customrest?: string;
  label_type?: string;
  tracking_number: string;
  customer_id: number;
  customer_name?: string;
  order_company?: string;
  order_id: number;
  shipping_type_label?: string;
}

export interface ReceivePackageResponse {
  status: 1 | 0;
  message: string;
}

export class BrokenScreensApiService extends BaseApiClient {
  /**
   * Attach a sub-order (RMA, Device RMA, Core Processing, etc.) to a Broken Screens order
   */
  async attachOrder(
    payload: AttachOrderPayload,
    bearerToken?: string
  ): Promise<AttachOrderResponse> {
    return this.request<AttachOrderResponse>(
      '/api/rest/brokenscreens/attachorder',
      'POST',
      payload,
      {},
      bearerToken
    );
  }

  /**
   * Record post-label steps after generating a customer shipping label
   */
  async recordCustomerShippingLabel(
    payload: CustomerShippingLabelPayload,
    bearerToken?: string
  ): Promise<CustomerShippingLabelResponse> {
    return this.request<CustomerShippingLabelResponse>(
      '/api/rest/brokenscreens/customershippinglabel',
      'POST',
      payload,
      {},
      bearerToken
    );
  }

  /**
   * Record pre-send label history for a Broken Screens order
   */
  async receivePackage(
    payload: ReceivePackagePayload,
    bearerToken?: string
  ): Promise<ReceivePackageResponse> {
    return this.request<ReceivePackageResponse>(
      '/api/rest/brokenscreens/receivepackage',
      'POST',
      payload,
      {},
      bearerToken
    );
  }
}
