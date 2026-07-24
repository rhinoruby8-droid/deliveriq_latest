import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { sendEmailViaAiro, sendEmailViaResend } from './email';

// Mock Resend package
vi.mock('resend', () => {
  return {
    Resend: vi.fn().mockImplementation(function (apiKey: string) {
      return {
        emails: {
          send: vi.fn().mockImplementation(async (_payload) => {
            if (apiKey === 'invalid_key') {
              return { data: null, error: { message: 'Invalid API key' } };
            }
            return { data: { id: 'resend_msg_12345' }, error: null };
          }),
        },
      };
    }),
  };
});

describe('Email Service Routing', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('routes email via Airo loopback when sendEmailViaAiro is invoked', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, messageId: 'airo_msg_987' }),
    });
    global.fetch = mockFetch as unknown as typeof fetch;

    const result = await sendEmailViaAiro({
      to: 'test@example.com',
      subject: 'Hello Airo',
      text: 'Testing Airo Gateway',
    });

    expect(result.messageId).toBe('airo_msg_987');
    expect(mockFetch).toHaveBeenCalledWith(
      'http://127.0.0.1:2525/api/email/send',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('routes email via Resend API when sendEmailViaResend is invoked with API key', async () => {
    const result = await sendEmailViaResend(
      {
        to: 'user@example.com',
        subject: 'Hello Resend',
        html: '<p>Testing Resend</p>',
      },
      're_test_key_123'
    );

    expect(result.messageId).toBe('resend_msg_12345');
  });

  it('throws an error if Resend API key is missing', async () => {
    await expect(
      sendEmailViaResend(
        {
          to: 'user@example.com',
          subject: 'Missing key test',
        },
        ''
      )
    ).rejects.toThrow('Resend API key is missing');
  });

  it('throws an error if Resend API returns an error payload', async () => {
    await expect(
      sendEmailViaResend(
        {
          to: 'user@example.com',
          subject: 'Error test',
        },
        'invalid_key'
      )
    ).rejects.toThrow('Resend email send failed: Invalid API key');
  });
});
