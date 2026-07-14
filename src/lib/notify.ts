/**
 * Fire-and-forget helper that posts a form submission to /api/notify.
 * Always resolves — never throws — so callers can safely await it without
 * wrapping in try/catch.
 */
export async function notifySubmission(payload: {
  source: string;
  name?: string;
  email: string;
  discipline?: string;
  message?: string;
  extra?: Record<string, string>;
}): Promise<void> {
  try {
    await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    // Silently swallow — email delivery failure must never block the user
  }
}
