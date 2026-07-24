import React from 'react';
import { motion } from 'motion/react';
import { Milk, Sparkles, Flame, CheckCircle2, Gift } from 'lucide-react';
import { PROCESS_STEPS } from '../data/sweetsData';

export const MakingProcessSection: React.FC = () => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Milk':
        return <Milk className="w-5 h-5 text-[#0A0A0A]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#0A0A0A]" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-[#0A0A0A]" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-[#0A0A0A]" />;
      case 'Gift':
        return <Gift className="w-5 h-5 text-[#0A0A0A]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#0A0A0A]" />;
    }
  };

  return (
    <section id="process" className="py-16 sm:py-24 bg-[#111111] relative overflow-hidden border-t border-[#D4AF37]/15">
      {/* Background Video Layer - Middle Body Section (120 FPS Optimized) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none gpu-video-container z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover gpu-layer opacity-40"
          src="https://res.cloudinary.com/q8pk1ufj/video/upload/v1784898780/Luxury_Indian_sweets_background___202607241837_vrhugj.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/90 via-[#111111]/50 to-[#111111]/90 z-10" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] bg-[#161616] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block mb-4 shadow-sm">
            Artisanal Mastery
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight">
            Our Royal <span className="text-gold-gradient">Making Process</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#D9D9D9]/80 leading-relaxed font-sans max-w-2xl mx-auto">
            From dawn milk procurement to hand-folded gold foil packaging, witness our uncompromising 5-step journey.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative">
          {/* Glowing Golden Connecting Line in Center */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D4AF37]/20 via-[#F4D03F] to-[#9C7A17] -translate-x-1/2 shadow-[0_0_15px_rgba(212,175,55,0.8)]" />

          <div className="space-y-12 sm:space-y-16">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.12 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Step Badge Circle in Center */}
                  <div className="absolute left-6 md:left-1/2 top-0 -translate-x-1/2 w-11 h-11 rounded-full bg-gradient-to-br from-[#F4D03F] via-[#D4AF37] to-[#9C7A17] border-2 border-[#0A0A0A] shadow-[0_0_20px_rgba(212,175,55,0.4)] flex items-center justify-center z-20">
                    {getStepIcon(step.icon)}
                  </div>

                  {/* Content Box */}
                  <div className="ml-16 md:ml-0 md:w-1/2 pl-0 md:px-10">
                    <div className="bg-[#141414] rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 shadow-2xl transition-all duration-300 relative group">
                      {/* Step Number Tag */}
                      <div className="text-xs font-extrabold text-[#D4AF37] uppercase tracking-[0.2em] mb-2 flex items-center justify-between">
                        <span>Step 0{step.stepNumber}</span>
                        <span className="text-[10px] font-bold text-[#F4D03F] bg-[#0A0A0A] border border-[#D4AF37]/30 px-3 py-1 rounded-full uppercase tracking-widest">
                          {step.subtitle}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-white font-serif-luxury mb-3 group-hover:text-[#F4D03F] transition-colors">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#D9D9D9]/70 leading-relaxed font-sans">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for 50% width on Desktop */}
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

