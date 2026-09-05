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

            {/* Smart Search UI Layer */}
            <div className="w-full max-w-md mt-6 mb-6" style={{ position: 'relative', zIndex: 50 }}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  placeholder="🔍 Search thousands of devices..."
                  style={{
                    width: '100%',
                    padding: '12px 16px 12px 40px',
                    borderRadius: '12px',
                    border: '1px solid #d1d5db',
                    fontSize: '15px',
                    color: '#111827',
                    backgroundColor: '#ffffff',
                    outline: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                  }}
                  onChange={async (e) => {
                    const val = e.target.value;
                    const tray = document.getElementById('search-dropdown-tray');
                    if (!tray) return;
                    if (val.trim().length < 2) { tray.style.display = 'none'; return; }
                    try {
                      const res = await fetch(`/api/search?device=${encodeURIComponent(val)}`);
                      const data = await res.json();
                      let html = '';
                      if (data && data.length > 0) {
                        data.forEach((device: any) => {
                          const wikiImg = `https://wikipedia.org{encodeURIComponent(device.modelName || device.name)}.png`;
                          html += `
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid #f3f4f6; cursor: pointer;">
                              <div style="display: flex; align-items: center; gap: 10px;">
                                <img src="${device.imageUrl || wikiImg}" style="width: 32px; height: 32px; object-fit: contain;" onerror="this.src='https://heartmobile.ca'" />
                                <div>
                                  <div style="font-weight: 700; font-size: 13px; color: #111827;">${device.modelName || device.name}</div>
                                  <div style="font-size: 10px; color: #6b7280;">${device.brand} • API Sync</div>
                                </div>
                              </div>
                              <div style="font-weight: 800; font-size: 13px; color: #dc2626;">CA$${device.retailPrice || '---'}</div>
                            </div>
                          `;
                        });
                        tray.innerHTML = html; tray.style.display = 'block';
                      }
                    } catch (err) { console.log("Awaiting core API verification sync..."); }
                  }}
                  onBlur={() => setTimeout(() => {
                    const tray = document.getElementById('search-dropdown-tray');
                    if (tray) tray.style.display = 'none';
                  }, 200)}
                />
              </div>
              <div id="search-dropdown-tray" style={{
                position: 'absolute', left: 0, right: 0, zIndex: 100, backgroundColor: '#ffffff',
                marginTop: '4px', borderRadius: '8px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                border: '1px solid #e5e7eb', maxHeight: '240px', overflowY: 'auto', display: 'none'
              }}></div>
            </div>

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

      {/* --- SIDE-BY-SIDE PROMO BANNERS --- */}
      <section className="w-full max-w-7xl mx-auto px-4 my-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center">
          
          {/* Banner 1: Orange iPhone Ad */}
          <div className="flex justify-center w-full">
            <Image 
              src="/hm ad orange.png" 
              alt="Heart Mobile iPhone 17 Pro Max Promo" 
              width={600} 
              height={750} 
              className="rounded-2xl shadow-xl w-full h-auto object-cover max-w-[500px]"
              priority
            />
          </div>

          {/* Banner 2: Galaxy Screen Ad */}
          <div className="flex justify-center w-full">
            <Image 
              src="/s25 screen.png" 
              alt="Heart Mobile Screen Replacement Promo" 
              width={600} 
              height={750} 
              className="rounded-2xl shadow-xl w-full h-auto object-cover max-w-[500px]"
              priority
            />
          </div>

        </div>
      </section>
      {/* --------------------------------- */}

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
          <span className="eyebrow">Device index experiment</span>
          <h2>Search available device configurations.</h2>
          <p>Explore a supplied inventory snapshot by model, storage, colour, carrier, and condition without displaying stock totals.</p>
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
