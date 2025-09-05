'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import dynamic from 'next/dynamic';

// Dynamic imports for better code splitting
const HeroCarousel = dynamic(() => import('@/components/common/HeroCarousel').then(mod => ({ default: mod.HeroCarousel })), {
  loading: () => <div className="h-screen bg-background animate-pulse" />,
  ssr: true,
});

const AnimatedLogo = dynamic(() => import('@/components/common/AnimatedLogo').then(mod => ({ default: mod.AnimatedLogo })), {
  loading: () => <div className="w-full h-32" />,
  ssr: false,
});

type Project = {
  slug: string;
  title: string;
  coverImage: string;
  category?: string;
};

const projectData: Project[] = [
  { slug: "legend", title: "Legend Project", coverImage: "legend/Legend LGD Cam 1-L.jpg", category: "Landscape" },
  { slug: "marinelli", title: "Marinelli Project", coverImage: "contemporary-residence/front-facade-evening.jpg", category: "Commercial" },
  { slug: "shia", title: "Shia Project", coverImage: "shia/Shia 1-L.jpg", category: "Residential" },
  { slug: "markups", title: "Rendering Markups Project", coverImage: "markups/Markups_Ariel1-L.png", category: "Interior" },
  { slug: "beach-house", title: "Modern Beach House", coverImage: "modern-luxury-residence/pool-deck-lounge.jpg", category: "Residential" },
  { slug: "hillside-residence", title: "Hillside Residence", coverImage: "contemporary-residence/aerial-perspective.jpg", category: "Residential" },
  { slug: "urban-office", title: "Urban Office Complex", coverImage: "contemporary-residence/courtyard-view.jpg", category: "Commercial" },
  { slug: "malibu-oceanfront-rebuild", title: "Malibu Oceanfront Rebuild", coverImage: "malibu-oceanfront-rebuild/ariel.png", category: "Residential" }
];

// Project Tile Component with viewport-based animations for mobile
function ProjectTile({ project }: { project: Project }) {
  const tileRef = useRef(null);
  const isInView = useInView(tileRef, { 
    once: false, 
    margin: "-25% 0px -25% 0px" // Trigger when 25% of the tile is visible
  });
  
  return (
    <Link href={`/projects/${project.slug}`}>
      <div 
        ref={tileRef}
        className="relative aspect-square overflow-hidden group cursor-pointer"
      >
        <Image
          src={`/projects/${project.coverImage}`}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 md:group-hover:scale-110"
          sizes="50vw"
        />
        
        {/* Overlay - visible on hover for desktop, on viewport for mobile */}
        <div className={`
          absolute inset-0 transition-colors duration-500
          bg-black/20 md:bg-black/0 md:group-hover:bg-black/20
        `} />
        
        {/* Project Info - always visible on mobile when in viewport */}
        <motion.div 
          className="absolute inset-0 flex items-end p-4 sm:p-6 md:p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 20 
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-500">
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-light mb-1 sm:mb-2">
              {project.title}
            </h3>
            <p className="text-white/80 text-xs sm:text-sm uppercase tracking-wider">
              {project.category}
            </p>
          </div>
        </motion.div>
        
        {/* Touch device specific overlay - only on mobile */}
        <div className="md:hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if animation has already played in this session
    const hasPlayedAnimation = sessionStorage.getItem('logoAnimationPlayed');
    if (!hasPlayedAnimation) {
      setShowLogo(true);
      sessionStorage.setItem('logoAnimationPlayed', 'true');
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main>
          <HeroCarousel />
          <section className="h-screen bg-black flex items-center justify-center">
            <div className="text-left px-6 max-w-6xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-none text-gray-400">
                Our design approach seeks to discover the unknown while remembering and re-imagining what has come before.
              </h1>
            </div>
          </section>
          <section>
            <div className="grid grid-cols-2">
              {projectData.map((project) => (
                <ProjectTile key={project.slug} project={project} />
              ))}
            </div>
          </section>
          <section className="bg-black py-20">
            <div className="max-w-4xl mx-auto px-6 text-left">
              <p className="text-2xl md:text-4xl lg:text-5xl font-bold leading-none text-gray-400">
                We lead the design process with inspiration and excitement. We create homes that have a high value on design and reflect the importance of comfort and functionality.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      {showLogo && (
        <AnimatedLogo 
          duration={3} 
          onAnimationComplete={() => setShowLogo(false)} 
        />
      )}
      <ParallaxHome />
    </>
  );
}

function ParallaxHome() {
  const ref = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Use useInView for triggering animations when elements enter viewport
  const isFirstTextInView = useInView(firstTextRef, { once: true, margin: "-20%" });
  const isSecondTextInView = useInView(secondTextRef, { once: true, margin: "-20%" });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <div className="min-h-screen bg-black text-white relative" ref={ref}>
      <Header />
      
      <main>
        {/* Hero Carousel with Framer Motion */}
        <HeroCarousel />

        {/* Full VH Text Section */}
        <section className="h-screen bg-black flex items-center justify-center" ref={firstTextRef}>
          <div className="text-left px-6 max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold leading-none"
              style={{ y }}
            >
              {(() => {
                const text = "Our design approach seeks to discover the unknown while remembering and re-imagining what has come before.";
                const words = text.split(" ");
                return (
                  <span className="relative">
                    {words.map((word, i) => {
                      return (
                        <span key={i} className="relative inline-block mr-2 md:mr-3 lg:mr-4">
                          <span className="text-gray-400">{word}</span>
                          <motion.span 
                            className="absolute inset-0 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isFirstTextInView ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                          >
                            {word}
                          </motion.span>
                        </span>
                      );
                    })
                  }</span>
                );
              })()}
            </motion.h1>
          </div>
        </section>

        {/* 2-Image Per Row Gallery - No Gaps */}
        <section>
          <div className="grid grid-cols-2">
            {projectData.map((project) => (
              <ProjectTile key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* Bottom Text Block */}
        <section className="bg-black py-20" ref={secondTextRef}>
          <div className="max-w-4xl mx-auto px-6 text-left">
            <motion.p 
              className="text-2xl md:text-4xl lg:text-5xl font-bold leading-none"
              style={{ y: y2 }}
            >
              {(() => {
                const text = "We lead the design process with inspiration and excitement. We create homes that have a high value on design and reflect the importance of comfort and functionality.";
                const words = text.split(" ");
                return (
                  <span className="relative">
                    {words.map((word, i) => {
                      return (
                        <span key={i} className="relative inline-block mr-2 md:mr-3 lg:mr-4">
                          <span className="text-gray-400">{word}</span>
                          <motion.span 
                            className="absolute inset-0 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isSecondTextInView ? 1 : 0 }}
                            transition={{ duration: 0.5, delay: i * 0.05 }}
                          >
                            {word}
                          </motion.span>
                        </span>
                      );
                    })
                  }</span>
                );
              })()}
            </motion.p>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}