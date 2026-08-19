export type ProductCondition = 'A' | 'B' | 'C' | 'D' | 'Biometric failure';

export interface PricingInput {
  landedCost: number;
  releaseYear: number;
  brand: 'Apple' | 'Samsung' | 'Google' | 'Other';
  condition: ProductCondition;
  marketCeiling?: number;
  currentYear?: number;
}

export interface PricingResult {
  price: number;
  targetMargin: number;
  modelAge: number;
  profitable: boolean;
}

const conditionAdjustments: Record<ProductCondition, number> = {
  A: 0.02,
  B: 0,
  C: -0.03,
  D: -0.07,
  'Biometric failure': -0.12,
};

const demandAdjustments: Record<PricingInput['brand'], number> = {
  Apple: 0.03,
  Samsung: 0,
  Google: -0.01,
  Other: -0.03,
};

export function calculateRetailPrice(input: PricingInput): PricingResult {
  if (!Number.isFinite(input.landedCost) || input.landedCost <= 0) {
    throw new Error('Landed cost must be a positive number.');
  }

  const currentYear = input.currentYear ?? new Date().getFullYear();
  const modelAge = Math.max(0, currentYear - input.releaseYear);
  // Wholesale cost falls with age, while viable percentage margin generally rises.
  // The market ceiling prevents that margin curve from producing an uncompetitive price.
  const ageMargin = 0.12 + modelAge * 0.065;
  const targetMargin = clamp(
    ageMargin + demandAdjustments[input.brand] + conditionAdjustments[input.condition],
    0.1,
    0.78,
  );
  const minimumDollarProfit = Math.min(90, Math.max(25, input.landedCost * 0.1));
  const marginPrice = input.landedCost / (1 - targetMargin);
  const priceFloor = input.landedCost + minimumDollarProfit;
  const uncappedPrice = Math.max(marginPrice, priceFloor);
  const price = roundToRetail(
    input.marketCeiling ? Math.min(uncappedPrice, input.marketCeiling) : uncappedPrice,
  );

  return {
    price,
    targetMargin,
    modelAge,
    profitable: price >= priceFloor,
  };
}

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

function roundToRetail(value: number): number {
  return Math.max(0, Math.ceil(value) - 0.01);
}
