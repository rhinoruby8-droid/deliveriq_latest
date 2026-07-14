import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useGoogleReCaptcha, GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { useCmsContent } from '../../lib/cms-client';

interface DynamicFormProps {
  formId: string;
}

export function DynamicForm({ formId }: DynamicFormProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'dummy-key'}>
      <DynamicFormInner formId={formId} />
    </GoogleReCaptchaProvider>
  );
}

import { useSearchParams } from 'react-router-dom';

function DynamicFormInner({ formId }: DynamicFormProps) {
  const { data: cms } = useCmsContent();
  const [searchParams] = useSearchParams();
  const sessionSlug = searchParams.get('session');
  const matchedSession = formId === 'register' ? cms?.sessions?.find(s => s.id === sessionSlug) : undefined;

  const formDef = cms?.forms?.find(f => f.id === formId);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!formDef) {
    return null; // Or a loading skeleton
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
      <div className="bg-[#1A1D24] p-8 border border-[#2C2F38] rounded-sm text-center">
        <div className="text-[#C79A4E] mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#F0EDE8] mb-2">Success</h3>
        <p className="text-sm text-[#8A8D96]">{formDef.successMessage}</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-6 text-sm text-[#C79A4E] hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {matchedSession && (
        <div className="bg-[#1A1D24] border border-[#2C2F38] rounded-sm p-4 text-xs">
          <span className="text-[9px] font-bold text-[#C79A4E] uppercase tracking-wider block mb-1">{matchedSession.tag}</span>
          <h4 className="font-bold text-[#F0EDE8] mb-1 leading-snug">{matchedSession.title}</h4>
          <p className="text-[#8A8D96] mb-3 leading-relaxed">{matchedSession.description}</p>
          <span className="text-[10px] text-[#8A8D96] block">Schedule: {matchedSession.date} @ {matchedSession.time} ({matchedSession.duration})</span>
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
            <label htmlFor={field.id} className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">
              {field.label} {field.required && <span className="text-[#C79A4E]" aria-hidden="true">*</span>}
            </label>
            
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                rows={4}
                placeholder={field.placeholder}
                aria-invalid={hasError}
                aria-required={field.required}
                {...register(field.id, { required: field.required })}
                className="px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors resize-none"
              />
            ) : field.type === 'select' ? (
              <select
                id={field.id}
                aria-invalid={hasError}
                aria-required={field.required}
                {...register(field.id, { required: field.required })}
                className="px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] focus:outline-none focus:border-[#C79A4E]/60 transition-colors appearance-none cursor-pointer"
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
                    className="w-5 h-5 bg-[#1A1D24] border-[#2C2F38] rounded-sm text-[#C79A4E] focus:ring-[#C79A4E] focus:ring-offset-[#21242C]"
                  />
                  <span className="text-sm text-[#8A8D96]">{field.placeholder || field.label}</span>
               </div>
            ) : (
              <input
                type={field.type}
                id={field.id}
                placeholder={field.placeholder}
                aria-invalid={hasError}
                aria-required={field.required}
                {...register(field.id, { required: field.required })}
                className="px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus:outline-none focus:border-[#C79A4E]/60 transition-colors"
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
          className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : formDef.submitButtonText}
        </button>
      </div>
      
      <p className="text-[10px] text-[#8A8D96] text-center mt-2">
        Protected by reCAPTCHA. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:text-[#C79A4E] underline">Privacy</a> &amp; <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-[#C79A4E] underline">Terms</a> apply.
      </p>
    </form>
    </div>
  );
}
