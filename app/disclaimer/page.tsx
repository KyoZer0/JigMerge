import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Read the JigMerge disclaimer regarding website content accuracy, external links, and general use of our free online puzzle game.',
    keywords: ['JigMerge disclaimer', 'website disclaimer', 'legal disclaimer'],
};

export default function DisclaimerPage() {
    return (
        <>
            <div className="page-header">
                <div className="container">
                    <h1 className="gradient-text">Disclaimer</h1>
                    <p>Last updated: February 14, 2026</p>
                </div>
            </div>

            <div className="page-content">
                <p>
                    The information provided by JigMerge (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) on JigMerge.online
                    (the &ldquo;Site&rdquo;) is for general informational purposes only. All information on the Site
                    is provided in good faith; however, we make no representation or warranty of any kind,
                    express or implied, regarding the accuracy, adequacy, validity, reliability,
                    availability, or completeness of any information on the Site.
                </p>

                <h2>Game Disclaimer</h2>
                <p>
                    JigMerge is a browser-based entertainment product provided free of charge. The game
                    is offered &ldquo;as is&rdquo; without any guarantees of performance, uptime, or compatibility with
                    all devices and browsers. While we strive to maintain a smooth experience, we cannot
                    guarantee uninterrupted service or the absence of technical issues.
                </p>

                <h2>No Professional Advice</h2>
                <p>
                    The Site may contain articles about cognitive benefits of puzzles, educational value for
                    children, and similar topics. This content is for informational and entertainment purposes
                    only and should not be construed as professional medical, educational, or psychological
                    advice. Always consult with qualified professionals for health, educational, or
                    developmental concerns.
                </p>

                <h2>External Links Disclaimer</h2>
                <p>
                    The Site may contain (or you may be sent through the Site) links to other websites or
                    content belonging to or originating from third parties, or links to websites and
                    features in banners or other advertising. Such external links are not investigated,
                    monitored, or checked for accuracy, adequacy, validity, reliability, availability,
                    or completeness by us.
                </p>
                <p>
                    We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or
                    reliability of any information offered by third-party websites linked through the Site
                    or any website or feature linked in any banner or other advertising. We will not be a
                    party to or in any way be responsible for monitoring any transaction between you and
                    third-party providers of products or services.
                </p>

                <h2>Advertising Disclaimer</h2>
                <p>
                    JigMerge displays third-party advertisements (including Google AdSense ads) to
                    support the free operation of the Site. We do not control the content of these
                    advertisements and are not responsible for any claims, representations, or promotions
                    made by advertisers. The presence of an advertisement on our Site does not constitute
                    an endorsement or recommendation by JigMerge.
                </p>

                <h2>Fair Use Disclaimer</h2>
                <p>
                    The Site may also contain copyrighted material, the use of which may not always have
                    been specifically authorized by the copyright owner. We believe this constitutes
                    &ldquo;fair use&rdquo; as provided for in applicable copyright law. If you wish to use
                    copyrighted material from the Site for purposes of your own that go beyond &ldquo;fair use,&rdquo;
                    you must obtain permission from the copyright owner.
                </p>

                <h2>Errors and Omissions Disclaimer</h2>
                <p>
                    While we have made every attempt to ensure that the information contained in this Site
                    has been obtained from reliable sources, JigMerge is not responsible for any errors
                    or omissions, or for the results obtained from the use of this information. All
                    information on the Site is provided &ldquo;as is,&rdquo; with no guarantee of completeness,
                    accuracy, timeliness, or of the results obtained from the use of this information.
                </p>

                <h2>Contact</h2>
                <p>
                    If you have questions or concerns about this Disclaimer, please visit our{' '}
                    <a href="/contact">Contact page</a>.
                </p>
            </div>
        </>
    );
}
