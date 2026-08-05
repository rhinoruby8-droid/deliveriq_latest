import { Helmet } from '@dr.pogodin/react-helmet';
import { SeoHead } from '../components/SeoHead';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { DocumentVisual } from '@/components/page-renderers/DocumentVisual';
import { AetherHeroSection } from '@/components/AetherHeroSection';

export default function PrivacyPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.privacyPageHtml || FALLBACK_CMS_CONTENT.privacyPageHtml;

  return (
    <>
      <SeoHead />
      <Helmet>
        {cms.privacyPageCss ? <style>{cms.privacyPageCss}</style> : null}
      </Helmet>

      <AetherHeroSection
        title="Privacy Policy"
        subtitle="How DeliverIQ collects, uses, and protects your personal information."
        badgeLabel="Legal"
        ctaLabel="Read the Policy"
        scrollTargetId="policy-content"
      />

      <main id="policy-content" className="scroll-mt-24">
        {cms.privacyContent?.visualMode
          ? <DocumentVisual data={cms.privacyContent} />
          : <PageHtmlRenderer html={htmlContent} widgets={{}} />
        }
      </main>
    </>
  );
}
