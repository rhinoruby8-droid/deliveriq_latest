import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';
import { SeoHead } from '../components/SeoHead';
import { PageHtmlRenderer } from '@/components/PageHtmlRenderer';

import { Helmet } from '@dr.pogodin/react-helmet';

export default function NotFoundPage() {
  const { data: cms = FALLBACK_CMS_CONTENT } = useCmsContent();

  return (
    <>
      <SeoHead />
      <Helmet>
        {cms.notFoundPageCss ? <style>{cms.notFoundPageCss}</style> : null}
      </Helmet>
      <main>
        <PageHtmlRenderer html={cms.notFoundPageHtml || FALLBACK_CMS_CONTENT.notFoundPageHtml} />
      </main>
    </>
  );
}
