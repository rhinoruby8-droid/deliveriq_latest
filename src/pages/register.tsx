import { Helmet } from '@dr.pogodin/react-helmet';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';

export default function RegisterPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  let htmlContent = cms.registerPageHtml || FALLBACK_CMS_CONTENT.registerPageHtml;
  
  const [searchParams] = useSearchParams();
  const sessionSlug = searchParams.get('session');

  const site = 'https://deliveriq.live';
  const title = 'Register — DeliverIQ';
  const description =
    'Register your interest for DeliverIQ live sessions. Be the first to know when registration opens for AI learning sessions built for project professionals.';
  const canonicalUrl = `${site}/register`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    name: title,
    url: canonicalUrl,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` }
  };

  // Find matching session if slug provided
  const matchedSession = (cms?.sessions || []).find(s => s.id === sessionSlug);

  // Pre-select discipline based on session tag
  useEffect(() => {
    if (matchedSession) {
      // Logic handled dynamically in form now if needed
    }
  }, [matchedSession]);

  const widgets = {};

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {cms.registerPageCss ? <style>{cms.registerPageCss}</style> : null}
      </Helmet>
      <main>
        <PageHtmlRenderer html={htmlContent} widgets={widgets} />
      </main>
    </>
  );
}