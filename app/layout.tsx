import type { Metadata } from "next";
import Script from 'next/script';
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "JigMerge – Free Online Jigsaw Solitaire Puzzle Game",
    template: "%s | JigMerge",
  },
  description:
    "JigMerge online! A unique blend of jigsaw puzzle and solitaire card game. Drag, drop, and swap tiles to restore beautiful images across 25+ levels in 5 categories.",
  keywords: [
    "JigMerge",
    "jigsaw puzzle",
    "solitaire puzzle",
    "online puzzle game",
    "free puzzle game",
    "brain games",
    "tile swap puzzle",
    "jigsaw solitaire",
    "puzzle categories",
    "drag and drop puzzle",
  ],
  authors: [{ name: "JigMerge Team" }],
  creator: "JigMerge",
  publisher: "JigMerge",
  metadataBase: new URL("https://JigMerge.online"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "JigMerge",
    title: "JigMerge – Free Online Jigsaw Solitaire Puzzle Game",
    description:
      "JigMerge online! Drag, drop, and swap tiles to restore beautiful images. 25+ levels across 5 categories.",
    url: "https://JigMerge.online",
  },
  twitter: {
    card: "summary_large_image",
    title: "JigMerge – Free Online Jigsaw Solitaire Puzzle Game",
    description:
      "A unique blend of jigsaw puzzle and solitaire. Play free online with 25+ levels!",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

function getPublisherId() {
  const raw = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
  if (!raw) return '';
  return raw.startsWith('ca-pub-') ? raw : `ca-pub-${raw}`;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const publisherId = getPublisherId();

  return (
    <html lang="en">
      <head>
        {publisherId ? (
          <Script
            id="adsense-script"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "JigMerge",
              url: "https://JigMerge.online",
              description:
                "Free online jigsaw solitaire puzzle game with 25+ levels across 5 categories.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://JigMerge.online/categories?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
