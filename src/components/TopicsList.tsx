import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';

export function TopicsList() {
  const { data: cms } = useCmsContent();
  
  // Use CMS topics if they exist and are non-empty, otherwise use fallback
  const topics = cms?.topics && cms.topics.length > 0 
    ? cms.topics 
    : FALLBACK_CMS_CONTENT.topics || [];

  if (topics.length === 0) {
    return <div className="text-red-500 py-4">No topics found. Please add topics in the Admin panel.</div>;
  }

  return (
    <div className="container mx-auto px-6 lg:px-8">
      {topics.map((topic) => (
        <div key={topic.id} className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-12 py-8 border-t border-border last:border-b">
          <p className="text-base font-semibold text-foreground">{topic.title}</p>
          <p className="text-sm text-muted-foreground leading-relaxed self-center">{topic.description}</p>
        </div>
      ))}
    </div>
  );
}
