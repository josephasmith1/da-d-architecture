'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { useState, useEffect } from 'react';

const featuredImages = [
  '/projects/legend/Legend LGD Cam 1-L.jpg',
  '/projects/shia/Shia 1-L.jpg',
  '/projects/contemporary-residence/front-facade-evening.jpg',
  '/projects/malibu-oceanfront-rebuild/ariel.png',
  '/projects/modern-luxury-residence/pool-deck-lounge.jpg',
  '/projects/contemporary-residence/aerial-perspective.jpg',
  '/projects/markups/Markups_Ariel1-L.png',
  '/hero-marinelli.jpg',
];

const luxuryTransition = {
  name: 'luxury-dissolve',
  initial: { 
    opacity: 0,
    scale: 1.02,
    filter: 'blur(8px)'
  },
  animate: { 
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)'
  },
  exit: { 
    opacity: 0,
    scale: 0.98,
    filter: 'blur(8px)'
  },
  transition: { 
    duration: 2.5,
    ease: [0.16, 1, 0.3, 1] as const,
    opacity: {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    },
    scale: {
      duration: 3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    },
    filter: {
      duration: 2.2
    }
  }
};

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const shuffled = [...featuredImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);

  useEffect(() => {
    if (shuffledImages.length === 0) return;
    
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setNextIndex((currentIndex + 1) % shuffledImages.length);
        setTimeout(() => {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
          setIsTransitioning(false);
        }, 50);
      }
    }, 7000); // Increased to 7 seconds for more luxurious pacing

    return () => clearInterval(interval);
  }, [shuffledImages, currentIndex, isTransitioning]);

  useEffect(() => {
    if (shuffledImages.length > 0) {
      setNextIndex((currentIndex + 1) % shuffledImages.length);
    }
  }, [currentIndex, shuffledImages]);

  if (shuffledImages.length === 0) return null;

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Preload next image */}
      {shuffledImages[nextIndex] && (
        <div className="absolute inset-0 opacity-0 pointer-events-none">
          <ResponsiveImage
            name={shuffledImages[nextIndex]}
            alt="Preload"
            fill
            className="object-cover"
            sizes="100vw"
            objectFit="cover"
          />
        </div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={luxuryTransition.initial}
          animate={luxuryTransition.animate}
          exit={luxuryTransition.exit}
          transition={luxuryTransition.transition}
          style={{ willChange: 'opacity, transform, filter' }}
        >
          <ResponsiveImage
            name={shuffledImages[currentIndex]}
            alt="Featured Project"
            fill
            className="object-cover"
            sizes="100vw"
            priority
            objectFit="cover"
          />
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {shuffledImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentIndex) {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsTransitioning(false);
                }, 50);
              }
            }}
            className={`rounded-full transition-all duration-700 ease-out ${
              index === currentIndex
                ? 'bg-white w-12 h-1.5'
                : 'bg-white/30 hover:bg-white/50 w-1.5 h-1.5'
            }`}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.95 }}
          />
        ))}
      </div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </section>
  );
}