import { BaseApiClient } from './client';

export interface CutoffWindow {
  from_1: string;
  to_1: string;
  shipday_1: string;
  from_2: string;
  to_2: string;
  shipday_2: string;
}

export interface AddToExistingWindow {
  from: string;
  to: string;
}

export interface ShippingCutoffDetail {
  shipping_method: string;
  shipping_description: string;
  free_shipping_amount: string;
  shipping_cutoff: Record<string, CutoffWindow>;
  add_to_existing: Record<string, AddToExistingWindow>;
}

// Keyed dynamically by method code (e.g., 'flatrate3', 'flatrate003', 'flatrate14')
export type ShippingCutoffResponse = Record<string, ShippingCutoffDetail>;

export class CutoffTimeApiService extends BaseApiClient {
  /**
   * Fetch cutoff times and delivery schedules across all shipping methods
   */
  async getCutoffTimes(bearerToken?: string): Promise<ShippingCutoffResponse> {
    return this.request<ShippingCutoffResponse>(
      '/api/rest/cutofftime',
      'GET',
      undefined,
      {},
      bearerToken
    );
  }
}
