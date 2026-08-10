import { calculateRetailPrice, type ProductCondition } from './pricing';

export type ProductCategory = 'device' | 'screen';

interface BaseProduct {
  id: string;
  name: string;
  brand: 'Apple' | 'Samsung';
  releaseYear: number;
  condition: ProductCondition;
  landedCost: number;
  marketCeiling: number;
  stockQuantity: number;
  sku: string;
}

export interface DeviceProduct extends BaseProduct {
  category: 'device';
  storage: string;
}

export interface ScreenProduct extends BaseProduct {
  category: 'screen';
  compatibility: string;
  qualityTier: 'Aftermarket' | 'Assembled' | 'Refurbished' | 'Service Pack' | 'Genuine OEM';
}

export type Product = DeviceProduct | ScreenProduct;

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-12-64-c',
    name: 'iPhone 12',
    brand: 'Apple',
    category: 'device',
    releaseYear: 2020,
    condition: 'C',
    storage: '64GB',
    landedCost: 267.57,
    marketCeiling: 399.99,
    stockQuantity: 88,
    sku: 'PREVIEW-IP12-64-C',
  },
  {
    id: 'iphone-11-128-c',
    name: 'iPhone 11',
    brand: 'Apple',
    category: 'device',
    releaseYear: 2019,
    condition: 'C',
    storage: '128GB',
    landedCost: 275.8,
    marketCeiling: 349.99,
    stockQuantity: 77,
    sku: 'PREVIEW-IP11-128-C',
  },
  {
    id: 'galaxy-s22-128-c',
    name: 'Galaxy S22 5G',
    brand: 'Samsung',
    category: 'device',
    releaseYear: 2022,
    condition: 'C',
    storage: '128GB',
    landedCost: 244.23,
    marketCeiling: 399.99,
    stockQuantity: 108,
    sku: 'PREVIEW-S22-128-C',
  },
  {
    id: 'iphone-13-oled',
    name: 'iPhone 13 OLED Screen',
    brand: 'Apple',
    category: 'screen',
    releaseYear: 2021,
    condition: 'A',
    compatibility: 'iPhone 13',
    qualityTier: 'Assembled',
    landedCost: 72,
    marketCeiling: 149.99,
    stockQuantity: 24,
    sku: 'PREVIEW-SCR-IP13-OLED',
  },
  {
    id: 'galaxy-s21-ultra-oled',
    name: 'Galaxy S21 Ultra OLED Assembly',
    brand: 'Samsung',
    category: 'screen',
    releaseYear: 2021,
    condition: 'A',
    compatibility: 'Galaxy S21 Ultra',
    qualityTier: 'Refurbished',
    landedCost: 118,
    marketCeiling: 199.99,
    stockQuantity: 12,
    sku: 'PREVIEW-SCR-S21U-OLED',
  },
];

export function getProductsByCategory(category: 'device'): DeviceProduct[];
export function getProductsByCategory(category: 'screen'): ScreenProduct[];
export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}

export function getDisplayPrice(product: Product): number {
  return calculateRetailPrice({
    landedCost: product.landedCost,
    releaseYear: product.releaseYear,
    brand: product.brand,
    condition: product.condition,
    marketCeiling: product.marketCeiling,
  }).price;
}
