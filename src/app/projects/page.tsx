'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Import all project JSON files
import marinelliProject from "@/content/projects/marinelli.json";
import shiaProject from "@/content/projects/shia.json";
import legendProject from "@/content/projects/legend.json";
import markupsProject from "@/content/projects/markups.json";
import beachHouseProject from "@/content/projects/beach-house.json";
import hillsideProject from "@/content/projects/hillside-residence.json";
import urbanOfficeProject from "@/content/projects/urban-office.json";

// Transform project data
const allProjects = [
  marinelliProject,
  shiaProject,
  legendProject,
  markupsProject,
  beachHouseProject,
  hillsideProject,
  urbanOfficeProject
].map(project => ({
  slug: project.slug,
  title: project.title,
  location: project.location,
  year: project.year,
  category: project.category,
  coverImage: project.coverImage.endsWith('.jpg') ? project.coverImage : `${project.coverImage}.jpg`,
  size: project.size,
  status: project.status,
  services: project.services
}));

export default function ProjectsPage() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  return (
    <div className="bg-black text-white" ref={containerRef}>
      <Header />
      
      {/* Full-screen project showcase */}
      {allProjects.map((project, index) => {
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
            key={project.slug} 
            ref={sectionRef}
            className="relative h-screen overflow-hidden"
          >
            <Link href={`/projects/${project.slug}`}>
              <div className="relative h-full group cursor-pointer">
                {/* Parallax Image Background */}
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
                    quality={90}
                  />
                </motion.div>
                
                {/* Gradient overlays for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-700" />
                
                {/* Project Information - Bold Typography */}
                <div className="absolute inset-0 flex items-end">
                  <motion.div 
                    className="p-8 md:p-16 lg:p-24 w-full"
                    initial={{ opacity: 0, y: 100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-200px" }}
                  >
                    {/* Project Number */}
                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-white/50 font-mono text-sm md:text-base">
                        {String(index + 1).padStart(2, '0')} / {String(allProjects.length).padStart(2, '0')}
                      </span>
                    </motion.div>
                    
                    {/* Project Title - Extra Bold */}
                    <motion.h2 
                      className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-4 tracking-tight leading-none"
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {project.title.toUpperCase()}
                    </motion.h2>
                    
                    {/* Project Details */}
                    <motion.div 
                      className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <p className="text-white/80 text-lg md:text-xl lg:text-2xl">
                        {project.location}
                      </p>
                      <div className="flex gap-4 items-center">
                        <span className="h-px w-12 bg-white/40" />
                        <span className="text-white/60 text-base md:text-lg">
                          {project.category}
                        </span>
                        <span className="text-white/60 text-base md:text-lg">
                          {project.year}
                        </span>
                      </div>
                    </motion.div>
                    
                    {/* Hover indicator */}
                    <motion.div 
                      className="mt-8 inline-flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      initial={{ x: -20 }}
                      whileHover={{ x: 0 }}
                    >
                      <span className="text-white text-sm md:text-base uppercase tracking-widest">
                        View Project
                      </span>
                      <svg 
                        className="w-6 h-6 text-white" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M17 8l4 4m0 0l-4 4m4-4H3" 
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
                
                {/* Side navigation dots */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
                  {allProjects.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 transition-all duration-300 ${
                        i === index 
                          ? 'h-12 bg-white' 
                          : 'h-6 bg-white/30 hover:bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Link>
          </section>
        );
      })}
      
      {/* Contact CTA Section */}
      <section className="relative h-screen flex items-center justify-center bg-white text-black">
        <div className="text-center max-w-4xl mx-auto px-8">
          <motion.h2 
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            START YOUR PROJECT
          </motion.h2>
          <motion.p 
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let&apos;s collaborate to bring your architectural vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/contact" 
              className="inline-block px-12 py-5 bg-black text-white text-lg font-medium uppercase tracking-wider hover:bg-gray-900 transition-colors duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}