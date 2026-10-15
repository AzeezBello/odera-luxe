'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'Shop', href: '/shop' },
    { label: 'Bespoke', href: '/bespoke' },
    { label: 'Size Guide', href: '/size-chart' },
    { label: 'About', href: '/about' },
    { label: 'Journal', href: '/journal' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="nav">
      <Link className="logo" href="/">
        ODERA<small>LUXE</small>
      </Link>

      <nav className={`navlinks ${open ? 'mobileOpen' : ''}`}>
        {links.map(({ label, href }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={label}
              href={href}
              className={isActive ? 'activeNavLink' : ''}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="navActions">
        <Link className="navcta" href="/shop">
          WhatsApp Store
        </Link>
        <button
          className="menuBtn"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>
    </header>
  );
}
