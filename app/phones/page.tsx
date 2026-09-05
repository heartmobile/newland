'use client';

import Image from 'next/image';
import { useState } from 'react';
import { DEVICE_GRADE_GUIDE } from '@/lib/products';

interface ColorOption { color: string; carriers: string[]; }
interface ConditionGroup { condition: string; options: ColorOption[]; }
interface StorageGroup { storage: string; conditions: ConditionGroup[]; }
interface SearchResult { id: string; make: string; model: string; storageOptions: StorageGroup[]; }

function cleanGrade(condition: string) { return condition.replace(/^grade\s*/i, '').trim() || condition; }
function uniqueColors(storageOptions: StorageGroup[]) { return Array.from(new Set(storageOptions.flatMap((storage) => storage.conditions.flatMap((condition) => condition.options.map((option) => option.color).filter(Boolean))))); }
function uniqueGrades(storageOptions: StorageGroup[]) { return Array.from(new Set(storageOptions.flatMap((storage) => storage.conditions.map((condition) => cleanGrade(condition.condition))))); }
function deviceArtwork(result: SearchResult) {
  const make = result.make.toLowerCase();
  const model = result.model.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  if ((make.includes('apple') || model.includes('iphone')) && /^iphone 13$/.test(model)) return '/devices/iphone-13.png';
  return null;
}

export default function PhonesPage() {
  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

  async function searchDevices(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); const term = query.trim(); setHasSearched(Boolean(term));
    if (!term) { setResults([]); setStatus('idle'); return; }
    setStatus('loading');
    try { const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`); if (!response.ok) throw new Error('Search request failed'); setResults(await response.json()); setStatus('idle'); }
    catch { setResults([]); setStatus('error'); }
  }

  return <div className="page device-finder-page"><div className="shell narrow">
    <header className="page-heading device-finder-heading"><span className="eyebrow">Device availability</span><h1>Find your next phone.</h1><p>Search the supplied device index by model. Results are grouped by submodel, storage, condition, and available colour without displaying inventory totals or pricing.</p></header>
    <form className="device-search" onSubmit={searchDevices}><label htmlFor="device-search-input">Search a device model</label><div><input id="device-search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try iPhone 15, Galaxy S25, Pixel 9..."/><button className="button" type="submit">Search devices</button></div><small className="device-index-note">Availability snapshot supplied August 28, 2026. Exact stock totals and pricing are not displayed.</small></form>
    <div className="device-live-strip"><strong>● Live inventory from MobileSentrix</strong><span>Prices and availability may vary. Exact stock totals and pricing are not displayed.</span></div>
    <section className="device-results" aria-live="polite" aria-label="Device search results">
      {status === 'loading' && <p>Searching the device index…</p>}{status === 'error' && <p>Search is not available right now. Please try again shortly.</p>}{status === 'idle' && hasSearched && results.length === 0 && <p>No matching devices found. Try a model, brand, or generation.</p>}
      {results.length > 0 && <div className="device-result-list device-result-list-premium">{results.map((result) => {
        const colors=uniqueColors(result.storageOptions), grades=uniqueGrades(result.storageOptions), storage=result.storageOptions.map((option)=>option.storage).filter(Boolean), artwork=deviceArtwork(result);
        return <article className="device-result device-result-premium" key={result.id}>
          <div className={`device-card-visual${artwork ? ' device-card-visual-artwork' : ''}`}>
            {artwork ? <Image src={artwork} alt={`${result.make} ${result.model} representative product artwork`} fill sizes="(max-width: 440px) 100vw, 190px" className="device-product-artwork" /> : <><span>{result.make}</span><div className="device-card-phone" aria-hidden="true"><i/><i/><i/></div><small>Product image coming soon</small></>}
          </div>
          <div className="device-card-main"><div className="device-card-heading"><div><span className="device-brand-label">{result.make}</span><h2>{result.model}</h2><p>Professionally tested. Clearly graded. Ready for everyday use.</p></div><span className="device-stock-badge">✓ Available</span></div>
          <div className="device-card-highlights"><span>✓ Professionally tested</span><span>◇ Clear cosmetic grading</span><span>♡ 60-day limited warranty</span></div>
          <div className="device-card-options"><div><small>Storage</small><strong>{storage[0]||'See options'}</strong>{storage.length>1&&<span>+{storage.length-1} more</span>}</div><div><small>Grade</small><strong>{grades.join(' · ')||'See options'}</strong></div><div><small>Available colours</small><div className="device-card-colors">{colors.slice(0,5).map((color)=><span key={color}>{color}</span>)}{colors.length>5&&<span>+{colors.length-5}</span>}</div></div></div>
          <details className="device-card-details"><summary>View available configurations</summary><div className="device-storage-list">{result.storageOptions.map((storageOption)=><section className="device-storage" key={storageOption.storage}><h3>{storageOption.storage||'Storage not specified'}</h3><div className="device-condition-list">{storageOption.conditions.map((condition)=><div className="device-condition" key={condition.condition}><strong>{condition.condition}</strong><div className="device-color-list">{condition.options.map((option)=><span className="device-color" key={option.color} title={option.carriers.join(', ')}>{option.color||'Colour not specified'}</span>)}</div></div>)}</div></section>)}</div></details></div>
        </article>;
      })}</div>}
    </section>
    <section className="grade-guide" aria-labelledby="grade-guide-title"><div className="grade-guide-heading"><span className="eyebrow">Device condition guide</span><h2 id="grade-guide-title">Clear grades. Fully functional. Great value.</h2><p>Our pre-owned devices are professionally tested and graded for cosmetic condition. All grades are fully functional and ready to use.</p></div><div className="grade-grid">{DEVICE_GRADE_GUIDE.map((grade)=><article key={grade.grade}><strong>{grade.grade}</strong><span>{grade.label}</span><p>{grade.description}</p></article>)}</div><div className="grade-trust-row" aria-label="Device condition assurances"><span>Professionally Tested</span><span>A–D Cosmetic Grading</span><span>Fully Functional</span><span>60-Day Limited Warranty</span></div><div className="grade-guide-note"><b>A–D grades describe cosmetic condition — not functionality.</b><span> Every device is tested and fully operational.</span></div></section>
  </div></div>;
}
