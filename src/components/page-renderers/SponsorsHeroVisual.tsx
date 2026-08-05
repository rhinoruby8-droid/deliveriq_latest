import React, { Suspense } from 'react';

import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { motion } from 'motion/react';
import { HeroVideoBackground } from '@/components/HeroVideoBackground';
export function SponsorsHeroVisual() {
  const { data } = useCmsContent();
  const cms = data || FALLBACK_CMS_CONTENT;
  const config = cms.heroBannerConfig;
  const pageConfig = config?.pages?.['sponsors'] || {};
  const alignment = pageConfig.alignment || config?.alignment || 'left';
  const extendedData = cms.globalSiteContent!.sponsorsExtended;
  
  const alignClass = alignment === 'center' ? 'text-center items-center mx-auto' 
                   : alignment === 'right' ? 'text-right items-end ml-auto' 
                   : 'text-left items-start';

  return (
    <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-20 diq-sponsors-hero-section">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <HeroVideoBackground videoSrc="/assets/hero-loop_sponsor.mp4" pageKey="sponsors"  />
      </div>
      <div className="container mx-auto px-6 lg:px-8 relative z-10 diq-sponsors-hero-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center diq-sponsors-hero-row">
          <div className={`flex flex-col ${alignClass} diq-sponsors-hero-copy`}>
            {pageConfig.textContent ? (
              <div 
                className="cms-hero-content"
                style={{ color: config?.textColor || undefined }}
                dangerouslySetInnerHTML={{ __html: pageConfig.textContent }} 
              />
            ) : (
              <>
                <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4 diq-sponsors-hero-eyebrow" style={{ color: config?.buttonColor || 'var(--primary)' }}>
                  For Sponsors
                </p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5 diq-sponsors-hero-headline" style={{ color: config?.textColor || undefined }}>
                  Be in the room
                  <br />
                  <span style={{ color: config?.buttonColor || 'var(--primary)' }}>where project pros learn.</span>
                </h1>
                <p className="text-lg leading-relaxed max-w-xl mb-8 diq-sponsors-hero-subheadline" style={{ color: config?.textColor || 'var(--muted-foreground)' }}>
                  DeliverIQ brings together a focused audience of project management, project controls, and delivery professionals. Sponsorship puts your brand alongside content they actively seek out.
                </p>
              </>
            )}
            <div className="mt-8 diq-sponsors-hero-cta">
              <a href="#enquire" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-[#1A1D24] rounded hover:brightness-110 transition-all" style={{ backgroundColor: config?.buttonColor || 'var(--primary)' }}>
                Enquire about sponsorship &rarr;
              </a>
            </div>
          </div>
          <div className="diq-sponsors-hero-preview">
            <Card className="border-border bg-card shadow-xl">
              <CardHeader className="border-b border-border pb-4">
                <CardTitle className="text-[10px] font-semibold tracking-widest text-primary uppercase">
                  Audience Demographics
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Who attends DeliverIQ live sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {extendedData.audienceDemographics.map((row, i) => (
                    <div key={row.role}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-foreground font-medium">{row.role}</span>
                        <motion.span 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + (i * 0.1) }}
                          className="text-sm font-bold text-primary"
                        >
                          {row.percentage}%
                        </motion.span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#C79A4E] to-[#e0bc7f] rounded-full"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${row.percentage}%` }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <div className="px-6 py-4 border-t border-border bg-background rounded-b-lg">
                <p className="text-[11px] text-muted-foreground">{extendedData.audienceDemographicsFootnote}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
