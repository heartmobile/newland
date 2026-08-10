// Types for Sentrix Product & Stock Data
export interface SentrixProduct {
  id: string;
  sku: string;
  title: string;
  category: string;
  compatibility: string;
  wholesalePrice: number;
  retailPrice: number;
  stockQuantity: number;
  inStock: boolean;
}

export interface SentrixApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Configuration from environment variables
const SENTRIX_API_URL = process.env.SENTRIX_API_URL || 'https://api.sentrix.com/v1';
const SENTRIX_API_KEY = process.env.SENTRIX_API_KEY || '';

/**
 * Common headers required for Sentrix requests
 */
function getHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${SENTRIX_API_KEY}`,
  };
}

/**
 * Fetch all products/parts catalog from Sentrix
 */
export async function fetchSentrixProducts(): Promise<SentrixProduct[]> {
  try {
    // If no API key is set yet, return empty or fallback gracefully
    if (!SENTRIX_API_KEY) {
      console.warn('Sentrix API key not found in environment variables.');
      return [];
    }

    const response = await fetch(`${SENTRIX_API_URL}/products`, {
      method: 'GET',
      headers: getHeaders(),
      next: { revalidate: 3600 }, // Cache data for 1 hour in Next.js
    });

    if (!response.ok) {
      throw new Error(`Sentrix API Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error('Failed to fetch Sentrix products:', error);
    return [];
  }
}

/**
 * Fetch live stock & details for a specific part by SKU
 */
export async function fetchSentrixProductBySku(sku: string): Promise<SentrixProduct | null> {
  try {
    if (!SENTRIX_API_KEY) return null;

    const response = await fetch(`${SENTRIX_API_URL}/products/sku/${encodeURIComponent(sku)}`, {
      method: 'GET',
      headers: getHeaders(),
      next: { revalidate: 300 }, // Cache stock check for 5 minutes
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`Sentrix API Error: ${response.status}`);
    }

    const result = await response.json();
    return result.data || result;
  } catch (error) {
    console.error(`Failed to fetch Sentrix SKU (${sku}):`, error);
    return null;
  }
}

/**
 * Check real-time stock levels for a list of SKUs
 */
export async function checkSentrixStock(skus: string[]): Promise<Record<string, number>> {
  try {
    if (!SENTRIX_API_KEY || skus.length === 0) return {};

    const response = await fetch(`${SENTRIX_API_URL}/inventory/check`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ skus }),
      cache: 'no-store', // Always live for real-time stock
    });

    if (!response.ok) throw new Error('Failed to fetch stock updates');

    const result = await response.json();
    return result.stockMap || {};
  } catch (error) {
    console.error('Error checking Sentrix stock:', error);
    return {};
  }
}
