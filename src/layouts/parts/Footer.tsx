import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sessions', label: 'Sessions' },
    { href: '/replays', label: 'Replays' },
    { href: '/for-speakers', label: 'For Speakers' },
    { href: '/for-sponsors', label: 'For Sponsors' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <footer className="bg-background border-t-2 border-primary diq-footer">
      <div className="container mx-auto px-6 lg:px-8 py-14 diq-footer-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 diq-footer-grid">
          {/* Brand */}
          <div className="flex flex-col gap-3 diq-footer-brand-col">
            <img
              src="/assets/deliveriq-logo-dark-notag-1400.png"
              alt="DeliverIQ"
              className="h-8 w-auto object-contain self-start shrink-0 diq-footer-logo-img"
            />
            <p className="text-sm text-muted-foreground leading-relaxed mt-1 diq-footer-subheadline">
              The project world's live room.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3 diq-footer-nav-col">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1 diq-footer-nav-title">
              Navigate
            </p>
            <nav className="flex flex-col gap-2 diq-footer-nav">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors diq-footer-nav-link"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Legal */}
          <div className="flex flex-col gap-3 diq-footer-contact-col">
            <p className="text-xs font-semibold tracking-widest text-primary uppercase mb-1 diq-footer-contact-title">
              Contact
            </p>
            <a
              href="mailto:info@deliveriq.live"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors diq-footer-email-link"
            >
              info@deliveriq.live
            </a>
            <div className="flex flex-col gap-2 mt-2 diq-footer-legal-container">
              <Link
                to="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors diq-footer-privacy-link"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors diq-footer-terms-link"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border diq-footer-bottom-bar">
          <p className="text-xs text-muted-foreground diq-footer-copyright">
            © {currentYear} DeliverIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
