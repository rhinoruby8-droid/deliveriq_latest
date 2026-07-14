/** Mounts the Inbox chat widget for all visitors. */

import { useEffect, useRef } from 'react';

import config from '../lib/inboxChat.config.json';

const SCRIPT_ID = 'conversations-js';

function getReamazeCdnUrl(): string {
  return 'https://cdn.reamaze.com/assets/reamaze.js';
}

declare global {
  interface Window {
    _support?: Record<string, unknown>;
  }
}

export default function InboxChatWidget() {
  const scriptInjected = useRef(false);

  useEffect(() => {
    function loadWidget(): void {
      if (!config._support.account || scriptInjected.current || document.getElementById(SCRIPT_ID)) return;
      scriptInjected.current = true;

      window._support = { ...window._support, ...config._support };

      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = getReamazeCdnUrl();
      document.head.appendChild(script);
    }

    loadWidget();
  }, []);

  return null;
}
