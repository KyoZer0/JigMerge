import Link from 'next/link';

interface RelatedArticle {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    readTime: string;
}

interface RelatedArticlesProps {
    articles: RelatedArticle[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
    if (!articles || articles.length === 0) return null;

    return (
        <nav style={{
            marginTop: '3rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-light)',
        }}>
            <h2 style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--text-tertiary)',
                marginBottom: '1rem',
            }}>
                Continue Reading
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {articles.map((article) => (
                    <Link
                        key={article.slug}
                        href={`/blog/${article.slug}`}
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.75rem',
                            padding: '0.75rem 0',
                            borderBottom: '1px solid var(--border-light)',
                            transition: 'opacity 0.15s ease',
                        }}
                    >
                        <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            color: 'var(--primary-light)',
                            flexShrink: 0,
                            minWidth: '52px',
                        }}>
                            {article.category}
                        </span>
                        <span style={{
                            fontSize: '0.95rem',
                            color: 'var(--text)',
                            fontWeight: 500,
                            lineHeight: 1.4,
                        }}>
                            {article.title}
                        </span>
                        <span style={{
                            fontSize: '0.75rem',
                            color: 'var(--text-tertiary)',
                            flexShrink: 0,
                            marginLeft: 'auto',
                        }}>
                            {article.readTime}
                        </span>
                    </Link>
                ))}
            </div>
        </nav>
    );
}
