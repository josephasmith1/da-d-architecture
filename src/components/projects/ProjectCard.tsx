'use client';

import { Card, CardBody, CardFooter, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import blurPlaceholders from '@/lib/blur-placeholders.json';

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

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter();
  
  // Construct the full image path
  const imagePath = `/projects/${project.coverImage}`;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
    >
      <Card 
        isPressable 
        isHoverable
        className="bg-content1 border-1 border-divider h-full"
        onPress={() => router.push(`/projects/${project.slug}`)}
      >
        <CardBody className="p-0 overflow-hidden aspect-[4/3] relative">
          <Image
            src={imagePath}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover hover:scale-105 transition-transform duration-300"
            priority={index < 6}
            loading={index < 6 ? 'eager' : 'lazy'}
            placeholder={blurPlaceholders[imagePath as keyof typeof blurPlaceholders] ? 'blur' : 'empty'}
            blurDataURL={blurPlaceholders[imagePath as keyof typeof blurPlaceholders]}
            quality={85}
          />
        </CardBody>
        <CardFooter className="flex-col items-start gap-3 p-5">
          <div className="w-full">
            <h3 className="font-display text-xl font-semibold mb-1">{project.title}</h3>
            <p className="text-sm text-default-500">{project.location}</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Chip size="sm" variant="flat" className="bg-default-100">
              {project.category}
            </Chip>
            <Chip size="sm" variant="flat" className="bg-default-100">
              {project.year}
            </Chip>
            {project.status && (
              <Chip 
                size="sm" 
                variant="flat" 
                className={project.status === "Completed" ? "bg-success-50 text-success-700" : "bg-warning-50 text-warning-700"}
              >
                {project.status}
              </Chip>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}