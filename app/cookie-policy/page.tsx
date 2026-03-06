import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Learn about the cookies JigMerge uses, why we use them, and how to manage your cookie preferences.',
    keywords: ['JigMerge cookies', 'cookie policy', 'cookie preferences', 'tracking cookies'],
};

export default function CookiePolicyPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Cookie Policy</h1>
                    <p>Last updated: February 14, 2026</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    This Cookie Policy explains what cookies are, how JigMerge uses them, and how you can
                    control your cookie preferences. By continuing to use our website, you consent to the use
                    of cookies as described in this policy.
                </p>

                <h2>What Are Cookies?</h2>
                <p>
                    Cookies are small text files that are placed on your device (computer, smartphone, or
                    tablet) when you visit a website. They are widely used to make websites work efficiently
                    and provide information to the site owners. Cookies can be &ldquo;persistent&rdquo; (they remain on
                    your device until deleted) or &ldquo;session&rdquo; cookies (they are deleted when you close your browser).
                </p>

                <h2>How We Use Cookies</h2>
                <p>JigMerge uses cookies for the following purposes:</p>

                <h3>Essential Cookies</h3>
                <p>
                    These cookies are necessary for the website to function properly. They enable core
                    functionality such as page navigation and access to secure areas. The website cannot
                    function properly without these cookies.
                </p>
                <ul>
                    <li><strong>Session management:</strong> Maintaining your browsing session as you navigate between pages</li>
                    <li><strong>Security:</strong> Helping protect against cross-site request forgery and other security threats</li>
                </ul>

                <h3>Analytics Cookies</h3>
                <p>
                    We use analytics cookies (such as Google Analytics) to understand how visitors interact
                    with our website. These cookies help us identify areas for improvement and measure the
                    effectiveness of our content.
                </p>
                <ul>
                    <li><strong>Google Analytics (_ga, _gid):</strong> Tracks page views, user sessions, and browsing patterns. Data is anonymized and aggregated.</li>
                    <li><strong>Performance cookies:</strong> Help us understand load times and identify technical issues.</li>
                </ul>

                <h3>Advertising Cookies</h3>
                <p>
                    Our advertising partner, Google AdSense, uses cookies to serve relevant advertisements.
                    These cookies may track your browsing activity across different websites to build a
                    profile for ad targeting.
                </p>
                <ul>
                    <li><strong>Google AdSense cookies:</strong> Used to serve ads and measure ad performance</li>
                    <li><strong>DoubleClick (DSID, IDE):</strong> Used for ad serving and retargeting across the Google Display Network</li>
                </ul>

                <h3>Preference Cookies</h3>
                <p>
                    These cookies remember choices you make on the website, such as your preferred game
                    category or sound settings, to provide a more personalized experience.
                </p>

                <h2>Third-Party Cookies</h2>
                <p>
                    Some cookies are set by third-party services that appear on our pages. We do not control
                    the cookies set by third parties. The main third-party services we use include:
                </p>
                <ul>
                    <li><strong>Google Analytics:</strong> Web analytics service. <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google&apos;s Cookie Policy</a></li>
                    <li><strong>Google AdSense:</strong> Advertising service. <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google&apos;s Ad Technology Policy</a></li>
                </ul>

                <h2>Managing Your Cookie Preferences</h2>
                <p>
                    You can control and manage cookies in several ways. Please note that removing or blocking
                    cookies may impact your user experience and parts of the website may no longer be fully
                    accessible.
                </p>

                <h3>Browser Settings</h3>
                <p>
                    Most browsers allow you to control cookies through their settings. You can typically
                    find these in the &ldquo;Options&rdquo; or &ldquo;Preferences&rdquo; menu of your browser. Here are links
                    to cookie management guides for common browsers:
                </p>
                <ul>
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer">Apple Safari</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
                </ul>

                <h3>Opt-Out of Google Analytics</h3>
                <p>
                    You can opt out of Google Analytics by installing the{' '}
                    <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                        Google Analytics Opt-out Browser Add-on
                    </a>.
                </p>

                <h3>Opt-Out of Personalized Ads</h3>
                <p>
                    You can opt out of personalized advertising by visiting{' '}
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                        Google Ad Settings
                    </a>{' '}
                    or the{' '}
                    <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">
                        Network Advertising Initiative opt-out page
                    </a>.
                </p>

                <h2>Updates to This Policy</h2>
                <p>
                    We may update this Cookie Policy from time to time to reflect changes in our practices
                    or for legal, operational, or regulatory reasons. The &ldquo;Last updated&rdquo; date at the top
                    of this page indicates when the policy was last revised.
                </p>

                <h2>Contact Us</h2>
                <p>
                    If you have any questions about our use of cookies, please <a href="/contact">contact us</a>{' '}
                    or email <strong>privacy@JigMerge.online</strong>.
                </p>
            </div>
        </>
    );
}
