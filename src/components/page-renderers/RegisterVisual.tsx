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
    <section className="relative overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-20 diq-register-hero-section">
      {/* Grid Background */}
      <div className="absolute inset-0 pointer-events-none diq-register-hero-grid-bg" aria-hidden="true" style={{
        backgroundImage: 'linear-gradient(rgba(44,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(44,47,56,0.35) 1px, transparent 1px)',
        backgroundSize: '48px 48px'
      }} />
      <div className="absolute inset-0 pointer-events-none diq-register-hero-glow-bg" aria-hidden="true" style={{
        background: 'radial-gradient(ellipse 50% 60% at 20% 50%, hsl(var(--primary) / 0.06) 0%, transparent 70%)'
      }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 diq-register-hero-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start diq-register-hero-row">
          {/* Left Column: Info Copy */}
          <div className="diq-register-hero-copy">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase mb-4 diq-register-hero-eyebrow">
              Register Your Interest
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5 whitespace-pre-line diq-register-hero-headline">
              {title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mb-8 diq-register-hero-subheadline">
              {subtitle}
            </p>

            <ul className="flex flex-col gap-3 diq-register-bullet-list">
              {data.sections && data.sections.length > 0 ? (
                data.sections.map((s, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground diq-register-bullet-item">
                    {i === 0 ? <Calendar size={15} className="text-primary shrink-0 mt-0.5" /> :
                     i === 1 ? <Zap size={15} className="text-primary shrink-0 mt-0.5" /> :
                     i === 2 ? <Users size={15} className="text-primary shrink-0 mt-0.5" /> :
                     <RefreshCw size={15} className="text-primary shrink-0 mt-0.5" />}
                    <div className="diq-register-bullet-text">
                      {s.title && <strong className="text-foreground block mb-0.5 diq-register-bullet-title">{s.title}</strong>}
                      <span className="diq-register-bullet-body">{s.body}</span>
                    </div>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground diq-register-bullet-item">
                    <Calendar size={15} className="text-primary shrink-0 mt-0.5" />
                    Priority notification when registration opens
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground diq-register-bullet-item">
                    <Zap size={15} className="text-primary shrink-0 mt-0.5" />
                    Early access to session topics and schedules
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground diq-register-bullet-item">
                    <Users size={15} className="text-primary shrink-0 mt-0.5" />
                    Join a community of project professionals upskilling in AI
                  </li>
                  <li className="flex items-start gap-3 text-sm text-muted-foreground diq-register-bullet-item">
                    <RefreshCw size={15} className="text-primary shrink-0 mt-0.5" />
                    Replay access included with every session
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Right Column: Affixed Form Card */}
          <div className="lg:sticky lg:top-32 w-full diq-register-form-sticky-col">
            <div className="border border-border bg-card rounded-sm overflow-hidden shadow-2xl diq-register-form-box">
              <div className="px-6 py-5 border-b border-border bg-background/40 diq-register-form-header">
                <p className="text-[10px] font-semibold tracking-widest text-primary uppercase diq-register-form-title">
                  Register your interest
                </p>
              </div>
              <div className="p-6 diq-register-form-body">
                <DynamicForm formId="register" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
