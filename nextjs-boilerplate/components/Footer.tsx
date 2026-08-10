import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Column 1: Brand Info */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-white tracking-wider">
            HEART <span className="text-red-500">MOBILE</span>
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Your trusted provider for high-quality mobile replacement parts, screens, batteries, and expert repair solutions.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/" className="hover:text-red-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/parts" className="hover:text-red-400 transition-colors">
                Parts Catalog
              </Link>
            </li>
            <li>
              <Link href="/phones" className="hover:text-red-400 transition-colors">
                Supported Devices
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-red-400 transition-colors">
                Checkout
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Legal & Policies */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Policies
          </h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/warranty" className="hover:text-red-400 transition-colors">
                Warranty Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact / Support */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
            Support
          </h4>
          <p className="text-xs text-gray-400 mb-2">
            Questions about compatibility or orders?
          </p>
          <a
            href="mailto:support@heartmobile.ca"
            className="text-xs text-red-400 hover:underline font-mono"
          >
            support@heartmobile.ca
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} Heart Mobile. All rights reserved.</p>
        <p className="text-gray-600">Built with Next.js & Tailwind CSS</p>
      </div>
    </footer>
  );
}
