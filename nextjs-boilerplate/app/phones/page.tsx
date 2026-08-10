import { getDisplayPrice, getProductsByCategory } from '@/lib/products';

export default function PhonesPage() {
  const products = getProductsByCategory('device');

  return (
    <div className="page">
      <div className="shell">
        <header className="page-heading">
          <span className="eyebrow">Refurbished smartphones</span>
          <h1>Devices</h1>
          <p>Preview inventory while the live MobileSentrix catalog connection is prepared.</p>
        </header>
        <div className="catalog-note">
          Preview data only — purchasing opens after live stock and Stripe checkout are connected.
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <article className="product-card" key={product.id}>
              <div className="product-visual"><span className="device-icon" /></div>
              <div className="product-meta">
                <span>{product.brand}</span>
                <span>Grade {product.condition}</span>
              </div>
              <h2>{product.name}</h2>
              <p>{product.storage} · Unlocked preview</p>
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
