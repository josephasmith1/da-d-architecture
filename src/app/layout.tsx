import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
});

const calSans = localFont({
  src: [
    {
      path: '../../node_modules/cal-sans/fonts/webfonts/CalSans-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-cal-sans',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://da-designinc.com"),
  title: {
    default: "DA+D Architecture & Design",
    template: "%s | DA+D"
  },
  description: "Since 2001, DeLoache Architecture & Design has been transforming visions into exceptional spaces where people live, work, and thrive. Specializing in innovative residential and commercial projects with sustainable design and fire mitigation expertise.",
  keywords: ["architecture", "design", "fire mitigation", "residential design", "commercial design", "sustainable design", "Scott DeLoache", "AIA", "LEED GA", "NCARB", "Los Angeles architect"],
  authors: [{ name: "Scott DeLoache, AIA, LEED GA, NCARB" }],
  creator: "DA+D Architecture & Design",
  publisher: "DA+D Architecture & Design",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://da-designinc.com",
    title: "DA+D Architecture & Design",
    description: "Since 2001, DeLoache Architecture & Design has been transforming visions into exceptional spaces where people live, work, and thrive.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DA+D Architecture & Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DA+D Architecture & Design",
    description: "Since 2001, DeLoache Architecture & Design has been transforming visions into exceptional spaces where people live, work, and thrive.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/apple-touch-icon-60x60.png", sizes: "60x60" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#000000" },
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DA+D Architecture",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
    "msapplication-TileImage": "/mstile-144x144.png",
  },
};

import { Providers } from "@/app/providers";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/structured-data";
import { WebVitals } from "@/components/seo/WebVitals";
import { ResourceHints } from "@/components/seo/ResourceHints";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  
  return (
    <html lang="en" className={`${inter.variable} ${calSans.variable}`} suppressHydrationWarning>
      <head>
        <ResourceHints />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <WebVitals />
          {children}
        </Providers>
      </body>
    </html>
  );
}
