import { Monitor } from 'lucide-react';
import type {
  HomepageContent, SpeakersPageContent, SponsorsPageContent,
  ContactPageContent, DocumentPageContent, GenericPageContent,
} from '@/lib/cms-client';
import { HomepageVisual } from '@/components/page-renderers/HomepageVisual';
import { SpeakersVisual } from '@/components/page-renderers/SpeakersVisual';
import { SponsorsVisual } from '@/components/page-renderers/SponsorsVisual';
import { ContactVisual } from '@/components/page-renderers/ContactVisual';
import { DocumentVisual } from '@/components/page-renderers/DocumentVisual';
import { RegisterVisual } from '@/components/page-renderers/RegisterVisual';

type PageKey = 'homepage' | 'sessions' | 'speakers' | 'sponsors' | 'contact' | 'privacy' | 'terms' | 'register' | 'replays' | 'session-detail' | '404';

interface Props {
  page: PageKey;
  content: unknown;
}

export function LivePreviewPanel({ page, content }: Props) {
  const renderPreview = () => {
    switch (page) {
      case 'homepage': return <HomepageVisual data={content as HomepageContent} />;
      case 'speakers': return <SpeakersVisual data={content as SpeakersPageContent} />;
      case 'sponsors': return <SponsorsVisual data={content as SponsorsPageContent} />;
      case 'contact':  return <ContactVisual data={content as ContactPageContent} />;
      case 'register': return <RegisterVisual data={content as GenericPageContent} />;
      case 'privacy':
      case 'terms':   return <DocumentVisual data={content as DocumentPageContent} />;
      case 'sessions':
      case 'replays':
      case 'session-detail':
      case '404':
        return (
          <section className="pt-20 pb-16 container mx-auto px-6">
            <h1 className="text-4xl font-bold text-[#F0EDE8] mb-4">{(content as GenericPageContent).hero?.title || ''}</h1>
            <p className="text-[#8A8D96]">{(content as GenericPageContent).hero?.subtitle || ''}</p>
          </section>
        );
      default: return <div className="p-8 text-[#8A8D96] text-sm">No preview available</div>;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#2C2F38] bg-[#1A1D24]/60">
        <Monitor size={12} className="text-[#C79A4E]" />
        <span className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-widest">Live Preview</span>
        <span className="ml-auto text-[10px] text-[#4A4D56]">Updates as you type</span>
      </div>
      <div className="flex-1 overflow-hidden relative bg-[#1A1D24]">
        {/* Scale the preview to fit the panel */}
        <div
          className="absolute origin-top-left bg-[#1A1D24]"
          style={{
            width: '1200px',
            transform: 'scale(0.42)',
            transformOrigin: 'top left',
            minHeight: '100%',
          }}
        >
          {renderPreview()}
        </div>
      </div>
    </div>
  );
}
