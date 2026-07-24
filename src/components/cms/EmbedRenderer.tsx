import { useEffect, useRef } from 'react';

interface EmbedRendererProps {
  html: string;
}

export function EmbedRenderer({ html }: EmbedRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Automatically normalize hardcoded local host ports (e.g. localhost:5173, 3000) to current origin
    const processedHtml = typeof window !== 'undefined'
      ? html.replace(/(https?:)?\/\/(localhost|127\.0\.0\.1):\d+(\/embed\/form\/)/gi, `${window.location.origin}$3`)
      : html;

    // Set the HTML content
    containerRef.current.innerHTML = processedHtml;

    // React dangerouslySetInnerHTML does not execute <script> tags.
    // We need to manually extract and recreate them to execute third-party embeds (like HubSpot).
    const scripts = containerRef.current.querySelectorAll('script');
    
    scripts.forEach((oldScript) => {
      const newScript = document.createElement('script');
      
      // Copy all attributes
      Array.from(oldScript.attributes).forEach(attr => {
        newScript.setAttribute(attr.name, attr.value);
      });
      
      // Copy inline script content
      if (oldScript.innerHTML) {
        newScript.innerHTML = oldScript.innerHTML;
      }
      
      // Replace the old script with the new executable one
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });
  }, [html]);

  return <div ref={containerRef} className="deliveriq-embed-container" />;
}
