'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const featuredImages = [
  '/projects/legend/Legend LGD Cam 1-L.jpg',
  '/projects/shia/Shia 1-L.jpg',
  '/projects/marinelli/Marinelli 1-L.jpg',
  '/projects/markups/Markups_Ariel1-L.png',
  '/projects/malibu-oceanfront-rebuild/ariel.png',
  '/hero-marinelli.jpg',
];

const transitions = [
  {
    name: 'fade',
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 1.5, ease: 'easeInOut' }
  },
  {
    name: 'slideScale',
    initial: { x: 300, scale: 0.9, opacity: 0 },
    animate: { x: 0, scale: 1, opacity: 1 },
    exit: { x: -300, scale: 1.1, opacity: 0 },
    transition: { duration: 1.2, ease: [0.68, -0.55, 0.265, 1.55] }
  },
  {
    name: 'zoom',
    initial: { scale: 1.2, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 1.3, ease: 'easeInOut' }
  },
  {
    name: 'rotate',
    initial: { rotateY: 90, opacity: 0, scale: 0.9 },
    animate: { rotateY: 0, opacity: 1, scale: 1 },
    exit: { rotateY: -90, opacity: 0, scale: 0.9 },
    transition: { duration: 1.4, ease: 'easeInOut' }
  },
  {
    name: 'blur',
    initial: { filter: 'blur(20px)', opacity: 0 },
    animate: { filter: 'blur(0px)', opacity: 1 },
    exit: { filter: 'blur(20px)', opacity: 0 },
    transition: { duration: 1.2, ease: 'easeInOut' }
  }
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffledImages, setShuffledImages] = useState<string[]>([]);
  const [currentTransition, setCurrentTransition] = useState(0);

  useEffect(() => {
    const shuffled = [...featuredImages].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  }, []);

  useEffect(() => {
    if (shuffledImages.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % shuffledImages.length);
      setCurrentTransition((prevTransition) => (prevTransition + 1) % transitions.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [shuffledImages]);

  if (shuffledImages.length === 0) return null;

  const currentEffect = transitions[currentTransition];

  return (
    <section className="relative h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={currentEffect.initial}
          animate={currentEffect.animate}
          exit={currentEffect.exit}
          transition={currentEffect.transition}
        >
          <Image
            src={shuffledImages[currentIndex]}
            alt="Featured Project"
            fill
            className="object-cover"
            sizes="100vw"
            priority
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