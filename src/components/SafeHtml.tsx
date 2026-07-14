import React from 'react';

interface SafeHtmlProps extends React.HTMLAttributes<HTMLDivElement> {
  html?: string;
  as?: 'div' | 'span';
}

export function SafeHtml({ html, as = 'div', ...props }: SafeHtmlProps) {
  if (!html) return null;
  const Component = as;
  return <Component {...props} dangerouslySetInnerHTML={{ __html: html }} />;
}
