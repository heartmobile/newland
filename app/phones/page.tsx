"use client";

import { useState, useMemo } from 'react';
import type { Metadata } from 'next'; // Note: metadata export works in Next.js client components if structured or handled via layout, or we can keep it clean.
import Link from 'next/link';
import Image from 'next/image';
import {
  DEVICE_FAMILIES,
  DEVICE_GRADE_GUIDE,
  getDisplayPrice,
  getProductsByCategory,
} from '@/lib/products';
import { FEATURED_PHONE_FAMILIES } from '@/lib/phone-families';

// If this causes a Next.js client component metadata warning, 
// you can move the metadata export to a layout.tsx file for this route.
export const metadata: Metadata = {
  title: 'Refurbished Devices',
  description:
    'Compare refurbished iPhone and Samsung Galaxy families, submodels, condition grades, and available configurations.',
};

export default function PhonesPage() {
  const products = getProductsByCategory('device');

  // Search and filter state for the live inventory table
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMake, setSelectedMake] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // Map product catalog to match filterable index requirements
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.storage && product.storage.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesMake = selectedMake === "All" || product.brand.toLowerCase() === selectedMake.toLowerCase();
      const matchesCondition = selectedCondition === "All" || `Grade ${product.condition}` === selectedCondition || product.condition === selectedCondition;

      return matchesSearch && matchesMake && matchesCondition;
    });
  }, [products, searchQuery, selectedMake, selectedCondition]);

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[id] || 0;
      const updated = Math.max(0, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const totalCartPrice = useMemo(() => {
    return Object.entries(quantities).reduce((sum, [id, qty]) => {
      const product = products.find((p) => p.id === id);
      return sum + (product ? getDisplayPrice(product) * qty : 0);
    }, 0);
  }, [quantities, products]);

  const primaryRed = "#E31B23";

  return (
    <div className="page" style={{ background: "#f8f9fa", minHeight: "100vh", paddingBottom: "60px" }}>
      <div className="shell" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Page Header */}
        <header className="page-heading" style={{ background: "#ffffff", borderBottom: "1px solid #eaeaea", padding: "40px 20px", marginBottom: "30px", borderRadius: "8px" }}>
          <span className="eyebrow" style={{ color: "#666", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px", fontWeight: "600" }}>Refurbished smartphones</span>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "750", color: "#111", margin: "8px 0 12px 0" }}>Devices</h1>
          <p style={{ color: "#555", fontSize: "1rem", maxWidth: "700px" }}>Live inventory feed connected directly via MobileSentrix catalog. Filter by submodel, storage, condition, or carrier below.</p>
        </header>

        {/* Featured Families Banner Section */}
        <section className="featured-families" aria-labelledby="featured-families-title" style={{ marginBottom: "40px" }}>
          <div className="featured-heading" style={{ marginBottom: "20px" }}>
            <div>
              <span className="eyebrow" style={{ color: primaryRed, fontWeight: "600", textTransform: "uppercase", fontSize: "0.85rem" }}>Shop Galaxy S & Apple</span>
              <h2 id="featured-families-title" style={{ fontSize: "1.8rem", fontWeight: "700", color: "#111" }}>Compare recent generations</h2>
            </div>
          </div>
          <div className="family-card-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {FEATURED_PHONE_FAMILIES.map((family) => (
              <Link href={`/phones/${family.slug}`} className="family-card" key={family.slug} style={{ background: "#fff", padding: "20px", borderRadius: "8px", border: "1px solid #eaeaea", textDecoration: "none", display: "flex", gap: "16px", alignItems: "center" }}>
                <div className="family-card-image" style={{ width: "80px", height: "80px", position: "relative", flexShrink: 0 }}>
                  <Image src={family.heroImage} alt="" width={80} height={80} style={{ objectFit: "contain" }} />
                </div>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#666", textTransform: "uppercase" }}>{family.brand} · {family.year}</span>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: "700", color: "#111", margin: "4px 0" }}>{family.name} series</h3>
                  <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "8px" }}>{family.eyebrow}</p>
                  <strong style={{ fontSize: "0.85rem", color: primaryRed }}>Compare models →</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Search & Filter Toolbar */}
        <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center" }}>
          <div style={{ flex: "1 1 300px" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px", color: "#333" }}>
              Search Models, SKUs, Storage
            </label>
            <input 
              type="text" 
              placeholder="e.g. iPhone, Galaxy S22, 128GB..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "0.95rem" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px", color: "#333" }}>
              Filter Make
            </label>
            <select 
              value={selectedMake} 
              onChange={(e) => setSelectedMake(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", background: "#fff", fontSize: "0.95rem" }}
            >
              <option value="All">All Makes</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: "600", marginBottom: "6px", color: "#333" }}>
              Filter Condition
            </label>
            <select 
              value={selectedCondition} 
              onChange={(e) => setSelectedCondition(e.target.value)}
              style={{ padding: "10px 14px", borderRadius: "6px", border: "1px solid #ccc", background: "#fff", fontSize: "0.95rem" }}
            >
              <option value="All">All Conditions</option>
              <option value="Grade A">Grade A</option>
              <option value="Grade B">Grade B</option>
              <option value="Grade C">Grade C</option>
              <option value="Grade D">Grade D</option>
              <option value="Face and Touch ID Issue">Face and Touch ID Issue</option>
            </select>
          </div>
        </div>

        {/* Live Data Table Grid matching MobileSentrix layout */}
        <div style={{ background: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", overflowX: "auto", marginBottom: "24px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "0.92rem" }}>
            <thead>
              <tr style={{ background: primaryRed, color: "#fff" }}>
                <th style={{ padding: "14px 16px", fontWeight: "600" }}>Make ▼</th>
                <th style={{ padding: "14px 16px", fontWeight: "600" }}>Model / Name ▼</th>
                <th style={{ padding: "14px 16px", fontWeight: "600" }}>Size ▼</th>
                <th style={{ padding: "14px 16px", fontWeight: "600" }}>SKU ▼</th>
                <th style={{ padding: "14px 16px", fontWeight: "600" }}>Condition ▼</th>
                <th style={{ padding: "14px 16px", fontWeight: "600" }}>Carrier ▼</th>
                <th style={{ padding: "14px 16px", fontWeight: "600" }}>Available</th>
                <th style={{ padding: "14px 16px", fontWeight: "600" }}>Price</th>
                <th style={{ padding: "14px 16px", fontWeight: "600", textAlign: "center" }}>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={product.id} style={{ borderBottom: "1px solid #eee", background: index % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={{ padding: "14px 16px", color: "#333" }}>{product.brand}</td>
                    <td style={{ padding: "14px 16px", fontWeight: "600", color: "#111" }}>
                      <Link href={`/products/${product.id}`} style={{ color: "inherit", textDecoration: "none" }}>
                        {product.name} →
                      </Link>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#555" }}>{product.storage}</td>
                    <td style={{ padding: "14px 16px", color: "#555", fontSize: "0.85rem" }}>{product.sku}</td>
                    <td style={{ padding: "14px 16px" }}>
                      <span style={{ padding: "3px 8px", background: "#f1f3f5", borderRadius: "4px", fontSize: "0.85rem", fontWeight: "600", color: "#333" }}>
                        Grade {product.condition}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#555", fontSize: "0.85rem" }}>CDMA / GSM Unlocked</td>
                    <td style={{ padding: "14px 16px", color: "#2b8a3e", fontWeight: "600" }}>{product.stockQuantity} pcs</td>
                    <td style={{ padding: "14px 16px", fontWeight: "700", color: "#111" }}>CA${getDisplayPrice(product).toFixed(2)}</td>
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "4px", background: "#fff" }}>
                        <button 
                          onClick={() => handleQtyChange(product.id, -1)}
                          style={{ padding: "4px 10px", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}
                        >
                          -
                        </button>
                        <span style={{ padding: "0 10px", fontWeight: "600", minWidth: "24px" }}>
                          {quantities[product.id] || 0}
                        </span>
                        <button 
                          onClick={() => handleQtyChange(product.id, 1)}
                          style={{ padding: "4px 10px", background: "none", border: "none", cursor: "pointer", fontWeight: "bold" }}
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} style={{ padding: "40px", textAlign: "center", color: "#777" }}>
                    No inventory matches your search criteria. Try a different query or make filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Action Toolbar Footer */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", background: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", marginBottom: "60px" }}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button style={{ background: primaryRed, color: "#fff", border: "none", padding: "12px 24px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
              Add To Cart
            </button>
            <button style={{ background: "#1c7ed6", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
              Checkout
            </button>
            <button style={{ background: "#000", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
              View Cart
            </button>
            <button style={{ background: "#228be6", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "6px", fontWeight: "600", cursor: "pointer" }}>
              Export Result (CSV)
            </button>
          </div>

          <div style={{ fontSize: "1.2rem", fontWeight: "700", color: "#111", marginTop: "10px" }}>
            TOTAL: <span style={{ color: primaryRed }}>CA${totalCartPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Official MobileSentrix Grading Standards Reference Guide at Bottom */}
        <section className="grade-guide" aria-labelledby="grade-guide-title" style={{ background: "#fff", padding: "30px", borderRadius: "8px", borderTop: `4px solid ${primaryRed}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ marginBottom: "20px" }}>
            <span className="eyebrow" style={{ color: "#666", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "1px", fontWeight: "600" }}>Condition guide</span>
            <h2 id="grade-guide-title" style={{ fontSize: "1.5rem", fontWeight: "700", color: "#111", marginTop: "4px" }}>Device Grading Reference Standards</h2>
            <p style={{ color: "#555", fontSize: "0.95rem", marginTop: "6px" }}>Official MobileSentrix quality specifications for pre-owned devices.</p>
          </div>
          <div className="grade-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
            {DEVICE_GRADE_GUIDE.map((grade) => (
              <article key={grade.grade} style={{ background: "#f8f9fa", padding: "16px", borderRadius: "6px", border: "1px solid #e9ecef" }}>
                <strong style={{ fontSize: "1.1rem", fontWeight: "600", color: primaryRed, display: "block", marginBottom: "4px" }}>{grade.grade}</strong>
                <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "#333", display: "block", marginBottom: "8px" }}>{grade.label}</span>
                <p style={{ fontSize: "0.9rem", color: "#555", lineHeight: "1.5" }}>{grade.description}</p>
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
