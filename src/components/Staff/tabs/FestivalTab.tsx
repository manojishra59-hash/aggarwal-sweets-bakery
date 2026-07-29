import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Trash2,
  Plus,
  X,
  Image as ImageIcon,
  Tag,
} from 'lucide-react';
import { FestivalCampaign } from '../types';
import { INITIAL_FESTIVALS } from '../mockStaffData';

export const FestivalTab: React.FC = () => {
  const [festivals, setFestivals] = useState<FestivalCampaign[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_festivals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_FESTIVALS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<FestivalCampaign>>({
    title: '',
    festivalName: 'Diwali Special',
    discountPercentage: 20,
    bannerUrl: 'https://images.unsplash.com/photo-1605197584547-c93e12564dd1?auto=format&fit=crop&q=80&w=1200',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().split('T')[0],
    description: '',
    isActive: true,
  });

  const saveStorage = (updated: FestivalCampaign[]) => {
    setFestivals(updated);
    localStorage.setItem('aggarwal_admin_festivals', JSON.stringify(updated));
  };

  const toggleActive = (id: string) => {
    const updated = festivals.map((f) => (f.id === id ? { ...f, isActive: !f.isActive } : f));
    saveStorage(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this festival campaign?')) {
      const updated = festivals.filter((f) => f.id !== id);
      saveStorage(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.festivalName) return;

    const newFest: FestivalCampaign = {
      id: `FEST-${Date.now().toString().slice(-4)}`,
      title: formData.title,
      festivalName: formData.festivalName,
      bannerUrl: formData.bannerUrl || 'https://images.unsplash.com/photo-1605197584547-c93e12564dd1?auto=format&fit=crop&q=80&w=1200',
      discountPercentage: Number(formData.discountPercentage) || 15,
      startDate: formData.startDate || new Date().toISOString().split('T')[0],
      endDate: formData.endDate || new Date().toISOString().split('T')[0],
      isActive: true,
      featuredProducts: ['Kaju Katli Special', 'Royal Sweets Hamper'],
      description: formData.description || 'Special festive celebration discounts on authentic Desi Ghee traditional sweets.',
    };

    saveStorage([newFest, ...festivals]);
    setIsModalOpen(false);
    setFormData({
      title: '',
      festivalName: 'Diwali Special',
      discountPercentage: 20,
      bannerUrl: 'https://images.unsplash.com/photo-1605197584547-c93e12564dd1?auto=format&fit=crop&q=80&w=1200',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().split('T')[0],
      description: '',
      isActive: true,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#F4D03F]" />
            <span>Festival Campaigns & Seasonal Offers</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage Diwali, Rakhi, Holi & Wedding celebration campaigns</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs flex items-center space-x-1.5 hover:scale-105 transition-all shadow-lg cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ New Festival Offer</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {festivals.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#141414] border border-[#D4AF37]/20 text-gray-400 text-xs italic">
            No festival campaigns active or scheduled. Click "+ New Festival Offer" above to create one.
          </div>
        ) : (
          festivals.map((fest) => (
            <div
              key={fest.id}
              className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-xl space-y-4 relative overflow-hidden"
            >
              <div className="relative h-48 rounded-xl overflow-hidden bg-black">
                <img src={fest.bannerUrl} alt={fest.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#F4D03F] font-mono text-xs font-bold">
                  {fest.discountPercentage}% OFF
                </span>

                <button
                  onClick={() => toggleActive(fest.id)}
                  className={`absolute top-3 right-3 px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                    fest.isActive
                      ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500'
                      : 'bg-gray-900/90 text-gray-400 border-gray-700'
                  }`}
                >
                  {fest.isActive ? 'Active Now' : 'Disabled'}
                </button>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-[#F4D03F] tracking-widest">{fest.festivalName}</span>
                  <h3 className="text-lg font-bold font-serif">{fest.title}</h3>
                </div>
              </div>

              <p className="text-xs text-gray-300">{fest.description}</p>

              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-800">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{fest.startDate} to {fest.endDate}</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDelete(fest.id)}
                    className="p-1.5 rounded-lg bg-red-950/40 text-red-300 hover:text-white border border-red-500/30 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#141414] border border-[#D4AF37] rounded-2xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-900 border border-gray-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-serif font-bold text-white flex items-center space-x-2 border-b border-gray-800 pb-3">
              <Sparkles className="w-5 h-5 text-[#F4D03F]" />
              <span>Create Festival Campaign</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diwali Royal Sweets Carnival"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Festival / Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diwali Special"
                    value={formData.festivalName}
                    onChange={(e) => setFormData({ ...formData, festivalName: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Discount %</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.bannerUrl}
                  onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Campaign Description</label>
                <textarea
                  rows={2}
                  placeholder="Describe festival offer terms, gift boxes..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                />
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

