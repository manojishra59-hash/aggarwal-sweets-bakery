import React from 'react';
import { X, MapPin, Navigation, Phone, Clock } from 'lucide-react';
import { BRAND_NAME, BRAND_PHONE } from '../data/sweetsData';

interface CloseByModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloseByModal: React.FC<CloseByModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const locations = [
    {
      name: 'Aggarwal Sweets Flagship',
      address: 'Shop No. 14, Main Market, Rajouri Garden, New Delhi',
      distance: '0.5 km away',
      phone: BRAND_PHONE,
      status: 'Open • 7:30 AM - 10:30 PM',
      mapsUrl: 'https://maps.google.com/?q=Rajouri+Garden+Delhi',
    },
    {
      name: 'Aggarwal Sweets & Restaurant',
      address: 'Block B, Sector 18 Market, Noida, UP',
      distance: '3.2 km away',
      phone: BRAND_PHONE,
      status: 'Open • 8:00 AM - 10:30 PM',
      mapsUrl: 'https://maps.google.com/?q=Sector+18+Noida',
    },
    {
      name: 'Aggarwal Sweets Express',
      address: 'DLF Phase 4, Galleria Market, Gurugram, Haryana',
      distance: '5.8 km away',
      phone: BRAND_PHONE,
      status: 'Open • 8:00 AM - 11:00 PM',
      mapsUrl: 'https://maps.google.com/?q=Galleria+Market+Gurugram',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-[#D4AF37]/40 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#0A0A0A] text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#D4AF37] mb-1">
          <MapPin className="w-4 h-4 text-[#F4D03F]" />
          <span className="text-xs font-bold uppercase tracking-widest font-sans">
            Store Finder
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-white font-serif-luxury mb-4">
          Find Aggarwal Sweets Near You
        </h2>

        {/* Map visual representation */}
        <div className="relative w-full h-36 bg-[#0A0A0A] rounded-2xl overflow-hidden mb-5 border border-[#D4AF37]/20 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          <div className="relative z-10 flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F4D03F] to-[#D4AF37] rounded-full flex items-center justify-center shadow-lg animate-bounce mb-1">
              <MapPin className="w-6 h-6 text-black" />
            </div>
            <span className="text-xs font-bold text-white bg-black/80 px-3 py-1 rounded-full backdrop-blur-sm border border-[#D4AF37]/40 font-serif-luxury">
              {BRAND_NAME} Flagship Store • Rajouri Garden
            </span>
          </div>
        </div>

        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/20 flex items-start justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-white font-serif-luxury">{loc.name}</h4>
                <p className="text-xs text-[#D9D9D9]/80 mt-0.5 font-sans">{loc.address}</p>
                <div className="flex items-center space-x-3 text-[11px] text-[#D4AF37] font-medium mt-2">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-[#F4D03F]" />
                    {loc.status}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Phone className="w-3 h-3 mr-1 text-[#F4D03F]" />
                    {loc.phone}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-2.5 py-1 bg-[#222222] text-[#F4D03F] text-[11px] font-bold rounded-lg mb-2 border border-[#D4AF37]/30">
                  {loc.distance}
                </span>
                <a
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-xs font-bold text-[#D4AF37] hover:text-[#F4D03F] flex items-center justify-end space-x-1 cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

