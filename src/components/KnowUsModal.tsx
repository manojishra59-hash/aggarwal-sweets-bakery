import React from 'react';
import { X, Heart, Award, Sparkles, Clock, Check } from 'lucide-react';
import { BRAND_NAME, BRAND_HOURS } from '../data/sweetsData';

interface KnowUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowUsModal: React.FC<KnowUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-[#D4AF37]/40 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#D4AF37] mb-1">
          <Heart className="w-4 h-4 text-[#F4D03F]" />
          <span className="text-xs font-bold uppercase tracking-widest font-sans">
            Our Royal Heritage
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-white font-serif-luxury mb-3">
          {BRAND_NAME}
        </h2>

        <p className="text-sm text-[#D9D9D9]/90 leading-relaxed mb-6 font-sans">
          Established in 1984 in Rajouri Garden, Delhi, Aggarwal Sweets has redefined Indian mithai craftsmanship. Every batch is slow-cooked in 100% pure organic A2 Desi Ghee, Kashmir saffron, Mamra almonds, and fresh morning farm milk.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#181818] p-3.5 rounded-2xl border border-[#D4AF37]/20 flex items-start space-x-3">
            <Award className="w-5 h-5 text-[#F4D03F] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-white font-serif-luxury">100% Desi Ghee</h4>
              <p className="text-[11px] text-[#A3A3A3]">Pure A2 Organic Cow Ghee</p>
            </div>
          </div>

          <div className="bg-[#181818] p-3.5 rounded-2xl border border-[#D4AF37]/20 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-[#F4D03F] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-white font-serif-luxury">Daily Fresh Batches</h4>
              <p className="text-[11px] text-[#A3A3A3]">Melt-in-mouth artisanal mithai</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/20 pt-4 flex items-center justify-between text-xs text-[#D9D9D9]/80 font-sans">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#F4D03F]" />
            <span>Store Hours: {BRAND_HOURS}</span>
          </div>
          <span className="flex items-center text-emerald-400 font-semibold">
            <Check className="w-3.5 h-3.5 mr-1" /> Fresh Today
          </span>
        </div>
      </div>
    </div>
  );
};

