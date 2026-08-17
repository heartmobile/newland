import React from 'react';

export const metadata = {
  title: 'Terms & Conditions | HeartMobile',
  description: 'Review the official terms of service for HeartMobile.',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-4">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 leading-relaxed">
          Welcome to HeartMobile. By accessing our website and purchasing our mobile components, you agree to comply with our standard wholesale terms of service. Our full updated legal terms layout will appear here shortly.
        </p>
      </div>
    </main>
  );
}
