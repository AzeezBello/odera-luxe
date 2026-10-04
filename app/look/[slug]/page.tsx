import { Header } from '@/components/Header';
import { WhatsAppStore } from '@/components/WhatsAppStore';
import { getAvailableProducts, getProductBySlug } from '@/lib/products';
import { formatMoney } from '@/lib/money';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LookPage({params}:{params:Promise<{slug:string}>}) {
  const {slug} = await params;
  const product = getProductBySlug(slug);
  if (!product || !product.available) notFound();
  const related = getAvailableProducts().filter(p => p.id !== product.id && p.category.toLowerCase() === product.category.toLowerCase()).slice(0,3);
  return <main><Header/><section className="lookDetail"><div className="lookDetailImage" style={{backgroundImage:`url("${product.image}")`}}/><div className="lookDetailCopy"><div className="eyebrow">{product.category}</div><h1 className="serif">{product.name}</h1><p className="detailPrice">{formatMoney(product.price,product.currency)}</p><p className="body">{product.description}</p><div className="detailMeta"><span>Availability</span><strong>{product.available ? 'Available for enquiry' : 'Currently unavailable'}</strong></div><p className="body small">Sizing, fabric choices, fittings and custom alterations are confirmed personally by the ODERA team.</p><a className="btn darkbtn" href="/#shop">Add to WhatsApp Bag →</a></div></section>{related.length>0&&<section className="section shop"><div className="container"><div className="eyebrow">You may also like</div><h2 className="sectionTitle">More from {product.category}.</h2><WhatsAppStore products={related}/></div></section>}</main>;
}
