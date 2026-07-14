import { Helmet } from '@dr.pogodin/react-helmet';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { SpeakersVisual } from '@/components/page-renderers/SpeakersVisual';
import { DynamicForm } from '@/components/cms/DynamicForm';

export default function ForSpeakersPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.speakersPageHtml;

  const site = 'https://deliveriq.live';
  const title = 'Speak at DeliverIQ — Share Practical AI Skills';
  const description =
    'Apply to speak at DeliverIQ. We welcome project managers, controls professionals, and delivery leaders using AI in real-world project work.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/for-speakers#webpage`,
    name: title,
    url: `${site}/for-speakers`,
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
        <link rel="canonical" href={`${site}/for-speakers`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/for-speakers`} />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {cms.speakersPageCss ? <style>{cms.speakersPageCss}</style> : null}
      </Helmet>

      <main>
        {cms.speakersContent?.visualMode ? (
          <>
            <SpeakersVisual data={cms.speakersContent} />
            <section id="apply" className="py-20 lg:py-28 bg-[#1A1D24] border-t border-[#2C2F38]">
              <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-[#F0EDE8] mb-3">Apply to Speak</h2>
                  <p className="text-sm text-[#8A8D96]">Share your real-world AI insights with a dedicated audience of project professionals.</p>
                </div>
                <DynamicForm formId="speaker" />
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
