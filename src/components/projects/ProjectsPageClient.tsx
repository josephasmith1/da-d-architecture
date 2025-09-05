'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/lib/projects-static";
import Link from "next/link";
import Image from "next/image";

// Separate component for each project section
function ProjectSection({ project, index }: { project: Project; index: number }) {
  const sectionRef = useRef(null);
  
  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Create parallax effect for each image
  const yImage = useTransform(sectionScroll, [0, 1], ["0%", "20%"]);
  const scale = useTransform(sectionScroll, [0, 0.5, 1], [1.2, 1, 1.2]);
  
  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full group cursor-pointer">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: yImage, scale }}
        >
          <Image
            src={`/projects/${project.coverImage}`}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority={index < 2}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </motion.div>
        
        {/* Project info overlay */}
        <div className="relative h-full flex items-end">
          <motion.div 
            className="w-full p-8 md:p-16 lg:p-24 pb-12 md:pb-20"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/70 text-sm uppercase tracking-wider">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="h-px bg-white/30 w-12"></div>
                <span className="text-white/70 text-sm uppercase tracking-wider">
                  {project.category}
                </span>
              </div>
              
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                {project.title}
              </h2>
              
              <div className="flex items-center gap-6 text-white/80">
                <span className="text-lg">{project.location}</span>
                <span className="text-white/40">•</span>
                <span className="text-lg">{project.year}</span>
              </div>
              
              <motion.div 
                className="mt-8 inline-block"
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <span className="text-white flex items-center gap-2 text-lg group-hover:gap-4 transition-all">
                  View Project
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Link>
    </section>
  );
}

export default function ProjectsPageClient({ projects }: { projects: Project[] }) {
  const { scrollYProgress } = useScroll();
  const strokeDashoffset = useTransform(scrollYProgress, [0, 1], [175.93, 0]);
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      
      {/* Full-screen project showcase with header compensation */}
      <div className="relative" style={{ marginTop: '-1px' }}>
        {projects.map((project, index) => (
          <ProjectSection key={project.slug} project={project} index={index} />
        ))}</div>
      
      {/* Footer */}
      <section className="relative bg-background">
        <Footer />
      </section>
      
      {/* Progress indicator */}
      <motion.div 
        className="fixed bottom-8 right-8 w-16 h-16 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-16 h-16 -rotate-90">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-white/20"
          />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-white"
            strokeDasharray={175.93}
            style={{
              strokeDashoffset,
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}