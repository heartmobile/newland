import { NextResponse } from 'next/server';
import { CustomersApiService, CustomerRegistrationInput } from '@/lib/api'; // ✅ Change SentrixApiService to CustomersApiService

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const apiService = new CustomersApiService(); // ✅ Change SentrixApiService to CustomersApiService

    // Ensure street configuration parses safely into a valid array structure
    const primaryStreet = Array.isArray(body.street) ? body.street[0] : body.street;
    const secondaryStreet = Array.isArray(body.street) ? body.street[1] : '';

    // Map and enforce required registration fields explicitly from your API specification sheet
    const registrationPayload: CustomerRegistrationInput = {
      firstname: body.firstname,
      lastname: body.lastname,
      username: body.username,
      account_type: body.account_type || 'personal',
      email: body.email,
      mobile: body.mobile,
      pre_mobile: Number(body.pre_mobile || 1),
      prefix_main_country_id: body.prefix_main_country_id || 'US',
      password: body.password,
      company_short: body.company_short,
      company: body.company,
      company_website: body.company_website || '',
      street: [primaryStreet || '', secondaryStreet || ''],
      city: body.city,
      region: body.region,
      postcode: body.postcode,
      country_id: body.country_id || 'US',
      telephone: body.telephone,
      pre_address_mobile: Number(body.pre_address_mobile || 1),
      prefix_country_id: body.prefix_country_id || 'US',
      vat_numbers: body.vat_numbers || [],
      user_code: body.user_code || '',
      describes_business: body.describes_business || '',
    };

    // Dispatch payload securely via your server-side OAuth agent
    const registrationResult = await apiService.createCustomer(registrationPayload);

    // Differentiate backend state handling (e.g. username taken or email existing cases)
    if (registrationResult && registrationResult.success === false) {
      return NextResponse.json(registrationResult, { status: 400 });
    }

    return NextResponse.json(registrationResult, { status: 200 });

  } catch (error: any) {
    console.error("Registration Router Exception Block:", error);
    return NextResponse.json(
      { success: false, message: error.message || 'Internal Server Error during registration setup.' },
      { status: 500 }
    );
  }
}
