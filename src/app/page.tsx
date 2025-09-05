'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/common/HeroCarousel";
import { AnimatedLogo } from "@/components/common/AnimatedLogo";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    setMounted(true);
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
                <Link key={project.slug} href={`/projects/${project.slug}`}>
                  <div className="relative aspect-square overflow-hidden group cursor-pointer">
                    <Image
                      src={`/projects/${project.coverImage}`}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="50vw"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div>
                        <h3 className="text-white text-2xl md:text-3xl font-light mb-2">{project.title}</h3>
                        <p className="text-white/80 text-sm uppercase tracking-wider">{project.category}</p>
                      </div>
                    </div>
                  </div>
                </Link>
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
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <div className="relative aspect-square overflow-hidden group cursor-pointer">
                  <Image
                    src={`/projects/${project.coverImage}`}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="50vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  
                  {/* Project Info Overlay */}
                  <div className="absolute inset-0 flex items-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div>
                      <h3 className="text-white text-2xl md:text-3xl font-light mb-2">{project.title}</h3>
                      <p className="text-white/80 text-sm uppercase tracking-wider">{project.category}</p>
                    </div>
                  </div>
                </div>
              </Link>
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