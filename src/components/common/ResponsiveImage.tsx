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
  const [src, setSrc] = useState<string | null>(null);

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

  // Encode spaces and unsafe characters to avoid 400s from the image optimizer
  const encodedPath = imagePath.replace(/ /g, "%20");

  useEffect(() => {
    setSrc(encodedPath);
  }, [encodedPath]);

  return (
    <Image
      src={src || encodedPath}
      alt={alt}
      fill
      className={className}
      sizes="100vw"
      style={{ objectFit: 'cover' }}
      priority={false}
      onError={() => {
        // Fallback to a safe placeholder if requested image is missing
        // This avoids broken images when content references files that are not present yet.
        setSrc('/hero-marinelli.jpg');
      }}
    />
  );
}
