import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Plus, Edit2, Trash2, CheckCircle2, Tag, Percent, Image, AlertCircle, ArrowUpRight } from 'lucide-react';
import { apiService, FestivalCampaignRecord, AdminProduct } from '../../../lib/apiService';

export const FestivalsTab: React.FC = () => {
  const [festivals, setFestivals] = useState<FestivalCampaignRecord[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFest, setEditingFest] = useState<Partial<FestivalCampaignRecord> | null>(null);

  const loadFestivals = async () => {
    setLoading(true);
    const [fList, pList] = await Promise.all([
      apiService.getFestivals(),
      apiService.getProducts(),
    ]);
    setFestivals(fList);
    setProducts(pList);
    setLoading(false);
  };

  useEffect(() => {
    loadFestivals();
  }, []);

  const handleOpenNew = () => {
    setEditingFest({
      name: '',
      festivalType: 'Diwali',
      bannerImage: 'https://res.cloudinary.com/q8pk1ufj/image/upload/v1784720744/diwali_box.jpg',
      specialProducts: [],
      discountPercent: 15,
      startDate: new Date().toISOString().split('T')[0],
      expiryDate: '2026-11-30',
      status: 'Active',
      description: '',
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFest || !editingFest.name) return;
    await apiService.saveFestival(editingFest);
    setShowModal(false);
    setEditingFest(null);
    loadFestivals();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this festival campaign?')) {
      await apiService.deleteFestival(id);
      loadFestivals();
    }
  };

  const toggleProductSelection = (prodId: string) => {
    if (!editingFest) return;
    const current = editingFest.specialProducts || [];
    const exists = current.includes(prodId);
    const updated = exists ? current.filter((p) => p !== prodId) : [...current, prodId];
    setEditingFest({ ...editingFest, specialProducts: updated });
  };

  if (loading) {
    return <div className="p-8 text-center text-[#D4AF37]">Loading Festival Campaigns...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#1A1A1A] via-[#121212] to-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-[#F4D03F] mb-1">
            <Sparkles className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest font-sans">
              Royal Celebration Campaigns
            </span>
          </div>
          <h2 className="text-2xl font-bold font-serif-luxury text-white">
            Festival & Campaign Manager
          </h2>
          <p className="text-xs text-gray-400 font-sans mt-1">
            Launch festive discounts, luxury hampers, festival banners, and seasonal specials.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="btn-gold px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Festival Campaign</span>
        </button>
      </div>

      {/* Festival Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {festivals.map((fest) => (
          <div
            key={fest.id}
            className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl overflow-hidden shadow-xl hover:border-[#D4AF37] transition-all flex flex-col group"
          >
            {/* Banner Preview */}
            <div className="h-40 w-full relative overflow-hidden bg-black">
              <img
                src={fest.bannerImage}
                alt={fest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-black/40" />

              <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 border border-[#D4AF37]/40 text-[#F4D03F] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {fest.festivalType}
              </div>

              <div className="absolute top-3 right-3 bg-rose-600 text-white font-black text-xs px-2.5 py-1 rounded-lg shadow-md flex items-center space-x-1">
                <Percent className="w-3 h-3" />
                <span>{fest.discountPercent}% OFF</span>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-lg font-bold font-serif-luxury text-white mb-1">
                  {fest.name}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                  {fest.description}
                </p>
              </div>

              {/* Special Products Tag list */}
              <div>
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider block mb-1.5">
                  Featured Special Products ({fest.specialProducts?.length || 0}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {fest.specialProducts && fest.specialProducts.length > 0 ? (
                    fest.specialProducts.slice(0, 3).map((pId) => {
                      const p = products.find((prod) => prod.id === pId || prod.name === pId);
                      return (
                        <span
                          key={pId}
                          className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded text-gray-300"
                        >
                          {p ? p.name : pId}
                        </span>
                      );
                    })
                  ) : (
                    <span className="text-[10px] text-gray-500 italic">All Store Items</span>
                  )}
                </div>
              </div>

              {/* Dates & Status */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center space-x-1 text-gray-300">
                  <Calendar className="w-3.5 h-3.5 text-[#F4D03F]" />
                  <span>
                    {fest.startDate} to {fest.expiryDate}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setEditingFest(fest);
                      setShowModal(true);
                    }}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors"
                    title="Edit Campaign"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(fest.id)}
                    className="p-1.5 rounded-lg bg-rose-950/60 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors"
                    title="Delete Campaign"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Add / Edit Campaign */}
      {showModal && editingFest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-[#141414] border border-[#D4AF37]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold font-serif-luxury text-white border-b border-[#D4AF37]/20 pb-3 flex items-center justify-between">
              <span>{editingFest.id ? 'Edit Festival Campaign' : 'Create New Festival Campaign'}</span>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Campaign Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Diwali Royal Mahotsav 2026"
                  value={editingFest.name || ''}
                  onChange={(e) => setEditingFest({ ...editingFest, name: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Festival Category
                  </label>
                  <select
                    value={editingFest.festivalType || 'Diwali'}
                    onChange={(e) => setEditingFest({ ...editingFest, festivalType: e.target.value as any })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  >
                    <option value="Diwali">Diwali</option>
                    <option value="Holi">Holi</option>
                    <option value="Raksha Bandhan">Raksha Bandhan</option>
                    <option value="Wedding Season">Wedding Season</option>
                    <option value="Durga Puja">Durga Puja</option>
                    <option value="New Year">New Year</option>
                    <option value="Other">Other Festival</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Festival Discount (% OFF)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={editingFest.discountPercent || 0}
                    onChange={(e) => setEditingFest({ ...editingFest, discountPercent: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={editingFest.startDate || ''}
                    onChange={(e) => setEditingFest({ ...editingFest, startDate: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={editingFest.expiryDate || ''}
                    onChange={(e) => setEditingFest({ ...editingFest, expiryDate: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Banner Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={editingFest.bannerImage || ''}
                  onChange={(e) => setEditingFest({ ...editingFest, bannerImage: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Description & Gifting Details
                </label>
                <textarea
                  rows={3}
                  value={editingFest.description || ''}
                  onChange={(e) => setEditingFest({ ...editingFest, description: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#D4AF37] focus:outline-none"
                  placeholder="Details about luxury velvet trunks, corporate discounts..."
                />
              </div>

              {/* Select Special Products */}
              <div>
                <label className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-2">
                  Select Special Sweets Included in Campaign
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-2 bg-[#0A0A0A] border border-white/10 rounded-xl">
                  {products.map((prod) => {
                    const isSelected = editingFest.specialProducts?.includes(prod.id);
                    return (
                      <button
                        key={prod.id}
                        type="button"
                        onClick={() => toggleProductSelection(prod.id)}
                        className={`p-2 rounded-lg text-[11px] font-bold text-left transition-colors flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#F4D03F]'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/30'
                        }`}
                      >
                        <span className="truncate">{prod.name}</span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#F4D03F] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-xs font-bold text-gray-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-6 py-2.5 rounded-xl text-xs font-extrabold uppercase text-black"
                >
                  Save Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
