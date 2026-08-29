import { NextResponse } from 'next/server';
import { verifyStripeSignature } from '@/lib/security/stripe-webhook';

const MAX_WEBHOOK_BYTES = 262_144;

export async function POST(request: Request) {
  try {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!secret) return NextResponse.json({ error: 'Webhook is not configured.' }, { status: 503 });
    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_WEBHOOK_BYTES) {
      return NextResponse.json({ error: 'Payload is too large.' }, { status: 413 });
    }
    if (!verifyStripeSignature(rawBody, request.headers.get('stripe-signature'), secret)) {
      return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
    }
    const event = JSON.parse(rawBody) as { type?: string; data?: { object?: { id?: string } } };

    if (event.type === 'checkout.session.completed') {
      console.info('[stripe-webhook] Verified checkout event received.', event.data?.object?.id || 'unknown');
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: unknown) {
    console.error('[stripe-webhook] Processing failed.', error instanceof Error ? error.name : 'UnknownError');
    return NextResponse.json({ error: 'Webhook processing failed.' }, { status: 400 });
  }
}
