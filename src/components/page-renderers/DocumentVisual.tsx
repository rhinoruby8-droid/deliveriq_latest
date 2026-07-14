import type { DocumentPageContent } from '@/lib/cms-client';

interface Props { data: DocumentPageContent; }

export function DocumentVisual({ data }: Props) {
  const { title, lastUpdated, sections } = data;
  return (
    <main className="container mx-auto px-6 lg:px-8 max-w-3xl py-20">
      <h1 className="text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-3">{title}</h1>
      {lastUpdated && (
        <p className="text-xs text-[#8A8D96] mb-10 border-b border-[#2C2F38] pb-6">
          Last updated: {new Date(lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      )}
      <div className="flex flex-col gap-10">
        {sections.map((s, i) => (
          <section key={i}>
            {s.title && <h2 className="text-lg font-bold text-[#F0EDE8] mb-3">{s.title}</h2>}
            <p className="text-sm text-[#8A8D96] leading-relaxed whitespace-pre-wrap">{s.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
