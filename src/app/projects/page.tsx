import { getAllProjectsStatic } from "@/lib/projects-static";
import ProjectsPageClient from "@/components/projects/ProjectsPageClient";

export default async function ProjectsPage() {
  const projects = getAllProjectsStatic();
  
  return <ProjectsPageClient projects={projects} />;
}