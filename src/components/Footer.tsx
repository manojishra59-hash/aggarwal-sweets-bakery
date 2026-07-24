import React from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  Heart,
  Award,
  Lock,
} from 'lucide-react';
import {
  BRAND_TAGLINE,
  BRAND_ADDRESS,
  BRAND_PHONE,
  BRAND_HOURS,
} from '../data/sweetsData';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-12 border-t border-[#D4AF37]/20 relative overflow-hidden">
      {/* Background Video Layer - Footer Section (120 FPS Optimized) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none gpu-video-container z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover gpu-layer opacity-35"
          src="https://res.cloudinary.com/q8pk1ufj/video/upload/v1784898780/Luxury_Indian_sweets_background___202607241837_vrhugj.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/85 z-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#D4AF37]/15">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F4D03F] via-[#D4AF37] to-[#9C7A17] rounded-xl flex items-center justify-center font-serif-luxury font-black text-xl text-[#0A0A0A] shadow-lg">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold text-white font-serif-luxury tracking-wide leading-none">
                  Aggarwal
                </span>
                <span className="text-[10px] font-bold text-[#F4D03F] uppercase tracking-[0.2em] mt-1">
                  Sweets & Bakery
                </span>
              </div>
            </div>

            <p className="text-xs text-[#D9D9D9]/80 leading-relaxed font-sans">
              {BRAND_TAGLINE}. Crafted with 100% pure organic A2 desi ghee, Kashmiri saffron, and generations of royal halwai mastery.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#F4D03F] transition-all flex items-center justify-center text-[#D9D9D9]"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#F4D03F] transition-all flex items-center justify-center text-[#D9D9D9]"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] hover:text-[#F4D03F] transition-all flex items-center justify-center text-[#D9D9D9]"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-[0.2em] font-serif-luxury">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#D9D9D9]/80 font-medium">
              <li>
                <a href="#featured-sweets" className="hover:text-[#F4D03F] transition-colors">
                  Featured Delicacies
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-[#F4D03F] transition-colors">
                  Royal Heritage
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#F4D03F] transition-colors">
                  Artisanal Process
                </a>
              </li>
              <li>
                <a href="#festivals" className="hover:text-[#F4D03F] transition-colors">
                  Festive Collection
                </a>
              </li>
              <li>
                <a href="#gift-boxes" className="hover:text-[#F4D03F] transition-colors">
                  Luxury Gift Trunks
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#F4D03F] transition-colors">
                  Visual Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info & Location Map */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-[0.2em] font-serif-luxury">
              Store Concierge
            </h4>
            <div className="space-y-2.5 text-xs text-[#D9D9D9]/80 font-sans">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-[#F4D03F] shrink-0 mt-0.5" />
                <span>{BRAND_ADDRESS}</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-[#F4D03F] shrink-0" />
                <a href={`tel:${BRAND_PHONE}`} className="hover:text-[#F4D03F]">
                  {BRAND_PHONE}
                </a>
              </div>
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-[#F4D03F] shrink-0" />
                <span>{BRAND_HOURS}</span>
              </div>
            </div>

            {/* Embedded Footer Google Map */}
            <div className="mt-3 rounded-xl overflow-hidden border border-[#D4AF37]/30 h-32 shadow-lg relative bg-[#121212]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28013.788883761445!2d77.00363615504239!3d28.63804464909564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0508c98d4a5d%3A0xde38c738d1db55c6!2sAggarwal%20Sweets!5e0!3m2!1sen!2sin!4v1784906332169!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'brightness(0.95) contrast(1.05) saturate(1.1)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Aggarwal Sweets Footer Location Map"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Column 4: Quality Commitment */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-[0.2em] font-serif-luxury">
              Royal Hallmark
            </h4>
            <div className="bg-[#141414] p-4 rounded-xl border border-[#D4AF37]/30 space-y-2">
              <div className="flex items-center space-x-2 text-[#F4D03F] font-bold text-xs">
                <Award className="w-4 h-4" />
                <span>100% Pure Organic Desi Ghee</span>
              </div>
              <p className="text-[11px] text-[#D9D9D9]/70 leading-relaxed">
                Zero artificial coloring or preservatives. Every sweet is prepared under strict FSSAI food safety standards.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A3A3A3] space-y-3 sm:space-y-0 font-sans">
          <p>© {new Date().getFullYear()} Aggarwal Sweets & Bakery. All rights reserved.</p>

          <p className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-[#F4D03F] text-[#F4D03F]" />
            <span>for royal sweet celebrations across India</span>
          </p>

          {/* Minimal Elegant Admin Login Link */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center space-x-1.5 text-[11px] text-gray-500 hover:text-[#D4AF37] transition-colors cursor-pointer opacity-70 hover:opacity-100"
              title="Admin Portal Access"
            >
              <Lock className="w-3 h-3 text-[#D4AF37]" />
              <span>Admin Login</span>
            </button>
          )}
        </div>

      </div>
    </footer>
  );
};

