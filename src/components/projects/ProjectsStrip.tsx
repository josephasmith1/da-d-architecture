'use client';

import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ResponsiveImage } from "../common/ResponsiveImage";

type Project = {
  slug: string;
  title: string;
  coverImage: string;
};

export function ProjectsStrip({ projects }: { projects: Project[] }) {
  const router = useRouter();
  
  // Duplicate projects to create infinite scroll effect
  const duplicatedProjects = [...projects, ...projects, ...projects];
  
  return (
    <div className="overflow-hidden py-8">
      <motion.div 
        className="flex gap-6"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {duplicatedProjects.map((project, index) => (
          <motion.div
            key={`${project.slug}-${index}`}
            whileHover={{ scale: 1.05 }}
            className="flex-shrink-0 w-80 cursor-pointer"
            onClick={() => router.push(`/projects/${project.slug}`)}
          >
            <Card className="border-0 bg-linear-to-b from-background/60 to-background/90 backdrop-blur-md">
              <CardBody className="p-0 overflow-hidden">
                <ResponsiveImage
                  name={project.coverImage}
                  alt={project.title}
                  className="object-cover"
                />
              </CardBody>
              <div className="absolute bottom-4 left-4">
                <div className="font-display text-white text-lg bg-black/50 px-3 py-1 rounded-lg">
                  {project.title}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
