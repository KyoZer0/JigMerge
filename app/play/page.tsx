import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'Play JigMerge – Free Online Puzzle Game',
    description: 'Play JigMerge free! Select a category, choose your level, and swap tiles to restore beautiful images. No downloads, no accounts needed.',
    keywords: ['play JigMerge', 'free puzzle game online', 'jigsaw solitaire game', 'tile swap puzzle', 'play puzzle online'],
};

export default function PlayPage() {
    return (
        <>
            {/* Game Section — full viewport */}
            <div className="play-layout">
                {/* Left side — Single vertical ad */}
                <aside className="play-sidebar">
                    <div className="ad-vertical">
                        <div className="ad-slot ad-slot-vertical">Ad</div>
                    </div>
                </aside>

                {/* Right side — Game iframe */}
                <main className="play-main">
                    <iframe
                        src="/game/index.html"
                        title="JigMerge Game"
                        className="play-iframe"
                        allow="autoplay"
                        loading="lazy"
                    />
                </main>
            </div>

            {/* How It Works Section */}
            <section className="how-it-works">
                <div className="container">
                    <h2 className="section-title">How JigMerge Works</h2>
                    <p className="section-subtitle">Three simple steps to start solving puzzles</p>

                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">1</div>
                            <h3>Choose a Category</h3>
                            <p>Pick from Animals, Nature, Cities, Art, or Food — each with unique images to solve.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">2</div>
                            <h3>Memorize the Image</h3>
                            <p>Study the full picture for 5 seconds before it splits into shuffled tiles.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">3</div>
                            <h3>Swap &amp; Solve</h3>
                            <p>Drag tiles to swap positions. Correctly placed neighbors merge automatically!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Horizontal Ad */}
            <div className="container" style={{ padding: '1.5rem' }}>
                <AdSlot type="banner" />
            </div>
        </>
    );
}
