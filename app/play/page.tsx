import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';
import GameEmbedActions from '../components/GameEmbedActions';

export const metadata: Metadata = {
    title: 'Play JigMerge – Free Online Puzzle Game',
    description: 'Play JigMerge free. Pick a live collection, jump into a puzzle set, and swap tiles to restore the image.',
    keywords: ['play JigMerge', 'free puzzle game online', 'jigsaw solitaire game', 'tile swap puzzle', 'play puzzle online'],
};

type PlayPageProps = {
    searchParams?: Promise<{ collection?: string; puzzle?: string }>;
};

export default async function PlayPage({ searchParams }: PlayPageProps) {
    const params = searchParams ? await searchParams : undefined;
    const iframeQuery = new URLSearchParams();

    if (params?.collection) {
        iframeQuery.set('collection', params.collection);
    }

    if (params?.puzzle) {
        iframeQuery.set('puzzle', params.puzzle);
    }

    const iframeSrc = iframeQuery.size > 0 ? `/game/index.html?${iframeQuery.toString()}` : '/game/index.html';
    const shareUrl = iframeQuery.size > 0 ? `/play?${iframeQuery.toString()}` : '/play';

    return (
        <>
            {/* Game Section — full viewport */}
            <div className="play-layout">
                <aside className="play-sidebar">
                    <div className="ad-vertical">
                        <div className="ad-slot ad-slot-vertical">Ad</div>
                    </div>
                </aside>

                <main className="play-main">
                    <div className="play-frame-shell">
                        <div id="play-game-frame" className="play-frame-card">
                            <iframe
                                src={iframeSrc}
                                title="JigMerge Game"
                                className="play-iframe"
                                allow="autoplay"
                                loading="lazy"
                            />
                        </div>
                        <GameEmbedActions targetId="play-game-frame" shareUrl={shareUrl} />
                    </div>
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
                            <p>Pick a collection and jump into its current puzzle set without leaving the browser.</p>
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
