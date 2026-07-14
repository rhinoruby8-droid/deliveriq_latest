interface MigrationPromptProps {
  onAutoMigrate: () => void;
  onStartFresh: () => void;
  onCancel: () => void;
  canAutoMigrate: boolean;
}

export function MigrationPrompt({ onAutoMigrate, onStartFresh, onCancel, canAutoMigrate }: MigrationPromptProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#21242C] border border-[#2C2F38] rounded-sm shadow-2xl">
        <div className="px-6 py-5 border-b border-[#2C2F38]">
          <h3 className="text-base font-bold text-[#F0EDE8]">Switch to Visual Editor?</h3>
          <p className="text-xs text-[#8A8D96] mt-1">
            This page has existing HTML content. How would you like to proceed?
          </p>
        </div>
        <div className="p-6 flex flex-col gap-3">
          {canAutoMigrate && (
            <button
              onClick={onAutoMigrate}
              className="w-full flex flex-col items-start px-4 py-3 bg-[#1A1D24] border border-[#C79A4E]/30 hover:border-[#C79A4E] rounded-sm text-left transition-all"
            >
              <span className="text-sm font-bold text-[#F0EDE8] mb-0.5">Auto-migrate HTML → blocks</span>
              <span className="text-xs text-[#8A8D96]">We'll convert your existing HTML into editable fields. Complex HTML may not convert perfectly.</span>
            </button>
          )}
          <button
            onClick={onStartFresh}
            className="w-full flex flex-col items-start px-4 py-3 bg-[#1A1D24] border border-[#2C2F38] hover:border-[#C79A4E]/30 rounded-sm text-left transition-all"
          >
            <span className="text-sm font-bold text-[#F0EDE8] mb-0.5">Start with default template</span>
            <span className="text-xs text-[#8A8D96]">Load a clean template. Your existing HTML is preserved and can be restored by switching back.</span>
          </button>
          {!canAutoMigrate && (
            <p className="text-[11px] text-yellow-500/80 bg-yellow-950/20 border border-yellow-900/30 rounded-sm px-3 py-2">
              Your HTML is too custom to auto-convert. You can start fresh or switch back to HTML mode anytime.
            </p>
          )}
          <button
            onClick={onCancel}
            className="text-xs text-[#8A8D96] hover:text-[#F0EDE8] transition-colors text-center py-1"
          >
            Cancel — keep HTML mode
          </button>
        </div>
      </div>
    </div>
  );
}
