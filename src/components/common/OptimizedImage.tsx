'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import blurPlaceholders from '@/lib/blur-placeholders.json';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  className?: string;
  priority?: boolean;
  quality?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  className = "",
  priority = false,
  quality = 85,
  objectFit = 'cover',
  onLoad,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(src);
  
  const blurDataURL = blurPlaceholders[src as keyof typeof blurPlaceholders];
  
  useEffect(() => {
    // Preload critical images
    if (priority && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.setAttribute('imagesrcset', src);
      link.setAttribute('imagesizes', sizes);
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority, sizes]);
  
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };
  
  const handleError = () => {
    // Fallback to original image if optimized version fails
    if (imgSrc !== src) {
      setImgSrc(src);
    }
  };
  
  const commonProps = {
    src: imgSrc,
    alt,
    className: `${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`,
    sizes,
    quality,
    priority,
    loading: priority ? 'eager' : 'lazy',
    placeholder: blurDataURL ? 'blur' : 'empty',
    blurDataURL,
    onLoad: handleLoad,
    onError: handleError,
    style: { objectFit },
  };
  
  if (fill) {
    return <Image {...commonProps} fill />;
  }
  
  return (
    <Image
      {...commonProps}
      width={width || 1920}
      height={height || 1080}
    />
  );
}