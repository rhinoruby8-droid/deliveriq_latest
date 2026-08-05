import { Helmet } from '@dr.pogodin/react-helmet';
import { useLocation } from 'react-router-dom';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '../lib/cms-client';

interface SeoHeadProps {
  title?: string;
  description?: string;
  image?: string;
  sessionOverrides?: {
    title?: string;
    description?: string;
    image?: string;
  };
}

export function SeoHead({ title, description, image, sessionOverrides }: SeoHeadProps) {
  const { pathname } = useLocation();
  // We use data or fallback to ensure SSR has something to render if missing
  const { data } = useCmsContent();
  const content = data || FALLBACK_CMS_CONTENT;
  const globalSiteContent = content.globalSiteContent;

  const pageMeta = globalSiteContent?.seoMeta?.[pathname];
  
  const finalTitle = sessionOverrides?.title || title || pageMeta?.title || "DeliverIQ";
  const finalDescription = sessionOverrides?.description || description || pageMeta?.description || "";
  const finalImage = sessionOverrides?.image || image || pageMeta?.ogImageUrl || globalSiteContent?.defaultOgImageUrl || "/airo-assets/images/logo/horizontal";

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
    </Helmet>
  );
}
