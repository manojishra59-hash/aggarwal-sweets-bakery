import React, { useState } from 'react';
import {
  Search,
  FileText,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  Phone,
  Mail,
  MapPin,
  ChevronDown,
} from 'lucide-react';
import { StaffOrder, OrderStatus } from '../types';
import { InvoiceModal } from '../InvoiceModal';

interface OrdersTabProps {
  orders: StaffOrder[];
  onUpdateStatus: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({ orders, onUpdateStatus }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<StaffOrder | null>(null);

  const statuses: (OrderStatus | 'All')[] = ['All', 'New', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-950/80 text-amber-300 border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
      case 'Preparing':
        return 'bg-blue-950/80 text-blue-300 border-blue-500/50';
      case 'Ready':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/50';
      case 'Delivered':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50';
      case 'Cancelled':
        return 'bg-red-950/80 text-red-300 border-red-500/50';
    }
  };

  const safeOrders = Array.isArray(orders) ? orders : [];
  const filteredOrders = safeOrders.filter((o) => {
    if (!o) return false;
    const matchesStatus = selectedStatus === 'All' || o.orderStatus === selectedStatus;
    const matchesQuery =
      (o.id && o.id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.customerName && o.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (o.customerPhone && o.customerPhone.includes(searchQuery));
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Search & Status Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#D4AF37] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search Order ID, Customer Name, Phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {statuses.map((st) => {
            const isActive = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold shadow-[0_0_12px_rgba(212,175,55,0.4)] border border-[#FFE885]'
                    : 'bg-[#1A1A1A] text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {st}
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#141414] border border-[#D4AF37]/20 text-gray-400 text-xs italic">
            No orders match the selected filter.
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-xl space-y-4"
            >
              {/* Top Row: Order ID, Time, Status Selector */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-lg bg-black border border-[#D4AF37]/50 text-[#F4D03F] font-mono font-bold text-xs">
                    {order.id}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-[#222] text-gray-300 border border-gray-700">
                    {order.paymentMethod} • <strong className="text-[#F4D03F]">{order.paymentStatus}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                  <span className="text-xs text-gray-400">Status:</span>
                  <div className="relative">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase tracking-wider border cursor-pointer focus:outline-none ${getStatusColor(
                        order.orderStatus
                      )}`}
                    >
                      <option value="New" className="bg-black text-amber-300">New Order</option>
                      <option value="Preparing" className="bg-black text-blue-300">Kitchen Prep</option>
                      <option value="Ready" className="bg-black text-purple-300">Ready for Pickup/Dispatch</option>
                      <option value="Delivered" className="bg-black text-emerald-300">Delivered</option>
                      <option value="Cancelled" className="bg-black text-red-300">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Middle Row: Items & Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {/* Items */}
                <div className="md:col-span-2 space-y-2 bg-[#1A1A1A] p-3.5 rounded-xl border border-gray-800">
                  <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wider block">
                    Order Delicacies ({order.items.length})
                  </span>
                  <div className="space-y-1.5">
                    {order.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-gray-200">
                        <span>
                          <strong className="text-white">{it.sweetName}</strong> × {it.quantityKg} kg
                        </span>
                        <span className="font-mono text-[#F4D03F] font-bold">₹{it.totalPrice}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Contact */}
                <div className="bg-[#1A1A1A] p-3.5 rounded-xl border border-gray-800 space-y-1.5 text-gray-300">
                  <div className="font-bold text-white text-sm">{order.customerName}</div>
                  <div className="flex items-center space-x-1.5 text-gray-400">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <a href={`tel:${order.customerPhone}`} className="hover:underline text-gray-200">
                      {order.customerPhone}
                    </a>
                  </div>
                  <div className="flex items-start space-x-1.5 text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{order.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Row: Total & Print Invoice Trigger */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <span className="text-[10px] uppercase text-gray-400 block">Total Amount</span>
                  <span className="text-lg font-mono font-black text-[#F4D03F]">
                    ₹{order.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedInvoiceOrder(order)}
                  className="px-4 py-2 rounded-xl bg-[#222222] hover:bg-gradient-to-r hover:from-[#D4AF37] hover:via-[#F4D03F] hover:to-[#D4AF37] hover:text-black text-[#F4D03F] border border-[#D4AF37]/40 text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-md"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View / Print Invoice</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={selectedInvoiceOrder}
        isOpen={Boolean(selectedInvoiceOrder)}
        onClose={() => setSelectedInvoiceOrder(null)}
      />
    </div>
  );
};
