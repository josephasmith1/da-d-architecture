'use client';

import Script from 'next/script';

export function NimbataProvider() {
  return (
    <Script
      id="nimbata-tracking"
      src="//cdn.dni.nimbata.com/28126052890.min.js"
      strategy="afterInteractive"
      onLoad={() => {
        console.log('Nimbata tracking script loaded successfully');
      }}
      onError={(error) => {
        console.error('Error loading Nimbata tracking script:', error);
      }}
    />
  );
}