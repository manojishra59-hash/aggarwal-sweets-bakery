import React from 'react';
import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import {
  BRAND_ADDRESS,
  BRAND_PHONE,
  BRAND_HOURS,
} from '../data/sweetsData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-16 sm:py-24 bg-[#111111] relative border-t border-[#D4AF37]/15 cv-auto gpu-layer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] bg-[#161616] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block mb-4 shadow-sm">
            Visit Our Flagship Store
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Our Royal <span className="text-gold-gradient">Location</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9D9D9]/80 font-sans max-w-xl mx-auto">
            Experience the intoxicating aroma of fresh desi ghee mithai in person at our Rajouri Garden flagship outlet.
          </p>
        </div>

        {/* Embedded Google Map iframe */}
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30 mb-8 bg-[#121212]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28013.788883761445!2d77.00363615504239!3d28.63804464909564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0508c98d4a5d%3A0xde38c738d1db55c6!2sAggarwal%20Sweets!5e0!3m2!1sen!2sin!4v1784906332169!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0, filter: 'brightness(0.95) contrast(1.05) saturate(1.1)' }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Aggarwal Sweets Google Map Location"
            className="w-full h-[380px] sm:h-[450px]"
          />
        </div>

        {/* Below Map Info Card */}
        <div className="bg-[#141414] rounded-2xl p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/25 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Address */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#F4D03F]">
              <MapPin className="w-6 h-6 text-[#F4D03F]" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm font-serif-luxury uppercase tracking-wider">
                Store Address
              </h4>
              <p className="text-xs sm:text-sm text-[#D9D9D9]/80 mt-1 font-sans leading-relaxed">
                {BRAND_ADDRESS}
              </p>
            </div>
          </div>

          {/* Phone & Hours */}
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#D4AF37]/30 flex items-center justify-center shrink-0 text-[#F4D03F]">
              <Clock className="w-6 h-6 text-[#F4D03F]" />
            </div>
            <div>
              <h4 className="font-extrabold text-white text-sm font-serif-luxury uppercase tracking-wider">
                Business Hours
              </h4>
              <p className="text-xs sm:text-sm text-[#D9D9D9]/80 mt-1 font-sans">
                {BRAND_HOURS}
              </p>
              <p className="text-xs font-bold text-[#F4D03F] mt-1 tracking-wide">
                • Open 7 Days a Week
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
            <a
              href="https://maps.google.com/?q=Aggarwal+Sweets+%26+Bakery+New+Delhi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl btn-gold text-xs font-bold shadow-md flex items-center justify-center space-x-2 text-center"
            >
              <Navigation className="w-4 h-4 text-[#0A0A0A]" />
              <span>Get Directions</span>
            </a>

            <a
              href={`tel:${BRAND_PHONE}`}
              className="flex-1 py-3 px-4 rounded-xl bg-[#1D1D1D] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center space-x-2 text-center"
            >
              <Phone className="w-4 h-4 text-[#F4D03F]" />
              <span>Call Store</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

