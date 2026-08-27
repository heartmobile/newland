import { BaseApiClient } from './client'; // ✅ Pointing to existing file

export interface SplitShippingMethodPayload {
  quote_id: string;
  shipping_method: string;
}

export interface SplitShippingMethodOption {
  code: string;
  title: string;
  method_title?: string;
  price?: number;
  [key: string]: unknown;
}

export interface SplitShippingError {
  code: number;
  message: string;
  trace?: string;
}

export interface SplitShippingMethodResponse {
  custom_out?: boolean;
  status?: string;
  data?: SplitShippingMethodOption[];
  messages?: {
    error?: SplitShippingError[];
  };
}

export class ShipmentSplitApiService extends BaseApiClient {
  /**
   * Retrieve ground shipping methods for split shipments based on DG classifications
   */
  async getSplitShippingMethods(
    payload: SplitShippingMethodPayload,
    bearerToken?: string
  ): Promise<SplitShippingMethodResponse> {
    return this.request<SplitShippingMethodResponse>(
      '/api/rest/splitOrderShippingMethod',
      'POST',
      payload,
      {},
      bearerToken
    );
  }
}
