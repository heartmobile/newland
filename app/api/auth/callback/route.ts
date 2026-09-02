import { NextResponse, NextRequest } from 'next/server';

interface AuthRequestBody {
  oauth_token: string;
  oauth_verifier: string;
}

export async function POST(request: NextRequest) {
  try {
    const { oauth_token, oauth_verifier } = (await request.json()) as AuthRequestBody;

    const consumer_key = process.env.MOBILESENTRIX_CONSUMER_KEY;
    const consumer_secret = process.env.MOBILESENTRIX_CONSUMER_SECRET;

    if (!consumer_key || !consumer_secret) {
      return NextResponse.json(
        { error: 'Server configuration error: Missing API keys.' }, 
        { status: 500 }
      );
    }

    const response = await fetch('https://mobilesentrix.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        consumer_key,
        consumer_secret,
        oauth_token,
        oauth_verifier,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
