import React, { useState } from 'react';
import { AlertTriangle, Plus, Minus, Save, CheckCircle2 } from 'lucide-react';
import { apiService, AdminProduct } from '../../../lib/apiService';

interface InventoryTabProps {
  products: AdminProduct[];
  onRefresh: () => void;
}

export const InventoryTab: React.FC<InventoryTabProps> = ({ products, onRefresh }) => {
  const [stockState, setStockState] = useState<{ [id: string]: number }>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: p.stockKg }), {})
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

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

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <div>
          <h3 className="text-base font-bold font-serif-luxury text-white">Halwai Kitchen Stock Register</h3>
          <p className="text-xs text-gray-400">Manage daily batch stock in kilograms (kg)</p>
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
  );
};
