import { Plus, Trash2 } from 'lucide-react';
import type { DocumentPageContent, DocumentSection } from '@/lib/cms-client';

interface Props { value: DocumentPageContent; onChange: (v: DocumentPageContent) => void; }

const input = 'bg-background border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder-[#4A4D56] focus:outline-none focus:border-primary/60 transition-colors w-full';
const lbl = 'text-[10px] font-bold text-muted-foreground uppercase tracking-wider';
const field = 'flex flex-col gap-1.5';

export function DocumentEditor({ value, onChange }: Props) {
  const safeSections = value?.sections ?? [];
  const safe: DocumentPageContent = Object.assign(
    { visualMode: false as boolean, title: '', lastUpdated: '', sections: [] as typeof safeSections },
    value ?? {}
  );
  const updateSection = (i: number, key: keyof DocumentSection, val: string) => {
    const sections = [...safeSections];
    sections[i] = { ...sections[i], [key]: val };
    onChange({ ...safe, sections });
  };
  const removeSection = (i: number) => onChange({ ...safe, sections: safeSections.filter((_, idx) => idx !== i) });
  const addSection = () => onChange({ ...safe, sections: [...safeSections, { title: '', body: '' }] });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 p-5 bg-background/60 border border-border rounded-sm">
        <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Document Info</p>
        <div className={field}><label className={lbl}>Document Title</label><input className={input} value={value.title} onChange={e => onChange({ ...value, title: e.target.value })} placeholder="Privacy Policy" /></div>
        <div className={field}><label className={lbl}>Last Updated</label><input type="date" className={input} value={value.lastUpdated} onChange={e => onChange({ ...value, lastUpdated: e.target.value })} /></div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sections ({safeSections.length})</p>
          <button onClick={addSection} className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-foreground transition-colors"><Plus size={12} /> Add Section</button>
        </div>
        {safeSections.map((s, i) => (
          <div key={i} className="flex flex-col gap-3 p-4 bg-background/60 border border-border rounded-sm relative">
            <button onClick={() => removeSection(i)} className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
            <div className={field}><label className={lbl}>Section Title</label><input className={input} value={s.title} onChange={e => updateSection(i, 'title', e.target.value)} placeholder="Section heading" /></div>
            <div className={field}><label className={lbl}>Body</label><textarea className={`${input} resize-y`} rows={4} value={s.body} onChange={e => updateSection(i, 'body', e.target.value)} placeholder="Section content..." /></div>
          </div>
        ))}
      </div>
    </div>
  );
}
