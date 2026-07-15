import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';

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
import { Button } from '@/components/ui/button';
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
      <div className="p-8 rounded-lg bg-[#21242C] border border-[#2C2F38] text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-4" />
        <h3 className="text-xl font-bold text-[#F0EDE8] mb-2">Inquiry Received</h3>
        <p className="text-[#8A8D96]">
          Thank you for your interest! Our team will get back to you shortly to discuss sponsorship opportunities.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 border-[#2C2F38] text-[#F0EDE8] hover:bg-[#2C2F38]"
          onClick={() => setIsSuccess(false)}
        >
          Submit Another
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-[#21242C] border border-[#2C2F38] p-6 lg:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0EDE8]">Company Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Acme Corp" 
                    className="bg-[#1A1D24] border-[#2C2F38] text-[#F0EDE8] placeholder:text-[#8A8D96]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0EDE8]">Work Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email"
                    placeholder="partner@acmecorp.com" 
                    className="bg-[#1A1D24] border-[#2C2F38] text-[#F0EDE8] placeholder:text-[#8A8D96]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="packageInterest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0EDE8]">Package of Interest</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-[#1A1D24] border-[#2C2F38] text-[#F0EDE8]">
                      <SelectValue placeholder="Select a package..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1A1D24] border-[#2C2F38]">
                    <SelectItem value="logo_placement" className="text-[#F0EDE8] hover:bg-[#2C2F38] cursor-pointer">Logo Placement</SelectItem>
                    <SelectItem value="dedicated_session" className="text-[#F0EDE8] hover:bg-[#2C2F38] cursor-pointer">Dedicated Session Slots</SelectItem>
                    <SelectItem value="registration_list" className="text-[#F0EDE8] hover:bg-[#2C2F38] cursor-pointer">Registration List Sharing</SelectItem>
                    <SelectItem value="custom" className="text-[#F0EDE8] hover:bg-[#2C2F38] cursor-pointer">Custom Package / Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#F0EDE8]">Additional Details (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell us about your goals..." 
                    className="bg-[#1A1D24] border-[#2C2F38] text-[#F0EDE8] placeholder:text-[#8A8D96] min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#C79A4E] text-[#1A1D24] hover:brightness-110 hover:bg-[#C79A4E] font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
