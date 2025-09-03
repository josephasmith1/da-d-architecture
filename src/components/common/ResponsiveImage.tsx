'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

interface ResponsiveImageProps {
  name: string;
  alt: string;
  className?: string;
}

export function ResponsiveImage({ name, alt, className }: ResponsiveImageProps) {
  const [isPortrait, setIsPortrait] = useState(false);

  useEffect(() => {
    // Check if the viewport is taller than it is wide (portrait)
    const checkOrientation = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    // Initial check
    checkOrientation();

    // Add event listener for resize
    window.addEventListener('resize', checkOrientation);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  // Determine the suffix based on orientation
  const suffix = isPortrait ? '-P' : '-L';
  // Handle different file extensions (.jpg and .png)
  const hasExtension = name.includes('.jpg') || name.includes('.png');
  // Check if the name already has the landscape/portrait suffix
  const alreadyHasSuffix = name.endsWith('-L') || name.endsWith('-P');
  
  let imagePath;
  if (hasExtension) {
    imagePath = `/projects/${name}`;
  } else if (alreadyHasSuffix) {
    imagePath = `/projects/${name}.jpg`;
  } else {
    imagePath = `/projects/${name}${suffix}.jpg`;
  }

  return (
    <Image
      src={imagePath}
      alt={alt}
      fill
      className={className}
      sizes="100vw"
      style={{ objectFit: 'cover' }}
      priority={false}
    />
  );
}
