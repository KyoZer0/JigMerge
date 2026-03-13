import type { Metadata } from 'next';
import Link from 'next/link';
import { gameCollections } from '../lib/gameData';

export const metadata: Metadata = {
  title: 'Puzzle Collections',
  description:
    'Browse all live JigMerge collections. Explore every 3x3, 6x6, and 9x9 board set available in the embedded game.',
  keywords: ['puzzle collections', 'JigMerge collections', 'browser puzzle boards'],
};

export default function CategoriesPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Puzzle Collections</h1>
          <p>
            Browse the live collections from the embedded game and jump straight into the board size you want.
          </p>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1000px', padding: '0 1.5rem 4rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1rem',
          }}
        >
          {gameCollections.map((collection) => (
            <Link
              key={collection.slug}
              href={`/categories/${collection.slug}`}
              className="card"
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <h2
                style={{
                  marginBottom: '0.5rem',
                  color: 'var(--text-primary)',
                  fontSize: '1.2rem',
                }}
              >
                <span style={{ marginRight: '0.5rem', color: collection.color }}>{collection.shortName}</span>
                {collection.name}
              </h2>
              <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                {collection.description}
              </p>
              <p
                style={{
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}
              >
                {collection.gridLabel} board · {collection.puzzleCount} puzzles · {collection.sets.length} sets
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
