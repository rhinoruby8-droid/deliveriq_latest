// User Auth Client

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'speaker' | 'delegate';
  registered_session_ids?: string[];
  minutes_attended?: number;
  hours_watched?: number;
  subscription_tier?: string;
  subscription_expires_at?: string;
  session_access?: Record<string, { tier: string; expires_at?: string }>;
}

export type Delegate = User; // For backwards compatibility

export function getUserToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('deliveriq_delegate_token') || localStorage.getItem('deliveriq_cms_token');
}

export function setUserToken(token: string) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('deliveriq_delegate_token', token);
}

export function removeUserToken() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('deliveriq_delegate_token');
}

export async function fetchMe(): Promise<Delegate | null> {
  const token = getUserToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      if (res.status === 401) removeUserToken();
      return null;
    }
    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
}

export async function registerForSession(sessionId: string): Promise<boolean> {
  const token = getUserToken();
  if (!token) return false;

  try {
    const res = await fetch('/api/user/register-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ sessionId })
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function fetchDashboardData() {
  const token = getUserToken();
  if (!token) return null;

  try {
    const res = await fetch('/api/user/dashboard', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Telemetry function for watch-time
export async function trackWatchTime(type: 'live' | 'recording', minutes: number = 1): Promise<void> {
  const token = getUserToken();
  if (!token) return;

  try {
    await fetch('/api/user/telemetry/watch-time', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ type, minutes })
    });
  } catch {
    // silently fail
  }
}
