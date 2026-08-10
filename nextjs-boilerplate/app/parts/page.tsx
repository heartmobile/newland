import { getDisplayPrice, getProductsByCategory } from '@/lib/products';

export default function PartsPage() {
  const products = getProductsByCategory('screen');

  return (
    <div className="page">
      <div className="shell">
        <header className="page-heading">
          <span className="eyebrow">Screen components</span>
          <h1>Replacement screens</h1>
          <p>Compare quality tiers, compatibility, availability, and coverage before buying.</p>
        </header>
        <div className="benefit-row">
          <span>Quality tier displayed</span>
          <span>Coverage shown per item</span>
          <span>Local installation referrals coming soon</span>
        </div>
        <div className="catalog-note">
          Preview data only — live supplier inventory has not been connected.
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-visual screen-visual"><span className="screen-icon" /></div>
              <div className="product-meta">
                <span>{product.brand}</span>
                <span>{product.qualityTier}</span>
              </div>
              <h2>{product.name}</h2>
              <p>Compatible with {product.compatibility}</p>
              <div className="stock-row">
                <strong>CA${getDisplayPrice(product).toFixed(2)}</strong>
                <span>{product.stockQuantity} available</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
