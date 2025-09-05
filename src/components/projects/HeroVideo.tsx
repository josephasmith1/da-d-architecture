'use client';

import { useEffect, useRef } from 'react';

interface HeroVideoProps {
  mp4Src: string;
  webmSrc: string;
  poster?: string;
}

export function HeroVideo({ mp4Src, webmSrc, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enable native looping for the forward-reverse video
    video.loop = true;
    
    // Start playing the video
    video.play().catch(err => {
      console.log('Autoplay prevented, user interaction required:', err);
    });
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0"
        style={{ 
          width: '100vw',
          height: '100vh',
          minWidth: '100%',
          minHeight: '100%',
          objectFit: 'cover',
          objectPosition: 'center'
        }}
        autoPlay
        muted
        playsInline
        poster={poster}
        preload="auto"
      >
        <source src={webmSrc} type="video/webm" />
        <source src={mp4Src} type="video/mp4" />
      </video>
    </div>
  );
}