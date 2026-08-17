import React from 'react';

export const metadata = {
  title: 'Warranty & Returns | HeartMobile',
  description: 'Learn about our device warranty and parts return policy.',
};

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          Warranty & Returns Policy
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Our comprehensive protection details and hardware returns policies are currently being updated. For immediate assistance regarding a replacement part or component warranty claim, please contact our support team directly.
        </p>
      </div>
    </main>
  );
}
