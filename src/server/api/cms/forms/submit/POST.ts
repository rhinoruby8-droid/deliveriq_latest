import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../../supabase';
import { sendEmail } from '../../../../email';
import { sendTemplatedEmail } from '../../../../email-template-compiler';
import { getSecret } from '#airo/secrets';

interface SubmitPayload {
  formId: string;
  data: Record<string, any>;
  recaptchaToken?: string;
}

export default async function handler(req: Request, res: Response) {
  try {
    const { formId, data, recaptchaToken } = req.body as SubmitPayload;

    if (!formId || !data) {
      return res.status(400).json({ error: 'formId and data are required' });
    }

    // Validate recaptchaToken with Google if secret is present
    const recaptchaSecret = getSecret('RECAPTCHA_SECRET_KEY');
    if (recaptchaSecret && recaptchaToken) {
      const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      });
      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        return res.status(400).json({ error: 'Recaptcha validation failed.' });
      }
    }

    // Fetch form definition to get name (for email)
    const { data: formRes, error: formErr } = await supabaseAdmin
      .from('forms')
      .select('name')
      .eq('id', formId)
      .single();

    if (formErr || !formRes) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Save to DB
    const { error: insertErr } = await supabaseAdmin
      .from('form_submissions')
      .insert({
        form_id: formId,
        data
      });

    if (insertErr) {
      console.error('Failed to save submission:', insertErr);
      return res.status(500).json({ error: 'Failed to save submission' });
    }

    // Send Notification Email
    const recipient = getSecret('NOTIFICATION_RECIPIENT_EMAIL') ?? 'info@deliveriq.live';
    const sourceLabel = formRes.name;

    // Check if custom email template exists in Supabase for this dynamic form
    const didSendCustom = await sendTemplatedEmail({
      formIdentifier: `dynamic:${formId}`,
      formName: sourceLabel,
      recipientEmail: String(recipient),
      replyTo: data.email ? String(data.email) : undefined,
      payload: data,
    });

    if (didSendCustom) {
      return res.status(200).json({ ok: true });
    }

    const rows = Object.entries(data).map(([k, v]) => {
      const label = k.charAt(0).toUpperCase() + k.slice(1);
      const value = String(v).replace(/\n/g, '<br/>');
      return `<tr><td style="padding:6px 0;color:#8A8D96;vertical-align:top;width:140px;">${label}</td><td style="padding:6px 0;color:#F0EDE8">${value}</td></tr>`;
    }).join('');

    const html = `
      <div style="font-family:Inter,Arial,sans-serif;background:#1A1D24;padding:32px;border-radius:4px;max-width:560px">
        <div style="border-bottom:1px solid #2C2F38;padding-bottom:16px;margin-bottom:24px">
          <span style="font-size:11px;font-weight:700;letter-spacing:0.15em;color:#C79A4E;text-transform:uppercase">DeliverIQ — New Form Submission</span>
        </div>
        <p style="color:#8A8D96;font-size:13px;margin:0 0 20px">
          A visitor submitted the <strong style="color:#F0EDE8">${sourceLabel}</strong>.
        </p>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows}
        </table>
        <div style="border-top:1px solid #2C2F38;margin-top:24px;padding-top:16px">
          <span style="font-size:11px;color:#4A4D56">Sent automatically by DeliverIQ · deliveriq.live</span>
        </div>
      </div>
    `;

    const text = [
      `New submission — ${sourceLabel}`,
      '',
      ...Object.entries(data).map(([k, v]) => `${k.charAt(0).toUpperCase() + k.slice(1)}: ${v}`),
    ].join('\n');

    try {
      await sendEmail({
        to: String(recipient),
        replyTo: data.email ? String(data.email) : undefined,
        fromName: 'DeliverIQ',
        subject: `[DeliverIQ] New submission — ${sourceLabel}`,
        html,
        text,
      });
      console.log('form.submit: sent ok', { formId, to: recipient });
    } catch (err) {
      console.error('form.submit: send failed', err);
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Submit handler failed:', err);
    return res.status(500).json({ error: 'An error occurred while submitting' });
  }
}
