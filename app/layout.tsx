import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { BrandNavigation } from '@/components/brand-navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Heart Mobile | Refurbished Phones & Screens',
    template: '%s | Heart Mobile',
  },
  description:
    'Refurbished smartphones and replacement screens, backed by clear grading and local support.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="announcement">Free delivery on eligible orders over $150 across Canada</div>
        <header className="site-header">
          <div className="shell nav-wrap">
            <Link href="/" className="brand" aria-label="Heart Mobile home">
              <span className="brand-mark">♥</span>
              <span>Heart <strong>Mobile</strong></span>
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <BrandNavigation />
              <Link href="/phones">Devices</Link>
              <Link href="/parts">Screens</Link>
              <Link href="/delivery">Delivery</Link>
              <Link href="/warranty">Warranty</Link>
            </nav>
            <Link href="/checkout" className="button button-small">Cart</Link>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="shell footer-grid">
            <div>
              <div className="brand brand-footer">
                <span className="brand-mark">♥</span> Heart Mobile
              </div>
              <p>Refurbished devices and replacement screens with straightforward support.</p>
            </div>
            <div className="footer-links">
              <Link href="/terms">Terms</Link>
              <Link href="/warranty">Warranty</Link>
              <Link href="/delivery">Delivery</Link>
              <a href="mailto:john@heartmobile.ca">Contact</a>
            </div>
          </div>
          <div className="shell copyright">
            <span>© {new Date().getFullYear()} Heart Mobile. All rights reserved.</span>
            <div className="payment-methods">
              <span>Payment options available when checkout launches</span>
              <Image
                src="/payment-methods.png"
                width={393}
                height={39}
                alt="Visa, Mastercard, PayPal, Apple Pay, American Express, Discover, and Interac"
              />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
