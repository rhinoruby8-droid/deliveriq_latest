/**
 * Google Analytics 4 — consent-gated loader.
 *
 * Only loads the gtag script after the visitor has accepted analytics cookies.
 * Respects the CookieBanner consent API from analytics-consent.ts.
 */
import { getAnalyticsConsent, onConsentChange } from './analytics-consent';

const MEASUREMENT_ID = 'G-1D0MWL6259';

let loaded = false;

function injectGtag(): void {
  if (loaded || typeof window === 'undefined') return;
  loaded = true;

  // Inject the gtag script tag
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialise the data layer
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', MEASUREMENT_ID, {
    // Anonymise IPs for GDPR compliance
    anonymize_ip: true,
    // Send page_view on each navigation
    send_page_view: true,
  });
}

/**
 * Call once at app boot. Loads GA4 immediately if consent is already given,
 * otherwise waits for the visitor to accept via the cookie banner.
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  if (getAnalyticsConsent()) {
    injectGtag();
  }

  onConsentChange((consented) => {
    if (consented) injectGtag();
  });
}

/**
 * Manually track a page view — useful for SPA route changes.
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('config', MEASUREMENT_ID, { page_path: path });
}

/**
 * Track a custom event.
 *
 * @example
 * trackEvent('session_register', { session_title: 'AI Risk Analysis' });
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', eventName, params);
}

// Extend Window type
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}
