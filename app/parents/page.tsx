import type { Metadata } from 'next';
import AdSlot from '../components/AdSlot';

export const metadata: Metadata = {
    title: 'Parents & Safety Guide',
    description: 'JigMerge is a safe, educational, and family-friendly puzzle game. Learn how we protect children and promote healthy screen time.',
    keywords: ['JigMerge for kids', 'safe puzzle game', 'children online safety', 'educational puzzle game', 'family friendly games'],
};

export default function ParentsPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Parents &amp; Safety Guide</h1>
                    <p>Everything parents need to know about JigMerge and online safety.</p>
                </div>
            </div>

            <div className="page-content">
                <h2>A Game Designed with Families in Mind</h2>
                <p>
                    JigMerge is a family-friendly puzzle game created to provide wholesome entertainment
                    for players of all ages. We understand that parents care deeply about what their children
                    do online, and we&apos;ve built JigMerge with safety, education, and fun as our core priorities.
                </p>

                <h2>Why Puzzle Games Are Great for Kids</h2>
                <p>
                    Research consistently shows that puzzle games offer significant cognitive benefits for
                    children and adults alike. Here&apos;s what your child gains from playing JigMerge:
                </p>
                <ul>
                    <li><strong>Spatial Reasoning:</strong> Understanding how pieces fit together develops spatial intelligence, which is crucial for math and science.</li>
                    <li><strong>Problem-Solving Skills:</strong> Each puzzle requires strategic thinking and planning, building critical thinking abilities.</li>
                    <li><strong>Patience &amp; Persistence:</strong> Completing a puzzle teaches children that effort and patience lead to rewarding outcomes.</li>
                    <li><strong>Visual Memory:</strong> Remembering patterns and tile positions strengthens working memory.</li>
                    <li><strong>Fine Motor Skills:</strong> Drag-and-drop interactions develop hand-eye coordination and fine motor control.</li>
                    <li><strong>Confidence:</strong> Successfully solving puzzles builds self-esteem and a sense of achievement.</li>
                </ul>

                <AdSlot type="in-content" />

                <h2>Our Safety Commitments</h2>

                <h3>No Personal Data Collection from Children</h3>
                <p>
                    JigMerge does not collect any personal information from children. There are no
                    accounts to create, no profiles to fill out, and no chat features. Your child can
                    play freely without sharing any personal details.
                </p>

                <h3>No In-App Purchases</h3>
                <p>
                    JigMerge is completely free to play with no hidden costs. There are no virtual
                    currencies, loot boxes, or premium upgrades. Every level and feature is available to
                    everyone at no charge.
                </p>

                <h3>No Social Features</h3>
                <p>
                    There are no chat rooms, messaging systems, or multiplayer features. Children cannot
                    interact with other users, ensuring a safe solo gaming experience.
                </p>

                <h3>Age-Appropriate Content</h3>
                <p>
                    All images used in JigMerge are carefully curated to be appropriate for all ages.
                    Our categories — Animals, Nature, Cities, Art, and Food — feature beautiful,
                    non-violent, and educational imagery.
                </p>

                <h3>Advertisements</h3>
                <p>
                    JigMerge displays advertisements to support the free service. These ads are served
                    by Google AdSense and comply with Google&apos;s policies regarding ads shown alongside
                    family-friendly content. We do not serve personalized ads to users we identify as
                    children.
                </p>

                <h2>COPPA Compliance</h2>
                <p>
                    We take the Children&apos;s Online Privacy Protection Act (COPPA) seriously. JigMerge
                    is designed to be compliant with COPPA requirements:
                </p>
                <ul>
                    <li>We do not knowingly collect personal information from children under 13</li>
                    <li>We do not require account creation or registration</li>
                    <li>We do not use persistent identifiers to track children across services</li>
                    <li>The game functions without any data submission from the user</li>
                </ul>

                <h2>Tips for Parents</h2>
                <p>
                    While JigMerge is designed to be safe, we encourage parents to take an active role
                    in their children&apos;s online activities:
                </p>
                <ol>
                    <li><strong>Play together:</strong> Puzzles are a great shared activity. Sit with your child and solve puzzles as a team.</li>
                    <li><strong>Set time limits:</strong> Help your child maintain a healthy balance between screen time and other activities.</li>
                    <li><strong>Discuss online safety:</strong> Use JigMerge as a starting point to talk about safe internet habits.</li>
                    <li><strong>Use browser controls:</strong> Consider using parental control software to manage your child&apos;s browsing experience.</li>
                    <li><strong>Check for updates:</strong> We regularly update our safety practices and encourage parents to revisit this page.</li>
                </ol>

                <h2>Have Concerns?</h2>
                <p>
                    If you have any questions or concerns about your child&apos;s experience on JigMerge,
                    please don&apos;t hesitate to <a href="/contact">contact us</a>. We prioritize parent
                    communications and respond within 24 hours to safety-related inquiries.
                </p>

                <AdSlot type="banner" />
            </div>
        </>
    );
}
