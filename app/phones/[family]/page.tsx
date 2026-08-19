import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FEATURED_PHONE_FAMILIES, getPhoneFamily } from '@/lib/phone-families';

interface FamilyPageProps {
  params: Promise<{ family: string }>;
}

export function generateStaticParams() {
  return FEATURED_PHONE_FAMILIES.map(({ slug }) => ({ family: slug }));
}

export async function generateMetadata({ params }: FamilyPageProps): Promise<Metadata> {
  const { family: slug } = await params;
  const family = getPhoneFamily(slug);

  if (!family) {
    return { title: 'Phone family not found' };
  }

  return {
    title: `${family.name} Refurbished Models`,
    description: `${family.summary} Compare ${family.variants.map(({ name }) => name).join(', ')}.`,
  };
}

export default async function FamilyPage({ params }: FamilyPageProps) {
  const { family: slug } = await params;
  const family = getPhoneFamily(slug);

  if (!family) {
    notFound();
  }

  return (
    <div className="page phone-family-page">
      <div className="shell">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/phones">Devices</Link>
          <span aria-hidden="true">/</span>
          <span>{family.name}</span>
        </nav>

        <section className="model-hero">
          <div className="model-hero-copy">
            <span className="eyebrow">{family.brand} · {family.year}</span>
            <p className="model-kicker">{family.eyebrow}</p>
            <h1>{family.name} series</h1>
            <p>{family.summary}</p>
            <div className="model-highlights" aria-label={`${family.name} highlights`}>
              {family.highlights.map((highlight) => <span key={highlight}>{highlight}</span>)}
            </div>
            <a className="button" href="#compare">Compare models</a>
          </div>
          <div className="model-hero-image">
            <Image
              src={family.heroImage}
              alt={`${family.name} smartphone`}
              width={900}
              height={900}
              priority
            />
          </div>
        </section>

        <section className="variant-section" id="compare">
          <div className="section-heading">
            <span className="eyebrow">Choose your fit</span>
            <h2>Compare the {family.name} lineup</h2>
            <p>Screen sizes are measured diagonally. Actual viewable area is slightly smaller.</p>
          </div>
          <div className="variant-grid">
            {family.variants.map((variant) => (
              <article className="variant-card" key={variant.name}>
                <div className="variant-image">
                  <Image
                    src={variant.image}
                    alt={variant.name}
                    width={600}
                    height={600}
                  />
                </div>
                <div className="variant-card-copy">
                  <span>{variant.screenSize} display</span>
                  <h3>{variant.name}</h3>
                  <p>{variant.fit}</p>
                  <dl>
                    <div><dt>Display</dt><dd>{variant.display}</dd></div>
                    <div><dt>Camera</dt><dd>{variant.camera}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="model-availability">
          <div>
            <span className="eyebrow">Refurbished inventory</span>
            <h2>Find the right storage, colour, and grade.</h2>
            <p>
              Heart Mobile will list available configurations after supplier stock is verified.
              Exact supplier quantities remain private and availability is confirmed before sale.
            </p>
          </div>
          <Link href="/phones" className="button button-dark">View device catalog</Link>
        </section>

        <nav className="model-family-links" aria-label="Other Galaxy S families">
          {FEATURED_PHONE_FAMILIES.filter(({ slug: otherSlug }) => otherSlug !== slug).map((item) => (
            <Link href={`/phones/${item.slug}`} key={item.slug}>
              <small>{item.year}</small>
              <strong>Explore {item.name} →</strong>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
