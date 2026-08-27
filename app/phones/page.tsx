'use client';

import { useState } from 'react';
import { DEVICE_GRADE_GUIDE } from '@/lib/products';

interface SearchResult {
  id: string;
  sku: string;
  name: string;
  price: string;
  brand: string;
  deviceModel: string;
}

export default function PhonesPage() {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  async function searchDevices(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const term = query.trim();
    setHasSearched(Boolean(term));

    if (!term) {
      setResults([]);
      setStatus('idle');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) throw new Error('Search request failed');
      setResults(await response.json());
      setStatus('idle');
    } catch {
      setResults([]);
      setStatus('error');
    }
  }

  return (
    <div className="page device-finder-page">
      <div className="shell narrow">
        <header className="page-heading device-finder-heading">
          <span className="eyebrow">Live device finder</span>
          <h1>Find your next phone.</h1>
          <p>Search current iPhone and Samsung Galaxy inventory by model. Available storage, colour, carrier, condition, and pricing are shown from supplier inventory.</p>
        </header>

        <form className="device-search" onSubmit={searchDevices}>
          <label htmlFor="device-search-input">Search a device model</label>
          <div>
            <input
              id="device-search-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Try iPhone 15, Galaxy S25, Pixel 9..."
            />
            <button className="button" type="submit">Search devices</button>
          </div>
        </form>

        <section className="device-results" aria-live="polite" aria-label="Device search results">
          {status === 'loading' && <p>Searching current supplier inventory…</p>}
          {status === 'error' && <p>Search is not available right now. Please try again shortly.</p>}
          {status === 'idle' && hasSearched && results.length === 0 && <p>No matching devices found. Try a model, brand, or generation.</p>}
          {results.length > 0 && (
            <div className="device-result-grid">
              {results.map((result) => (
                <article className="device-result" key={result.id}>
                  <span>{result.brand}</span>
                  <h2>{result.deviceModel || result.name}</h2>
                  <p>From CA${result.price}</p>
                  <small>Choose storage, colour, and grade after selecting a model.</small>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="grade-guide" aria-labelledby="grade-guide-title">
          <div>
            <span className="eyebrow">Condition guide</span>
            <h2 id="grade-guide-title">What grades A–D mean</h2>
          </div>
          <div className="grade-grid">
            {DEVICE_GRADE_GUIDE.map((grade) => (
              <article key={grade.grade}>
                <strong>{grade.grade}</strong>
                <span>{grade.label}</span>
                <p>{grade.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
