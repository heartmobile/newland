import React from 'react';
import { 
  CreditCard, 
  Wallet, 
  ArrowLeftRight, 
  Banknote, 
  Coins, 
  Info,
  Building2,
  Zap
} from 'lucide-react';

interface PaymentMethod {
  title: string;
  description: string;
  icon: React.ReactNode;
  items?: string[];
  subSections?: { name: string; items: string[] }[];
}

export default function PaymentInformationPage() {
  const paymentMethods: PaymentMethod[] = [
    {
      title: "1. Credit & Debit Cards",
      description: "Stripe accepts all major global card brands automatically, alongside local regional networks.",
      icon: <CreditCard className="h-6 w-6 text-blue-600" />,
      subSections: [
        { name: "Global Networks", items: ["Visa", "Mastercard", "American Express (Amex)", "Discover & Diners Club"] },
        { name: "Regional Networks", items: ["China UnionPay (CUP)", "JCB (Japan)", "Cartes Bancaires (France)", "Interac (Canada)"] }
      ]
    },
    {
      title: "2. Digital Wallets",
      description: "Wallets let your customers check out securely without manually typing in card numbers.",
      icon: <Wallet className="h-6 w-6 text-indigo-600" />,
      subSections: [
        { name: "Global", items: ["Apple Pay", "Google Pay", "Amazon Pay", "Click to Pay"] },
        { name: "Regional", items: ["Cash App Pay (US)", "Alipay & WeChat Pay (China)", "Link (Stripe's express tool)"] }
      ]
    },
    {
      title: "3. Bank Debits & Transfers",
      description: "Great for business-to-business (B2B) sales or large invoices because the fees are usually capped much lower than credit cards.",
      icon: <Building2 className="h-6 w-6 text-emerald-600" />
    },
    {
      title: "4. Bank Redirects & Real-Time Payments",
      description: "These instantly send the customer directly to their personal online banking app to verify the transaction in real-time.",
      icon: <Zap className="h-6 w-6 text-amber-500" />
    },
    {
      title: "5. Buy Now, Pay Later (BNPL)",
      description: "These allow customers to buy an item immediately and break the cost down into smaller installments, while Stripe still pays your business upfront.",
      icon: <ArrowLeftRight className="h-6 w-6 text-purple-600" />,
      items: ["Klarna", "Affirm", "Afterpay / Clearpay", "Zip"]
    },
    {
      title: "6. Cash-Based Vouchers",
      description: "Ideal for customers who do not use traditional bank accounts. The website generates a voucher, and the customer pays physical cash at a local convenience store to finalize the online order.",
      icon: <Banknote className="h-6 w-6 text-teal-600" />
    },
    {
      title: "7. Crypto & Stablecoins",
      description: "Stripe lets businesses natively accept stablecoins globally, automatically converting the cryptocurrency into traditional US Dollars (USD) right inside your merchant payout balance.",
      icon: <Coins className="h-6 w-6 text-orange-500" />
    }
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Block */}
        <div className="border-b border-slate-200 pb-8 mb-8 text-center sm:text-left">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Accepted Payment Methods
          </h1>
          <p className="mt-3 text-lg text-slate-500">
            A comprehensive breakdown of our supported billing channels and processing infrastructure.
          </p>
        </div>

        {/* Payment Methods Iteration */}
        <div className="space-y-6">
          {paymentMethods.map((method, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center space-x-3 mb-3">
                {method.icon}
                <h2 className="text-xl font-bold text-slate-900">
                  {method.title}
                </h2>
              </div>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {method.description}
              </p>

              {/* Standard List Items (BNPL) */}
              {method.items && (
                <ul className="grid grid-cols-2 gap-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
                  {method.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-slate-700 flex items-center">
                      <span className="text-emerald-500 font-bold mr-2">✓</span> {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Multi-Section Items (Cards & Wallets) */}
              {method.subSections && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {method.subSections.map((sub, subIdx) => (
                    <div key={subIdx} className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        {sub.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {sub.items.map((item, itemIdx) => (
                          <span 
                            key={itemIdx} 
                            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-slate-200 text-slate-800 border border-slate-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dashboard Integration Banner */}
        <div className="mt-12 bg-slate-900 text-white rounded-xl p-6 shadow-sm border border-slate-800">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-slate-800 rounded-lg shrink-0">
              <Info className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                How to Turn Them On
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                You do not need to write code to add these options to your store platform. You can toggle these parameters on or off instantly inside your centralized merchant configuration dashboard layout settings.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
