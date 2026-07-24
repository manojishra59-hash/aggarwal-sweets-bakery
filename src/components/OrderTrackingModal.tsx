import React, { useState } from 'react';
import { X, Search, PackageCheck, Truck, CheckCircle2, Clock, AlertCircle, ShoppingBag } from 'lucide-react';
import { apiService, OrderRecord } from '../lib/apiService';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose }) => {
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState<OrderRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    setLoading(true);
    setHasSearched(true);

    const orders = await apiService.getOrders();
    const query = searchId.trim().toUpperCase();
    const order = orders.find(
      (o) => o.orderNumber.toUpperCase() === query || o.id.toUpperCase() === query || o.customerPhone.includes(query)
    );

    setFoundOrder(order || null);
    setLoading(false);
  };

  const getStatusStep = (status: OrderRecord['status']) => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Preparing':
        return 2;
      case 'Packaging':
        return 3;
      case 'Out for Delivery':
        return 4;
      case 'Delivered':
        return 5;
      default:
        return 0;
    }
  };

  const currentStep = foundOrder ? getStatusStep(foundOrder.status) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-3xl max-w-lg w-full text-white p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#D4AF37] mb-2">
          <Truck className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest font-sans">
            Live Order Concierge
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-white font-serif-luxury mb-4">
          Track Your Royal Sweet Order
        </h2>

        {/* Search Input */}
        <form onSubmit={handleTrack} className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter Order ID (e.g. ORD-1082) or Phone Number"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-[#D4AF37]/40 rounded-2xl pl-4 pr-12 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-4 rounded-xl btn-gold text-black text-xs font-bold flex items-center justify-center cursor-pointer disabled:opacity-50"
            >
              {loading ? <Clock className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </button>
          </div>
        </form>

        {/* Search Results */}
        {hasSearched && (
          <div>
            {foundOrder ? (
              <div className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30 space-y-6">
                <div className="flex justify-between items-start border-b border-[#D4AF37]/20 pb-4">
                  <div>
                    <span className="text-xs text-gray-400 font-mono">Order #{foundOrder.orderNumber}</span>
                    <h4 className="text-lg font-bold font-serif-luxury text-white mt-0.5">{foundOrder.customerName}</h4>
                    <p className="text-xs text-[#D4AF37]">{foundOrder.deliveryAddress}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#F4D03F] text-xs font-extrabold uppercase border border-[#D4AF37]/40">
                      {foundOrder.status}
                    </span>
                    <p className="text-xs text-gray-400 mt-1">₹{foundOrder.totalAmount}</p>
                  </div>
                </div>

                {/* Progress Steps */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Live Delivery Timeline</span>
                  <div className="grid grid-cols-5 gap-1 text-center">
                    {[
                      { step: 1, label: 'Received' },
                      { step: 2, label: 'Preparing' },
                      { step: 3, label: 'Packed' },
                      { step: 4, label: 'On Way' },
                      { step: 5, label: 'Delivered' },
                    ].map((s) => (
                      <div key={s.step} className="flex flex-col items-center space-y-1.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                            currentStep >= s.step
                              ? 'bg-[#F4D03F] text-black shadow-[0_0_12px_rgba(244,208,63,0.5)]'
                              : 'bg-white/10 text-gray-500'
                          }`}
                        >
                          {currentStep >= s.step ? '✓' : s.step}
                        </div>
                        <span className={`text-[10px] font-semibold ${currentStep >= s.step ? 'text-[#F4D03F]' : 'text-gray-500'}`}>
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes or Items */}
                {foundOrder.notes && (
                  <div className="bg-[#121212] p-3 rounded-xl border border-white/10 text-xs text-gray-300">
                    <span className="text-[#D4AF37] font-bold">Special Note: </span>
                    {foundOrder.notes}
                  </div>
                )}
              </div>
            ) : (
              <div className="py-8 text-center bg-[#181818] rounded-2xl border border-rose-900/50 p-6 space-y-3">
                <AlertCircle className="w-10 h-10 text-rose-500 mx-auto" />
                <h4 className="text-sm font-bold text-white">Order Not Found</h4>
                <p className="text-xs text-gray-400">
                  Please verify your Order ID or contact store concierge on WhatsApp.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
