import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Read the JigMerge Terms of Service. Understand the rules and guidelines for using our free online puzzle game.',
    keywords: ['JigMerge terms of service', 'terms and conditions', 'usage agreement'],
};

export default function TermsPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Terms of Service</h1>
                    <p>Last updated: February 14, 2026</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    Welcome to JigMerge. By accessing or using our website and game, you agree to be
                    bound by these Terms of Service. Please read them carefully before using our services.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    By accessing JigMerge at JigMerge.online, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms of Service and our{' '}
                    <a href="/privacy-policy">Privacy Policy</a>. If you do not agree to these terms,
                    please do not use our website.
                </p>

                <h2>2. Description of Service</h2>
                <p>
                    JigMerge provides a free, browser-based puzzle game where users can solve jigsaw-style
                    puzzles by swapping tiles on a grid. The service includes the game itself, educational
                    content, blog articles, and related resources.
                </p>

                <h2>3. User Eligibility</h2>
                <p>
                    JigMerge is available to users of all ages. However, users under 13 years of age
                    should use the service only under parental supervision. We encourage parents and guardians
                    to review our <a href="/parents">Parents & Safety Guide</a>.
                </p>

                <h2>4. Intellectual Property</h2>
                <p>
                    All content on JigMerge — including but not limited to the game design, code, images,
                    text, graphics, logos, and audio — is the intellectual property of JigMerge or its
                    licensors. You may not reproduce, distribute, modify, or create derivative works from
                    any content without prior written permission.
                </p>
                <p>
                    You are granted a limited, non-exclusive, non-transferable license to access and use
                    JigMerge for personal, non-commercial purposes only.
                </p>

                <h2>5. Acceptable Use</h2>
                <p>When using JigMerge, you agree NOT to:</p>
                <ul>
                    <li>Use the service for any illegal or unauthorized purpose</li>
                    <li>Attempt to gain unauthorized access to our systems or servers</li>
                    <li>Interfere with or disrupt the operation of the website</li>
                    <li>Scrape, crawl, or use automated means to access the service (except standard search engine crawlers)</li>
                    <li>Copy, reproduce, or redistribute our game or content</li>
                    <li>Upload or transmit viruses, malware, or other harmful code</li>
                    <li>Attempt to reverse-engineer, decompile, or disassemble the game</li>
                </ul>

                <h2>6. User-Generated Content</h2>
                <p>
                    If you submit feedback, suggestions, or other content through our contact form, you
                    grant JigMerge a non-exclusive, royalty-free, perpetual license to use, modify,
                    and incorporate that content into our services.
                </p>

                <h2>7. Advertisements</h2>
                <p>
                    JigMerge displays advertisements from third-party ad networks, including Google
                    AdSense. These advertisements help us keep the game free for all users. We are not
                    responsible for the content or accuracy of third-party advertisements. Clicking on
                    advertisements is at your own risk.
                </p>

                <h2>8. Disclaimer of Warranties</h2>
                <p>
                    JigMerge is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any
                    kind, either express or implied. We do not guarantee that the service will be
                    uninterrupted, error-free, or free of viruses or other harmful components.
                </p>

                <h2>9. Limitation of Liability</h2>
                <p>
                    To the fullest extent permitted by law, JigMerge and its operators shall not be
                    liable for any indirect, incidental, special, consequential, or punitive damages arising
                    out of or related to your use of the service. Our total liability for any claim shall
                    not exceed the amount you paid to use the service (which is zero, as the service is free).
                </p>

                <h2>10. External Links</h2>
                <p>
                    Our website may contain links to third-party websites or services. We are not responsible
                    for the content, privacy practices, or availability of these external sites. Accessing
                    third-party links is at your own risk.
                </p>

                <h2>11. Modifications to Terms</h2>
                <p>
                    We reserve the right to modify these Terms of Service at any time. Changes will be
                    effective immediately upon posting to this page. Your continued use of the service
                    after any changes constitutes acceptance of the new terms.
                </p>

                <h2>12. Termination</h2>
                <p>
                    We reserve the right to suspend or terminate your access to JigMerge at our sole
                    discretion, without notice, for conduct that we believe violates these Terms of Service
                    or is harmful to other users, us, or third parties.
                </p>

                <h2>13. Governing Law</h2>
                <p>
                    These Terms of Service shall be governed by and construed in accordance with applicable
                    laws. Any disputes arising from these terms shall be resolved through appropriate
                    legal channels.
                </p>

                <h2>14. Contact</h2>
                <p>
                    If you have any questions about these Terms of Service, please reach out through
                    our <a href="/contact">Contact page</a> or email us at{' '}
                    <strong>legal@JigMerge.online</strong>.
                </p>
            </div>
        </>
    );
}
