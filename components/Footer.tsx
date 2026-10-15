import Link from 'next/link';

export function Footer() {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="footerTop">
          <div className="footerBrand">
            <Link href="/" className="logo">
              ODERA<small>LUXE</small>
            </Link>
            <p className="body" style={{ color: '#888', marginTop: '16px' }}>
              Urban African bespoke tailoring.
              <br />
              Lagos, Nigeria. Made for presence.
            </p>
            <div className="footerBadge">Handcrafted in Lagos · Global Delivery</div>
          </div>

          <div className="footerCols">
            <div className="footerCol">
              <div className="eyebrow">Collections</div>
              <ul>
                <li><Link href="/collections">All Collections</Link></li>
                <li><Link href="/collections/men">Men’s Tailoring</Link></li>
                <li><Link href="/collections/women">Women’s Couture</Link></li>
                <li><Link href="/shop">Shop WhatsApp Edit</Link></li>
              </ul>
            </div>

            <div className="footerCol">
              <div className="eyebrow">Atelier & Sizing</div>
              <ul>
                <li><Link href="/bespoke">The Bespoke Experience</Link></li>
                <li><Link href="/size-chart">Size Chart & Fit Guide</Link></li>
                <li><Link href="/bespoke#process">Bespoke Process</Link></li>
                <li><Link href="/size-chart#how-to-measure">How to Measure</Link></li>
              </ul>
            </div>

            <div className="footerCol">
              <div className="eyebrow">The House</div>
              <ul>
                <li><Link href="/about">About ODERA Luxe</Link></li>
                <li><Link href="/journal">Journal & Style</Link></li>
                <li><Link href="/contact">Contact & Atelier</Link></li>
                <li><Link href="/admin">Atelier Admin</Link></li>
              </ul>
            </div>

            <div className="footerCol">
              <div className="eyebrow">Concierge</div>
              <p style={{ fontSize: '13px', color: '#bbb', marginBottom: '12px' }}>
                Book private fittings, request bespoke fabric swatches or order directly.
              </p>
              <p>
                <a
                  href={number ? `https://wa.me/${number}` : '#'}
                  target={number ? '_blank' : undefined}
                  rel={number ? 'noreferrer' : undefined}
                  className="footerLinkCta"
                >
                  WhatsApp Concierge →
                </a>
              </p>
              <p>
                <a
                  href="https://instagram.com/odera.ng"
                  target="_blank"
                  rel="noreferrer"
                  className="footerLinkCta"
                >
                  Instagram @odera.ng →
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          <span>© {new Date().getFullYear()} ODERA Luxe. All rights reserved.</span>
          <div className="footerBottomLinks">
            <Link href="/size-chart">Size Guide</Link>
            <Link href="/bespoke">Bespoke Services</Link>
            <Link href="/contact">Appointments</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
