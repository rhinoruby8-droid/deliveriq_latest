import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/sessions', label: 'Sessions' },
    { href: '/replays', label: 'Replays' },
    { href: '/register', label: 'Register' },
    { href: '/for-speakers', label: 'Speakers' },
    { href: '/for-sponsors', label: 'Sponsors' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A1D24]/95 backdrop-blur-md border-b border-[#2C2F38]'
          : 'bg-[#1A1D24] border-b border-[#2C2F38]'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-[84px] items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/assets/deliveriq-logo-dark-notag-1400.png"
              alt="DeliverIQ"
              className="h-14 md:h-16 w-auto object-contain shrink-0"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative text-sm font-medium tracking-wide transition-colors group ${
                  isActive(item.href)
                    ? 'text-[#C79A4E]'
                    : 'text-[#8A8D96] hover:text-[#F0EDE8]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px bg-[#C79A4E] transition-all duration-300 ${
                    isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="hidden md:inline-flex items-center px-5 py-2.5 text-sm font-semibold tracking-wide bg-[#C79A4E] text-[#1A1D24] rounded transition-all duration-200 hover:brightness-110 hover:scale-[1.02]"
            >
              Register
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#8A8D96] hover:text-[#F0EDE8] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#2C2F38] py-5">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-sm font-medium py-3 px-2 transition-colors ${
                    isActive(item.href)
                      ? 'text-[#C79A4E]'
                      : 'text-[#8A8D96] hover:text-[#F0EDE8]'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/register"
                className="mt-3 inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold bg-[#C79A4E] text-[#1A1D24] rounded transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
