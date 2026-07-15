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
                    Apply to Speak
                  </p>
                </div>
                <div className="p-6">
                  <DynamicForm formId="speaker" />
                </div>
              </div>
            </div>
          </div>
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
