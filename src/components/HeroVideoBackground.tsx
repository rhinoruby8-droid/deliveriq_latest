import { useCmsContent } from '@/lib/cms-client';
import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface HeroVideoBackgroundProps {
  videoSrc?: string;
  pageKey?: string;
}

export function HeroVideoBackground({ videoSrc, pageKey }: HeroVideoBackgroundProps) {
  const { data: cms } = useCmsContent();
  const config = cms?.heroBannerConfig;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  
  const resolvedSrc = videoSrc 
    || (pageKey && config?.pages?.[pageKey]?.videoUrl)
    || config?.globalVideoUrl 
    || '/assets/hero-loop.mp4';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => {
        if (e.name !== 'AbortError') {
          console.warn('Hero video autoplay notice:', e);
        }
      });
    }
  }, [resolvedSrc]);

  if (config?.globalGifUrl) {
    return (
      <img
        src={config.globalGifUrl}
        className="absolute inset-0 object-cover w-full h-full -z-10 diq-hero-video-bg opacity-40 pointer-events-none"
        style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        alt="Hero Background"
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full -z-10 diq-hero-video-bg pointer-events-none overflow-hidden">
      <video
        ref={videoRef}
        key={resolvedSrc}
        src={resolvedSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/assets/hero-image.png"
        className="w-full h-full object-cover opacity-50 transition-opacity duration-700"
        style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      />
    </div>
  );
}
