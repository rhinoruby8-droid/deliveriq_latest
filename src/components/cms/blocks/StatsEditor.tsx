import { Plus, Trash2 } from 'lucide-react';
import type { StatBlock } from '@/lib/cms-client';

interface Props { value: StatBlock[]; onChange: (v: StatBlock[]) => void; }

const input = 'bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-3 py-2 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors w-full';

export function StatsEditor({ value, onChange }: Props) {
  const safe = value ?? [];
  const update = (i: number, key: keyof StatBlock, val: string) => {
    const next = [...safe];
    next[i] = { ...next[i], [key]: val };
    onChange(next);
  };
  const remove = (i: number) => onChange(safe.filter((_, idx) => idx !== i));
  const add = () => safe.length < 6 && onChange([...safe, { value: '', label: '' }]);

  return (
    <div className="flex flex-col gap-4 p-5 bg-[#1A1D24]/60 border border-[#2C2F38] rounded-sm">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-[#C79A4E] uppercase tracking-widest">Stats Row</p>
        <span className="text-[10px] text-[#4A4D56]">{safe.length}/6</span>
      </div>
      {safe.map((stat, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className={input} value={stat.value} onChange={e => update(i, 'value', e.target.value)} placeholder="2,000+" />
          <input className={input} value={stat.label} onChange={e => update(i, 'label', e.target.value)} placeholder="Project Professionals" />
          <button onClick={() => remove(i)} className="shrink-0 p-2 text-[#8A8D96] hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
        </div>
      ))}
      {safe.length < 6 && (
        <button onClick={add} className="flex items-center gap-1.5 text-xs font-semibold text-[#C79A4E] hover:text-[#F0EDE8] transition-colors">
          <Plus size={13} /> Add Stat
        </button>
      )}
    </div>
  );
}
