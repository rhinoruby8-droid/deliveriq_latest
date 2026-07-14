import { vi, describe, expect, it, beforeEach } from 'vitest';
import express from 'express';
import type { Server } from 'node:http';

vi.mock('./supabase', () => {
  const mockFrom = vi.fn();
  (globalThis as any)._mockFrom = mockFrom;
  return {
    supabaseAdmin: {
      from: mockFrom
    }
  };
});

import cms_get from './api/cms/GET';
import cms_post from './api/cms/POST';
import cms_login_post from './api/cms/login/POST';

async function withServer<T>(
  app: express.Express,
  run: (baseUrl: string) => Promise<T>
): Promise<T> {
  let server: Server | null = null;
  try {
    server = await new Promise<Server>((resolve) => {
      const listening = app.listen(0, '127.0.0.1', () => resolve(listening));
    });
    const address = server.address();
    if (!address || typeof address === 'string') {
      throw new Error('Expected TCP listener');
    }
    return await run(`http://127.0.0.1:${address.port}`);
  } finally {
    if (server) {
      const listeningServer = server;
      await new Promise<void>((resolve, reject) => {
        listeningServer.close((error) => (error ? reject(error) : resolve()));
      });
    }
  }
}

describe('CMS API endpoints', () => {
  const app = express();
  app.use(express.json());
  app.get('/api/cms/content', cms_get);
  app.post('/api/cms/content', cms_post);
  app.post('/api/cms/login', cms_login_post);

  const mockFrom = (globalThis as any)._mockFrom;

  beforeEach(() => {
    mockFrom.mockReset();
  });

  it('GET /api/cms/content returns the database contents', async () => {
    mockFrom.mockImplementation((table: string) => {
      let data: any[] = [];
      if (table === 'pages') {
        data = [
          { id: 'homepage', html: '<h1>Home</h1>', content: { visualMode: false } },
        ];
      } else if (table === 'speakers') {
        data = [{ id: 'sp1', name: 'Speaker 1', role: 'Role', organisation: 'Org', bio: 'Bio', avatar_url: 'url', email: 'email', social_url: 'social' }];
      } else if (table === 'sponsors') {
        data = [{ id: 'sp2', name: 'Sponsor 1', logo_url: 'logo', website_url: 'web', tier: 'Gold' }];
      } else if (table === 'sessions') {
        data = [{ id: 'sess1', title: 'Session 1', description: 'Desc', tag: 'Tag', date: 'Date', time: 'Time', duration: 'Duration', status: 'published', speaker_ids: [], sponsor_ids: [], registration_url: 'reg', video_url: 'vid' }];
      } else if (table === 'settings') {
        data = [];
      } else if (table === 'forms') {
        data = [{ id: 'form1', name: 'Form 1', fields: [], submit_button_text: 'Submit', success_message: 'Success' }];
      } else {
        data = [];
      }
      return {
        select: vi.fn().mockResolvedValue({ data, error: null }),
      };
    });

    await withServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/cms/content`);
      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data.homepageHtml).toBe('<h1>Home</h1>');
      expect(data.speakers[0].name).toBe('Speaker 1');
      expect(data.sponsors[0].name).toBe('Sponsor 1');
      expect(data.sessions[0].title).toBe('Session 1');
      expect(data.forms[0].name).toBe('Form 1');
    });
  });

  it('POST /api/cms/login rejects invalid password', async () => {
    await withServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/cms/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'wrong-password' }),
      });
      expect(response.status).toBe(401);
      const data = await response.json() as { error?: string };
      expect(data.error).toContain('Invalid password');
    });
  });

  it('POST /api/cms/login accepts valid password and returns token', async () => {
    process.env.ADMIN_PASSWORD = 'super-secret-password';

    await withServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/cms/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: 'super-secret-password' }),
      });
      expect(response.status).toBe(200);
      const data = await response.json() as { token?: string };
      expect(data.token).toBeDefined();

      const json = Buffer.from(data.token!, 'base64').toString('utf-8');
      const payload = JSON.parse(json) as { role?: string; exp?: number };
      expect(payload.role).toBe('admin');
      expect(payload.exp).toBeGreaterThan(Date.now());
    });
  });

  it('POST /api/cms/content rejects requests without auth token', async () => {
    await withServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/cms/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ speakers: [] }),
      });
      expect(response.status).toBe(401);
    });
  });

  it('POST /api/cms/content accepts valid auth token and updates contents', async () => {
    const exp = Date.now() + 1000 * 60 * 60;
    const mockToken = Buffer.from(JSON.stringify({ role: 'admin', exp })).toString('base64');

    const updatePayload = {
      speakers: [{ id: 'sp1', name: 'Speaker 1', role: 'Role', organisation: 'Org', bio: 'Bio', avatarUrl: 'url', email: 'email', socialUrl: 'social' }],
    };

    const mockUpsert = vi.fn().mockResolvedValue({ error: null });
    mockFrom.mockReturnValue({
      upsert: mockUpsert,
    });

    await withServer(app, async (baseUrl) => {
      const response = await fetch(`${baseUrl}/api/cms/content`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${mockToken}`,
        },
        body: JSON.stringify(updatePayload),
      });

      expect(response.status).toBe(200);
      const data = await response.json() as { ok?: boolean };
      expect(data.ok).toBe(true);
      expect(mockFrom).toHaveBeenCalledWith('speakers');
      expect(mockUpsert).toHaveBeenCalled();
    });
  });
});
