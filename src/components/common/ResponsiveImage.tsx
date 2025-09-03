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
  
  // Check if the name already has an extension
  const hasExtension = name.includes('.jpg') || name.includes('.png');
  
  // Check if the name already has the landscape/portrait suffix
  const alreadyHasSuffix = name.endsWith('-L') || name.endsWith('-P');
  
  // Extract extension if present
  let extension = '.jpg'; // default
  let baseName = name;
  
  if (hasExtension) {
    const lastDotIndex = name.lastIndexOf('.');
    extension = name.substring(lastDotIndex);
    baseName = name.substring(0, lastDotIndex);
  }
  
  let imagePath;
  if (hasExtension) {
    // If it has an extension, use as-is
    imagePath = `/projects/${name}`;
  } else if (alreadyHasSuffix) {
    // If it has a suffix but no extension, add .jpg
    imagePath = `/projects/${name}.jpg`;
  } else {
    // Add suffix and extension
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
