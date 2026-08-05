import { Helmet } from '@dr.pogodin/react-helmet';
import { SeoHead } from '../components/SeoHead';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { SessionsList } from '@/components/SessionsList';
import { TopicsList } from '@/components/TopicsList';
import { SessionsHeroVisual } from '@/components/page-renderers/SessionsHeroVisual';

export default function SessionsPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.sessionsPageHtml || FALLBACK_CMS_CONTENT.sessionsPageHtml;

  const widgets = {
    SessionsList: <SessionsList />,
    TopicsList: <TopicsList />
  };

  return (
    <>
      <SeoHead />
      <Helmet>
        {cms.sessionsPageCss ? <style>{cms.sessionsPageCss}</style> : null}
      </Helmet>

      <main>
        <SessionsHeroVisual />
        <PageHtmlRenderer html={htmlContent} widgets={widgets} />
        {!htmlContent?.includes('[SessionsList]') && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-6 lg:px-8">
              <SessionsList />
            </div>
          </section>
        )}
      </main>
    </>
  );
}
