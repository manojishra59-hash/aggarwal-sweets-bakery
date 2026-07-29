import React, { useState } from 'react';
import { Package, AlertTriangle, Phone, RefreshCw, Plus, X } from 'lucide-react';
import { InventoryItem } from '../types';
import { INITIAL_INVENTORY } from '../mockStaffData';

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
    name: '',
    category: 'Dairy & Mawa',
    stockQuantity: 100,
    unit: 'kg',
    minThreshold: 20,
    unitPrice: 450,
    supplierName: 'Verka Dairy Farm',
    supplierPhone: '+91 98765 43210',
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
    if (!formData.name || !formData.stockQuantity) return;

    const newItem: InventoryItem = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      category: formData.category || 'Dairy & Mawa',
      stockQuantity: Number(formData.stockQuantity) || 0,
      unit: formData.unit || 'kg',
      minThreshold: Number(formData.minThreshold) || 10,
      unitPrice: Number(formData.unitPrice) || 100,
      supplierName: formData.supplierName || 'General Supplier',
      supplierPhone: formData.supplierPhone || '+91 98111 00000',
      lastRestocked: new Date().toISOString().split('T')[0],
    };

    saveStorage([newItem, ...items]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      category: 'Dairy & Mawa',
      stockQuantity: 100,
      unit: 'kg',
      minThreshold: 20,
      unitPrice: 450,
      supplierName: 'Verka Dairy Farm',
      supplierPhone: '+91 98765 43210',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <Package className="w-5 h-5 text-[#F4D03F]" />
            <span>Raw Material Inventory & Supplier Control</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Track Desi Ghee, Khoya, Saffron, Dry Fruits & Box Packaging stocks</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs flex items-center space-x-1.5 hover:scale-105 transition-all shadow-lg cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Raw Material</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#141414] border border-[#D4AF37]/20 text-gray-400 text-xs italic">
            No raw material inventory records found. Click "+ Add Raw Material" above to register materials.
          </div>
        ) : (
          items.map((item) => {
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
          })
        )}
      </div>

      {/* Modal Dialog */}
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
              <Package className="w-5 h-5 text-[#F4D03F]" />
              <span>Register Raw Material</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Pure Desi Ghee (Amul / Verka)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="Dairy & Mawa">Dairy & Mawa</option>
                    <option value="Dry Fruits">Dry Fruits</option>
                    <option value="Flour & Grains">Flour & Grains</option>
                    <option value="Spices & Flavors">Spices & Flavors</option>
                    <option value="Packaging">Box & Packaging</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Unit Type</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="kg">Kilograms (kg)</option>
                    <option value="L">Liters (L)</option>
                    <option value="boxes">Boxes</option>
                    <option value="grams">Grams (g)</option>
                    <option value="units">Units</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Initial Qty</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.stockQuantity}
                    onChange={(e) => setFormData({ ...formData, stockQuantity: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Min Threshold</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.minThreshold}
                    onChange={(e) => setFormData({ ...formData, minThreshold: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Rate/Unit (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Supplier Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Verka Traders"
                    value={formData.supplierName}
                    onChange={(e) => setFormData({ ...formData, supplierName: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Supplier Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 00000"
                    value={formData.supplierPhone}
                    onChange={(e) => setFormData({ ...formData, supplierPhone: e.target.value })}
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
                  Add Raw Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

