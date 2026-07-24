import { Helmet } from '@dr.pogodin/react-helmet';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { SessionsList } from '@/components/SessionsList';
import { TopicsList } from '@/components/TopicsList';

export default function SessionsPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.sessionsPageHtml || FALLBACK_CMS_CONTENT.sessionsPageHtml;

  const site = 'https://deliveriq.live';
  const title = 'Sessions — DeliverIQ';
  const description =
    'Practical live sessions on applying AI tools to project management, project controls, and delivery leadership.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/sessions#webpage`,
    name: title,
    url: `${site}/sessions`,
    description,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` }
  };

  const widgets = {
    SessionsList: <SessionsList />,
    TopicsList: <TopicsList />
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/sessions`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/sessions`} />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {cms.sessionsPageCss ? <style>{cms.sessionsPageCss}</style> : null}
      </Helmet>

      <main>
        <PageHtmlRenderer html={htmlContent} widgets={widgets} />
      </main>
    </>
  );
}
