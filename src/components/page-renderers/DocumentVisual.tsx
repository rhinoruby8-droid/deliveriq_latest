import type { DocumentPageContent } from '@/lib/cms-client';

interface Props { data: DocumentPageContent; }

export function DocumentVisual({ data }: Props) {
  const { title, lastUpdated, sections } = data;
  return (
    <main className="container mx-auto px-6 lg:px-8 max-w-3xl py-20 diq-document-main">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 diq-document-title">{title}</h1>
      {lastUpdated && (
        <p className="text-xs text-muted-foreground mb-10 border-b border-border pb-6 diq-document-updated">
          Last updated: {new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      )}
      <div className="flex flex-col gap-10 diq-document-sections-list">
        {sections.map((s, i) => (
          <section key={i} className="diq-document-section-block">
            {s.title && <h2 className="text-lg font-bold text-foreground mb-3 diq-document-section-title">{s.title}</h2>}
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap diq-document-section-body">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
