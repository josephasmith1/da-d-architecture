import { notFound } from "next/navigation";
import { getProject } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";

// Force dynamic rendering to avoid bundling large image files
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  
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

  return {
    title: `${project.title} | DA+D Architecture`,
    description: project.description[0] || `${project.title} - ${project.category} project in ${project.location}`,
    openGraph: {
      title: project.title,
      description: project.description[0],
      images: [resolveOgImage(project.coverImage)],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = await getProject(resolvedParams.slug);
  
  if (!project) {
    notFound();
  }
  
  return <ProjectDetailClient project={project} />;
}