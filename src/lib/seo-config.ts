export const seoConfig = {
  siteName: "DA+D Architecture & Design",
  siteUrl: "https://da-designinc.com",
  siteDescription: "Since 2001, DeLoache Architecture & Design has been transforming visions into exceptional spaces where people live, work, and thrive. Specializing in innovative residential and commercial projects with sustainable design and fire mitigation expertise.",
  author: "Scott DeLoache, AIA",
  twitterHandle: "@DADArchitecture",
  
  defaultKeywords: [
    "architecture firm Los Angeles",
    "Scott DeLoache AIA",
    "sustainable architecture",
    "fire mitigation design",
    "residential architect",
    "commercial architect",
    "custom home design",
    "modern architecture",
    "green building design",
    "LEED certified architect",
    "California architect",
    "architectural planning",
    "interior design",
    "DA+D Architecture"
  ],
  
  business: {
    name: "DeLoache Architecture & Design",
    legalName: "DeLoache Architecture & Design, Inc.",
    alternateName: "DA+D",
    telephone: "+1-310-555-0100",
    email: "info@da-designinc.com",
    address: {
      streetAddress: "123 Main Street",
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90001",
      addressCountry: "US"
    },
    geo: {
      latitude: 34.0522,
      longitude: -118.2437
    },
    openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00",
    priceRange: "$$$",
    areaServed: ["Los Angeles", "Orange County", "Ventura County", "Southern California"],
    sameAs: [
      "https://www.linkedin.com/company/da-d-architecture",
      "https://www.instagram.com/dad_architecture",
      "https://www.houzz.com/pro/dad-architecture"
    ]
  },
  
  services: [
    {
      name: "Residential Architecture",
      description: "Custom home design and renovation services"
    },
    {
      name: "Commercial Architecture",
      description: "Commercial building design and planning"
    },
    {
      name: "Fire Mitigation Design",
      description: "Specialized fire-resistant architectural solutions"
    },
    {
      name: "Sustainable Design",
      description: "LEED certified green building design"
    },
    {
      name: "Interior Design",
      description: "Complete interior design and space planning"
    }
  ]
};

export function generatePageMetadata(page: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
}) {
  const title = page.title 
    ? `${page.title} | ${seoConfig.siteName}`
    : seoConfig.siteName;
    
  const description = page.description || seoConfig.siteDescription;
  const keywords = page.keywords 
    ? [...seoConfig.defaultKeywords, ...page.keywords]
    : seoConfig.defaultKeywords;
  const url = page.path 
    ? `${seoConfig.siteUrl}${page.path}`
    : seoConfig.siteUrl;
  const image = page.image || "/og-image.jpg";
  
  return {
    title,
    description,
    keywords: keywords.join(", "),
    openGraph: {
      title,
      description,
      url,
      images: [{ url: `${seoConfig.siteUrl}${image}` }],
    },
    twitter: {
      title,
      description,
      images: [`${seoConfig.siteUrl}${image}`],
    },
    alternates: {
      canonical: url,
    },
  };
}