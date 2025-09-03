'use client';

import { Tabs, Tab, Select, SelectItem } from "@heroui/react";
import { useState, useEffect } from "react";
import { ProjectsGrid } from "./ProjectsGrid";

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

interface ProjectFiltersProps {
  projects: Project[];
}

export function ProjectFilters({ projects }: ProjectFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("recent");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  
  // Get unique categories from projects
  const categories = [
    { key: "all", label: "All" },
    ...Array.from(new Set(projects.map(p => p.category)))
      .map(cat => ({ key: cat, label: cat }))
  ];
  
  const sortOptions = [
    { key: "recent", label: "Most Recent" },
    { key: "oldest", label: "Oldest First" },
    { key: "az", label: "A-Z" },
    { key: "za", label: "Z-A" }
  ];
  
  useEffect(() => {
    let result = [...projects];
    
    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter(project => project.category === selectedCategory);
    }
    
    // Sort projects
    switch (selectedSort) {
      case "recent":
        result.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        break;
      case "oldest":
        result.sort((a, b) => parseInt(a.year) - parseInt(b.year));
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "za":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    
    setFilteredProjects(result);
  }, [selectedCategory, selectedSort, projects]);
  
  return (
    <>
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Tabs 
          aria-label="Project categories" 
          selectedKey={selectedCategory}
          onSelectionChange={(key) => setSelectedCategory(key as string)}
          variant="underlined"
          size="lg"
        >
          {categories.map((category) => (
            <Tab key={category.key} title={category.label} />
          ))}
        </Tabs>
        
        <Select 
          label="Sort by"
          className="max-w-xs"
          variant="bordered"
          size="md"
          disallowEmptySelection
          selectedKeys={new Set([selectedSort])}
          onSelectionChange={(keys) => setSelectedSort(Array.from(keys)[0] as string)}
        >
          {sortOptions.map((option) => (
            <SelectItem key={option.key}>
              {option.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      
      <ProjectsGrid projects={filteredProjects} />
    </>
  );
}