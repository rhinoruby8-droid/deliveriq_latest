import React, { useState } from 'react';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';
import { getUserToken } from '@/lib/user-auth';
import { FALLBACK_CMS_CONTENT, type CmsContent } from '@/lib/cms-client';

export function ImageUploader({ 
  label, 
  value, 
  onChange, 
  onClear 
}: { 
  label: string; 
  value?: string; 
  onChange: (url: string) => void;
  onClear: () => void;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setProgress(0);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const base64data = (reader.result as string).split(',')[1];
      const xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/cms/upload', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${getUserToken()}`);
      
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          setProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
      
      xhr.onload = () => {
        setIsUploading(false);
        if (xhr.status >= 200 && xhr.status < 300) {
          const { url } = JSON.parse(xhr.responseText);
          onChange(url);
        } else {
          alert('Failed to upload image.');
        }
        e.target.value = '';
      };
      
      xhr.onerror = () => {
        setIsUploading(false);
        alert('Failed to upload image.');
        e.target.value = '';
      };
      
      xhr.send(JSON.stringify({ filename: file.name, base64data, contentType: file.type }));
    };
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold">{label}</label>
      <div className="flex items-center gap-3">
        <input 
          type="text" 
          value={value || ''} 
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm"
          placeholder="https://..."
        />
        {value && (
          <button type="button" onClick={onClear} className="text-red-500 hover:text-red-400 text-sm font-semibold">
            Clear
          </button>
        )}
        <div className="relative overflow-hidden inline-block cursor-pointer">
          <button type="button" disabled={isUploading} className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded font-semibold text-xs whitespace-nowrap transition-colors flex items-center gap-2">
            {isUploading ? <RefreshCw className="animate-spin" size={14} /> : <Plus size={14} />}
            {isUploading ? `Uploading... ${progress}%` : 'Upload Image'}
          </button>
          <input 
            type="file" 
            accept="image/*"
            disabled={isUploading}
            onChange={handleUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export function GlobalContentEditor({ 
  content, 
  onChange 
}: { 
  content: CmsContent; 
  onChange: (key: keyof CmsContent, value: any) => void;
}) {
  const globalSiteContent = content?.globalSiteContent || FALLBACK_CMS_CONTENT.globalSiteContent;
  if (!globalSiteContent) return null;

  const updateGlobal = (key: string, value: any) => {
    onChange('globalSiteContent', { ...globalSiteContent, [key]: value });
  };

  const addHeaderLink = () => {
    const navItems = [...globalSiteContent.header.navItems, { label: 'New Link', href: '/' }];
    updateGlobal('header', { ...globalSiteContent.header, navItems });
  };

  const removeHeaderLink = (index: number) => {
    const navItems = globalSiteContent.header.navItems.filter((_, i) => i !== index);
    updateGlobal('header', { ...globalSiteContent.header, navItems });
  };

  const updateHeaderLink = (index: number, key: string, value: string) => {
    const navItems = [...globalSiteContent.header.navItems];
    navItems[index] = { ...navItems[index], [key]: value };
    updateGlobal('header', { ...globalSiteContent.header, navItems });
  };

  const addFooterLink = () => {
    const navLinks = [...globalSiteContent.footer.navLinks, { label: 'New Link', href: '/' }];
    updateGlobal('footer', { ...globalSiteContent.footer, navLinks });
  };

  const removeFooterLink = (index: number) => {
    const navLinks = globalSiteContent.footer.navLinks.filter((_, i) => i !== index);
    updateGlobal('footer', { ...globalSiteContent.footer, navLinks });
  };

  const updateFooterLink = (index: number, key: string, value: string) => {
    const navLinks = [...globalSiteContent.footer.navLinks];
    navLinks[index] = { ...navLinks[index], [key]: value };
    updateGlobal('footer', { ...globalSiteContent.footer, navLinks });
  };

  const getDemographic = (role: string) => {
    const demogs = globalSiteContent.sponsorsExtended?.audienceDemographics || [];
    return demogs.find(d => d.role === role)?.percentage || 0;
  };

  const updateDemographic = (role: string, percentage: number) => {
    const current = globalSiteContent.sponsorsExtended?.audienceDemographics || [];
    const existing = current.find(d => d.role === role);
    let updated;
    if (existing) {
      updated = current.map(d => d.role === role ? { ...d, percentage } : d);
    } else {
      updated = [...current, { role, percentage }];
    }
    updateGlobal('sponsorsExtended', { ...globalSiteContent.sponsorsExtended, audienceDemographics: updated });
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-xl font-bold mb-4">Global SEO Defaults</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <ImageUploader 
            label="Default Open Graph Image (OG Image)"
            value={globalSiteContent.defaultOgImageUrl}
            onChange={(url) => updateGlobal('defaultOgImageUrl', url)}
            onClear={() => updateGlobal('defaultOgImageUrl', '')}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Header Configuration</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold mb-2 block">Navigation Links</label>
            {globalSiteContent.header.navItems.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-3 mb-3 items-center">
                <input 
                  type="text" 
                  value={item.label} 
                  onChange={(e) => updateHeaderLink(idx, 'label', e.target.value)}
                  className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm"
                  placeholder="Label"
                />
                <input 
                  type="text" 
                  value={item.href} 
                  onChange={(e) => updateHeaderLink(idx, 'href', e.target.value)}
                  className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm"
                  placeholder="Href"
                />
                <button type="button" onClick={() => removeHeaderLink(idx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addHeaderLink} className="mt-2 text-xs font-semibold text-primary hover:underline">
              + Add Header Link
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Footer Configuration</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Tagline</label>
              <input 
                type="text" 
                value={globalSiteContent.footer.tagline} 
                onChange={(e) => updateGlobal('footer', { ...globalSiteContent.footer, tagline: e.target.value })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Contact Email</label>
              <input 
                type="text" 
                value={globalSiteContent.footer.contactEmail} 
                onChange={(e) => updateGlobal('footer', { ...globalSiteContent.footer, contactEmail: e.target.value })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Copyright Entity</label>
              <input 
                type="text" 
                value={globalSiteContent.footer.copyrightEntity} 
                onChange={(e) => updateGlobal('footer', { ...globalSiteContent.footer, copyrightEntity: e.target.value })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-semibold mb-2 block">Footer Links</label>
            {globalSiteContent.footer.navLinks.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-3 mb-3 items-center">
                <input 
                  type="text" 
                  value={item.label} 
                  onChange={(e) => updateFooterLink(idx, 'label', e.target.value)}
                  className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm"
                  placeholder="Label"
                />
                <input 
                  type="text" 
                  value={item.href} 
                  onChange={(e) => updateFooterLink(idx, 'href', e.target.value)}
                  className="flex-1 bg-background border border-border rounded px-3 py-2 text-sm"
                  placeholder="Href"
                />
                <button type="button" onClick={() => removeFooterLink(idx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addFooterLink} className="mt-2 text-xs font-semibold text-primary hover:underline">
              + Add Footer Link
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Sponsors Extended Content</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Decision Makers (%)</label>
              <input 
                type="number" 
                value={getDemographic('Decision Makers')} 
                onChange={(e) => updateDemographic('Decision Makers', parseInt(e.target.value) || 0)}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Senior Leaders (%)</label>
              <input 
                type="number" 
                value={getDemographic('Senior Leaders')} 
                onChange={(e) => updateDemographic('Senior Leaders', parseInt(e.target.value) || 0)}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Practitioners (%)</label>
              <input 
                type="number" 
                value={getDemographic('Practitioners')} 
                onChange={(e) => updateDemographic('Practitioners', parseInt(e.target.value) || 0)}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Demographics Footnote</label>
            <input 
              type="text" 
              value={globalSiteContent.sponsorsExtended?.audienceDemographicsFootnote || ''} 
              onChange={(e) => updateGlobal('sponsorsExtended', { ...globalSiteContent.sponsorsExtended, audienceDemographicsFootnote: e.target.value })}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Replays Page Content</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-1 block">Empty State Title</label>
              <input 
                type="text" 
                value={globalSiteContent.replaysContent?.emptyStateTitle || ''} 
                onChange={(e) => updateGlobal('replaysContent', { ...globalSiteContent.replaysContent, emptyStateTitle: e.target.value })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-1 block">Empty State Description</label>
              <textarea 
                rows={3}
                value={globalSiteContent.replaysContent?.emptyStateDescription || ''} 
                onChange={(e) => updateGlobal('replaysContent', { ...globalSiteContent.replaysContent, emptyStateDescription: e.target.value })}
                className="w-full bg-background border border-border rounded px-3 py-2 text-sm resize-none"
              />
            </div>
          </div>
          <ImageUploader 
            label="Fallback Avatar URL"
            value={globalSiteContent.replaysContent?.fallbackAvatarUrl || ''}
            onChange={(url) => updateGlobal('replaysContent', { ...globalSiteContent.replaysContent, fallbackAvatarUrl: url })}
            onClear={() => updateGlobal('replaysContent', { ...globalSiteContent.replaysContent, fallbackAvatarUrl: '' })}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Payment Cancel Content</h2>
        <div className="bg-card border border-border p-5 rounded-lg flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold mb-1 block">Primary CTA Label</label>
            <input 
              type="text" 
              value={globalSiteContent.paymentCancelContent?.primaryCtaLabel || ''} 
              onChange={(e) => updateGlobal('paymentCancelContent', { ...globalSiteContent.paymentCancelContent, primaryCtaLabel: e.target.value })}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Heading</label>
            <input 
              type="text" 
              value={globalSiteContent.paymentCancelContent?.heading || ''} 
              onChange={(e) => updateGlobal('paymentCancelContent', { ...globalSiteContent.paymentCancelContent, heading: e.target.value })}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-1 block">Paragraph</label>
            <textarea 
              rows={2}
              value={globalSiteContent.paymentCancelContent?.paragraph || ''} 
              onChange={(e) => updateGlobal('paymentCancelContent', { ...globalSiteContent.paymentCancelContent, paragraph: e.target.value })}
              className="w-full bg-background border border-border rounded px-3 py-2 text-sm resize-none"
            />
          </div>
        </div>
      </div>

    </div>
  );
}
