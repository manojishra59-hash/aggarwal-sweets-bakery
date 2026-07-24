import React, { useState } from 'react';
import { X, Star, Sparkles, Plus, Check } from 'lucide-react';
import { SweetItem } from '../types';

interface SweetDetailModalProps {
  sweet: SweetItem | null;
  onClose: () => void;
  onAddToCart: (sweet: SweetItem, qtyKg: number) => void;
}

export const SweetDetailModal: React.FC<SweetDetailModalProps> = ({
  sweet,
  onClose,
  onAddToCart,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!sweet) return null;

  const handleAdd = () => {
    onAddToCart(sweet, selectedWeight);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1000);
  };

  const calculatedPrice = Math.round(sweet.pricePerKg * selectedWeight);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] rounded-2xl border border-[#D4AF37]/30 shadow-2xl max-w-lg w-full overflow-hidden text-white relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-colors cursor-pointer border border-[#D4AF37]/30"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image Header */}
        <div className="relative h-64 bg-[#0A0A0A] overflow-hidden">
          <img
            src={sweet.image}
            alt={sweet.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/60" />

          {sweet.freshToday && (
            <div className="absolute top-4 left-4 btn-gold text-[#0A0A0A] text-[10px] font-bold px-3 py-1 rounded-full shadow-md flex items-center space-x-1 uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Fresh Batch Today</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 -mt-6 relative z-10 bg-[#121212]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
                {sweet.category}
              </span>
              <div className="flex items-center space-x-1 text-xs font-bold text-[#F4D03F]">
                <Star className="w-4 h-4 fill-[#F4D03F] text-[#F4D03F]" />
                <span>{sweet.rating} / 5.0</span>
              </div>
            </div>

            <h3 className="text-2xl font-extrabold text-white font-serif-luxury mt-1">
              {sweet.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#D9D9D9]/80 mt-2 font-sans leading-relaxed">
              {sweet.description}
            </p>
          </div>

          {/* Key Ingredients */}
          <div className="pt-3 border-t border-[#D4AF37]/20">
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-2 font-serif-luxury">
              Artisanal Ingredients:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sweet.ingredients.map((ing, i) => (
                <span
                  key={i}
                  className="text-[11px] font-semibold bg-[#181818] border border-[#D4AF37]/30 text-[#D9D9D9] px-2.5 py-1 rounded-lg"
                >
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Select Weight Tier */}
          <div className="pt-3 border-t border-[#D4AF37]/20 space-y-2">
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block font-serif-luxury">
              Select Weight / Portion:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[0.5, 1, 2, 5].map((wt) => (
                <button
                  key={wt}
                  type="button"
                  onClick={() => setSelectedWeight(wt)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedWeight === wt
                      ? 'btn-gold text-[#0A0A0A] shadow-md scale-105'
                      : 'bg-[#181818] text-[#D9D9D9] border-[#D4AF37]/20 hover:border-[#D4AF37]'
                  }`}
                >
                  {wt >= 1 ? `${wt} kg` : `${wt * 1000} g`}
                </button>
              ))}
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-[#D4AF37]/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#A3A3A3] font-bold uppercase block">
                Calculated Price
              </span>
              <span className="text-2xl font-black text-[#F4D03F] font-serif-luxury">
                ₹{calculatedPrice}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`px-6 py-3 rounded-xl font-bold text-xs shadow-lg transition-all flex items-center space-x-2 cursor-pointer ${
                addedSuccess
                  ? 'bg-emerald-600 text-white'
                  : 'btn-gold text-[#0A0A0A]'
              }`}
            >
              {addedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Box!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Add {selectedWeight >= 1 ? `${selectedWeight}kg` : `${selectedWeight * 1000}g`} Box</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

