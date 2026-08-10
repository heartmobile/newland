# Heart Mobile storefront

Next.js storefront for Heart Mobile refurbished devices and replacement screens.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Current status

- The catalog contains clearly marked preview data.
- Checkout intentionally does not collect payment information.
- `lib/pricing.ts` contains the initial age-based pricing model.
- The MobileSentrix adapter remains disabled until official API documentation is available.

## Environment variables

Server-side values only:

```text
SENTRIX_API_URL=
SENTRIX_API_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
ADMIN_USERNAME=
ADMIN_PASSWORD=
```

Never prefix secrets with `NEXT_PUBLIC_` or commit them to Git.

## Admin access

Copy `.env.example` to `.env.local`, set a unique `ADMIN_USERNAME` and
`ADMIN_PASSWORD` of at least 16 characters, then open `/admin`. The browser
will prompt for those credentials. Admin access fails closed when either value
is missing or weak. There is no public signup, role-change endpoint, or
self-promotion path: admin status can only be granted by changing the private
deployment environment.

Only deploy admin access behind HTTPS. Rotate the password immediately if it is
ever shared accidentally or appears in logs, screenshots, source control, or
chat.
