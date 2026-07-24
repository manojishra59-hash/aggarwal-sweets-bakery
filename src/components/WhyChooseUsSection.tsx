import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Award, Gem, Flame, Layers, ShieldCheck } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/sweetsData';

export const WhyChooseUsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-[#F4D03F]" />;
      case 'Award':
        return <Award className="w-6 h-6 text-[#F4D03F]" />;
      case 'Gem':
        return <Gem className="w-6 h-6 text-[#F4D03F]" />;
      case 'Flame':
        return <Flame className="w-6 h-6 text-[#F4D03F]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-[#F4D03F]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-[#F4D03F]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#F4D03F]" />;
    }
  };

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-[#121212] relative overflow-hidden border-t border-[#D4AF37]/15">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] bg-[#1A1A1A] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block mb-4 shadow-sm">
            Uncompromising Heritage & Purity
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Why Discerning Guests Choose <span className="text-gold-gradient">Aggarwal Sweets</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D9D9D9]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            Every creation honors generations of secret halwai craftsmanship, 100% pure desi ghee, and royal perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="bg-[#181818] rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition-all duration-300 relative group shadow-xl hover:shadow-[0_10px_30px_rgba(212,175,55,0.12)]"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-xl bg-[#0A0A0A] border border-[#D4AF37]/30 flex items-center justify-center shadow-md mb-6 group-hover:bg-[#D4AF37] group-hover:border-[#F4D03F] transition-all duration-300">
                <div className="group-hover:text-[#0A0A0A] transition-colors duration-300">
                  {getIcon(item.icon)}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white font-serif-luxury mb-3 group-hover:text-[#F4D03F] transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-[#D9D9D9]/70 leading-relaxed font-sans">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

