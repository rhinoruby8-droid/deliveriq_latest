import { Calendar, Zap, Users, RefreshCw } from 'lucide-react';
import type { GenericPageContent } from '@/lib/cms-client';
import { DynamicForm } from '../cms/DynamicForm';

interface RegisterVisualProps {
  data: GenericPageContent;
}

export function RegisterVisual({ data }: RegisterVisualProps) {
  const title = data.hero?.title || 'Registrations\nopening soon!';
  const subtitle = data.hero?.subtitle || 'Live sessions for project professionals who want to apply AI in real delivery work — not theory, not hype. Add your name below and we\'ll reach out the moment registration opens.';

  return (
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        backgroundImage: 'linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
        background: 'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(199,154,78,0.06) 0%, transparent 70%)'
      }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Info Copy */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#C79A4E] uppercase mb-4">
              Register Your Interest
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#F0EDE8] leading-tight mb-5 whitespace-pre-line">
              {title}
            </h1>
            <p className="text-lg text-[#8A8D96] leading-relaxed max-w-xl mb-8">
              {subtitle}
            </p>

            <ul className="flex flex-col gap-3">
              {data.sections && data.sections.length > 0 ? (
                data.sections.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#8A8D96]">
                    {i === 0 ? <Calendar size={15} className="text-[#C79A4E] shrink-0 mt-0.5" /> :
                     i === 1 ? <Zap size={15} className="text-[#C79A4E] shrink-0 mt-0.5" /> :
                     i === 2 ? <Users size={15} className="text-[#C79A4E] shrink-0 mt-0.5" /> :
                     <RefreshCw size={15} className="text-[#C79A4E] shrink-0 mt-0.5" />}
                    <div>
                      {s.title && <strong className="text-[#F0EDE8] block mb-0.5">{s.title}</strong>}
                      <span>{s.body}</span>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-3 text-sm text-[#8A8D96]">
                    <Calendar size={15} className="text-[#C79A4E] shrink-0 mt-0.5" />
                    Priority notification when registration opens
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#8A8D96]">
                    <Zap size={15} className="text-[#C79A4E] shrink-0 mt-0.5" />
                    Early access to session topics and schedules
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#8A8D96]">
                    <Users size={15} className="text-[#C79A4E] shrink-0 mt-0.5" />
                    Join a community of project professionals upskilling in AI
                  </li>
                  <li className="flex items-start gap-3 text-sm text-[#8A8D96]">
                    <RefreshCw size={15} className="text-[#C79A4E] shrink-0 mt-0.5" />
                    Replay access included with every session
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Right Column: Affixed Form Card */}
          <div className="lg:sticky lg:top-32 w-full">
            <div className="border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden shadow-2xl">
              <div className="px-6 py-5 border-b border-[#2C2F38] bg-[#1A1D24]/40">
                <p className="text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase">
                  Register your interest
                </p>
              </div>
              <div className="p-6">
                <DynamicForm formId="register" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
