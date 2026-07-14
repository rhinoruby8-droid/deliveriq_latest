import type { HomepageContent } from '@/lib/cms-client';
import { ArrowRight } from 'lucide-react';

interface Props { data: HomepageContent; }

export function HomepageVisual({ data }: Props) {
  const { hero, stats, introParagraph } = data;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'linear-gradient(rgba(44,47,56,0.35) 1px,transparent 1px),linear-gradient(90deg,rgba(44,47,56,0.35) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 0% 50%,rgba(199,154,78,0.08) 0%,transparent 70%)' }} />
        <div className="container mx-auto px-6 lg:px-8 relative z-10 max-w-4xl">
          {hero.eyebrow && (
            <p className="text-[11px] font-semibold tracking-[0.2em] text-[#C79A4E] uppercase mb-4">{hero.eyebrow}</p>
          )}
          <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold text-[#F0EDE8] leading-[1.0] tracking-tight mb-6">{hero.headline}</h1>
          <p className="text-lg text-[#8A8D96] leading-relaxed max-w-xl mb-5">{hero.subheadline}</p>
          {introParagraph && (
            <p className="text-sm text-[#C0B89A] leading-relaxed border-l-2 border-[#C79A4E]/50 pl-4 mb-8">{introParagraph}</p>
          )}
          <div className="flex flex-wrap gap-4">
            <a href={hero.primaryCta.href} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all hover:brightness-110">
              {hero.primaryCta.label} <ArrowRight size={14} />
            </a>
            {hero.secondaryCta && (
              <a href={hero.secondaryCta.href} className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold border border-[#2C2F38] text-[#F0EDE8] rounded hover:bg-[#2C2F38] transition-colors">
                {hero.secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </section>
      {/* Stats */}
      {stats.length > 0 && (
        <section className="border-y border-[#2C2F38]/60 bg-[#21242C]/30 py-10">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-10 md:gap-16">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-[#C79A4E]">{s.value}</p>
                  <p className="text-xs text-[#8A8D96] mt-1 uppercase tracking-widest font-semibold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
