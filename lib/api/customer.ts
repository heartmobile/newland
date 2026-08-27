import { BaseApiClient } from './client'; // ✅ Pointing to existing file

export interface CustomerAddress {
  id?: number;
  customer_id?: number;
  firstname: string;
  lastname: string;
  street: string[];
  city: string;
  region: string;
  postcode: string;
  country_id: string;
  telephone: string;
  is_default_shipping?: boolean;
  is_default_billing?: boolean;
}

export interface MobileSentrixCustomer {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  store_id?: number;
  website_id?: number;
  created_at?: string;
  updated_at?: string;
  addresses?: CustomerAddress[];
  custom_attributes?: Array<{
    attribute_code: string;
    value: string;
  }>;
}

export interface CustomerPayload {
  email: string;
  firstname: string;
  lastname: string;
  addresses?: CustomerAddress[];
}

export interface CustomerQueryParams {
  page?: string;
  limit?: string;
  email?: string;
  search?: string;
}

export class CustomersApiService extends BaseApiClient {
  /**
   * Fetch a list of customers (filterable by email or search term)
   */
  async getCustomers(
    params: CustomerQueryParams = {},
    bearerToken?: string
  ): Promise<MobileSentrixCustomer[]> {
    const queryParams: Record<string, string> = {};
    if (params.page) queryParams.page = params.page;
    if (params.limit) queryParams.limit = params.limit;
    if (params.email) queryParams.email = params.email;
    if (params.search) queryParams.search = params.search;

    return this.request<MobileSentrixCustomer[]>(
      '/api/rest/customers',
      'GET',
      undefined,
      queryParams,
      bearerToken
    );
  }

  /**
   * Fetch a single customer profile by ID
   */
  async getCustomerById(
    customerId: number | string,
    bearerToken?: string
  ): Promise<MobileSentrixCustomer> {
    return this.request<MobileSentrixCustomer>(
      `/api/rest/customers/${customerId}`,
      'GET',
      undefined,
      {},
      bearerToken
    );
  }

  /**
   * Create a new customer profile
   */
  async createCustomer(
    customerData: CustomerPayload,
    bearerToken?: string
  ): Promise<MobileSentrixCustomer> {
    return this.request<MobileSentrixCustomer>(
      '/api/rest/customers',
      'POST',
      customerData,
      {},
      bearerToken
    );
  }

  /**
   * Update an existing customer profile
   */
  async updateCustomer(
    customerId: number | string,
    customerData: Partial<CustomerPayload>,
    bearerToken?: string
  ): Promise<MobileSentrixCustomer> {
    return this.request<MobileSentrixCustomer>(
      `/api/rest/customers/${customerId}`,
      'PUT',
      customerData,
      {},
      bearerToken
    );
  }
}
