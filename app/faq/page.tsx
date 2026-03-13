import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FAQ – JigMerge',
    description: 'Frequently asked questions about JigMerge, including gameplay, devices, privacy, ads, and support.',
    keywords: ['JigMerge FAQ', 'puzzle game questions', 'JigMerge help'],
    alternates: {
        canonical: '/faq',
    },
};

const faqs = [
    {
        q: 'Is JigMerge really free?',
        a: 'Yes. The game is free to play in the browser. There are no accounts, paid levels, or premium unlocks required to access the core experience.',
    },
    {
        q: 'Do I need to download anything?',
        a: 'No. JigMerge runs directly in your browser. If the page loads, you can start playing without installing an app or extension.',
    },
    {
        q: 'What devices can I play on?',
        a: 'JigMerge is designed for modern desktop and mobile browsers. The layout adapts for phones, tablets, and larger screens so the game remains playable across common device sizes.',
    },
    {
        q: 'How does tile merging work?',
        a: 'When adjacent tiles are both in their correct positions, they merge into a single group. That group then moves together, reducing board complexity and helping you build momentum as the image comes together.',
    },
    {
        q: 'How many levels are available?',
        a: 'The live game currently includes 19 collections and 367 playable puzzle boards. Collections 01-07 use 3x3 boards, 08-13 use 6x6 boards, and 14-19 use 9x9 boards.',
    },
    {
        q: 'Can I save my progress?',
        a: 'The current experience does not use account-based cloud saving. Some small gameplay preferences may be stored locally in your browser, but progress is not synced across devices.',
    },
    {
        q: 'Does JigMerge work offline?',
        a: 'An internet connection is required to load the site and game assets. After the page loads, gameplay itself is lightweight, but the site is not designed as a fully offline product.',
    },
    {
        q: 'Is JigMerge safe for children?',
        a: 'The game is designed to be family-friendly and does not include chat, user profiles, or account creation. Parents should still supervise use and review our Parents & Safety Guide and Privacy Policy if children will use the site regularly.',
    },
    {
        q: 'Do you collect personal information?',
        a: 'You can browse and play without creating an account. If you contact us by email, your message is handled through your email provider and our inbox. Our Privacy Policy explains the limited data processing involved in running the site and any third-party ad services.',
    },
    {
        q: 'Why are ads shown on some pages?',
        a: 'Ads help support hosting and maintenance so the game can remain free. We aim to keep ads secondary to the main content and not place them in a way that overwhelms gameplay or trust pages.',
    },
    {
        q: 'Can I report a bug or inaccurate page?',
        a: 'Yes. Please use the Contact page and include the page URL, device, browser, and a short description of the issue. Clear reports help us fix problems faster.',
    },
    {
        q: 'Where should I start if I am new?',
        a: 'The best starting points are the Play page, the How to Play guide, and the early 3x3 collections. Once the merge mechanic feels natural, the larger 6x6 and 9x9 collections become much easier to read.',
    },
];

export default function FAQPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Frequently Asked Questions</h1>
                    <p>Clear answers about gameplay, support, privacy, and how the site works.</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    This page exists to answer the questions players ask most often before or after trying
                    JigMerge. If you need a step-by-step gameplay guide, visit <a href="/how-to-play">How to Play</a>.
                    If your question is about privacy, ads, or children using the site, the policy pages in the
                    footer give fuller detail.
                </p>

                {faqs.map((faq) => (
                    <section key={faq.q} style={{ marginBottom: '2rem' }}>
                        <h2 style={{ fontSize: '1.05rem', marginBottom: '0.5rem' }}>{faq.q}</h2>
                        <p>{faq.a}</p>
                    </section>
                ))}

                <h2>Still Need Help?</h2>
                <p>
                    If your question is not covered here, please use the <a href="/contact">Contact page</a>.
                    The more specific your message is, the easier it is for us to give a useful answer.
                </p>
            </div>
        </>
    );
}
