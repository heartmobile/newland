export default function WarrantyPage() {
  return (
    <div className="page">
      <div className="shell narrow">
        <header className="page-heading">
          <span className="eyebrow">Buy with confidence</span>
          <h1>Warranty & Returns</h1>
          <p>
            We stand behind the quality of our devices and parts with simple,
            transparent coverage.
          </p>
        </header>

        <div className="policy">
          <section>
            <h2>Warranty Program</h2>
            <ul>
              <li>
                <strong>Limited 90-Day Warranty on All Devices:</strong> Covers
                devices or internal components that fail due to natural reasons
                (excludes drops, physical damage, or mishandling).
              </li>
              <li>
                <strong>
                  Limited Lifetime Warranty on Replacement Parts:
                </strong>{" "}
                Covers replacement parts against natural defects for the life of
                the product (excluding batteries). The part must have failed due to
                natural reasons and not due to improper installation or mishandling.
              </li>
            </ul>
          </section>

          <section>
            <h2>Returns</h2>
            <p>
              Products are eligible for return within <strong>30 days</strong> of
              the purchase date.
            </p>
          </section>

          <section>
            <h2>How to Submit a Claim or Return</h2>
            <p>
              To initiate a warranty claim or product return, please email us
              with your order number and details at{" "}
              <a href="mailto:john@heartmobile.ca">john@heartmobile.ca</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
