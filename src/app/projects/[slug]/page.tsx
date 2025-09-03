import { notFound } from "next/navigation";
import { getProject, getAllProjects } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import fs from "fs";
import path from "path";

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

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
  // Resolve OpenGraph image path by checking which extension exists (.jpg or .png)
  const resolveOgImage = (coverImage: string): string => {
    // If extension already provided, use as-is
    if (coverImage.endsWith('.jpg') || coverImage.endsWith('.png')) {
      return `/projects/${coverImage}`;
    }
    const baseDir = path.join(process.cwd(), 'public', 'projects');
    const jpgPath = path.join(baseDir, `${coverImage}.jpg`);
    const pngPath = path.join(baseDir, `${coverImage}.png`);
    if (fs.existsSync(jpgPath)) return `/projects/${coverImage}.jpg`;
    if (fs.existsSync(pngPath)) return `/projects/${coverImage}.png`;
    // Fallback to .jpg to avoid undefined
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