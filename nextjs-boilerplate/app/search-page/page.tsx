'use client';

import React, { useState, useEffect } from 'react';

interface SearchResult {
  id: string;
  sku: string;
  name: string;
  price: string;
  brand: string;
  deviceModel: string;
  displayImage: string;
}

export default function LiveSearchUI() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the input is cleared, instantly wipe results and don't fetch
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);

    // Debounce timer: wait 300ms after the user stops typing
    const delayDebounceTimer = setTimeout(async () => {
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      } finally {
        setLoading(false);
      }
    }, 300);

    // Cleanup timer if the user types another letter before 300ms passes
    return () => clearTimeout(delayDebounceTimer);
  }, [query]);

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Heart Mobile Device Search</h2>
      
      {/* Search Input Field */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Type to search parts (e.g., iPad 2, iPhone)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 40px 12px 16px',
            fontSize: '16px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            outline: 'none',
            boxSizing: 'border-box'
          }}
        />
        {loading && (
          <div style={{
            position: 'absolute',
            right: '16px',
            top: '14px',
            color: '#888',
            fontSize: '12px'
          }}>
            Loading...
          </div>
        )}
      </div>

      {/* Results Dropdown / List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {results.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px',
              border: '1px solid #eee',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
            }}
          >
            {/* Wikipedia / Fallback Image Asset */}
            <img
              src={item.displayImage}
              alt={item.deviceModel}
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain',
                marginRight: '16px',
                borderRadius: '4px',
                backgroundColor: '#f9f9f9'
              }}
              onError={(e) => {
                // Emergency fallback if the image URL itself fails to load in the browser
                (e.target as HTMLImageElement).src = 'https://mobilesentrix.com';
              }}
            />

            {/* Product Meta Text */}
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '11px', color: '#e53935', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {item.brand} — {item.deviceModel}
              </div>
              <h4 style={{ margin: '4px 0', fontSize: '14px', color: '#222', fontWeight: 600 }}>
                {item.name}
              </h4>
              <div style={{ fontSize: '12px', color: '#777' }}>
                SKU: {item.sku}
              </div>
            </div>

            {/* Pricing Section */}
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#333', marginLeft: '12px' }}>
              ${item.price}
            </div>
          </div>
        ))}

        {/* Empty State Warning */}
        {query && !loading && results.length === 0 && (
          <div style={{ textAlign: 'center', color: '#999', marginTop: '20px', fontSize: '14px' }}>
            No matching device parts found.
          </div>
        )}
      </div>
    </div>
  );
}
