import React, { useState } from 'react';
import { Users, Search, Award, Phone, Mail, ShoppingBag, Star, Crown } from 'lucide-react';
import { CustomerCRM } from '../types';
import { INITIAL_CUSTOMERS } from '../mockStaffData';

export const CustomerCRMTab: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerCRM[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_customers');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_CUSTOMERS;
  });

  const [searchQuery, setSearchQuery] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search customer name, phone, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs text-[#F4D03F]">
          <Crown className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-bold">Total VIP Members: {customers.length}</span>
        </div>
      </div>

      {/* Customers Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#141414] border border-[#D4AF37]/20 text-gray-400 text-xs italic">
            No customer records found.
          </div>
        ) : (
          filtered.map((cust) => (
            <div
              key={cust.id}
              className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif">{cust.name}</h3>
                  <span className="text-[10px] text-gray-400 font-mono">{cust.id}</span>
                </div>

                <span
                  className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border shadow-md ${
                    cust.tier === 'Platinum'
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFF1A8] to-[#D4AF37] text-black border-[#FFE885]'
                      : 'bg-[#222] text-[#F4D03F] border-[#D4AF37]/40'
                  }`}
                >
                  {cust.tier} Member
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-gray-300 bg-[#1A1A1A] p-3 rounded-xl border border-gray-800">
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{cust.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="truncate">{cust.email}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-gray-800">
                <div className="bg-[#1A1A1A] p-2 rounded-lg border border-gray-800">
                  <span className="text-[9px] uppercase text-gray-500 block">Orders</span>
                  <span className="text-sm font-mono font-bold text-white">{cust.totalOrders}</span>
                </div>
                <div className="bg-[#1A1A1A] p-2 rounded-lg border border-gray-800">
                  <span className="text-[9px] uppercase text-gray-500 block">Total Spent</span>
                  <span className="text-sm font-mono font-bold text-[#F4D03F]">
                    ₹{cust.totalSpent.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-[#1A1A1A] p-2 rounded-lg border border-gray-800">
                  <span className="text-[9px] uppercase text-gray-500 block">Loyalty Pts</span>
                  <span className="text-sm font-mono font-bold text-amber-400">{cust.loyaltyPoints}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
