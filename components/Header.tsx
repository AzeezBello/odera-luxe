'use client';
import { useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="nav">
    <a className="logo" href="#top">ODERA<small>LUXE</small></a>
    <nav className={open ? 'navlinks mobileOpen' : 'navlinks'}>
      <a href="#top">Home</a><a href="#collections">Collections</a><a href="#bespoke">Bespoke</a><a href="#about">About</a><a href="#journal">Journal</a><a href="#contact">Contact</a>
    </nav>
    <a className="navcta" href="#shop">Shop via WhatsApp</a>
    <button className="menuBtn" onClick={() => setOpen(v => !v)} aria-label="Open menu">☰</button>
  </header>;
}
