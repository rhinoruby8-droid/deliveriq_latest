interface ModeToggleProps {
  mode: 'visual' | 'html';
  onChange: (mode: 'visual' | 'html') => void;
  hasExistingHtml?: boolean;
}

export function ModeToggle({ mode, onChange, hasExistingHtml }: ModeToggleProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="inline-flex bg-background border border-border rounded-sm p-0.5">
        <button
          onClick={() => onChange('visual')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-xs font-semibold transition-all ${
            mode === 'visual'
              ? 'bg-primary text-[#1A1D24] shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span>🎨</span> Visual
        </button>
        <button
          onClick={() => onChange('html')}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-xs font-semibold transition-all ${
            mode === 'html'
              ? 'bg-muted text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="font-mono text-[10px]">&lt;/&gt;</span> HTML
        </button>
      </div>
      {mode === 'visual' && hasExistingHtml && (
        <span className="text-[10px] text-muted-foreground italic">Editing structured content — HTML auto-syncs on save</span>
      )}
    </div>
  );
}
