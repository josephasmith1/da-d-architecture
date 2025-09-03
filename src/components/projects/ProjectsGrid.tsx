'use client';

import { Pagination } from "@heroui/react";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";

interface Project {
  slug: string;
  title: string;
  location: string;
  year: string;
  type: string;
  category: string;
  coverImage: string;
  size?: string;
  status?: string;
  services?: string[];
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9;
  
  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const selectedProjects = projects.slice(startIndex, startIndex + projectsPerPage);
  
  return (
    <div className="container mx-auto px-4 py-8">
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-default-500">No projects found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {selectedProjects.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination 
                total={totalPages}
                initialPage={1}
                page={currentPage}
                onChange={setCurrentPage}
                size="lg"
                variant="flat"
                showControls
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}