import React, { useState } from 'react';
import { Package, Plus, AlertTriangle, Phone, RefreshCw, Trash2 } from 'lucide-react';
import { InventoryItem } from '../types';
import { INITIAL_INVENTORY } from '../mockAdminData';

interface InventoryTabProps {
  inventory: InventoryItem[];
  onRestock: (id: string, amount: number) => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ inventory, onRestock }) => {
  const [items, setItems] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_inventory');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return inventory.length ? inventory : INITIAL_INVENTORY;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<InventoryItem>>({
    name: 'Almonds Badam Kernels',
    category: 'Dry Fruits',
    stockQuantity: 50,
    unit: 'kg',
    minThreshold: 20,
    unitPrice: 850,
    supplierName: 'Khari Baoli Wholesale Market, Delhi',
    supplierPhone: '+91 98111 55667',
  });

  const saveStorage = (updated: InventoryItem[]) => {
    setItems(updated);
    localStorage.setItem('aggarwal_admin_inventory', JSON.stringify(updated));
  };

  const handleRestockClick = (id: string) => {
    const qty = prompt('Enter restock quantity to add to current stock:', '50');
    if (qty && !isNaN(Number(qty))) {
      const added = Number(qty);
      const updated = items.map((it) =>
        it.id === id
          ? {
              ...it,
              stockQuantity: it.stockQuantity + added,
              lastRestocked: new Date().toISOString().split('T')[0],
            }
          : it
      );
      saveStorage(updated);
      onRestock(id, added);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newItem: InventoryItem = {
      id: `INV-${Date.now()}`,
      name: formData.name || 'Raw Material',
      category: (formData.category as any) || 'Dairy & Mawa',
      stockQuantity: Number(formData.stockQuantity) || 10,
      unit: (formData.unit as any) || 'kg',
      minThreshold: Number(formData.minThreshold) || 15,
      unitPrice: Number(formData.unitPrice) || 300,
      supplierName: formData.supplierName || 'Delhi Sweet Supply Co.',
      supplierPhone: formData.supplierPhone || '+91 98100 00000',
      lastRestocked: new Date().toISOString().split('T')[0],
    };

    saveStorage([newItem, ...items]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <Package className="w-5 h-5 text-[#F4D03F]" />
            <span>Raw Material Inventory & Supplier Control</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Track Desi Ghee, Khoya, Saffron, Dry Fruits & Box Packaging stocks</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885] cursor-pointer hover:scale-105 transition-all flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Raw Material</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item) => {
          const isLow = item.stockQuantity <= item.minThreshold;
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl bg-[#141414] border transition-all shadow-xl space-y-4 ${
                isLow ? 'border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-[#D4AF37]/30'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif">{item.name}</h3>
                  <span className="text-[10px] text-gray-400 font-mono">{item.category}</span>
                </div>

                {isLow ? (
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-500/50 text-[10px] font-extrabold uppercase animate-pulse flex items-center space-x-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Low Stock</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold uppercase">
                    In Stock
                  </span>
                )}
              </div>

              <div className="p-3 bg-[#1A1A1A] rounded-xl border border-gray-800 flex justify-between items-center font-mono">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 block font-sans">Current Quantity</span>
                  <span className={`text-xl font-bold ${isLow ? 'text-amber-400' : 'text-white'}`}>
                    {item.stockQuantity} {item.unit}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-gray-500 block font-sans">Min Limit</span>
                  <span className="text-xs font-bold text-gray-400">
                    {item.minThreshold} {item.unit}
                  </span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-gray-300">
                <div className="flex justify-between">
                  <span className="text-gray-500">Rate / Unit:</span>
                  <span className="font-mono text-[#F4D03F]">₹{item.unitPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Supplier:</span>
                  <span className="text-gray-200">{item.supplierName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Phone:</span>
                  <a href={`tel:${item.supplierPhone}`} className="text-[#D4AF37] hover:underline flex items-center space-x-1">
                    <Phone className="w-3 h-3" />
                    <span>{item.supplierPhone}</span>
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-800 flex justify-between items-center">
                <span className="text-[10px] text-gray-500 font-mono">Restocked: {item.lastRestocked}</span>
                <button
                  onClick={() => handleRestockClick(item.id)}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-extrabold text-xs flex items-center space-x-1 cursor-pointer hover:scale-105 transition-all shadow-md"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restock</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#F4D03F] font-serif border-b border-gray-800 pb-2">
              Add Raw Material
            </h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Material Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cardamom Seeds (Elaichi)"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Quantity</label>
                  <input
                    type="number"
                    value={formData.stockQuantity || 20}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Unit</label>
                  <select
                    value={formData.unit || 'kg'}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value as any })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  >
                    <option value="kg">kg</option>
                    <option value="L">L</option>
                    <option value="packets">packets</option>
                    <option value="boxes">boxes</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Min Threshold</label>
                  <input
                    type="number"
                    value={formData.minThreshold || 10}
                    onChange={(e) => setFormData({ ...formData, minThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-1">Unit Price (₹)</label>
                  <input
                    type="number"
                    value={formData.unitPrice || 250}
                    onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Supplier Name</label>
                <input
                  type="text"
                  value={formData.supplierName || ''}
                  onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                />
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
                  Add Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
