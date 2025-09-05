'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

export function NimbataProvider() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Only log errors in development
    if (hasError && process.env.NODE_ENV === 'development') {
      console.warn('Nimbata tracking script failed to load. This may be due to ad blockers or network issues.');
    }
  }, [hasError]);

  // Don't render the script in development to avoid errors
  if (process.env.NODE_ENV === 'development') {
    return null;
  }

  return (
    <Script
      id="nimbata-tracking"
      src="https://cdn.dni.nimbata.com/28126052890.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        setIsLoaded(true);
        if (process.env.NODE_ENV === 'development') {
          console.log('Nimbata tracking script loaded successfully');
        }
      }}
      onError={() => {
        setHasError(true);
        // Silently handle error in production
        if (process.env.NODE_ENV === 'development') {
          console.warn('Nimbata tracking script could not be loaded');
        }
      }}
      onReady={() => {
        // Initialize Nimbata if needed
        if (typeof window !== 'undefined' && (window as any).Nimbata) {
          // Nimbata is ready
        }
      }}
    />
  );
}