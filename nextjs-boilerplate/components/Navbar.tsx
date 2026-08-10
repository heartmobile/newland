'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold text-blue-400">
          PhoneParts Direct
        </Link>
        <div className="space-x-6 text-sm font-medium">
          <Link href="/parts" className="hover:text-blue-300">Parts</Link>
          <Link href="/checkout" className="hover:text-blue-300">Checkout</Link>
        </div>
      </div>
    </nav>
  );
}
