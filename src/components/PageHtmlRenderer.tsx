import React from 'react';
import { SafeHtml } from './SafeHtml';
import { DynamicForm } from './cms/DynamicForm';

interface PageHtmlRendererProps {
  html?: string;
  widgets?: Record<string, React.ReactNode>;
}

export function PageHtmlRenderer({ html, widgets = {} }: PageHtmlRendererProps) {
  if (!html) return null;

  const widgetNames = Object.keys(widgets);
  const widgetPattern = widgetNames.length > 0 
    ? widgetNames.map((name) => `\\[${name}\\]`).join('|') 
    : '';

  // Match: [WidgetName] OR <DynamicForm formId="foo" /> OR &lt;DynamicForm formId=&quot;foo&quot; /&gt; OR [DynamicForm formId="foo"]
  const tokenRegex = new RegExp(
    `(${widgetPattern ? widgetPattern + '|' : ''}(?:<|&lt;|\\[)DynamicForm\\s+formId=(?:["']|&quot;|”|“|\\s)*(?:[a-zA-Z0-9_-]+)(?:["']|&quot;|”|“|\\s)*(?:\\/)?(?:>|&gt;|\\])(?:\\s*(?:<|&lt;)\\/DynamicForm(?:>|&gt;))?)`,
    'g'
  );

  const parts = html.split(tokenRegex);

  return (
    <>
      {parts.map((part, i) => {
        if (!part) return null;

        if (part.startsWith('[') && part.endsWith(']')) {
          const widgetName = part.slice(1, -1);
          if (widgets[widgetName] !== undefined) {
            return <React.Fragment key={i}>{widgets[widgetName]}</React.Fragment>;
          }
        }

        if (part.includes('DynamicForm') && part.includes('formId=')) {
          const match = part.match(/formId=(?:["']|&quot;|”|“|\s)*([a-zA-Z0-9_-]+)/);
          if (match && match[1]) {
            return <DynamicForm key={i} formId={match[1]} />;
          }
        }

        return <SafeHtml key={i} html={part} />;
      })}
    </>
  );
}
