import { Helmet } from '@dr.pogodin/react-helmet';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { DocumentVisual } from '@/components/page-renderers/DocumentVisual';

export default function PrivacyPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.privacyPageHtml;

  const site = 'https://deliveriq.live';
  const title = 'Privacy Policy — DeliverIQ';
  const description = 'How DeliverIQ collects, uses, and protects your personal information.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/privacy#webpage`,
    name: title,
    url: `${site}/privacy`,
    description,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/privacy`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/privacy`} />
        <meta name="robots" content="noindex" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {cms.privacyPageCss ? <style>{cms.privacyPageCss}</style> : null}
      </Helmet>

      <main>
        {cms.privacyContent?.visualMode
          ? <DocumentVisual data={cms.privacyContent} />
          : <PageHtmlRenderer html={htmlContent} widgets={{}} />
        }
      </main>
    </>
  );
}
