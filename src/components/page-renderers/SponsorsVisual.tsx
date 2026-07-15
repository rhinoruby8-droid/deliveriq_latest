import type { SponsorsPageContent } from '@/lib/cms-client';
import { ArrowRight, Check } from 'lucide-react';
import { SponsorIntakeForm } from '../SponsorIntakeForm';

const TIER_COLORS: Record<string, string> = {
  'Session Sponsor': 'border-[#CD7F32]/40 bg-[#CD7F32]/5',
  'Series Sponsor': 'border-[#9CA3AF]/40 bg-[#9CA3AF]/5',
  'Platform Partner': 'border-[#C79A4E]/40 bg-[#C79A4E]/5',
};

interface Props { data: SponsorsPageContent; }

export function SponsorsVisual({ data }: Props) {
  const { hero, tiers, cta } = data;
  return (
    <>
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          backgroundImage: 'linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)'
        }} />
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              {hero.eyebrow && <p className="text-[11px] font-semibold tracking-[0.2em] text-[#C79A4E] uppercase mb-4">{hero.eyebrow}</p>}
              <h1 className="text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-5 whitespace-pre-line">{hero.headline}</h1>
              <p className="text-lg text-[#8A8D96] leading-relaxed max-w-xl mb-8">{hero.subheadline}</p>
            </div>
            
            <div className="lg:sticky lg:top-32 w-full">
              <div className="border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden shadow-2xl">
                <div className="px-6 py-5 border-b border-[#2C2F38] bg-[#1A1D24]/40">
                  <p className="text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase">
                    Custom Partnerships & Inquiries
                  </p>
                </div>
                <div className="p-6">
                  <SponsorIntakeForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {tiers.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {tiers.map((t, i) => (
                <div key={i} className={`p-6 border rounded-sm ${TIER_COLORS[t.name] || 'border-[#2C2F38] bg-[#21242C]/40'}`}>
                  <p className="text-[10px] font-bold tracking-widest uppercase text-[#C79A4E] mb-2">{t.name}</p>
                  <p className="text-lg font-bold text-[#F0EDE8] mb-4">{t.priceLabel}</p>
                  <ul className="flex flex-col gap-2">
                    {t.benefits.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#8A8D96]">
                        <Check size={13} className="text-[#C79A4E] mt-0.5 shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="py-16 border-t border-[#2C2F38]">
        <div className="container mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#F0EDE8] mb-3">{cta.headline}</h2>
          {cta.subtext && <p className="text-sm text-[#8A8D96] mb-6">{cta.subtext}</p>}
          <a href={cta.buttonHref} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all hover:brightness-110">
            {cta.buttonLabel} <ArrowRight size={14} />
          </a>
        </div>
      </section>
    </>
  );
}
