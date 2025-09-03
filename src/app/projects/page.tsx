'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { useState, useEffect } from "react";

type Project = {
  slug: string;
  title: string;
  location: string;
  year: string;
  type: string;
  category: string;
  coverImage: string;
};

type Filters = {
  type: string;
  sortBy: string;
};
import { motion } from "framer-motion";

// Mock data - in a real app this would come from a data fetching solution
const mockProjects = [
  {
    slug: "beach-house",
    title: "Modern Beach House",
    location: "Malibu, CA",
    year: "2023",
    type: "Residential",
    category: "Residential",
    coverImage: "bel-air/Bel Air 1"
  },
  {
    slug: "hillside-residence",
    title: "Hillside Residence",
    location: "Los Angeles, CA",
    year: "2022",
    type: "Residential",
    category: "Residential",
    coverImage: "bel-air/Bel Air 2"
  },
  {
    slug: "urban-office",
    title: "Urban Office Complex",
    location: "Santa Monica, CA",
    year: "2021",
    type: "Commercial",
    category: "Commercial",
    coverImage: "bel-air/Bel Air 3"
  },
  {
    slug: "shia-project",
    title: "Shia Project",
    location: "Unknown Location",
    year: "2024",
    type: "Residential",
    category: "Residential",
    coverImage: "shia/Shia 1"
  },
  {
    slug: "marinelli-project",
    title: "Marinelli Project",
    location: "Unknown Location",
    year: "2024",
    type: "Commercial",
    category: "Commercial",
    coverImage: "marinelli/Marinelli render1"
  },
  {
    slug: "legend-project",
    title: "Legend Project",
    location: "Unknown Location",
    year: "2024",
    type: "Landscape",
    category: "Landscape",
    coverImage: "legend/Legend LGD Cam 1"
  },
  {
    slug: "markups-project",
    title: "Rendering Markups Project",
    location: "Unknown Location",
    year: "2024",
    type: "Interior",
    category: "Interior",
    coverImage: "markups/Markups Ariel1"
  }
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [filters, setFilters] = useState<Filters>({
    type: "all",
    sortBy: "newest"
  });
  
  useEffect(() => {
    // Simulate data fetching
    setProjects(mockProjects);
    setFilteredProjects(mockProjects);
  }, []);
  
  const handleFilterChange = (category: string) => {
    setFilters({
      ...filters,
      type: category
    });
    
    let result = [...projects];
    
    // Filter by type
    if (category !== "all") {
      result = result.filter(project => project.type === category);
    }
    
    // Sort projects
    if (filters.sortBy === "newest") {
      result.sort((a, b) => b.year.localeCompare(a.year));
    } else if (filters.sortBy === "oldest") {
      result.sort((a, b) => a.year.localeCompare(b.year));
    } else if (filters.sortBy === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredProjects(result);
  };
  
  const handleSortChange = (sortBy: string) => {
    setFilters({
      ...filters,
      sortBy
    });
    
    let result = [...projects];
    
    // Filter by type
    if (filters.type !== "all") {
      result = result.filter(project => project.type === filters.type);
    }
    
    // Sort projects
    if (sortBy === "newest") {
      result.sort((a, b) => b.year.localeCompare(a.year));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => a.year.localeCompare(b.year));
    } else if (sortBy === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    setFilteredProjects(result);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Section className="py-24 md:py-32">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="font-display text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Our Projects
            </motion.h1>
            <motion.p 
              className="text-xl max-w-2xl mx-auto text-foreground-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Explore our portfolio of architectural designs and completed projects.
            </motion.p>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <ProjectFilters 
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </motion.div>
        </Section>
        
        <Section>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <ProjectsGrid projects={filteredProjects} />
          </motion.div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
}
