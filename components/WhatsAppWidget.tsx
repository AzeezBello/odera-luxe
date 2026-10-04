'use client';
import { useState } from 'react';

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('Hello ODERA Luxe, I would like to enquire about a bespoke piece.');
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '000000000000').replace(/\D/g, '');
  const send = () => window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  return <>
    <div className={`waPanel ${open ? 'open' : ''}`}>
      <div className="eyebrow">ODERA Concierge</div>
      <h3>Let’s create your piece.</h3>
      <p>Speak with ODERA Luxe about fittings, collections, custom designs or availability.</p>
      <textarea value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={send}>Continue on WhatsApp →</button>
    </div>
    <button className="waFloat" onClick={() => setOpen(v => !v)} aria-label="Chat with ODERA Luxe on WhatsApp"><span className="waDot" /> WhatsApp Concierge</button>
  </>;
}
