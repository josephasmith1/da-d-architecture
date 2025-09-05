'use client';

import Script from 'next/script';

export function NimbataProvider() {
  return (
    <Script
      id="nimbata-tracking"
      src="https://cdn.dni.nimbata.com/28126052890.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        // Successfully loaded - no need to log in production
        if (typeof window !== 'undefined' && (window as unknown as { _nimbata?: unknown })._nimbata) {
          // Nimbata is ready and initialized
        }
      }}
      onError={() => {
        // Silently handle errors - likely due to ad blockers
        // Don't log to console to avoid cluttering production logs
      }}
    />
  );
}