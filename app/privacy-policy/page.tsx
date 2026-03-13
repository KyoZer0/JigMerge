import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Read the JigMerge Privacy Policy to understand what data the site processes, how ads and browser storage work, and how to contact us.',
    keywords: ['JigMerge privacy policy', 'data protection', 'browser game privacy'],
    alternates: {
        canonical: '/privacy-policy',
    },
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Privacy Policy</h1>
                    <p>Last updated: March 11, 2026</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    This Privacy Policy explains how JigMerge processes information when you visit the site,
                    play the browser game, or contact us. We aim to keep the site usable without requiring
                    accounts or unnecessary personal data, and we want the policy to describe the site as it
                    actually works rather than as a generic template.
                </p>

                <h2>1. Who This Policy Applies To</h2>
                <p>
                    This policy applies to visitors of <strong>jigmerge.com</strong>, including people who browse
                    pages, play the game, read the blog, or contact us by email.
                </p>

                <h2>2. Information You Choose to Send Us</h2>
                <p>
                    You can use JigMerge without creating an account. The main time you intentionally provide
                    personal information is when you contact us. Our contact page opens your email app using a
                    mailto link. If you send us an email, we may receive information such as your name, email
                    address, subject line, and the content of your message.
                </p>
                <p>
                    We use that information only to review and respond to your inquiry, improve the site where
                    relevant, and keep records of support, privacy, legal, or accessibility requests.
                </p>

                <h2>3. Technical Information Processed When You Visit the Site</h2>
                <p>
                    Like most websites, JigMerge may rely on hosting, content delivery, and security infrastructure
                    that processes standard technical request data. Depending on the provider and your browser, that
                    can include your IP address, browser type, device type, referring page, approximate timestamps,
                    and requested URLs. We use site infrastructure to deliver pages, diagnose technical issues,
                    protect against abuse, and maintain availability.
                </p>
                <p>
                    We do not currently require account registration, profile creation, or login tracking in order to
                    play the game.
                </p>

                <h2>4. Browser Storage and Gameplay State</h2>
                <p>
                    The game may store limited information locally in your browser to support the experience. For
                    example, the current game uses local browser storage to remember local progress, selected options,
                    and similar on-device gameplay state. This information stays on your device unless you clear your
                    browser storage.
                </p>
                <p>
                    Local storage helps the game remember simple preferences or state without requiring an account.
                    It is not the same thing as a full user profile, and it is not synced by us across devices.
                </p>

                <h2>5. Advertising and Third-Party Services</h2>
                <p>
                    JigMerge may display advertisements from third-party providers such as Google AdSense. When ads
                    are served, those providers may process data through cookies, similar technologies, or device
                    identifiers in accordance with their own policies and applicable law. We use ads to help support
                    hosting and maintenance of the free site.
                </p>
                <p>
                    We do not currently claim to run Google Analytics or a separate user-account analytics system on
                    the site. If that changes in the future, this policy will be updated before or when the change is
                    introduced.
                </p>

                <h2>6. How We Use Information</h2>
                <ul>
                    <li>To deliver the website and browser game</li>
                    <li>To respond to emails and support requests</li>
                    <li>To maintain site security, performance, and reliability</li>
                    <li>To understand operational issues such as broken pages or bug reports</li>
                    <li>To support ad serving through third-party advertising providers where ads are enabled</li>
                    <li>To comply with legal obligations or respond to valid requests</li>
                </ul>

                <h2>7. How We Share Information</h2>
                <p>
                    We do not sell your personal information. We may share or make information available only in
                    limited circumstances, such as:
                </p>
                <ul>
                    <li>with hosting, infrastructure, email, or advertising providers that help operate the site,</li>
                    <li>when required by law, regulation, subpoena, or other legal process,</li>
                    <li>when necessary to investigate abuse, protect the site, or protect users and the public.</li>
                </ul>

                <h2>8. Children&apos;s Privacy</h2>
                <p>
                    JigMerge is designed to be family-friendly, but parents and guardians should still supervise use.
                    We do not require children to create accounts or submit profiles to play. If you believe a child
                    has sent us personal information directly, please contact us so we can review the request.
                </p>
                <p>
                    Our <a href="/parents">Parents &amp; Safety</a> page provides additional guidance for families.
                </p>

                <h2>9. Retention</h2>
                <p>
                    We keep contact emails and related records only as long as reasonably necessary for support,
                    legal, operational, or security purposes. Browser storage used by the game remains under your
                    control in your own browser unless you clear it.
                </p>

                <h2>10. Your Choices</h2>
                <ul>
                    <li>You can stop using the site at any time.</li>
                    <li>You can clear local browser storage through your browser settings.</li>
                    <li>You can manage cookies through browser controls and Google ad settings where applicable.</li>
                    <li>You can contact us to ask privacy-related questions or request review of information you sent directly by email.</li>
                </ul>

                <h2>11. International Visitors</h2>
                <p>
                    JigMerge may be accessed from multiple countries. Depending on where you live, local privacy laws
                    may give you rights regarding access, correction, deletion, restriction, or objection. If you want
                    to raise a privacy request, please contact us and describe the issue clearly.
                </p>

                <h2>12. Changes to This Policy</h2>
                <p>
                    We may revise this page when the site, our service providers, or our legal obligations change.
                    When we make material updates, we will change the “Last updated” date shown at the top.
                </p>

                <h2>13. Contact</h2>
                <p>
                    Privacy questions can be sent through the <a href="/contact">Contact page</a> or directly to{' '}
                    <strong>privacy@jigmerge.com</strong>.
                </p>
            </div>
        </>
    );
}
