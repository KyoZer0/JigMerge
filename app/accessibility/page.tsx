import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Accessibility Statement',
    description: 'JigMerge is committed to digital accessibility. Learn about our efforts to make our puzzle game available to everyone.',
    keywords: ['JigMerge accessibility', 'accessible puzzle game', 'web accessibility statement'],
};

export default function AccessibilityPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Accessibility Statement</h1>
                    <p>Our commitment to making JigMerge accessible to everyone.</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    JigMerge is committed to ensuring digital accessibility for people with disabilities.
                    We are continually improving the user experience for everyone and applying the relevant
                    accessibility standards to ensure we provide equal access to all of our users.
                </p>

                <h2>Our Commitment</h2>
                <p>
                    We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA.
                    These guidelines explain how to make web content more accessible for people with
                    disabilities, and user-friendly for everyone.
                </p>

                <h2>Measures We&apos;ve Taken</h2>
                <ul>
                    <li><strong>Semantic HTML:</strong> Our website uses proper HTML5 semantic elements for clear document structure, making it easier for screen readers to navigate.</li>
                    <li><strong>Keyboard Navigation:</strong> All interactive elements on the website can be accessed using a keyboard alone. We ensure visible focus indicators are present.</li>
                    <li><strong>Color Contrast:</strong> We maintain sufficient color contrast ratios between text and backgrounds to ensure readability for users with visual impairments.</li>
                    <li><strong>Alt Text:</strong> Images used throughout the site include descriptive alternative text for screen reader users.</li>
                    <li><strong>Responsive Design:</strong> The website adapts to different screen sizes and zoom levels, accommodating users who need to enlarge content.</li>
                    <li><strong>Clear Language:</strong> We use plain, clear language throughout the website to make content accessible to people with cognitive disabilities.</li>
                    <li><strong>Consistent Navigation:</strong> Navigation patterns are consistent across all pages, reducing cognitive load.</li>
                </ul>

                <h2>Game Accessibility</h2>
                <p>
                    We recognize that the game component of JigMerge presents additional accessibility
                    challenges due to its visual and interactive nature. We are working on the following
                    improvements:
                </p>
                <ul>
                    <li>High-contrast mode for the game grid</li>
                    <li>Keyboard-only controls for tile swapping</li>
                    <li>Screen reader announcements for game events</li>
                    <li>Optional sound effects to provide audio feedback</li>
                    <li>Adjustable animation speeds</li>
                </ul>

                <h2>Known Limitations</h2>
                <p>
                    While we strive for full accessibility, there are some known limitations:
                </p>
                <ul>
                    <li>The puzzle game requires visual perception of images and spatial reasoning, which may present challenges for users with certain visual or cognitive disabilities.</li>
                    <li>Drag-and-drop interactions in the game may be difficult for some users with motor impairments. We are exploring click-to-select alternatives.</li>
                    <li>Some third-party content (such as advertisements) may not meet our accessibility standards.</li>
                </ul>

                <h2>Feedback</h2>
                <p>
                    We welcome your feedback on the accessibility of JigMerge. If you encounter
                    accessibility barriers or have suggestions for improvement, please let us know:
                </p>
                <ul>
                    <li>Contact us through our <a href="/contact">Contact page</a></li>
                    <li>Email: <strong>accessibility@JigMerge.online</strong></li>
                </ul>
                <p>
                    We try to respond to accessibility feedback within 5 business days and will do our
                    best to address issues promptly.
                </p>

                <h2>Continuous Improvement</h2>
                <p>
                    We view accessibility as an ongoing process, not a one-time effort. We regularly
                    review our website for accessibility issues, train our team on accessibility best
                    practices, and incorporate accessibility testing into our development workflow.
                </p>
            </div>
        </>
    );
}
