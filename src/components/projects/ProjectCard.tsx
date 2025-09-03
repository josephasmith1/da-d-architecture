'use client';

import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ResponsiveImage } from "../common/ResponsiveImage";

type Project = {
  slug: string;
  title: string;
  coverImage: string;
  category: string;
  year: string;
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card 
        isPressable 
        isHoverable
        className="border-0 bg-background/60 backdrop-blur-md perspective-1000"
        onPress={() => router.push(`/projects/${project.slug}`)}
      >
        <CardBody className="p-0 overflow-hidden">
          <ResponsiveImage
            name={project.coverImage}
            alt={project.title}
            className="object-cover scale-100 hover:scale-105 transition-transform rotate-x-6 rotate-y-6"
          />
        </CardBody>
        <CardFooter className="flex-col items-start">
          <div className="font-display text-lg">{project.title}</div>
          <div className="flex gap-2 mt-2">
            <Chip size="sm" variant="flat">{project.category}</Chip>
            <Chip size="sm" variant="flat">{project.year}</Chip>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
