'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { PlanLightbox } from "@/components/projects/PlanLightbox";
import { Card, CardBody } from "@heroui/react";
import { ServiceChip } from "@/components/common/ServiceChip";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getProject, type Project } from "@/lib/projects";



export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const resolvedParams = await params;
        const projectData = await getProject(resolvedParams.slug);
        setProject(projectData);
      } catch (error) {
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [params]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Section>
            <div className="max-w-3xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-foreground/10 rounded mb-4"></div>
                <div className="h-4 bg-foreground/10 rounded"></div>
              </div>
            </div>
          </Section>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
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
                <button 
                  className="text-primary hover:underline"
                  onClick={() => router.push('/projects')}
                >
                  Back to Projects
                </button>
              </CardBody>
            </Card>
          </Section>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Section className="pt-8 pb-12 md:pt-12 md:pb-16">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="font-display text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {project.title}
            </motion.h1>
            <motion.div 
              className="flex flex-wrap gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="text-foreground-500">{project.location}</span>
              <span className="text-foreground-500">•</span>
              <span className="text-foreground-500">{project.year}</span>
              <span className="text-foreground-500">•</span>
              <ServiceChip service={project.category} />
            </motion.div>
            <div className="text-xl text-foreground-500 mb-12">
              {project.description.map((paragraph, index) => (
                <p key={index} className="mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>
        </Section>
        
        <Section containerClassName="px-0" className="py-0 mb-12">
          <motion.div 
            className="relative h-[70vh] w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <ResponsiveImage
              name={project.coverImage}
              alt={project.title}
              className="object-cover"
            />
          </motion.div>
        </Section>
        
        <Section>
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">Services</h2>
            <div className="flex flex-wrap gap-2">
              {project.services.map((service: string, index: number) => (
                <ServiceChip key={index} service={service} />
              ))}
            </div>
          </motion.div>
        </Section>
        
        <Section>
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold mb-6">Plans & Images</h2>
            <PlanLightbox images={project.gallery.map(item => ({
              src: item.image,
              alt: item.caption
            }))} />
          </motion.div>
        </Section>
        
        <Section>
          <motion.div 
            className="flex justify-center max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <button 
              className="text-primary hover:underline flex items-center"
              onClick={() => router.push('/projects')}
            >
              ← Back to Projects
            </button>
          </motion.div>
        </Section>
      </main>
      
      <Footer />
    </div>
  );
}
