'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { PlanLightbox } from "@/components/projects/PlanLightbox";
import { Card, CardBody, Button } from "@heroui/react";
import { ServiceChip } from "@/components/common/ServiceChip";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { getProject, type Project } from "@/lib/projects";

export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, -500]);
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const titleParallax = useTransform(scrollY, [0, 800], [0, -200]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const resolvedParams = await params;
        const projectData = await getProject(resolvedParams.slug);
        setProject(projectData);
      } catch {
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [params]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </motion.div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Section>
            <Card className="border-0 bg-background/60 backdrop-blur-md max-w-3xl mx-auto">
              <CardBody className="text-center py-12">
                <h2 className="font-display text-2xl font-bold mb-4">
                  Project Not Found
                </h2>
                <p className="text-foreground-500 mb-6">
                  The project you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>
                <Button 
                  variant="light"
                  onPress={() => router.push('/projects')}
                  className="text-foreground hover:text-primary"
                >
                  ← Back to Projects
                </Button>
              </CardBody>
            </Card>
          </Section>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        {/* Full-screen parallax hero */}
        <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              y: heroParallax,
              scale: heroScale,
              opacity: heroOpacity
            }}
          >
            <div className="relative w-full h-full">
              <ResponsiveImage
                name={project.coverImage}
                alt={project.title}
                className="object-cover brightness-[0.7]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
          </motion.div>
          
          {/* Hero content overlay */}
          <motion.div 
            className="absolute inset-0 flex items-end justify-start p-8 md:p-16 lg:p-24"
            style={{ 
              y: titleParallax,
              opacity: titleOpacity
            }}
          >
            <div className="max-w-4xl">
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[0.9]">
                  {project.title}
                </h1>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap items-center gap-4 text-white/80 text-lg md:text-xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <span>{project.location}</span>
                <span className="text-white/40">•</span>
                <span>{project.year}</span>
                <span className="text-white/40">•</span>
                <span className="uppercase tracking-wider text-sm">{project.category}</span>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white/60"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Content section */}
        <div className="relative bg-background">
          <Section className="py-20 md:py-32">
            <motion.div 
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="grid md:grid-cols-3 gap-12 mb-20">
                <div className="md:col-span-2">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">About</h2>
                  <div className="text-lg md:text-xl leading-relaxed text-foreground-700 space-y-6">
                    {project.description.map((paragraph, index) => (
                      <motion.p 
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>
                </div>
                
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <h3 className="font-display text-xl font-bold mb-4 uppercase tracking-wider">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service: string, index: number) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.4 + 0.05 * index }}
                        >
                          <ServiceChip service={service} />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </Section>
          
          {/* Gallery section */}
          <Section className="py-0 pb-32">
            <motion.div 
              className="max-w-7xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-4xl mx-auto">Gallery</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {project.gallery.map((item, index) => (
                  <motion.div
                    key={index}
                    className={`group cursor-pointer overflow-hidden ${
                      index % 3 === 0 ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                    }`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 * index }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative w-full h-full overflow-hidden bg-foreground/5">
                      <ResponsiveImage
                        name={item.image}
                        alt={item.caption}
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white text-lg">{item.caption}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Full gallery lightbox */}
              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <PlanLightbox images={project.gallery.map(item => ({
                  src: item.image,
                  alt: item.caption
                }))} />
              </motion.div>
            </motion.div>
          </Section>
          
          {/* Navigation */}
          <Section className="py-20 border-t border-foreground/10">
            <motion.div 
              className="flex justify-between items-center max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Button 
                variant="ghost"
                size="lg"
                onPress={() => router.push('/projects')}
                className="text-foreground hover:text-primary group"
              >
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
                <span className="ml-2">All Projects</span>
              </Button>
            </motion.div>
          </Section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}