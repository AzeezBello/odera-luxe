'use client';
import { useState } from 'react';
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="nav"><a className="logo" href="/#top">ODERA<small>LUXE</small></a><nav className={open ? 'navlinks mobileOpen' : 'navlinks'}>{[['Home','/#top'],['Collections','/#collections'],['Bespoke','/#bespoke'],['About','/#about'],['Journal','/#journal'],['Contact','/#contact']].map(([label,href])=><a key={label} href={href} onClick={()=>setOpen(false)}>{label}</a>)}</nav><a className="navcta" href="/#shop">Shop via WhatsApp</a><button className="menuBtn" onClick={()=>setOpen(v=>!v)} aria-label="Toggle menu">☰</button></header>;
}
