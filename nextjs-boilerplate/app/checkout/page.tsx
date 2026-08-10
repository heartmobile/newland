import React from 'react';
import { ShoppingBag, CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Navigation / Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <Link 
            href="/parts" 
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shopping
          </Link>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-blue-500" />
            Checkout
          </h1>
          <div className="w-20" /> {/* Spacer for centering balance */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Checkout Form */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Shipping Information */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Truck className="w-5 h-5 text-blue-400" />
                Shipping Details
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">First Name</label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Last Name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-400 mb-1">Street Address</label>
                  <input
                    type="text"
                    placeholder="123 Main St, Apt 4B"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">City</label>
                  <input
                    type="text"
                    placeholder="New York"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Postal / Zip Code</label>
                  <input
                    type="text"
                    placeholder="10001"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-400" />
                Payment Method
              </h2>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Card Number</label>
                  <input
                    type="text"
                    placeholder="4532 •••• •••• 8892"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1">CVC / CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar Order Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 sticky top-6">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-blue-400" />
                Order Summary
              </h2>

              {/* Sample Cart Items */}
              <div className="space-y-4 divide-y divide-slate-800">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-sm font-medium text-white">Replacement OLED Screen</p>
                    <p className="text-xs text-slate-400">Qty: 1</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-200">$89.99</span>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium text-white">Battery Replacement Kit</p>
                    <p className="text-xs text-slate-400">Qty: 1</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-200">$29.99</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="space-y-2 border-t border-slate-800 pt-4 text-sm">
                <div className="flex justify-between text-slate-400">
                  <span>Subtotal</span>
                  <span>$119.98</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Shipping</span>
                  <span className="text-green-400 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Tax</span>
                  <span>$9.60</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-slate-800">
                  <span>Total</span>
                  <span className="text-blue-400">$129.58</span>
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Complete Purchase
              </button>

              <p className="text-center text-xs text-slate-500">
                🔒 256-Bit SSL Encrypted & Secure Checkout
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
