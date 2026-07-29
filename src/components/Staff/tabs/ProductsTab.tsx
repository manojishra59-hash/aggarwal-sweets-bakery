import React, { useState } from 'react';
import {
  Search,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Sparkles,
  Image as ImageIcon,
  Plus,
  RotateCcw,
  Copy,
  X,
  Tag,
} from 'lucide-react';
import { SweetItem } from '../../../types';
import { FEATURED_SWEETS } from '../../../data/sweetsData';

export const ProductsTab: React.FC = () => {
  const [products, setProducts] = useState<SweetItem[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return FEATURED_SWEETS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<SweetItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<SweetItem>>({
    name: '',
    category: 'Sweets',
    description: '',
    pricePerKg: 500,
    halfKgPrice: 260,
    image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600',
    freshToday: true,
    rating: 4.9,
    ingredients: ['Pure Desi Ghee', 'Saffron', 'Sugar'],
  });

  const categories = ['All', 'Sweets', 'Namkeen', 'Cakes', 'Gift Hampers', 'Festival Specials', 'Beverages'];

  const sampleImages = [
    { label: 'Kaju Katli', url: 'https://images.unsplash.com/photo-1605197584547-c93e12564dd1?auto=format&fit=crop&q=80&w=600' },
    { label: 'Motichoor Laddu', url: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600' },
    { label: 'Gulab Jamun', url: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=600' },
    { label: 'Rasgulla', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=600' },
    { label: 'Dry Fruit Box', url: 'https://images.unsplash.com/photo-1514517220017-8ce97a34a7b6?auto=format&fit=crop&q=80&w=600' },
  ];

  const saveToStorage = (updated: SweetItem[]) => {
    setProducts(updated);
    localStorage.setItem('aggarwal_admin_products', JSON.stringify(updated));
    window.dispatchEvent(new Event('aggarwal_products_updated'));
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'Sweets',
      description: 'Handcrafted authentic delicacy prepared fresh in pure Desi Ghee.',
      pricePerKg: 500,
      halfKgPrice: 275,
      image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600',
      freshToday: true,
      rating: 4.9,
      ingredients: ['Pure Desi Ghee', 'Saffron', 'Pistachio'],
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (product: SweetItem) => {
    setEditingProduct(product);
    setFormData(product);
    setIsAddModalOpen(true);
  };

  const handleDuplicate = (product: SweetItem) => {
    const clonedProduct: SweetItem = {
      ...product,
      id: `sw-${Date.now().toString().slice(-5)}`,
      name: `${product.name} (Special)`,
    };
    saveToStorage([clonedProduct, ...products]);
  };

  const handleToggleFreshStatus = (id: string) => {
    const updated = products.map((p) =>
      p.id === id ? { ...p, freshToday: !p.freshToday } : p
    );
    saveToStorage(updated);
  };

  const handleDelete = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveToStorage(updated);
  };

  const handleResetDefaultMenu = () => {
    if (window.confirm('Recreate and restore full default royal sweets menu catalog?')) {
      saveToStorage(FEATURED_SWEETS);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.pricePerKg) return;

    if (editingProduct) {
      const updated = products.map((p) =>
        p.id === editingProduct.id
          ? ({ ...p, ...formData } as SweetItem)
          : p
      );
      saveToStorage(updated);
    } else {
      const newProduct: SweetItem = {
        id: `sw-${Date.now().toString().slice(-5)}`,
        name: formData.name || 'Custom Sweet',
        category: formData.category || 'Sweets',
        description: formData.description || 'Traditional royal delicacy.',
        pricePerKg: Number(formData.pricePerKg) || 500,
        halfKgPrice: Number(formData.halfKgPrice) || Math.round((Number(formData.pricePerKg) || 500) * 0.55),
        image: formData.image || 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=600',
        freshToday: formData.freshToday ?? true,
        rating: 4.9,
        ingredients: formData.ingredients || ['Pure Desi Ghee', 'Cardamom'],
      };
      saveToStorage([newProduct, ...products]);
    }
    setIsAddModalOpen(false);
  };

  const safeProducts = Array.isArray(products) ? products : FEATURED_SWEETS;
  const filteredProducts = safeProducts.filter((p) => {
    if (!p) return false;
    const matchesCat = selectedCategory === 'All' || (p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase()));
    const matchesSearch = (p.name && p.name.toLowerCase().includes(searchQuery.toLowerCase())) || (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div className="flex items-center space-x-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search sweets, namkeen, hampers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleResetDefaultMenu}
            className="px-3.5 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 hover:text-white text-xs font-bold flex items-center space-x-1.5 transition-all cursor-pointer"
            title="Restore default menu catalog"
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Reset Default Menu</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs flex items-center space-x-1.5 hover:scale-105 transition-all shadow-lg cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Product</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885]'
                  : 'bg-[#181818] text-gray-300 hover:text-white border border-[#D4AF37]/20 hover:border-[#D4AF37]/50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#141414] border border-[#D4AF37]/20 text-gray-400 text-xs italic space-y-3">
            <p>No products match your search query or category filter.</p>
            <button
              onClick={handleResetDefaultMenu}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-black font-bold text-xs inline-flex items-center space-x-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recreate Default Products Catalog</span>
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-xl flex flex-col justify-between relative group"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-3 bg-[#1A1A1A]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#F4D03F] text-[10px] font-bold uppercase tracking-wider">
                    {product.category}
                  </span>

                  <button
                    onClick={() => handleToggleFreshStatus(product.id)}
                    className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                      product.freshToday
                        ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40'
                        : 'bg-gray-900/90 text-gray-400 border-gray-700'
                    }`}
                  >
                    {product.freshToday ? 'Fresh Batch' : 'Standard'}
                  </button>
                </div>

                <h3 className="text-base font-bold text-white font-serif">{product.name}</h3>
                <p className="text-xs text-gray-400 line-clamp-2 mt-1">{product.description}</p>

                <div className="mt-3 pt-3 border-t border-gray-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase block">1 Kg Price</span>
                    <span className="text-base font-mono font-black text-[#F4D03F]">
                      ₹{product.pricePerKg}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-500 uppercase block">500g Price</span>
                    <span className="text-sm font-mono font-bold text-gray-300">
                      ₹{product.halfKgPrice}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between">
                <button
                  onClick={() => handleDuplicate(product)}
                  className="p-1.5 rounded-lg bg-gray-900 text-gray-400 hover:text-white border border-gray-800 cursor-pointer"
                  title="Duplicate / Recreate Delicacy"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleOpenEdit(product)}
                    className="px-3 py-1.5 rounded-lg bg-[#222222] hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-[#D4AF37]/30 text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="px-3 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-2xl max-w-lg w-full p-6 text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <h3 className="text-lg font-bold font-serif text-[#F4D03F]">
                {editingProduct ? 'Edit Delicacy' : 'Add New Delicacy'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg bg-gray-900 border border-gray-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Saffron Kaju Katli Supreme"
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Category</label>
                  <select
                    value={formData.category || 'Sweets'}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  >
                    {categories.filter((c) => c !== 'All').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">1 Kg Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="10"
                    value={formData.pricePerKg || ''}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      setFormData({ ...formData, pricePerKg: p, halfKgPrice: Math.round(p * 0.55) });
                    }}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Image URL *</label>
                <input
                  type="url"
                  required
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                />
                <div className="flex flex-wrap gap-1.5 mt-2">
                  <span className="text-[10px] text-gray-500 font-mono self-center">Quick Preset:</span>
                  {sampleImages.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: s.url })}
                      className="px-2 py-1 rounded bg-gray-900 border border-gray-800 text-[10px] text-gray-300 hover:text-white"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="freshCheck"
                  checked={formData.freshToday ?? true}
                  onChange={(e) => setFormData({ ...formData, freshToday: e.target.checked })}
                  className="accent-[#D4AF37] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="freshCheck" className="text-gray-300 font-medium cursor-pointer">Mark as Freshly Made Today</label>
              </div>

              <div className="pt-4 border-t border-gray-800 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#222] text-gray-300 hover:text-white font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold shadow-md cursor-pointer"
                >
                  {editingProduct ? 'Save Delicacy Changes' : 'Create New Delicacy'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

