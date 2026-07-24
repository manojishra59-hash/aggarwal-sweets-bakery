import React, { useState } from 'react';
import { Plus, Tag, Trash2, Edit2, Check, X, Percent, Gift } from 'lucide-react';
import { apiService, CouponRecord } from '../../../lib/apiService';

interface CouponsTabProps {
  coupons: CouponRecord[];
  onRefresh: () => void;
}

export const CouponsTab: React.FC<CouponsTabProps> = ({ coupons, onRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Partial<CouponRecord> | null>(null);

  const handleOpenAdd = () => {
    setEditingCoupon({
      code: 'FESTIVE' + Math.floor(10 + Math.random() * 90),
      discountType: 'percentage',
      discountValue: 10,
      minOrderAmount: 500,
      maxDiscountAmount: 200,
      usageLimit: 100,
      expiryDate: '2026-12-31',
      isEnabled: true,
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon) return;
    await apiService.saveCoupon(editingCoupon);
    setIsModalOpen(false);
    onRefresh();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <h3 className="text-base font-bold font-serif-luxury text-white">Coupons & Promo Codes</h3>
        <button onClick={handleOpenAdd} className="btn-gold text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Create Promo Coupon</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((c) => (
          <div key={c.id} className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F4D03F] font-mono font-black text-sm rounded-lg uppercase tracking-wider">
                  {c.code}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${c.isEnabled ? 'bg-emerald-950 text-emerald-300' : 'bg-gray-800 text-gray-400'}`}>
                  {c.isEnabled ? 'ACTIVE' : 'DISABLED'}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-300 mb-4">
                <p className="text-base font-extrabold text-white">
                  {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
                </p>
                <p className="text-[11px] text-gray-400">Min Order: <span className="font-mono text-[#F4D03F]">₹{c.minOrderAmount}</span></p>
                <p className="text-[11px] text-gray-400">Times Used: <span className="font-mono">{c.timesUsed} / {c.usageLimit}</span></p>
                <p className="text-[11px] text-gray-500">Valid Till: {c.expiryDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && editingCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full text-white p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold font-serif-luxury text-white mb-4">Coupon Configuration</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={editingCoupon.code || ''}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white font-mono uppercase focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#D4AF37] uppercase mb-1">Discount Type</label>
                  <select
                    value={editingCoupon.discountType || 'percentage'}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, discountType: e.target.value as 'percentage' | 'flat' })}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="flat">Flat Amount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#D4AF37] uppercase mb-1">Value *</label>
                  <input
                    type="number"
                    required
                    value={editingCoupon.discountValue || 0}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, discountValue: Number(e.target.value) })}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#D4AF37] uppercase mb-1">Min Order Amount (₹)</label>
                  <input
                    type="number"
                    value={editingCoupon.minOrderAmount || 0}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, minOrderAmount: Number(e.target.value) })}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#D4AF37] uppercase mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={editingCoupon.expiryDate || ''}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, expiryDate: e.target.value })}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl btn-gold text-black font-extrabold uppercase tracking-wider cursor-pointer mt-4">
                Save Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
