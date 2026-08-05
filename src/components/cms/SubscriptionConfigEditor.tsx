import { Trash2, Plus } from 'lucide-react';
import type { SubscriptionConfig } from '@/lib/cms-client';

export function SubscriptionConfigEditor({
  config,
  onChange
}: {
  config: SubscriptionConfig;
  onChange: (updated: SubscriptionConfig) => void;
}) {

  const handleToggle = () => {
    onChange({ ...config, isSubscriptionActive: !config.isSubscriptionActive });
  };

  const addFeature = () => {
    onChange({ ...config, proFeaturesList: [...config.proFeaturesList, 'New feature'] });
  };

  const removeFeature = (index: number) => {
    onChange({
      ...config,
      proFeaturesList: config.proFeaturesList.filter((_, i) => i !== index)
    });
  };

  const updateFeature = (index: number, value: string) => {
    const list = [...config.proFeaturesList];
    list[index] = value;
    onChange({ ...config, proFeaturesList: list });
  };

  return (
    <div className="flex flex-col gap-10 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold mb-4">Subscription & Access Settings</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded border border-border">
            <div>
              <p className="font-semibold text-sm">Tier 3 (Pro) Subscriptions</p>
              <p className="text-xs text-muted-foreground mt-1">When disabled, Tier 3 checkouts will show as "Subscriptions Paused".</p>
            </div>
            <button
              onClick={handleToggle}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${config.isSubscriptionActive ? 'bg-primary' : 'bg-muted-foreground/30'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${config.isSubscriptionActive ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Access Durations</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Tier 2 Replay Access (months)</label>
              <input 
                type="number" 
                min={1} max={120}
                value={config.tier2DurationMonths} 
                onChange={(e) => onChange({ ...config, tier2DurationMonths: parseInt(e.target.value) || 1 })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">Duration for individual session replays.</p>
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Tier 3 Pro Duration (months)</label>
              <input 
                type="number" 
                min={1} max={120}
                value={config.tier3DurationMonths} 
                onChange={(e) => onChange({ ...config, tier3DurationMonths: parseInt(e.target.value) || 1 })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">Duration for all-access Pro membership.</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Pro Membership Pricing (USD)</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold mb-1 block">Tier 3 Price ($)</label>
            <input 
              type="number" 
              step="0.01"
              value={config.tier3PriceUSD} 
              onChange={(e) => onChange({ ...config, tier3PriceUSD: parseFloat(e.target.value) || 0 })}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Pro Features List (Marketing Copy)</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold mb-2 block">Displayed on Pro Upgrade Modals</label>
            {config.proFeaturesList.map((item, idx) => (
              <div key={idx} className="flex gap-3 mb-3 items-center">
                <input 
                  type="text" 
                  value={item} 
                  onChange={(e) => updateFeature(idx, e.target.value)}
                  className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm"
                  placeholder="Feature description"
                />
                <button type="button" onClick={() => removeFeature(idx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addFeature} className="mt-2 text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              <Plus size={14} /> Add Feature
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
