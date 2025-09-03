import { notFound } from "next/navigation";
import { getProject, getAllProjects } from "@/lib/projects";
import ProjectDetailClient from "./ProjectDetailClient";

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
  
  return {
    title: `${project.title} | DA+D Architecture`,
    description: project.description[0] || `${project.title} - ${project.category} project in ${project.location}`,
    openGraph: {
      title: project.title,
      description: project.description[0],
      images: [`/projects/${project.coverImage}.jpg`],
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