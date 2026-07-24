import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';

export const STATIC_FORMS = [
  {
    id: 'static:register',
    name: 'User Registration (/register)',
    type: 'static',
    defaultSubject: 'Welcome to DeliverIQ — Registration Confirmed',
    shortTags: ['{{userName}}', '{{userEmail}}', '{{companyName}}', '{{submissionDate}}'],
  },
  {
    id: 'static:speakers',
    name: 'Speaker Application (/for-speakers)',
    type: 'static',
    defaultSubject: 'DeliverIQ — Speaker Application Received',
    shortTags: ['{{userName}}', '{{userEmail}}', '{{discipline}}', '{{message}}', '{{submissionDate}}'],
  },
  {
    id: 'static:sponsors',
    name: 'Sponsor Enquiry Form (/for-sponsors)',
    type: 'static',
    defaultSubject: 'DeliverIQ — Sponsor Enquiry Received',
    shortTags: ['{{userName}}', '{{userEmail}}', '{{companyName}}', '{{packageInterest}}', '{{message}}', '{{submissionDate}}'],
  },
  {
    id: 'static:sessions',
    name: 'Session Notification / Waitlist (/sessions)',
    type: 'static',
    defaultSubject: 'DeliverIQ — Session Notification Confirmation',
    shortTags: ['{{userName}}', '{{userEmail}}', '{{sessionTitle}}', '{{submissionDate}}'],
  },
  {
    id: 'static:contact',
    name: 'Contact Page Form (/contact)',
    type: 'static',
    defaultSubject: 'DeliverIQ — We received your message',
    shortTags: ['{{userName}}', '{{userEmail}}', '{{message}}', '{{submissionDate}}'],
  },
];

export default async function handler(req: Request, res: Response) {
  try {
    if (!supabaseAdmin) {
      return res.status(500).json({ error: 'Supabase admin client is not configured' });
    }

    // Fetch saved email templates from DB (if table exists)
    let templates: any[] = [];
    const { data: dbTemplates, error: templatesErr } = await supabaseAdmin
      .from('email_templates')
      .select('*')
      .order('updated_at', { ascending: false });

    if (!templatesErr && dbTemplates) {
      templates = dbTemplates;
    }

    // Fetch dynamic forms created in CMS
    let dynamicForms: any[] = [];
    const { data: dbForms, error: formsErr } = await supabaseAdmin
      .from('forms')
      .select('id, name, schema')
      .order('created_at', { ascending: false });

    if (!formsErr && dbForms) {
      dynamicForms = dbForms.map((f: any) => ({
        id: `dynamic:${f.id}`,
        rawFormId: f.id,
        name: `${f.name} (Embedded Form)`,
        type: 'dynamic',
        defaultSubject: `DeliverIQ — New Submission for ${f.name}`,
        shortTags: [
          '{{userName}}',
          '{{userEmail}}',
          '{{submissionDate}}',
          ...(Array.isArray(f.schema?.fields)
            ? f.schema.fields.map((field: any) => `{{${field.name || field.id}}}`)
            : []),
        ],
      }));
    }

    const availableForms = [...STATIC_FORMS, ...dynamicForms];

    res.status(200).json({
      templates,
      availableForms,
    });
  } catch (err) {
    console.error('Error in GET /api/cms/email-templates:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
