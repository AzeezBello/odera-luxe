import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ODERA_BESPOKE, ODERA_SIGNATURE, ODERA_LOOKS } from '@/lib/media';
import Link from 'next/link';

export const metadata = {
  title: 'The Bespoke Experience | ODERA Luxe Tailoring',
  description: 'Experience true bespoke tailoring with ODERA Luxe. Handcrafted suits, luxury agbadas, and sculpted couture made exclusively for your presence in Lagos and globally.',
};

export default function BespokePage() {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  return (
    <main id="top">
      <Header />
      <section
        className="pageHero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.35)), url("${ODERA_BESPOKE}")`,
        }}
      >
        <div className="container">
          <div className="eyebrow">The Atelier Tradition</div>
          <h1 className="serif">
            The Bespoke
            <br />
            Experience
          </h1>
          <p className="body" style={{ color: '#e5e1d9' }}>
            No two bodies are identical; no two bespoke commissions should ever be the same.
            Step into the ODERA cutting room, where architectural precision meets Nigerian sartorial heritage.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a
              href={number ? `https://wa.me/${number}?text=${encodeURIComponent('Hello ODERA Luxe, I would like to book a bespoke consultation with the master tailor.')}` : '#contact'}
              target={number ? '_blank' : undefined}
              rel={number ? 'noreferrer' : undefined}
              className="btn"
              style={{ padding: '12px 20px' }}
            >
              Book Bespoke Consultation →
            </a>
            <Link href="/size-chart" className="btn darkbtn" style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)' }}>
              Check Measurement Guide 📏
            </Link>
          </div>
        </div>
      </section>

      {/* Philosophy & Craft */}
      <section className="section" style={{ background: '#f5f0e7' }}>
        <div className="container">
          <div className="signature">
            <div className="signatureCopy">
              <div className="eyebrow">The Art of the Cut</div>
              <h2 className="sectionTitle">Cut for posture. Built for legacy.</h2>
              <p className="body">
                Every bespoke garment begins on paper with individual drafts, sculpted to your shoulder slope, stance, and chest contour. We blend the disciplined structure of Savile Row canvassing with the bold majesty and flowing comfort of African ceremonial attire.
              </p>
              <div style={{ marginTop: '20px' }}>
                <Link href="/size-chart#how-to-measure" className="eyebrow" style={{ textDecoration: 'underline' }}>
                  Learn how we measure your silhouette →
                </Link>
              </div>
            </div>
            <div className="sigImg" style={{ backgroundImage: `url("${ODERA_SIGNATURE}")` }} />
            <div className="bespokeQuoteCard">
              <div className="eyebrow">Atelier Philosophy</div>
              <p className="serif" style={{ fontSize: '22px', lineHeight: 1.4, color: '#111', margin: '14px 0' }}>
                “A suit from ODERA is not a uniform. It is armor tailored with elegance, giving its wearer unmistakable presence wherever they arrive.”
              </p>
              <span className="eyebrow" style={{ color: '#888' }}>— Master Cutter, Lagos</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Process Section */}
      <section className="dark" id="process" style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: '#b9a36a' }}>Step By Step</div>
          <h2 className="sectionTitle" style={{ color: '#fff', marginBottom: '20px' }}>
            The 4-Stage Commission.
          </h2>
          <p className="body" style={{ color: '#aaa', maxWidth: '580px', marginBottom: '50px' }}>
            From initial consultation to final hand-finished delivery, our four-stage process ensures uncompromised comfort, movement, and durability.
          </p>

          <div className="processGridDetailed">
            <div className="processDetailCard">
              <div className="processNum">01</div>
              <h3 className="serif">Consultation & Vision</h3>
              <p>
                We begin with a conversation about your lifestyle, upcoming occasions, silhouette desires, and color palette. We discuss styling details from lapel widths and pocket styles to lining motifs.
              </p>
            </div>

            <div className="processDetailCard">
              <div className="processNum">02</div>
              <h3 className="serif">Fabric & Textile Selection</h3>
              <p>
                Choose from our library of premium Super 130s-160s wools, lightweight Irish linens, raw silks, and bespoke hand-woven Nigerian Aso Oke accents specially created for ceremonial lapels and cuffs.
              </p>
            </div>

            <div className="processDetailCard">
              <div className="processNum">03</div>
              <h3 className="serif">Anatomy & Master Fitting</h3>
              <p>
                Over 24 individual anatomical measurements are recorded. We create your dedicated paper pattern and conduct baseline basted fittings to sculpt shoulder slope, drape, and balance.
              </p>
            </div>

            <div className="processDetailCard">
              <div className="processNum">04</div>
              <h3 className="serif">Hand Finishing & Delivery</h3>
              <p>
                Over 50 hours of hand-canvassing, hand-sewn buttonholes, and pick-stitching culminate in a finished masterpiece delivered in an ODERA garment bag, ready for your defining moments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Form / Direct Consultation */}
      <section className="section" style={{ background: '#eee8dc' }}>
        <div className="container">
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow">Begin Your Commission</div>
            <h2 className="sectionTitle">Ready For Your Private Consultation?</h2>
            <p className="body" style={{ margin: '0 auto 30px', maxWidth: '520px' }}>
              Whether in our Lagos studio or via virtual consultation with our international team in London and New York, our tailors are at your service.
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href={number ? `https://wa.me/${number}?text=${encodeURIComponent('Hello ODERA Luxe, I would like to schedule a bespoke consultation.')}` : '#'}
                target={number ? '_blank' : undefined}
                rel={number ? 'noreferrer' : undefined}
                className="btn darkbtn"
                style={{ padding: '16px 28px' }}
              >
                Schedule via WhatsApp →
              </a>
              <Link href="/size-chart" className="btn" style={{ padding: '16px 28px', background: '#fff' }}>
                Submit Sizing Profile →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
