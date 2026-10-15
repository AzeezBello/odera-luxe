import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppStore } from '@/components/WhatsAppStore';
import { getProductsByCategory } from '@/lib/products';
import { ODERA_COLLECTIONS } from '@/lib/media';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const title = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  return {
    title: `${title} Collection | ODERA Luxe`,
    description: `Discover the ODERA Luxe ${title} collection. Bespoke African luxury, tailored silhouettes, and modern craftsmanship.`,
  };
}

export default async function CollectionPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const cat = category.toLowerCase();
  if (!['men', 'women'].includes(cat)) notFound();

  const title = cat.charAt(0).toUpperCase() + cat.slice(1);
  const products = getProductsByCategory(title);
  const heroImage = cat === 'men' ? ODERA_COLLECTIONS[0] : ODERA_COLLECTIONS[1];

  return (
    <main id="top">
      <Header />
      <section
        className="pageHero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.75), rgba(0,0,0,.3)), url("${heroImage}")`,
        }}
      >
        <div className="container">
          <div className="breadcrumbs">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/collections">Collections</Link>
            <span>/</span>
            <strong>{title}</strong>
          </div>
          <div className="eyebrow">ODERA {title}</div>
          <h1 className="serif">
            {title}’s
            <br />
            Collection
          </h1>
          <p className="body" style={{ color: '#e4dfd6' }}>
            {cat === 'men'
              ? 'Sculpted double-breasted suits, peak-lapel evening jackets, and contemporary Lagos sartorial codes engineered for command and presence.'
              : 'Architectural shoulder lines, structured tailoring, and fluid form designed for women of vision, influence, and enduring poise.'}
          </p>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Link
              href={cat === 'men' ? '/collections/women' : '/collections/men'}
              className="btn"
              style={{ padding: '12px 20px' }}
            >
              Switch to {cat === 'men' ? 'Women' : 'Men'} →
            </Link>
            <Link
              href={`/size-chart`}
              className="btn darkbtn"
              style={{ padding: '12px 20px', border: '1px solid rgba(255,255,255,0.3)' }}
            >
              View {title}’s Size Chart 📏
            </Link>
          </div>
        </div>
      </section>

      <section className="section shop">
        <div className="container">
          <div className="shopHead">
            <div>
              <div className="eyebrow">The {title} Edit</div>
              <h2 className="sectionTitle">Available Pieces.</h2>
              <p className="body">
                Select your preferred size, add to your bag, and complete your order or consultation with our atelier team on WhatsApp.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <Link href="/collections" className="eyebrow" style={{ textDecoration: 'underline' }}>
                View All Collections →
              </Link>
            </div>
          </div>

          {products.length ? (
            <WhatsAppStore products={products} />
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <p className="body" style={{ margin: '0 auto 20px' }}>
                This collection edit is currently being updated in our atelier. Contact our concierge to request private commissions.
              </p>
              <Link href="/contact" className="btn darkbtn">
                Contact Concierge →
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
