import { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { seoConfig } from "@/lib/seo-config";
import FAQClient from "./FAQClient";
import faqData from "@/content/faq.json";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | DA+D Architecture",
  description: "Find answers to common questions about our architecture services, design process, fire mitigation expertise, and project timelines at DA+D Architecture.",
  keywords: [
    "architecture FAQ",
    "design questions",
    "fire mitigation FAQ",
    "architect services",
    "building design process",
    "construction timeline",
    "LEED certification questions",
    "sustainable design FAQ",
    ...seoConfig.defaultKeywords
  ].join(", "),
  openGraph: {
    title: "FAQ - DA+D Architecture & Design",
    description: "Get answers to your architecture and design questions. Learn about our process, services, and expertise.",
    type: "website",
    url: `${seoConfig.siteUrl}/faq`,
    siteName: seoConfig.siteName,
    locale: "en_US",
    images: [{
      url: `${seoConfig.siteUrl}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: "DA+D Architecture FAQ"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ - DA+D Architecture",
    description: "Get answers to your architecture and design questions.",
    images: [`${seoConfig.siteUrl}/og-image.jpg`],
    creator: seoConfig.twitterHandle
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/faq`
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    }
  }
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <Section>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Find answers to common questions about our services, process, and expertise.
          </p>
        </div>
        
        <FAQClient faqData={faqData} />
      </Section>

      <Footer />
    </div>
  );
}