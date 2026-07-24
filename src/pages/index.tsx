import { Helmet } from '@dr.pogodin/react-helmet';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { SessionsList } from '@/components/SessionsList';
import { TopicsList } from '@/components/TopicsList';
import { MarqueeTicker } from '@/components/MarqueeTicker';
import { HomepageVisual } from '@/components/page-renderers/HomepageVisual';

export default function HomePage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.homepageHtml || FALLBACK_CMS_CONTENT.homepageHtml;

  const site = 'https://deliveriq.live';
  const title = "DeliverIQ — The Project World's Live Room";
  const description =
    'Live, expert-led sessions where project managers, project controls, and delivery professionals master AI in real project work.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': `${site}/#website`, name: 'DeliverIQ', url: `${site}/` },
      {
        '@type': 'Organization',
        '@id': `${site}/#organization`,
        name: 'DeliverIQ',
        url: `${site}/`,
        email: 'info@deliveriq.live'
      },
      {
        '@type': 'WebPage',
        '@id': `${site}/#webpage`,
        url: `${site}/`,
        name: title,
        description,
        isPartOf: { '@id': `${site}/#website` },
        about: { '@id': `${site}/#organization` },
        datePublished: '2026-06-28',
        dateModified: '2026-06-28'
      }
    ]
  };

  const widgets = {
    SessionsList: <SessionsList />,
    TopicsList: <TopicsList />,
    MarqueeTicker: <MarqueeTicker />
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={site} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={site} />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
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