import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '../lib/gameData';

export const metadata: Metadata = {
    title: 'Sitemap – All Pages',
    description: 'Browse the complete sitemap of JigMerge. Find every page on our website including games, blog posts, and information pages.',
    keywords: ['JigMerge sitemap', 'all pages', 'site navigation'],
};

const sections = [
    {
        title: 'Main Pages',
        links: [
            { href: '/', label: 'Home' },
            { href: '/play', label: 'Play JigMerge' },
            { href: '/categories', label: 'All Categories' },
            { href: '/how-to-play', label: 'How to Play' },
            { href: '/faq', label: 'FAQ' },
        ],
    },
    {
        title: 'Game Categories',
        links: categories.map(cat => ({
            href: `/categories/${cat.slug}`,
            label: `${cat.icon} ${cat.name}`,
        })),
    },
    {
        title: 'Blog',
        links: [
            { href: '/blog', label: 'Blog Home' },
            { href: '/blog/what-is-JigMerge', label: 'What is JigMerge?' },
            { href: '/blog/benefits-of-puzzle-games', label: '7 Brain Benefits of Puzzle Games' },
            { href: '/blog/tips-and-tricks', label: 'Pro Tips & Tricks' },
            { href: '/blog/history-of-puzzle-games', label: 'History of Jigsaw & Solitaire' },
            { href: '/blog/best-puzzle-games-for-kids', label: 'Best Puzzle Games for Kids' },
        ],
    },
    {
        title: 'Company',
        links: [
            { href: '/about', label: 'About Us' },
            { href: '/contact', label: 'Contact Us' },
            { href: '/parents', label: 'Parents & Safety' },
            { href: '/accessibility', label: 'Accessibility' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { href: '/privacy-policy', label: 'Privacy Policy' },
            { href: '/terms', label: 'Terms of Service' },
            { href: '/cookie-policy', label: 'Cookie Policy' },
            { href: '/disclaimer', label: 'Disclaimer' },
        ],
    },
];

export default function SitemapPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Sitemap</h1>
                    <p>Browse every page on JigMerge.</p>
                </div>
            </div>

            <div className="container" style={{ maxWidth: '900px', padding: '0 1.5rem 4rem' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '2rem',
                }}>
                    {sections.map((section) => (
                        <div key={section.title} className="card">
                            <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--primary-light)' }}>
                                {section.title}
                            </h2>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {section.links.map((link) => (
                                    <li key={link.href} style={{ marginBottom: '0.5rem' }}>
                                        <Link href={link.href} style={{
                                            color: 'var(--text-secondary)',
                                            fontSize: '0.9rem',
                                        }}>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
