import { Plus, Trash2 } from 'lucide-react';
import type { SponsorTier } from '@/lib/cms-client';

interface Props { value: SponsorTier[]; onChange: (v: SponsorTier[]) => void; }

const input = 'bg-background border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder-[#4A4D56] focus:outline-none focus:border-primary/60 transition-colors w-full';
const lbl = 'text-[10px] font-bold text-muted-foreground uppercase tracking-wider';

export function TiersEditor({ value, onChange }: Props) {
  const safe = value ?? [];
  const updateTier = (i: number, key: keyof SponsorTier, val: string | string[]) => {
    const next = [...safe]; next[i] = { ...next[i], [key]: val }; onChange(next);
  };
  const addBenefit = (i: number) => updateTier(i, 'benefits', [...(safe[i].benefits ?? []), '']);
  const updateBenefit = (i: number, j: number, val: string) => {
    const benefits = [...(safe[i].benefits ?? [])]; benefits[j] = val; updateTier(i, 'benefits', benefits);
  };
  const removeBenefit = (i: number, j: number) => updateTier(i, 'benefits', (safe[i].benefits ?? []).filter((_, idx) => idx !== j));
  const removeTier = (i: number) => onChange(safe.filter((_, idx) => idx !== i));
  const addTier = () => onChange([...safe, { name: 'New Tier', priceLabel: '', benefits: [''] }]);

  return (
    <div className="flex flex-col gap-4 p-5 bg-background/60 border border-border rounded-sm">
      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Sponsorship Tiers</p>
      {safe.map((tier, i) => (
        <div key={i} className="flex flex-col gap-3 p-4 border border-border rounded-sm relative">
          <button onClick={() => removeTier(i)} className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 size={12} /></button>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5"><label className={lbl}>Tier Name</label><input className={input} value={tier.name} onChange={e => updateTier(i, 'name', e.target.value)} placeholder="Gold" /></div>
            <div className="flex flex-col gap-1.5"><label className={lbl}>Price / Label</label><input className={input} value={tier.priceLabel} onChange={e => updateTier(i, 'priceLabel', e.target.value)} placeholder="Contact us" /></div>
          </div>
          <div className="flex flex-col gap-2">
            <label className={lbl}>Benefits</label>
            {tier.benefits.map((b, j) => (
              <div key={j} className="flex items-center gap-2">
                <input className={input} value={b} onChange={e => updateBenefit(i, j, e.target.value)} placeholder="Benefit description" />
                <button onClick={() => removeBenefit(i, j)} className="shrink-0 p-1.5 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 size={11} /></button>
              </div>
            ))}
            <button onClick={() => addBenefit(i)} className="flex items-center gap-1 text-xs text-primary hover:text-foreground transition-colors"><Plus size={11} /> Add benefit</button>
          </div>
        </div>
      ))}
      <button onClick={addTier} className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-foreground transition-colors"><Plus size={13} /> Add Tier</button>
    </div>
  );
}
