import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, MapPin, ArrowUp } from 'lucide-react';
import { BRAND_PHONE, BRAND_WHATSAPP } from '../data/sweetsData';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToDirections = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const element = document.getElementById('location');
    if (element) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Floating Action Buttons (Hidden on mobile) */}
      <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col items-end space-y-3 pointer-events-none">
        {/* WhatsApp Action Button */}
        <a
          href={`https://wa.me/${BRAND_WHATSAPP}?text=Hello%20Aggarwal%20Sweets,%20I%20would%20like%20to%20order`}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-12 h-12 rounded-xl bg-[#25D366] text-black shadow-[0_10px_25px_rgba(37,211,102,0.3)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative"
          title="Chat on WhatsApp"
          id="floating-whatsapp-btn"
        >
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute right-14 bg-[#181818] border border-[#D4AF37]/30 text-[#F4D03F] text-[11px] font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none font-serif-luxury">
            WhatsApp Us
          </span>
        </a>

        {/* Call Button */}
        <a
          href={`tel:${BRAND_PHONE}`}
          className="pointer-events-auto w-12 h-12 rounded-xl bg-[#1D1D1D] border border-[#D4AF37]/40 text-[#F4D03F] shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#D4AF37] active:scale-95 group relative"
          title="Call Store"
          id="floating-call-btn"
        >
          <Phone className="w-5 h-5" />
          <span className="absolute right-14 bg-[#181818] border border-[#D4AF37]/30 text-[#F4D03F] text-[11px] font-bold px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl pointer-events-none font-serif-luxury">
            Call Concierge
          </span>
        </a>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto w-10 h-10 rounded-xl btn-gold text-[#0A0A0A] shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
            title="Back to Top"
            id="back-to-top-btn"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Mobile Sticky Bottom Navigation (Visible on screens < 768px) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 pointer-events-auto">
        {/* Back to top button positioned above bottom bar on mobile */}
        {showBackToTop && (
          <div className="flex justify-end px-4 mb-2">
            <button
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-[#1A1A1A]/90 border border-[#D4AF37]/40 text-[#F4D03F] shadow-xl flex items-center justify-center transition-all active:scale-90 cursor-pointer backdrop-blur-md"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Glassmorphism Bottom Action Bar */}
        <div className="glass-nav border-t border-[#D4AF37]/30 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] px-3 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
            {/* ☎ Call Button */}
            <a
              href={`tel:${BRAND_PHONE}`}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#161616] border border-[#D4AF37]/25 text-[#F4D03F] hover:bg-[#202020] active:scale-95 transition-all text-center group min-h-[48px]"
              id="mobile-bottom-call-btn"
            >
              <Phone className="w-4 h-4 text-[#F4D03F] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                ☎ Call
              </span>
            </a>

            {/* 💬 WhatsApp Button */}
            <a
              href={`https://wa.me/${BRAND_WHATSAPP}?text=Hello%20Aggarwal%20Sweets,%20I%20would%20like%20to%20order`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#25D366] text-black hover:bg-[#20ba5a] active:scale-95 transition-all text-center group shadow-md min-h-[48px]"
              id="mobile-bottom-whatsapp-btn"
            >
              <MessageSquare className="w-4 h-4 text-black fill-current mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-wider text-black">
                💬 WhatsApp
              </span>
            </a>

            {/* 📍 Directions Button */}
            <a
              href="#location"
              onClick={scrollToDirections}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-[#161616] border border-[#D4AF37]/25 text-[#F4D03F] hover:bg-[#202020] active:scale-95 transition-all text-center group min-h-[48px]"
              id="mobile-bottom-directions-btn"
            >
              <MapPin className="w-4 h-4 text-[#F4D03F] mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-white">
                📍 Directions
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};


