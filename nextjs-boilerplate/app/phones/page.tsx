import React from 'react';
import { PRODUCTS } from '@/lib/products';
import { Search, SlidersHorizontal, Smartphone } from 'lucide-react';

export default function PhonesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-blue-500" />
              Phone Catalog
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Browse our inventory of premium phones and certified replacement parts.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search devices or parts..."
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Product Grid */}
        {PRODUCTS && PRODUCTS.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between p-5 space-y-4"
              >
                <div>
                  <div className="aspect-square bg-slate-950 rounded-lg mb-4 flex items-center justify-center text-slate-600 font-medium">
                    {/* Placeholder image container */}
                    <Smartphone className="w-16 h-16 text-slate-700" />
                  </div>
                  <h3 className="font-bold text-lg text-white">{product.name}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {product.compatibility || 'High quality device component.'}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span className="text-lg font-bold text-blue-400">
                    ${product.price ? product.price.toFixed(2) : '0.00'}
                  </span>
                  <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-md transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
            <SlidersHorizontal className="w-10 h-10 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white">No products found</h3>
            <p className="text-slate-400 text-sm mt-1">Check back soon for new inventory updates.</p>
          </div>
        )}

      </div>
    </div>
  );
}