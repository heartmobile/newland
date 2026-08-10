import Link from 'next/link';
import { PRODUCTS } from '@/lib/products';

export default function PhonesPage() {
  const phones = PRODUCTS.filter((p) => p.category === 'phone');

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Cell Phones Catalog</h1>
            <p className="text-slate-500 text-sm mt-1">
              Certified pre-owned and unlocked Apple & Samsung devices.
            </p>
          </div>
          <Link
            href="/"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Brand Jump Links */}
        <div className="flex space-x-3">
          <span className="text-sm font-medium text-slate-600 self-center">Filter Brand:</span>
          <a
            href="#apple"
            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-full text-xs font-semibold text-slate-800 transition"
          >
            iPhones
          </a>
          <a
            href="#samsung"
            className="px-3 py-1 bg-slate-200 hover:bg-slate-300 rounded-full text-xs font-semibold text-slate-800 transition"
          >
            Samsung Galaxy
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {phones.map((phone) => (
            <div
              key={phone.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md border border-slate-200 p-6 flex flex-col justify-between transition"
            >
              <div>
                <div className="text-5xl mb-4">{phone.image}</div>
                <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                  {phone.brand}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-3">{phone.name}</h2>
                <p className="text-slate-500 text-sm mt-1">{phone.description}</p>
                
                {/* Tech Specs List */}
                <ul className="mt-4 text-xs text-slate-600 space-y-1">
                  <li>• Fully unlocked for all carriers</li>
                  <li>• 90-Day warranty included</li>
                  <li>• Sentrix risk-verified inventory</li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block">Price</span>
                  <span className="text-2xl font-extrabold text-slate-900">${phone.price}</span>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-4 py-2 rounded-lg transition shadow-sm">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
