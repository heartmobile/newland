import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-500/10 text-blue-400 rounded-full mb-2 text-2xl">
            ⚖️
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: August 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-8">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              📄 1. Acceptance of Terms
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              By accessing and using this website, purchasing products, or using our services, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree to all terms, please do not use our services.
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              ⚠️ 2. Orders & Pricing
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              All prices displayed are subject to change without notice. We reserve the right to refuse or cancel any order for reason, including errors in product details, pricing mistakes, or stock unavailability.
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              🛡️ 3. Limitation of Liability
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our store and components are provided "as is". Under no circumstances will we be liable for indirect, incidental, or consequential damages resulting from the use or inability to use our products or services.
            </p>
          </section>

          <hr className="border-slate-800" />

          {/* Contact Section */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
            <div>
              <p className="font-semibold text-white text-sm">Questions about our Terms?</p>
              <p className="text-xs text-slate-400">Reach out to our legal & support team.</p>
            </div>
            <a
              href="mailto:support@example.com"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-lg transition-colors whitespace-nowrap"
            >
              Contact Legal
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
