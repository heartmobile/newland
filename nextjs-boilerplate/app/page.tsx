import React from 'react';
import Link from 'next/link';
import { Smartphone, Wrench, ShieldCheck, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" /> Premium OEM Parts & Devices
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Your Trusted Source for <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Mobile Devices & Repairs
            </span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Explore certified smartphones, high-grade replacement screens, batteries, and repair modules backed by our standard 1-year warranty.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              href="/parts"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <Wrench className="w-4 h-4" /> Shop Parts
            </Link>
            <Link
              href="/phones"
              className="w-full sm:w-auto px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-medium text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" /> Browse Devices
            </Link>
          </div>
        </div>
      </div>

      {/* Highlights / Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-3 bg-blue-500/10 text-blue-400 w-fit rounded-xl">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Precision Components</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every display, digitizer, and battery undergoes strict quality control testing before reaching your hands.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-3 bg-green-500/10 text-green-400 w-fit rounded-xl">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Fast Dispatch</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Orders placed before cutoff times ship out the same day with tracked, expedited options.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-3">
            <div className="p-3 bg-purple-500/10 text-purple-400 w-fit rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">1-Year Warranty</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Shop with complete confidence knowing every order is protected under our comprehensive defect policy.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="border-t border-slate-800/80 bg-slate-900/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Need support or policy information?</h2>
          <p className="text-xs text-slate-400">
            Check out our detailed warranty guidelines or reach out to our team directly.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <Link
              href="/warranty"
              className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-medium"
            >
              Warranty Terms <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-slate-700">•</span>
            <Link
              href="/terms"
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-300 font-medium"
            >
              Terms & Conditions <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}