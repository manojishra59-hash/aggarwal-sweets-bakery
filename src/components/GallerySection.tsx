import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/sweetsData';
import { GalleryItem } from '../types';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Kitchen', 'Fresh Sweets', 'Bakery', 'Customers', 'Festivals'];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightbox) return;
      if (e.key === 'Escape') {
        setActiveLightbox(null);
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightbox, filteredItems]);

  const handleNextImage = () => {
    if (!activeLightbox) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeLightbox.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setActiveLightbox(filteredItems[nextIndex]);
  };

  const handlePrevImage = () => {
    if (!activeLightbox) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === activeLightbox.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setActiveLightbox(filteredItems[prevIndex]);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#121212] relative border-t border-[#D4AF37]/15 cv-auto gpu-layer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block mb-4 shadow-sm">
            Visual Heritage
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Our Royal <span className="text-gold-gradient">Gallery</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D9D9D9]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            Take a glance inside our pristine copper kadhai kitchens, daily display cases, and artisanal ovens.
          </p>
        </div>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer tracking-wider uppercase ${
                activeCategory === cat
                  ? 'btn-gold shadow-lg scale-105'
                  : 'bg-[#181818] text-[#D9D9D9] hover:bg-[#222222] border border-[#D4AF37]/20 hover:border-[#D4AF37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Uniform Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveLightbox(item)}
                className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] border border-[#D4AF37]/20 shadow-xl hover:shadow-[0_12px_35px_rgba(212,175,55,0.2)] hover:border-[#D4AF37] group cursor-pointer aspect-4/3 w-full"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-95 group-hover:brightness-105"
                />

                {/* Dark Gradient Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <div className="p-2.5 rounded-xl bg-[#0A0A0A]/80 border border-[#D4AF37]/40 text-[#F4D03F] shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-[#F4D03F] uppercase tracking-[0.2em] block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-bold text-base text-white font-serif-luxury line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#D9D9D9] line-clamp-2 mt-1 font-sans leading-relaxed">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#141414] border border-[#D4AF37]/40 rounded-2xl overflow-hidden shadow-2xl text-white flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightbox(null)}
                className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#0A0A0A]/80 border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#F4D03F] hover:bg-black transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev / Next Buttons */}
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#0A0A0A]/80 border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#F4D03F] hover:bg-black transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[#0A0A0A]/80 border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#F4D03F] hover:bg-black transition-colors cursor-pointer hidden sm:flex items-center justify-center"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Container */}
              <div className="max-h-[65vh] bg-black flex items-center justify-center overflow-hidden relative">
                <img
                  src={activeLightbox.image}
                  alt={activeLightbox.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[65vh] w-full object-contain"
                />
              </div>

              {/* Caption Footer */}
              <div className="p-5 sm:p-6 bg-[#141414] border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] block mb-1">
                    {activeLightbox.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif-luxury text-white">
                    {activeLightbox.title}
                  </h3>
                  <p className="text-xs text-[#D9D9D9]/80 mt-1 font-sans leading-relaxed">
                    {activeLightbox.caption}
                  </p>
                </div>

                {/* Mobile Prev / Next */}
                <div className="flex items-center space-x-2 sm:hidden w-full justify-between pt-2 border-t border-white/10">
                  <button
                    onClick={handlePrevImage}
                    className="px-4 py-2 rounded-xl bg-[#1D1D1D] border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] flex items-center space-x-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="px-4 py-2 rounded-xl bg-[#1D1D1D] border border-[#D4AF37]/30 text-xs font-bold text-[#D4AF37] flex items-center space-x-1"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};


