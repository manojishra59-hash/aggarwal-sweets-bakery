import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star, Plus } from 'lucide-react';
import { SweetItem } from '../types';

interface FeaturedSweetsSectionProps {
  sweets: SweetItem[];
  onAddToCart: (sweet: SweetItem, qtyKg: number) => void;
  onSelectSweet: (sweet: SweetItem) => void;
}

export const FeaturedSweetsSection: React.FC<FeaturedSweetsSectionProps> = ({
  sweets,
  onAddToCart,
  onSelectSweet,
}) => {
  return (
    <section id="featured-sweets" className="py-16 sm:py-24 bg-[#111111] relative overflow-hidden cv-auto gpu-layer">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#161616] border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-bold uppercase tracking-[0.2em] mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F4D03F]" />
            <span>Handcrafted Daily in Desi Ghee</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight leading-tight">
            Our Royal <span className="text-gold-gradient">Signature Mithai</span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-[#D9D9D9]/80 font-sans leading-relaxed max-w-2xl mx-auto">
            Slow-cooked in pure A2 desi ghee with Kashmir saffron, Iranian pistachios, and fresh daily farm milk.
          </p>
        </div>

        {/* Sweets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {sweets.map((sweet, index) => (
            <motion.div
              key={sweet.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => onSelectSweet(sweet)}
              className="bg-[#141414] rounded-2xl p-4 sm:p-5 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-400 relative flex flex-col justify-between group cursor-pointer shadow-2xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.15)]"
            >
              {/* Image & Badge Container */}
              <div className="relative w-full h-48 sm:h-52 rounded-xl overflow-hidden bg-[#0A0A0A] mb-4 border border-[#D4AF37]/10">
                <img
                  src={sweet.image}
                  alt={sweet.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out brightness-100 group-hover:brightness-105"
                />

                {/* Soft transparent gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/15 opacity-50" />

                {/* Fresh Today Badge */}
                {sweet.freshToday && (
                  <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 backdrop-blur-md border border-[#D4AF37]/40 text-[#F4D03F] text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md flex items-center space-x-1.5 uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    <span>Fresh Today</span>
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-[#0A0A0A]/90 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md flex items-center space-x-1 border border-[#D4AF37]/30">
                  <Star className="w-3.5 h-3.5 fill-[#F4D03F] text-[#F4D03F]" />
                  <span>{sweet.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] mb-1">
                    {sweet.category}
                  </div>
                  <h3 className="text-lg font-bold text-white font-serif-luxury leading-snug group-hover:text-[#F4D03F] transition-colors">
                    {sweet.name}
                  </h3>
                  <p className="text-xs text-[#D9D9D9]/70 mt-2 line-clamp-2 leading-relaxed">
                    {sweet.description}
                  </p>
                </div>

                {/* Price & Add Action */}
                <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A3A3A3] font-medium block uppercase tracking-wider">
                      Price / kg
                    </span>
                    <span className="text-base sm:text-lg font-extrabold text-[#F4D03F] font-serif-luxury">
                      ₹{sweet.pricePerKg}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(sweet, 1);
                    }}
                    className="px-3.5 py-2 rounded-xl btn-gold text-xs font-bold shadow-md flex items-center space-x-1.5 cursor-pointer active:scale-95"
                    title="Add 1kg to order"
                  >
                    <Plus className="w-4 h-4 text-[#0A0A0A]" />
                    <span>Add Box</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

