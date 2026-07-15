import { createRequire } from "module";
const require2 = createRequire(import.meta.url);
function trackEvent(eventName, params) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", eventName, params);
}
export {
  trackEvent as t
};
