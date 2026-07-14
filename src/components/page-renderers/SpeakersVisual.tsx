import type { SpeakersPageContent } from '@/lib/cms-client';
import { ArrowRight, Globe, Users, Award, Star, Zap } from 'lucide-react';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe, Users, Award, Star, Zap,
};

interface Props { data: SpeakersPageContent; }

export function SpeakersVisual({ data }: Props) {
  const { hero, benefits, cta } = data;
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
      {benefits.length > 0 && (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {benefits.map((b, i) => {
                const Icon = ICONS[b.icon] || Star;
                return (
                  <div key={i} className="p-6 border border-[#2C2F38] bg-[#21242C]/40 rounded-sm">
                    <Icon size={24} className="text-[#C79A4E] mb-4" />
                    <h3 className="text-base font-bold text-[#F0EDE8] mb-2">{b.title}</h3>
                    <p className="text-sm text-[#8A8D96] leading-relaxed">{b.description}</p>
                  </div>
                );
              })}
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
