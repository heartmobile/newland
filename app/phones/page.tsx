'use client';

import { useState } from 'react';
import { DEVICE_GRADE_GUIDE } from '@/lib/products';

interface ColorOption {
  color: string;
  carriers: string[];
}

interface ConditionGroup {
  condition: string;
  options: ColorOption[];
}

interface StorageGroup {
  storage: string;
  conditions: ConditionGroup[];
}

interface SearchResult {
  id: string;
  make: string;
  model: string;
  storageOptions: StorageGroup[];
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
          <span className="eyebrow">Device availability experiment</span>
          <h1>Find your next phone.</h1>
          <p>Search the supplied device index by model. Results are grouped by submodel, storage, condition, and available colour without displaying inventory totals or pricing.</p>
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
          <small className="device-index-note">Experimental availability snapshot supplied August 28, 2026. Exact stock totals and pricing are not displayed.</small>
        </form>

        <section className="device-results" aria-live="polite" aria-label="Device search results">
          {status === 'loading' && <p>Searching the device index…</p>}
          {status === 'error' && <p>Search is not available right now. Please try again shortly.</p>}
          {status === 'idle' && hasSearched && results.length === 0 && <p>No matching devices found. Try a model, brand, or generation.</p>}
          {results.length > 0 && (
            <div className="device-result-list">
              {results.map((result) => (
                <article className="device-result" key={result.id}>
                  <span>{result.make}</span>
                  <h2>{result.model}</h2>
                  <div className="device-storage-list">
                    {result.storageOptions.map((storage) => (
                      <section className="device-storage" key={storage.storage}>
                        <h3>{storage.storage || 'Storage not specified'}</h3>
                        <div className="device-condition-list">
                          {storage.conditions.map((condition) => (
                            <div className="device-condition" key={condition.condition}>
                              <strong>{condition.condition}</strong>
                              <div className="device-color-list">
                                {condition.options.map((option) => (
                                  <span className="device-color" key={option.color} title={option.carriers.join(', ')}>
                                    {option.color || 'Colour not specified'}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </section>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="grade-guide" aria-labelledby="grade-guide-title">
          <div className="grade-guide-heading">
            <span className="eyebrow">Device condition guide</span>
            <h2 id="grade-guide-title">Clear grades. Fully functional. Great value.</h2>
            <p>
              Our pre-owned devices are professionally tested and graded for cosmetic condition.
              All grades are fully functional and ready to use.
            </p>
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

          <div className="grade-trust-row" aria-label="Device condition assurances">
            <span>Professionally Tested</span>
            <span>A–D Cosmetic Grading</span>
            <span>Fully Functional</span>
            <span>60-Day Limited Warranty</span>
          </div>

          <div className="grade-guide-note">
            <b>A–D grades describe cosmetic condition — not functionality.</b>
            <span> Every device is tested and fully operational.</span>
          </div>
        </section>
      </div>
    </div>
  );
}
