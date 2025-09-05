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

const transitions = [
  {
    name: 'crossfade',
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.7, ease: 'easeInOut' as const }
  },
  {
    name: 'slide',
    initial: { x: '100%', opacity: 0.8 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0.8 },
    transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] as const }
  },
  {
    name: 'scale',
    initial: { scale: 1.1, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
    transition: { duration: 0.8, ease: 'easeInOut' as const }
  },
  {
    name: 'parallax',
    initial: { scale: 1.3, x: 100, opacity: 0 },
    animate: { scale: 1, x: 0, opacity: 1 },
    exit: { scale: 1.1, x: -100, opacity: 0 },
    transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] as const }
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [currentTransition, setCurrentTransition] = useState(0);
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
          setCurrentTransition((prevTransition) => (prevTransition + 1) % transitions.length);
          setIsTransitioning(false);
        }, 50);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [shuffledImages, currentIndex, isTransitioning]);

  useEffect(() => {
    if (shuffledImages.length > 0) {
      setNextIndex((currentIndex + 1) % shuffledImages.length);
    }
  }, [currentIndex, shuffledImages]);

  if (shuffledImages.length === 0) return null;

  const currentEffect = transitions[currentTransition];

  return (
    <section className="relative h-screen overflow-hidden bg-black">
      {/* Preload next image */}
      {shuffledImages[nextIndex] && (
        <div className="absolute inset-0 opacity-0 pointer-events-none">
          <ResponsiveImage
            name={shuffledImages[nextIndex]}
            alt="Preload"
            fill
            className="object-contain"
            sizes="100vw"
            objectFit="contain"
          />
        </div>
      )}
      
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={currentEffect.initial}
          animate={currentEffect.animate}
          exit={currentEffect.exit}
          transition={currentEffect.transition}
        >
          <ResponsiveImage
            name={shuffledImages[currentIndex]}
            alt="Featured Project"
            fill
            className="object-contain"
            sizes="100vw"
            priority
            objectFit="contain"
          />
          
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {shuffledImages.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setCurrentIndex(index);
              setCurrentTransition((prevTransition) => (prevTransition + 1) % transitions.length);
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
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