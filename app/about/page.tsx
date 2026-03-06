import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'About Us – JigMerge',
    description: 'Learn about JigMerge, our mission to create the ultimate free online puzzle experience, and the team behind the game.',
    keywords: ['about JigMerge', 'puzzle game team', 'who made JigMerge'],
};

export default function AboutPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">About JigMerge</h1>
                    <p>Our story, mission, and the passion behind every puzzle piece.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>Our Story</h2>
                <p>
                    JigMerge was born from a simple idea: what if the relaxing satisfaction of jigsaw puzzles
                    could be combined with the strategic tile-swapping of solitaire? The result is a game that&apos;s
                    instantly intuitive yet endlessly engaging — a puzzle experience unlike any other on the web.
                </p>
                <p>
                    We launched JigMerge with a clear vision — to create a free, accessible, and beautifully
                    designed puzzle game that anyone can enjoy. Whether you&apos;re a student taking a study break, a
                    professional unwinding after work, or a parent looking for screen time that&apos;s actually
                    beneficial for your kids, JigMerge has something for you.
                </p>

                <h2>Our Mission</h2>
                <p>
                    We believe that puzzle games are more than entertainment — they&apos;re tools for building
                    cognitive skills, improving focus, and finding moments of calm in a busy world. Our mission
                    is to make high-quality puzzle experiences freely available to everyone, everywhere.
                </p>
                <p>
                    Every level in JigMerge is handcrafted with care. From selecting the perfect images to
                    fine-tuning the difficulty progression, we obsess over the details so you can simply enjoy
                    the puzzles.
                </p>

                <AdSlot type="in-content" />

                <h2>What Makes Us Different</h2>
                <p>
                    Unlike traditional jigsaw apps, JigMerge uses a unique tile-swapping mechanic. Instead
                    of fitting irregular pieces together, you work within a clean grid — dragging and dropping
                    tiles to swap their positions. When adjacent tiles are in their correct spots, they merge
                    into a group that moves together as one. This creates a satisfying cascade effect as you
                    solve the puzzle.
                </p>

                <h3>Key Features</h3>
                <ul>
                    <li><strong>5 Beautiful Categories:</strong> Animals, Nature, Cities, Art, and Food — each with stunning imagery.</li>
                    <li><strong>25 Handcrafted Levels:</strong> Progressive difficulty from easy 3×3 grids to challenging 3×5 grids.</li>
                    <li><strong>Smart Tile Merging:</strong> Correctly placed adjacent tiles merge into movable groups.</li>
                    <li><strong>Smooth Animations:</strong> Fluid drag-and-drop with satisfying visual feedback.</li>
                    <li><strong>No Downloads Required:</strong> Play instantly in your browser on any device.</li>
                    <li><strong>100% Free:</strong> No paywalls, no premium tiers. Just pure puzzle fun.</li>
                </ul>

                <h2>Our Values</h2>
                <p>
                    <strong>Accessibility First:</strong> We design for everyone. Our game works across devices
                    and screen sizes, with clear visuals and intuitive controls.
                </p>
                <p>
                    <strong>Privacy Matters:</strong> We respect your data. We don&apos;t collect personal
                    information from children, and we&apos;re transparent about how we use cookies and analytics.
                    Read our <a href="/privacy-policy">Privacy Policy</a> for full details.
                </p>
                <p>
                    <strong>Quality Over Quantity:</strong> We&apos;d rather have 25 beautifully crafted levels
                    than 1,000 mediocre ones. Every puzzle is tested and refined before release.
                </p>

                <h2>Get In Touch</h2>
                <p>
                    We love hearing from our community! Whether you have feedback, suggestions, bug reports,
                    or just want to say hello, don&apos;t hesitate to reach out through our{' '}
                    <a href="/contact">Contact page</a>. Your input helps us make JigMerge better for
                    everyone.
                </p>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
