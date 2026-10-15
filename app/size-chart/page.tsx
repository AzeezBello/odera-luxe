import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SizeChartComponent } from '@/components/SizeChartComponent';
import { ODERA_BESPOKE } from '@/lib/media';
import Link from 'next/link';

export const metadata = {
  title: 'Size & Fit Guide | ODERA Luxe Bespoke Tailoring',
  description: 'Explore the ODERA Luxe size chart, tailoring measurement conversions (UK/US/EU), step-by-step measurement guides, and custom bespoke fitting options.',
};

export default function SizeChartPage() {
  return (
    <main id="top">
      <Header />
      <section
        className="pageHero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.35)), url("${ODERA_BESPOKE}")`,
        }}
      >
        <div className="container">
          <div className="eyebrow">Atelier Precision</div>
          <h1 className="serif">
            Size & Fit
            <br />
            Guide
          </h1>
          <p className="body" style={{ color: '#e5e1d9' }}>
            Every ODERA piece is crafted with strict proportion, balance, and poise.
            Use our sizing standards below or consult our master cutters for custom bespoke adjustments.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <a href="#how-to-measure" className="btn" style={{ padding: '12px 20px' }}>
              How to Measure ↓
            </a>
            <Link href="/bespoke" className="btn darkbtn" style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)' }}>
              Bespoke Experience →
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#f5f0e7' }}>
        <div className="container">
          <div className="sizeChartPageIntro">
            <div className="eyebrow">Standard Measurements & Bespoke Fit</div>
            <h2 className="sectionTitle">Tailored For Presence.</h2>
            <p className="body" style={{ maxWidth: '640px' }}>
              Compare standard international sizes (UK, US, EU) against our architectural cuts in centimeters or inches. If you require made-to-measure personalization, submit your exact metrics directly to our cutting room on WhatsApp.
            </p>
          </div>

          <SizeChartComponent initialCategory="men" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
