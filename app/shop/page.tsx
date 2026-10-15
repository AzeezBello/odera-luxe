import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppStore } from '@/components/WhatsAppStore';
import { getAvailableProducts } from '@/lib/products';
import { ODERA_HERO } from '@/lib/media';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Shop WhatsApp Edit | ODERA Luxe',
  description: 'Shop contemporary African luxury tailoring directly through WhatsApp. Select sizes, request fittings, and order bespoke pieces.',
};

export default function ShopPage() {
  const products = getAvailableProducts();
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  return (
    <main id="top">
      <Header />
      <section
        className="pageHero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.35)), url("${ODERA_HERO}")`,
        }}
      >
        <div className="container">
          <div className="eyebrow">Direct Atelier Access</div>
          <h1 className="serif">
            Shop The
            <br />
            WhatsApp Edit
          </h1>
          <p className="body" style={{ color: '#e5e1d9' }}>
            Browse our current ready-to-wear and bespoke-order tailoring.
            Select your size, build your curated bag, and connect directly with our styling team on WhatsApp for personalized fittings.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/size-chart" className="btn" style={{ padding: '12px 20px' }}>
              Size & Fit Guide 📏
            </Link>
            <a
              href={number ? `https://wa.me/${number}?text=${encodeURIComponent('Hello ODERA Luxe, I would like to book a private fitting consultation.')}` : '#'}
              target={number ? '_blank' : undefined}
              rel={number ? 'noreferrer' : undefined}
              className="btn darkbtn"
              style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              Book Private Fitting →
            </a>
          </div>
        </div>
      </section>

      {/* Sizing & Concierge Banner */}
      <section style={{ background: '#201f1c', color: '#f3efe7', padding: '30px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="eyebrow" style={{ color: '#b9a36a' }}>Atelier Service</div>
            <strong style={{ fontSize: '18px', display: 'block', margin: '4px 0', fontFamily: 'Playfair Display, serif' }}>
              Need precise measurements or custom sizing?
            </strong>
            <p style={{ margin: 0, fontSize: '12px', color: '#bbb', maxWidth: '520px' }}>
              Every suit and gown can be made to your exact measurements. View our conversion tables or chat directly with our master tailors.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Link href="/size-chart" className="btn" style={{ fontSize: '11px', padding: '10px 18px' }}>
              Open Size Chart
            </Link>
            <Link href="/bespoke" className="btn darkbtn" style={{ fontSize: '11px', padding: '10px 18px', border: '1px solid #444' }}>
              Bespoke Service
            </Link>
          </div>
        </div>
      </section>

      {/* Store Section */}
      <section className="section shop" style={{ background: '#e8e2d8' }}>
        <div className="container">
          <div className="shopHead">
            <div>
              <div className="eyebrow">ODERA Catalog</div>
              <h2 className="sectionTitle">Available Silhouettes.</h2>
              <p className="body">
                Add pieces to your bag. Each item includes standard sizes (XS - 3XL) and custom bespoke options.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="/collections/men" className="eyebrow">
                Men’s Edit →
              </Link>
              <Link href="/collections/women" className="eyebrow">
                Women’s Edit →
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
