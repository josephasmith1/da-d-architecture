import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getProjectBySlug, getProjectSlugs } from "@/lib/projects-static";
import dynamic from "next/dynamic";
import { seoConfig } from "@/lib/seo-config";

// Dynamic import with loading state for better code splitting
const ProjectDetailClient = dynamic(() => import("./ProjectDetailClient"), {
  loading: () => <div className="min-h-screen bg-background animate-pulse" />,
});

// Generate static params for all projects
export async function generateStaticParams() {
  const slugs = getProjectSlugs();
  return slugs.map(slug => ({ slug }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }
  
  // Simple resolution without file system access
  const resolveOgImage = (coverImage: string): string => {
    // If extension already provided, use as-is
    if (coverImage.endsWith('.jpg') || coverImage.endsWith('.png')) {
      return `/projects/${coverImage}`;
    }
    // Default to .jpg extension
    return `/projects/${coverImage}.jpg`;
  };
  
  const pageUrl = `${seoConfig.siteUrl}/projects/${project.slug}`;
  const imageUrl = `${seoConfig.siteUrl}${resolveOgImage(project.coverImage)}`;
  const keywords = [
    project.category,
    project.location,
    ...project.services,
    "architecture project",
    "design portfolio",
    project.year ? `${project.year} architecture` : "",
    seoConfig.author
  ].filter(Boolean);

  return {
    title: `${project.title} | ${project.category} Architecture Project | DA+D`,
    description: project.description[0] || `${project.title} - Award-winning ${project.category} project in ${project.location} by DA+D Architecture. ${project.size ? `${project.size}.` : ''} Completed ${project.year || 'recently'}.`,
    keywords: keywords.join(", "),
    authors: [{ name: seoConfig.author }],
    creator: seoConfig.business.name,
    publisher: seoConfig.business.name,
    openGraph: {
      type: "article",
      title: `${project.title} - ${project.category} Architecture`,
      description: project.description[0],
      url: pageUrl,
      siteName: seoConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - Architecture Project by DA+D`,
        }
      ],
      locale: "en_US",
      publishedTime: project.year ? `${project.year}-01-01` : undefined,
      authors: [seoConfig.author],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | DA+D Architecture`,
      description: project.description[0],
      images: [imageUrl],
      creator: seoConfig.twitterHandle,
    },
    alternates: {
      canonical: pageUrl,
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
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = getProjectBySlug(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetailClient project={project} />;
}