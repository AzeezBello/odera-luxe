import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ODERA_SIGNATURE, ODERA_HERO, ODERA_BESPOKE, ODERA_LOOKS } from '@/lib/media';
import Link from 'next/link';

export const metadata = {
  title: 'About The House | ODERA Luxe Bespoke',
  description: 'Learn the story and ethos of ODERA Luxe: contemporary African identity, Savile Row precision, and Lagos cultural vibrancy.',
};

export default function AboutPage() {
  return (
    <main id="top">
      <Header />
      <section
        className="pageHero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.35)), url("${ODERA_SIGNATURE}")`,
        }}
      >
        <div className="container">
          <div className="eyebrow">The House of ODERA</div>
          <h1 className="serif">
            Tailored For
            <br />
            Presence.
          </h1>
          <p className="body" style={{ color: '#e5e1d9' }}>
            At ODERA Luxe, tailoring is an architectural proclamation of African dignity, modern power, and timeless refinement.
          </p>
          <div style={{ marginTop: '24px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link href="/collections" className="btn" style={{ padding: '12px 20px' }}>
              Explore Collections →
            </Link>
            <Link href="/bespoke" className="btn darkbtn" style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)' }}>
              The Bespoke Process →
            </Link>
          </div>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="section" style={{ background: '#f5f0e7' }}>
        <div className="container">
          <div className="aboutStoryGrid">
            <div className="aboutStoryCopy">
              <div className="eyebrow">The Origin</div>
              <h2 className="sectionTitle">Lagos roots. Global resonance.</h2>
              <p className="body" style={{ maxWidth: '500px' }}>
                ODERA Luxe was founded on a simple conviction: contemporary African fashion does not need validation from European fashion capitals — it commands the room on its own terms.
              </p>
              <p className="body" style={{ maxWidth: '500px', marginTop: '16px' }}>
                Originating in Lagos, Nigeria, our house merges the centuries-old sartorial dignity of West African regal dressing with the disciplined geometry of classic tailoring. We construct garments for leaders, innovators, creators, and discerning tastemakers around the globe.
              </p>

              <div className="aboutStats">
                <div className="statItem">
                  <span className="statNum">50+</span>
                  <span className="statLabel">Hours of hand-crafting per bespoke suit</span>
                </div>
                <div className="statItem">
                  <span className="statNum">100%</span>
                  <span className="statLabel">Canvassed & tailored in Lagos</span>
                </div>
                <div className="statItem">
                  <span className="statNum">24+</span>
                  <span className="statLabel">Precision anatomical measurements</span>
                </div>
              </div>
            </div>

            <div className="aboutStoryImages">
              <div
                className="aboutImgLarge"
                style={{ backgroundImage: `url("${ODERA_BESPOKE}")` }}
              />
              <div
                className="aboutImgSmall"
                style={{ backgroundImage: `url("${ODERA_LOOKS[1]}")` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="dark" style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="eyebrow" style={{ color: '#b9a36a' }}>Guiding Principles</div>
          <h2 className="sectionTitle" style={{ color: '#fff', marginBottom: '40px' }}>
            The Three Pillars of ODERA.
          </h2>

          <div className="pillarsGrid">
            <div className="pillarCard">
              <div className="pillarIndex">01</div>
              <h3 className="serif">Architectural Silhouette</h3>
              <p>
                We do not cut garments to merely fit — we engineer them to elevate posture. Roped shoulders, sculpted chests, and tapered lines give the wearer a natural aura of authority.
              </p>
            </div>

            <div className="pillarCard">
              <div className="pillarIndex">02</div>
              <h3 className="serif">Cultural Authenticity</h3>
              <p>
                Every stitch honors African sartorial majesty. We celebrate the regal presence of the Agbada, the elegance of the Kaftan, and the bold dignity of African ceremonial aesthetics.
              </p>
            </div>

            <div className="pillarCard">
              <div className="pillarIndex">03</div>
              <h3 className="serif">Meticulous Precision</h3>
              <p>
                From hand-basted horsehair canvas to silk thread pick-stitching, we refuse shortcuts. Each garment is built to outlast trends and be passed down as an heirloom of personal style.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Atelier CTA */}
      <section className="section" style={{ background: '#eee8dc', textAlign: 'center' }}>
        <div className="container">
          <div className="eyebrow">Experience The House</div>
          <h2 className="sectionTitle" style={{ margin: '15px auto 25px' }}>
            Ready To Commission Your Piece?
          </h2>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/collections" className="btn darkbtn">
              Explore Collections →
            </Link>
            <Link href="/contact" className="btn" style={{ background: '#fff' }}>
              Visit Atelier & Contact →
            </Link>
            <Link href="/size-chart" className="btn" style={{ background: '#fff' }}>
              View Size Chart 📏
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
