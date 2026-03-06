import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug } from '../../lib/gameData';
import AdSlot from '../../components/AdSlot';

// Generate static params for all categories
export function generateStaticParams() {
    return categories.map((cat) => ({ slug: cat.slug }));
}

// Generate metadata for each category
export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const cat = getCategoryBySlug(slug);

    if (!cat) {
        return {
            title: 'Category Not Found',
            description: 'The requested category could not be found on JigSolitaire.',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = `${cat.name} Puzzles – ${cat.levels.length} Levels`;
    const description = `Play ${cat.name.toLowerCase()} puzzles on JigSolitaire. ${cat.description} ${cat.levels.length} levels from easy to expert.`;
    const canonicalUrl = `/categories/${cat.slug}`;

    return {
        title,
        description,
        keywords: [`${cat.name.toLowerCase()} puzzles`, `${cat.name.toLowerCase()} jigsaw`, `JigSolitaire ${cat.name.toLowerCase()}`, 'free puzzle game'],
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            type: 'website',
        },
        twitter: {
            title,
            description,
            card: 'summary_large_image',
        },
    };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const cat = getCategoryBySlug(slug);

    if (!cat) {
        notFound();
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <Link href="/categories" style={{ color: 'var(--primary-light)' }}>Categories</Link> / {cat.name}
                    </div>
                    <h1>
                        <span style={{ fontSize: '1.2em', marginRight: '0.5rem' }}>{cat.icon}</span>
                        <span className="gradient-text">{cat.name} Puzzles</span>
                    </h1>
                    <p>{cat.description}</p>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}>
                <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    marginBottom: '2rem',
                    fontSize: '1.05rem',
                }}>
                    {cat.longDescription}
                </p>

                <AdSlot type="banner" />

                <h2 style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                    All {cat.name} Levels
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {cat.levels.map((level, i) => (
                        <Link key={level.id} href="/play" style={{ textDecoration: 'none' }}>
                            <div className="card animate-in" style={{
                                animationDelay: `${0.1 + i * 0.1}s`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1.5rem',
                                cursor: 'pointer',
                            }}>
                                {/* Preview */}
                                <div style={{
                                    width: '100px',
                                    height: '100px',
                                    borderRadius: 'var(--radius-md)',
                                    background: `linear-gradient(135deg, ${cat.color}44, ${cat.color}11)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '2.5rem',
                                    flexShrink: 0,
                                }}>
                                    {cat.icon}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ marginBottom: '0.25rem', fontSize: '1.2rem' }}>{level.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                                        Level {i + 1} · {level.gridSize} Grid · {level.gridCols * level.gridRows} tiles
                                    </p>
                                </div>

                                {/* Difficulty badge */}
                                <div style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: 'var(--radius-xl)',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    background: `${cat.color}22`,
                                    color: cat.color,
                                    flexShrink: 0,
                                }}>
                                    {level.difficulty}
                                </div>

                                {/* Play arrow */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: `${cat.color}22`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    color: cat.color,
                                    flexShrink: 0,
                                }}>
                                    ▶
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <AdSlot type="banner" />

                {/* SEO content for category */}
                <div style={{ marginTop: '3rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--primary-light)' }}>About {cat.name} Puzzles</h2>
                    <p>
                        Our {cat.name.toLowerCase()} puzzle collection features {cat.levels.length} carefully
                        selected levels, starting with an easy 3×3 grid and progressing to challenging
                        expert-level grids. Each puzzle showcases a different aspect of the{' '}
                        {cat.name.toLowerCase()} theme, providing a unique visual experience every time.
                    </p>
                    <p>
                        Whether you&apos;re a beginner or an experienced puzzle solver, the {cat.name.toLowerCase()}{' '}
                        category has something for you. The progressive difficulty ensures a smooth learning
                        curve while the beautiful imagery keeps you coming back for more.
                    </p>
                </div>
            </div>
        </>
    );
}
