import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Read the JigMerge Privacy Policy. Learn how we collect, use, and protect your personal data when you use our free online puzzle game.',
    keywords: ['JigMerge privacy policy', 'data protection', 'cookie policy puzzle game'],
};

export default function PrivacyPolicyPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Privacy Policy</h1>
                    <p>Last updated: February 14, 2026</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    At JigMerge, we are committed to protecting your privacy and ensuring transparency
                    about how your data is handled. This Privacy Policy explains what information we collect,
                    how we use it, and your rights regarding your personal data.
                </p>

                <h2>1. Information We Collect</h2>
                <h3>1.1 Information You Provide</h3>
                <p>
                    When you use our contact form, you may voluntarily provide your name, email address, and
                    message content. We only collect this information when you choose to submit it.
                </p>

                <h3>1.2 Automatically Collected Information</h3>
                <p>We may automatically collect certain technical information when you visit our website:</p>
                <ul>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent on each page</li>
                    <li>Referring website or search engine</li>
                    <li>General geographic location (country/region level)</li>
                    <li>Device type (desktop, mobile, tablet)</li>
                </ul>
                <p>
                    This information is collected through analytics tools and is used to understand how
                    visitors interact with our website so we can improve the user experience.
                </p>

                <h3>1.3 Cookies and Similar Technologies</h3>
                <p>
                    We use cookies and similar tracking technologies to enhance your browsing experience.
                    For detailed information about the cookies we use of your choices regarding cookies,
                    please see our <a href="/cookie-policy">Cookie Policy</a>.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect for the following purposes:</p>
                <ul>
                    <li>To provide, maintain, and improve our website and game</li>
                    <li>To respond to your inquiries and support requests</li>
                    <li>To analyze website usage patterns and optimize performance</li>
                    <li>To detect and prevent technical issues or abuse</li>
                    <li>To serve relevant advertisements through third-party ad networks</li>
                    <li>To comply with legal obligations</li>
                </ul>

                <h2>3. Third-Party Services</h2>
                <h3>3.1 Google AdSense</h3>
                <p>
                    We use Google AdSense to display advertisements on our website. Google AdSense may use
                    cookies and web beacons to serve ads based on your prior visits to our website or other
                    websites. You can opt out of personalized advertising by visiting{' '}
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                        Google Ad Settings
                    </a>.
                </p>

                <h3>3.2 Google Analytics</h3>
                <p>
                    We use Google Analytics to understand how visitors interact with our website. Google
                    Analytics collects information such as how often users visit the site, what pages they
                    visit, and what other sites they used prior to coming to our site. You can opt out of
                    Google Analytics by installing the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                        Google Analytics Opt-out Browser Add-on
                    </a>.
                </p>

                <h2>4. Data Sharing</h2>
                <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share
                    data in the following limited circumstances:
                </p>
                <ul>
                    <li>With service providers who assist in operating our website (subject to confidentiality agreements)</li>
                    <li>If required by law, regulation, or legal process</li>
                    <li>To protect the rights, property, or safety of JigMerge, our users, or the public</li>
                </ul>

                <h2>5. Children&apos;s Privacy</h2>
                <p>
                    JigMerge is designed to be family-friendly. We do not knowingly collect personal
                    information from children under the age of 13. If you are a parent or guardian and
                    believe that your child has provided us with personal information, please{' '}
                    <a href="/contact">contact us</a> immediately so we can take appropriate action.
                </p>
                <p>
                    For more information about how we approach children&apos;s safety, please visit our{' '}
                    <a href="/parents">Parents & Safety</a> page.
                </p>

                <h2>6. Data Security</h2>
                <p>
                    We implement appropriate technical and organizational measures to protect your personal
                    data against unauthorized access, alteration, disclosure, or destruction. However, no
                    method of transmission over the Internet is 100% secure, and we cannot guarantee
                    absolute security.
                </p>

                <h2>7. Your Rights (GDPR / CCPA)</h2>
                <p>Depending on your location, you may have the following rights:</p>
                <ul>
                    <li><strong>Access:</strong> Request a copy of the personal data we hold about you</li>
                    <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                    <li><strong>Restriction:</strong> Request restriction of processing your data</li>
                    <li><strong>Portability:</strong> Request transfer of your data in a machine-readable format</li>
                    <li><strong>Objection:</strong> Object to processing of your data for certain purposes</li>
                </ul>
                <p>
                    To exercise any of these rights, please <a href="/contact">contact us</a>. We will
                    respond to your request within 30 days.
                </p>

                <h2>8. Data Retention</h2>
                <p>
                    We retain personal data only for as long as necessary to fulfill the purposes for which
                    it was collected, or as required by law. Analytics data is retained in aggregate form
                    and does not identify individual users.
                </p>

                <h2>9. International Data Transfers</h2>
                <p>
                    Your information may be transferred to and processed in countries other than your own.
                    These countries may have different data protection laws. We ensure appropriate safeguards
                    are in place to protect your data during such transfers.
                </p>

                <h2>10. Changes to This Policy</h2>
                <p>
                    We may update this Privacy Policy from time to time. We will notify you of any material
                    changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo;
                    date. We encourage you to review this Privacy Policy periodically.
                </p>

                <h2>11. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy or our data practices, please
                    contact us through our <a href="/contact">Contact page</a> or email us at{' '}
                    <strong>privacy@JigMerge.online</strong>.
                </p>
            </div>
        </>
    );
}
