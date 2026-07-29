import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import { SweetItem } from '../types';
import { FEATURED_SWEETS } from '../data/sweetsData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSweet: (sweet: SweetItem) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectSweet,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const getProductsList = (): SweetItem[] => {
    const saved = localStorage.getItem('aggarwal_admin_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return FEATURED_SWEETS;
  };

  const productList = getProductsList();

  const results = productList.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] rounded-2xl border border-[#D4AF37]/30 shadow-2xl w-full max-w-2xl overflow-hidden text-white">
        <div className="p-4 sm:p-6 border-b border-[#D4AF37]/20 flex items-center space-x-3 bg-[#0A0A0A]">
          <Search className="w-5 h-5 text-[#F4D03F]" />
          <input
            type="text"
            autoFocus
            placeholder="Search royal delicacies by name, ingredient, or category (e.g. Laddu, Kaju, Milk Cake)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent text-sm sm:text-base font-medium text-white focus:outline-none placeholder-[#A3A3A3]"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#D9D9D9] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 space-y-3 bg-[#121212]">
          {results.length === 0 ? (
            <div className="py-12 text-center text-sm text-[#D9D9D9]/50 font-sans">
              No royal delicacies found matching "{searchTerm}"
            </div>
          ) : (
            results.map((sweet) => (
              <div
                key={sweet.id}
                onClick={() => {
                  onSelectSweet(sweet);
                  onClose();
                }}
                className="bg-[#181818] rounded-xl p-3.5 border border-[#D4AF37]/20 hover:border-[#D4AF37] shadow-md hover:shadow-xl transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-lg object-cover border border-[#D4AF37]/20"
                  />
                  <div>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                      {sweet.category}
                    </span>
                    <h4 className="font-serif-luxury font-bold text-base text-white group-hover:text-[#F4D03F] transition-colors">
                      {sweet.name}
                    </h4>
                    <p className="text-xs text-[#D9D9D9]/70 line-clamp-1 font-sans">
                      {sweet.description}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-extrabold text-sm text-[#F4D03F] font-serif-luxury block">
                    ₹{sweet.pricePerKg} / kg
                  </span>
                  <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">
                    View Delicacy →
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

