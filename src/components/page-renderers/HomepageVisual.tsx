import React, { Suspense } from 'react';
import type { HomepageContent } from '@/lib/cms-client';
import { ArrowRight } from 'lucide-react';
import { useCmsContent } from '@/lib/cms-client';
import { HeroVideoBackground } from '@/components/HeroVideoBackground';


interface Props { data: HomepageContent; }

export function HomepageVisual({ data }: Props) {
  const { hero, stats, introParagraph } = data;
  const { data: cms } = useCmsContent();
  const config = cms?.heroBannerConfig;
  const pageConfig = config?.pages?.['homepage'] || {};
  const alignment = pageConfig.alignment || config?.alignment || 'left';
  
  const alignClass = alignment === 'center' ? 'text-center items-center mx-auto' 
                   : alignment === 'right' ? 'text-right items-end ml-auto' 
                   : 'text-left items-start';
  
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 diq-hero-section">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HeroVideoBackground pageKey="homepage"  />
        </div>
        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-4xl diq-hero-container">
          <div className={`flex flex-col ${alignClass} diq-hero-copy`}>
            {pageConfig.textContent ? (
              <div 
                className="cms-hero-content"
                style={{ color: config?.textColor || undefined }}
                dangerouslySetInnerHTML={{ __html: pageConfig.textContent }} 
              />
            ) : (
              <>
                {hero.eyebrow && (
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-4 diq-hero-eyebrow" style={{ color: config?.buttonColor || 'hsl(var(--primary))' }}>{hero.eyebrow}</p>
                )}
                <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold leading-[1.0] tracking-tight mb-6 diq-hero-headline" style={{ color: config?.textColor || undefined }}>{hero.headline}</h1>
                <p className="text-lg leading-relaxed max-w-xl mb-5 diq-hero-subheadline" style={{ color: config?.textColor || 'hsl(var(--muted-foreground))' }}>{hero.subheadline}</p>
                {introParagraph && (
                  <p className="text-sm leading-relaxed border-l-2 pl-4 mb-8 diq-hero-intro" style={{ color: config?.textColor || 'hsl(var(--primary))', borderColor: config?.buttonColor ? `${config.buttonColor}80` : 'hsl(var(--primary) / 0.5)' }}>{introParagraph}</p>
                )}
              </>
            )}
            <div className={`flex flex-wrap gap-4 ${alignment === 'center' ? 'justify-center' : alignment === 'right' ? 'justify-end' : ''} diq-hero-cta-group`}>
              <a href={hero.primaryCta.href} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-primary-foreground rounded transition-all hover:brightness-110 diq-hero-cta-primary" style={{ backgroundColor: config?.buttonColor || 'hsl(var(--primary))' }}>
                {hero.primaryCta.label} <ArrowRight size={14} />
              </a>
              {hero.secondaryCta && (
                <a href={hero.secondaryCta.href} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border text-foreground rounded hover:bg-muted transition-colors diq-hero-cta-secondary" style={{ borderColor: config?.buttonColor || 'hsl(var(--border))' }}>
                  {hero.secondaryCta.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* Stats */}
      {stats.length > 0 && (
        <section className="border-y border-border/60 bg-card/30 py-10 diq-stats-section">
          <div className="container mx-auto px-6 lg:px-8 diq-stats-container">
            <div className="flex flex-wrap justify-center gap-10 md:gap-16 diq-stats-row">
              {stats.map((s, i) => (
                <div key={i} className="text-center diq-stat-item">
                  <p className="text-3xl md:text-4xl font-bold text-primary diq-stat-value">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-semibold diq-stat-label">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
