'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PartsPage() {
  const [selection, setSelection] = useState<{ brand: string; model: string } | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const brand = params.get('brand');
    const model = params.get('model');
    if (brand && model) setSelection({ brand, model });
  }, []);

  return (
    <div className="page">
      <div className="shell narrow">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Replacement screens</span>
          {selection && <><span>/</span><span>{selection.model}</span></>}
        </nav>
        <header className="page-heading">
          <span className="eyebrow">Replacement screens</span>
          <h1>{selection ? `${selection.model} screens` : 'Find a replacement screen.'}</h1>
          <p>
            {selection
              ? `Available ${selection.brand} ${selection.model} replacement screens will appear here as supplier inventory is connected.`
              : 'Choose Apple, Samsung, or Google from the navigation to select a phone model.'}
          </p>
        </header>
        <div className="catalog-note">
          Live supplier inventory is being connected. Check back soon for compatible screen options and pricing.
        </div>
        <Link href="/" className="text-link">Choose another model</Link>
      </div>
    </div>
  );
}
