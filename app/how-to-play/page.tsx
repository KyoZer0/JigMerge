import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'How to Play JigMerge – Complete Guide',
    description: 'Learn how to play JigMerge step by step, from the opening preview to tile merges, strategy, and common beginner mistakes.',
    keywords: ['how to play JigMerge', 'JigMerge guide', 'puzzle strategy guide', 'tile swap instructions'],
    alternates: {
        canonical: '/how-to-play',
    },
};

export default function HowToPlayPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">How to Play</h1>
                    <p>A full beginner-friendly guide to the rules, rhythm, and strategy behind JigMerge.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>The Core Goal</h2>
                <p>
                    JigMerge is a browser puzzle game where you restore a scrambled image by swapping tiles on a
                    grid. Unlike a traditional jigsaw, you are not rotating pieces or forcing irregular shapes to
                    connect. The image is already divided into fixed positions. Your job is to move each tile back
                    where it belongs using careful swaps and visual recognition.
                </p>

                <h2>What Happens at the Start of a Level</h2>
                <p>
                    Each level begins with a short preview of the completed image. That preview matters more than
                    many new players realize. It gives you reference points: strong colors, obvious corners,
                    repeated textures, and the broad structure of the finished picture. Once the preview ends, the
                    board shuffles and the actual solving begins.
                </p>
                <p>
                    A good first habit is to memorize only a few anchors rather than trying to hold the entire image
                    in your head. Notice a bright object, a border line, a face, a horizon, or a color cluster. Those
                    anchors make the early moves much easier.
                </p>

                <h2>How Swapping Works</h2>
                <p>
                    To move tiles, drag one tile onto another. The two positions swap. There is no inventory, no
                    separate holding space, and no penalty for experimenting. The challenge comes from making swaps
                    that improve the overall board instead of fixing one area while accidentally breaking another.
                </p>

                <h2>The Merge Mechanic</h2>
                <p>
                    The signature feature of JigMerge is automatic merging. When neighboring tiles are both in the
                    correct positions, they merge into a single group. That group then moves together. In practical
                    terms, this means that correct progress becomes more stable over time. A good board gradually
                    turns from scattered tiles into larger solved chunks.
                </p>
                <p>
                    This changes the strategy. You are not just looking for one correct tile. You are trying to
                    create relationships between correct tiles so the board becomes easier to manage. Early merges can
                    simplify the rest of the level dramatically.
                </p>

                <h2>A Simple Beginner Strategy</h2>
                <ol>
                    <li><strong>Scan for the easiest anchor pieces first.</strong> Look for corners, borders, or highly distinctive colors.</li>
                    <li><strong>Build one solved region at a time.</strong> Do not chase every possible match on the board at once.</li>
                    <li><strong>Use merges as checkpoints.</strong> When tiles lock together, treat that area as a new stable reference point.</li>
                    <li><strong>Re-scan after every important move.</strong> One good swap can reveal several better options.</li>
                    <li><strong>Stay calm when stuck.</strong> Most stalls come from tunnel vision, not from an impossible board.</li>
                </ol>

                <h2>How Difficulty Increases</h2>
                <p>
                    JigMerge becomes harder in two main ways: the boards become larger, and the visual relationships
                    inside the image become more demanding. A small grid gives you fewer possibilities to manage.
                    Larger grids require more planning, more scanning, and stronger memory for visual detail.
                </p>
                <p>
                    The best way to improve is not to jump immediately to the hardest category. Spend enough time on
                    mid-level boards that you understand how merges change the shape of the puzzle. Once that feels
                    natural, higher difficulty becomes much more satisfying.
                </p>

                <h2>Common Mistakes New Players Make</h2>
                <ul>
                    <li><strong>Rushing the preview:</strong> if you ignore the opening image, you give away free information.</li>
                    <li><strong>Fixating on one tile:</strong> sometimes the better move is elsewhere on the board.</li>
                    <li><strong>Ignoring the board as a whole:</strong> good swaps improve structure, not just one local spot.</li>
                    <li><strong>Playing too fast when stuck:</strong> random swapping creates more confusion than progress.</li>
                    <li><strong>Underusing easy wins:</strong> small merges add up and often reveal the next correct path.</li>
                </ul>

                <h2>How to Get Better Faster</h2>
                <p>
                    Improvement in JigMerge comes from pattern recognition and patience, not from frantic movement.
                    If you want to level up, slow down enough to notice why a move worked. Ask yourself what clue made
                    the right tile stand out. Was it color? Edge direction? A recognizable object? That habit turns
                    accidental success into reusable skill.
                </p>
                <p>
                    It also helps to vary your goals. On one session, focus on finishing a level cleanly. On another,
                    focus on spotting merges earlier. On another, try to reduce hesitation between moves. Different
                    goals sharpen different parts of your play.
                </p>

                <h2>When to Use the Blog</h2>
                <p>
                    Once the core rules make sense, the blog becomes more useful. The strategy articles are there to
                    help you think more deliberately about focus, difficulty, family use, and the puzzle habits that
                    make the game more enjoyable over time.
                </p>

                <h2>Ready to Start?</h2>
                <p>
                    If you understand the preview, the swap, and the merge, you already know enough to play. The rest
                    comes from repetition and observation.
                </p>
                <p style={{ marginTop: '1.5rem' }}>
                    <Link href="/play" className="btn btn-primary">
                        Play Now →
                    </Link>
                </p>
            </div>
        </>
    );
}
