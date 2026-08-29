# Heart Mobile backend security controls

## Current operating posture

MobileSentrix access is fail-closed. Supplier reads require the owner-controlled internal bearer key and `MOBILESENTRIX_READS_ENABLED=true`. Supplier mutations additionally require `MOBILESENTRIX_MUTATIONS_ENABLED=true`.

The previous `/admin` page, Basic-auth proxy, unknown admin credentials, and admin-only styles were removed. `HEART_MOBILE_INTERNAL_API_KEY` is not an admin account or dashboard; it is a temporary server-side safety lock for deliberate API testing until the owner designs a replacement identity system.

Supplier access decisions emit structured events containing a timestamp, request ID, method, route, access type, and result. They never include credentials or request bodies. Platform console logs are interim operational evidence, not a durable audit ledger.

Keep both flags `false` until MobileSentrix has revoked the previous credentials, supplied replacements, and confirmed the authentication scheme and endpoint contract. Enable reads first. Do not enable mutations during catalog validation.

## Credential handling

- Store live credentials only in the deployment secret manager or a local ignored `.env.local`.
- Never commit, paste into chat, place in screenshots, or include credentials in logs.
- Rotate the consumer key, consumer secret, access token, access-token secret, internal API key, and Stripe webhook secret after suspected exposure.
- A valid replacement credential does not authorize enabling supplier mutations.

## Required checks before supplier reads

1. Confirm the exact OAuth signature method and API origin with official MobileSentrix documentation.
2. Confirm the replacement credential is read-only if scoped credentials are available.
3. Generate a random internal API key of at least 32 characters and keep it in the deployment secret manager.
4. Perform one controlled product/catalog request and save only a sanitized response shape.
5. Reconcile TypeScript schemas with the documented and observed response.
6. Add durable, platform-backed rate limiting before exposing supplier-backed reads to public traffic.

## Required checks before supplier mutations

Do not enable mutations until Heart Mobile has named user identities, role checks, durable audit logging, idempotency storage, cart ownership, quantity and price revalidation, order confirmation safeguards, and a recovery process for partial supplier failures.

## Future owner dashboard

Build the replacement owner dashboard only after choosing and documenting an authentication system. The owner should knowingly enroll the first account, enable MFA, receive an owner role through a recorded bootstrap procedure, and be able to rotate credentials and review privileged-action logs. Do not restore the removed placeholder Basic-auth system.

## Stripe webhook

The webhook verifies Stripe's timestamped HMAC signature against `STRIPE_WEBHOOK_SECRET` and rejects stale, unsigned, oversized, or malformed payloads. It does not place MobileSentrix orders.
