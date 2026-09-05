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
  familyId: string;
  storage: string;
}

export interface ScreenProduct extends BaseProduct {
  category: 'screen';
  compatibility: string;
  qualityTier: 'Aftermarket' | 'Assembled' | 'Refurbished' | 'Service Pack' | 'Genuine OEM';
}

export type Product = DeviceProduct | ScreenProduct;

export interface DeviceSubmodel {
  name: string;
  screenSize: string;
  description: string;
}

export interface DeviceFamily {
  id: string;
  brand: DeviceProduct['brand'];
  name: string;
  summary: string;
  productIds: string[];
  submodels: DeviceSubmodel[];
}

export const DEVICE_FAMILIES: DeviceFamily[] = [
  {
    id: 'iphone-12',
    brand: 'Apple',
    name: 'iPhone 12 family',
    summary:
      'A 5G-ready iPhone generation with OLED displays across the lineup and sizes from compact to extra large.',
    productIds: ['iphone-12-64-c'],
    submodels: [
      { name: 'iPhone 12 mini', screenSize: '5.4"', description: 'Compact and easy to use one-handed.' },
      { name: 'iPhone 12', screenSize: '6.1"', description: 'The balanced everyday model.' },
      { name: 'iPhone 12 Pro', screenSize: '6.1"', description: 'Premium finish and expanded camera system.' },
      { name: 'iPhone 12 Pro Max', screenSize: '6.7"', description: 'Largest display and strongest camera setup.' },
    ],
  },
  {
    id: 'iphone-11',
    brand: 'Apple',
    name: 'iPhone 11 family',
    summary:
      'Dependable performance, strong battery life, and familiar iPhone features at an approachable price.',
    productIds: ['iphone-11-128-c'],
    submodels: [
      { name: 'iPhone 11', screenSize: '6.1"', description: 'Colorful, practical, and well balanced.' },
      { name: 'iPhone 11 Pro', screenSize: '5.8"', description: 'Compact OLED model with three cameras.' },
      { name: 'iPhone 11 Pro Max', screenSize: '6.5"', description: 'Larger OLED display and longer battery life.' },
    ],
  },
  {
    id: 'galaxy-s22',
    brand: 'Samsung',
    name: 'Galaxy S22 family',
    summary:
      'Bright AMOLED displays, smooth 120 Hz scrolling, and versatile cameras in three distinct sizes.',
    productIds: ['galaxy-s22-128-c'],
    submodels: [
      { name: 'Galaxy S22', screenSize: '6.1"', description: 'Compact flagship with a triple camera.' },
      { name: 'Galaxy S22+', screenSize: '6.6"', description: 'Larger display and battery for everyday use.' },
      { name: 'Galaxy S22 Ultra', screenSize: '6.8"', description: 'S Pen support and the most advanced camera.' },
    ],
  },
];

export const DEVICE_GRADE_GUIDE = [
  {
    grade: 'A',
    label: 'Open Box Quality',
    description:
      'Zero visible defects. Exceptional cosmetic condition with little to no evidence of previous use.',
  },
  {
    grade: 'B',
    label: 'Near-Mint Quality',
    description:
      'Any cosmetic imperfections are almost undetectable. At most, there may be a very light surface mark or hairline scratch visible on close inspection.',
  },
  {
    grade: 'C',
    label: 'Very Good Quality',
    description:
      'Fully operational and still in very good cosmetic condition. Minor signs of normal previous use may be present without affecting everyday use or functionality.',
  },
  {
    grade: 'D',
    label: 'Good / Value Quality',
    description:
      'Fully functional, with light visible signs of wear on the screen and/or housing. A dependable value option backed by a 60-day limited warranty.',
  },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'iphone-12-64-c',
    name: 'iPhone 12',
    brand: 'Apple',
    category: 'device',
    familyId: 'iphone-12',
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
    familyId: 'iphone-11',
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
    familyId: 'galaxy-s22',
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

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

export function getDisplayPrice(product: Product): number {
  return calculateRetailPrice({
    landedCost: product.landedCost,
    releaseYear: product.releaseYear,
    brand: product.brand,
    condition: product.condition,
  }).price;
}
