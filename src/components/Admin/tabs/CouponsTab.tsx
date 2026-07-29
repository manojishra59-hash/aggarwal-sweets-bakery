import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2, XCircle, Trash2, Calendar, DollarSign, Users } from 'lucide-react';
import { Coupon } from '../types';
import { INITIAL_COUPONS } from '../mockAdminData';

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
    code: 'ROYAL100',
    discountPercent: 15,
    minOrderValue: 999,
    expiryDate: '2026-12-31',
    usageLimit: 500,
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
    if (!formData.code) return;

    const newCoupon: Coupon = {
      id: `CPN-${Date.now()}`,
      code: (formData.code || 'SPECIAL').toUpperCase().replace(/\s+/g, ''),
      discountPercent: Number(formData.discountPercent) || 10,
      minOrderValue: Number(formData.minOrderValue) || 499,
      expiryDate: formData.expiryDate || '2026-12-31',
      usageLimit: Number(formData.usageLimit) || 100,
      timesUsed: 0,
      isActive: true,
    };
    saveStorage([newCoupon, ...coupons]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <Tag className="w-5 h-5 text-[#F4D03F]" />
            <span>Discount Coupons & Promo Vouchers</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage promotional codes, minimum spend thresholds & usage limits</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885] cursor-pointer hover:scale-105 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {coupons.map((c) => (
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
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#F4D03F] font-serif border-b border-gray-800 pb-2">
              Generate New Coupon
            </h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Coupon Code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DIWALI2026"
                  value={formData.code || ''}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white uppercase font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={formData.discountPercent || 15}
                    onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrderValue || 999}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate || '2026-12-31'}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Usage Limit</label>
                  <input
                    type="number"
                    value={formData.usageLimit || 500}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-extrabold rounded-xl"
                >
                  Create Code
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
