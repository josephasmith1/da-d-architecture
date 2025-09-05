'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

interface ResponsiveImageProps {
  name: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function ResponsiveImage({ 
  name, 
  alt, 
  className = "",
  width,
  height,
  fill = true,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  priority = false,
  objectFit = 'cover'
}: ResponsiveImageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Check if the viewport is mobile (768px or less)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    checkMobile();

    // Add event listener for resize
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    let imagePath = name;
    
    // If the path doesn't start with /, assume it's a project image
    if (!imagePath.startsWith('/')) {
      imagePath = `/projects/${imagePath}`;
    }
    
    // For mobile, check if portrait version exists for modern-luxury-residence images
    if (isMobile && imagePath.includes('modern-luxury-residence/')) {
      const filename = imagePath.substring(imagePath.lastIndexOf('/') + 1);
      const directory = imagePath.substring(0, imagePath.lastIndexOf('/') + 1);
      
      // Check if this is one of the images that has a portrait version
      const portraitAvailable = [
        'driveway-evening',
        'exterior-pool-view',
        'living-room-interior', 
        'master-bedroom-city-view',
        'pool-deck-lounge'
      ].some(name => filename.includes(name));
      
      if (portraitAvailable && !filename.includes('-portrait')) {
        // Replace with portrait version
        const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png|webp)$/i, '');
        const ext = filename.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '.jpg';
        imagePath = `${directory}${nameWithoutExt}-portrait${ext}`;
      }
    }
    
    // Encode spaces and unsafe characters to avoid 400s from the image optimizer
    const encodedPath = imagePath.replace(/ /g, "%20");
    setSrc(encodedPath);
  }, [name, isMobile]);

  const handleError = () => {
    // Fallback to original if portrait version doesn't exist
    let fallbackPath = name;
    if (!fallbackPath.startsWith('/')) {
      fallbackPath = `/projects/${fallbackPath}`;
    }
    
    // If we tried portrait and it failed, go back to landscape
    if (src?.includes('-portrait')) {
      const landscapePath = src.replace('-portrait', '');
      setSrc(landscapePath);
    } else {
      // Ultimate fallback
      setSrc('/hero-marinelli.jpg');
    }
  };

  if (!src) return null;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        style={{ objectFit }}
        priority={priority}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width || 1920}
      height={height || 1080}
      className={className}
      sizes={sizes}
      style={{ objectFit }}
      priority={priority}
      onError={handleError}
    />
  );
}