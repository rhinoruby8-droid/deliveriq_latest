import React, { Suspense } from 'react';
import type { SponsorsPageContent } from '@/lib/cms-client';
import { ArrowRight, Check } from 'lucide-react';
import { SponsorIntakeForm } from '../SponsorIntakeForm';

import { useCmsContent } from '@/lib/cms-client';
import { HeroVideoBackground } from '@/components/HeroVideoBackground';

const TIER_COLORS: Record<string, string> = {
  'Session Sponsor': 'border-[#CD7F32]/40 bg-[#CD7F32]/5',
  'Series Sponsor': 'border-[#9CA3AF]/40 bg-[#9CA3AF]/5',
  'Platform Partner': 'border-primary/40 bg-primary/5',
};

interface Props { data: SponsorsPageContent; }

export function SponsorsVisual({ data }: Props) {
  const { data: cms } = useCmsContent();
  const config = cms?.heroBannerConfig;
  const pageConfig = config?.pages?.['sponsors'] || {};
  const alignment = pageConfig.alignment || config?.alignment || 'left';
  
  const alignClass = alignment === 'center' ? 'text-center items-center mx-auto' 
                   : alignment === 'right' ? 'text-right items-end ml-auto' 
                   : 'text-left items-start';
  const { hero, tiers, cta } = data;
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20 diq-sponsors-hero-section">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <HeroVideoBackground pageKey="sponsors"  />
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 diq-sponsors-hero-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start diq-sponsors-hero-row">
            <div className={"flex flex-col " + alignClass + " diq-sponsors-hero-copy"}>
              {hero.eyebrow && <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-4 diq-sponsors-hero-eyebrow" style={{ color: config?.buttonColor || 'hsl(var(--primary))' }}>{hero.eyebrow}</p>}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5 whitespace-pre-line diq-sponsors-hero-headline" style={{ color: config?.textColor || undefined }}>{hero.headline}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 diq-sponsors-hero-subheadline" style={{ color: config?.textColor || 'hsl(var(--muted-foreground))' }}>{hero.subheadline}</p>
            </div>
            
            <div className="lg:sticky lg:top-32 w-full diq-sponsors-form-sticky-col">
              <div className="border border-border bg-card rounded-sm overflow-hidden shadow-2xl diq-sponsors-form-box">
                <div className="px-6 py-5 border-b border-border bg-background/40 diq-sponsors-form-header">
                  <p className="text-[10px] font-semibold tracking-widest text-primary uppercase diq-sponsors-form-title">
                    Custom Partnerships & Inquiries
                  </p>
                </div>
                <div className="p-6 diq-sponsors-form-body">
                  <SponsorIntakeForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {tiers.length > 0 && (
        <section className="py-16 diq-sponsors-tiers-section">
          <div className="container mx-auto px-6 lg:px-8 diq-sponsors-tiers-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 diq-sponsors-tiers-grid">
              {tiers.map((t, i) => (
                <div key={i} className={`p-6 border rounded-sm diq-sponsors-tier-card ${TIER_COLORS[t.name] || 'border-border bg-card/40'}`}>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-primary mb-2 diq-sponsors-tier-name">{t.name}</p>
                  <p className="text-lg font-bold text-foreground mb-4 diq-sponsors-tier-price">{t.priceLabel}</p>
                  <ul className="flex flex-col gap-2 diq-sponsors-tier-benefits-list">
                    {t.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground diq-sponsors-tier-benefit-item">
                        <Check size={13} className="text-primary mt-0.5 shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="py-16 border-t border-border diq-sponsors-cta-section">
        <div className="container mx-auto px-6 lg:px-8 text-center diq-sponsors-cta-container">
          <h2 className="text-2xl font-bold text-foreground mb-3 diq-sponsors-cta-headline">{cta.headline}</h2>
          {cta.subtext && <p className="text-sm text-muted-foreground mb-6 diq-sponsors-cta-subtext">{cta.subtext}</p>}
          <a href={cta.buttonHref} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-primary-foreground rounded transition-all hover:brightness-110 diq-sponsors-cta-btn">
            {cta.buttonLabel} <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
