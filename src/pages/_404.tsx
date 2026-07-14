import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';

import { Helmet } from '@dr.pogodin/react-helmet';

export default function NotFoundPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();

  return (
    <>
      <Helmet>
        <title>404 Not Found — DeliverIQ</title>
        {cms.notFoundPageCss ? <style>{cms.notFoundPageCss}</style> : null}
      </Helmet>
      <main>
        <PageHtmlRenderer html={cms.notFoundPageHtml} />
      </main>
    </>
  );
}
