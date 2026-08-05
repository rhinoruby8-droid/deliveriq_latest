import { supabaseAdmin } from './supabase';
import { sendEmail, type SendEmailInput } from './email';

export interface EmailTemplateRecord {
  id?: string;
  form_identifier: string;
  form_name: string;
  subject: string;
  html_body: string;
  active: boolean;
}

/**
 * Escapes HTML characters to prevent XSS / HTML injection in parsed variable values
 */
export function sanitizeHtmlValue(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = String(val);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Replaces {{shortTag}} variables in template text with payload values.
 */
export function compileTemplateString(
  templateStr: string,
  payload: Record<string, any>,
  formName: string
): string {
  if (!templateStr) return '';

  const dateStr = new Date().toISOString().split('T')[0];
  const userName = payload.name || payload.userName || payload.fullName || '';
  const userEmail = payload.email || payload.userEmail || '';
  const companyName = payload.companyName || payload.company || '';
  const sessionTitle = payload.sessionTitle || payload.discipline || '';

  // Built-in system mappings
  const systemMap: Record<string, string> = {
    userName,
    userEmail,
    companyName,
    sessionTitle,
    formName,
    submissionDate: dateStr,
  };

  return templateStr.replace(/\{\{\s*([a-zA-Z0-9_-]+)\s*\}\}/g, (match, tagKey) => {
    // Check system map first
    if (tagKey in systemMap) {
      return sanitizeHtmlValue(systemMap[tagKey]);
    }

    // Check payload top level
    if (tagKey in payload && payload[tagKey] !== undefined) {
      return sanitizeHtmlValue(payload[tagKey]);
    }

    // Check payload.extra nested object if present
    if (payload.extra && typeof payload.extra === 'object' && tagKey in payload.extra) {
      return sanitizeHtmlValue(payload.extra[tagKey]);
    }

    // Keep tag untouched if no replacement found
    return match;
  });
}

/**
 * Strip HTML tags to produce a plain text email alternative
 */
export function htmlToPlainText(html: string): string {
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<br\s*[/]?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n\s+\n/g, '\n\n')
    .trim();
}

/**
 * Fetches configured template for a form_identifier and dispatches email via sendEmail.
 * Returns true if custom template was found and sent, or false to trigger fallback.
 */
export async function sendTemplatedEmail(options: {
  formIdentifier: string;
  formName: string;
  recipientEmail: string;
  replyTo?: string;
  payload: Record<string, any>;
}): Promise<boolean> {
  const { formIdentifier, formName, recipientEmail, replyTo, payload } = options;

  try {
    if (!supabaseAdmin) return false;

    const { data: template } = await supabaseAdmin
      .from('email_templates')
      .select('*')
      .eq('form_identifier', formIdentifier)
      .maybeSingle();

    if (!template || !template.active || !template.subject || !template.html_body) {
      return false; // Fallback to default handler
    }

    const compiledSubject = compileTemplateString(template.subject, payload, formName);
    const compiledHtml = compileTemplateString(template.html_body, payload, formName);
    const compiledText = htmlToPlainText(compiledHtml);

    const emailInput: SendEmailInput = {
      to: recipientEmail,
      replyTo: replyTo || (payload.email ? String(payload.email) : undefined),
      fromName: 'DeliverIQ',
      subject: compiledSubject,
      html: compiledHtml,
      text: compiledText,
    };

    await sendEmail(emailInput);
    console.log(`templated.email: sent custom template for ${formIdentifier} to ${recipientEmail}`);
    return true;
  } catch (err) {
    console.error(`templated.email error for ${formIdentifier}:`, err);
    return false;
  }
}
