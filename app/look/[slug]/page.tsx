import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WhatsAppStore } from '@/components/WhatsAppStore';
import { ProductDetailView } from '@/components/ProductDetailView';
import { getAvailableProducts, getProductBySlug } from '@/lib/products';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found | ODERA Luxe' };
  return {
    title: `${product.name} | ODERA Luxe Tailoring`,
    description: product.description || `View ${product.name} from the ODERA Luxe collection. Bespoke African luxury craftsmanship.`,
  };
}

export default async function LookPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product || !product.available) notFound();

  const related = getAvailableProducts()
    .filter((p) => p.id !== product.id && p.category.toLowerCase() === product.category.toLowerCase())
    .slice(0, 3);

  return (
    <main id="top">
      <Header />
      <ProductDetailView product={product} />

      {related.length > 0 && (
        <section className="section shop" style={{ borderTop: '1px solid #dcd5c9' }}>
          <div className="container">
            <div className="eyebrow">Complementary Pieces</div>
            <h2 className="sectionTitle">More from {product.category}.</h2>
            <WhatsAppStore products={related} />
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
