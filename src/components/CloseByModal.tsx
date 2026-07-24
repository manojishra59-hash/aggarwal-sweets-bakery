import React from 'react';
import { X, MapPin, Navigation, Phone, Clock } from 'lucide-react';

interface CloseByModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CloseByModal: React.FC<CloseByModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const locations = [
    {
      name: 'Central Boulevard Cafe',
      address: 'Amir Timur Street 42, Tashkent',
      distance: '0.8 km away',
      phone: '+998 71 200 11 22',
      status: 'Open • Closes 11 PM',
    },
    {
      name: 'Tashkent City Park Boutique',
      address: 'Park Avenue House 12, Tashkent',
      distance: '2.1 km away',
      phone: '+998 71 200 33 44',
      status: 'Open • Closes 10 PM',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-rose-950 border border-white/20 text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-rose-300 mb-1">
          <MapPin className="w-4 h-4 fill-rose-300" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Locations
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-white mb-4">
          Find Us Close By
        </h2>

        {/* Map visual representation */}
        <div className="relative w-full h-36 bg-stone-900 rounded-2xl overflow-hidden mb-5 border border-white/15 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
          <div className="relative z-10 flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center shadow-lg animate-bounce mb-1">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
              Bekzod Shirinliklari Main Shop
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {locations.map((loc, index) => (
            <div
              key={index}
              className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-start justify-between"
            >
              <div>
                <h4 className="font-bold text-sm text-white">{loc.name}</h4>
                <p className="text-xs text-white/70 mt-0.5">{loc.address}</p>
                <div className="flex items-center space-x-3 text-[11px] text-rose-300 font-medium mt-2">
                  <span className="flex items-center">
                    <Clock className="w-3 h-3 mr-1 text-rose-300" />
                    {loc.status}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Phone className="w-3 h-3 mr-1 text-rose-300" />
                    {loc.phone}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-2.5 py-1 bg-white/10 text-white text-[11px] font-bold rounded-lg mb-2">
                  {loc.distance}
                </span>
                <button
                  onClick={() =>
                    alert(`Navigating to ${loc.name} (${loc.address})`)
                  }
                  className="block w-full text-xs font-bold text-rose-300 hover:text-white flex items-center justify-end space-x-1 cursor-pointer"
                >
                  <Navigation className="w-3 h-3" />
                  <span>Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
