interface TextBlock { title?: string; body: string; }
interface Props { value: TextBlock; onChange: (v: TextBlock) => void; label?: string; showTitle?: boolean; }

const input = 'bg-background border border-border rounded-sm px-3 py-2 text-sm text-foreground placeholder-[#4A4D56] focus:outline-none focus:border-primary/60 transition-colors w-full';
const lbl = 'text-[10px] font-bold text-muted-foreground uppercase tracking-wider';

export function TextBlockEditor({ value, onChange, label = 'Text Block', showTitle = true }: Props) {
  return (
    <div className="flex flex-col gap-4 p-5 bg-background/60 border border-border rounded-sm">
      <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{label}</p>
      {showTitle && (
        <div className="flex flex-col gap-1.5">
          <label className={lbl}>Section Title <span className="text-[#4A4D56] font-normal">(optional)</span></label>
          <input className={input} value={value.title || ''} onChange={e => onChange({ ...value, title: e.target.value })} placeholder="Section heading" />
        </div>
      )}
      <div className="flex flex-col gap-1.5">
        <label className={lbl}>Body Text</label>
        <textarea className={`${input} resize-y`} rows={4} value={value.body} onChange={e => onChange({ ...value, body: e.target.value })} placeholder="Write your content here... no HTML needed." />
      </div>
    </div>
  );
}
