import { Helmet } from '@dr.pogodin/react-helmet';
import { type ReactElement } from 'react';
import { ScrollRestoration } from 'react-router-dom';
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
      {children}
      <Footer />
    </Website>
  );
}
