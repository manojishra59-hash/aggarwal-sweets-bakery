import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Award, Gift, ShieldCheck } from 'lucide-react';
import { BRAND_PHONE, BRAND_WHATSAPP } from '../data/sweetsData';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-start overflow-hidden bg-[#111111] border-b border-[#D4AF37]/25">
      {/* Background Video Layer - Hardware Accelerated for 120 FPS */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none gpu-video-container z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover gpu-layer opacity-90"
          src="https://res.cloudinary.com/q8pk1ufj/video/upload/v1784898780/Luxury_Indian_sweets_background___202607241837_vrhugj.mp4"
        />

        {/* Left Side Readability Gradient - Keeps text crisp while exposing sweets on right */}
        <div className="absolute inset-y-0 left-0 w-full md:w-[65%] sm:w-[75%] bg-gradient-to-r from-[#111111] via-[#111111]/70 to-transparent z-10" />

        {/* Soft Golden Ambient Radial Glow behind sweets on right - Optimized with radial gradient */}
        <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-[radial-gradient(circle,rgba(212,175,55,0.20)_0%,rgba(245,215,110,0.08)_40%,transparent_70%)] pointer-events-none z-10 mix-blend-screen" />

        {/* Smooth Top & Bottom Vignette Overlays */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#111111]/80 via-[#111111]/30 to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#111111] via-[#111111]/60 to-transparent z-10" />

        {/* Golden Mist Reflection Layer at Bottom Right */}
        <div className="absolute bottom-0 right-0 w-1/2 h-48 bg-gradient-to-t from-[#111111]/90 via-[rgba(212,175,55,0.06)] to-transparent z-10 pointer-events-none" />

        {/* Floating Ambient Gold Particles for Cinematic Atmosphere */}
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
          <div className="gold-particle w-1.5 h-1.5 top-[20%] left-[15%]" style={{ animationDelay: '0s', animationDuration: '6s' }} />
          <div className="gold-particle w-2 h-2 top-[45%] left-[30%]" style={{ animationDelay: '1.5s', animationDuration: '8s' }} />
          <div className="gold-particle w-1 h-1 top-[65%] left-[20%]" style={{ animationDelay: '3s', animationDuration: '7s' }} />
          <div className="gold-particle w-2.5 h-2.5 top-[30%] right-[25%]" style={{ animationDelay: '0.8s', animationDuration: '9s' }} />
          <div className="gold-particle w-1.5 h-1.5 top-[70%] right-[35%]" style={{ animationDelay: '2.2s', animationDuration: '6.5s' }} />
          <div className="gold-particle w-2 h-2 top-[15%] right-[15%]" style={{ animationDelay: '4s', animationDuration: '7.5s' }} />
        </div>
      </div>

      {/* Main Hero Content - Responsive Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 md:py-24 w-full flex flex-col items-center sm:items-start text-center sm:text-left">
        {/* Royal Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center space-x-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#121212]/90 border border-[#D4AF37]/40 shadow-lg mb-5 sm:mb-6 max-w-full"
        >
          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F4D03F] shrink-0" />
          <span className="text-[10px] sm:text-xs font-bold text-[#F4D03F] uppercase tracking-[0.15em] sm:tracking-[0.2em] font-sans truncate">
            Est. 1984 • Royal Heritage Halwai
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-[28px] min-[375px]:text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white font-serif-luxury tracking-tight leading-[1.12] sm:leading-[1.15] max-w-4xl"
        >
          Crafted for Royalty, <br className="hidden sm:inline" />
          <span className="text-gold-gradient drop-shadow-md">
            Celebrated with Sweetness
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 sm:mt-6 text-sm sm:text-lg md:text-xl text-[#D9D9D9]/90 font-sans max-w-2xl leading-relaxed font-normal"
        >
          Handcrafted in 100% pure organic A2 Desi Ghee, Kashmiri Saffron, and Iranian Pistachios. Experience Delhi's premier sweet legacy delivered fresh to your doorstep.
        </motion.p>

        {/* Call To Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 sm:gap-4 w-full sm:w-auto"
        >
          <a
            href="#featured-sweets"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl btn-gold text-xs font-extrabold tracking-[0.15em] uppercase shadow-[0_10px_30px_rgba(212,175,55,0.3)] flex items-center justify-center space-x-3 transition-transform hover:scale-105 active:scale-95 cursor-pointer min-h-[48px]"
          >
            <span>Explore Royal Sweets</span>
            <ArrowRight className="w-4 h-4 text-[#0A0A0A]" />
          </a>

          <a
            href="#gift-boxes"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#141414]/90 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-white hover:text-[#F4D03F] text-xs font-bold tracking-[0.15em] uppercase shadow-xl flex items-center justify-center space-x-2.5 transition-all cursor-pointer min-h-[48px]"
          >
            <Gift className="w-4 h-4 text-[#F4D03F]" />
            <span>Luxury Gift Trunks</span>
          </a>
        </motion.div>

        {/* Key Royal Assurance Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#D4AF37]/20 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl w-full text-center sm:text-left justify-items-center sm:justify-items-start"
        >
          <div className="flex flex-col items-center sm:items-start space-y-1">
            <Award className="w-5 h-5 text-[#F4D03F]" />
            <span className="text-xs font-bold text-white font-serif-luxury">100% Desi Ghee</span>
            <span className="text-[10px] text-[#A3A3A3]">Pure A2 Cow Ghee</span>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-1">
            <Sparkles className="w-5 h-5 text-[#F4D03F]" />
            <span className="text-xs font-bold text-white font-serif-luxury">Daily Fresh Batches</span>
            <span className="text-[10px] text-[#A3A3A3]">Melt-in-mouth texture</span>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-1">
            <Gift className="w-5 h-5 text-[#F4D03F]" />
            <span className="text-xs font-bold text-white font-serif-luxury">24K Gold Trunks</span>
            <span className="text-[10px] text-[#A3A3A3]">Bespoke Velvet Packaging</span>
          </div>

          <div className="flex flex-col items-center sm:items-start space-y-1">
            <ShieldCheck className="w-5 h-5 text-[#F4D03F]" />
            <span className="text-xs font-bold text-white font-serif-luxury">Express Delivery</span>
            <span className="text-[10px] text-[#A3A3A3]">Pan Delhi-NCR & India</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
