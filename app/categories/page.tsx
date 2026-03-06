import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '../lib/gameData';

export const metadata: Metadata = {
  title: 'Puzzle Categories',
  description:
    'Browse all JigMerge puzzle categories. Explore Animals, Nature, Cities, Art, and Food levels with beginner-to-expert difficulty.',
  keywords: ['puzzle categories', 'jigsaw categories', 'JigMerge categories'],
};

export default function CategoriesPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1 className="gradient-text">Puzzle Categories</h1>
          <p>
            Choose a category to explore all levels and find your favorite puzzle style.
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
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/categories/${cat.slug}`}
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
                <span style={{ marginRight: '0.5rem' }}>{cat.icon}</span>
                {cat.name}
              </h2>
              <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                {cat.description}
              </p>
              <p
                style={{
                  marginTop: '0.75rem',
                  marginBottom: 0,
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                }}
              >
                {cat.levels.length} levels available
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
