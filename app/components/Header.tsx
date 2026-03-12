'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/play', label: 'Play' },
  { href: '/how-to-play', label: 'Guide' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('nav-open', isOpen);
    return () => document.body.classList.remove('nav-open');
  }, [isOpen]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <header className="site-header">
        <div className="site-header-bar">
          <button
            type="button"
            className="site-header-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>

          <Link href="/" className="site-header-logo">
            JigMerge
          </Link>

          <nav className="site-header-nav" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="site-header-link">
                {link.label}
              </Link>
            ))}
            <Link href="/play" className="site-header-cta">
              Play Now
            </Link>
          </nav>
        </div>
      </header>

      <div
        className={`site-drawer-backdrop${isOpen ? ' is-open' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
      />

      <aside className={`site-drawer${isOpen ? ' is-open' : ''}`} aria-hidden={!isOpen}>
        <div className="site-drawer-head">
          <Link href="/" className="site-drawer-logo" onClick={() => setIsOpen(false)}>
            JigMerge
          </Link>
          <button
            type="button"
            className="site-drawer-close"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          >
            x
          </button>
        </div>

        <nav className="site-drawer-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="site-drawer-link" onClick={() => setIsOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="site-drawer-footer">
          <p>Pick up a quick round, browse guides, or jump straight into the puzzle board.</p>
          <Link href="/play" className="site-drawer-cta" onClick={() => setIsOpen(false)}>
            Start Playing
          </Link>
        </div>
      </aside>
    </>
  );
}
