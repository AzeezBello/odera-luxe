'use client';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/db';

export function WhatsAppStore({ products }: { products: Product[] }) {
  const [bag, setBag] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('Hello ODERA Luxe, I would like to order/enquire about the following pieces:');

  useEffect(() => {
    try { setBag(JSON.parse(localStorage.getItem('odera-bag') || '[]')); } catch {}
  }, []);
  useEffect(() => { localStorage.setItem('odera-bag', JSON.stringify(bag)); }, [bag]);

  const add = (id:number) => setBag(current => current.includes(id) ? current : [...current, id]);
  const remove = (id:number) => setBag(current => current.filter(x => x !== id));
  const selected = products.filter(p => bag.includes(p.id));
  const total = selected.reduce((sum,p) => sum + p.price, 0);
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '000000000000').replace(/\D/g, '');
  const message = `${note}\n\n${selected.map((p,i)=>`${i+1}. ${p.name} — ₦${p.price.toLocaleString()}\n   Category: ${p.category}`).join('\n')}\n\nEstimated total: ₦${total.toLocaleString()}\n\nPlease confirm availability, sizing, fitting and next steps.`;

  return <>
    <div className="productGrid">{products.map(product => {
      const inBag=bag.includes(product.id);
      return <article className="productCard" key={product.id}>
        <div className="productImage" style={{backgroundImage:`url(${product.image})`}}>{product.badge&&<span className="badge">{product.badge}</span>}</div>
        <div className="productInfo"><div className="eyebrow">{product.category}</div><h3>{product.name}</h3><p>{product.description}</p><div className="productBottom"><span className="price">₦{product.price.toLocaleString()}</span><button className="waBtn" onClick={()=>add(product.id)}>{inBag?'Added ✓':'Add to WhatsApp Bag'}</button></div></div>
      </article>;
    })}</div>
    <button className="bagFloat" onClick={()=>setOpen(true)} aria-label="Open WhatsApp bag"><span>WhatsApp Bag</span><b>{bag.length}</b></button>
    {open&&<div className="bagOverlay" onClick={()=>setOpen(false)}><aside className="bagDrawer" onClick={e=>e.stopPropagation()}><button className="bagClose" onClick={()=>setOpen(false)}>×</button><div className="eyebrow">ODERA WhatsApp Store</div><h3 className="serif">Your bag.</h3>{selected.length===0?<p className="body">Your bag is empty. Add pieces from the collection to start a WhatsApp enquiry.</p>:<>{selected.map(p=><div className="bagRow" key={p.id}><div><strong>{p.name}</strong><span>{p.category}</span></div><div><b>₦{p.price.toLocaleString()}</b><button onClick={()=>remove(p.id)}>Remove</button></div></div>)}<div className="bagTotal"><span>Estimated total</span><strong>₦{total.toLocaleString()}</strong></div><textarea value={note} onChange={e=>setNote(e.target.value)} /><a className="btn darkbtn" href={`https://wa.me/${number}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">Continue on WhatsApp →</a></>}</aside></div>}
  </>;
}
