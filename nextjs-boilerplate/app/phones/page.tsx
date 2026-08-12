import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  DEVICE_FAMILIES,
  DEVICE_GRADE_GUIDE,
  getDisplayPrice,
  getProductsByCategory,
} from '@/lib/products';
import { FEATURED_PHONE_FAMILIES } from '@/lib/phone-families';

export const metadata: Metadata = {
  title: 'Refurbished Devices',
  description:
    'Compare refurbished iPhone and Samsung Galaxy families, submodels, condition grades, and available configurations.',
};

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
          Preview data only — purchasing opens after live supplier stock and checkout are connected.
        </div>

        <section className="featured-families" aria-labelledby="featured-families-title">
          <div className="featured-heading">
            <div>
              <span className="eyebrow">Shop Galaxy S</span>
              <h2 id="featured-families-title">Compare recent generations</h2>
            </div>
          </div>
          <div className="family-card-grid">
            {FEATURED_PHONE_FAMILIES.map((family) => (
              <Link href={`/phones/${family.slug}`} className="family-card" key={family.slug}>
                <div className="family-card-image">
                  <Image src={family.heroImage} alt="" width={500} height={500} />
                </div>
                <div>
                  <span>{family.brand} · {family.year}</span>
                  <h3>{family.name} series</h3>
                  <p>{family.eyebrow}</p>
                  <strong>Compare models →</strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <nav className="family-nav" aria-label="Device families">
          <span>Jump to a family</span>
          <div>
            {DEVICE_FAMILIES.map((family) => (
              <Link href={`#${family.id}`} key={family.id}>
                <small>{family.brand}</small>
                <strong>{family.name.replace(' family', '')}</strong>
              </Link>
            ))}
          </div>
        </nav>

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

        <div className="family-list">
          {DEVICE_FAMILIES.map((family) => {
            const familyProducts = products.filter((product) =>
              family.productIds.includes(product.id),
            );

            return (
              <section className="device-family" id={family.id} key={family.id}>
                <div className="family-intro">
                  <div className="family-visual" aria-hidden="true">
                    <span className="family-phone family-phone-one" />
                    <span className="family-phone family-phone-two" />
                    <small>{family.brand}</small>
                  </div>
                  <div className="family-copy">
                    <span className="eyebrow">{family.brand}</span>
                    <h2>{family.name}</h2>
                    <p>{family.summary}</p>
                    <h3>Available submodels</h3>
                    <div className="submodel-grid">
                      {family.submodels.map((submodel) => (
                        <article key={submodel.name}>
                          <div>
                            <strong>{submodel.name}</strong>
                            <span>{submodel.screenSize} display</span>
                          </div>
                          <p>{submodel.description}</p>
                        </article>
                      ))}
                    </div>
                    <a className="text-link" href={`#${family.id}-listings`}>
                      See available {family.name.replace(' family', '')} configurations ↓
                    </a>
                  </div>
                </div>

                <div className="listing-heading" id={`${family.id}-listings`}>
                  <div>
                    <span className="eyebrow">Current listings</span>
                    <h3>Choose an available configuration</h3>
                  </div>
                  <span>{familyProducts.length} preview listing{familyProducts.length === 1 ? '' : 's'}</span>
                </div>
                <div className="product-grid">
                  {familyProducts.map((product) => (
                    <article className="product-card listing-card" key={product.id}>
                      <div className="product-meta">
                        <span>{product.brand}</span>
                        <span>Grade {product.condition}</span>
                      </div>
                      <h2>{product.name}</h2>
                      <p>{product.storage} · Unlocked preview</p>
                      <dl className="listing-specs">
                        <div><dt>SKU</dt><dd>{product.sku}</dd></div>
                        <div><dt>Storage</dt><dd>{product.storage}</dd></div>
                        <div><dt>Condition</dt><dd>Grade {product.condition}</dd></div>
                      </dl>
                      <div className="stock-row">
                        <strong>CA${getDisplayPrice(product).toFixed(2)}</strong>
                        <span>{product.stockQuantity} available</span>
                      </div>
                      <div className="listing-actions">
                        <span>Live ordering coming soon</span>
                        <Link href={`/products/${product.id}`}>View details →</Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
