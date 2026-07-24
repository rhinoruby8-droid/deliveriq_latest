import type { HeroBlock } from '@/lib/cms-client';

const EMPTY_HERO: HeroBlock = {
  eyebrow: '',
  headline: '',
  subheadline: '',
  primaryCta: { label: '', href: '' },
};

interface Props { value: HeroBlock; onChange: (v: HeroBlock) => void; }

const field = 'flex flex-col gap-1.5';
const label = 'text-[10px] font-bold text-muted-foreground uppercase tracking-wider';
const input = 'bg-background border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder-[#4A4D56] focus:outline-none focus:border-primary/60 transition-colors w-full';

export function HeroEditor({ value, onChange }: Props) {
  // Defensively merge with empty defaults so no property is ever undefined
  const safe: HeroBlock = { ...EMPTY_HERO, ...value, primaryCta: { ...EMPTY_HERO.primaryCta, ...(value?.primaryCta ?? {}) } };

  const set = (key: keyof HeroBlock, val: string) => onChange({ ...safe, [key]: val });
  const setCta = (which: 'primaryCta' | 'secondaryCta', subKey: 'label' | 'href', val: string) =>
    onChange({ ...safe, [which]: { ...(safe[which] || { label: '', href: '' }), [subKey]: val } });

  const headlineLen = safe.headline?.length ?? 0;

  return (
    <div className="flex flex-col gap-5 p-5 bg-background/60 border border-border rounded-sm">
      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Hero Section</p>

      <div className={field}>
        <label className={label}>Eyebrow label</label>
        <input className={input} value={safe.eyebrow || ''} onChange={e => set('eyebrow', e.target.value)} placeholder="e.g. AI-Powered Learning" />
      </div>

      <div className={field}>
        <label className={label}>Headline <span className="text-primary">*</span></label>
        <input className={input} value={safe.headline} onChange={e => set('headline', e.target.value)} placeholder="Main heading" />
        <span className={`text-[10px] ${headlineLen > 60 ? 'text-yellow-400' : 'text-[#4A4D56]'}`}>{headlineLen}/60 chars recommended</span>
      </div>

      <div className={field}>
        <label className={label}>Subheadline</label>
        <textarea className={`${input} resize-none`} rows={3} value={safe.subheadline || ''} onChange={e => set('subheadline', e.target.value)} placeholder="Supporting description" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={field}>
          <label className={label}>Primary Button Label</label>
          <input className={input} value={safe.primaryCta.label} onChange={e => setCta('primaryCta', 'label', e.target.value)} placeholder="View Sessions" />
        </div>
        <div className={field}>
          <label className={label}>Primary Button URL</label>
          <input className={input} value={safe.primaryCta.href} onChange={e => setCta('primaryCta', 'href', e.target.value)} placeholder="/sessions" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className={field}>
          <label className={label}>Secondary Button Label <span className="text-[#4A4D56] font-normal">(optional)</span></label>
          <input className={input} value={safe.secondaryCta?.label || ''} onChange={e => setCta('secondaryCta', 'label', e.target.value)} placeholder="Learn More" />
        </div>
        <div className={field}>
          <label className={label}>Secondary Button URL</label>
          <input className={input} value={safe.secondaryCta?.href || ''} onChange={e => setCta('secondaryCta', 'href', e.target.value)} placeholder="/about" />
        </div>
      </div>
    </div>
  );
}
