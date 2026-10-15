import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ODERA_JOURNAL, ODERA_LOOKS, ODERA_COLLECTIONS } from '@/lib/media';
import Link from 'next/link';

export const metadata = {
  title: 'Journal | ODERA Luxe Editorial',
  description: 'Essays, style perspectives, and atelier stories on African bespoke tailoring, Lagos sartorial culture, and artisanal craftsmanship.',
};

const ARTICLES = [
  {
    slug: 'rise-of-african-tailoring',
    title: 'The Rise of African Haute Tailoring: Why Lagos is Leading the Movement',
    category: 'Culture',
    date: 'Autumn 2026',
    readTime: '5 min read',
    image: ODERA_JOURNAL[0],
    excerpt: 'From Victoria Island to Mayfair, a new generation of tastemakers is demanding tailoring that reflects African pride without compromising on Savile Row discipline.',
  },
  {
    slug: 'anatomy-of-a-canvas-suit',
    title: 'From Fabric to Final Fit: The Anatomy of an ODERA Floating Canvas',
    category: 'Craftsmanship',
    date: 'Late Summer 2026',
    readTime: '7 min read',
    image: ODERA_JOURNAL[1],
    excerpt: 'Why floating horsehair canvas breathes better in tropical climates and molds to your body with each wearing, unlike fused commercial jackets.',
  },
  {
    slug: 'the-modern-agbada',
    title: 'A City of Style and Possibility: Lagos Sartorial Heritage Reimagined',
    category: 'Heritage',
    date: 'Summer 2026',
    readTime: '4 min read',
    image: ODERA_JOURNAL[2],
    excerpt: 'How our master tailors preserve the majestic volume of ceremonial Agbadas while introducing clean, tapered trousers and modern structural balance.',
  },
  {
    slug: 'women-power-tailoring',
    title: 'Architectural Form: Power Tailoring for the Contemporary Woman',
    category: 'Bespoke',
    date: 'Mid Summer 2026',
    readTime: '6 min read',
    image: ODERA_COLLECTIONS[1],
    excerpt: 'Exploring the intersection of sharp geometric shoulder lines and sculpted feminine silhouettes in contemporary African couture.',
  },
];

export default function JournalPage() {
  return (
    <main id="top">
      <Header />
      <section
        className="pageHero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.35)), url("${ODERA_JOURNAL[1]}")`,
        }}
      >
        <div className="container">
          <div className="eyebrow">ODERA Editorial</div>
          <h1 className="serif">
            Style.
            <br />
            Culture. Craft.
          </h1>
          <p className="body" style={{ color: '#e5e1d9' }}>
            Dispatches from our Lagos cutting room, reflections on sartorial heritage, and guides to enduring bespoke dressing.
          </p>
        </div>
      </section>

      {/* Featured Editorial Grid */}
      <section className="section" style={{ background: '#f5f0e7' }}>
        <div className="container">
          <div className="eyebrow">Recent Dispatches</div>
          <h2 className="sectionTitle">The Atelier Journal.</h2>

          <div className="journalPageGrid">
            {ARTICLES.map((article) => (
              <article key={article.slug} className="journalPageCard">
                <div
                  className="journalPageImg"
                  style={{ backgroundImage: `url("${article.image}")` }}
                >
                  <span className="badge">{article.category}</span>
                </div>
                <div className="journalPageCopy">
                  <div className="journalMeta">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="serif">{article.title}</h3>
                  <p className="body">{article.excerpt}</p>
                  <span className="journalReadLink">Read Feature →</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Sizing & Tailoring Banner */}
      <section style={{ background: '#111', color: '#fff', padding: '70px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="eyebrow" style={{ color: '#b9a36a' }}>Bespoke Knowledge</div>
          <h2 className="sectionTitle" style={{ color: '#fff', margin: '14px auto 20px', maxWidth: '600px' }}>
            Perfect Fit is an Exact Science.
          </h2>
          <p className="body" style={{ color: '#aaa', margin: '0 auto 30px', maxWidth: '520px' }}>
            Learn how we calculate balance, shoulder slope, and chest drop for your bespoke commission.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/size-chart" className="btn" style={{ padding: '14px 24px' }}>
              Explore Size Chart & Fit Guide 📏
            </Link>
            <Link href="/bespoke" className="btn darkbtn" style={{ padding: '14px 24px', border: '1px solid #444' }}>
              The Bespoke Journey →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
