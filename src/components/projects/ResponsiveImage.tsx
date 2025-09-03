'use client';

import { Image } from "@heroui/react";
import NextImage from "next/image";
import { useState, useEffect } from "react";

export function ResponsiveImage({ name, alt, priority = false }: { name: string; alt: string; priority?: boolean }) {
  const [orientation, setOrientation] = useState('landscape');

  useEffect(() => {
    const checkOrientation = () => {
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape');
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  const suffix = orientation === 'portrait' ? 'P' : 'L';
  const width = orientation === 'portrait' ? 400 : 600;
  const height = orientation === 'portrait' ? 600 : 400;

  return (
    <Image
      as={NextImage}
      src={`/projects/${name}-${suffix}.jpg`}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      removeWrapper
      className="w-full h-full object-cover"
    />
  );
}
