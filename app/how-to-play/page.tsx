import type { Metadata } from 'next';
import Link from 'next/link';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'How to Play JigMerge – Complete Guide',
    description: 'Learn how to play JigMerge step by step. Master tile swapping, group merging, and advanced strategies to solve puzzles faster.',
    keywords: ['how to play JigMerge', 'JigMerge guide', 'puzzle game tutorial', 'tile swap instructions'],
};

export default function HowToPlayPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">How to Play</h1>
                    <p>Everything you need to know to master JigMerge — from your first puzzle to advanced strategies.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>Getting Started</h2>
                <p>
                    JigMerge is a unique puzzle game where you swap tiles on a grid to restore a scrambled image.
                    Unlike traditional jigsaw puzzles with irregular pieces, JigMerge uses a clean grid system
                    that makes it easy to pick up but challenging to master.
                </p>

                <h3>Step 1: Choose a Category</h3>
                <p>
                    Select from five beautiful categories — Animals, Nature, Cities, Art, and Food. Each category
                    contains five handcrafted levels with stunning imagery.
                </p>

                <h3>Step 2: Memorize the Image</h3>
                <p>
                    When a level starts, you&apos;ll see the complete image for 5 seconds. Study it carefully!
                    The image will then split into tiles and shuffle to random positions on the grid. Your goal
                    is to restore the original image.
                </p>

                <h3>Step 3: Swap Tiles</h3>
                <p>
                    Drag any tile and drop it onto another tile to swap their positions. Keep swapping until
                    every tile is back in its correct place. The game tracks your moves and time, so try to
                    solve each puzzle as efficiently as possible!
                </p>

                <AdSlot type="in-content" />

                <h2>Tile Merging</h2>
                <p>
                    One of JigMerge&apos;s unique features is automatic tile merging. When two or more
                    adjacent tiles are both in their correct positions, they merge into a group. Merged groups
                    move together as a single unit when dragged, making the puzzle progressively easier as you
                    place more tiles correctly.
                </p>

                <h2>Difficulty Progression</h2>
                <p>
                    Levels 1–5 use a 3×3 grid (9 tiles), providing a gentle introduction. As you advance,
                    the grid size increases — levels 6–10 use 4×3, levels 11–15 use 4×4, and so on.
                    Larger grids mean more tiles to manage and more complex spatial reasoning required.
                </p>

                <h2>Tips &amp; Strategies</h2>
                <ul>
                    <li><strong>Start with corners and edges:</strong> These tiles have fewer possible positions, making them easier to identify.</li>
                    <li><strong>Look for distinctive features:</strong> Find tiles with unique colors, patterns, or objects to quickly identify their correct positions.</li>
                    <li><strong>Work in sections:</strong> Focus on one area of the image at a time rather than randomly swapping tiles across the board.</li>
                    <li><strong>Use the reference image:</strong> The smaller reference image in the sidebar shows the complete picture — use it to guide your placement.</li>
                    <li><strong>Leverage merged groups:</strong> Once tiles merge, they reduce the complexity. Try to create merges early by placing adjacent tiles correctly.</li>
                </ul>

                <h2>Ready to Play?</h2>
                <p>
                    Now that you know the basics, it&apos;s time to put your skills to the test!
                    Head to the game and start solving puzzles.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                    <Link href="/play" className="btn btn-primary">
                        Play Now →
                    </Link>
                </p>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
