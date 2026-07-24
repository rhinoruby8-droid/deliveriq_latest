import { describe, it, expect, vi, beforeEach } from 'vitest';
import handler from './GET';
import { supabaseAdmin } from '../../../../supabase';
import { generateToken } from '../../../../auth';

vi.mock('../../../../supabase', () => ({
  supabaseAdmin: {
    from: vi.fn()
  }
}));

vi.mock('../../../../auth', () => ({
  generateToken: vi.fn()
}));

describe('GET /api/user/sessions/:sessionId/join', () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    vi.resetAllMocks();

    mockReq = {
      params: { sessionId: 'session123' },
      user: { id: 'user123' }
    };

    mockRes = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  it('should return 401 if unauthorized', async () => {
    mockReq.user = null;
    await handler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(401);
  });

  it('should return 400 if sessionId is missing', async () => {
    mockReq.params = {};
    await handler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it('should return 403 if user is not registered for the session', async () => {
    const mockSelectUser = vi.fn().mockReturnThis();
    const mockEqUser = vi.fn().mockReturnThis();
    const mockSingleUser = vi.fn().mockResolvedValue({
      data: { registered_session_ids: ['otherSession'] },
      error: null
    });
    
    (supabaseAdmin.from as any).mockReturnValue({
      select: mockSelectUser,
      eq: mockEqUser,
      single: mockSingleUser
    });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(403);
  });

  it('should return 404 if session has no registration URL', async () => {
    (supabaseAdmin.from as any).mockImplementation((table: string) => {
      if (table === 'users') {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { registered_session_ids: ['session123'] }, error: null })
            })
          })
        };
      }
      if (table === 'sessions') {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { registration_url: null }, error: null })
            })
          })
        };
      }
    });

    await handler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Session does not have a registration URL configured.' });
  });

  it('should return 200 with joinUrl if authorized and registered', async () => {
    (supabaseAdmin.from as any).mockImplementation((table: string) => {
      if (table === 'users') {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { registered_session_ids: ['session123'] }, error: null })
            })
          })
        };
      }
      if (table === 'sessions') {
        return {
          select: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: { registration_url: 'https://zoom.us/j/fake' }, error: null })
            })
          })
        };
      }
    });

    (generateToken as any).mockReturnValue('mocked-token');

    await handler(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({ joinUrl: '/api/proxy/join?token=mocked-token' });
    expect(generateToken).toHaveBeenCalledWith({ dest: 'https://zoom.us/j/fake', u: 'user123', s: 'session123' }, 60000);
  });
});
