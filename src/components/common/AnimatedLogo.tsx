'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedLogoProps {
  onAnimationComplete?: () => void;
  duration?: number;
}

export function AnimatedLogo({ onAnimationComplete, duration = 3 }: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onAnimationComplete?.();
    }, (duration + 0.5) * 1000);

    return () => clearTimeout(timer);
  }, [duration, onAnimationComplete]);

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
    },
  };

  const fadeOutVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-none"
      initial="visible"
      animate={isAnimating ? "visible" : "hidden"}
      variants={fadeOutVariants}
      transition={{ duration: 0.5, delay: isAnimating ? 0 : 0.5 }}
    >
      <motion.svg
        className="w-[80vw] max-w-[800px] h-auto"
        viewBox="0 0 408.08 36.26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Horizontal line */}
        <motion.line
          x1="0"
          y1="0.5"
          x2="406.11"
          y2="0.5"
          stroke="white"
          strokeWidth="0.5"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.3, ease: "easeInOut" }}
        />

        {/* DeLoache text paths */}
        <motion.path
          d="M115.3,10.84h4.97c5.25,0,5.9,3.07,5.9,9.46s-.91,9.31-6.58,9.31h-4.29V10.84ZM116.97,28.21h2.03c5.02,0,5.51-1.35,5.51-9.02,0-5.38-.73-6.94-5.36-6.94h-2.18v15.96Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M130.62,23.37v1.01c0,1.82.49,4.24,2.96,4.24,1.95,0,2.91-1.25,2.89-3.02h1.64c-.18,3.17-1.9,4.26-4.52,4.26-2.26,0-4.52-.91-4.52-4.89v-3.22c0-3.8,1.59-5.54,4.52-5.54,4.52,0,4.52,3.25,4.52,7.15h-7.49ZM136.54,22.13c0-2.91-.47-4.65-2.96-4.65s-2.96,1.74-2.96,4.65h5.93Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 0.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M141.09,29.61V10.84h1.66v17.37h6.21v1.4h-7.88Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 0.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M150.71,24.47v-2.83c0-3.41,1.46-5.41,4.52-5.41s4.52,2,4.52,5.41v2.83c0,3.41-1.46,5.41-4.52,5.41s-4.52-2-4.52-5.41ZM152.27,23.04c0,3.43.39,5.59,2.96,5.59s2.96-2.16,2.96-5.59-.39-5.56-2.96-5.56-2.96,2.16-2.96,5.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 0.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M169.38,28h-.05c-.83,1.25-2.11,1.87-3.72,1.87-2.34,0-3.61-1.59-3.61-3.87,0-4.6,4.63-4.13,7.28-4.34v-1.09c0-1.92-.57-3.09-2.65-3.09-1.43,0-2.57.7-2.57,2.26h-1.66c.13-2.52,2.08-3.51,4.37-3.51,1.33,0,4.08.13,4.08,3.48v6.6c0,.94,0,1.77.16,3.3h-1.61v-1.61ZM169.28,22.91c-2.24.08-5.62-.18-5.62,3.02,0,1.48.75,2.7,2.37,2.7,1.79,0,3.25-1.61,3.25-3.33v-2.39Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 0.7, ease: "easeInOut" }}
        />
        <motion.path
          d="M179.99,20.25c.08-1.64-.52-2.78-2.31-2.78-.96,0-1.77.55-2.11,1.51-.21.6-.36,2.39-.36,4.13,0,2.37,0,5.51,2.42,5.51,2.05,0,2.31-1.3,2.39-2.89h1.56c.13,3.54-2.37,4.13-3.59,4.13-4.45,0-4.45-3.51-4.45-6.76,0-1.3.05-3.35.39-4.34.68-1.87,2.16-2.55,3.95-2.55,2.26,0,3.8,1.27,3.67,4.03h-1.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 0.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M184.25,29.61V10.84h1.56v7.25h.05c.75-1.09,1.77-1.87,3.17-1.87,3.25,0,3.59,2.42,3.59,4.13v9.26h-1.56v-9.18c0-1.53-.6-2.96-2.42-2.96-1.4,0-2.83.96-2.83,3.9v8.24h-1.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 0.9, ease: "easeInOut" }}
        />
        <motion.path
          d="M197.02,23.37v1.01c0,1.82.49,4.24,2.96,4.24,1.95,0,2.91-1.25,2.89-3.02h1.64c-.18,3.17-1.9,4.26-4.52,4.26-2.26,0-4.52-.91-4.52-4.89v-3.22c0-3.8,1.59-5.54,4.52-5.54,4.52,0,4.52,3.25,4.52,7.15h-7.49ZM202.95,22.13c0-2.91-.47-4.65-2.96-4.65s-2.96,1.74-2.96,4.65h5.93Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.0, ease: "easeInOut" }}
        />

        {/* Architecture text paths */}
        <motion.path
          d="M216.84,10.84l5.85,18.77h-1.74l-1.51-4.94h-7.36l-1.48,4.94h-1.66l5.93-18.77h1.98ZM218.99,23.27l-3.2-10.61h-.05l-3.17,10.61h6.42Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.1, ease: "easeInOut" }}
        />
        <motion.path
          d="M226.3,18.25h.05c.65-1.25,2.03-2.03,3.61-2.03v1.59c-2.21-.18-3.67,1.14-3.67,3.35v8.45h-1.56v-13.13h1.56v1.77Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.2, ease: "easeInOut" }}
        />
        <motion.path
          d="M237.71,20.25c.08-1.64-.52-2.78-2.31-2.78-.96,0-1.77.55-2.11,1.51-.21.6-.36,2.39-.36,4.13,0,2.37,0,5.51,2.42,5.51,2.05,0,2.31-1.3,2.39-2.89h1.56c.13,3.54-2.37,4.13-3.59,4.13-4.45,0-4.45-3.51-4.45-6.76,0-1.3.05-3.35.39-4.34.68-1.87,2.16-2.55,3.95-2.55,2.26,0,3.8,1.27,3.67,4.03h-1.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M241.98,29.61V10.84h1.56v7.25h.05c.75-1.09,1.77-1.87,3.17-1.87,3.25,0,3.59,2.42,3.59,4.13v9.26h-1.56v-9.18c0-1.53-.6-2.96-2.42-2.96-1.4,0-2.83.96-2.83,3.9v8.24h-1.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M253.86,12.82v-1.98h1.92v1.98h-1.92ZM254.04,29.61v-13.13h1.56v13.13h-1.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M258.12,17.73v-1.25h2.11v-2.7l1.56-.68v3.38h2.65v1.25h-2.65v8.42c0,1.74.18,2.16,1.43,2.16.52,0,.88-.03,1.22-.08v1.35c-.47.05-.99.08-1.48.08-2.11,0-2.73-.94-2.73-2.55v-9.39h-2.11Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M267.74,23.37v1.01c0,1.82.49,4.24,2.96,4.24,1.95,0,2.91-1.25,2.89-3.02h1.64c-.18,3.17-1.9,4.26-4.52,4.26-2.26,0-4.52-.91-4.52-4.89v-3.22c0-3.8,1.59-5.54,4.52-5.54,4.52,0,4.52,3.25,4.52,7.15h-7.49ZM273.67,22.13c0-2.91-.47-4.65-2.96-4.65s-2.96,1.74-2.96,4.65h5.93Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.7, ease: "easeInOut" }}
        />
        <motion.path
          d="M283.92,20.25c.08-1.64-.52-2.78-2.31-2.78-.96,0-1.77.55-2.11,1.51-.21.6-.36,2.39-.36,4.13,0,2.37,0,5.51,2.42,5.51,2.05,0,2.31-1.3,2.39-2.89h1.56c.13,3.54-2.37,4.13-3.59,4.13-4.45,0-4.45-3.51-4.45-6.76,0-1.3.05-3.35.39-4.34.68-1.87,2.16-2.55,3.95-2.55,2.26,0,3.8,1.27,3.67,4.03h-1.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.8, ease: "easeInOut" }}
        />
        <motion.path
          d="M287.01,17.73v-1.25h2.11v-2.7l1.56-.68v3.38h2.65v1.25h-2.65v8.42c0,1.74.18,2.16,1.43,2.16.52,0,.88-.03,1.22-.08v1.35c-.47.05-.99.08-1.48.08-2.11,0-2.73-.94-2.73-2.55v-9.39h-2.11Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 1.9, ease: "easeInOut" }}
        />
        <motion.path
          d="M303.68,16.48v13.13h-1.35v-1.46h-.05c-.91,1.12-1.85,1.72-3.3,1.72-2.7,0-3.46-1.98-3.46-4.11v-9.28h1.56v9.02c0,.36-.08,3.12,2.18,3.12,2.11,0,2.86-1.98,2.86-2.89v-9.26h1.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.0, ease: "easeInOut" }}
        />
        <motion.path
          d="M308.61,18.25h.05c.65-1.25,2.03-2.03,3.61-2.03v1.59c-2.21-.18-3.67,1.14-3.67,3.35v8.45h-1.56v-13.13h1.56v1.77Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.1, ease: "easeInOut" }}
        />
        <motion.path
          d="M315.4,23.37v1.01c0,1.82.49,4.24,2.96,4.24,1.95,0,2.91-1.25,2.89-3.02h1.64c-.18,3.17-1.9,4.26-4.52,4.26-2.26,0-4.52-.91-4.52-4.89v-3.22c0-3.8,1.59-5.54,4.52-5.54,4.52,0,4.52,3.25,4.52,7.15h-7.49ZM321.33,22.13c0-2.91-.47-4.65-2.96-4.65s-2.96,1.74-2.96,4.65h5.93Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.2, ease: "easeInOut" }}
        />

        {/* Design text paths */}
        <motion.path
          d="M344.96,10.84h4.97c5.25,0,5.9,3.07,5.9,9.46s-.91,9.31-6.58,9.31h-4.29V10.84ZM346.62,28.21h2.03c5.02,0,5.51-1.35,5.51-9.02,0-5.38-.73-6.94-5.36-6.94h-2.18v15.96Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M360.27,23.37v1.01c0,1.82.49,4.24,2.96,4.24,1.95,0,2.91-1.25,2.89-3.02h1.64c-.18,3.17-1.9,4.26-4.52,4.26-2.26,0-4.52-.91-4.52-4.89v-3.22c0-3.8,1.59-5.54,4.52-5.54,4.52,0,4.52,3.25,4.52,7.15h-7.49ZM366.2,22.13c0-2.91-.47-4.65-2.96-4.65s-2.96,1.74-2.96,4.65h5.93Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.4, ease: "easeInOut" }}
        />
        <motion.path
          d="M374.08,29.87c-2.83,0-3.95-1.38-3.93-4.16h1.59c0,1.79.42,2.99,2.42,2.99,1.51,0,2.24-.86,2.24-2.31,0-3.43-5.9-2.55-5.9-6.89,0-2.42,1.66-3.28,3.95-3.28,2.6,0,3.43,1.79,3.43,3.8h-1.53c-.08-1.66-.52-2.55-2.29-2.55-1.12,0-2,.73-2,1.9,0,3.28,5.9,2.39,5.9,6.79,0,2.47-1.43,3.72-3.87,3.72Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.5, ease: "easeInOut" }}
        />
        <motion.path
          d="M381.05,12.82v-1.98h1.92v1.98h-1.92ZM381.23,29.61v-13.13h1.56v13.13h-1.56Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M393.35,16.46h1.53c-.05,1.25-.08,1.9-.08,2.57v11.05c0,2.89-.88,4.6-4.63,4.6-3.28,0-3.93-2.31-3.82-3.64h1.56c-.1,1.51,1.01,2.39,2.47,2.39,3.04,0,2.86-1.64,2.86-5.56h-.05c-.68,1.12-1.92,1.59-3.17,1.59-3.77,0-4.03-3.25-4.03-6.16s.03-3.07.39-4.47c.13-.55,1.04-2.6,3.69-2.6,1.33,0,2.65.68,3.22,1.85l.05.05v-1.66ZM387.55,22.75c0,2.73,0,5.46,2.83,5.46,1.3,0,2.13-.86,2.37-1.48.39-1.01.49-1.61.49-5.46,0-2.76-1.48-3.8-2.94-3.8-2.7,0-2.76,3.33-2.76,5.28Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.7, ease: "easeInOut" }}
        />
        <motion.path
          d="M399.59,29.61h-1.56v-13.13h1.56v1.61h.05c.75-1.09,1.77-1.87,3.17-1.87,3.25,0,3.59,2.42,3.59,4.13v9.26h-1.56v-9.18c0-1.53-.6-2.96-2.42-2.96-1.4,0-2.83.96-2.83,3.9v8.24Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.1, delay: 2.8, ease: "easeInOut" }}
        />

        {/* & symbol */}
        <motion.path
          d="M338.55,27.74c-1.53,1.85-3.22,2.24-5.51,2.24-2.47,0-4.97-1.25-4.97-5.28,0-2.91,1.25-3.77,3.43-5.41-1.27-1.56-2.39-2.52-2.39-4.68,0-2.89,1.43-4.13,4.32-4.13,2.34,0,3.82.94,3.82,3.98,0,2.5-1.69,3.61-3.43,5.07l4.42,5.36c.44-1.4.68-4.37.68-5.8h1.56c0,1.43-.13,4.76-1.09,7.23l2.7,3.3h-2.13l-1.4-1.87ZM332.49,20.41c-1.74,1.25-2.76,2.03-2.76,4.26,0,2.65,1.46,3.9,4,3.9,1.48,0,3.04-.78,3.74-2.13l-4.99-6.03ZM335.59,14.35c0-1.51-.62-2.47-2.29-2.47-1.51,0-2.52.83-2.52,2.39,0,1.87.91,2.78,2.05,4.13,1.43-1.04,2.76-2.13,2.76-4.06Z"
          stroke="white"
          strokeWidth="0.5"
          fill="none"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: duration * 0.15, delay: 2.9, ease: "easeInOut" }}
        />
      </motion.svg>
    </motion.div>
  );
}