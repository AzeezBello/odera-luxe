'use client';
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/db';
import { formatMoney, totalsByCurrency } from '@/lib/money';

export function WhatsAppStore({ products }: { products: Product[] }) {
  const [bag, setBag] = useState<number[]>([]);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState('Hello ODERA Luxe, I would like to order/enquire about the following pieces:');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState('');

  useEffect(() => { try { setBag(JSON.parse(localStorage.getItem('odera-bag') || '[]')); } catch {} }, []);
  useEffect(() => { localStorage.setItem('odera-bag', JSON.stringify(bag)); }, [bag]);

  const add = (id:number) => setBag(current => current.includes(id) ? current : [...current, id]);
  const remove = (id:number) => setBag(current => current.filter(x => x !== id));
  const selected = products.filter(p => bag.includes(p.id));
  const totals = useMemo(() => totalsByCurrency(selected), [selected]);
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  async function continueToWhatsApp() {
    if (!selected.length || sending) return;
    setSending(true);
    const id = `OD-${Date.now().toString(36).toUpperCase()}`;
    const response = await fetch('/api/enquiries', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, customerName, customerPhone, note, items: selected.map(p => ({ id:p.id, name:p.name, category:p.category, price:p.price, currency:p.currency, slug:p.slug })), totals })
    });
    const result = response.ok ? await response.json() : { id };
    const ref = result.id || id;
    setReference(ref);
    const lines = selected.map((p,i) => `${i+1}. ${p.name} — ${formatMoney(p.price,p.currency)}\n   Category: ${p.category}`).join('\n');
    const totalLines = Object.entries(totals).map(([currency,total]) => `${formatMoney(total,currency)}`).join(' + ');
    const message = `${note}\n\nReference: ${ref}\nCustomer: ${customerName || 'To be confirmed'}${customerPhone ? `\nPhone: ${customerPhone}` : ''}\n\n${lines}\n\nEstimated total: ${totalLines}\n\nPlease confirm availability, sizing, fitting and next steps.`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSending(false);
  }

  return <>
    <div className="productGrid">{products.map(product => {
      const inBag=bag.includes(product.id);
      return <article className="productCard" key={product.id}>
        <a className="productImage" style={{backgroundImage:`url(${product.image})`}} href={`/look/${product.slug}`} aria-label={`View ${product.name}`}>
          {product.badge&&<span className="badge">{product.badge}</span>}
        </a>
        <div className="productInfo"><div className="eyebrow">{product.category}</div><h3><a href={`/look/${product.slug}`}>{product.name}</a></h3><p>{product.description}</p><div className="productBottom"><span className="price">{formatMoney(product.price, product.currency)}</span><button className="waBtn" onClick={()=>add(product.id)}>{inBag?'Added ✓':'Add to WhatsApp Bag'}</button></div></div>
      </article>;
    })}</div>
    <button className="bagFloat" onClick={()=>setOpen(true)} aria-label="Open WhatsApp bag"><span>WhatsApp Bag</span><b>{bag.length}</b></button>
    {open&&<div className="bagOverlay" onClick={()=>setOpen(false)}><aside className="bagDrawer" onClick={e=>e.stopPropagation()}><button className="bagClose" onClick={()=>setOpen(false)} aria-label="Close bag">×</button><div className="eyebrow">ODERA WhatsApp Store</div><h3 className="serif">Your bag.</h3>{selected.length===0?<p className="body">Your bag is empty. Add pieces from the collection to start a WhatsApp enquiry.</p>:<>
      <div className="bagFields"><input value={customerName} onChange={e=>setCustomerName(e.target.value)} placeholder="Your name (optional)"/><input value={customerPhone} onChange={e=>setCustomerPhone(e.target.value)} placeholder="Phone number (optional)"/></div>
      {selected.map(p=><div className="bagRow" key={p.id}><div><strong>{p.name}</strong><span>{p.category}</span></div><div><b>{formatMoney(p.price,p.currency)}</b><button onClick={()=>remove(p.id)}>Remove</button></div></div>)}
      <div className="bagTotal"><span>Estimated total</span><div>{Object.entries(totals).map(([currency,total])=><strong key={currency}>{formatMoney(total,currency)}</strong>)}</div></div>
      <textarea value={note} onChange={e=>setNote(e.target.value)} />
      {reference&&<p className="bagReference">Saved as <strong>{reference}</strong>. Your WhatsApp message contains this reference.</p>}
      <button className="btn darkbtn" onClick={continueToWhatsApp} disabled={sending}>{sending?'Preparing enquiry…':'Continue on WhatsApp →'}</button>
    </>}</aside></div>}
  </>;
}
