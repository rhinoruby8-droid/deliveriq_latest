import React, { Suspense } from 'react';

import { useCmsContent } from '@/lib/cms-client';
import { HeroVideoBackground } from '@/components/HeroVideoBackground';

export function SessionsHeroVisual() {
  const { data: cms } = useCmsContent();
  const config = cms?.heroBannerConfig;
  const pageConfig = config?.pages?.['sessions'] || {};
  const alignment = pageConfig.alignment || config?.alignment || 'left';
  
  const alignClass = alignment === 'center' ? 'text-center items-center mx-auto' 
                   : alignment === 'right' ? 'text-right items-end ml-auto' 
                   : 'text-left items-start';

  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 diq-sessions-hero-section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HeroVideoBackground videoSrc="/assets/hero-loop_2.mp4" pageKey="sessions"  />
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10 diq-sessions-hero-container">
        <div className={`max-w-3xl flex flex-col ${alignClass} diq-sessions-hero-copy`}>
          {pageConfig.textContent ? (
            <div 
              className="cms-hero-content"
              style={{ color: config?.textColor || undefined }}
              dangerouslySetInnerHTML={{ __html: pageConfig.textContent }} 
            />
          ) : (
            <>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 diq-sessions-hero-eyebrow" style={{ color: config?.buttonColor || 'var(--primary)' }}>
                Live Sessions
              </p>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 diq-sessions-hero-headline" style={{ color: config?.textColor || undefined }}>
                Sessions are coming.
                <br />
                <span style={{ color: config?.buttonColor || 'var(--primary)' }}>Be first to know.</span>
              </h1>
              <p className="text-lg leading-relaxed max-w-xl diq-sessions-hero-subheadline" style={{ color: config?.textColor || 'var(--muted-foreground)' }}>
                We're building out the first wave of live sessions for project professionals. Register your interest below and we'll notify you the moment registration opens.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
