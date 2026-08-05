import React, { Suspense, useState, useRef } from 'react';
import { Play } from 'lucide-react';

import { useCmsContent } from '@/lib/cms-client';
import { HeroVideoBackground } from '@/components/HeroVideoBackground';

export function SpeakersHeroVisual() {
  const { data: cms } = useCmsContent();
  const config = cms?.heroBannerConfig;
  const pageConfig = config?.pages?.['speakers'] || {};
  const alignment = pageConfig.alignment || config?.alignment || 'left';
  
  const alignClass = alignment === 'center' ? 'text-center items-center mx-auto' 
                   : alignment === 'right' ? 'text-right items-end ml-auto' 
                   : 'text-left items-start';

  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 diq-speakers-hero-section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HeroVideoBackground videoSrc="/assets/hero-loop_speaker.mp4" pageKey="speakers"  />
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10 diq-speakers-hero-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center diq-speakers-hero-row">
          <div className={`flex flex-col ${alignClass} diq-speakers-hero-copy`}>
            {pageConfig.textContent ? (
              <div 
                className="cms-hero-content"
                style={{ color: config?.textColor || undefined }}
                dangerouslySetInnerHTML={{ __html: pageConfig.textContent }} 
              />
            ) : (
              <>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 diq-speakers-hero-eyebrow" style={{ color: config?.buttonColor || 'var(--primary)' }}>
                  For Speakers
                </p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 diq-speakers-hero-headline" style={{ color: config?.textColor || undefined }}>
                  Teach what you know.
                  <br />
                  <span style={{ color: config?.buttonColor || 'var(--primary)' }}>To the people who need it.</span>
                </h1>
                <p className="text-lg leading-relaxed max-w-xl mb-8 diq-speakers-hero-subheadline" style={{ color: config?.textColor || 'var(--muted-foreground)' }}>
                  DeliverIQ brings together project professionals who want practical AI skills. If you use AI in real project work and have something valuable to share, we want to hear from you.
                </p>
              </>
            )}
            <div className="mt-8 diq-speakers-hero-cta">
              <a href="#apply" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#1A1D24] rounded hover:brightness-110 transition-all" style={{ backgroundColor: config?.buttonColor || 'var(--primary)' }}>
                Apply to speak &rarr;
              </a>
            </div>
          </div>
          <div className="diq-speakers-hero-preview">
            <div className="relative rounded-sm overflow-hidden border border-border">
              <div className="aspect-video bg-muted relative">
                <video 
                  ref={(el) => {
                    videoRef.current = el;
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = true;
                      const playPromise = el.play();
                      if (playPromise !== undefined) {
                        playPromise.catch((e) => {
                          if (e.name !== 'AbortError') {
                            setIsAutoplayBlocked(true);
                          }
                        });
                      }
                    }
                  }}
                  src="/airo-assets/videos/pages/speakers/preview.mp4" 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  preload="auto"
                  className="w-full h-full object-cover opacity-90 pointer-events-none" 
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
                      className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full font-semibold hover:brightness-110 transition-all shadow-lg text-sm"
                    >
                      <Play className="w-4 h-4" />
                      Play Video
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-card px-4 py-3 border-t border-border">
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: config?.buttonColor || 'var(--primary)' }}>Share your expertise with project professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
