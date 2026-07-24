import type { Request, Response } from 'express';
import { getSecret } from '#airo/secrets';
import { sendEmail } from '../../email';
import { sendTemplatedEmail } from '../../email-template-compiler';

interface NotifyPayload {
  source: string;
  name?: string;
  email: string;
  discipline?: string;
  message?: string;
  extra?: Record<string, string>;
}

const SOURCE_LABELS: Record<string, string> = {
  register: 'Register page — interest form',
  sessions: 'Sessions page — notify me strip',
  replays:  'Replays page — notify me strip',
  speakers: 'For Speakers page — application form',
  sponsors: 'For Sponsors page — enquiry form',
  contact:  'Contact page — message form',
};

export default async function handler(req: Request, res: Response) {
  const { source, name, email, discipline, message, extra } = req.body as NotifyPayload;

  if (!email || !source) {
    return res.status(400).json({ error: 'email and source are required' });
  }

  const recipient = getSecret('NOTIFICATION_RECIPIENT_EMAIL') ?? 'info@deliveriq.live';
  const sourceLabel = SOURCE_LABELS[source] ?? source;

  // Check if custom email template exists in Supabase for this form
  const didSendCustom = await sendTemplatedEmail({
    formIdentifier: `static:${source}`,
    formName: sourceLabel,
    recipientEmail: String(recipient),
    replyTo: email,
    payload: { source, name, email, discipline, message, extra },
  });

  if (didSendCustom) {
    return res.status(200).json({ ok: true });
  }

  const rows = [
    name       ? `<tr><td style="padding:6px 0;color:#8A8D96;width:140px;vertical-align:top">Name</td><td style="padding:6px 0;color:#F0EDE8">${name}</td></tr>` : '',
    `<tr><td style="padding:6px 0;color:#8A8D96;vertical-align:top">Email</td><td style="padding:6px 0;color:#F0EDE8">${email}</td></tr>`,
    discipline ? `<tr><td style="padding:6px 0;color:#8A8D96;vertical-align:top">Discipline</td><td style="padding:6px 0;color:#F0EDE8">${discipline}</td></tr>` : '',
    message    ? `<tr><td style="padding:6px 0;color:#8A8D96;vertical-align:top">Message</td><td style="padding:6px 0;color:#F0EDE8">${message.replace(/\n/g, '<br/>')}</td></tr>` : '',
    ...Object.entries(extra ?? {}).map(([k, v]) =>
      `<tr><td style="padding:6px 0;color:#8A8D96;vertical-align:top">${k}</td><td style="padding:6px 0;color:#F0EDE8">${v}</td></tr>`
    ),
  ].filter(Boolean).join('');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;background:#1A1D24;padding:32px;border-radius:4px;max-width:560px">
      <div style="border-bottom:1px solid #2C2F38;padding-bottom:16px;margin-bottom:24px">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.15em;color:#C79A4E;text-transform:uppercase">DeliverIQ — New Submission</span>
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
    name       ? `Name:       ${name}` : '',
    `Email:      ${email}`,
    discipline ? `Discipline: ${discipline}` : '',
    message    ? `Message:\n${message}` : '',
    ...Object.entries(extra ?? {}).map(([k, v]) => `${k}: ${v}`),
  ].filter((l) => l !== '').join('\n');

  try {
    await sendEmail({
      to: String(recipient),
      replyTo: email,
      fromName: 'DeliverIQ',
      subject: `[DeliverIQ] New submission — ${sourceLabel}`,
      html,
      text,
    });
    console.log('notify.email: sent ok', { source, to: recipient });
  } catch (err) {
    console.error('notify.email: send failed', err);
  }

  return res.status(200).json({ ok: true });
}
