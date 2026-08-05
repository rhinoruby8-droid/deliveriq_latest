import { Helmet } from '@dr.pogodin/react-helmet';
import { SeoHead } from '../components/SeoHead';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { DocumentVisual } from '@/components/page-renderers/DocumentVisual';
import { AetherHeroSection } from '@/components/AetherHeroSection';

export default function TermsPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.termsPageHtml || FALLBACK_CMS_CONTENT.termsPageHtml;

  return (
    <>
      <SeoHead />
      <Helmet>
        {cms.termsPageCss ? <style>{cms.termsPageCss}</style> : null}
      </Helmet>

      <AetherHeroSection
        title="Terms of Use"
        subtitle="Terms and conditions governing use of the DeliverIQ platform and services."
        badgeLabel="Legal"
        ctaLabel="Read the Terms"
        scrollTargetId="terms-content"
      />

      <main id="terms-content" className="scroll-mt-24">
        {cms.termsContent?.visualMode
          ? <DocumentVisual data={cms.termsContent} />
          : <PageHtmlRenderer html={htmlContent} widgets={{}} />
        }
      </main>
    </>
  );
}
