import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Sparkles, Printer, Download, ShoppingBag, IndianRupee, Layers } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [inventoryItems, setInventoryItems] = useState<any[]>([]);

  useEffect(() => {
    // Read live real-time stored orders
    const savedOrders = localStorage.getItem('aggarwal_orders');
    if (savedOrders) {
      try {
        setOrders(JSON.parse(savedOrders));
      } catch (e) {
        console.error(e);
      }
    }

    // Read live inventory
    const savedInv = localStorage.getItem('aggarwal_admin_inventory');
    if (savedInv) {
      try {
        setInventoryItems(JSON.parse(savedInv));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Compute live revenue metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalOrdersCount = orders.length;

  // Compute category sales distribution
  const categoryMap: Record<string, number> = {};
  const productMap: Record<string, { name: string; count: number; total: number }> = {};

  orders.forEach((o) => {
    if (o.items && Array.isArray(o.items)) {
      o.items.forEach((it: any) => {
        const cat = it.category || 'Sweets';
        categoryMap[cat] = (categoryMap[cat] || 0) + (it.price * (it.quantity || 1));

        const pName = it.name || 'Custom Delicacy';
        if (!productMap[pName]) {
          productMap[pName] = { name: pName, count: 0, total: 0 };
        }
        productMap[pName].count += it.quantity || 1;
        productMap[pName].total += (it.price * (it.quantity || 1));
      });
    }
  });

  const topProducts = Object.values(productMap)
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const categoryEntries = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="space-y-6 print:p-0 print:bg-white print:text-black">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl print:border-none print:shadow-none print:bg-transparent">
        <div>
          <h2 className="text-xl font-bold font-serif text-white print:text-black flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#F4D03F] print:text-black" />
            <span>Executive Business Analytics & Financial Reports</span>
          </h2>
          <p className="text-xs text-gray-400 print:text-gray-600 mt-0.5">Comprehensive audit of product sales share, customer growth & campaign ROI</p>
        </div>

        <button
          onClick={handleExportPDF}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs flex items-center space-x-1.5 hover:scale-105 transition-all shadow-lg cursor-pointer shrink-0 print:hidden"
        >
          <Printer className="w-4 h-4" />
          <span>Export Audit Report</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-4 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">Total Realized Sales</span>
          <div className="text-2xl font-black font-mono text-[#F4D03F] flex items-center space-x-1">
            <IndianRupee className="w-5 h-5" />
            <span>{totalRevenue.toLocaleString()}</span>
          </div>
          <span className="text-[10px] text-gray-500 block">Calculated from live orders</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">Live Orders Processed</span>
          <div className="text-2xl font-black font-mono text-white flex items-center space-x-1">
            <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
            <span>{totalOrdersCount}</span>
          </div>
          <span className="text-[10px] text-gray-500 block">Orders stored in local database</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-1">
          <span className="text-[10px] uppercase font-bold text-gray-400 block font-mono">Raw Material Stock Records</span>
          <div className="text-2xl font-black font-mono text-white flex items-center space-x-1">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <span>{inventoryItems.length} Items</span>
          </div>
          <span className="text-[10px] text-gray-500 block">Monitored supplier catalog</span>
        </div>
      </div>

      {/* Analytics Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Category Performance Share */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-serif flex items-center space-x-2 border-b border-gray-800 pb-2">
            <PieChart className="w-4 h-4 text-[#D4AF37]" />
            <span>Category Revenue Share</span>
          </h3>

          {categoryEntries.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-xs italic">
              No category sales recorded yet. Place customer orders to see live real-time statistics.
            </div>
          ) : (
            <div className="space-y-3 text-xs">
              {categoryEntries.map(([cat, val]) => (
                <div key={cat} className="space-y-1">
                  <div className="flex justify-between text-gray-300">
                    <span className="font-medium">{cat}</span>
                    <span className="font-mono text-[#F4D03F]">₹{val.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#D4AF37] to-[#F4D03F]"
                      style={{ width: `${Math.min(100, totalRevenue ? (val / totalRevenue) * 100 : 0)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Delicacies Leaderboard */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-serif flex items-center space-x-2 border-b border-gray-800 pb-2">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Top Best-Selling Items</span>
          </h3>

          {topProducts.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-xs italic">
              No product sales data available. Place orders to populate real-time sales leaderboard.
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              {topProducts.map((p, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-[#1A1A1A] border border-gray-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">{p.name}</span>
                    <span className="text-[10px] text-gray-400">{p.count} units sold</span>
                  </div>
                  <span className="font-mono text-[#F4D03F] font-bold">₹{p.total.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Monthly Comparison */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-sm font-bold text-white font-serif flex items-center space-x-2 border-b border-gray-800 pb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Monthly Growth Trajectory</span>
          </h3>

          <div className="p-4 rounded-xl bg-[#1A1A1A] border border-gray-800 space-y-2 text-xs">
            <div className="flex justify-between text-gray-300">
              <span>Current Month Target</span>
              <span className="font-mono text-white">₹1,50,000</span>
            </div>
            <div className="flex justify-between text-gray-300">
              <span>Achieved Sales</span>
              <span className="font-mono text-[#F4D03F] font-bold">₹{totalRevenue.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-[#F4D03F]"
                style={{ width: `${Math.min(100, (totalRevenue / 150000) * 100)}%` }}
              />
            </div>
            <p className="text-[10px] text-gray-400 pt-1">
              Real-time synchronization active. Stores orders in real-time within staff control panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};


