import type { Request, Response } from 'express';
import { z } from 'zod';

const inquirySchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  packageInterest: z.string().min(1, 'Please select a package of interest'),
  message: z.string().optional(),
});

export default async function handler(req: Request, res: Response) {
  try {
    const validatedData = inquirySchema.parse(req.body);

    // Send email via internal loopback proxy
    const emailPayload = {
      to: 'sales@deliveriq.live',
      subject: `New Sponsor Inquiry from ${validatedData.companyName}`,
      html: `
        <h2>New Sponsor Inquiry</h2>
        <p><strong>Company:</strong> ${validatedData.companyName}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Package of Interest:</strong> ${validatedData.packageInterest}</p>
        <p><strong>Message:</strong><br/>${validatedData.message || 'N/A'}</p>
      `,
    };

    const emailResponse = await fetch('http://127.0.0.1:2525/api/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailPayload),
    });

    if (!emailResponse.ok) {
      console.error('Failed to send internal email notification', await emailResponse.text());
      // Proceed anyway as we might still want to log it to DB (if we were saving to DB)
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
