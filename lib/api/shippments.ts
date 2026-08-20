import { BaseApiClient } from './client';

export interface Shipment {
  order_id: string;
  increment_id: string;
  shipping_name: string;
  shipping_company_name: string;
  order_created_date: string;
  tracking_number: string;
  order_shipped_date: string;
  total_quantity: number;
}

export interface ShipmentQueryParams {
  limit?: number | string;
  page?: number | string;
  fromDate?: string; // Format: YYYY-MM-DD HH:mm:ss or YYYY-MM-DD
  toDate?: string;   // Format: YYYY-MM-DD HH:mm:ss or YYYY-MM-DD
}

export class ShipmentsApiService extends BaseApiClient {
  /**
   * Fetch a list of order shipments, with optional date filtering and pagination
   */
  async getShipments(
    params: ShipmentQueryParams = {},
    bearerToken?: string
  ): Promise<Shipment[]> {
    const queryParams: Record<string, string> = {};

    if (params.limit) queryParams.limit = params.limit.toString();
    if (params.page) queryParams.page = params.page.toString();

    if (params.fromDate || params.toDate) {
      queryParams['filter[1][attribute]'] = 'order_shipped_date';
      if (params.fromDate) {
        queryParams['filter[1][from]'] = params.fromDate.includes(' ')
          ? params.fromDate
          : `${params.fromDate} 00:00:00`;
      }
      if (params.toDate) {
        queryParams['filter[1][to]'] = params.toDate.includes(' ')
          ? params.toDate
          : `${params.toDate} 23:59:59`;
      }
    }

    return this.request<Shipment[]>(
      '/api/rest/shipments',
      'GET',
      undefined,
      queryParams,
      bearerToken
    );
  }
}
