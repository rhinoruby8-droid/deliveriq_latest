import type { ContactPageContent } from '@/lib/cms-client';

interface Props { value: ContactPageContent; onChange: (v: ContactPageContent) => void; }

const input = 'bg-background border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder-[#4A4D56] focus:outline-none focus:border-primary/60 transition-colors w-full';
const lbl = 'text-[10px] font-bold text-muted-foreground uppercase tracking-wider';
const field = 'flex flex-col gap-1.5';

export function ContactEditor({ value, onChange }: Props) {
  const set = <K extends keyof ContactPageContent>(key: K, val: ContactPageContent[K]) => onChange({ ...value, [key]: val });
  const setHero = (key: 'title' | 'subtitle', val: string) => onChange({ ...value, hero: { ...value.hero, [key]: val } });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 p-5 bg-background/60 border border-border rounded-sm">
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Page Header</p>
        <div className={field}><label className={lbl}>Title</label><input className={input} value={value.hero.title} onChange={e => setHero('title', e.target.value)} placeholder="Get in Touch" /></div>
        <div className={field}><label className={lbl}>Subtitle</label><textarea className={`${input} resize-none`} rows={2} value={value.hero.subtitle} onChange={e => setHero('subtitle', e.target.value)} placeholder="We'd love to hear from you." /></div>
      </div>
      <div className="flex flex-col gap-4 p-5 bg-background/60 border border-border rounded-sm">
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Contact Details</p>
        <div className={field}><label className={lbl}>Email</label><input type="email" className={input} value={value.email || ''} onChange={e => set('email', e.target.value)} placeholder="hello@deliveriq.live" /></div>
        <div className={field}><label className={lbl}>Phone <span className="text-[#4A4D56] font-normal">(optional)</span></label><input type="tel" className={input} value={value.phone || ''} onChange={e => set('phone', e.target.value)} placeholder="+44 20 1234 5678" /></div>
        <div className={field}><label className={lbl}>Office Address <span className="text-[#4A4D56] font-normal">(optional)</span></label><textarea className={`${input} resize-none`} rows={2} value={value.address || ''} onChange={e => set('address', e.target.value)} placeholder="123 Street, City, Country" /></div>
        <div className={field}><label className={lbl}>Form Intro Text</label><textarea className={`${input} resize-none`} rows={2} value={value.formIntro || ''} onChange={e => set('formIntro', e.target.value)} placeholder="Fill out the form and we'll respond within 2 business days." /></div>
      </div>
    </div>
  );
}
