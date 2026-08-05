import { Helmet } from '@dr.pogodin/react-helmet';
import { SeoHead } from '../components/SeoHead';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { SpeakersVisual } from '@/components/page-renderers/SpeakersVisual';
import { SpeakersHeroVisual } from '@/components/page-renderers/SpeakersHeroVisual';
import { SpeakerGrid } from '@/components/SpeakerGrid';

export default function ForSpeakersPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.speakersPageHtml || FALLBACK_CMS_CONTENT.speakersPageHtml;

  const widgets = {};

  return (
    <>
      <SeoHead />
      <Helmet>
        {cms.speakersPageCss ? <style>{cms.speakersPageCss}</style> : null}
      </Helmet>

      <main>
        {cms.speakersContent?.visualMode ? (
          <SpeakersVisual data={cms.speakersContent} />
        ) : (
          <>
            <SpeakersHeroVisual />
            <SpeakerGrid speakers={cms.speakers || []} />
            <PageHtmlRenderer html={htmlContent} widgets={widgets} />
          </>
        )}
      </main>
    </>
  );
}
