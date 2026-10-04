'use client';
import type { Product } from '@/lib/db';

export function ProductCard({ product }: { product: Product }) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '000000000000').replace(/\D/g, '');
  const message = `Hello ODERA Luxe, I am interested in ${product.name}.\n\nCategory: ${product.category}\nPrice: ${product.currency === 'NGN' ? '₦' : product.currency} ${product.price.toLocaleString()}\n\nPlease share availability, sizing and fitting details.`;
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  return <article className="productCard">
    <div className="productImage" style={{backgroundImage:`url(${product.image})`}}>{product.badge && <span className="badge">{product.badge}</span>}</div>
    <div className="productInfo"><div className="eyebrow">{product.category}</div><h3>{product.name}</h3><p>{product.description}</p><div className="productBottom"><span className="price">{product.currency === 'NGN' ? '₦' : product.currency} {product.price.toLocaleString()}</span><a className="waBtn" href={url} target="_blank" rel="noreferrer">Order on WhatsApp</a></div></div>
  </article>;
}
