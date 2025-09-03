import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://da-designinc.com"),
  title: {
    default: "DA+D Architecture & Design",
    template: "%s | DA+D"
  },
  description: "Since 2001, DeLoache Architecture & Design has been transforming visions into exceptional spaces where people live, work, and thrive. Specializing in innovative residential and commercial projects with sustainable design and fire mitigation expertise.",
  keywords: ["architecture", "design", "fire mitigation", "residential design", "commercial design", "sustainable design", "Scott DeLoache", "AIA", "Los Angeles architect"],
  authors: [{ name: "Scott DeLoache, AIA" }],
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
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

import { Providers } from "@/app/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
