export default function TermsPage() {
  return (
    <div className="page">
      <div className="shell narrow">
        <header className="page-heading">
          <span className="eyebrow">Store information</span>
          <h1>Terms and conditions</h1>
          <p>Last updated August 2026</p>
        </header>
        <div className="policy">
          <section>
            <h2>Preview status</h2>
            <p>This website is currently a storefront preview. Product availability and checkout are not yet active.</p>
          </section>
          <section>
            <h2>Inventory and pricing</h2>
            <p>Future orders are subject to live stock confirmation. Pricing errors or supplier changes may require correction or cancellation before fulfillment.</p>
          </section>
          <section>
            <h2>Product condition</h2>
            <p>Device grades describe cosmetic condition. Functional exceptions, carrier restrictions, and included accessories will be disclosed on each listing.</p>
          </section>
          <section>
            <h2>Contact</h2>
            <p>Questions may be sent to <a href="mailto:john@heartmobile.ca">john@heartmobile.ca</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
