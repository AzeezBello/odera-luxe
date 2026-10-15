import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppStore } from '@/components/WhatsAppStore';
import { getAvailableProducts } from '@/lib/products';
import { ODERA_BESPOKE, ODERA_COLLECTIONS, ODERA_HERO, ODERA_JOURNAL, ODERA_LOOKS, ODERA_SIGNATURE } from '@/lib/media';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function Home() {
  const products = getAvailableProducts();
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const shopProducts = featured.length ? featured : products.slice(0, 6);
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  return (
    <main id="top">
      <Header />

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(90deg,rgba(0,0,0,.72),rgba(0,0,0,.18)),url("${ODERA_HERO}")`,
        }}
      >
        <div className="container heroInner">
          <div className="eyebrow">Urban African</div>
          <h1 className="serif">
            Bespoke
            <br />
            Tailoring
          </h1>
          <p>
            Timeless craftsmanship. Contemporary African identity. ODERA Luxe creates tailored pieces for the modern individual — bold, refined and authentic.
          </p>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link className="btn" href="/collections">
              Explore Collections <span>→</span>
            </Link>
            <Link className="btn darkbtn" href="/bespoke" style={{ border: '1px solid rgba(255,255,255,0.4)' }}>
              The Bespoke Experience
            </Link>
          </div>
        </div>
      </section>

      {/* Signature & Collections Showcase */}
      <section className="section" id="about">
        <div className="container signature">
          <div className="signatureCopy">
            <div className="eyebrow">The ODERA Signature</div>
            <h2>Tailored for presence.</h2>
            <p className="body">
              At ODERA Luxe, clothing is more than what you wear — it is how you move, how you are remembered, and the story you tell. Our bespoke pieces are designed for those who lead, create, and make an impact.
            </p>
            <div style={{ display: 'flex', gap: '18px', marginTop: '10px' }}>
              <Link className="eyebrow" href="/about" style={{ textDecoration: 'underline' }}>
                Our Full Story →
              </Link>
              <Link className="eyebrow" href="/size-chart" style={{ textDecoration: 'underline' }}>
                Size Guide 📏 →
              </Link>
            </div>
          </div>
          <div className="sigImg" style={{ backgroundImage: `url("${ODERA_SIGNATURE}")` }} />
          <div className="collections" id="collections">
            <Link
              className="collection"
              style={{ backgroundImage: `url("${ODERA_COLLECTIONS[0]}")` }}
              href="/collections/men"
            >
              <div>
                <div className="eyebrow">Men</div>
                <h3>Modern tailoring</h3>
                <span className="eyebrow">Explore Collection →</span>
              </div>
            </Link>
            <Link
              className="collection"
              style={{ backgroundImage: `url("${ODERA_COLLECTIONS[1]}")` }}
              href="/collections/women"
            >
              <div>
                <div className="eyebrow">Women</div>
                <h3>Power & form</h3>
                <span className="eyebrow">Explore Collection →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Bespoke Journey Preview */}
      <section className="dark" id="bespoke">
        <div className="bespoke">
          <div className="bespokeImg" style={{ backgroundImage: `url("${ODERA_BESPOKE}")` }} />
          <div className="process">
            <div className="eyebrow">The Bespoke Experience</div>
            <h2 className="sectionTitle">Your vision. Our craft.</h2>
            <div className="processGrid">
              <div className="processItem">
                <strong>01. Consultation</strong>
                <span>Share your style, needs and inspiration.</span>
              </div>
              <div className="processItem">
                <strong>02. Design</strong>
                <span>We create a custom direction for you.</span>
              </div>
              <div className="processItem">
                <strong>03. Fitting</strong>
                <span>Perfecting every detail for your ideal fit.</span>
              </div>
              <div className="processItem">
                <strong>04. Finish</strong>
                <span>Your piece is handcrafted and delivered with care.</span>
              </div>
            </div>
            <div style={{ marginTop: '35px' }}>
              <Link href="/bespoke" className="btn" style={{ padding: '12px 22px' }}>
                Discover Bespoke Atelier Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Looks Grid */}
      <section className="section">
        <div className="container">
          <div className="looksHead">
            <div>
              <div className="eyebrow">Featured Looks</div>
              <h2 className="sectionTitle">
                Modern African
                <br />
                Elegance
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
              <Link className="eyebrow" href="/collections" style={{ textDecoration: 'underline' }}>
                All Collections →
              </Link>
              <Link className="eyebrow" href="/shop" style={{ textDecoration: 'underline' }}>
                Shop Full Catalog →
              </Link>
            </div>
          </div>
          <div className="looks">
            {ODERA_LOOKS.map((image, i) => (
              <Link
                key={image}
                className="look"
                style={{ backgroundImage: `url("${image}")` }}
                href={shopProducts[i]?.slug ? `/look/${shopProducts[i].slug}` : '/shop'}
                aria-label="View ODERA look"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Size Chart Callout Banner */}
      <section className="sizeChartBannerSection">
        <div className="container">
          <div className="sizeChartBanner">
            <div className="sizeChartBannerCopy">
              <div className="eyebrow" style={{ color: '#b9a36a' }}>Atelier Precision</div>
              <h3 className="serif">Flawless Fit. Every Time.</h3>
              <p className="body" style={{ color: '#d0cbc2' }}>
                Whether you know your UK, US, or European sizing, or need custom made-to-measure tailoring, our master cutters have engineered a comprehensive size guide and self-measurement system.
              </p>
            </div>
            <div className="sizeChartBannerAction">
              <Link href="/size-chart" className="btn" style={{ padding: '15px 26px' }}>
                View Complete Size Chart 📏
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Store Section */}
      <section className="section shop" id="shop">
        <div className="container">
          <div className="shopHead">
            <div>
              <div className="eyebrow">ODERA WhatsApp Store</div>
              <h2 className="sectionTitle">Shop the edit.</h2>
              <p className="body">
                Browse available pieces, choose your size, and continue your order or fitting consultation directly with our team on WhatsApp.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/size-chart" className="btn" style={{ background: '#fff' }}>
                Size Guide 📏
              </Link>
              <a
                className="btn darkbtn"
                href={
                  number
                    ? `https://wa.me/${number}?text=${encodeURIComponent('Hello ODERA Luxe, I would like to book a bespoke consultation.')}`
                    : '/contact'
                }
                target={number ? '_blank' : undefined}
                rel={number ? 'noreferrer' : undefined}
              >
                Book a fitting →
              </a>
            </div>
          </div>
          <WhatsAppStore products={shopProducts} />
        </div>
      </section>

      {/* Journal Section */}
      <section className="section journal" id="journal">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '35px' }}>
            <div>
              <div className="eyebrow">Journal</div>
              <h2 className="sectionTitle">Style. Culture. Craft.</h2>
            </div>
            <Link href="/journal" className="eyebrow" style={{ textDecoration: 'underline', color: '#fff' }}>
              View All Dispatches →
            </Link>
          </div>
          <div className="journalGrid">
            {ODERA_JOURNAL.map((image, i) => (
              <Link href="/journal" key={image} className="journalCard" style={{ backgroundImage: `url("${image}")` }}>
                <div>
                  <div className="eyebrow">{['Craft', 'Bespoke', 'Lagos'][i]}</div>
                  <h3 className="serif">
                    {['The rise of African tailoring', 'From fabric to final fit', 'A city of style and possibility'][i]}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
