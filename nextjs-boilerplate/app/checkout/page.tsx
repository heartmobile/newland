import Link from 'next/link';

export default function CheckoutPage() {
  return (
    <div className="page">
      <div className="shell narrow">
        <header className="page-heading">
          <span className="eyebrow">Secure checkout</span>
          <h1>Your cart</h1>
          <p>Checkout opens after live inventory validation and Stripe Checkout are connected.</p>
        </header>
        <div className="empty-cart">
          <span className="empty-icon">♡</span>
          <h2>Your cart is currently empty</h2>
          <p>No payment information is collected on this preview site.</p>
          <div className="actions">
            <Link href="/phones" className="button">Browse devices</Link>
            <Link href="/parts" className="button button-secondary">Browse screens</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
