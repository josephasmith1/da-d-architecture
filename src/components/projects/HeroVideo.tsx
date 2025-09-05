'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  mp4Src: string;
  webmSrc: string;
  poster?: string;
}

export function HeroVideo({ mp4Src, webmSrc, poster }: HeroVideoProps) {
  const videoForwardRef = useRef<HTMLVideoElement>(null);
  const videoBackwardRef = useRef<HTMLVideoElement>(null);
  const [showForward, setShowForward] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const videoForward = videoForwardRef.current;
    const videoBackward = videoBackwardRef.current;
    if (!videoForward || !videoBackward) return;

    // Start playing the forward video
    videoForward.play().catch(err => console.log('Autoplay prevented:', err));

    const handleForwardEnded = () => {
      // When forward video ends, prepare and show backward video
      setIsTransitioning(true);
      videoBackward.currentTime = videoBackward.duration;
      
      // Create reverse playback by stepping backwards through frames
      const reversePlay = () => {
        if (videoBackward.currentTime > 0.1) {
          videoBackward.currentTime = Math.max(0, videoBackward.currentTime - 0.033); // ~30fps
          requestAnimationFrame(reversePlay);
        } else {
          // Switch back to forward
          setShowForward(true);
          setIsTransitioning(false);
          videoForward.currentTime = 0;
          videoForward.play();
        }
      };
      
      setShowForward(false);
      requestAnimationFrame(reversePlay);
    };

    // Alternative approach: Use a single video and control playback manually
    const alternativeApproach = () => {
      let direction = 1; // 1 for forward, -1 for backward
      let currentTime = 0;
      let animationId: number;

      const animate = () => {
        if (!videoForward) return;
        
        if (direction === 1) {
          // Playing forward
          if (!videoForward.paused && videoForward.currentTime < videoForward.duration - 0.1) {
            // Let video play naturally
          } else if (videoForward.currentTime >= videoForward.duration - 0.1) {
            // Reached end, switch to reverse
            direction = -1;
            videoForward.pause();
            currentTime = videoForward.duration;
          }
        } else {
          // Playing backward
          currentTime = Math.max(0, currentTime - 0.033); // ~30fps
          videoForward.currentTime = currentTime;
          
          if (currentTime <= 0.1) {
            // Reached beginning, switch to forward
            direction = 1;
            videoForward.currentTime = 0;
            videoForward.play();
          }
        }
        
        animationId = requestAnimationFrame(animate);
      };

      videoForward.addEventListener('ended', () => {
        direction = -1;
        currentTime = videoForward.duration;
        animate();
      });

      return () => {
        if (animationId) cancelAnimationFrame(animationId);
      };
    };

    // Use the simpler single-video approach
    return alternativeApproach();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Video container that ensures full coverage */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoForwardRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          style={{ 
            minWidth: '100vw',
            minHeight: '100vh',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.05)', // Slight scale to ensure no edges show
            objectFit: 'cover'
          }}
          muted
          playsInline
          poster={poster}
          preload="auto"
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
        
        {/* Hidden second video for smoother reverse (optional) */}
        <video
          ref={videoBackwardRef}
          className="absolute top-0 left-0 w-full h-full object-cover opacity-0"
          style={{ 
            minWidth: '100vw',
            minHeight: '100vh',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) scale(1.05)',
            objectFit: 'cover',
            display: showForward ? 'none' : 'block',
            opacity: showForward ? 0 : 1
          }}
          muted
          playsInline
          preload="auto"
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}