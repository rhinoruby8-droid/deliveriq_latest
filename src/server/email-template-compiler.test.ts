import { describe, it, expect, vi } from 'vitest';
import {
  compileTemplateString,
  sanitizeHtmlValue,
  htmlToPlainText,
} from './email-template-compiler';

// Mock Supabase admin client
vi.mock('./supabase', () => ({
  supabaseAdmin: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          maybeSingle: vi.fn(),
        })),
      })),
    })),
  },
}));

// Mock Email module
vi.mock('./email', () => ({
  sendEmail: vi.fn().mockResolvedValue({ messageId: 'mock_msg_777' }),
}));

describe('Email Template Compiler Engine', () => {
  it('correctly replaces built-in system short tags', () => {
    const template = 'Hello {{userName}}, your registration for {{formName}} on {{submissionDate}} is complete.';
    const payload = { userName: 'Sarah Connor' };
    const compiled = compileTemplateString(template, payload, 'Speaker Application');

    expect(compiled).toContain('Sarah Connor');
    expect(compiled).toContain('Speaker Application');
    expect(compiled).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it('correctly replaces custom dynamic form field tags', () => {
    const template = 'Company: {{companyName}}, Package: {{packageInterest}}, Budget: {{budget}}';
    const payload = {
      companyName: 'Acme Corp',
      packageInterest: 'Series Sponsor',
      budget: '$10,000',
    };

    const compiled = compileTemplateString(template, payload, 'Sponsor Enquiry');
    expect(compiled).toBe('Company: Acme Corp, Package: Series Sponsor, Budget: $10,000');
  });

  it('sanitizes raw HTML characters to prevent XSS / HTML injection', () => {
    const maliciousInput = '<script>alert("xss")</script><img src=x onerror=alert(1)>';
    const sanitized = sanitizeHtmlValue(maliciousInput);

    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('&lt;script&gt;');
    expect(sanitized).toContain('&lt;img');
  });

  it('sanitizes user variables inserted via compileTemplateString', () => {
    const template = '<div>User Message: {{message}}</div>';
    const payload = { message: '<b>Bold Hack</b> & "Quotes"' };
    const compiled = compileTemplateString(template, payload, 'Contact Form');

    expect(compiled).toBe('<div>User Message: &lt;b&gt;Bold Hack&lt;/b&gt; &amp; &quot;Quotes&quot;</div>');
  });

  it('converts HTML body to plain text format cleanly', () => {
    const html = '<h1>Title</h1><p>Hello <strong>World</strong><br/>Line 2</p>';
    const plain = htmlToPlainText(html);

    expect(plain).toContain('Title');
    expect(plain).toContain('Hello World\nLine 2');
    expect(plain).not.toContain('<h1>');
  });
});
