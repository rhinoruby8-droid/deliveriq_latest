-- Migration to create email_templates table for DeliverIQ Email Template Studio
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_identifier VARCHAR NOT NULL UNIQUE, -- e.g. 'static:register', 'static:speakers', 'static:sponsors', 'static:sessions', 'static:contact', or 'dynamic:<form_id>'
  form_name VARCHAR NOT NULL,
  subject VARCHAR NOT NULL,
  html_body TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup by form_identifier
CREATE INDEX IF NOT EXISTS idx_email_templates_form_identifier ON email_templates(form_identifier);
