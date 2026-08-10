export interface Product {
  id: string;
  name: string;
  category: 'Screens' | 'Batteries' | 'Accessories' | 'Tools';
  compatibility: string;
  price: number;
  inStock: boolean;
  sku: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 13 OLED Screen Replacement',
    category: 'Screens',
    compatibility: 'iPhone 13',
    price: 89.99,
    inStock: true,
    sku: 'SCR-IP13-OLED',
  },
  {
    id: '2',
    name: 'iPhone 12 High Capacity Battery',
    category: 'Batteries',
    compatibility: 'iPhone 12 / 12 Pro',
    price: 29.99,
    inStock: true,
    sku: 'BAT-IP12-HC',
  },
  {
    id: '3',
    name: 'Samsung Galaxy S21 Ultra LCD & Digitizer',
    category: 'Screens',
    compatibility: 'Samsung S21 Ultra',
    price: 149.99,
    inStock: false,
    sku: 'SCR-S21U-LCD',
  },
  {
    id: '4',
    name: 'Precision Screwdriver & Opening Tool Kit',
    category: 'Tools',
    compatibility: 'Universal Mobile',
    price: 19.99,
    inStock: true,
    sku: 'TOOL-KIT-PRO',
  },
  {
    id: '5',
    name: 'iPhone 11 Premium Replacement Battery',
    category: 'Batteries',
    compatibility: 'iPhone 11',
    price: 24.99,
    inStock: true,
    sku: 'BAT-IP11-STD',
  },
  {
    id: '6',
    name: 'Google Pixel 6 OLED Display Assembly',
    category: 'Screens',
    compatibility: 'Google Pixel 6',
    price: 119.99,
    inStock: true,
    sku: 'SCR-PIX6-OLED',
  },
];

/**
 * Returns all products in the catalog
 */
export function getAllProducts(): Product[] {
  return PRODUCTS;
}

/**
 * Find a specific product by its ID
 */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((product) => product.id === id);
}

/**
 * Filter products by category
 */
export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((product) => product.category === category);
}
