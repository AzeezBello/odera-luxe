'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/lib/db';
import { formatMoney, totalsByCurrency } from '@/lib/money';
import { SizeChartModal } from './SizeChartModal';
import Link from 'next/link';

export function WhatsAppStore({ products }: { products: Product[] }) {
  const [bag, setBag] = useState<number[]>([]);
  const [itemSizes, setItemSizes] = useState<Record<number, string>>({});
  const [open, setOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [note, setNote] = useState('Hello ODERA Luxe, I would like to order/enquire about the following pieces:');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [sending, setSending] = useState(false);
  const [reference, setReference] = useState('');

  useEffect(() => {
    try {
      setBag(JSON.parse(localStorage.getItem('odera-bag') || '[]'));
      setItemSizes(JSON.parse(localStorage.getItem('odera-bag-sizes') || '{}'));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('odera-bag', JSON.stringify(bag));
      localStorage.setItem('odera-bag-sizes', JSON.stringify(itemSizes));
    } catch {}
  }, [bag, itemSizes]);

  const add = (id: number) => {
    setBag((current) => (current.includes(id) ? current : [...current, id]));
    if (!itemSizes[id]) {
      setItemSizes((prev) => ({ ...prev, [id]: 'M' }));
    }
  };

  const remove = (id: number) => {
    setBag((current) => current.filter((x) => x !== id));
  };

  const setSize = (id: number, size: string) => {
    setItemSizes((prev) => ({ ...prev, [id]: size }));
  };

  const selected = products.filter((p) => bag.includes(p.id));
  const totals = useMemo(() => totalsByCurrency(selected), [selected]);
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  async function continueToWhatsApp() {
    if (!selected.length || sending) return;
    setSending(true);
    const id = `OD-${Date.now().toString(36).toUpperCase()}`;
    const payloadItems = selected.map((p) => ({
      id: p.id,
      name: `${p.name} (Size: ${itemSizes[p.id] || 'M'})`,
      category: p.category,
      price: p.price,
      currency: p.currency,
      slug: p.slug,
    }));

    const response = await fetch('/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        customerName,
        customerPhone,
        note,
        items: payloadItems,
        totals,
      }),
    });
    const result = response.ok ? await response.json() : { id };
    const ref = result.id || id;
    setReference(ref);

    const lines = selected
      .map(
        (p, i) =>
          `${i + 1}. ${p.name} [Size: ${itemSizes[p.id] || 'M'}] — ${formatMoney(p.price, p.currency)}\n   Category: ${p.category}`
      )
      .join('\n');
    const totalLines = Object.entries(totals)
      .map(([currency, total]) => `${formatMoney(total, currency)}`)
      .join(' + ');

    const message = `${note}\n\nReference: ${ref}\nCustomer: ${customerName || 'To be confirmed'}${
      customerPhone ? `\nPhone: ${customerPhone}` : ''
    }\n\n${lines}\n\nEstimated total: ${totalLines}\n\nPlease confirm availability, bespoke sizing requirements, and delivery timeline.`;

    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setSending(false);
  }

  return (
    <>
      <div className="productGrid">
        {products.map((product) => {
          const inBag = bag.includes(product.id);
          const isWomen = product.category.toLowerCase().includes('women');
          const currentSize = itemSizes[product.id] || 'M';

          return (
            <article className="productCard" key={product.id}>
              <Link
                className="productImage"
                style={{ backgroundImage: `url(${product.image})` }}
                href={`/look/${product.slug}`}
                aria-label={`View ${product.name}`}
              >
                {product.badge && <span className="badge">{product.badge}</span>}
              </Link>
              <div className="productInfo">
                <div className="productInfoTop">
                  <span className="eyebrow">{product.category}</span>
                  <Link href={`/look/${product.slug}`} className="productViewLink">
                    Details →
                  </Link>
                </div>
                <h3>
                  <Link href={`/look/${product.slug}`}>{product.name}</Link>
                </h3>
                <p>{product.description}</p>

                {/* Inline Quick Size Selector */}
                <div className="productCardSizeRow">
                  <label htmlFor={`size-select-${product.id}`} className="cardSizeLabel">
                    Size:
                  </label>
                  <select
                    id={`size-select-${product.id}`}
                    value={currentSize}
                    onChange={(e) => setSize(product.id, e.target.value)}
                    className="cardSizeSelect"
                  >
                    <option value="XS">XS ({isWomen ? 'UK 6' : '36R'})</option>
                    <option value="S">S ({isWomen ? 'UK 8' : '38R'})</option>
                    <option value="M">M ({isWomen ? 'UK 10' : '40R'})</option>
                    <option value="L">L ({isWomen ? 'UK 12' : '42R'})</option>
                    <option value="XL">XL ({isWomen ? 'UK 14' : '44R'})</option>
                    <option value="2XL">2XL ({isWomen ? 'UK 16' : '46R'})</option>
                    <option value="Custom Bespoke">Custom Bespoke (Made to Measure)</option>
                  </select>
                </div>

                <div className="productBottom">
                  <span className="price">{formatMoney(product.price, product.currency)}</span>
                  <button className="waBtn" onClick={() => add(product.id)}>
                    {inBag ? 'Added ✓' : 'Add to WhatsApp Bag'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <button className="bagFloat" onClick={() => setOpen(true)} aria-label="Open WhatsApp bag">
        <span>WhatsApp Bag</span>
        <b>{bag.length}</b>
      </button>

      {open && (
        <div className="bagOverlay" onClick={() => setOpen(false)}>
          <aside className="bagDrawer" onClick={(e) => e.stopPropagation()}>
            <button className="bagClose" onClick={() => setOpen(false)} aria-label="Close bag">
              ×
            </button>
            <div className="eyebrow">ODERA WhatsApp Store</div>
            <h3 className="serif">Your bag.</h3>

            <div className="bagSizeNotice">
              <span>📏 Unsure about sizing?</span>
              <button
                type="button"
                className="bagSizeGuideBtn"
                onClick={() => setSizeModalOpen(true)}
              >
                View Size Guide & Chart
              </button>
            </div>

            {selected.length === 0 ? (
              <p className="body">Your bag is empty. Add pieces from the collection to start a WhatsApp enquiry.</p>
            ) : (
              <>
                <div className="bagFields">
                  <input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Your name (optional)"
                  />
                  <input
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="Phone number (optional)"
                  />
                </div>

                <div className="bagItemsList">
                  {selected.map((p) => {
                    const isWomen = p.category.toLowerCase().includes('women');
                    const size = itemSizes[p.id] || 'M';

                    return (
                      <div className="bagRow" key={p.id}>
                        <div style={{ flex: 1 }}>
                          <strong>{p.name}</strong>
                          <span>{p.category}</span>
                          <div className="bagRowSizePicker">
                            <label>Size:</label>
                            <select
                              value={size}
                              onChange={(e) => setSize(p.id, e.target.value)}
                            >
                              <option value="XS">XS ({isWomen ? 'UK 6' : '36R'})</option>
                              <option value="S">S ({isWomen ? 'UK 8' : '38R'})</option>
                              <option value="M">M ({isWomen ? 'UK 10' : '40R'})</option>
                              <option value="L">L ({isWomen ? 'UK 12' : '42R'})</option>
                              <option value="XL">XL ({isWomen ? 'UK 14' : '44R'})</option>
                              <option value="2XL">2XL ({isWomen ? 'UK 16' : '46R'})</option>
                              <option value="Custom Bespoke">Custom Bespoke</option>
                            </select>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <b>{formatMoney(p.price, p.currency)}</b>
                          <button onClick={() => remove(p.id)}>Remove</button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="bagTotal">
                  <span>Estimated total</span>
                  <div>
                    {Object.entries(totals).map(([currency, total]) => (
                      <strong key={currency}>{formatMoney(total, currency)}</strong>
                    ))}
                  </div>
                </div>

                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Additional notes for our tailors..."
                />

                {reference && (
                  <p className="bagReference">
                    Saved as <strong>{reference}</strong>. Your WhatsApp message contains this reference.
                  </p>
                )}

                <button
                  className="btn darkbtn"
                  onClick={continueToWhatsApp}
                  disabled={sending}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {sending ? 'Preparing enquiry…' : 'Continue on WhatsApp →'}
                </button>
              </>
            )}
          </aside>
        </div>
      )}

      <SizeChartModal isOpen={sizeModalOpen} onClose={() => setSizeModalOpen(false)} />
    </>
  );
}
