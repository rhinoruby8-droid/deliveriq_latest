import type { SponsorsPageContent } from '@/lib/cms-client';
import { ArrowRight, Check } from 'lucide-react';

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
      <section className="relative overflow-hidden pt-20 pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-3xl text-center">
          {hero.eyebrow && <p className="text-[11px] font-semibold tracking-[0.2em] text-[#C79A4E] uppercase mb-4">{hero.eyebrow}</p>}
          <h1 className="text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-6">{hero.headline}</h1>
          <p className="text-base text-[#8A8D96] leading-relaxed mb-8 max-w-xl mx-auto">{hero.subheadline}</p>
          <a href={hero.primaryCta.href} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all hover:brightness-110">
            {hero.primaryCta.label} <ArrowRight size={14} />
          </a>
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
