import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Parents & Safety Guide',
    description: 'Learn how JigMerge approaches family-friendly design, children’s use, ads, and privacy in a browser-based puzzle game.',
    keywords: ['JigMerge for kids', 'safe puzzle game', 'children online safety', 'educational puzzle game', 'family friendly games'],
    alternates: {
        canonical: '/parents',
    },
};

export default function ParentsPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Parents &amp; Safety Guide</h1>
                    <p>What families should know about JigMerge, from gameplay and ads to privacy expectations.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>A Family-Friendly Puzzle Site, Not a Social Platform</h2>
                <p>
                    JigMerge is designed as a browser-based puzzle experience. The site does not include public
                    profiles, direct messaging, chat rooms, or user-generated social spaces. That matters for parents,
                    because many online risks for children come from communication features or aggressive monetization
                    systems rather than from the puzzle mechanic itself.
                </p>

                <h2>What Children Can Do on the Site</h2>
                <p>
                    Children can play the puzzle game, browse category pages, and read basic help content. There is no
                    account creation requirement to start playing. We do not ask children to publish content, create a
                    persistent profile, or interact with other users through the site.
                </p>

                <h2>What Parents Should Still Know</h2>
                <p>
                    No website is automatically “hands-off” just because it looks friendly. We encourage parents and
                    guardians to supervise use, especially for younger children. Browser environments can still involve
                    ads, links, and general internet access outside the game itself. A few minutes of shared play is
                    often the best way to judge whether the experience fits your child well.
                </p>

                <h2>How JigMerge Tries to Stay Age-Appropriate</h2>
                <ul>
                    <li>The core puzzle mechanic is visual and non-violent.</li>
                    <li>The site does not require account registration to play.</li>
                    <li>There are no public chat or friend systems.</li>
                    <li>The game focuses on observation, patience, and planning rather than competitive pressure.</li>
                    <li>Support and policy pages are available so adults can understand how the site works.</li>
                </ul>

                <h2>Advertising and Children</h2>
                <p>
                    JigMerge may display ads from third-party providers such as Google AdSense to support the free
                    site. Those ads are not the main purpose of the site, and we try to keep them secondary to the
                    game and support content. Even so, parents should remember that third-party ad providers may use
                    their own technologies, including cookies or similar identifiers, subject to their own policies and
                    regional legal requirements.
                </p>
                <p>
                    If a child will use the site regularly, it is a good idea to review browser privacy settings,
                    discuss ads with them in age-appropriate language, and use parental controls where needed.
                </p>

                <h2>Privacy Expectations for Families</h2>
                <p>
                    Children do not need to create accounts to play JigMerge. The current site does not include an
                    in-game form that collects a child&apos;s profile or progress history. Some limited technical data may
                    still be processed by hosting infrastructure or advertising providers in the normal operation of a
                    website, and simple browser storage may be used to remember local gameplay state such as puzzle
                    progress or preferences. For fuller detail, please review the <a href="/privacy-policy">Privacy Policy</a>{' '}
                    and <a href="/cookie-policy">Cookie Policy</a>.
                </p>

                <h2>How to Decide If the Game Fits Your Child</h2>
                <p>
                    Ask a few basic questions after a short shared session. Did the child understand the goal? Did the
                    challenge feel calm or frustrating? Was the child thinking, observing, and trying again, or mostly
                    tapping quickly without reflection? Those answers tell you more than an age label alone.
                </p>

                <h2>Helpful Ways to Use JigMerge With Children</h2>
                <ol>
                    <li><strong>Co-play first:</strong> spend a few minutes solving together before letting the child use the site alone.</li>
                    <li><strong>Keep sessions short:</strong> calmer, shorter sessions are usually better than long stretches.</li>
                    <li><strong>Talk through strategy:</strong> naming patterns and next steps turns play into guided problem-solving.</li>
                    <li><strong>Use the game as one part of a balanced routine:</strong> puzzle play should complement offline play, reading, and rest.</li>
                </ol>

                <h2>Questions or Concerns?</h2>
                <p>
                    If you have a family-safety, accessibility, or privacy concern, please use the{' '}
                    <a href="/contact">Contact page</a>. Parent questions are welcome, especially when they help us
                    keep the site aligned with how it is actually being used.
                </p>
            </div>
        </>
    );
}
