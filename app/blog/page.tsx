'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';
import { posts } from '../lib/blogData';

export default function BlogPage() {
    const [activeCategory, setActiveCategory] = useState('All');

    const sortedPosts = useMemo(() => {
        return [...posts].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, []);

    const allCategories = useMemo(
        () => ['All', ...Array.from(new Set(posts.map((p) => p.category)))],
        []
    );

    const filteredPosts =
        activeCategory === 'All'
            ? sortedPosts
            : sortedPosts.filter((p) => p.category === activeCategory);

    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">JigMerge Blog</h1>
                    <p>Tips, insights, and stories from the world of puzzles.</p>
                </div>
            </div>

            <div
                className="container"
                style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}
            >
                <AdSlot type="banner" />

                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginTop: '2rem',
                        marginBottom: '1rem',
                    }}
                >
                    {allCategories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.4rem 1rem',
                                borderRadius: 'var(--radius-xl)',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                background:
                                    activeCategory === cat
                                        ? 'var(--primary)'
                                        : 'rgba(108, 92, 231, 0.1)',
                                color:
                                    activeCategory === cat ? '#fff' : 'var(--primary-light)',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <p
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: '0.85rem',
                        marginBottom: '1.5rem',
                    }}
                >
                    Showing {filteredPosts.length} article
                    {filteredPosts.length !== 1 ? 's' : ''}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {filteredPosts.map((post, i) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <article
                                className="card animate-in"
                                style={{
                                    animationDelay: `${0.1 + i * 0.05}s`,
                                    display: 'flex',
                                    gap: '1.5rem',
                                    cursor: 'pointer',
                                    alignItems: 'flex-start',
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: '2.5rem',
                                        flexShrink: 0,
                                        width: '80px',
                                        height: '80px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'rgba(108, 92, 231, 0.1)',
                                        borderRadius: 'var(--radius-md)',
                                    }}
                                >
                                    {post.icon}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            marginBottom: '0.5rem',
                                            fontSize: '0.8rem',
                                            color: 'var(--text-muted)',
                                        }}
                                    >
                                        <span
                                            style={{
                                                padding: '0.2rem 0.6rem',
                                                borderRadius: 'var(--radius-xl)',
                                                background: 'rgba(108, 92, 231, 0.15)',
                                                color: 'var(--primary-light)',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {post.category}
                                        </span>
                                        <span>{post.date}</span>
                                        <span>{post.readTime}</span>
                                    </div>

                                    <h2
                                        style={{
                                            fontSize: '1.25rem',
                                            marginBottom: '0.5rem',
                                            color: 'var(--text)',
                                        }}
                                    >
                                        {post.title}
                                    </h2>

                                    <p
                                        style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.95rem',
                                            margin: 0,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                <AdSlot type="banner" />
            </div>
        </>
    );
}