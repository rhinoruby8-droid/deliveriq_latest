import { useState } from 'react';
import { FormDefinition, FormField } from '../../lib/cms-client';

interface FormBuilderProps {
  forms: FormDefinition[];
  onChange: (forms: FormDefinition[]) => void;
}

export function FormBuilder({ forms, onChange }: FormBuilderProps) {
  const [editingFormId, setEditingFormId] = useState<string | null>(null);

  const activeForm = forms.find(f => f.id === editingFormId);

  const updateActiveForm = (changes: Partial<FormDefinition>) => {
    if (!activeForm) return;
    const updatedForm = { ...activeForm, ...changes };
    onChange(forms.map(f => f.id === activeForm.id ? updatedForm : f));
  };

  const updateField = (index: number, changes: Partial<FormField>) => {
    if (!activeForm) return;
    const newFields = [...activeForm.fields];
    newFields[index] = { ...newFields[index], ...changes };
    updateActiveForm({ fields: newFields });
  };

  const addField = () => {
    if (!activeForm) return;
    const newFields = [...activeForm.fields, {
      id: `field_${Date.now()}`,
      type: 'text' as const,
      label: 'New Field',
      required: false,
      placeholder: ''
    }];
    updateActiveForm({ fields: newFields });
  };

  const removeField = (index: number) => {
    if (!activeForm) return;
    const newFields = activeForm.fields.filter((_, i) => i !== index);
    updateActiveForm({ fields: newFields });
  };

  const cloneForm = (form: FormDefinition) => {
    const newForm = { ...form, id: `${form.id}_copy_${Date.now()}`, name: `${form.name} (Copy)` };
    onChange([...forms, newForm]);
  };

  const deleteForm = (formId: string) => {
    if (confirm('Are you sure you want to delete this form?')) {
      const newForms = forms.filter(f => f.id !== formId);
      onChange(newForms);
      if (editingFormId === formId) setEditingFormId(null);
    }
  };

  const copyEmbedCode = (formId: string) => {
    const embedUrl = `${window.location.origin}/embed/form/${formId}`;
    const embedHtml = `<iframe src="${embedUrl}" width="100%" height="600" style="border:none;" title="DeliverIQ Form"></iframe>`;
    navigator.clipboard.writeText(embedHtml);
    alert('Embed code copied to clipboard!');
  };

  return (
    <div className="space-y-8">
      {activeForm ? (
        <div className="bg-[#21242C] p-6 border border-[#2C2F38] rounded-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-[#F0EDE8]">Editing: {activeForm.name}</h2>
            <div className="flex gap-3">
              <button onClick={() => setEditingFormId(null)} className="px-4 py-2 text-sm bg-[#2C2F38] text-[#F0EDE8] rounded hover:brightness-110 font-medium">
                &larr; Back to Forms
              </button>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#8A8D96] mb-1">Form Name (Internal)</label>
                <input 
                  type="text" 
                  value={activeForm.name}
                  onChange={(e) => updateActiveForm({name: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1A1D24] border border-[#2C2F38] rounded text-[#F0EDE8] focus:border-[#C79A4E] outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#8A8D96] mb-1">Form Type</label>
                <select 
                  value={activeForm.formType || 'native'}
                  onChange={(e) => updateActiveForm({formType: e.target.value as 'native' | 'embed'})}
                  className="w-full px-3 py-2 bg-[#1A1D24] border border-[#2C2F38] rounded text-[#F0EDE8] focus:border-[#C79A4E] outline-none"
                >
                  <option value="native">Native React Form</option>
                  <option value="embed">External Embed Code</option>
                </select>
              </div>
            </div>

            {(!activeForm.formType || activeForm.formType === 'native') && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#8A8D96] mb-1">Submit Button Text</label>
                    <input 
                      type="text" 
                      value={activeForm.submitButtonText}
                      onChange={(e) => updateActiveForm({submitButtonText: e.target.value})}
                      className="w-full px-3 py-2 bg-[#1A1D24] border border-[#2C2F38] rounded text-[#F0EDE8] focus:border-[#C79A4E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#8A8D96] mb-1">Success Message</label>
                    <input 
                      type="text" 
                      value={activeForm.successMessage}
                      onChange={(e) => updateActiveForm({successMessage: e.target.value})}
                      className="w-full px-3 py-2 bg-[#1A1D24] border border-[#2C2F38] rounded text-[#F0EDE8] focus:border-[#C79A4E] outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            {activeForm.formType === 'embed' && (
              <div>
                <label className="block text-sm font-semibold text-[#8A8D96] mb-1">Raw Embed HTML / Script</label>
                <textarea 
                  value={activeForm.embedCode || ''}
                  onChange={(e) => updateActiveForm({embedCode: e.target.value})}
                  className="w-full px-3 py-2 bg-[#1A1D24] border border-[#2C2F38] rounded text-[#F0EDE8] focus:border-[#C79A4E] outline-none min-h-[150px] font-mono text-xs"
                  placeholder="Paste your Hubspot, Typeform, or raw HTML embed code here..."
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-[#8A8D96] mb-1">Header HTML</label>
              <textarea 
                value={activeForm.headerHtml || ''}
                onChange={(e) => updateActiveForm({headerHtml: e.target.value})}
                className="w-full px-3 py-2 bg-[#1A1D24] border border-[#2C2F38] rounded text-[#F0EDE8] focus:border-[#C79A4E] outline-none min-h-[80px] font-mono text-xs"
                placeholder="<h2>Apply Now</h2><p>Please fill out the form below.</p>"
              />
              <p className="text-[10px] text-[#8A8D96] mt-1">This raw HTML will be rendered directly above the form fields.</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#8A8D96] mb-1">Custom CSS Overrides</label>
              <textarea 
                value={activeForm.customCss || ''}
                onChange={(e) => updateActiveForm({customCss: e.target.value})}
                className="w-full px-3 py-2 bg-[#1A1D24] border border-[#2C2F38] rounded text-[#F0EDE8] focus:border-[#C79A4E] outline-none min-h-[80px] font-mono text-xs"
                placeholder={`#form-embed-${activeForm.id} input { height: 60px; }`}
              />
              <p className="text-[10px] text-[#8A8D96] mt-1">This CSS will be injected only when this form is rendered.</p>
            </div>
          </div>

          {(!activeForm.formType || activeForm.formType === 'native') && (
            <>
              <div className="flex justify-between items-center mb-4 pt-6 border-t border-[#2C2F38]">
            <h3 className="text-lg font-bold text-[#F0EDE8]">Fields</h3>
            <button onClick={addField} className="text-sm text-[#C79A4E] hover:underline">
              + Add Field
            </button>
          </div>

          <div className="space-y-4">
            {activeForm.fields.map((field, idx) => (
              <div key={idx} className="p-4 bg-[#1A1D24] border border-[#2C2F38] rounded-sm relative group">
                <button 
                  onClick={() => removeField(idx)}
                  className="absolute top-4 right-4 text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove Field"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8D96] mb-1">Label</label>
                    <input 
                      type="text" 
                      value={field.label}
                      onChange={(e) => updateField(idx, { label: e.target.value })}
                      className="w-full px-2 py-1.5 bg-[#21242C] border border-[#2C2F38] rounded text-sm text-[#F0EDE8] focus:border-[#C79A4E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8D96] mb-1">Type</label>
                    <select 
                      value={field.type}
                      onChange={(e) => updateField(idx, { type: e.target.value as any })}
                      className="w-full px-2 py-1.5 bg-[#21242C] border border-[#2C2F38] rounded text-sm text-[#F0EDE8] focus:border-[#C79A4E] outline-none"
                    >
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="textarea">Textarea</option>
                      <option value="select">Select</option>
                      <option value="checkbox">Checkbox</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8D96] mb-1">Field ID</label>
                    <input 
                      type="text" 
                      value={field.id}
                      onChange={(e) => updateField(idx, { id: e.target.value })}
                      className="w-full px-2 py-1.5 bg-[#21242C] border border-[#2C2F38] rounded text-sm text-[#8A8D96] focus:border-[#C79A4E] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#8A8D96] mb-1">Placeholder</label>
                    <input 
                      type="text" 
                      value={field.placeholder || ''}
                      onChange={(e) => updateField(idx, { placeholder: e.target.value })}
                      className="w-full px-2 py-1.5 bg-[#21242C] border border-[#2C2F38] rounded text-sm text-[#F0EDE8] focus:border-[#C79A4E] outline-none"
                    />
                  </div>
                </div>
                {field.type === 'select' && (
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-[#8A8D96] mb-1">Options (Comma separated)</label>
                    <input 
                      type="text" 
                      value={(field.options || []).join(', ')}
                      onChange={(e) => updateField(idx, { options: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })}
                      className="w-full px-2 py-1.5 bg-[#21242C] border border-[#2C2F38] rounded text-sm text-[#F0EDE8] focus:border-[#C79A4E] outline-none"
                    />
                  </div>
                )}
                <div className="mt-4 flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id={`req_${idx}`}
                    checked={field.required}
                    onChange={(e) => updateField(idx, { required: e.target.checked })}
                    className="w-4 h-4 bg-[#21242C] border-[#2C2F38] text-[#C79A4E] rounded"
                  />
                  <label htmlFor={`req_${idx}`} className="text-sm text-[#8A8D96] select-none">Required Field</label>
                </div>
              </div>
            ))}
          </div>
            </>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[#8A8D96]">Select a form below to edit its fields, buttons, and success messages.</p>
            <button 
              onClick={() => {
                const newForm = {
                  id: `form_${Date.now()}`,
                  name: 'New Form',
                  submitButtonText: 'Submit',
                  successMessage: 'Success!',
                  fields: []
                };
                onChange([...forms, newForm]);
                setEditingFormId(newForm.id);
              }}
              className="px-4 py-2 text-sm bg-[#1A1D24] text-[#F0EDE8] border border-[#2C2F38] rounded hover:border-[#C79A4E] hover:text-[#C79A4E] transition-colors font-medium flex items-center gap-2"
            >
              + Create New Form
            </button>
          </div>
          {forms.map(form => (
            <div key={form.id} className="flex justify-between items-center p-4 bg-[#21242C] border border-[#2C2F38] rounded-sm hover:border-[#C79A4E]/50 transition-colors">
              <div>
                <h3 className="text-[#F0EDE8] font-bold">{form.name}</h3>
                <p className="text-sm text-[#8A8D96]">{form.fields.length} fields</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => copyEmbedCode(form.id)}
                  className="px-3 py-1.5 text-xs bg-[#1A1D24] text-[#8A8D96] border border-[#2C2F38] rounded hover:text-[#C79A4E] hover:border-[#C79A4E] transition-colors"
                  title="Copy Embed Code"
                >
                  Embed Code
                </button>
                <button 
                  onClick={() => cloneForm(form)}
                  className="px-3 py-1.5 text-xs bg-[#1A1D24] text-[#8A8D96] border border-[#2C2F38] rounded hover:text-[#C79A4E] hover:border-[#C79A4E] transition-colors"
                  title="Clone Form"
                >
                  Clone
                </button>
                <button 
                  onClick={() => setEditingFormId(form.id)}
                  className="px-4 py-1.5 text-xs bg-[#1A1D24] text-[#C79A4E] border border-[#2C2F38] rounded hover:bg-[#C79A4E] hover:text-[#1A1D24] transition-colors font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteForm(form.id)}
                  className="px-3 py-1.5 text-xs bg-[#1A1D24] text-[#8A8D96] border border-[#2C2F38] rounded hover:text-red-400 hover:border-red-400 transition-colors"
                  title="Delete Form"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
