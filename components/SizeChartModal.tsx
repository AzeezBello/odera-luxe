'use client';

import { useEffect } from 'react';
import { SizeChartComponent } from './SizeChartComponent';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'men' | 'women' | 'traditional';
}

export function SizeChartModal({ isOpen, onClose, initialCategory = 'men' }: SizeChartModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="sizeModalOverlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="ODERA Luxe Size Chart">
      <div className="sizeModalContent" onClick={(e) => e.stopPropagation()}>
        <div className="sizeModalHeader">
          <div>
            <div className="eyebrow">ODERA Atelier</div>
            <h2 className="serif sizeModalTitle">Size & Fit Guide</h2>
          </div>
          <button className="sizeModalClose" onClick={onClose} aria-label="Close size guide">
            ×
          </button>
        </div>

        <div className="sizeModalBody">
          <SizeChartComponent initialCategory={initialCategory} />
        </div>
      </div>
    </div>
  );
}
