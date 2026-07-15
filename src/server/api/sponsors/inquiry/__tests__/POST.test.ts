import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler from '../POST';
import type { Request, Response } from 'express';

// Mock the global fetch
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe('Sponsor Inquiry POST handler', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: any;
  let statusMock: any;

  beforeEach(() => {
    vi.clearAllMocks();
    
    jsonMock = vi.fn();
    statusMock = vi.fn().mockReturnValue({ json: jsonMock });
    
    req = {
      body: {},
    };
    
    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it('should validate required fields and return 400 on error', async () => {
    req.body = {
      companyName: '',
      email: 'invalid-email',
      // Missing packageInterest
    };

    await handler(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'Validation failed'
      })
    );
  });

  it('should send email payload to internal gateway and return 200 on success', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    req.body = {
      companyName: 'Test Corp',
      email: 'test@example.com',
      packageInterest: 'Logo Placement',
      message: 'Hello'
    };

    await handler(req as Request, res as Response);

    expect(mockFetch).toHaveBeenCalledWith(
      'http://127.0.0.1:2525/api/email/send',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('Test Corp')
      })
    );

    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ success: true });
  });

  it('should return 200 even if internal email gateway fails (non-blocking)', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      text: async () => 'Gateway Error'
    });

    req.body = {
      companyName: 'Test Corp',
      email: 'test@example.com',
      packageInterest: 'Dedicated Session Slots',
    };

    await handler(req as Request, res as Response);

    expect(mockFetch).toHaveBeenCalled();
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith({ success: true });
  });
});
