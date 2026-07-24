import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Save, X } from 'lucide-react';
import { apiService, AdminCategory } from '../../../lib/apiService';

interface CategoriesTabProps {
  categories: AdminCategory[];
  onRefresh: () => void;
}

export const CategoriesTab: React.FC<CategoriesTabProps> = ({ categories, onRefresh }) => {
  const [editingCat, setEditingCat] = useState<Partial<AdminCategory> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAdd = () => {
    setEditingCat({ name: '', description: '', isVisible: true, displayOrder: categories.length + 1 });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: AdminCategory) => {
    setEditingCat({ ...c });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat) return;
    await apiService.saveCategory(editingCat);
    setIsModalOpen(false);
    onRefresh();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <h3 className="text-base font-bold font-serif-luxury text-white">Categories Management</h3>
        <button onClick={handleOpenAdd} className="btn-gold text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.id} className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono text-[#D4AF37]">Order #{c.displayOrder}</span>
              <h4 className="text-base font-bold font-serif-luxury text-white mt-0.5">{c.name}</h4>
              <p className="text-xs text-gray-400 mt-1">{c.description}</p>
            </div>
            <button
              onClick={() => handleOpenEdit(c)}
              className="p-2 rounded-lg bg-[#121212] border border-[#D4AF37]/30 text-[#F4D03F] hover:bg-[#F4D03F] hover:text-black cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && editingCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full text-white p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold font-serif-luxury text-white mb-4">Category Details</h3>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={editingCat.name || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, name: e.target.value })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingCat.description || ''}
                  onChange={(e) => setEditingCat({ ...editingCat, description: e.target.value })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-xl btn-gold text-black font-extrabold uppercase tracking-wider cursor-pointer mt-4">
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
