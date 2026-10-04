import { Header } from '@/components/Header';
import { WhatsAppStore } from '@/components/WhatsAppStore';
import { getProductsByCategory } from '@/lib/products';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CollectionPage({params}:{params:Promise<{category:string}>}) {
  const {category} = await params;
  const title = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  if (!['men','women'].includes(category.toLowerCase())) notFound();
  const products = getProductsByCategory(title);
  return <main><Header/><section className="pageHero"><div className="container"><div className="eyebrow">ODERA Collections</div><h1 className="serif">{title}<br/>Collection</h1><p className="body">A considered edit of ODERA pieces designed for presence, movement and modern African expression.</p></div></section><section className="section shop"><div className="container"><div className="shopHead"><div><div className="eyebrow">Available now</div><h2 className="sectionTitle">The {title} edit.</h2></div><a className="eyebrow" href="/#shop">Back to home →</a></div>{products.length ? <WhatsAppStore products={products}/> : <p className="body">This collection is being updated. Contact the ODERA Concierge for the current edit.</p>}</div></section></main>;
}
