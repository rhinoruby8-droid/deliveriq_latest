import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useCmsContent } from '../../lib/cms-client';
import { useSearchParams } from 'react-router-dom';
import { EmbedRenderer } from './EmbedRenderer';

interface DynamicFormProps {
  formId: string;
  forceNative?: boolean;
}

export function DynamicForm({ formId, forceNative }: DynamicFormProps) {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (siteKey && siteKey !== 'dummy-key') {
    return (
      <GoogleReCaptchaProvider reCaptchaKey={siteKey}>
        <RecaptchaFormInner formId={formId} forceNative={forceNative} />
      </GoogleReCaptchaProvider>
    );
  }
  return <BaseFormInner formId={formId} forceNative={forceNative} executeRecaptcha={undefined} />;
}

function RecaptchaFormInner({ formId, forceNative }: DynamicFormProps) {
  const { executeRecaptcha } = useGoogleReCaptcha();
  return <BaseFormInner formId={formId} forceNative={forceNative} executeRecaptcha={executeRecaptcha} />;
}

function BaseFormInner({ formId, forceNative, executeRecaptcha }: DynamicFormProps & { executeRecaptcha?: (action: string) => Promise<string> }) {
  const { data: cms } = useCmsContent();
  const [searchParams] = useSearchParams();
  const sessionSlug = searchParams.get('session');
  const matchedSession = formId === 'register' ? cms?.sessions?.find(s => s.id === sessionSlug) : undefined;

  const formDef = cms?.forms?.find(f => f.id === formId);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!formDef) {
    return null; // Or a loading skeleton
  }

  // If this is an embed code form (and not forced native via /embed/form route), render embed code
  if (formDef.formType === 'embed' && !forceNative) {
    return (
      <div className="deliveriq-embed-wrapper" id={`form-embed-${formId}`}>
        {formDef.customCss && <style>{formDef.customCss}</style>}
        {formDef.headerHtml && (
          <div className="deliveriq-form-header" dangerouslySetInnerHTML={{ __html: formDef.headerHtml }} />
        )}
        <EmbedRenderer html={formDef.embedCode || ''} />
      </div>
    );
  }

  const onSubmit: SubmitHandler<any> = async (data) => {
    setErrorMsg('');
    try {
      let token = 'development-token';
      if (executeRecaptcha) {
        token = await executeRecaptcha('form_submit');
      }

      const res = await fetch('/api/cms/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formId,
          data,
          recaptchaToken: token
        })
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Submission failed');
      }

      setSuccess(true);
      reset();
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred while submitting the form.');
    }
  };

  if (success) {
    return (
      <div className="bg-background p-8 border border-border rounded-sm text-center">
        <div className="text-primary mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Success</h3>
        <p className="text-sm text-muted-foreground">{formDef.successMessage}</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-primary hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-6" id={`form-wrapper-${formId}`}>
      {formDef.customCss && <style>{formDef.customCss}</style>}
      {formDef.headerHtml && (
        <div className="deliveriq-form-header" dangerouslySetInnerHTML={{ __html: formDef.headerHtml }} />
      )}
      {matchedSession && (
        <div className="bg-background border border-border rounded-sm p-4 text-xs">
          <span className="text-[9px] font-bold text-primary uppercase tracking-wider block mb-1">{matchedSession.tag}</span>
          <h4 className="font-bold text-foreground mb-1 leading-snug">{matchedSession.title}</h4>
          <p className="text-muted-foreground mb-3 leading-relaxed">{matchedSession.description}</p>
          <span className="text-[10px] text-muted-foreground block">Schedule: {matchedSession.date} @ {matchedSession.time} ({matchedSession.duration})</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {errorMsg && (
          <div className="p-4 bg-red-900/20 border border-red-500/50 rounded-sm text-red-200 text-sm" role="alert">
            {errorMsg}
          </div>
        )}
      
      {formDef.fields.map(field => {
        const hasError = !!errors[field.id];
        return (
          <div key={field.id} className="flex flex-col gap-1.5">
            <label htmlFor={field.id} className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              {field.label} {field.required && <span className="text-primary" aria-hidden="true">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                rows={4}
                placeholder={field.placeholder}
                aria-invalid={hasError}
                aria-required={field.required}
                {...register(field.id, { required: field.required })}
                className="h-auto w-full rounded-[10px] border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                aria-invalid={hasError}
                aria-required={field.required}
                {...register(field.id, { required: field.required })}
                className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
              >
                <option value="">Select an option...</option>
                {field.options?.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : field.type === 'checkbox' ? (
               <div className="flex items-center gap-3 mt-1">
                  <input
                    type="checkbox"
                    id={field.id}
                    aria-invalid={hasError}
                    aria-required={field.required}
                    {...register(field.id, { required: field.required })}
                    className="w-5 h-5 border-border bg-muted rounded text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-muted-foreground">{field.placeholder || field.label}</span>
               </div>
            ) : (
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                aria-invalid={hasError}
                aria-required={field.required}
                {...register(field.id, { required: field.required })}
                className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            )}
            {hasError && (
              <span className="text-xs text-red-400" role="alert">This field is required</span>
            )}
          </div>
        );
      })}

      <div className="mt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : formDef.submitButtonText}
        </button>
      </div>
      
      <p className="text-[10px] text-muted-foreground text-center mt-2">
        Protected by reCAPTCHA. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:text-primary underline">Privacy</a> &amp; <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-primary underline">Terms</a> apply.
      </p>
    </form>
    </div>
  );
}
