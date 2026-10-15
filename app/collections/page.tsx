import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppStore } from '@/components/WhatsAppStore';
import { getAvailableProducts } from '@/lib/products';
import { ODERA_COLLECTIONS, ODERA_LOOKS } from '@/lib/media';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Collections | ODERA Luxe Bespoke Tailoring',
  description: 'Explore the full spectrum of ODERA Luxe tailoring: Men’s Architectural Suiting, Women’s Sculpted Couture, and Contemporary Ceremonial Wear.',
};

export default function CollectionsPage() {
  const products = getAvailableProducts();

  return (
    <main id="top">
      <Header />
      <section
        className="pageHero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.3)), url("${ODERA_COLLECTIONS[0]}")`,
        }}
      >
        <div className="container">
          <div className="eyebrow">The Atelier Edit</div>
          <h1 className="serif">
            All
            <br />
            Collections
          </h1>
          <p className="body" style={{ color: '#e5e1d9' }}>
            A curated synthesis of Nigerian artisanal heritage and contemporary bespoke tailoring.
            Discover pieces structured for presence, authority, and ease.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/collections/men" className="btn" style={{ padding: '12px 20px' }}>
              Men’s Collection →
            </Link>
            <Link href="/collections/women" className="btn darkbtn" style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)' }}>
              Women’s Collection →
            </Link>
            <Link href="/size-chart" className="btn" style={{ padding: '12px 20px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.5)' }}>
              Size Guide 📏
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="section" style={{ background: '#f0ece3', padding: '80px 0' }}>
        <div className="container">
          <div className="eyebrow">Explore By Wardrobe</div>
          <h2 className="sectionTitle">Distinct Directions.</h2>

          <div className="collectionsGridThree">
            <Link
              href="/collections/men"
              className="collectionCard"
              style={{ backgroundImage: `url("${ODERA_COLLECTIONS[0]}")` }}
            >
              <div className="collectionCardInner">
                <div className="eyebrow">Men</div>
                <h3 className="serif">Architectural Tailoring</h3>
                <p>Commanding double-breasted suits, tuxedo jackets, and contemporary Lagos cuts.</p>
                <span className="collectionLinkText">Explore Men’s Edit →</span>
              </div>
            </Link>

            <Link
              href="/collections/women"
              className="collectionCard"
              style={{ backgroundImage: `url("${ODERA_COLLECTIONS[1]}")` }}
            >
              <div className="collectionCardInner">
                <div className="eyebrow">Women</div>
                <h3 className="serif">Sculpted Form</h3>
                <p>Power blazers, tailored sheath gowns, and sculpted silhouettes with modern grace.</p>
                <span className="collectionLinkText">Explore Women’s Edit →</span>
              </div>
            </Link>

            <Link
              href="/bespoke"
              className="collectionCard"
              style={{ backgroundImage: `url("${ODERA_LOOKS[2]}")` }}
            >
              <div className="collectionCardInner">
                <div className="eyebrow">Atelier</div>
                <h3 className="serif">Bespoke & Ceremonial</h3>
                <p>One-of-a-kind commissions, bridal tailoring, luxury agbada, and custom textile choices.</p>
                <span className="collectionLinkText">Commission Bespoke →</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* All Available Products with WhatsApp Store */}
      <section className="section shop" id="shop-edit">
        <div className="container">
          <div className="shopHead">
            <div>
              <div className="eyebrow">Available For Enquiry</div>
              <h2 className="sectionTitle">Current Pieces.</h2>
              <p className="body">
                Order via our interactive WhatsApp bag. Select your preferred size or request custom bespoke fitting directly from each piece.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/size-chart" className="btn" style={{ background: '#fff' }}>
                View Size Chart →
              </Link>
            </div>
          </div>

          <WhatsAppStore products={products} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
