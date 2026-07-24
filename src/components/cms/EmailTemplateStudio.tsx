import { useState, useEffect } from 'react';
import { RichTextEditor } from '../RichTextEditor';
import {
  Mail,
  Save,
  RotateCcw,
  CheckCircle,
  Copy,
  Eye,
  Sparkles,
  Info,
} from 'lucide-react';

export interface FormTarget {
  id: string;
  rawFormId?: string;
  name: string;
  type: 'static' | 'dynamic';
  defaultSubject: string;
  shortTags: string[];
}

export interface EmailTemplateData {
  id?: string;
  form_identifier: string;
  form_name: string;
  subject: string;
  html_body: string;
  active: boolean;
}

interface EmailTemplateStudioProps {
  getUserToken: () => string | null;
  setToast: (toast: { type: 'success' | 'error'; message: string }) => void;
}

export function EmailTemplateStudio({ getUserToken, setToast }: EmailTemplateStudioProps) {
  const [availableForms, setAvailableForms] = useState<FormTarget[]>([]);
  const [templates, setTemplates] = useState<EmailTemplateData[]>([]);
  const [selectedFormId, setSelectedFormId] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [htmlBody, setHtmlBody] = useState<string>('');
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const token = getUserToken();
      const res = await fetch('/api/cms/email-templates', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const data = await res.json();
        setAvailableForms(data.availableForms || []);
        setTemplates(data.templates || []);

        if (data.availableForms?.length > 0 && !selectedFormId) {
          const firstForm = data.availableForms[0];
          setSelectedFormId(firstForm.id);
          loadFormTemplate(firstForm, data.templates || []);
        }
      }
    } catch (err) {
      console.error('Error loading email templates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const currentForm = availableForms.find((f) => f.id === selectedFormId);

  const loadFormTemplate = (form: FormTarget, currentTemplates: EmailTemplateData[]) => {
    const existing = currentTemplates.find((t) => t.form_identifier === form.id);
    if (existing) {
      setSubject(existing.subject || form.defaultSubject);
      setHtmlBody(existing.html_body || getDefaultHtmlBody(form));
      setIsActive(existing.active !== undefined ? existing.active : true);
    } else {
      setSubject(form.defaultSubject);
      setHtmlBody(getDefaultHtmlBody(form));
      setIsActive(true);
    }
  };

  const handleFormSelect = (formId: string) => {
    setSelectedFormId(formId);
    const form = availableForms.find((f) => f.id === formId);
    if (form) {
      loadFormTemplate(form, templates);
    }
  };

  const handleSave = async () => {
    if (!currentForm) return;

    setIsSaving(true);
    try {
      const token = getUserToken();
      const res = await fetch('/api/cms/email-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          form_identifier: currentForm.id,
          form_name: currentForm.name,
          subject,
          html_body: htmlBody,
          active: isActive,
        }),
      });

      if (res.ok) {
        setToast({ type: 'success', message: `Email template for "${currentForm.name}" saved!` });
        await fetchTemplates();
      } else {
        const data = await res.json();
        setToast({ type: 'error', message: data.error || 'Failed to save email template' });
      }
    } catch (err) {
      console.error(err);
      setToast({ type: 'error', message: 'An error occurred while saving' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (!currentForm) return;
    if (!window.confirm(`Reset "${currentForm.name}" template back to default system layout?`)) return;

    try {
      const token = getUserToken();
      const res = await fetch(`/api/cms/email-templates?form_identifier=${encodeURIComponent(currentForm.id)}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setToast({ type: 'success', message: 'Template reset to default layout.' });
        setSubject(currentForm.defaultSubject);
        setHtmlBody(getDefaultHtmlBody(currentForm));
        setIsActive(true);
        await fetchTemplates();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const copyShortTag = (tag: string) => {
    navigator.clipboard.writeText(tag);
    setCopiedTag(tag);
    setTimeout(() => setCopiedTag(null), 2000);
  };

  const insertTagToSubject = (tag: string) => {
    setSubject((prev) => `${prev} ${tag}`.trim());
  };

  const insertTagToBody = (tag: string) => {
    setHtmlBody((prev) => `${prev}<p>${tag}</p>`);
  };

  const renderSamplePreview = () => {
    let previewSubject = subject;
    let previewHtml = htmlBody;

    const sampleData: Record<string, string> = {
      userName: 'Alex Morgan',
      userEmail: 'alex.morgan@example.com',
      companyName: 'Apex Deliveries Ltd',
      sessionTitle: 'Project Controls & AI Workflow Leadership',
      discipline: 'Project Controls',
      packageInterest: 'Series Sponsor',
      message: 'Looking forward to partnering for Q3 session sponsorship!',
      submissionDate: new Date().toISOString().split('T')[0],
      formName: currentForm?.name || 'Form',
    };

    Object.entries(sampleData).forEach(([k, v]) => {
      const reg = new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, 'g');
      previewSubject = previewSubject.replace(reg, v);
      previewHtml = previewHtml.replace(reg, v);
    });

    return { previewSubject, previewHtml };
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center text-xs text-muted-foreground">
        Loading Email Template Studio...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-card border border-border rounded-sm">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="text-primary" size={18} />
            <h2 className="text-base font-bold text-foreground">Email Template Studio</h2>
            <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-primary/10 text-primary border border-primary/20">
              CMS Module
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Design and format automated email templates for every static and dynamic form on DeliverIQ.
          </p>
        </div>

        {/* Form Selector Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-[10px] font-bold text-muted-foreground uppercase whitespace-nowrap">
            Select Form Target:
          </label>
          <select
            value={selectedFormId}
            onChange={(e) => handleFormSelect(e.target.value)}
            className="bg-background border border-border text-foreground px-3.5 py-2 rounded focus:outline-none focus:border-primary text-xs font-semibold"
          >
            {availableForms.map((f) => {
              const isCustomized = templates.some((t) => t.form_identifier === f.id);
              return (
                <option key={f.id} value={f.id}>
                  {f.name} {isCustomized ? '• (Customized)' : ''}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {currentForm && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Template Editor (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-6 bg-card border border-border p-6 rounded-sm">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <h3 className="text-sm font-bold text-foreground">{currentForm.name}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  Form Identifier: <span className="font-mono text-primary">{currentForm.id}</span>
                </p>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-3 bg-background border border-border px-3 py-1.5 rounded">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Template Status:</label>
                <button
                  type="button"
                  onClick={() => setIsActive(!isActive)}
                  className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                    isActive ? 'bg-primary' : 'bg-muted'
                  }`}
                >
                  <span
                    className={`inline-block h-3.5 w-3.5 transform rounded-full bg-[#1A1D24] transition duration-200 ease-in-out translate-y-0.5 ${
                      isActive ? 'translate-x-4.5' : 'translate-x-0.5'
                    }`}
                  />
                </button>
                <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {isActive ? 'Active' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Subject Line Input */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  Email Subject Line
                </label>
                <span className="text-[10px] text-muted-foreground italic">Short tags allowed</span>
              </div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. DeliverIQ — New submission from {{userName}}"
                className="bg-background border border-border text-foreground px-3.5 py-2.5 rounded focus:outline-none focus:border-primary text-xs font-sans"
              />
            </div>

            {/* TipTap Rich Text Editor for HTML Body */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between mb-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                  HTML Body Content (TipTap Editor)
                </label>
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold text-primary hover:underline uppercase"
                >
                  <Eye size={12} />
                  {showPreview ? 'Hide Live Preview' : 'Show Live Preview'}
                </button>
              </div>

              <RichTextEditor value={htmlBody} onChange={setHtmlBody} />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-border text-muted-foreground rounded text-xs font-semibold hover:text-foreground hover:bg-muted transition-all"
              >
                <RotateCcw size={13} />
                Reset to Default
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-primary text-[#1A1D24] rounded text-xs font-bold hover:brightness-110 transition-all disabled:opacity-50"
                >
                  <Save size={14} />
                  {isSaving ? 'Saving Template...' : 'Save Email Template'}
                </button>
              </div>
            </div>
          </div>

          {/* Side Panel: Short Tags & Helper (1 col) */}
          <div className="flex flex-col gap-4">
            <div className="bg-card border border-border p-4 rounded-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-border pb-2">
                <Sparkles size={14} className="text-primary" />
                <h4 className="text-xs font-bold text-foreground">Dynamic Short Tags</h4>
              </div>

              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Click any short tag below to copy it, or insert directly into your Subject or HTML Body.
              </p>

              <div className="flex flex-col gap-2 pt-1">
                {currentForm.shortTags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center justify-between p-2 bg-background border border-border rounded hover:border-primary/50 group transition-all"
                  >
                    <span className="font-mono text-[11px] text-primary">{tag}</span>
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => insertTagToSubject(tag)}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground hover:text-foreground hover:bg-primary/20"
                        title="Add to Subject"
                      >
                        +Subj
                      </button>
                      <button
                        type="button"
                        onClick={() => insertTagToBody(tag)}
                        className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground hover:text-foreground hover:bg-primary/20"
                        title="Add to Body"
                      >
                        +Body
                      </button>
                      <button
                        type="button"
                        onClick={() => copyShortTag(tag)}
                        className="p-1 text-muted-foreground hover:text-primary"
                        title="Copy tag"
                      >
                        {copiedTag === tag ? <CheckCircle size={11} className="text-green-400" /> : <Copy size={11} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border p-4 rounded-sm flex flex-col gap-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Info size={13} />
                <span className="text-[10px] font-bold uppercase">Security & Sanitization</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                All values injected via short tags are sanitized on the server before dispatch to protect recipients against HTML injection and XSS attacks.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Live Sample Preview Panel */}
      {showPreview && currentForm && (
        <div className="bg-card border border-border p-6 rounded-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
              <Eye size={16} className="text-primary" />
              Live Sample Render Preview
            </h3>
            <span className="text-[10px] text-muted-foreground italic">Rendered with sample payload data</span>
          </div>

          <div className="flex flex-col gap-2 bg-background border border-border p-4 rounded text-xs">
            <div className="flex gap-2">
              <span className="font-semibold text-muted-foreground w-16">Subject:</span>
              <span className="font-bold text-foreground">{renderSamplePreview().previewSubject}</span>
            </div>
          </div>

          <div
            className="bg-background border border-border p-6 rounded text-xs font-sans max-w-full overflow-x-auto"
            dangerouslySetInnerHTML={{ __html: renderSamplePreview().previewHtml }}
          />
        </div>
      )}
    </div>
  );
}

function getDefaultHtmlBody(form: FormTarget): string {
  return `
<div style="font-family: Inter, Arial, sans-serif; background: #1A1D24; padding: 32px; border-radius: 4px; max-width: 560px;">
  <div style="border-bottom: 1px solid #2C2F38; padding-bottom: 16px; margin-bottom: 24px;">
    <span style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; color: #C79A4E; text-transform: uppercase;">DeliverIQ — Notification</span>
  </div>
  <p style="color: #8A8D96; font-size: 13px; margin: 0 0 20px;">
    Hello <strong style="color: #F0EDE8;">{{userName}}</strong>,
  </p>
  <p style="color: #8A8D96; font-size: 13px; margin: 0 0 20px;">
    We have received your submission for <strong>${form.name}</strong> on {{submissionDate}}.
  </p>
  <div style="border-top: 1px solid #2C2F38; margin-top: 24px; padding-top: 16px;">
    <span style="font-size: 11px; color: #4A4D56;">Sent automatically by DeliverIQ · deliveriq.live</span>
  </div>
</div>
  `.trim();
}
