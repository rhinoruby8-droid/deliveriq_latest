import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { SponsorsVisual } from '@/components/page-renderers/SponsorsVisual';

export default function ForSponsorsPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.sponsorsPageHtml;

  const site = 'https://deliveriq.live';
  const title = 'Sponsor DeliverIQ — Reach Project Professionals';
  const description =
    'Sponsorship opportunities at DeliverIQ. Put your brand in front of project managers, project controls professionals, and delivery leaders actively learning AI skills.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site}/for-sponsors#webpage`,
    name: title,
    url: `${site}/for-sponsors`,
    description,
    isPartOf: { '@id': `${site}/#website` },
    about: { '@id': `${site}/#organization` },
  };

  const widgets = {
    SponsorStats: (
      <div className="border border-[#2C2F38] bg-[#21242C] rounded-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[#2C2F38]">
          <p className="text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase">Who attends DeliverIQ</p>
        </div>
        <div className="divide-y divide-[#2C2F38]">
          {[
            { role: 'Project Managers', pct: 42 },
            { role: 'Project Controls Professionals', pct: 31 },
            { role: 'Delivery Leaders & PMO', pct: 18 },
            { role: 'Other Project Professionals', pct: 9 },
          ].map((row) => (
            <div key={row.role} className="px-6 py-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#F0EDE8] font-medium">{row.role}</span>
                <span className="text-sm font-bold text-[#C79A4E]">{row.pct}%</span>
              </div>
              <div className="h-1 bg-[#2C2F38] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#C79A4E] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' as const }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-[#2C2F38] bg-[#1A1D24]">
          <p className="text-[11px] text-[#8A8D96]">Audience breakdown based on registration data across disciplines.</p>
        </div>
      </div>
    )
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${site}/for-sponsors`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${site}/for-sponsors`} />
        <meta property="og:image" content={`${site}/airo-assets/images/logo/horizontal`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        {cms.sponsorsPageCss ? <style>{cms.sponsorsPageCss}</style> : null}
      </Helmet>

      <main>
        {cms.sponsorsContent?.visualMode
          ? <SponsorsVisual data={cms.sponsorsContent} />
          : <PageHtmlRenderer html={htmlContent} widgets={widgets} />
        }
      </main>
    </>
  );
}
