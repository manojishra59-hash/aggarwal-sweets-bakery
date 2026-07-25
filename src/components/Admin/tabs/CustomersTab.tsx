import React, { useState } from 'react';
import { Search, UserCheck, ShieldOff, Phone, Mail, ShoppingBag, Gift, Award, Send, Calendar, Star, Sparkles, Plus, Edit2 } from 'lucide-react';
import { CustomerRecord, BRAND_WHATSAPP } from '../../../lib/apiService';

interface CustomersTabProps {
  customers: CustomerRecord[];
}

export const CustomersTab: React.FC<CustomersTabProps> = ({ customers }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      (c.email && c.email.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSegment = selectedSegment === 'All' || c.segment === selectedSegment;
    return matchesSearch && matchesSegment;
  });

  const handleSendWhatsAppOffer = (c: CustomerRecord) => {
    const msg = encodeURIComponent(
      `Namaste ${c.name} ji! Greetings from Aggarwal Sweets. We have a special festive gift offer reserved for you. Visit us or order online at https://aggarwalsweets.com with code ROYAL100!`
    );
    const cleanPhone = c.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone || BRAND_WHATSAPP}?text=${msg}`, '_blank');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-xl text-[#F4D03F]">
            <Gift className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-serif-luxury text-white">Customer CRM & Loyalty Program</h3>
            <p className="text-xs text-gray-400">Manage VIP guests, birthdays, anniversaries, reward points & festive offers.</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, phone or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] w-full"
            />
          </div>

          <select
            value={selectedSegment}
            onChange={(e) => setSelectedSegment(e.target.value)}
            className="bg-[#121212] border border-[#D4AF37]/30 text-[#F4D03F] font-bold text-xs rounded-xl px-3 py-2 focus:outline-none"
          >
            <option value="All">All Segments</option>
            <option value="VIP Royal">VIP Royal</option>
            <option value="Regular">Regular</option>
            <option value="Festival Corporate">Festival Corporate</option>
          </select>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-[#181818] rounded-2xl border border-[#D4AF37]/30 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="text-[10px] font-bold uppercase text-gray-400 bg-[#121212] border-b border-gray-800">
              <tr>
                <th className="p-3.5">Guest Details</th>
                <th className="p-3.5">Segment & Tier</th>
                <th className="p-3.5">Birthdays / Anniversary</th>
                <th className="p-3.5">Loyalty Points</th>
                <th className="p-3.5">Spent / Orders</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map((c) => {
                const points = c.loyaltyPoints || Math.floor(c.totalSpent / 10);
                const isVIP = c.segment === 'VIP Royal' || c.totalSpent > 10000;

                return (
                  <tr key={c.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white text-sm">{c.name}</div>
                      <div className="text-gray-400 font-mono text-[11px]">{c.phone}</div>
                      {c.email && <div className="text-[10px] text-gray-500">{c.email}</div>}
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isVIP
                            ? 'bg-[#D4AF37]/20 text-[#F4D03F] border border-[#D4AF37]'
                            : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }`}
                      >
                        {c.segment || 'Regular'}
                      </span>
                    </td>

                    <td className="p-3.5 space-y-1">
                      {c.birthday ? (
                        <div className="flex items-center space-x-1 text-emerald-400 text-[11px]">
                          <Gift className="w-3 h-3 shrink-0" />
                          <span>Birthday: {c.birthday}</span>
                        </div>
                      ) : (
                        <span className="text-gray-600 text-[10px]">No Birthday Set</span>
                      )}

                      {c.anniversary && (
                        <div className="flex items-center space-x-1 text-[#F4D03F] text-[11px]">
                          <Sparkles className="w-3 h-3 shrink-0" />
                          <span>Anniversary: {c.anniversary}</span>
                        </div>
                      )}
                    </td>

                    <td className="p-3.5">
                      <div className="flex items-center space-x-1 text-[#F4D03F] font-bold">
                        <Award className="w-4 h-4" />
                        <span className="text-sm font-mono">{points} PTS</span>
                      </div>
                      <span className="text-[10px] text-gray-500">₹{points} discount balance</span>
                    </td>

                    <td className="p-3.5">
                      <div className="font-bold text-[#F4D03F]">₹{c.totalSpent.toLocaleString()}</div>
                      <div className="text-[10px] text-gray-400">{c.totalOrders} total orders</div>
                    </td>

                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleSendWhatsAppOffer(c)}
                        className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors border border-emerald-800 flex items-center space-x-1 ml-auto text-[11px] font-bold cursor-pointer"
                        title="Send Festive Offer via WhatsApp"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Festive WhatsApp</span>
                      </button>
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
