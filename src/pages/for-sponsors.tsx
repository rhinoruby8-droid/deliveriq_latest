import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'motion/react';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { SponsorsVisual } from '@/components/page-renderers/SponsorsVisual';
import CheckoutButton from '@/components/CheckoutButton';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Check } from 'lucide-react';

export default function ForSponsorsPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.sponsorsPageHtml || FALLBACK_CMS_CONTENT.sponsorsPageHtml;

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
      <Card className="border-[#2C2F38] bg-[#21242C] shadow-xl">
        <CardHeader className="border-b border-[#2C2F38] pb-4">
          <CardTitle className="text-[10px] font-semibold tracking-widest text-[#C79A4E] uppercase">
            Audience Demographics
          </CardTitle>
          <CardDescription className="text-sm text-[#8A8D96]">
            Who attends DeliverIQ live sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            {[
              { role: 'Project Managers', pct: 42 },
              { role: 'Project Controls Professionals', pct: 31 },
              { role: 'Delivery Leaders & PMO', pct: 18 },
              { role: 'Other Project Professionals', pct: 9 },
            ].map((row, i) => (
              <div key={row.role}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#F0EDE8] font-medium">{row.role}</span>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + (i * 0.1) }}
                    className="text-sm font-bold text-[#C79A4E]"
                  >
                    {row.pct}%
                  </motion.span>
                </div>
                <div className="h-2 bg-[#2C2F38] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#C79A4E] to-[#e0bc7f] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay: 0.2 + (i * 0.1), ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <div className="px-6 py-4 border-t border-[#2C2F38] bg-[#1A1D24] rounded-b-lg">
          <p className="text-[11px] text-[#8A8D96]">Based on registration data across 50+ live sessions.</p>
        </div>
      </Card>
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
        {cms.sponsorsContent?.visualMode ? (
          <>
            <SponsorsVisual data={cms.sponsorsContent} />
            
            {/* Reach Packages / Pricing Tier Section */}
            <section className="py-20 bg-[#15171C]">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-3xl font-bold text-[#F0EDE8] mb-4">Reach Packages</h2>
                  <p className="text-[#8A8D96] max-w-2xl mx-auto">
                    Select a standard package to immediately secure your placement, or contact us for custom opportunities.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* Tier 1: Logo Placement */}
                  <Card className="bg-[#1A1D24] border-[#2C2F38] flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#F0EDE8]">Brand Visibility</CardTitle>
                      <CardDescription>Logo Placement</CardDescription>
                      <div className="mt-4 text-3xl font-bold text-[#F0EDE8]">$500</div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {['Logo on all session pages', 'Logo on newsletter (1 month)', 'Social media mention'].map((benefit, i) => (
                          <li key={i} className="flex items-start text-sm text-[#8A8D96]">
                            <Check className="h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <CheckoutButton sessionTitle="Sponsor Package: Brand Visibility" amount={50000} className="w-full" label="Purchase Package" />
                    </CardFooter>
                  </Card>

                  {/* Tier 2: Dedicated Session */}
                  <Card className="bg-[#21242C] border-[#C79A4E] flex flex-col relative scale-105 shadow-2xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C79A4E] text-[#1A1D24] px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-[#F0EDE8]">Dedicated Session</CardTitle>
                      <CardDescription>Hosted Webinar Slot</CardDescription>
                      <div className="mt-4 text-3xl font-bold text-[#F0EDE8]">$1,500</div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {['45-minute dedicated live session', 'Full lead generation & registration list', 'Branded waiting room', 'Recording hosted on platform'].map((benefit, i) => (
                          <li key={i} className="flex items-start text-sm text-[#8A8D96]">
                            <Check className="h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <CheckoutButton sessionTitle="Sponsor Package: Dedicated Session" amount={150000} className="w-full" label="Purchase Package" />
                    </CardFooter>
                  </Card>

                  {/* Tier 3: Registration List */}
                  <Card className="bg-[#1A1D24] border-[#2C2F38] flex flex-col">
                    <CardHeader>
                      <CardTitle className="text-xl text-[#F0EDE8]">Lead Generation</CardTitle>
                      <CardDescription>Registration List Sharing</CardDescription>
                      <div className="mt-4 text-3xl font-bold text-[#F0EDE8]">$2,500</div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {['Opt-in registration list for 3 sessions', 'Post-event email blast to attendees', 'Prominent logo placement', 'Pre-roll video ad (30s)'].map((benefit, i) => (
                          <li key={i} className="flex items-start text-sm text-[#8A8D96]">
                            <Check className="h-4 w-4 text-[#C79A4E] mr-3 mt-0.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <CheckoutButton sessionTitle="Sponsor Package: Lead Generation" amount={250000} className="w-full" label="Purchase Package" />
                    </CardFooter>
                  </Card>
                </div>
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
