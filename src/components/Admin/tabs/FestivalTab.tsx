import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Calendar,
  Percent,
  Tag,
  CheckCircle2,
  XCircle,
  Image as ImageIcon,
  Edit2,
  Trash2,
} from 'lucide-react';
import { FestivalCampaign } from '../types';
import { INITIAL_FESTIVALS } from '../mockAdminData';

export const FestivalTab: React.FC = () => {
  const [festivals, setFestivals] = useState<FestivalCampaign[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_festivals');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_FESTIVALS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFest, setEditingFest] = useState<FestivalCampaign | null>(null);

  const [formData, setFormData] = useState<Partial<FestivalCampaign>>({
    title: 'Diwali Royal Sweets Carnival',
    festivalName: 'Diwali Special',
    bannerUrl: 'https://images.unsplash.com/photo-1605197584547-c93e12564dd1?auto=format&fit=crop&q=80&w=1200',
    discountPercentage: 20,
    startDate: '2026-10-20',
    endDate: '2026-11-05',
    isActive: true,
    description: 'Celebrate Diwali with pure Desi Ghee authentic traditional sweets.',
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
    if (!formData.title) return;

    if (editingFest) {
      const updated = festivals.map((f) => (f.id === editingFest.id ? ({ ...f, ...formData } as FestivalCampaign) : f));
      saveStorage(updated);
    } else {
      const newFest: FestivalCampaign = {
        id: `FEST-${Date.now()}`,
        title: formData.title || 'Festival Offer',
        festivalName: formData.festivalName || 'Special Occasion',
        bannerUrl: formData.bannerUrl || 'https://images.unsplash.com/photo-1605197584547-c93e12564dd1?auto=format&fit=crop&q=80&w=1200',
        discountPercentage: Number(formData.discountPercentage) || 15,
        startDate: formData.startDate || '2026-08-01',
        endDate: formData.endDate || '2026-08-15',
        isActive: formData.isActive ?? true,
        featuredProducts: ['Kaju Katli Special', 'Royal Sweets Hamper'],
        description: formData.description || 'Festive celebrations with royal sweets.',
      };
      saveStorage([newFest, ...festivals]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-[#F4D03F]" />
            <span>Festival Campaigns & Seasonal Offers</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage Diwali, Rakhi, Holi & Wedding celebration campaigns</p>
        </div>

        <button
          onClick={() => {
            setEditingFest(null);
            setIsModalOpen(true);
          }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885] cursor-pointer hover:scale-105 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Festival Offer</span>
        </button>
      </div>

      {/* Campaigns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {festivals.map((fest) => (
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
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#F4D03F] font-serif border-b border-gray-800 pb-2">
              Create Festival Campaign
            </h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Campaign Title</label>
                <input
                  type="text"
                  required
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Festival Name</label>
                  <input
                    type="text"
                    value={formData.festivalName || ''}
                    onChange={(e) => setFormData({ ...formData, festivalName: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Discount %</label>
                  <input
                    type="number"
                    value={formData.discountPercentage || 15}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Banner Image URL</label>
                <input
                  type="url"
                  value={formData.bannerUrl || ''}
                  onChange={(e) => setFormData({ ...formData, bannerUrl: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={formData.startDate || ''}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">End Date</label>
                  <input
                    type="date"
                    value={formData.endDate || ''}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
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
                  Publish Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
