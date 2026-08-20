import { BaseApiClient } from './clients'; // ✅ Pointing to existing file
export type RegionCode = 'US' | 'CA' | 'UK' | 'EU';

export interface ShippingMethod {
  code: string;
  name: string;
}

export const US_SHIPPING_METHODS: ShippingMethod[] = [
  { code: 'flatrate1', name: 'In Store Pick Up' },
  { code: 'flatrate3', name: 'FedEx Ground' },
  { code: 'flatrate3hd', name: 'FedEx Home Delivery' },
  { code: 'flatrate5', name: 'FedEx Standard Overnight' },
  { code: 'flatrate6', name: 'FedEx Priority Overnight' },
  { code: 'flatrate4', name: 'FedEx 2Day' },
  { code: 'flatrate4pak', name: 'FedEx 2Day (One Rate)' },
  { code: 'flatrate8', name: 'FedEx Saturday' },
  { code: 'flatrate10', name: 'FedEx International Priority' },
  { code: 'flatrate11', name: 'FedEx International Economy' },
  { code: 'flatrate14', name: 'USPS First Class (Ground)' },
  { code: 'flatrate7', name: 'Add to Existing Order' },
  { code: 'flatrate16', name: 'Add To next Order' },
  { code: 'flatrate13', name: 'OWN SHIPPING' },
  { code: 'futureorder', name: 'Reserve Stock For Future' },
  { code: 'flatrate003', name: 'UPS Ground' },
  { code: 'amazonground', name: 'Amazon Ground' },
  { code: 'flatrate013', name: 'UPS Standard Overnight' },
  { code: 'flatrate002', name: 'UPS 2Day' },
  { code: 'flatrate001', name: 'UPS Priority Overnight' },
  { code: 'flatrate001s', name: 'UPS Saturday Delivery' },
  { code: 'flatrate007', name: 'UPS International Priority' },
  { code: 'flatrate008', name: 'UPS International Economy' },
  { code: 'flatrate0u0', name: 'USPS Ground Advantage' },
  { code: 'flatrate0u1', name: 'USPS Priority Mail' },
  { code: 'flatrate0u2', name: 'USPS Priority Mail Express' },
];

export const CA_SHIPPING_METHODS: ShippingMethod[] = [
  { code: 'flatrate1', name: 'In Store Pick Up' },
  { code: 'flatrate3', name: 'FedEx Ground' },
  { code: 'flatrate5', name: 'FedEx Standard Overnight' },
  { code: 'flatrate6', name: 'FedEx Priority Overnight' },
  { code: 'flatrate8', name: 'Fedex Saturday Delivery' },
  { code: 'flatrate9', name: 'FedEx Saver' },
  { code: 'flatrate7', name: 'Add To My Existing Order' },
  { code: 'flatrate16', name: 'Add To next Order' },
  { code: 'flatrate13', name: 'OWN SHIPPING' },
  { code: 'futureorder', name: 'Reserve Stock For Future' },
  { code: 'flatrateuni', name: 'UniUni Standard' },
];

export const UK_SHIPPING_METHODS: ShippingMethod[] = [
  { code: 'flatrate1', name: 'In Store Pick Up' },
  { code: 'flatrate17', name: 'FedEx Priority' },
  { code: 'flatrate18', name: 'FedEx Priority Express' },
  { code: 'flatrate10', name: 'FedEx International Priority' },
  { code: 'flatrate19', name: 'FedEx Regional Economy' },
  { code: 'flatrate20', name: 'FedEx International Priority Express' },
  { code: 'flatrate7', name: 'Add To My Existing Order' },
  { code: 'flatrate16', name: 'Add To next Order' },
  { code: 'flatrate13', name: 'OWN SHIPPING' },
  { code: 'futureorder', name: 'Reserve Stock For Future' },
  { code: 'flatrate007i', name: 'UPS Worldwide Express' },
  { code: 'flatrate011i', name: 'UPS Standard (International)' },
  { code: 'flatrate065i', name: 'UPS Express Saver (International)' },
  { code: 'flatrate0r0', name: 'Royal Mail Tracked 24' },
  { code: 'flatrate0r1', name: 'Royal Mail Tracked 48' },
  { code: 'flatrate0dpd0', name: 'DPD 12:00' },
  { code: 'flatrate0dpd1', name: 'DPD Next Day' },
  { code: 'flatrate0dpd2', name: 'DPD Saturday' },
  { code: 'flatrate0dpd3', name: 'DPD Two Day' },
];

export const EU_SHIPPING_METHODS: ShippingMethod[] = [
  { code: 'flatrate1', name: 'In Store Pick Up' },
  { code: 'flatrate17', name: 'FedEx Priority' },
  { code: 'flatrate18', name: 'FedEx Priority Express' },
  { code: 'flatrate10', name: 'FedEx International Priority' },
  { code: 'flatrate19', name: 'FedEx Regional Economy' },
  { code: 'flatrate20', name: 'FedEx Priority Express' },
  { code: 'flatrate11', name: 'FedEx Economy' },
  { code: 'flatrate7', name: 'Add To My Existing Order' },
  { code: 'flatrate16', name: 'Add To next Order' },
  { code: 'flatrate13', name: 'OWN SHIPPING' },
  { code: 'futureorder', name: 'Reserve Stock For Future' },
  { code: 'flatrate001s', name: 'UPS Saturday Delivery' },
  { code: 'flatrate011', name: 'UPS Standard' },
  { code: 'flatrate007i', name: 'UPS Worldwide Express' },
  { code: 'flatrate011i', name: 'UPS Standard (International)' },
  { code: 'flatrate065i', name: 'UPS Express Saver' },
  { code: 'flatrate0d0', name: 'DHL Domestic 12:00' },
  { code: 'flatrate0d1', name: 'DHL Domestic' },
  { code: 'flatrate0p0', name: 'PostNL Standard Delivery' },
  { code: 'flatrate0p1', name: 'PostNL Delivery before 12:00' },
  { code: 'flatrate0p2', name: 'PostNL Collection at PostNL point' },
  { code: 'flatrate0d3', name: 'DHL Express 12:00' },
  { code: 'flatrate0d4', name: 'DHL Express Worldwide' },
  { code: 'flatrate0d5', name: 'DHL Economy Select' },
];

export const SHIPPING_METHODS_BY_REGION: Record<RegionCode, ShippingMethod[]> = {
  US: US_SHIPPING_METHODS,
  CA: CA_SHIPPING_METHODS,
  UK: UK_SHIPPING_METHODS,
  EU: EU_SHIPPING_METHODS,
};

/**
  Helper to look up a readable name from a shipping method code
 */
export function getShippingMethodName(code: string, region: RegionCode = 'US'): string {
  const methods = SHIPPING_METHODS_BY_REGION[region] || US_SHIPPING_METHODS;
  const match = methods.find((m) => m.code === code);
  return match ? match.name : code;
}
