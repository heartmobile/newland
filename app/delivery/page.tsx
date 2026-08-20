export default function DeliveryPage() {
  return (
    <div className="page">
      <div className="shell narrow">
        <header className="page-heading">
          <span className="eyebrow">Canadian delivery</span>
          <h1>Simple, tracked shipping</h1>
          <p>Delivery timing and eligibility are confirmed at checkout before payment.</p>
        </header>
        <div className="info-grid">
          <section>
            <h2>Free delivery over $150</h2>
            <p>Eligible Canadian orders receive free standard delivery after discounts and before tax.</p>
          </section>
          <section>
            <h2>Live stock confirmation</h2>
            <p>Supplier availability is rechecked before an order is accepted for fulfillment.</p>
          </section>
          <section>
            <h2>Tracking provided</h2>
            <p>A tracking link is emailed when the order is handed to the delivery carrier.</p>
          </section>
          <section>
            <h2>Questions?</h2>
            <p>Email <a href="mailto:john@heartmobile.ca">john@heartmobile.ca</a> before ordering.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
