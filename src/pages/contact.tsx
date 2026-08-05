import { Helmet } from '@dr.pogodin/react-helmet';
import { SeoHead } from '../components/SeoHead';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';
import { ContactVisual } from '@/components/page-renderers/ContactVisual';
import { DynamicForm } from '@/components/cms/DynamicForm';

export default function ContactPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();
  const htmlContent = cms.contactPageHtml || FALLBACK_CMS_CONTENT.contactPageHtml;

  const widgets = {};

  return (
    <>
      <SeoHead />
      <Helmet>
        {cms.contactPageCss ? <style>{cms.contactPageCss}</style> : null}
      </Helmet>

      <main>
        {cms.contactContent?.visualMode ? (
          <>
            <ContactVisual data={cms.contactContent} />
            <section id="form" className="py-16 lg:py-20 border-t border-border bg-background">
              <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold text-foreground mb-3">Send a Message</h2>
                  <p className="text-sm text-muted-foreground">Fill out the form below and we will get back to you shortly.</p>
                </div>
                <DynamicForm formId="contact" />
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
