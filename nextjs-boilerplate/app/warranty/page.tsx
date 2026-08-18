import Link from 'next/link';

export default function WarrantyPage() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif', color: '#18181b' }}>
      <main>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Warranty Program</h1>
        
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', lineHeight: '1.7', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Limited 90 day warranty on all devices</strong> (limited means that the device, part of the device must have failed for "natural reasons" — not because it was dropped or mishandled).
          </li>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Limited Life Time warranty on all Replacement parts (excluding batteries)</strong>. (Again, the part must have failed due to natural reasons. Not because of improper installation or mishandling).
          </li>
        </ul>

        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Returns</h2>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', lineHeight: '1.7', listStyleType: 'disc' }}>
          <li>
            Products are returnable for <strong>30 days</strong> from the purchase date.
          </li>
        </ul>
      </main>

      <footer style={{ borderTop: '1px solid #e4e4e7', paddingTop: '1.5rem', marginTop: '3rem', textAlign: 'center' }}>
        <p style={{ display: 'flex', gap: '1rem', justifyContent: 'center', fontSize: '0.9rem', color: '#71717a' }}>
          <Link href="/terms" style={{ color: '#0070f3', textDecoration: 'none' }}>Terms & Conditions</Link>
          <span>—</span>
          <Link href="/privacy" style={{ color: '#0070f3', textDecoration: 'none' }}>Privacy Policy</Link>
          <span>—</span>
          <Link href="/warranty" style={{ color: '#0070f3', textDecoration: 'none' }}>Warranty & Returns</Link>
        </p>
      </footer>
    </div>
  );
}
