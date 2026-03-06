'use client';
import { useState } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/play', label: 'Play' },
  { href: '/how-to-play', label: 'Guide' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header style={{
      position: 'fixed',
      top: '1.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      width: 'calc(100% - 2rem)',
      maxWidth: '700px',
      background: 'rgba(56, 33, 19, 0.85)', /* --wood-dim equivalent */
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '3px solid var(--wood-main)',
      borderRadius: '40px',
      boxShadow: '0 12px 24px rgba(0, 0, 0, 0.4), inset 0 -4px 0 rgba(0,0,0,0.3)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        padding: '0 1.5rem',
      }}>
        <Link href="/" style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: '1.25rem',
          letterSpacing: '1px',
          color: 'var(--white)',
          WebkitTextStroke: '1px var(--wood-dark)',
          textShadow: '0 2px 0 var(--wood-dark)',
          textTransform: 'uppercase',
        }}>
          JigMerge
        </Link>

        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.125rem',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'all var(--transition)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--white)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/play" style={{
            marginLeft: '0.5rem',
            padding: '0.5rem 1.25rem',
            borderRadius: 'var(--radius-xl)',
            background: 'linear-gradient(to bottom, #ffca58, #fb8500)',
            color: 'var(--wood-dark)',
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            border: '2px solid var(--wood-dark)',
            boxShadow: '0 4px 0 var(--wood-dark), inset 0 2px 0 rgba(255,255,255,0.4)',
            transition: 'transform 0.1s',
          }}>
            Play Now
          </Link>
        </nav>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.375rem',
            lineHeight: 1,
          }}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {isOpen && (
        <nav className="mobile-nav" style={{
          padding: '0.5rem 1.5rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          borderTop: '2px solid var(--wood-main)',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                padding: '0.5rem 0.25rem',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--white)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
        @media (min-width: 769px) {
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
}
