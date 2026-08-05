import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect, type MouseEvent } from 'react';
import { UserNav } from '../../components/UserNav';
import { getUserToken } from '@/lib/user-auth';
import AuthDialog from '@/components/AuthDialog';
import { ModeToggle } from '@/components/ModeToggle';
import { ThemeAwareLogo } from '@/components/ThemeAwareLogo';
import { useCmsContent, FALLBACK_CMS_CONTENT } from '@/lib/cms-client';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = getUserToken();
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const { data } = useCmsContent();
  const content = data || FALLBACK_CMS_CONTENT;
  const navItems = content.globalSiteContent?.header.navItems || FALLBACK_CMS_CONTENT.globalSiteContent!.header.navItems;

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 diq-header ${
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-border'
          : 'bg-background border-b border-border'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 diq-header-container">
        <div className="flex h-[84px] items-center justify-between diq-header-row">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0 diq-header-logo-link">
            <ThemeAwareLogo className="h-14 md:h-16 w-auto object-contain shrink-0 diq-header-logo-img" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 diq-header-nav-desktop">
            {navItems.map((item) => {
              const isReplays = item.href === '/replays';
              const handleLinkClick = (e: MouseEvent) => {
                if (isReplays && !isAuthenticated) {
                  e.preventDefault();
                  setShowAuthDialog(true);
                }
              };

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={handleLinkClick}
                  className={`relative text-sm font-medium tracking-wide transition-colors group diq-header-nav-link-desktop ${
                    isActive(item.href)
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 diq-header-nav-active-bar ${
                      isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4 diq-header-cta-toggle-container">
            <ModeToggle />
            <div className="hidden md:block diq-header-usernav-desktop">
              <UserNav />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors diq-header-mobile-toggle-btn"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border py-5 diq-header-menu-mobile">
            <nav className="flex flex-col gap-1 diq-header-nav-mobile">
              {navItems.map((item) => {
                const isReplays = item.href === '/replays';
                const handleLinkClick = (e: MouseEvent) => {
                  setIsMobileMenuOpen(false);
                  if (isReplays && !isAuthenticated) {
                    e.preventDefault();
                    setShowAuthDialog(true);
                  }
                };

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`text-sm font-medium py-3 px-2 transition-colors diq-header-nav-link-mobile ${
                      isActive(item.href)
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    onClick={handleLinkClick}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-4 px-2 diq-header-usernav-mobile">
                <UserNav />
              </div>
            </nav>
          </div>
        )}
      </div>

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={() => {
          setShowAuthDialog(false);
          setIsAuthenticated(true);
          navigate('/replays');
        }}
      />
    </header>
  );
}
