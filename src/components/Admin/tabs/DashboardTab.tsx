import React from 'react';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  DollarSign,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Clock,
  PackageCheck,
} from 'lucide-react';
import { AdminOrder, InventoryItem, ActivityLog } from '../types';

interface DashboardTabProps {
  orders: AdminOrder[];
  inventory: InventoryItem[];
  logs: ActivityLog[];
  onNavigateTab: (tab: string) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  orders,
  inventory,
  logs,
  onNavigateTab,
}) => {
  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeInventory = Array.isArray(inventory) ? inventory : [];
  const safeLogs = Array.isArray(logs) ? logs : [];

  const todaySales = safeOrders
    .filter((o) => o && o.orderStatus !== 'Cancelled')
    .reduce((acc, curr) => acc + (Number(curr?.totalAmount) || 0), 0);

  const pendingOrdersCount = safeOrders.filter((o) => o && (o.orderStatus === 'New' || o.orderStatus === 'Preparing')).length;
  const totalCustomers = 342; // Aggregated
  const lowStockItems = safeInventory.filter((item) => item && Number(item.stockQuantity) <= Number(item.minThreshold));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#121212] to-[#221B0B] border border-[#D4AF37]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-[#F4D03F] font-semibold text-xs tracking-widest uppercase mb-1">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Aggarwal Sweets Executive Overview</span>
          </div>
          <h2 className="text-2xl font-black text-white font-serif tracking-wide">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1A8] to-[#D4AF37]">Admin Portal</span>
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Real-time analytics, order tracking & inventory control for Delhi’s premier sweet brand.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigateTab('orders')}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885] cursor-pointer hover:scale-105 transition-all"
          >
            Manage Orders ({pendingOrdersCount})
          </button>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today's Sales */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-lg group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Today's Revenue</span>
            <div className="p-2.5 rounded-xl bg-[#26200A] text-[#F4D03F] border border-[#D4AF37]/40">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              ₹{todaySales.toLocaleString('en-IN')}
            </div>
            <div className="flex items-center text-emerald-400 text-xs font-bold mt-1 space-x-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% vs yesterday</span>
            </div>
          </div>
        </div>

        {/* Card 2: Total Orders */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-lg group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Orders</span>
            <div className="p-2.5 rounded-xl bg-[#26200A] text-[#F4D03F] border border-[#D4AF37]/40">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              {safeOrders.length} <span className="text-xs font-normal text-gray-400">Orders Today</span>
            </div>
            <div className="flex items-center text-[#F4D03F] text-xs font-bold mt-1 space-x-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{pendingOrdersCount} require kitchen prep</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Customers */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-lg group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Customers</span>
            <div className="p-2.5 rounded-xl bg-[#26200A] text-[#F4D03F] border border-[#D4AF37]/40">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              {totalCustomers}
            </div>
            <div className="flex items-center text-emerald-400 text-xs font-bold mt-1 space-x-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+24 new repeat buyers</span>
            </div>
          </div>
        </div>

        {/* Card 4: Low Stock Alerts */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-lg group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Inventory Alerts</span>
            <div className={`p-2.5 rounded-xl ${lowStockItems.length > 0 ? 'bg-amber-950/80 text-amber-400 border border-amber-500/50 animate-pulse' : 'bg-[#26200A] text-[#F4D03F]'}`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white font-mono tracking-tight">
              {lowStockItems.length} <span className="text-xs font-normal text-amber-400">Items Low</span>
            </div>
            <button
              onClick={() => onNavigateTab('inventory')}
              className="text-xs text-[#F4D03F] font-bold hover:underline mt-1 block cursor-pointer"
            >
              View Inventory & Restock →
            </button>
          </div>
        </div>
      </div>

      {/* Main Section: Sales Chart & Low Stock Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Visualizer */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-serif">Revenue & Sales Analytics</h3>
              <p className="text-xs text-gray-400">Hourly sales trajectory for today's orders</p>
            </div>
            <div className="flex space-x-1 bg-[#1F1F1F] p-1 rounded-xl border border-[#D4AF37]/30">
              <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-[11px]">
                Today
              </button>
              <button className="px-3 py-1 rounded-lg text-gray-400 hover:text-white text-[11px] font-medium">
                This Week
              </button>
            </div>
          </div>

          {/* Simulated Golden Bar Graph Chart */}
          <div className="h-48 pt-6 flex items-end justify-between gap-2 border-b border-gray-800 pb-2 px-2">
            {[
              { time: '9 AM', amount: 3200, label: '3.2k' },
              { time: '11 AM', amount: 7800, label: '7.8k' },
              { time: '1 PM', amount: 14500, label: '14.5k' },
              { time: '3 PM', amount: 9200, label: '9.2k' },
              { time: '5 PM', amount: 18400, label: '18.4k' },
              { time: '7 PM', amount: 22100, label: '22.1k' },
              { time: '9 PM', amount: 16000, label: '16k' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                {/* Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition-all absolute -top-8 bg-[#000] border border-[#D4AF37] px-2 py-0.5 rounded text-[10px] font-mono text-[#F4D03F] whitespace-nowrap z-10">
                  ₹{bar.amount.toLocaleString()}
                </div>
                <div
                  style={{ height: `${(bar.amount / 25000) * 100}%` }}
                  className="w-full max-w-[32px] rounded-t-md bg-gradient-to-t from-[#8C6B1B] via-[#D4AF37] to-[#FFF1A8] group-hover:shadow-[0_0_12px_rgba(212,175,55,0.8)] transition-all"
                />
                <span className="text-[10px] text-gray-400 mt-2">{bar.time}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="bg-[#1A1A1A] p-3 rounded-xl border border-gray-800 text-center">
              <span className="text-[10px] uppercase text-gray-400 block">Peak Time</span>
              <span className="text-sm font-bold text-[#F4D03F]">7:00 PM - 9:00 PM</span>
            </div>
            <div className="bg-[#1A1A1A] p-3 rounded-xl border border-gray-800 text-center">
              <span className="text-[10px] uppercase text-gray-400 block">Avg Order Value</span>
              <span className="text-sm font-bold text-white">₹1,420</span>
            </div>
            <div className="bg-[#1A1A1A] p-3 rounded-xl border border-gray-800 text-center">
              <span className="text-[10px] uppercase text-gray-400 block">Most Popular</span>
              <span className="text-sm font-bold text-[#F4D03F]">Kaju Katli Special</span>
            </div>
          </div>
        </div>

        {/* Low Stock & Recent Activity Side Column */}
        <div className="space-y-6">
          {/* Low Stock Urgent Box */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span>Low Raw Material Alert</span>
              </h4>
              <button
                onClick={() => onNavigateTab('inventory')}
                className="text-[11px] text-[#F4D03F] hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            {lowStockItems.length === 0 ? (
              <p className="text-xs text-gray-400 italic">All raw materials stock levels are optimal.</p>
            ) : (
              <div className="space-y-2.5">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="p-3 rounded-xl bg-[#1A1810] border border-amber-500/30 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{item.name}</div>
                      <div className="text-[10px] text-gray-400">Supplier: {item.supplierName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-amber-400">
                        {item.stockQuantity} {item.unit}
                      </div>
                      <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 font-bold border border-amber-500/30">
                        Min: {item.minThreshold} {item.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Activity Stream */}
          <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center space-x-2 border-b border-gray-800 pb-2">
              <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
              <span>Recent Activity Feed</span>
            </h4>
            <div className="space-y-3">
              {safeLogs.slice(0, 4).map((log) => (
                <div key={log.id} className="flex items-start space-x-2 text-xs">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37] mt-1.5 shrink-0" />
                  <div>
                    <p className="text-gray-200">{log.action}</p>
                    <span className="text-[10px] text-gray-500 font-mono">{log.timestamp} • {log.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
