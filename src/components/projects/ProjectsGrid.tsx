'use client';

import { Pagination } from "@heroui/react";
import { useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/project";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const selectedProjects = projects.slice(startIndex, startIndex + projectsPerPage);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="@container">
        <div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6 mb-8">
          {selectedProjects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
      {totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination 
            total={totalPages}
            initialPage={1}
            page={currentPage}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
