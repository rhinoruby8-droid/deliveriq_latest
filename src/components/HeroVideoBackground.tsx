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
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch((e) => {
          if (e.name !== 'AbortError') {
            setIsAutoplayBlocked(true);
          }
        });
      }
    }
  }, [resolvedSrc]);

  if (config?.globalGifUrl) {
    return (
      <img
        src={config.globalGifUrl}
        className="absolute inset-0 object-cover w-full h-full -z-10 diq-hero-video-bg"
        style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        alt="Hero Background"
      />
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full -z-10 diq-hero-video-bg">
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
        className="w-full h-full object-cover pointer-events-none"
        style={{ willChange: 'transform', backfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
      />
      {isAutoplayBlocked && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-20 pointer-events-auto">
          <button 
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.play();
                setIsAutoplayBlocked(false);
              }
            }}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:brightness-110 transition-all shadow-lg"
          >
            <Play className="w-5 h-5" />
            Play Video
          </button>
        </div>
      )}
    </div>
  );
}
