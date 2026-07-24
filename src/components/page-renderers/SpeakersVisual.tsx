import type { SpeakersPageContent } from '@/lib/cms-client';
import { ArrowRight, Globe, Users, Award, Star, Zap } from 'lucide-react';
import { DynamicForm } from '../cms/DynamicForm';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe, Users, Award, Star, Zap,
};

interface Props { data: SpeakersPageContent; }

export function SpeakersVisual({ data }: Props) {
  const { hero, benefits, cta } = data;
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20 diq-speakers-hero-section">
        <div className="absolute inset-0 pointer-events-none diq-speakers-hero-grid-bg" aria-hidden="true" style={{
          backgroundImage: 'linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute inset-0 pointer-events-none diq-speakers-hero-glow-bg" aria-hidden="true" style={{
          background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)'
        }} />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10 diq-speakers-hero-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start diq-speakers-hero-row">
            <div className="diq-speakers-hero-copy">
              {hero.eyebrow && <p className="text-[11px] font-semibold tracking-[0.2em] text-primary uppercase mb-4 diq-speakers-hero-eyebrow">{hero.eyebrow}</p>}
              <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5 whitespace-pre-line diq-speakers-hero-headline">{hero.headline}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 diq-speakers-hero-subheadline">{hero.subheadline}</p>
            </div>
            
            <div className="lg:sticky lg:top-32 w-full diq-speakers-form-sticky-col">
              <div className="border border-border bg-card rounded-sm overflow-hidden shadow-2xl diq-speakers-form-box">
                <div className="px-6 py-5 border-b border-border bg-background/40 diq-speakers-form-header">
                  <p className="text-[10px] font-semibold tracking-widest text-primary uppercase diq-speakers-form-title">
                    Apply to Speak
                  </p>
                </div>
                <div className="p-6 diq-speakers-form-body">
                  <DynamicForm formId="speaker" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {benefits.length > 0 && (
        <section className="py-16 lg:py-20 diq-speakers-benefits-section">
          <div className="container mx-auto px-6 lg:px-8 diq-speakers-benefits-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 diq-speakers-benefits-grid">
              {benefits.map((b, i) => {
                const Icon = ICONS[b.icon] || Star;
                return (
                  <div key={i} className="p-6 border border-border bg-card/40 rounded-sm diq-speakers-benefit-card">
                    <Icon size={24} className="text-primary mb-4" />
                    <h3 className="text-base font-bold text-foreground mb-2 diq-speakers-benefit-title">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed diq-speakers-benefit-description">{b.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}
      <section className="py-16 border-t border-border diq-speakers-cta-section">
        <div className="container mx-auto px-6 lg:px-8 text-center diq-speakers-cta-container">
          <h2 className="text-2xl font-bold text-foreground mb-3 diq-speakers-cta-headline">{cta.headline}</h2>
          {cta.subtext && <p className="text-sm text-muted-foreground mb-6 diq-speakers-cta-subtext">{cta.subtext}</p>}
          <a href={cta.buttonHref} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-primary text-[#1A1D24] rounded transition-all hover:brightness-110 diq-speakers-cta-btn">
            {cta.buttonLabel} <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
