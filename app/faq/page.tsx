import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'FAQ – JigMerge',
    description: 'Frequently asked questions about JigMerge. Find answers about gameplay, features, device support, and more.',
    keywords: ['JigMerge FAQ', 'puzzle game questions', 'JigMerge help'],
};

const faqs = [
    {
        q: 'Is JigMerge really free?',
        a: 'Yes! JigMerge is 100% free to play. No downloads, no accounts, no hidden paywalls. Just open your browser and start solving puzzles.',
    },
    {
        q: 'What devices can I play on?',
        a: 'JigMerge works on any modern browser — desktop, tablet, or mobile. The game automatically adapts to your screen size for the best experience.',
    },
    {
        q: 'How does tile merging work?',
        a: 'When two or more adjacent tiles are both in their correct positions, they automatically merge into a group. Merged groups move together when dragged, making the puzzle easier as you progress.',
    },
    {
        q: 'How many levels are there?',
        a: 'JigMerge currently features 25 levels across 5 categories (Animals, Nature, Cities, Art, and Food). Each category has 5 levels with increasing difficulty.',
    },
    {
        q: 'What does the difficulty progression look like?',
        a: 'Early levels use a 3×3 grid (9 tiles). As you advance, the grid grows — 4×3, 4×4, and beyond — adding more tiles and complexity to the puzzle.',
    },
    {
        q: 'Can I play offline?',
        a: 'JigMerge requires an internet connection to load images and game assets. Once loaded, gameplay is smooth even on slower connections.',
    },
    {
        q: 'Is my progress saved?',
        a: 'Currently, progress is not saved between sessions. We\'re working on adding progress tracking in a future update.',
    },
    {
        q: 'Is JigMerge safe for children?',
        a: 'Yes! JigMerge contains no violent or inappropriate content. It\'s a great way for kids to develop spatial reasoning and problem-solving skills. We also don\'t collect personal information from children.',
    },
];

export default function FAQPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Frequently Asked Questions</h1>
                    <p>Got questions? We&apos;ve got answers.</p>
                </div>
            </div>

            <div className="page-content">
                {faqs.map((faq, i) => (
                    <div key={i} style={{ marginBottom: '2rem' }}>
                        <h3>{faq.q}</h3>
                        <p>{faq.a}</p>
                    </div>
                ))}

                <AdSlot type="banner" />
            </div>
        </>
    );
}
