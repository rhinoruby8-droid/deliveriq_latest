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
      <div className="bg-background p-8 border border-border rounded-sm text-center">
        <div className="text-primary mb-4">
          <CheckCircle2 className="mx-auto h-12 w-12" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">Inquiry Received</h3>
        <p className="text-sm text-muted-foreground">
          Thank you for your interest! Our team will get back to you shortly to discuss sponsorship opportunities.
        </p>
        <button 
          className="mt-6 text-sm text-primary hover:underline"
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 space-y-0">
                  <FormLabel className="font-semibold text-sm text-foreground uppercase tracking-wider">
                    Company Name <span className="text-red-500" aria-hidden="true">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Acme Corp" 
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
                <FormItem className="flex flex-col gap-2 space-y-0">
                  <FormLabel className="font-semibold text-sm text-foreground uppercase tracking-wider">
                    Work Email <span className="text-red-500" aria-hidden="true">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="partner@acmecorp.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="packageInterest"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 space-y-0">
                <FormLabel className="font-semibold text-sm text-foreground uppercase tracking-wider">
                  Package of Interest <span className="text-red-500" aria-hidden="true">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 w-full rounded-[10px] border border-border bg-muted px-4 py-2 text-sm text-foreground transition-colors focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                      <SelectValue placeholder="Select a package..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="logo_placement" className="text-foreground hover:bg-muted cursor-pointer focus:bg-muted focus:text-foreground">Logo Placement</SelectItem>
                    <SelectItem value="dedicated_session" className="text-foreground hover:bg-muted cursor-pointer focus:bg-muted focus:text-foreground">Dedicated Session Slots</SelectItem>
                    <SelectItem value="registration_list" className="text-foreground hover:bg-muted cursor-pointer focus:bg-muted focus:text-foreground">Registration List Sharing</SelectItem>
                    <SelectItem value="custom" className="text-foreground hover:bg-muted cursor-pointer focus:bg-muted focus:text-foreground">Custom Package / Other</SelectItem>
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
              <FormItem className="flex flex-col gap-2 space-y-0">
                <FormLabel className="font-semibold text-sm text-foreground uppercase tracking-wider">
                  Additional Details (Optional)
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your goals..." 
                    className="w-full rounded-[10px] border border-border bg-muted px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary min-h-[100px] resize-none" 
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

          <div className="mt-4 border-t border-border pt-6">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-4 bg-[#d7c2b0] text-[#1a1a1a] text-base font-bold rounded-full hover:brightness-105 transition-all cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </div>
          
          <p className="text-[10px] text-muted-foreground text-center mt-2">
            Protected by reCAPTCHA. <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="hover:text-primary underline">Privacy</a> &amp; <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="hover:text-primary underline">Terms</a> apply.
          </p>
        </form>
      </Form>
    </div>
  );
}
