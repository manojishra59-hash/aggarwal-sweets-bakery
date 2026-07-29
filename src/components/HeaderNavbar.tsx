import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Phone, Menu, X, Award, Users, ChevronRight, Sparkles, Lock } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BRAND_NAME, BRAND_PHONE, BRAND_WHATSAPP } from '../data/sweetsData';

interface HeaderNavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenStaff: () => void;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenStaff,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#featured-sweets');

  const navLinks = [
    { name: 'Featured Sweets', href: '#featured-sweets' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Our Process', href: '#process' },
    { name: 'Festivals', href: '#festivals' },
    { name: 'Gift Boxes', href: '#gift-boxes' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
    { name: 'Our Team', href: '#team' },
    { name: 'FAQ', href: '#faq' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to accurately highlight active section in mobile/desktop menu
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0,
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    navLinks.forEach((link) => {
      const id = link.href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll and listen for Escape key when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(href);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 transform-gpu ${
        isScrolled
          ? 'bg-[#111111]/90 backdrop-blur-md shadow-2xl py-3 border-b border-[#D4AF37]/25'
          : 'bg-[#111111]/95 py-4 border-b border-[#D4AF37]/15'
      }`}
    >
      {/* Top Banner Accent strip */}
      <div className="bg-[#121212] border-b border-[#D4AF37]/20 text-[#D9D9D9] text-[11px] sm:text-xs py-1.5 px-4 text-center font-medium tracking-widest uppercase flex items-center justify-center space-x-3">
        <span className="flex items-center space-x-1.5">
          <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-gold-gradient font-bold">Desi Ghee Royal Mithai & Luxury Artisanal Bakery</span>
        </span>
        <span className="hidden md:inline text-[#D4AF37]/40">•</span>
        <span className="hidden md:inline text-[#A3A3A3]">Concierge Line: <span className="text-white font-semibold">{BRAND_PHONE}</span></span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a
          href="#featured-sweets"
          onClick={(e) => handleNavClick(e, '#featured-sweets')}
          className="flex items-center space-x-3 group"
          id="brand-logo-link"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-[#F4D03F] via-[#D4AF37] to-[#9C7A17] rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 text-[#0A0A0A] font-serif text-2xl font-black border border-[#F4D03F]/50">
            A
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-serif-luxury leading-none group-hover:text-[#F4D03F] transition-colors">
              Aggarwal
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#D4AF37] tracking-[0.25em] uppercase font-sans mt-0.5">
              Sweets & Luxury Bakery
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Visible on 1024px and above) */}
        <nav className="hidden lg:flex items-center space-x-3 xl:space-x-5 text-xs uppercase font-semibold tracking-wider text-[#D9D9D9]">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#D4AF37] after:transition-all after:duration-300 ${
                activeSection === link.href
                  ? 'text-[#F4D03F] after:w-full font-bold'
                  : 'hover:text-[#F4D03F] after:w-0 hover:after:w-full'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions - Including Our Team on Top Right */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onOpenSearch}
            className="p-2.5 rounded-xl text-[#D9D9D9] hover:text-[#F4D03F] hover:bg-[#181818] border border-[#D4AF37]/10 transition-all cursor-pointer"
            title="Search sweets"
            id="search-trigger-btn"
          >
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
          </button>

          <a
            href="#team"
            onClick={(e) => handleNavClick(e, '#team')}
            className="hidden sm:flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#1A1A1A] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] hover:text-[#F4D03F] font-semibold text-xs tracking-wider uppercase transition-all shadow-sm"
            id="our-team-top-btn"
          >
            <Users className="w-3.5 h-3.5 text-[#F4D03F]" />
            <span>Our Team</span>
          </a>

          <a
            href={`tel:${BRAND_PHONE}`}
            className="hidden md:flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-[#161616] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] font-semibold text-xs tracking-wider uppercase transition-all"
            id="call-store-link"
          >
            <Phone className="w-3.5 h-3.5 text-[#F4D03F]" />
            <span>Call Concierge</span>
          </a>

          <button
            onClick={onOpenCart}
            className="relative px-4 py-2.5 rounded-xl btn-gold cursor-pointer flex items-center space-x-2 text-xs"
            id="cart-trigger-btn"
          >
            <ShoppingBag className="w-4 h-4 text-[#0A0A0A]" />
            <span className="hidden sm:inline font-bold">Reserve Box</span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#F4D03F] text-[#0A0A0A] font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#0A0A0A] shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle (Visible on screens below 1024px) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-[#161616] border border-[#D4AF37]/20 text-[#D4AF37] hover:text-[#F4D03F] transition-colors cursor-pointer"
            id="mobile-menu-btn"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Premium Full-Screen Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            {/* Backdrop with Backdrop Blur & Tap to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Side Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[88%] sm:w-[380px] max-w-full h-full bg-[#0D0D0D] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col z-10 overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#D4AF37]/20 bg-[#121212] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#F4D03F] via-[#D4AF37] to-[#9C7A17] rounded-xl flex items-center justify-center text-[#0A0A0A] font-serif text-2xl font-black border border-[#F4D03F]/50 shadow-md">
                    A
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-white font-serif-luxury leading-tight">
                      Aggarwal
                    </span>
                    <span className="text-[10px] font-extrabold text-[#D4AF37] tracking-[0.2em] uppercase">
                      Sweets & Luxury Bakery
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-xl bg-[#1A1A1A] border border-[#D4AF37]/30 text-[#D4AF37] hover:text-[#F4D03F] hover:bg-[#222222] transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Nav Links Area */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-5 space-y-2">
                <div className="text-[10px] font-extrabold text-[#D4AF37]/70 uppercase tracking-[0.25em] px-2 mb-3">
                  Explore Navigation
                </div>

                {navLinks.map((link) => {
                  const isActive = activeSection === link.href;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all text-xs font-bold uppercase tracking-wider min-h-[48px] group ${
                        isActive
                          ? 'bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/10 to-transparent border border-[#D4AF37] text-[#F4D03F] shadow-lg shadow-[#D4AF37]/5'
                          : 'bg-[#151515] border border-[#D4AF37]/15 text-[#D9D9D9] hover:border-[#D4AF37]/50 hover:text-white hover:bg-[#1A1A1A]'
                      }`}
                    >
                      <span className="flex items-center space-x-3">
                        <span
                          className={`w-2 h-2 rounded-full transition-colors ${
                            isActive ? 'bg-[#F4D03F] shadow-[0_0_8px_#F4D03F]' : 'bg-[#D4AF37]/30 group-hover:bg-[#D4AF37]'
                          }`}
                        />
                        <span>{link.name}</span>
                      </span>

                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive
                            ? 'text-[#F4D03F] translate-x-1'
                            : 'text-[#D4AF37]/40 group-hover:text-[#D4AF37] group-hover:translate-x-1'
                        }`}
                      />
                    </a>
                  );
                })}
              </div>

              {/* Drawer Footer Actions */}
              <div className="p-5 border-t border-[#D4AF37]/20 bg-[#121212] space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${BRAND_PHONE}`}
                    className="flex items-center justify-center space-x-2 py-3 px-3 rounded-xl bg-[#1A1A1A] border border-[#D4AF37]/30 text-[#D4AF37] hover:border-[#D4AF37] text-xs font-bold uppercase tracking-wider transition-all"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#F4D03F]" />
                    <span>Call Store</span>
                  </a>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenCart();
                    }}
                    className="flex items-center justify-center space-x-2 py-3 px-3 rounded-xl btn-gold text-xs font-bold uppercase tracking-wider shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#0A0A0A]" />
                    <span>Cart ({cartCount})</span>
                  </button>
                </div>

                <a
                  href={`https://wa.me/${BRAND_WHATSAPP}?text=Hello%20Aggarwal%20Sweets,%20I%20would%20like%20to%20order`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-black font-extrabold rounded-xl text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>WhatsApp Concierge Order</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};


