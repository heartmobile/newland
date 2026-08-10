import React from 'react';
import { ShieldCheck, RefreshCw, FileText, HelpCircle } from 'lucide-react';

export default function WarrantyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 text-blue-400 rounded-full mb-2">
            🛡️
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Warranty & Guarantee
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We stand behind the quality of every product. Learn about our coverage, claim process, and commitment to reliability.
          </p>
        </div>

        {/* Coverage Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <span className="text-2xl">🛡️</span>
            <h3 className="font-bold text-lg text-white">1-Year Coverage</h3>
            <p className="text-sm text-slate-400">
              All parts and products include a standard 12-month manufacturer defect warranty.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <span className="text-2xl">🔄</span>
            <h3 className="font-bold text-lg text-white">Hassle-Free Replacement</h3>
            <p className="text-sm text-slate-400">
              If your component fails due to a defect within the coverage window, we will replace it free of charge.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <span className="text-2xl">💬</span>
            <h3 className="font-bold text-lg text-white">Dedicated Support</h3>
            <p className="text-sm text-slate-400">
              Our technical team is on standby to help verify issues and streamline your return authorization.
            </p>
          </div>
        </div>

        {/* Detailed Terms */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-white">
            📄 Warranty Policy Details
          </h2>
          
          <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
            <section>
              <h4 className="font-semibold text-slate-100 text-base mb-1">What is covered:</h4>
              <p>
                Coverage applies strictly to functional defects, manufacturing issues, and unexpected failures under normal use conditions.
              </p>
            </section>

            <section>
              <h4 className="font-semibold text-slate-100 text-base mb-1">What is not covered:</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Damage caused by improper installation, accident, or physical abuse.</li>
                <li>Normal wear and tear from regular long-term use.</li>
                <li>Unauthorized modifications or alterations to the product.</li>
              </ul>
            </section>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="font-medium text-white">Need to file a warranty claim?</p>
              <p className="text-xs text-slate-400">Have your original order number and photos ready.</p>
            </div>
            <a
              href="mailto:support@example.com"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-lg transition-colors whitespace-nowrap"
            >
              Contact Support
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}