import { seoConfig } from "./seo-config";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ArchitecturalFirm",
    "@id": `${seoConfig.siteUrl}#organization`,
    name: seoConfig.business.name,
    legalName: seoConfig.business.legalName,
    alternateName: seoConfig.business.alternateName,
    url: seoConfig.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${seoConfig.siteUrl}/logo.png`,
      width: 600,
      height: 60
    },
    image: `${seoConfig.siteUrl}/og-image.jpg`,
    description: seoConfig.siteDescription,
    telephone: seoConfig.business.telephone,
    email: seoConfig.business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: seoConfig.business.address.streetAddress,
      addressLocality: seoConfig.business.address.addressLocality,
      addressRegion: seoConfig.business.address.addressRegion,
      postalCode: seoConfig.business.address.postalCode,
      addressCountry: seoConfig.business.address.addressCountry
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: seoConfig.business.geo.latitude,
      longitude: seoConfig.business.geo.longitude
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    },
    priceRange: seoConfig.business.priceRange,
    areaServed: seoConfig.business.areaServed.map(area => ({
      "@type": "City",
      name: area
    })),
    sameAs: seoConfig.business.sameAs,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Architecture Services",
      itemListElement: seoConfig.services.map((service, index) => ({
        "@type": "Offer",
        "@id": `${seoConfig.siteUrl}#service-${index + 1}`,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description
        }
      }))
    },
    founder: {
      "@type": "Person",
      name: seoConfig.author,
      jobTitle: "Principal Architect",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Architecture School"
      }
    },
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 10,
      unitText: "employees"
    },
    foundingDate: "2001-01-01",
    slogan: "Transforming visions into exceptional spaces",
    knowsAbout: [
      "Architecture",
      "Sustainable Design",
      "Fire Mitigation",
      "LEED Certification",
      "Building Design",
      "Interior Design"
    ]
  };
}

interface WebPageSchemaProps {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function generateWebPageSchema(page: WebPageSchemaProps) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${seoConfig.siteUrl}${page.path}#webpage`,
    url: `${seoConfig.siteUrl}${page.path}`,
    name: page.title,
    description: page.description,
    isPartOf: {
      "@id": `${seoConfig.siteUrl}#website`
    },
    about: {
      "@id": `${seoConfig.siteUrl}#organization`
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${seoConfig.siteUrl}/og-image.jpg`
    },
    datePublished: page.datePublished || "2024-01-01",
    dateModified: page.dateModified || new Date().toISOString()
  };
  
  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      "@id": `${seoConfig.siteUrl}${page.path}#breadcrumb`,
      itemListElement: page.breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }
  
  return schema;
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${seoConfig.siteUrl}#website`,
    url: seoConfig.siteUrl,
    name: seoConfig.siteName,
    description: seoConfig.siteDescription,
    publisher: {
      "@id": `${seoConfig.siteUrl}#organization`
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${seoConfig.siteUrl}/projects?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    inLanguage: "en-US"
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  slug: string;
  images: string[];
  location?: string;
  projectType?: string;
  year?: number;
  client?: string;
  size?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${seoConfig.siteUrl}/projects/${project.slug}#project`,
    name: project.title,
    description: project.description,
    url: `${seoConfig.siteUrl}/projects/${project.slug}`,
    creator: {
      "@id": `${seoConfig.siteUrl}#organization`
    },
    dateCreated: project.year ? `${project.year}-01-01` : undefined,
    locationCreated: project.location ? {
      "@type": "Place",
      name: project.location
    } : undefined,
    image: project.images.map(img => `${seoConfig.siteUrl}/projects/${project.slug}/${img}`),
    keywords: [
      project.projectType,
      "architecture",
      "design",
      project.location
    ].filter(Boolean).join(", "),
    about: {
      "@type": "ArchitecturalStructure",
      name: project.title,
      description: project.description
    }
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${seoConfig.siteUrl}/faq#faqpage`,
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function generatePersonSchema(person: {
  name: string;
  role: string;
  bio?: string;
  image?: string;
  email?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    description: person.bio,
    image: person.image ? `${seoConfig.siteUrl}${person.image}` : undefined,
    email: person.email,
    worksFor: {
      "@id": `${seoConfig.siteUrl}#organization`
    }
  };
}

export function generateServiceSchema(service: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: service.url,
    provider: {
      "@id": `${seoConfig.siteUrl}#organization`
    },
    areaServed: seoConfig.business.areaServed,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name
    }
  };
}