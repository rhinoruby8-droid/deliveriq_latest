import type { CtaBlock } from '@/lib/cms-client';

interface Props { value: CtaBlock; onChange: (v: CtaBlock) => void; }

const input = 'bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-3 py-2 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors w-full';
const lbl = 'text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider';
const field = 'flex flex-col gap-1.5';

export function CtaEditor({ value, onChange }: Props) {
  const set = (key: keyof CtaBlock, val: string) => onChange({ ...value, [key]: val });
  return (
    <div className="flex flex-col gap-4 p-5 bg-[#1A1D24]/60 border border-[#2C2F38] rounded-sm">
      <p className="text-[10px] font-bold text-[#C79A4E] uppercase tracking-widest">Call to Action Banner</p>
      <div className={field}><label className={lbl}>Headline</label><input className={input} value={value.headline} onChange={e => set('headline', e.target.value)} placeholder="Ready to get started?" /></div>
      <div className={field}><label className={lbl}>Subtext <span className="text-[#4A4D56] font-normal">(optional)</span></label><input className={input} value={value.subtext || ''} onChange={e => set('subtext', e.target.value)} placeholder="Supporting text" /></div>
      <div className="grid grid-cols-2 gap-3">
        <div className={field}><label className={lbl}>Button Label</label><input className={input} value={value.buttonLabel} onChange={e => set('buttonLabel', e.target.value)} placeholder="Get in Touch" /></div>
        <div className={field}><label className={lbl}>Button URL</label><input className={input} value={value.buttonHref} onChange={e => set('buttonHref', e.target.value)} placeholder="/contact" /></div>
      </div>
    </div>
  );
}
