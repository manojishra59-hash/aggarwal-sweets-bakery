import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { FESTIVAL_COLLECTION } from '../data/sweetsData';
import { FestivalItem } from '../types';

interface FestivalCollectionProps {
  onInquireFestival: (fest: FestivalItem) => void;
}

export const FestivalCollectionSection: React.FC<FestivalCollectionProps> = ({
  onInquireFestival,
}) => {
  return (
    <section id="festivals" className="py-16 sm:py-24 bg-[#111111] text-white relative overflow-hidden border-t border-[#D4AF37]/15 cv-auto gpu-layer">
      {/* Golden Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] bg-[#161616] border border-[#D4AF37]/30 px-4 py-1.5 rounded-full inline-block mb-4 shadow-sm">
            Grand Celebrations & Ceremonies
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Royal Festival <span className="text-gold-gradient">Collections</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D9D9D9]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            Elevate auspicious Indian occasions with hand-gilded gift trunks, bespoke mithai assortments, and royal velvet boxes.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FESTIVAL_COLLECTION.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onInquireFestival(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#121212] border border-[#D4AF37]/25 hover:border-[#D4AF37] shadow-2xl transition-all duration-500 flex flex-col justify-between min-h-[420px] cursor-pointer"
            >
              {/* Background Image with Hover Zoom */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-75 brightness-100"
                />
                {/* Soft Gradient Overlay - 40% darkness */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/90 via-[#111111]/40 to-transparent" />
              </div>

              {/* Top Tag */}
              <div className="relative z-10 p-6 flex items-center justify-between">
                <span className="bg-[#D4AF37] text-[#0A0A0A] font-extrabold text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-md shadow-md">
                  Exclusive Royal Festive
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#0A0A0A]/80 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#0A0A0A] transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>

              {/* Bottom Details */}
              <div className="relative z-10 p-6 sm:p-8 space-y-3">
                <h3 className="text-2xl font-black text-white font-serif-luxury group-hover:text-[#F4D03F] transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-[#F4D03F] font-medium tracking-wide">
                  "{item.tagline}"
                </p>
                <p className="text-xs text-[#D9D9D9]/80 line-clamp-2 font-sans leading-relaxed">
                  {item.description}
                </p>

                {/* Highlights */}
                <div className="pt-2 flex flex-wrap gap-2">
                  {item.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-medium text-[#D9D9D9] bg-[#0A0A0A]/80 border border-[#D4AF37]/30 px-2.5 py-1 rounded-md backdrop-blur-sm flex items-center space-x-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#F4D03F]" />
                      <span>{h}</span>
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

