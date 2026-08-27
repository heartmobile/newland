export type ProductCondition = 'A' | 'B' | 'C' | 'D' | 'Biometric failure';

export type ProductBrand = 'Apple' | 'Samsung' | 'Google' | 'Other';

export interface PricingInput {
  landedCost: number;
  releaseYear: number;
  brand: ProductBrand;
  condition?: ProductCondition;
  currentYear?: number;
}

export interface PricingResult {
  price: number;
  targetMargin: number;
  modelAge: number;
  profitable: boolean;
}

const MODEL_RELEASE_YEARS: Array<{ pattern: RegExp; year: number }> = [
  { pattern: /\biphone\s*17\b/i, year: 2025 },
  { pattern: /\biphone\s*16\b/i, year: 2024 },
  { pattern: /\biphone\s*15\b/i, year: 2023 },
  { pattern: /\biphone\s*14\b/i, year: 2022 },
  { pattern: /\biphone\s*13\b/i, year: 2021 },
  { pattern: /\biphone\s*12\b/i, year: 2020 },
  { pattern: /\biphone\s*11\b/i, year: 2019 },
  { pattern: /\biphone\s*(?:xs|xr)\b/i, year: 2018 },
  { pattern: /\biphone\s*(?:x|8|7|6s?|se)\b/i, year: 2017 },
  { pattern: /\bgalaxy\s+s25\b/i, year: 2025 },
  { pattern: /\bgalaxy\s+s24\b/i, year: 2024 },
  { pattern: /\bgalaxy\s+s23\b/i, year: 2023 },
  { pattern: /\bgalaxy\s+s22\b/i, year: 2022 },
  { pattern: /\bgalaxy\s+s21\b/i, year: 2021 },
  { pattern: /\bgalaxy\s+s20\b/i, year: 2020 },
  { pattern: /\bgalaxy\s+s10\b/i, year: 2019 },
  { pattern: /\bgalaxy\s+s9\b/i, year: 2018 },
  { pattern: /\bgalaxy\s+s[0-8]\b/i, year: 2017 },
  { pattern: /\bpixel\s*10\b/i, year: 2025 },
  { pattern: /\bpixel\s*9\b/i, year: 2024 },
  { pattern: /\bpixel\s*8\b/i, year: 2023 },
  { pattern: /\bpixel\s*7\b/i, year: 2022 },
  { pattern: /\bpixel\s*6\b/i, year: 2021 },
  { pattern: /\bpixel\s*5\b/i, year: 2020 },
  { pattern: /\bpixel\s*4\b/i, year: 2019 },
  { pattern: /\bpixel\s*3\b/i, year: 2018 },
  { pattern: /\bpixel\s*(?:2|xl)\b/i, year: 2017 },
  { pattern: /\bpixel\b/i, year: 2016 },
];

export function getReleaseYear(productName: string): number | undefined {
  return MODEL_RELEASE_YEARS.find(({ pattern }) => pattern.test(productName))?.year;
}

export function getMarkupForReleaseYear(releaseYear: number, currentYear = new Date().getFullYear()): number {
  const modelAge = Math.max(0, currentYear - releaseYear);
  if (modelAge <= 3) return 0.05;
  if (modelAge <= 7) return 0.2;
  return 1;
}

export function calculateRetailPrice(input: PricingInput): PricingResult {
  if (!Number.isFinite(input.landedCost) || input.landedCost <= 0) {
    throw new Error('Landed cost must be a positive number.');
  }

  const currentYear = input.currentYear ?? new Date().getFullYear();
  const modelAge = Math.max(0, currentYear - input.releaseYear);
  const targetMargin = getMarkupForReleaseYear(input.releaseYear, currentYear);

  return {
    price: roundToRetail(input.landedCost * (1 + targetMargin)),
    targetMargin,
    modelAge,
    profitable: true,
  };
}

function roundToRetail(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
