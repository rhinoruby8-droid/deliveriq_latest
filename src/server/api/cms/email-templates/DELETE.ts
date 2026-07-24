import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';

export default async function handler(req: Request, res: Response) {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: 'Supabase admin client is not configured' });
    }

    const { form_identifier } = req.query;

    if (!form_identifier || typeof form_identifier !== 'string') {
      return res.status(400).json({ error: 'form_identifier query param is required' });
    }

    const { error } = await supabaseAdmin
      .from('email_templates')
      .delete()
      .eq('form_identifier', form_identifier);

    if (error) {
      console.error('Error deleting email template:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error in DELETE /api/cms/email-templates:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
