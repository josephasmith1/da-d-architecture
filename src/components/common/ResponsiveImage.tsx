'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import imageManifestData from '../../../public/image-manifest.json';
import blurPlaceholders from '@/lib/blur-placeholders.json';

interface ImageVariant {
  path: string;
  orientation: string;
  filename: string;
}

interface ImageGroup {
  base: string;
  variants: ImageVariant[];
}

// Type the manifest properly
const imageManifest: Record<string, ImageGroup> = imageManifestData as Record<string, ImageGroup>;

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
  loading?: 'lazy' | 'eager';
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
  objectFit = 'cover',
  loading = 'lazy'
}: ResponsiveImageProps) {
  const [isPortraitViewport, setIsPortraitViewport] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [fallbackIndex, setFallbackIndex] = useState(0);

  useEffect(() => {
    // Check viewport orientation
    const checkOrientation = () => {
      setIsPortraitViewport(window.innerHeight > window.innerWidth);
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

  useEffect(() => {
    // Normalize the input path
    let searchPath = name;
    if (!searchPath.startsWith('/')) {
      searchPath = `/projects/${searchPath}`;
    }

    // Look for variants in the manifest
    const findBestVariant = () => {
      // Try to find exact match or base match in manifest
      let imageGroup: ImageGroup | null = null;
      
      // First try exact match
      if (imageManifest[searchPath]) {
        imageGroup = imageManifest[searchPath];
      } else {
        // Try to find by removing extension and checking base names
        const pathWithoutExt = searchPath.replace(/\.(jpg|jpeg|png|webp)$/i, '');
        
        // Look for any entry that matches our base path
        for (const [key, value] of Object.entries(imageManifest)) {
          const keyWithoutExt = key.replace(/\.(jpg|jpeg|png|webp)$/i, '');
          if (keyWithoutExt === pathWithoutExt || key === searchPath) {
            imageGroup = value;
            break;
          }
        }
      }

      if (imageGroup && imageGroup.variants) {
        // Find the best variant based on viewport orientation
        const preferredOrientation = isPortraitViewport ? 'portrait' : 'landscape';
        
        // First try to find exact orientation match
        const exactMatch = imageGroup.variants.find(
          v => v.orientation === preferredOrientation
        );
        if (exactMatch) {
          return exactMatch.path;
        }
        
        // Fallback to first available variant
        if (imageGroup.variants.length > 0) {
          return imageGroup.variants[0].path;
        }
      }
      
      // If no variants found, return the original path
      return searchPath;
    };

    const bestSrc = findBestVariant();
    
    // Encode spaces and unsafe characters
    const encodedPath = bestSrc.replace(/ /g, "%20");
    setCurrentSrc(encodedPath);
    setFallbackIndex(0); // Reset fallback index when image changes
  }, [name, isPortraitViewport]);

  const handleError = () => {
    // Fallback chain
    const fallbacks = [
      currentSrc.replace('-portrait', '').replace('_portrait', ''),
      currentSrc.replace('-P', '-L').replace('_P', '_L'),
      '/hero-marinelli.jpg'
    ];
    
    if (fallbackIndex < fallbacks.length) {
      setCurrentSrc(fallbacks[fallbackIndex]);
      setFallbackIndex(prev => prev + 1);
    }
  };

  if (!currentSrc) return null;

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        style={{ objectFit }}
        priority={priority}
        loading={priority ? 'eager' : loading}
        placeholder={blurPlaceholders[currentSrc as keyof typeof blurPlaceholders] ? 'blur' : 'empty'}
        blurDataURL={blurPlaceholders[currentSrc as keyof typeof blurPlaceholders]}
        quality={85}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width || 1920}
      height={height || 1080}
      className={className}
      sizes={sizes}
      style={{ objectFit }}
      priority={priority}
      loading={priority ? 'eager' : loading}
      placeholder={blurPlaceholders[currentSrc as keyof typeof blurPlaceholders] ? 'blur' : 'empty'}
      blurDataURL={blurPlaceholders[currentSrc as keyof typeof blurPlaceholders]}
      quality={85}
      onError={handleError}
    />
  );
}