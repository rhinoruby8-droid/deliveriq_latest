import { Helmet } from '@dr.pogodin/react-helmet';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { ContactVisual } from '@/components/page-renderers/ContactVisual';

export default function ContactPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  let htmlContent = cms.contactPageHtml || '';

  const site = 'https://deliveriq.live';
  const title = 'Contact — DeliverIQ';
  const description = 'Get in touch with the DeliverIQ team. Questions about sessions, speaking, sponsorship, or anything else — we read every message.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${site}/contact#webpage`,
    name: title,
    url: `${site}/contact`,
    description,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
  };

  const widgets = {};

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/contact`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/contact`} />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {cms.contactPageCss ? <style>{cms.contactPageCss}</style> : null}
      </Helmet>

      <main>
        {cms.contactContent?.visualMode
          ? <ContactVisual data={cms.contactContent} />
          : <PageHtmlRenderer html={htmlContent} widgets={widgets} />
        }
      </main>
    </>
  );
}
