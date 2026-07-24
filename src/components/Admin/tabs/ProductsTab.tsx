import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Check, X, Award, Sparkles, Image, Tag, Save } from 'lucide-react';
import { apiService, AdminProduct, AdminCategory } from '../../../lib/apiService';

interface ProductsTabProps {
  products: AdminProduct[];
  categories: AdminCategory[];
  onRefresh: () => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  categories,
  onRefresh,
}) => {
  const [editingProduct, setEditingProduct] = useState<Partial<AdminProduct> | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCat, setFilterCat] = useState('All');

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = filterCat === 'All' || p.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct({
      name: '',
      category: categories[0]?.name || 'Ghee Sweets',
      description: '',
      pricePerKg: 500,
      halfKgPrice: 260,
      stockKg: 50,
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
      freshToday: true,
      rating: 5.0,
      ingredients: ['Pure Desi Ghee', 'Cardamom', 'Kesar'],
      isEnabled: true,
      isFeatured: false,
      isBestSeller: false,
      isFestivalSpecial: false,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: AdminProduct) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to remove this sweet from catalog?')) {
      await apiService.deleteProduct(id);
      onRefresh();
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    await apiService.saveProduct(editingProduct);
    setIsModalOpen(false);
    setEditingProduct(null);
    onRefresh();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search mithai or ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] w-full sm:w-64"
          />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Categories ({products.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-gold text-black px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-md w-full sm:w-auto justify-center"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Mithai</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className={`bg-[#181818] rounded-2xl border p-4 flex flex-col justify-between transition-all ${
              p.isEnabled ? 'border-[#D4AF37]/30 shadow-md' : 'border-gray-800 opacity-60'
            }`}
          >
            <div>
              <div className="relative mb-3 rounded-xl overflow-hidden h-36 bg-black">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex flex-col items-end gap-1">
                  {p.isBestSeller && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500 text-black text-[9px] font-black uppercase">
                      Best Seller
                    </span>
                  )}
                  {p.isFeatured && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D4AF37] text-black text-[9px] font-black uppercase">
                      Featured
                    </span>
                  )}
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur text-xs font-mono text-[#F4D03F] font-bold">
                  Stock: {p.stockKg} kg
                </div>
              </div>

              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                {p.category}
              </span>
              <h4 className="text-base font-bold font-serif-luxury text-white mb-1">{p.name}</h4>
              <p className="text-xs text-gray-400 line-clamp-2 mb-3">{p.description}</p>
            </div>

            <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400">Rate: </span>
                <span className="text-sm font-extrabold text-[#F4D03F] font-mono">₹{p.pricePerKg}/kg</span>
              </div>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-2 rounded-lg bg-[#121212] border border-[#D4AF37]/30 text-gray-300 hover:text-[#F4D03F] hover:border-[#F4D03F] cursor-pointer"
                  title="Edit Product"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-2 rounded-lg bg-[#121212] border border-rose-900/50 text-rose-400 hover:bg-rose-950 cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Edit / Add Modal */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-3xl max-w-xl w-full text-white p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-serif-luxury text-white mb-4">
              {editingProduct.id ? 'Edit Sweet Item' : 'Add New Sweet Item'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Sweet Name *</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#D4AF37] uppercase mb-1">Category</label>
                  <select
                    value={editingProduct.category || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#D4AF37] uppercase mb-1">Stock (kg)</label>
                  <input
                    type="number"
                    value={editingProduct.stockKg || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockKg: Number(e.target.value) })}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#D4AF37] uppercase mb-1">Price per 1kg (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.pricePerKg || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, pricePerKg: Number(e.target.value) })}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#D4AF37] uppercase mb-1">Price per 500g (₹) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.halfKgPrice || 0}
                    onChange={(e) => setEditingProduct({ ...editingProduct, halfKgPrice: Number(e.target.value) })}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingProduct.description || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <label className="flex items-center space-x-2 bg-[#181818] p-2.5 rounded-xl border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isFeatured || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                    className="accent-[#D4AF37]"
                  />
                  <span className="text-xs text-white font-bold">Featured on Homepage</span>
                </label>

                <label className="flex items-center space-x-2 bg-[#181818] p-2.5 rounded-xl border border-white/10 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProduct.isBestSeller || false}
                    onChange={(e) => setEditingProduct({ ...editingProduct, isBestSeller: e.target.checked })}
                    className="accent-[#D4AF37]"
                  />
                  <span className="text-xs text-white font-bold">Best Seller Badge</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl btn-gold text-black font-extrabold uppercase shadow-lg flex items-center justify-center space-x-2 cursor-pointer mt-4"
              >
                <Save className="w-4 h-4" />
                <span>Save Sweet Details</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
