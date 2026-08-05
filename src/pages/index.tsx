import { Helmet } from '@dr.pogodin/react-helmet';
import { SeoHead } from '../components/SeoHead';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { SessionsList } from '@/components/SessionsList';
import { TopicsList } from '@/components/TopicsList';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { HeroVideoBackground } from '@/components/HeroVideoBackground';
import { HomepageVisual } from '@/components/page-renderers/HomepageVisual';

export default function HomePage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.homepageHtml || FALLBACK_CMS_CONTENT.homepageHtml;

  const widgets = {
    HeroVideoBackground: <HeroVideoBackground pageKey="homepage" />,
    SessionsList: <SessionsList />,
    TopicsList: <TopicsList />,
    MarqueeTicker: <MarqueeTicker />
  };

  return (
    <>
      <SeoHead />
      <Helmet>
        {cms.homepageCss ? <style>{cms.homepageCss}</style> : null}
      </Helmet>

      <main>
        {cms.homepageContent?.visualMode ? (
          <>
            <HomepageVisual data={cms.homepageContent} />
            <section className="py-20 lg:py-28 bg-background border-t border-border">
              <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
                {widgets.SessionsList}
              </div>
            </section>
          </>
        ) : (
          <PageHtmlRenderer html={htmlContent} widgets={widgets} />
        )}
      </main>
    </>
  );
}