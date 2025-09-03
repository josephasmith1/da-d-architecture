'use client';

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type Project = {
  slug: string;
  title: string;
  coverImage: string;
  category?: string;
};

const projectData: Project[] = [
  { slug: "legend-project", title: "Legend Project", coverImage: "legend/Legend LGD Cam 1-L", category: "Landscape" },
  { slug: "marinelli-project", title: "Marinelli Project", coverImage: "marinelli/Marinelli render1-L", category: "Commercial" },
  { slug: "shia-project", title: "Shia Project", coverImage: "shia/Shia 1-L", category: "Residential" },
  { slug: "markups-project", title: "Rendering Markups Project", coverImage: "markups/Markups Ariel1-L", category: "Interior" },
  { slug: "beach-house", title: "Modern Beach House", coverImage: "bel-air/Bel Air 1-L", category: "Residential" },
  { slug: "hillside-residence", title: "Hillside Residence", coverImage: "bel-air/Bel Air 2-L", category: "Residential" },
  { slug: "urban-office", title: "Urban Office Complex", coverImage: "bel-air/Bel Air 3-L", category: "Commercial" },
  { slug: "coastal-retreat", title: "Coastal Retreat", coverImage: "bel-air/Bel Air 1-L", category: "Residential" }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main>
          <section className="relative h-screen">
            <Image
              src="/projects/legend/Legend LGD Cam 1-L.jpg"
              alt="Hero Image"
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </section>
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
                      src={`/projects/${project.coverImage}${project.slug === 'markups-project' ? '.png' : '.jpg'}`}
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

  return <ParallaxHome />;
}

function ParallaxHome() {
  const ref = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Individual scroll progress for each text section
  const { scrollYProgress: firstTextProgress } = useScroll({
    target: firstTextRef,
    offset: ["start 0.8", "end 0.2"]
  });
  
  const { scrollYProgress: secondTextProgress } = useScroll({
    target: secondTextRef,
    offset: ["start 0.8", "end 0.2"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <div className="min-h-screen bg-black text-white relative" ref={ref}>
      <Header />
      
      <main>
        {/* Large Hero Image */}
        <section className="relative h-screen">
          <Image
            src="/projects/legend/Legend LGD Cam 1-L.jpg"
            alt="Hero Image"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </section>

        {/* Full VH Text Section */}
        <section className="h-screen bg-black flex items-center justify-center" ref={firstTextRef}>
          <div className="text-left px-6 max-w-6xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-8xl font-bold leading-none"
              style={{ y }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              {(() => {
                const text = "Our design approach seeks to discover the unknown while remembering and re-imagining what has come before.";
                const words = text.split(" ");
                return (
                  <span className="relative">
                    {words.map((word, i) => {
                      const start = i / words.length;
                      const end = (i + 1) / words.length;
                      return (
                        <span key={i} className="relative inline-block mr-2 md:mr-3 lg:mr-4">
                          <span className="text-gray-400">{word}</span>
                          <motion.span 
                            className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-transparent"
                            style={{
                              opacity: useTransform(firstTextProgress, [start * 0.8, end * 0.8], [0, 1])
                            }}
                          >
                            {word}
                          </motion.span>
                        </span>
                      );
                    })}
                  </span>
                );
              })()}
            </motion.h1>
          </div>
        </section>

        {/* 2-Image Per Row Gallery - No Gaps */}
        <section>
          <div className="grid grid-cols-2">
            {projectData.map((project, index) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <div className="relative aspect-square overflow-hidden group cursor-pointer">
                  <Image
                    src={`/projects/${project.coverImage}${project.slug === 'markups-project' ? '.png' : '.jpg'}`}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              {(() => {
                const text = "We lead the design process with inspiration and excitement. We create homes that have a high value on design and reflect the importance of comfort and functionality.";
                const words = text.split(" ");
                return (
                  <span className="relative">
                    {words.map((word, i) => {
                      const start = i / words.length;
                      const end = (i + 1) / words.length;
                      return (
                        <span key={i} className="relative inline-block mr-2 md:mr-3 lg:mr-4">
                          <span className="text-gray-400">{word}</span>
                          <motion.span 
                            className="absolute inset-0 bg-gradient-to-r from-slate-400 to-slate-500 bg-clip-text text-transparent"
                            style={{
                              opacity: useTransform(secondTextProgress, [start * 0.8, end * 0.8], [0, 1])
                            }}
                          >
                            {word}
                          </motion.span>
                        </span>
                      );
                    })}
                  </span>
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