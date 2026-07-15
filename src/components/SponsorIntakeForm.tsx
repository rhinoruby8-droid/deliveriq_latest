import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CheckCircle2 } from 'lucide-react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { trackEvent } from '@/lib/analytics';

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  packageInterest: z.string().min(1, 'Please select a package of interest'),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function SponsorIntakeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      email: '',
      packageInterest: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setError(null);

    trackEvent('sponsor_inquiry_submitted', { package: values.packageInterest });

    try {
      const res = await fetch('/api/sponsors/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setIsSuccess(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-[#1A1D24] p-8 border border-[#2C2F38] rounded-sm text-center">
        <div className="text-[#C79A4E] mb-4">
          <CheckCircle2 className="mx-auto h-12 w-12" />
        </div>
        <h3 className="text-xl font-bold text-[#F0EDE8] mb-2">Inquiry Received</h3>
        <p className="text-sm text-[#8A8D96]">
          Thank you for your interest! Our team will get back to you shortly to discuss sponsorship opportunities.
        </p>
        <button 
          className="mt-6 text-sm text-[#C79A4E] hover:underline"
          onClick={() => setIsSuccess(false)}
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">
                  Company Name <span className="text-[#C79A4E]" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Acme Corp" 
                    className="px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus-visible:ring-0 focus:outline-none focus:border-[#C79A4E]/60 transition-colors h-auto" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">
                  Work Email <span className="text-[#C79A4E]" aria-hidden="true">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="partner@acmecorp.com" 
                    className="px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus-visible:ring-0 focus:outline-none focus:border-[#C79A4E]/60 transition-colors h-auto" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="packageInterest"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">
                  Package of Interest <span className="text-[#C79A4E]" aria-hidden="true">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] focus:ring-0 focus:outline-none focus:border-[#C79A4E]/60 transition-colors h-auto">
                      <SelectValue placeholder="Select a package..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1A1D24] border-[#2C2F38]">
                    <SelectItem value="logo_placement" className="text-[#F0EDE8] hover:bg-[#2C2F38] cursor-pointer focus:bg-[#2C2F38] focus:text-[#F0EDE8]">Logo Placement</SelectItem>
                    <SelectItem value="dedicated_session" className="text-[#F0EDE8] hover:bg-[#2C2F38] cursor-pointer focus:bg-[#2C2F38] focus:text-[#F0EDE8]">Dedicated Session Slots</SelectItem>
                    <SelectItem value="registration_list" className="text-[#F0EDE8] hover:bg-[#2C2F38] cursor-pointer focus:bg-[#2C2F38] focus:text-[#F0EDE8]">Registration List Sharing</SelectItem>
                    <SelectItem value="custom" className="text-[#F0EDE8] hover:bg-[#2C2F38] cursor-pointer focus:bg-[#2C2F38] focus:text-[#F0EDE8]">Custom Package / Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-1.5 space-y-0">
                <FormLabel className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">
                  Additional Details (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your goals..." 
                    className="px-4 py-2.5 bg-[#1A1D24] border border-[#2C2F38] rounded-sm text-sm text-[#F0EDE8] placeholder:text-[#8A8D96]/50 focus-visible:ring-0 focus:outline-none focus:border-[#C79A4E]/60 transition-colors min-h-[100px] resize-none" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-400" />
              </FormItem>
            )}
          />

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">
              {error}
            </div>
          )}

          <div className="mt-2">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full inline-flex justify-center items-center gap-2 px-5 py-3 text-sm font-bold bg-[#C79A4E] text-[#1A1D24] rounded-sm hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </div>
          
          <p className="text-[10px] text-[#8A8D96] text-center mt-2">
            Protected by reCAPTCHA. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:text-[#C79A4E] underline">Privacy</a> &amp; <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-[#C79A4E] underline">Terms</a> apply.
          </p>
        </form>
      </Form>
    </div>
  );
}
