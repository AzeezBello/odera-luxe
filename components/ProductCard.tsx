import type { Product } from '@/lib/db';
import { formatMoney } from '@/lib/money';
export function ProductCard({product}:{product:Product}){
 const number=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'').replace(/\D/g,'');
 const message=`Hello ODERA Luxe, I would like to enquire about ${product.name} (${formatMoney(product.price,product.currency)}). Please confirm availability, sizing and fitting.`;
 return <article className="productCard"><a className="productImage" style={{backgroundImage:`url(${product.image})`}} href={`/look/${product.slug}`}><span className="badge">{product.badge||product.category}</span></a><div className="productInfo"><div className="eyebrow">{product.category}</div><h3><a href={`/look/${product.slug}`}>{product.name}</a></h3><p>{product.description}</p><div className="productBottom"><span className="price">{formatMoney(product.price,product.currency)}</span>{number&&<a className="waBtn" href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Enquire</a>}</div></div></article>;
}
