import type { Request, Response } from 'express';
import { z } from 'zod';
import { sendEmail } from '../../../email';
import { sendTemplatedEmail } from '../../../email-template-compiler';

const inquirySchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  packageInterest: z.string().min(1, 'Please select a package of interest'),
  message: z.string().optional(),
});

export default async function handler(req: Request, res: Response) {
  try {
    const validatedData = inquirySchema.parse(req.body);

    // Check if custom email template exists in Supabase for this form
    const didSendCustom = await sendTemplatedEmail({
      formIdentifier: 'static:sponsors',
      formName: 'Sponsor Enquiry Form',
      recipientEmail: 'sales@deliveriq.live',
      replyTo: validatedData.email,
      payload: validatedData,
    });

    if (didSendCustom) {
      return res.status(200).json({ success: true });
    }

    try {
      await sendEmail({
        to: 'sales@deliveriq.live',
        replyTo: validatedData.email,
        fromName: 'DeliverIQ',
        subject: `New Sponsor Inquiry from ${validatedData.companyName}`,
        html: `
          <h2>New Sponsor Inquiry</h2>
          <p><strong>Company:</strong> ${validatedData.companyName}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Package of Interest:</strong> ${validatedData.packageInterest}</p>
          <p><strong>Message:</strong><br/>${validatedData.message || 'N/A'}</p>
        `,
      });
    } catch (emailErr) {
      console.error('sponsors/inquiry POST email error', emailErr);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ error: 'Validation failed', details: err.errors });
    }
    console.error('sponsors/inquiry POST error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
