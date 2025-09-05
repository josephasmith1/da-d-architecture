'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveImage } from '@/components/common/ResponsiveImage';
import { useState, useEffect } from 'react';

const featuredImages = [
  '/projects/legend/Legend LGD Cam 1-L.jpg',
  '/projects/shia/Shia 1-L.jpg',
  '/projects/malibu-oceanfront-rebuild/ariel.png',
  '/projects/markups/Markups_Ariel1-L.png',
  '/projects/contemporary-residence/front-facade-evening.jpg',
  '/projects/contemporary-residence/aerial-perspective.jpg',
  '/projects/modern-luxury-residence/pool-deck-lounge.jpg',
  '/projects/modern-luxury-residence/exterior-pool-view.jpg',
];

const luxuryTransition = {
  name: 'luxury-dissolve',
  initial: { 
    opacity: 0,
    scale: 1.01,
    filter: 'blur(4px)'
  },
  animate: { 
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)'
  },
  exit: { 
    opacity: 0,
    scale: 0.99,
    filter: 'blur(4px)'
  },
  transition: { 
    duration: 1.8,
    ease: [0.43, 0.13, 0.23, 0.96] as const,
    opacity: {
      duration: 1.2,
      ease: 'easeInOut' as const
    },
    scale: {
      duration: 2,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    },
    filter: {
      duration: 1.5
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
    <section className="relative h-[90vh] overflow-hidden bg-black">
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
      
      {/* Base image layer - always visible */}
      {shuffledImages[(currentIndex - 1 + shuffledImages.length) % shuffledImages.length] && (
        <div className="absolute inset-0">
          <ResponsiveImage
            name={shuffledImages[(currentIndex - 1 + shuffledImages.length) % shuffledImages.length]}
            alt="Background"
            fill
            className="object-cover"
            sizes="100vw"
            objectFit="cover"
          />
        </div>
      )}
      
      <AnimatePresence mode="sync">
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
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
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