import React, { useState, useEffect } from 'react';
import { AlertTriangle, Plus, Minus, Save, CheckCircle2, Boxes, ShoppingCart, Truck, Factory, DollarSign, Calendar } from 'lucide-react';
import { apiService, AdminProduct, RawMaterialRecord, SupplierRecord, PurchaseRecord } from '../../../lib/apiService';

interface InventoryTabProps {
  products: AdminProduct[];
  onRefresh: () => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ products, onRefresh }) => {
  const [activeSubTab, setActiveSubTab] = useState<'sweets' | 'raw_materials' | 'suppliers'>('sweets');
  const [stockState, setStockState] = useState<{ [id: string]: number }>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: p.stockKg }), {})
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Raw Materials & Suppliers state
  const [rawMaterials, setRawMaterials] = useState<RawMaterialRecord[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierRecord[]>([]);
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [newPurchase, setNewPurchase] = useState({
    materialName: 'Pure A2 Organic Cow Ghee',
    supplierName: 'Organic Bilona Farms Co.',
    quantity: 25,
    unit: 'kg',
    totalCost: 19500,
  });

  const loadRawData = async () => {
    const [mats, sups, purs] = await Promise.all([
      apiService.getRawMaterials(),
      apiService.getSuppliers(),
      apiService.getPurchases(),
    ]);
    setRawMaterials(mats);
    setSuppliers(sups);
    setPurchases(purs);
  };

  useEffect(() => {
    loadRawData();
  }, []);

  const handleStockChange = (id: string, delta: number) => {
    setStockState((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] ?? 50) + delta),
    }));
  };

  const handleBatchSave = async () => {
    for (const p of products) {
      if (stockState[p.id] !== undefined && stockState[p.id] !== p.stockKg) {
        await apiService.saveProduct({ ...p, stockKg: stockState[p.id] });
      }
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
    onRefresh();
  };

  const handleAddPurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiService.addPurchase(newPurchase);
    setShowPurchaseModal(false);
    loadRawData();
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Subtab Bar */}
      <div className="flex items-center space-x-3 border-b border-[#D4AF37]/20 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('sweets')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
            activeSubTab === 'sweets'
              ? 'btn-gold text-black shadow-lg'
              : 'bg-[#121212] border border-white/10 text-gray-300 hover:border-[#D4AF37]/50'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>Finished Sweets Stock</span>
        </button>

        <button
          onClick={() => setActiveSubTab('raw_materials')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
            activeSubTab === 'raw_materials'
              ? 'btn-gold text-black shadow-lg'
              : 'bg-[#121212] border border-white/10 text-gray-300 hover:border-[#D4AF37]/50'
          }`}
        >
          <Factory className="w-4 h-4" />
          <span>Raw Materials (Milk, Ghee, Sugar)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('suppliers')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
            activeSubTab === 'suppliers'
              ? 'btn-gold text-black shadow-lg'
              : 'bg-[#121212] border border-white/10 text-gray-300 hover:border-[#D4AF37]/50'
          }`}
        >
          <Truck className="w-4 h-4" />
          <span>Suppliers & Purchases</span>
        </button>
      </div>

      {/* FINISHED SWEETS TAB */}
      {activeSubTab === 'sweets' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
            <div>
              <h3 className="text-base font-bold font-serif-luxury text-white">Halwai Kitchen Finished Batch Register</h3>
              <p className="text-xs text-gray-400">Manage daily batch stock levels in kilograms (kg)</p>
            </div>
            <button
              onClick={handleBatchSave}
              className="btn-gold text-black px-5 py-2.5 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save All Stocks</span>
            </button>
          </div>

          {savedSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Inventory stock levels updated successfully!</span>
            </div>
          )}

          <div className="bg-[#181818] rounded-2xl border border-[#D4AF37]/30 shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-gray-300">
                <thead className="text-[10px] font-bold uppercase text-gray-400 bg-[#121212] border-b border-gray-800">
                  <tr>
                    <th className="p-3.5">Sweet Item</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Rate / kg</th>
                    <th className="p-3.5 text-center">Batch Stock (kg)</th>
                    <th className="p-3.5 text-right">Stock Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {products.map((p) => {
                    const currentStock = stockState[p.id] ?? p.stockKg;
                    const isLow = currentStock <= 10;
                    const isOut = currentStock === 0;

                    return (
                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-bold text-white flex items-center space-x-2.5">
                          <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover border border-[#D4AF37]/30" />
                          <span>{p.name}</span>
                        </td>
                        <td className="p-3.5 text-gray-400">{p.category}</td>
                        <td className="p-3.5 font-mono text-[#F4D03F]">₹{p.pricePerKg}</td>
                        <td className="p-3.5 text-center">
                          <div className="inline-flex items-center space-x-2 bg-[#121212] border border-[#D4AF37]/30 rounded-xl p-1">
                            <button
                              onClick={() => handleStockChange(p.id, -5)}
                              className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <input
                              type="number"
                              value={currentStock}
                              onChange={(e) =>
                                setStockState({ ...stockState, [p.id]: Math.max(0, Number(e.target.value)) })
                              }
                              className="w-16 text-center font-mono font-bold text-white bg-transparent focus:outline-none"
                            />
                            <button
                              onClick={() => handleStockChange(p.id, 5)}
                              className="px-2 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </td>
                        <td className="p-3.5 text-right">
                          <span
                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                              isOut
                                ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                : isLow
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            }`}
                          >
                            {isOut ? 'OUT OF STOCK' : isLow ? 'LOW STOCK (<10kg)' : 'HEALTHY'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RAW MATERIALS TAB */}
      {activeSubTab === 'raw_materials' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
            <div>
              <h3 className="text-base font-bold font-serif-luxury text-white">Raw Ingredient Inventory Tracker</h3>
              <p className="text-xs text-gray-400">Track A2 Ghee, Organic Milk, Khoya, Cashews, Saffron & Gold Packaging Boxes.</p>
            </div>
            <button
              onClick={() => setShowPurchaseModal(true)}
              className="btn-gold text-black px-4 py-2.5 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer shadow-lg"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Record New Purchase Entry</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rawMaterials.map((mat) => {
              const isLow = mat.currentStock <= mat.minThreshold;
              return (
                <div
                  key={mat.id}
                  className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#F4D03F] uppercase tracking-wider bg-[#0A0A0A] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                        {mat.category}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5 font-serif-luxury">
                        {mat.name}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        isLow
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      }`}
                    >
                      {isLow ? 'LOW STOCK ALERT' : 'SUFFICIENT'}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-300">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current Stock:</span>
                      <strong className="text-white text-sm">{mat.currentStock} {mat.unit}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min Threshold:</span>
                      <span>{mat.minThreshold} {mat.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Supplier:</span>
                      <span className="text-[#F4D03F]">{mat.supplierName}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 text-[11px] text-gray-500 flex justify-between">
                    <span>Rate: ₹{mat.costPerUnit}/{mat.unit}</span>
                    <span>Restocked: {mat.lastRestocked}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUPPLIERS & PURCHASES TAB */}
      {activeSubTab === 'suppliers' && (
        <div className="space-y-6">
          <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold font-serif-luxury text-white border-b border-white/10 pb-3">
              Approved Wholesale Raw Material Suppliers
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {suppliers.map((sup) => (
                <div key={sup.id} className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 text-xs">
                  <h4 className="font-bold text-white text-sm">{sup.name}</h4>
                  <p className="text-gray-400">Contact: {sup.contactPerson} ({sup.phone})</p>
                  <p className="text-gray-400">Items: {sup.itemsSupplied.join(', ')}</p>
                  <p className="text-[#F4D03F] font-bold">Total Purchases: ₹{sup.totalPurchaseAmount.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold font-serif-luxury text-white border-b border-white/10 pb-3">
              Purchase Order History
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#0A0A0A] text-[#D4AF37] uppercase tracking-wider">
                  <tr>
                    <th className="p-3">Date</th>
                    <th className="p-3">Invoice Ref</th>
                    <th className="p-3">Raw Material</th>
                    <th className="p-3">Supplier</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3 text-right">Total Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {purchases.map((pur) => (
                    <tr key={pur.id} className="hover:bg-white/5 text-gray-300">
                      <td className="p-3 font-mono">{pur.createdAt}</td>
                      <td className="p-3 text-[#F4D03F] font-bold">{pur.invoiceRef}</td>
                      <td className="p-3 font-bold text-white">{pur.materialName}</td>
                      <td className="p-3">{pur.supplierName}</td>
                      <td className="p-3">{pur.quantity} {pur.unit}</td>
                      <td className="p-3 text-right font-bold text-[#F4D03F]">₹{pur.totalCost.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* New Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141414] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
            <h3 className="text-lg font-bold font-serif-luxury text-white border-b border-white/10 pb-2">
              Record Ingredient Purchase
            </h3>

            <form onSubmit={handleAddPurchase} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Raw Material</label>
                <select
                  value={newPurchase.materialName}
                  onChange={(e) => setNewPurchase({ ...newPurchase, materialName: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {rawMaterials.map((m) => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Supplier</label>
                <select
                  value={newPurchase.supplierName}
                  onChange={(e) => setNewPurchase({ ...newPurchase, supplierName: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Quantity</label>
                  <input
                    type="number"
                    value={newPurchase.quantity}
                    onChange={(e) => setNewPurchase({ ...newPurchase, quantity: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Total Cost (₹)</label>
                  <input
                    type="number"
                    value={newPurchase.totalCost}
                    onChange={(e) => setNewPurchase({ ...newPurchase, totalCost: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPurchaseModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold text-black"
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
