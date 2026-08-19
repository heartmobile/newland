import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  DEVICE_FAMILIES,
  DEVICE_GRADE_GUIDE,
  PRODUCTS,
  getDisplayPrice,
  getProductById,
} from '@/lib/products';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return { title: 'Product not found' };
  }

  return {
    title: product.name,
    description:
      product.category === 'device'
        ? `${product.name} refurbished device with ${product.storage} storage in grade ${product.condition} condition.`
        : `${product.name} replacement screen for ${product.compatibility}.`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const grade = DEVICE_GRADE_GUIDE.find((item) => item.grade === product.condition);
  const family =
    product.category === 'device'
      ? DEVICE_FAMILIES.find((item) => item.id === product.familyId)
      : undefined;

  return (
    <div className="page product-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={product.category === 'device' ? '/phones' : '/parts'}>
            {product.category === 'device' ? 'Devices' : 'Screens'}
          </Link>
          <span aria-hidden="true">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="product-detail">
          <div className={`detail-visual ${product.category === 'screen' ? 'detail-screen' : ''}`}>
            <span
              className={product.category === 'device' ? 'detail-device-icon' : 'detail-screen-icon'}
              aria-hidden="true"
            />
            <small>Product photography coming with live catalog</small>
          </div>

          <div className="detail-copy">
            <span className="eyebrow">
              {product.brand} · {product.category === 'device' ? 'Refurbished device' : product.qualityTier}
            </span>
            <h1>{product.name}</h1>
            <p className="detail-summary">
              {product.category === 'device'
                ? family?.summary
                : `${product.qualityTier} replacement display compatible with ${product.compatibility}.`}
            </p>

            <div className="detail-price">
              <strong>CA${getDisplayPrice(product).toFixed(2)}</strong>
              <span>Estimated preview price</span>
            </div>

            <dl className="detail-specs">
              <div><dt>Brand</dt><dd>{product.brand}</dd></div>
              <div><dt>SKU</dt><dd>{product.sku}</dd></div>
              {product.category === 'device' ? (
                <>
                  <div><dt>Storage</dt><dd>{product.storage}</dd></div>
                  <div><dt>Condition</dt><dd>Grade {product.condition}</dd></div>
                  <div><dt>Network</dt><dd>Unlocked preview</dd></div>
                </>
              ) : (
                <>
                  <div><dt>Compatibility</dt><dd>{product.compatibility}</dd></div>
                  <div><dt>Quality tier</dt><dd>{product.qualityTier}</dd></div>
                </>
              )}
              <div><dt>Preview availability</dt><dd>{product.stockQuantity} units</dd></div>
            </dl>

            <div className="detail-notice">
              <strong>Ordering opens after live inventory is connected.</strong>
              <span>No payment information is collected on this preview site.</span>
            </div>

            <div className="actions">
              <Link href={product.category === 'device' ? '/phones' : '/parts'} className="button">
                Compare listings
              </Link>
              <Link href="/warranty" className="button button-secondary">
                View warranty
              </Link>
            </div>
          </div>
        </div>

        <section className="detail-support">
          <article>
            <span>01</span>
            <h2>Condition explained</h2>
            <p>
              {grade
                ? `Grade ${grade.grade} · ${grade.label}: ${grade.description}`
                : 'Condition details will be confirmed on the live supplier listing.'}
            </p>
          </article>
          <article>
            <span>02</span>
            <h2>Availability rechecked</h2>
            <p>Supplier stock is validated before an order is accepted for fulfillment.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Canadian support</h2>
            <p>Warranty and delivery details are shown clearly before checkout.</p>
          </article>
        </section>
      </div>
    </div>
  );
}
