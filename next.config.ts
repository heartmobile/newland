import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.mobilesentrix.com' },
      { protocol: 'https', hostname: '**.mobilesentrix.ca' },
      { protocol: 'https', hostname: '**.wikipedia.org' },
    ],
  },
  async headers() {
    return [
      // 1. Global Security Headers (Updated for Google Fonts & Mobilesentrix)
      {
        source: '/:path*',
        headers: [
          { 
            key: 'Content-Security-Policy', 
            value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://*.mobilesentrix.com https://*.mobilesentrix.ca https://*.wikipedia.org; font-src 'self' data: https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self' https://*.mobilesentrix.com https://mobilesentrix.com; connect-src 'self' https://*.mobilesentrix.com https://mobilesentrix.com; frame-ancestors 'none'; upgrade-insecure-requests" 
          },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // 2. Admin Route Protections
      {
        source: '/admin/:path*',
        headers: [
          { key: 'Cache-Control', value: 'private, no-store, max-age=0' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
        ],
      },
      // 3. API Route Protections (Ensures backend operations don't leak cache data)
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, max-age=0, must-revalidate' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ];
  },
};

export default nextConfig;
