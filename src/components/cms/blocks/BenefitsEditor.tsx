import { Plus, Trash2 } from 'lucide-react';
import type { BenefitItem } from '@/lib/cms-client';

interface Props { value: BenefitItem[]; onChange: (v: BenefitItem[]) => void; }

const input = 'bg-background border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder-[#4A4D56] focus:outline-none focus:border-primary/60 transition-colors w-full';
const lbl = 'text-[10px] font-bold text-muted-foreground uppercase tracking-wider';

export function BenefitsEditor({ value, onChange }: Props) {
  const safe = value ?? [];
  const update = (i: number, key: keyof BenefitItem, val: string) => {
    const next = [...safe];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const remove = (i: number) => onChange(safe.filter((_, idx) => idx !== i));
  const add = () => onChange([...safe, { icon: 'Star', title: '', description: '' }]);

  return (
    <div className="flex flex-col gap-4 p-5 bg-background/60 border border-border rounded-sm">
      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Benefits / Features</p>
      {safe.map((b, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 border border-border rounded-sm relative">
          <button onClick={() => remove(i)} className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={lbl}>Icon name</label>
              <input className={input} value={b.icon} onChange={e => update(i, 'icon', e.target.value)} placeholder="Globe" />
              <span className="text-[10px] text-[#4A4D56]">Lucide icon name e.g. Globe, Zap, Users</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={lbl}>Title</label>
              <input className={input} value={b.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Global Reach" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={lbl}>Description</label>
            <textarea className={`${input} resize-none`} rows={2} value={b.description} onChange={e => update(i, 'description', e.target.value)} placeholder="Short description" />
          </div>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-foreground transition-colors">
        <Plus size={13} /> Add Benefit
      </button>
    </div>
  );
}
