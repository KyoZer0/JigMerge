import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'Learn how JigMerge uses cookies and browser storage, including third-party ad technologies and local gameplay storage.',
    keywords: ['JigMerge cookies', 'cookie policy', 'browser storage', 'ad cookies'],
    alternates: {
        canonical: '/cookie-policy',
    },
};

export default function CookiePolicyPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Cookie Policy</h1>
                    <p>Last updated: March 11, 2026</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    This page explains how JigMerge uses cookies and similar browser-side technologies. We include
                    both traditional cookies and local browser storage here because, from a visitor&apos;s perspective,
                    they are often part of the same privacy question: what information is stored in the browser and why?
                </p>

                <h2>1. What Cookies Are</h2>
                <p>
                    Cookies are small text files that websites or third-party services place in your browser. Some
                    cookies are essential for delivering content or maintaining service functionality. Others are used
                    for advertising, measurement, or personalization.
                </p>

                <h2>2. What Browser Storage Is</h2>
                <p>
                    Browser storage, including localStorage, lets a site remember simple information on your device.
                    In JigMerge, this can be used for lightweight gameplay state such as local progress, selected mode,
                    or interface preferences. Unlike account-based storage, this information stays in your browser
                    unless you clear it.
                </p>

                <h2>3. How JigMerge Uses These Technologies</h2>
                <p>JigMerge currently uses or may rely on the following categories:</p>

                <h3>Local gameplay storage</h3>
                <p>
                    The current game stores limited local preferences and gameplay progress in your browser so the
                    experience can remember things like your last played puzzle or selected options on that device.
                    This is functional browser storage tied to the local device and browser.
                </p>

                <h3>Site delivery and security technologies</h3>
                <p>
                    Hosting and infrastructure providers may use technical mechanisms necessary to deliver pages,
                    improve reliability, and protect against abuse. These may vary depending on deployment and browser
                    behavior.
                </p>

                <h3>Advertising technologies</h3>
                <p>
                    If ads are shown on the site, third-party providers such as Google AdSense may use cookies or
                    similar technologies to serve, limit, measure, or personalize advertisements in accordance with
                    their own policies and applicable law.
                </p>

                <h2>4. What We Do Not Currently Claim to Use</h2>
                <p>
                    We do not currently state that JigMerge runs Google Analytics on the site. If analytics tooling is
                    added in the future, this Cookie Policy and the Privacy Policy will be updated accordingly.
                </p>

                <h2>5. Managing Cookies and Browser Storage</h2>
                <p>
                    You can control cookies and local storage through your browser settings. Keep in mind that blocking
                    or clearing storage may affect parts of the site, including saved local game preferences,
                    progress, or ad preferences.
                </p>
                <ul>
                    <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome cookie settings</a></li>
                    <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox cookie settings</a></li>
                    <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471" target="_blank" rel="noopener noreferrer">Apple Safari cookie settings</a></li>
                    <li><a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge cookie settings</a></li>
                </ul>

                <h2>6. Google Ad Controls</h2>
                <p>
                    If Google advertising is active on the site, you can learn more or manage certain ad preferences
                    through Google&apos;s own tools, including{' '}
                    <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                        Google Ad Settings
                    </a>{' '}
                    and Google&apos;s{' '}
                    <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
                        advertising technology information
                    </a>.
                </p>

                <h2>7. Changes to This Policy</h2>
                <p>
                    We may revise this page if the game changes, if we add or remove service providers, or if legal
                    requirements change. When we do, we will update the date at the top of the page.
                </p>

                <h2>8. Contact</h2>
                <p>
                    Questions about cookies or browser storage can be sent through the{' '}
                    <a href="/contact">Contact page</a> or to <strong>privacy@jigmerge.com</strong>.
                </p>
            </div>
        </>
    );
}
