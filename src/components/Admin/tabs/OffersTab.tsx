import React, { useState } from 'react';
import { Sparkles, Save, Eye, Image } from 'lucide-react';
import { OfferRecord } from '../../../lib/apiService';

interface OffersTabProps {
  offers: OfferRecord[];
}

export const OffersTab: React.FC<OffersTabProps> = ({ offers }) => {
  const [offerList, setOfferList] = useState<OfferRecord[]>(offers);

  const togglePopup = (id: string) => {
    setOfferList((prev) =>
      prev.map((o) => (o.id === id ? { ...o, popupActive: !o.popupActive } : o))
    );
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <h3 className="text-base font-bold font-serif-luxury text-white">Festival Campaigns & Popups</h3>
        <span className="text-xs font-mono text-[#F4D03F] font-bold">{offerList.length} Campaign Banners</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offerList.map((o) => (
          <div key={o.id} className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="h-32 rounded-xl overflow-hidden mb-3 relative bg-black">
                <img src={o.bannerImage} alt={o.title} className="w-full h-full object-cover opacity-80" />
                <div className="absolute top-2 left-2 px-2.5 py-1 bg-amber-500 text-black text-[10px] font-black uppercase rounded">
                  {o.discountText}
                </div>
              </div>
              <h4 className="text-base font-bold font-serif-luxury text-white mb-1">{o.title}</h4>
              <p className="text-xs text-gray-400 mb-3">{o.subtitle}</p>
            </div>

            <div className="pt-3 border-t border-gray-800 flex justify-between items-center">
              <span className="text-[11px] text-gray-500 font-mono">Valid till {o.validTill}</span>
              <button
                onClick={() => togglePopup(o.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border cursor-pointer ${
                  o.popupActive
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-[#121212] text-gray-400 border-gray-800'
                }`}
              >
                {o.popupActive ? '✓ Popup Active on Site' : 'Enable Site Popup'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
