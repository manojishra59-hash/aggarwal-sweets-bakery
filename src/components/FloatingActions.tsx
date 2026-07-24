import React, { useState, useEffect } from 'react';
import { MessageSquare, Phone, ArrowUp } from 'lucide-react';
import { BRAND_PHONE, BRAND_WHATSAPP } from '../data/sweetsData';

export const FloatingActions: React.FC = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3 pointer-events-none">
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
  );
};

