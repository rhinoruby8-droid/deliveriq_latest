import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';

export default async function handler(req: Request, res: Response) {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: 'Supabase admin client is not configured' });
    }

    const { form_identifier, form_name, subject, html_body, active } = req.body;

    if (!form_identifier || !form_name || !subject || html_body === undefined) {
      return res.status(400).json({ error: 'form_identifier, form_name, subject, and html_body are required' });
    }

    const { data, error } = await supabaseAdmin
      .from('email_templates')
      .upsert(
        {
          form_identifier,
          form_name,
          subject,
          html_body,
          active: active !== undefined ? Boolean(active) : true,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'form_identifier' }
      )
      .select('*')
      .single();

    if (error) {
      console.error('Error saving email template:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ success: true, template: data });
  } catch (err) {
    console.error('Error in POST /api/cms/email-templates:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
