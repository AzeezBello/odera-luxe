'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ODERA_BESPOKE } from '@/lib/media';
import Link from 'next/link';

export default function ContactPage() {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Lagos');
  const [service, setService] = useState('Bespoke Suiting');
  const [message, setMessage] = useState('');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `*ODERA Luxe Fitting & Consultation Request*`,
      `Client Name: ${name || 'Private Client'}`,
      `Contact Phone: ${phone || 'Not provided'}`,
      `Email: ${email || 'Not provided'}`,
      `Location / City: ${city}`,
      `Service Requested: ${service}`,
      message ? `\nDetails / Notes:\n${message}` : '',
      `\nPlease advise on available consultation dates and atelier fitting slots.`
    ].filter(Boolean).join('\n');

    if (number) {
      window.open(`https://wa.me/${number}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <main id="top">
      <Header />
      <section
        className="pageHero"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.78), rgba(0,0,0,.35)), url("${ODERA_BESPOKE}")`,
        }}
      >
        <div className="container">
          <div className="eyebrow">Direct Atelier Access</div>
          <h1 className="serif">
            Contact
            <br />
            The Atelier
          </h1>
          <p className="body" style={{ color: '#e5e1d9' }}>
            Book private fittings, commission bespoke ceremonial wear, or enquire about custom sizing directly with our Lagos cutting room.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="section" style={{ background: '#f5f0e7' }}>
        <div className="container">
          <div className="contactGrid">
            {/* Atelier Info */}
            <div className="contactInfoCol">
              <div className="eyebrow">Our Presence</div>
              <h2 className="sectionTitle">Lagos Atelier & Global Concierge.</h2>
              <p className="body">
                We welcome clients by private appointment for trunk fittings, bespoke consultations, and ceremonial tailoring commissions.
              </p>

              <div className="contactDetailList">
                <div className="contactDetailItem">
                  <strong>Atelier Studio</strong>
                  <p>Victoria Island / Ikoyi, Lagos, Nigeria</p>
                  <span className="contactSub">Private appointments only</span>
                </div>

                <div className="contactDetailItem">
                  <strong>WhatsApp Concierge</strong>
                  <p>
                    <a
                      href={number ? `https://wa.me/${number}` : '#'}
                      target={number ? '_blank' : undefined}
                      rel={number ? 'noreferrer' : undefined}
                      className="contactWaLink"
                    >
                      +{number || '234 703 711 4763'} →
                    </a>
                  </p>
                  <span className="contactSub">Instant responses for sizing, orders & fittings</span>
                </div>

                <div className="contactDetailItem">
                  <strong>Digital & Social</strong>
                  <p>
                    <a href="https://instagram.com/odera.ng" target="_blank" rel="noreferrer">
                      Instagram @odera.ng →
                    </a>
                  </p>
                </div>

                <div className="contactDetailItem">
                  <strong>Size Chart & Self-Measurement</strong>
                  <p>
                    <Link href="/size-chart" style={{ textDecoration: 'underline' }}>
                      Review our complete sizing tables & measurement guide →
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Appointment Booking Form */}
            <div className="contactFormCol">
              <div className="contactFormCard">
                <div className="eyebrow">Private Fitting</div>
                <h3 className="serif">Schedule A Consultation</h3>
                <p className="body" style={{ fontSize: '13px', marginBottom: '25px' }}>
                  Complete the details below to initiate your appointment directly with our concierge team.
                </p>

                <form onSubmit={handleBooking} className="contactForm">
                  <div className="field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Oluwaseun Balogun"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label>Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="formGrid" style={{ gap: '15px' }}>
                    <div className="field">
                      <label>City / Location</label>
                      <select value={city} onChange={(e) => setCity(e.target.value)}>
                        <option value="Lagos">Lagos (In-Atelier)</option>
                        <option value="Abuja">Abuja</option>
                        <option value="London">London (Virtual / Trunk)</option>
                        <option value="New York">New York / USA (Virtual)</option>
                        <option value="Other International">Other International</option>
                      </select>
                    </div>

                    <div className="field">
                      <label>Service Interest</label>
                      <select value={service} onChange={(e) => setService(e.target.value)}>
                        <option value="Bespoke Suiting">Bespoke Suiting</option>
                        <option value="Ceremonial / Agbada">Ceremonial / Agbada</option>
                        <option value="Women’s Couture">Women’s Couture</option>
                        <option value="Wedding / Bridal Party">Wedding / Bridal Party</option>
                        <option value="Ready-to-Wear Fitting">Ready-to-Wear Fitting</option>
                      </select>
                    </div>
                  </div>

                  <div className="field">
                    <label>Consultation Notes or Desired Dates</label>
                    <textarea
                      rows={3}
                      placeholder="Specify your preferred dates, event timeline, or custom styling requests..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <button type="submit" className="btn darkbtn" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
                    Book via WhatsApp Concierge →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
