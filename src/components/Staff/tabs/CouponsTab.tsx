import React, { useState } from 'react';
import { Tag, Trash2, Plus, X } from 'lucide-react';
import { Coupon } from '../types';
import { INITIAL_COUPONS } from '../mockStaffData';

export const CouponsTab: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_coupons');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_COUPONS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Coupon>>({
    code: '',
    discountPercent: 15,
    minOrderValue: 499,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
    usageLimit: 500,
    timesUsed: 0,
    isActive: true,
  });

  const saveStorage = (updated: Coupon[]) => {
    setCoupons(updated);
    localStorage.setItem('aggarwal_admin_coupons', JSON.stringify(updated));
  };

  const toggleActive = (id: string) => {
    const updated = coupons.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c));
    saveStorage(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete coupon code?')) {
      const updated = coupons.filter((c) => c.id !== id);
      saveStorage(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.discountPercent) return;

    const newCoupon: Coupon = {
      id: `CPN-${Date.now().toString().slice(-4)}`,
      code: formData.code.toUpperCase().trim(),
      discountPercent: Number(formData.discountPercent) || 10,
      minOrderValue: Number(formData.minOrderValue) || 200,
      expiryDate: formData.expiryDate || new Date().toISOString().split('T')[0],
      usageLimit: Number(formData.usageLimit) || 100,
      timesUsed: 0,
      isActive: true,
    };

    saveStorage([newCoupon, ...coupons]);
    setIsModalOpen(false);
    setFormData({
      code: '',
      discountPercent: 15,
      minOrderValue: 499,
      expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
      usageLimit: 500,
      timesUsed: 0,
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <Tag className="w-5 h-5 text-[#F4D03F]" />
            <span>Discount Coupons & Promo Vouchers</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage promotional codes, minimum spend thresholds & usage limits</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs flex items-center space-x-1.5 hover:scale-105 transition-all shadow-lg cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Coupon Code</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {coupons.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#141414] border border-[#D4AF37]/20 text-gray-400 text-xs italic">
            No coupon codes created or active. Click "+ Create Coupon Code" above to generate one.
          </div>
        ) : (
          coupons.map((c) => (
            <div
              key={c.id}
              className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-xl space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-lg bg-black border border-[#D4AF37] text-[#F4D03F] font-mono font-black text-sm tracking-wider">
                  {c.code}
                </span>

                <button
                  onClick={() => toggleActive(c.id)}
                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase border cursor-pointer ${
                    c.isActive
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                      : 'bg-gray-900 text-gray-400 border-gray-700'
                  }`}
                >
                  {c.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>

              <div className="text-2xl font-black font-mono text-white">
                {c.discountPercent}% OFF
              </div>

              <div className="text-xs space-y-1 text-gray-300 pt-2 border-t border-gray-800">
                <div className="flex justify-between">
                  <span className="text-gray-500">Min. Order Value:</span>
                  <span className="font-mono text-white">₹{c.minOrderValue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Usage Redemption:</span>
                  <span className="font-mono text-gray-300">{c.timesUsed} / {c.usageLimit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Valid Until:</span>
                  <span className="font-mono text-amber-300">{c.expiryDate}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(c.id)}
                  className="p-1.5 rounded-lg bg-red-950/40 text-red-300 hover:text-white border border-red-500/30 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#141414] border border-[#D4AF37] rounded-2xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-900 border border-gray-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-serif font-bold text-white flex items-center space-x-2 border-b border-gray-800 pb-3">
              <Tag className="w-5 h-5 text-[#F4D03F]" />
              <span>Generate Promo Coupon</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Coupon Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE100"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white uppercase font-mono font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Discount % *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    max="100"
                    value={formData.discountPercent}
                    onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Usage Limit Count</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold shadow-lg"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

