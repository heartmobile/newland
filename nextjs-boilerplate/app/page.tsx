import Link from 'next/link';
import { getDisplayPrice, getProductsByCategory } from '@/lib/products';

export default function HomePage() {
  const featuredDevices = getProductsByCategory('device').slice(0, 3);
  const featuredScreens = getProductsByCategory('screen').slice(0, 2);

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <span className="eyebrow">Your tech. Our heart.</span>
            <h1>Reliable mobile tech, priced for real life.</h1>
            <p className="hero-copy">
              Shop refurbished Apple and Samsung devices or find a quality replacement screen
              with clear grading, warranty information, and Canadian support.
            </p>
            <div className="actions">
              <Link href="/phones" className="button">Shop devices</Link>
              <Link href="/parts" className="button button-secondary">Browse screens</Link>
            </div>
          </div>
          <div className="hero-card" aria-label="Heart Mobile shopping benefits">
            <span className="phone-shape phone-one" />
            <span className="phone-shape phone-two" />
            <div className="hero-card-copy">
              <small>Apple + Samsung</small>
              <strong>More choice.<br />Better value.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          <div><strong>Warranty protection</strong><span>Coverage shown clearly before purchase</span></div>
          <div><strong>Free delivery $150+</strong><span>On eligible Canadian orders</span></div>
          <div><strong>Secure checkout</strong><span>Payments processed by Stripe</span></div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading">
          <span className="eyebrow">Shop your way</span>
          <h2>Start with what you need</h2>
        </div>
        <div className="category-grid">
          <Link href="/phones" className="category-card sage-card">
            <span>Refurbished devices</span>
            <h3>iPhone and Samsung Galaxy</h3>
            <p>Compare storage, grade, carrier compatibility, and live availability.</p>
            <strong>Browse devices →</strong>
          </Link>
          <Link href="/parts" className="category-card light-card">
            <span>Replacement screens</span>
            <h3>Displays for popular models</h3>
            <p>Compare aftermarket, assembled, refurbished, and genuine OEM options.</p>
            <strong>Browse screens →</strong>
          </Link>
        </div>
      </section>

      <section className="featured-section">
        <div className="shell">
          <div className="featured-heading">
            <div>
              <span className="eyebrow">Featured preview</span>
              <h2>Popular devices</h2>
            </div>
            <Link href="/phones">View device catalog →</Link>
          </div>
          <div className="product-grid">
            {featuredDevices.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-visual"><span className="device-icon" /></div>
                <div className="product-meta">
                  <span>{product.brand}</span>
                  <span>Grade {product.condition}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.storage} · Unlocked preview</p>
                <div className="stock-row">
                  <strong>CA${getDisplayPrice(product).toFixed(2)}</strong>
                  <span>{product.stockQuantity} available</span>
                </div>
              </article>
            ))}
          </div>
          <p className="preview-disclaimer">
            Preview inventory and estimated pricing. Live supplier quantities will replace these
            samples when the MobileSentrix API is connected.
          </p>
        </div>
      </section>

      <section className="section shell screen-showcase">
        <div className="section-heading">
          <span className="eyebrow">Repair your phone</span>
          <h2>Choose the screen quality that fits.</h2>
          <p>Every listing will explain its quality tier, compatibility, and warranty coverage.</p>
        </div>
        <div className="screen-list">
          {featuredScreens.map((product) => (
            <Link href="/parts" className="screen-row" key={product.id}>
              <span className="mini-screen" aria-hidden="true" />
              <span>
                <small>{product.brand} · {product.qualityTier}</small>
                <strong>{product.name}</strong>
                <em>Compatible with {product.compatibility}</em>
              </span>
              <b>CA${getDisplayPrice(product).toFixed(2)}</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="repair-banner">
        <div className="shell repair-content">
          <div>
            <span className="eyebrow">Need installation?</span>
            <h2>Connect with a local repair professional.</h2>
            <p>
              Our repair-partner directory is coming soon, with participating screen
              installations from $40.
            </p>
          </div>
          <Link href="/parts" className="button button-dark">Choose your screen</Link>
        </div>
      </section>
    </>
  );
}
