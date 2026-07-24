import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { GOOGLE_REVIEWS } from '../data/sweetsData';

export const GoogleReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
  };

  const current = GOOGLE_REVIEWS[currentIndex];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#111111] relative overflow-hidden border-t border-[#D4AF37]/15">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Google Badge Header */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#161616] border border-[#D4AF37]/30 shadow-md mb-4">
            {/* Google G logo */}
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.23v3.13C3.21 21.3 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.63H1.23C.44 8.2.0 9.97.0 12s.44 3.8 1.23 5.37l4.05-3.13z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24.0 12 .0 7.33.0 3.21 2.7 1.23 6.63l4.05 3.13c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span className="text-xs font-extrabold text-white tracking-wide">
              4.8 ★ Verified Google Customer Reviews
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Words of <span className="text-gold-gradient">Love & Sweetness</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#D9D9D9]/80 font-sans max-w-xl mx-auto">
            Real feedback from thousands of families and sweet connoisseurs across Delhi NCR.
          </p>
        </div>

        {/* Testimonial Auto Slider Card */}
        <div className="relative bg-[#141414] rounded-2xl p-8 sm:p-12 shadow-2xl border border-[#D4AF37]/30 max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 text-center"
            >
              {/* Star Rating */}
              <div className="flex items-center justify-center space-x-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-[#F4D03F] text-[#F4D03F]"
                  />
                ))}
              </div>

              {/* Review Quote */}
              <p className="text-base sm:text-xl text-[#D9D9D9] font-serif-luxury italic leading-relaxed">
                "{current.comment}"
              </p>

              {/* Customer Info */}
              <div className="flex flex-col items-center justify-center space-y-2 pt-2">
                <img
                  src={current.avatar}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] shadow-lg"
                />
                <div>
                  <h4 className="font-bold text-base text-white font-serif-luxury flex items-center justify-center space-x-1.5">
                    <span>{current.name}</span>
                    {current.verified && (
                      <CheckCircle2 className="w-4 h-4 text-[#F4D03F] inline" />
                    )}
                  </h4>
                  <p className="text-xs text-[#D4AF37] font-semibold tracking-wider">
                    {current.location} • {current.date}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#0A0A0A] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#F4D03F] hover:border-[#D4AF37] transition-all shadow-xl flex items-center justify-center cursor-pointer"
            title="Previous review"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-3 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#0A0A0A] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#F4D03F] hover:border-[#D4AF37] transition-all shadow-xl flex items-center justify-center cursor-pointer"
            title="Next review"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {GOOGLE_REVIEWS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#F4D03F]'
                  : 'w-2 bg-[#D4AF37]/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

