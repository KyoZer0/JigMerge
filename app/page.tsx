import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from './components/AdSlot';
import GameEmbedActions from './components/GameEmbedActions';
import HeroSection from './components/HeroSection';
import { gameCollections, totalPuzzleCount } from './lib/gameData';

export const metadata: Metadata = {
  title: 'JigMerge – Free Online Jigsaw Solitaire Puzzle Game',
  description: `Play JigMerge free online. Swap and merge tiles across ${totalPuzzleCount}+ puzzles in ${gameCollections.length} live collections.`,
  keywords: ['JigMerge', 'jigsaw puzzle', 'solitaire puzzle', 'online puzzle game', 'free puzzle game', 'brain games', 'tile swap puzzle'],
  alternates: {
    canonical: '/',
  },
};

const featuredCollections = gameCollections.slice(0, 6);

export default function Home() {
  return (
    <>
      <section className="home-embed-section">
        <div className="home-embed-shell">
          <div id="home-game-frame" className="home-embed-card">
            <iframe
              src="/game/index.html"
              title="Play JigMerge Free Online"
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
          <GameEmbedActions targetId="home-game-frame" shareUrl="/play" />
        </div>
      </section>

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Social Proof Strip ── */}
      <section style={{
        padding: '2rem 0',
        borderTop: '1px solid var(--border-light)',
        borderBottom: '1px solid var(--border-light)',
      }}>
        <div className="container home-stats-grid">
            {[
            { value: `${totalPuzzleCount}+`, label: 'Live Puzzle Boards' },
            { value: String(gameCollections.length), label: 'Playable Collections' },
            { value: '3', label: 'Board Sizes' },
            { value: '0', label: 'Downloads Needed' },
          ].map((stat) => (
            <div key={stat.label} className="home-stat-card">
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginTop: '0.2rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <AdSlot type="banner" />

      {/* ── What Makes It Different ── */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Not your ordinary puzzle game</h2>
          <p className="section-subtitle">
            JigMerge reimagines classic puzzles with a tile-swapping mechanic
            that is easy to learn and endlessly satisfying to master.
          </p>

          <div className="grid-3">
            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
              </div>
              <h3>Swap, Don&apos;t Fit</h3>
              <p>Forget fiddly jigsaw shapes. Drag tiles on a clean grid to swap positions — intuitive from the very first move.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4" /><path d="M12 18v4" /><path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" /><path d="M2 12h4" /><path d="M18 12h4" /><path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" /></svg>
              </div>
              <h3>Smart Merging</h3>
              <p>Place two neighbors correctly and they fuse into one group — moving together and shrinking the puzzle as you go.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10,9 9,9 8,9" /></svg>
              </div>
              <h3>Memorize First</h3>
              <p>Every level begins with a 5-second preview of the complete image. Study it, strategize, then watch tiles scatter.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>
              </div>
              <h3>Track Your Speed</h3>
              <p>A move counter and timer track your performance. Challenge yourself to beat your personal bests.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
              </div>
              <h3>Play Anywhere</h3>
              <p>Desktop, tablet, or phone — JigMerge adapts to your screen. No installs, just open and play.</p>
            </article>

            <article className="card feature-card">
              <div className="feature-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
              </div>
              <h3>Totally Free</h3>
              <p>No paywalls, no premium tiers, no ads-to-unlock. Every live collection stays free to open.</p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Categories Showcase ── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="section-title">Collections built for every pace</h2>
          <p className="section-subtitle">
            From quick warm-ups to long expert boards, each collection offers
            a different board size, pace, and challenge curve inside the live game.
          </p>

          <div className="home-categories-grid">
            {featuredCollections.map((collection) => (
              <Link key={collection.slug} href={`/categories/${collection.slug}`} className="home-category-card" style={{ textDecoration: 'none' }}>
                <div className="home-category-icon" style={{ background: `${collection.color}22`, color: collection.color }}>
                  {collection.shortName}
                </div>
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                }}>
                  {collection.name}
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>
                  {collection.gridLabel} · {collection.puzzleCount} puzzles
                </span>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <Link href="/categories" className="btn btn-secondary">
              Browse All Collections
            </Link>
          </div>
        </div>
      </section>

      <AdSlot type="banner" />

      {/* ── How It Feels ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: '720px' }}>
          <h2 className="section-title">Designed for calm focus</h2>
          <p className="section-subtitle">
            JigMerge is as much about the journey as the solution. Every interaction
            is crafted to feel smooth, satisfying, and never frustrating.
          </p>

          <div className="home-feel-grid">
            {[
              { title: 'Smooth animations', desc: 'Tiles glide into place with buttery 60fps physics. No jank, no stutter.' },
              { title: 'Satisfying feedback', desc: 'Correct placements snap with visual feedback that makes every move feel rewarding.' },
              { title: 'Clean interface', desc: 'No clutter, no distractions. Just you, the puzzle, and a minimal, focused UI.' },
              { title: 'Brain-friendly pacing', desc: 'Progressive difficulty that challenges without overwhelming. Play at your own pace.' },
            ].map((item) => (
              <div key={item.title} className="home-feel-card">
                <h3 style={{ fontSize: '0.95rem', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--bg-secondary)',
        textAlign: 'center',
        borderTop: '1px solid var(--border-light)',
      }}>
        <div className="container">
          <h2 style={{ marginBottom: '0.5rem' }}>Your next puzzle is one click away</h2>
          <p style={{
            color: 'var(--text-secondary)',
            maxWidth: '400px',
            margin: '0 auto 2rem',
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}>
            No signup, no download. Open your browser for a few calm minutes of puzzling.
          </p>
          <Link href="/play" className="btn btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '0.95rem' }}>
            Play JigMerge Now
          </Link>
        </div>
      </section>
    </>
  );
}
