import Link from 'next/link';
import Image from 'next/image';
import { getDisplayPrice, getProductsByCategory } from '@/lib/products';

export default function HomePage() {
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
          <div
            className="hero-card hero-artwork"
            role="img"
            aria-label="Heart Mobile iPhone and Samsung promotion on a glowing river table"
          >
            <div className="hero-card-copy">
              <small>Flagship Apple + Samsung</small>
              <strong>Stand out with<br />better value.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          <div><strong>Warranty protection</strong><span>Coverage shown clearly before purchase</span></div>
          <div><strong>Free delivery $150+</strong><span>On eligible Canadian orders</span></div>
          <div><strong>Clear condition grades</strong><span>Know what to expect before ordering</span></div>
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

      <section className="device-finder-promo">
        <div className="shell">
          <span className="eyebrow">Live availability</span>
          <h2>Search every available device.</h2>
          <p>Find current iPhone and Samsung Galaxy inventory by model, then choose the storage, colour, carrier, and condition that fit.</p>
          <Link href="/phones" className="button">Open device finder</Link>
        </div>
      </section>

      <section className="section shell screen-showcase">
        <div className="screen-showcase-grid">
          <Link
            href="/parts"
            className="screen-promo-artwork"
            aria-label="Browse Heart Mobile iPhone and Android replacement screens"
          >
            <span>Explore replacement screens</span>
          </Link>
          <div>
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
          </div>
        </div>
      </section>

      <section className="shopping-guide">
        <div className="shell">
          <div className="section-heading guide-heading">
            <span className="eyebrow">Shop with clarity</span>
            <h2>Know what you&apos;re getting.</h2>
            <p>
              Straightforward product details and support help you choose confidently from
              catalog to delivery.
            </p>
          </div>
          <div className="guide-grid">
            <article>
              <span className="guide-number">01</span>
              <h3>Compare the details</h3>
              <p>Review condition, storage, compatibility, quality tier, and estimated pricing.</p>
            </article>
            <article>
              <span className="guide-number">02</span>
              <h3>Confirm live availability</h3>
              <p>Inventory will be rechecked with the supplier before an order is accepted.</p>
            </article>
            <article>
              <span className="guide-number">03</span>
              <h3>Get covered delivery</h3>
              <p>See warranty terms up front and receive tracking when your order ships.</p>
            </article>
          </div>
          <div className="guide-links">
            <Link href="/warranty">Read warranty details →</Link>
            <Link href="/delivery">See delivery information →</Link>
          </div>
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
