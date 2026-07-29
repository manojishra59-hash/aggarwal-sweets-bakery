import React from 'react';
import { BarChart3, TrendingUp, PieChart, Calendar, Download, Sparkles } from 'lucide-react';

export const AnalyticsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#F4D03F]" />
            <span>Executive Business Analytics & Financial Reports</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Comprehensive audit of product sales share, customer growth & campaign ROI</p>
        </div>

        <button
          onClick={() => alert('Exporting PDF audit report...')}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885] cursor-pointer hover:scale-105 transition-all flex items-center space-x-2"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit PDF</span>
        </button>
      </div>

      {/* Analytics Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category Performance Share */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-serif flex items-center space-x-2 border-b border-gray-800 pb-2">
            <PieChart className="w-4 h-4 text-[#D4AF37]" />
            <span>Category Revenue Share</span>
          </h3>

          <div className="space-y-3 text-xs">
            {[
              { cat: 'Sweets (Pure Desi Ghee)', pct: '58%', amount: '₹1,84,200', color: 'bg-[#D4AF37]' },
              { cat: 'Gift Hampers & Boxes', pct: '22%', amount: '₹70,000', color: 'bg-[#F4D03F]' },
              { cat: 'Namkeen & Savories', pct: '12%', amount: '₹38,200', color: 'bg-[#8C6B1B]' },
              { cat: 'Beverages & Bakery', pct: '8%', amount: '₹25,400', color: 'bg-amber-700' },
            ].map((item, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-gray-200">{item.cat}</span>
                  <span className="font-mono text-[#F4D03F]">{item.pct} ({item.amount})</span>
                </div>
                <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden">
                  <div className={`h-full ${item.color}`} style={{ width: item.pct }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Delicacies Leaderboard */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-serif flex items-center space-x-2 border-b border-gray-800 pb-2">
            <TrendingUp className="w-4 h-4 text-[#D4AF37]" />
            <span>Top Best-Selling Items</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            {[
              { rank: '#1', name: 'Kaju Katli Special', sold: '280 kg', rev: '₹3,08,000' },
              { rank: '#2', name: 'Motichoor Laddu (Desi Ghee)', sold: '210 kg', rev: '₹1,42,800' },
              { rank: '#3', name: 'Royal Sweets Hamper', sold: '64 boxes', rev: '₹2,24,000' },
              { rank: '#4', name: 'Pista Rasgulla', sold: '145 kg', rev: '₹75,400' },
            ].map((prod, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#1A1A1A] border border-gray-800 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-black border border-[#D4AF37]/40 text-[#F4D03F] text-[10px] font-mono font-bold flex items-center justify-center">
                    {prod.rank}
                  </span>
                  <div>
                    <span className="font-bold text-white block">{prod.name}</span>
                    <span className="text-[10px] text-gray-400">Sold: {prod.sold}</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#F4D03F]">{prod.rev}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Comparison */}
        <div className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white font-serif flex items-center space-x-2 border-b border-gray-800 pb-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>Monthly Growth Trajectory</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#1A1A1A] rounded-xl border border-gray-800">
              <span className="text-[10px] uppercase text-gray-500 block">July 2026 (Current)</span>
              <div className="text-xl font-mono font-black text-[#F4D03F] mt-0.5">₹12,48,000</div>
              <span className="text-[10px] text-emerald-400 font-bold">+24.5% vs June</span>
            </div>

            <div className="p-3 bg-[#1A1A1A] rounded-xl border border-gray-800">
              <span className="text-[10px] uppercase text-gray-500 block">June 2026</span>
              <div className="text-lg font-mono font-bold text-gray-300 mt-0.5">₹10,02,400</div>
            </div>

            <div className="p-3 bg-[#1A1A1A] rounded-xl border border-gray-800">
              <span className="text-[10px] uppercase text-gray-500 block">May 2026</span>
              <div className="text-lg font-mono font-bold text-gray-300 mt-0.5">₹9,45,000</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
