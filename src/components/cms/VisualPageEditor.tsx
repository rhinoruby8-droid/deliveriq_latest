/**
 * VisualPageEditor — wraps all block editors for a given page.
 * Renders the correct combination of block editors based on the active page key.
 */
import type {
  CmsContent, HomepageContent, SpeakersPageContent, SponsorsPageContent,
  ContactPageContent, DocumentPageContent, GenericPageContent,
} from '@/lib/cms-client';
import { HeroEditor } from './blocks/HeroEditor';
import { StatsEditor } from './blocks/StatsEditor';
import { TextBlockEditor } from './blocks/TextBlockEditor';
import { BenefitsEditor } from './blocks/BenefitsEditor';
import { CtaEditor } from './blocks/CtaEditor';
import { DocumentEditor } from './blocks/DocumentEditor';
import { ContactEditor } from './blocks/ContactEditor';
import { TiersEditor } from './blocks/TiersEditor';

export type VisualPageKey = 'homepage' | 'sessions' | 'speakers' | 'sponsors' | 'contact' | 'privacy' | 'terms' | 'register' | 'replays' | 'session-detail' | '404';

interface Props {
  page: VisualPageKey;
  content: CmsContent;
  onContentChange: (content: CmsContent) => void;
}

export function VisualPageEditor({ page, content, onContentChange }: Props) {
  // ── Homepage ───────────────────────────────────────────────────────────
  if (page === 'homepage') {
    const c: HomepageContent = content.homepageContent!;
    const set = (patch: Partial<HomepageContent>) =>
      onContentChange({ ...content, homepageContent: { ...c, ...patch } });
    return (
      <div className="flex flex-col gap-6">
        <HeroEditor value={c.hero} onChange={hero => set({ hero })} />
        <StatsEditor value={c.stats} onChange={stats => set({ stats })} />
        <TextBlockEditor
          label="Intro Paragraph"
          showTitle={false}
          value={{ body: c.introParagraph }}
          onChange={v => set({ introParagraph: v.body })}
        />
      </div>
    );
  }

  // ── Generic Pages (sessions, register, replays, session-detail, 404) ───
  if (page === 'sessions' || page === 'register' || page === 'replays' || page === 'session-detail' || page === '404') {
    const contentKey = 
      page === 'sessions' ? 'sessionsContent' :
      page === 'register' ? 'registerContent' :
      page === 'replays' ? 'replaysContent' :
      page === 'session-detail' ? 'sessionDetailContent' :
      'notFoundContent';

    const c: GenericPageContent = (content[contentKey] || { visualMode: true, hero: { title: '', subtitle: '' }, sections: [] }) as GenericPageContent;
    const set = (patch: Partial<GenericPageContent>) =>
      onContentChange({ ...content, [contentKey]: { ...c, ...patch } });

    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 p-5 bg-[#1A1D24]/60 border border-[#2C2F38] rounded-sm">
          <p className="text-[10px] font-bold text-[#C79A4E] uppercase tracking-widest">Page Header</p>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">Title</label>
            <input
              className="bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-3 py-2 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors w-full"
              value={c.hero?.title || ''}
              onChange={e => set({ hero: { ...(c.hero || { title: '', subtitle: '' }), title: e.target.value } })}
              placeholder="Page Title"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-[#8A8D96] uppercase tracking-wider">Subtitle</label>
            <textarea
              className="bg-[#1A1D24] border border-[#2C2F38] rounded-sm px-3 py-2 text-sm text-[#F0EDE8] placeholder-[#4A4D56] focus:outline-none focus:border-[#C79A4E]/60 transition-colors w-full resize-none"
              rows={2}
              value={c.hero?.subtitle || ''}
              onChange={e => set({ hero: { ...(c.hero || { title: '', subtitle: '' }), subtitle: e.target.value } })}
              placeholder="Supporting subtitle"
            />
          </div>
        </div>
        {(c.sections || []).map((s, i) => (
          <TextBlockEditor
            key={i}
            label={`Section ${i + 1}`}
            value={s}
            onChange={v => {
              const sections = [...(c.sections || [])];
              sections[i] = v;
              set({ sections });
            }}
          />
        ))}
      </div>
    );
  }

  // ── Speakers ───────────────────────────────────────────────────────────
  if (page === 'speakers') {
    const c: SpeakersPageContent = content.speakersContent!;
    const set = (patch: Partial<SpeakersPageContent>) =>
      onContentChange({ ...content, speakersContent: { ...c, ...patch } });
    return (
      <div className="flex flex-col gap-6">
        <HeroEditor value={c.hero} onChange={hero => set({ hero })} />
        <BenefitsEditor value={c.benefits} onChange={benefits => set({ benefits })} />
        <CtaEditor value={c.cta} onChange={cta => set({ cta })} />
      </div>
    );
  }

  // ── Sponsors ───────────────────────────────────────────────────────────
  if (page === 'sponsors') {
    const c: SponsorsPageContent = content.sponsorsContent!;
    const set = (patch: Partial<SponsorsPageContent>) =>
      onContentChange({ ...content, sponsorsContent: { ...c, ...patch } });
    return (
      <div className="flex flex-col gap-6">
        <HeroEditor value={c.hero} onChange={hero => set({ hero })} />
        <TiersEditor value={c.tiers} onChange={tiers => set({ tiers })} />
        <CtaEditor value={c.cta} onChange={cta => set({ cta })} />
      </div>
    );
  }

  // ── Contact ───────────────────────────────────────────────────────────
  if (page === 'contact') {
    const c: ContactPageContent = content.contactContent!;
    return (
      <ContactEditor
        value={c}
        onChange={contactContent => onContentChange({ ...content, contactContent })}
      />
    );
  }

  // ── Privacy ────────────────────────────────────────────────────────────
  if (page === 'privacy') {
    const c: DocumentPageContent = content.privacyContent!;
    return (
      <DocumentEditor
        value={c}
        onChange={privacyContent => onContentChange({ ...content, privacyContent })}
      />
    );
  }

  // ── Terms ──────────────────────────────────────────────────────────────
  if (page === 'terms') {
    const c: DocumentPageContent = content.termsContent!;
    return (
      <DocumentEditor
        value={c}
        onChange={termsContent => onContentChange({ ...content, termsContent })}
      />
    );
  }

  return null;
}
