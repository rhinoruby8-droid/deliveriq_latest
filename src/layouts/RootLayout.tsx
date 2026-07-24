import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration, useLocation } from 'react-router-dom';
import { useCmsContent } from '@/lib/cms-client';

import Footer from '@/layouts/parts/Footer';
import Header from '@/layouts/parts/Header';
import Website from '@/layouts/Website';

/**
 * Root layout component that wraps all pages with consistent header and footer.
 *
 * To customize the header or footer, directly edit the Header.tsx and Footer.tsx
 * files in the layouts/parts directory.
 *
 * Site-wide <title> and <meta> live in the <Helmet> below. Individual pages can
 * override them by rendering their own <Helmet> — last-mounted wins.
 */
interface RootLayoutProps {
  children: ReactElement;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const { data: cms } = useCmsContent();
  const location = useLocation();
  const isEmbed = location.pathname.startsWith('/embed/');
  const isDashboard = location.pathname.startsWith('/dashboard');

  if (isEmbed) {
    return (
      <>
        {cms?.globalCss ? (
          <style id="global-css-override" dangerouslySetInnerHTML={{ __html: cms.globalCss }} />
        ) : null}
        {children}
      </>
    );
  }

  // Dashboard pages use their own layout below the main website header.
  // We render the global Header but omit the Footer to maintain full-screen dashboard size.
  if (isDashboard) {
    return (
      <Website className="h-screen max-h-screen overflow-hidden flex flex-col">
        {cms?.globalCss ? (
          <style id="global-css-override" dangerouslySetInnerHTML={{ __html: cms.globalCss }} />
        ) : null}
        <style dangerouslySetInnerHTML={{ __html: `
          html, body, #app {
            overflow: hidden !important;
            height: 100vh !important;
            height: 100dvh !important;
            max-height: 100vh !important;
            max-height: 100dvh !important;
          }
        `}} />
        <ScrollRestoration />
        <Header />
        <main className="flex-1 w-full overflow-hidden flex flex-col relative z-10">
          {children}
        </main>
      </Website>
    );
  }

  return (
    <Website>
      {cms?.globalCss ? (
        <style id="global-css-override" dangerouslySetInnerHTML={{ __html: cms.globalCss }} />
      ) : null}
      <Helmet>
        <title>DeliverIQ — The Project World's Live Room</title>
        <meta
          name="description"
          content="Live, expert-led sessions where project managers, project controls, and delivery professionals master AI in real project work."
        />
      </Helmet>
      <ScrollRestoration />
      <Header />
      <main className="flex-1 w-full diq-main-body">
        {children}
      </main>
      <Footer />
    </Website>
  );
}
