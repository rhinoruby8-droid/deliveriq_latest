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
    <footer className="bg-[#1A1D24] border-t-2 border-[#C79A4E]">
      <div className="container mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-3">
            <img
              src="/airo-assets/images/logo/horizontal"
              alt="DeliverIQ"
              className="h-8 w-auto object-contain self-start shrink-0"
            />
            <p className="text-sm text-[#8A8D96] leading-relaxed mt-1">
              The project world's live room.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest text-[#C79A4E] uppercase mb-1">
              Navigate
            </p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="text-sm text-[#8A8D96] hover:text-[#F0EDE8] transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact & Legal */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold tracking-widest text-[#C79A4E] uppercase mb-1">
              Contact
            </p>
            <a
              href="mailto:info@deliveriq.live"
              className="text-sm text-[#8A8D96] hover:text-[#F0EDE8] transition-colors"
            >
              info@deliveriq.live
            </a>
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/privacy"
                className="text-sm text-[#8A8D96] hover:text-[#F0EDE8] transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-[#8A8D96] hover:text-[#F0EDE8] transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#2C2F38]">
          <p className="text-xs text-[#8A8D96]">
            © {currentYear} DeliverIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
