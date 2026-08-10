import React from 'react';
import { PRODUCTS } from '@/lib/products';
import { Wrench, Search, Package, ShieldCheck } from 'lucide-react';

export default function PartsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white flex items-center gap-3">
              <Wrench className="w-8 h-8 text-blue-500" />
              Replacement Parts
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              OEM and high-quality replacement displays, batteries, and internal modules.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search parts by model or SKU..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Feature Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <span className="text-xs text-slate-300 font-medium">Tested & Quality Guaranteed</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-center gap-3">
            <Package className="w-5 h-5 text-green-400 flex-shrink-0" />
            <span className="text-xs text-slate-300 font-medium">Same-Day Dispatch Available</span>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-lg p-4 flex items-center gap-3">
            <Wrench className="w-5 h-5 text-purple-400 flex-shrink-0" />
            <span className="text-xs text-slate-300 font-medium">1-Year Warranty on All Components</span>
          </div>
        </div>

        {/* Product Grid */}
        {PRODUCTS && PRODUCTS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PRODUCTS.map((item) => (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between p-5 space-y-4 group"
              >
                <div>
                  <div className="aspect-square bg-slate-950 rounded-lg mb-4 flex items-center justify-center text-slate-600 group-hover:bg-slate-900/80 transition-colors">
                    <Wrench className="w-12 h-12 text-slate-700 group-hover:text-blue-500 transition-colors" />
                  </div>
                  <h3 className="font-bold text-base text-white">{item.name}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                    {item.compatibility || 'High quality OEM specification replacement component.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80">
                  <span className="text-base font-bold text-blue-400">
                    ${item.price ? item.price.toFixed(2) : '0.00'}
                  </span>
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-md transition-colors">
                    Add Part
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <Package className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">No replacement parts found</h3>
            <p className="text-slate-400 text-sm mt-1">Check back soon for new component stock updates.</p>
          </div>
        )}

      </div>
    </div>
  );
}