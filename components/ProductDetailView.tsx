'use client';

import { useState } from 'react';
import type { Product } from '@/lib/db';
import { formatMoney } from '@/lib/money';
import { SizeChartModal } from './SizeChartModal';
import Link from 'next/link';

const STANDARD_MEN_SIZES = ['XS (36R)', 'S (38R)', 'M (40R)', 'L (42R)', 'XL (44R)', '2XL (46R)', 'Custom Bespoke'];
const STANDARD_WOMEN_SIZES = ['XS (UK 6)', 'S (UK 8)', 'M (UK 10)', 'L (UK 12)', 'XL (UK 14)', '2XL (UK 16)', 'Custom Bespoke'];

export function ProductDetailView({ product }: { product: Product }) {
  const isWomen = product.category.toLowerCase().includes('women');
  const availableSizes = isWomen ? STANDARD_WOMEN_SIZES : STANDARD_MEN_SIZES;

  const [selectedSize, setSelectedSize] = useState<string>(availableSizes[2]); // Default M
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  const addToBag = () => {
    try {
      const currentBag = JSON.parse(localStorage.getItem('odera-bag') || '[]');
      if (!currentBag.includes(product.id)) {
        currentBag.push(product.id);
        localStorage.setItem('odera-bag', JSON.stringify(currentBag));
      }
      // Also save selected size per product
      const savedSizes = JSON.parse(localStorage.getItem('odera-bag-sizes') || '{}');
      savedSizes[product.id] = selectedSize;
      localStorage.setItem('odera-bag-sizes', JSON.stringify(savedSizes));

      setAdded(true);
      setTimeout(() => setAdded(false), 3000);
    } catch {}
  };

  const directWhatsAppMessage = `Hello ODERA Luxe, I would like to enquire about ${product.name} (${formatMoney(product.price, product.currency)}).
Selected Size: ${selectedSize}
Category: ${product.category}

Please confirm availability, fabric options, fitting schedule, and next steps.`;

  const waLink = number
    ? `https://wa.me/${number}?text=${encodeURIComponent(directWhatsAppMessage)}`
    : '#';

  return (
    <>
      <section className="lookDetail">
        <div
          className="lookDetailImage"
          style={{ backgroundImage: `url("${product.image}")` }}
        >
          {product.badge && <span className="badge detailBadge">{product.badge}</span>}
        </div>

        <div className="lookDetailCopy">
          <div className="breadcrumbs" style={{ marginBottom: '14px' }}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/collections">Collections</Link>
            <span>/</span>
            <Link href={`/collections/${isWomen ? 'women' : 'men'}`}>{product.category}</Link>
          </div>

          <div className="eyebrow">{product.category} Tailoring</div>
          <h1 className="serif">{product.name}</h1>
          <p className="detailPrice">{formatMoney(product.price, product.currency)}</p>

          <p className="body">{product.description}</p>

          {/* Sizing Picker */}
          <div className="detailSizeSection">
            <div className="sizeSectionHead">
              <span className="sizeLabel">
                Select Size: <strong>{selectedSize}</strong>
              </span>
              <button
                type="button"
                className="sizeGuideTriggerBtn"
                onClick={() => setSizeModalOpen(true)}
              >
                📏 Size & Fit Guide
              </button>
            </div>

            <div className="sizeOptions">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`sizeBtn ${selectedSize === size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            {selectedSize === 'Custom Bespoke' && (
              <p className="bespokeSizeHint">
                ✨ Custom Bespoke: Our master cutters will request your personal chest, waist, and shoulder measurements upon order confirmation.
              </p>
            )}
          </div>

          <div className="detailMeta">
            <div>
              <span>Availability</span>
              <strong>{product.available ? 'Ready For Atelier Commission' : 'Currently Reserved'}</strong>
            </div>
            <div>
              <span>Crafted In</span>
              <strong>Lagos Atelier, Nigeria</strong>
            </div>
          </div>

          <div className="detailActions">
            <a
              className="btn darkbtn detailDirectWaBtn"
              href={waLink}
              target={number ? '_blank' : undefined}
              rel={number ? 'noreferrer' : undefined}
            >
              Enquire with Size ({selectedSize}) on WhatsApp →
            </a>

            <button
              type="button"
              className="btn detailBagBtn"
              onClick={addToBag}
              style={{ border: '1px solid #111' }}
            >
              {added ? 'Added to Bag ✓' : '+ Add to WhatsApp Bag'}
            </button>
          </div>

          <div className="detailGuarantees">
            <div className="guaranteeItem">
              <span>🧵</span>
              <p>Hand-canvassed construction & architectural shoulder drape.</p>
            </div>
            <div className="guaranteeItem">
              <span>📍</span>
              <p>Complimentary fitting adjustments at our Lagos atelier or virtual consultation.</p>
            </div>
            <div className="guaranteeItem">
              <span>✈️</span>
              <p>Global door-to-door delivery with insured tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Size Chart */}
      <SizeChartModal
        isOpen={sizeModalOpen}
        onClose={() => setSizeModalOpen(false)}
        initialCategory={isWomen ? 'women' : 'men'}
      />
    </>
  );
}
