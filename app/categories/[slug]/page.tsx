import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { gameCollections, getCollectionBySlug, getPlayHref } from '../../lib/gameData';
import AdSlot from '../../components/AdSlot';

export function generateStaticParams() {
    return gameCollections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
    const { slug } = await params;
    const collection = getCollectionBySlug(slug);

    if (!collection) {
        return {
            title: 'Collection Not Found',
            description: 'The requested collection could not be found on JigMerge.',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const title = `${collection.name} – ${collection.puzzleCount} Puzzles`;
    const description = `Play ${collection.name} on JigMerge. ${collection.description} ${collection.puzzleCount} live boards on a ${collection.gridLabel} layout.`;
    const canonicalUrl = `/categories/${collection.slug}`;

    return {
        title,
        description,
        keywords: [collection.name.toLowerCase(), `${collection.gridLabel} puzzle board`, 'JigMerge collection', 'free puzzle game'],
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
    const collection = getCollectionBySlug(slug);

    if (!collection) {
        notFound();
    }

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                        <Link href="/categories" style={{ color: 'var(--primary-light)' }}>Collections</Link> / {collection.name}
                    </div>
                    <h1>
                        <span style={{ fontSize: '1.2em', marginRight: '0.5rem', color: collection.color }}>{collection.shortName}</span>
                        <span className="gradient-text">{collection.name}</span>
                    </h1>
                    <p>{collection.description}</p>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}>
                <p style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.8,
                    marginBottom: '2rem',
                    fontSize: '1.05rem',
                }}>
                    {collection.longDescription}
                </p>

                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ marginBottom: '0.5rem' }}>Collection Snapshot</h2>
                    <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                        {collection.gridLabel} board · {collection.puzzleCount} puzzles · {collection.sets.length} playable sets · {collection.difficulty} pace
                    </p>
                </div>

                <AdSlot type="banner" />

                <h2 style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
                    Puzzle Sets in {collection.name}
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {collection.sets.map((setItem, i) => (
                        <Link key={setItem.index} href={setItem.playHref} style={{ textDecoration: 'none' }}>
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
                                    background: `linear-gradient(135deg, ${collection.color}44, ${collection.color}11)`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.1rem',
                                    fontWeight: 800,
                                    flexShrink: 0,
                                }}>
                                    {setItem.label}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ marginBottom: '0.25rem', fontSize: '1.2rem' }}>{setItem.label}</h3>
                                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>
                                        Starts at puzzle {setItem.puzzleStart + 1} · {setItem.puzzleCount} boards · {collection.gridLabel} layout
                                    </p>
                                </div>

                                <div style={{
                                    padding: '0.4rem 1rem',
                                    borderRadius: 'var(--radius-xl)',
                                    fontSize: '0.8rem',
                                    fontWeight: 700,
                                    background: `${collection.color}22`,
                                    color: collection.color,
                                    flexShrink: 0,
                                }}>
                                    {collection.difficulty}
                                </div>

                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: `${collection.color}22`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1.2rem',
                                    color: collection.color,
                                    flexShrink: 0,
                                }}>
                                    ▶
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <AdSlot type="banner" />

                <div style={{ marginTop: '3rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                    <h2 style={{ color: 'var(--primary-light)' }}>About {collection.name}</h2>
                    <p>
                        {collection.name} maps directly to a live collection inside the embedded game. The page
                        stays aligned with the real board size, real puzzle count, and real launch point used by
                        the browser game so players know exactly what they are opening.
                    </p>
                    <p>
                        If you want to jump straight into this collection, use the button below to open the first
                        set in Play mode with the correct starting state.
                    </p>
                    <Link href={getPlayHref(collection.id)} className="btn btn-primary">
                        Open {collection.name}
                    </Link>
                </div>
            </div>
        </>
    );
}
