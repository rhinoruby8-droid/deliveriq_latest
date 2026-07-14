import { Helmet } from '@dr.pogodin/react-helmet';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { DocumentVisual } from '@/components/page-renderers/DocumentVisual';

export default function TermsPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.termsPageHtml;

  const site = 'https://deliveriq.live';
  const title = 'Terms of Use — DeliverIQ';
  const description = 'Terms and conditions governing use of the DeliverIQ platform and services.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/terms#webpage`,
    name: title,
    url: `${site}/terms`,
    description,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/terms`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/terms`} />
        <meta name="robots" content="noindex" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {cms.termsPageCss ? <style>{cms.termsPageCss}</style> : null}
      </Helmet>

      <main>
        {cms.termsContent?.visualMode
          ? <DocumentVisual data={cms.termsContent} />
          : <PageHtmlRenderer html={htmlContent} widgets={{}} />
        }
      </main>
    </>
  );
}
