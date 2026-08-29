import { NextResponse } from 'next/server';
import {
  SentrixApiService,
  type CustomerRegistrationInput,
} from '@/lib/api/sentrix';
import { readJsonObject, requireSupplierAccess, routeError, RequestValidationError } from '@/lib/security/supplier-api';

function requiredText(body: Record<string, unknown>, field: string, maximum = 200): string {
  const value = body[field];
  if (typeof value !== 'string' || !value.trim() || value.length > maximum) {
    throw new RequestValidationError(`Invalid ${field}.`);
  }
  return value.trim();
}

function optionalText(body: Record<string, unknown>, field: string, fallback: string, maximum = 200): string {
  const value = body[field];
  if (value === undefined || value === null || value === '') return fallback;
  if (typeof value !== 'string' || value.length > maximum) throw new RequestValidationError(`Invalid ${field}.`);
  return value.trim();
}

export async function POST(request: Request) {
  const denied = requireSupplierAccess(request, 'mutation');
  if (denied) return denied;
  try {
    const body = await readJsonObject(request);
    const apiService = new SentrixApiService();

    // Ensure street configuration parses safely into a valid array structure
    const street = Array.isArray(body.street) ? body.street : [body.street];
    const primaryStreet = typeof street[0] === 'string' ? street[0].trim() : '';
    const secondaryStreet = typeof street[1] === 'string' ? street[1].trim() : '';
    if (!primaryStreet || primaryStreet.length > 200 || secondaryStreet.length > 200) {
      throw new RequestValidationError('Invalid street address.');
    }
    const email = requiredText(body, 'email', 254);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new RequestValidationError('Invalid email.');
    const preMobile = Number(body.pre_mobile ?? 1);
    if (!Number.isInteger(preMobile) || preMobile < 1 || preMobile > 9999) throw new RequestValidationError('Invalid pre_mobile.');
    const vatNumbers = Array.isArray(body.vat_numbers) ? body.vat_numbers.map((entry) => {
      if (!entry || typeof entry !== 'object' || Array.isArray(entry)) throw new RequestValidationError('Invalid VAT number.');
      const value = entry as Record<string, unknown>;
      if (typeof value.vat_prefix !== 'string' || typeof value.vat_number !== 'string'
        || value.vat_prefix.length > 20 || value.vat_number.length > 50) {
        throw new RequestValidationError('Invalid VAT number.');
      }
      return { vat_prefix: value.vat_prefix, vat_number: value.vat_number };
    }) : [];

    // Map and enforce required registration fields explicitly from your API specification sheet
    const registrationPayload: CustomerRegistrationInput = {
      customrest: 1,
      firstname: requiredText(body, 'firstname', 100),
      lastname: requiredText(body, 'lastname', 100),
      username: requiredText(body, 'username', 100),
      account_type: body.account_type === 'business' ? 'business' : 'personal',
      email,
      mobile: requiredText(body, 'mobile', 30),
      pre_mobile: preMobile,
      prefix_main_country_id: optionalText(body, 'prefix_main_country_id', 'US', 10),
      password: requiredText(body, 'password', 256),
      company_short: requiredText(body, 'company_short', 100),
      company: requiredText(body, 'company', 200),
      company_website: optionalText(body, 'company_website', '', 300),
      street: [primaryStreet || '', secondaryStreet || ''],
      city: requiredText(body, 'city', 100),
      region: requiredText(body, 'region', 100),
      postcode: requiredText(body, 'postcode', 30),
      country_id: optionalText(body, 'country_id', 'US', 10),
      telephone: requiredText(body, 'telephone', 30),
      prefix: String(body.prefix || body.pre_address_mobile || 1),
      prefix_country_id: optionalText(body, 'prefix_country_id', 'US', 10),
      vat_numbers: vatNumbers,
      user_code: optionalText(body, 'user_code', '', 100),
      describes_business: optionalText(body, 'describes_business', '', 500),
    };

    // Dispatch payload securely via your server-side OAuth agent
    const registrationResult = await apiService.createCustomer(registrationPayload);

    // Differentiate backend state handling (e.g. username taken or email existing cases)
    if (!registrationResult.success) {
      return NextResponse.json(registrationResult, { status: 400 });
    }

    return NextResponse.json(registrationResult, { status: 200 });

  } catch (error: unknown) {
    return routeError(error, 'create customer');
  }
}
