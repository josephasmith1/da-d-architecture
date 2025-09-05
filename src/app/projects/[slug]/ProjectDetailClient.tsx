'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/ui/Section";
import { ResponsiveImage } from "@/components/common/ResponsiveImage";
import { PlanLightbox } from "@/components/projects/PlanLightbox";
import { Button } from "@heroui/react";
import Image from "next/image";
import { Download } from 'lucide-react';
import { ServiceChip } from "@/components/common/ServiceChip";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { type Project } from "@/lib/projects";
import { generateProjectSchema, generateWebPageSchema } from "@/lib/structured-data";

export default function ProjectDetailClient({ project }: { project: Project }) {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 1000], [0, -500]);
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.2]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const titleParallax = useTransform(scrollY, [0, 800], [0, -200]);
  const titleOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  useEffect(() => {
    const projectSchema = generateProjectSchema({
      title: project.title,
      description: project.description.join(' '),
      slug: project.slug,
      images: project.gallery?.map(g => g.image) || [],
      location: project.location,
      projectType: project.category,
      year: parseInt(project.year),
      client: project.additionalInfo?.Client
    });
    
    const webPageSchema = generateWebPageSchema({
      title: `${project.title} - Architecture Project`,
      description: project.description[0],
      path: `/projects/${project.slug}`,
      breadcrumbs: [
        { name: 'Home', url: 'https://da-designinc.com' },
        { name: 'Projects', url: 'https://da-designinc.com/projects' },
        { name: project.title, url: `https://da-designinc.com/projects/${project.slug}` }
      ]
    });
    
    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(projectSchema);
    document.head.appendChild(script1);
    
    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(webPageSchema);
    document.head.appendChild(script2);
    
    return () => {
      if (script1.parentNode) script1.parentNode.removeChild(script1);
      if (script2.parentNode) script2.parentNode.removeChild(script2);
    };
  }, [project]);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="relative">
        {/* Full-screen parallax hero with video or image */}
        <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              y: heroParallax,
              scale: heroScale,
              opacity: heroOpacity
            }}
          >
            {project.video ? (
              <>
                {/* Video background */}
                <video
                  className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
                  style={{ objectFit: 'cover' }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={project.video.poster}
                >
                  <source src={project.video.webm} type="video/webm" />
                  <source src={project.video.mp4} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
              </>
            ) : (
              <>
                {/* Image fallback */}
                <div className="relative w-full h-full">
                  <ResponsiveImage
                    name={project.coverImage}
                    alt={project.title}
                    className="object-cover brightness-[0.7]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
              </>
            )}
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
          
          {/* Floor Plans section - only show if floor plans exist */}
          {project.floorPlans && project.floorPlans.length > 0 && (
            <Section className="py-0 pb-32">
              <motion.div 
                className="max-w-7xl mx-auto"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 max-w-4xl mx-auto">Floor Plans</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {project.floorPlans.map((plan: { image: string; caption: string; pdf?: string }, index: number) => (
                    <motion.div
                      key={index}
                      className="relative group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.1 * index }}
                    >
                      <div className="relative overflow-hidden rounded-lg bg-foreground-50 dark:bg-foreground-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <Image
                          src={`/projects/${plan.image}`}
                          alt={plan.caption}
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <p className="text-sm text-foreground-600 dark:text-foreground-400">
                          {plan.caption}
                        </p>
                        {plan.pdf && (
                          <Button
                            size="sm"
                            variant="flat"
                            startContent={<Download className="w-4 h-4" />}
                            onPress={() => {
                              const link = document.createElement('a');
                              link.href = `/projects/${plan.pdf}`;
                              link.download = plan.caption + '.pdf';
                              link.click();
                            }}
                          >
                            Download PDF
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Section>
          )}
          
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