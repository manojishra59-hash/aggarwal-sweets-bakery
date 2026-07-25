import React from 'react';
import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { GIFT_BOXES } from '../data/sweetsData';
import { GiftBoxItem } from '../types';

interface GiftBoxesSectionProps {
  onSelectGiftBox: (box: GiftBoxItem) => void;
}

export const GiftBoxesSection: React.FC<GiftBoxesSectionProps> = ({
  onSelectGiftBox,
}) => {
  return (
    <section id="gift-boxes" className="py-16 sm:py-24 bg-[#111111] relative border-t border-[#D4AF37]/15 cv-auto gpu-layer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] bg-[#161616] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block mb-4 shadow-sm">
            Royal Gifting Experience
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Curated <span className="text-gold-gradient">Luxury Gift Trunks</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D9D9D9]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            Rigid velvet touch trunks with 24K metallic gold foil motif embossing, silk ribbons, and custom brass locks.
          </p>
        </div>

        {/* 2x2 Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GIFT_BOXES.map((box, index) => (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#141414] rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 shadow-2xl transition-all duration-300 relative flex flex-col sm:flex-row gap-6 overflow-hidden group"
            >
              {/* Premium Ribbon Badge on Top */}
              <div className="absolute top-4 right-0 bg-gradient-to-r from-[#F4D03F] via-[#D4AF37] to-[#9C7A17] text-[#0A0A0A] font-black text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-l-md shadow-lg z-10">
                {box.badge}
              </div>

              {/* Box Image */}
              <div className="relative w-full sm:w-48 h-48 sm:h-auto rounded-xl overflow-hidden shrink-0 bg-[#0A0A0A] border border-[#D4AF37]/20">
                <img
                  src={box.image}
                  alt={box.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-2xl font-black text-white font-serif-luxury group-hover:text-[#F4D03F] transition-colors">
                    {box.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#D9D9D9]/70 mt-2 leading-relaxed font-sans">
                    {box.description}
                  </p>

                  {/* Items Included List */}
                  <div className="mt-4 pt-3 border-t border-[#D4AF37]/15 space-y-2">
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] block">
                      Royal Delicacies Included:
                    </span>
                    <div className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-2 text-xs text-[#D9D9D9] font-medium">
                      {box.itemsIncluded.map((item, i) => (
                        <div key={i} className="flex items-center space-x-1.5">
                          <Check className="w-3.5 h-3.5 text-[#F4D03F] shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#A3A3A3] font-bold uppercase tracking-wider block">
                      Price / Box
                    </span>
                    <span className="text-xl font-black text-[#F4D03F] font-serif-luxury">
                      ₹{box.price}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectGiftBox(box)}
                    className="px-5 py-2.5 rounded-xl btn-gold text-xs font-bold shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
                  >
                    <span>Reserve Box</span>
                    <ArrowRight className="w-4 h-4 text-[#0A0A0A]" />
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

