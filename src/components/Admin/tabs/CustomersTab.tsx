import React, { useState } from 'react';
import { Search, UserCheck, ShieldOff, Phone, Mail, ShoppingBag } from 'lucide-react';
import { CustomerRecord } from '../../../lib/apiService';

interface CustomersTabProps {
  customers: CustomerRecord[];
}

export const CustomersTab: React.FC<CustomersTabProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <div className="relative w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] w-full"
          />
        </div>
        <span className="text-xs font-mono text-[#F4D03F] font-bold">{customers.length} Registered Guests</span>
      </div>

      <div className="bg-[#181818] rounded-2xl border border-[#D4AF37]/30 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="text-[10px] font-bold uppercase text-gray-400 bg-[#121212] border-b border-gray-800">
              <tr>
                <th className="p-3.5">Customer Name</th>
                <th className="p-3.5">Phone & Email</th>
                <th className="p-3.5">Total Orders</th>
                <th className="p-3.5">Total Spent</th>
                <th className="p-3.5">Joined Date</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-3.5 font-bold text-white">{c.name}</td>
                  <td className="p-3.5">
                    <div className="text-gray-300 font-mono">{c.phone}</div>
                    <div className="text-[10px] text-gray-500">{c.email || 'N/A'}</div>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-sky-400">{c.totalOrders} Orders</td>
                  <td className="p-3.5 font-mono font-bold text-[#F4D03F]">₹{c.totalSpent}</td>
                  <td className="p-3.5 text-gray-400">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      Active Guest
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
