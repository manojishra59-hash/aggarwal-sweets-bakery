import React from 'react';
import { X, Heart, Award, Sparkles, Clock, Check } from 'lucide-react';

interface KnowUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowUsModal: React.FC<KnowUsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-rose-950 border border-white/20 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-rose-300 mb-1">
          <Heart className="w-4 h-4 fill-rose-300" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Our Heritage
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-3">
          Bekzod Shirinliklari
        </h2>

        <p className="text-sm text-white/80 leading-relaxed mb-6">
          Founded with a passion for frozen perfection, Bekzod Shirinliklari blends time-honored artisanal recipes with rich farm-fresh cream, natural ripe fruits, and hand-selected berries.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 flex items-start space-x-3">
            <Award className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-white">100% Organic</h4>
              <p className="text-[11px] text-white/70">Pure natural milk & berries</p>
            </div>
          </div>

          <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10 flex items-start space-x-3">
            <Sparkles className="w-5 h-5 text-rose-300 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-xs text-white">Handcrafted</h4>
              <p className="text-[11px] text-white/70">Made fresh daily in small batches</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/70">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-rose-300" />
            <span>Open Daily: 10:00 AM – 11:00 PM</span>
          </div>
          <span className="flex items-center text-emerald-400 font-semibold">
            <Check className="w-3.5 h-3.5 mr-1" /> Open Now
          </span>
        </div>
      </div>
    </div>
  );
};
