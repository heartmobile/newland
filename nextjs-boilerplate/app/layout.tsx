import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { Smartphone, ShoppingCart, Wrench, ShieldCheck, Scale } from 'lucide-react';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HeartMobile | Mobile Parts & Devices',
  description: 'Your premier destination for high-quality mobile phone replacement parts, devices, and accessories.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased flex flex-col min-h-screen`}>
        
        {/* Top Global Navigation */}
        <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white tracking-tight">
              <div className="p-1.5 bg-blue-600 text-white rounded-lg">
                <Smartphone className="w-5 h-5" />
              </div>
              <span>Heart<span className="text-blue-500">Mobile</span></span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
              <Link href="/parts" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-blue-400" />
                Parts
              </Link>
              <Link href="/phones" className="hover:text-white transition-colors flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                Phones
              </Link>
              <Link href="/warranty" className="hover:text-white transition-colors flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                Warranty
              </Link>
            </nav>

            {/* Cart / Action Button */}
            <div className="flex items-center gap-3">
              <Link
                href="/checkout"
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
              </Link>
            </div>

          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} HeartMobile. All rights reserved.</p>
            
            <div className="flex items-center gap-6">
              <Link href="/terms" className="hover:text-slate-200 transition-colors flex items-center gap-1">
                <Scale className="w-3.5 h-3.5" /> Terms & Conditions
              </Link>
              <Link href="/warranty" className="hover:text-slate-200 transition-colors flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Warranty Policy
              </Link>
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}
