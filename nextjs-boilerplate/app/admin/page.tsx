import { getDisplayPrice, PRODUCTS } from '@/lib/products';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const requestHeaders = await headers();
  if (requestHeaders.get('x-heartmobile-admin') !== 'authenticated') {
    notFound();
  }

  const devices = PRODUCTS.filter((product) => product.category === 'device');
  const screens = PRODUCTS.filter((product) => product.category === 'screen');
  const inventoryValue = PRODUCTS.reduce(
    (total, product) => total + getDisplayPrice(product) * product.stockQuantity,
    0,
  );

  return (
    <div className="page shell admin-page">
      <div className="page-heading">
        <span className="eyebrow">Private workspace</span>
        <h1>Heart Mobile admin</h1>
        <p>Monitor the preview catalog while supplier inventory and checkout are connected.</p>
      </div>

      <section className="admin-stats" aria-label="Catalog summary">
        <article>
          <span>Total products</span>
          <strong>{PRODUCTS.length}</strong>
        </article>
        <article>
          <span>Devices / screens</span>
          <strong>{devices.length} / {screens.length}</strong>
        </article>
        <article>
          <span>Units available</span>
          <strong>{PRODUCTS.reduce((total, product) => total + product.stockQuantity, 0)}</strong>
        </article>
        <article>
          <span>Retail inventory value</span>
          <strong>CA${inventoryValue.toLocaleString('en-CA', { maximumFractionDigits: 0 })}</strong>
        </article>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-heading">
          <div>
            <span className="eyebrow">Preview inventory</span>
            <h2>Catalog status</h2>
          </div>
          <span className="admin-badge">Admin only</span>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Type</th>
                <th>Stock</th>
                <th>Retail price</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product) => (
                <tr key={product.id}>
                  <td><strong>{product.name}</strong></td>
                  <td>{product.sku}</td>
                  <td>{product.category === 'device' ? 'Device' : 'Screen'}</td>
                  <td>{product.stockQuantity}</td>
                  <td>CA${getDisplayPrice(product).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
