import React, { useState } from 'react';
import { Search, Filter, Printer, Eye, CheckCircle2, Clock, Truck, XCircle, AlertCircle, Plus, Send, ShoppingCart } from 'lucide-react';
import { apiService, OrderRecord, SettingsRecord, BRAND_WHATSAPP } from '../../../lib/apiService';
import { InvoiceModal } from '../InvoiceModal';

interface OrdersTabProps {
  orders: OrderRecord[];
  settings: SettingsRecord;
  onRefresh: () => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  settings,
  onRefresh,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<OrderRecord | null>(null);

  const [showPOSModal, setShowPOSModal] = useState(false);
  const [posCustomerName, setPosCustomerName] = useState('');
  const [posCustomerPhone, setPosCustomerPhone] = useState('');
  const [posItemName, setPosItemName] = useState('Kaju Katli');
  const [posItemQty, setPosItemQty] = useState(1);
  const [posItemPrice, setPosItemPrice] = useState(980);
  const [posPaymentMethod, setPosPaymentMethod] = useState('UPI / Cash');

  const filteredOrders = orders.filter((o) => {
    const query = searchTerm.toLowerCase();
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(query) ||
      o.customerName.toLowerCase().includes(query) ||
      o.customerPhone.toLowerCase().includes(query);
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (orderId: string, newStatus: OrderRecord['status']) => {
    await apiService.updateOrderStatus(orderId, newStatus);
    onRefresh();
  };

  const handleCreatePOSOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!posCustomerName) return;

    await apiService.createOrder({
      customerName: posCustomerName,
      customerPhone: posCustomerPhone || '+91 98100 00000',
      deliveryAddress: 'In-Store Counter Pickup (POS)',
      paymentMethod: posPaymentMethod,
      totalAmount: posItemQty * posItemPrice,
      discountAmount: 0,
      items: [
        {
          sweetId: `pos-${Date.now()}`,
          sweetName: posItemName,
          quantityKg: posItemQty,
          unitPrice: posItemPrice,
          totalPrice: posItemQty * posItemPrice,
        },
      ],
    });

    setShowPOSModal(false);
    setPosCustomerName('');
    setPosCustomerPhone('');
    onRefresh();
  };

  const handleWhatsAppNotify = (order: OrderRecord) => {
    const cleanPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const text = encodeURIComponent(
      `Namaste ${order.customerName} ji! Your Aggarwal Sweets Order #${order.orderNumber} (₹${order.totalAmount}) status is now: ${order.status.toUpperCase()}. Thank you for choosing Aggarwal Sweets!`
    );
    window.open(`https://wa.me/${cleanPhone || BRAND_WHATSAPP}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Search & Filter bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search Order ID, Name or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] w-full"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          >
            <option value="All">All Statuses ({orders.length})</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Packaging">Packaging</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button
          onClick={() => setShowPOSModal(true)}
          className="btn-gold px-4 py-2 rounded-xl text-xs font-extrabold uppercase text-black flex items-center space-x-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New POS Order</span>
        </button>
      </div>

      {/* Orders Table */}
      <div className="bg-[#181818] rounded-2xl border border-[#D4AF37]/30 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-300">
            <thead className="text-[10px] font-bold uppercase text-gray-400 bg-[#121212] border-b border-gray-800">
              <tr>
                <th className="p-3.5">Order No</th>
                <th className="p-3.5">Customer</th>
                <th className="p-3.5">Phone & Address</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Status Pipeline</th>
                <th className="p-3.5">Payment</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-500">
                    No orders matching criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-white">{o.orderNumber}</td>
                    <td className="p-3.5 font-bold text-white">{o.customerName}</td>
                    <td className="p-3.5">
                      <div className="text-gray-300">{o.customerPhone}</div>
                      <div className="text-[10px] text-gray-500 line-clamp-1">{o.deliveryAddress}</div>
                    </td>
                    <td className="p-3.5 font-mono font-extrabold text-[#F4D03F]">₹{o.totalAmount}</td>
                    <td className="p-3.5">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o.id, e.target.value as OrderRecord['status'])}
                        className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                          o.status === 'Delivered'
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : o.status === 'Cancelled'
                            ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                            : 'bg-amber-950/80 text-amber-300 border-amber-800'
                        }`}
                      >
                        <option value="Pending">New / Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Packaging">Packaging</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3.5 text-[11px] text-gray-400 font-medium">{o.paymentMethod}</td>
                    <td className="p-3.5 text-right space-x-1.5">
                      <button
                        onClick={() => handleWhatsAppNotify(o)}
                        className="p-2 rounded-lg bg-emerald-950/80 hover:bg-emerald-600 text-emerald-300 hover:text-white transition-colors border border-emerald-800 inline-flex items-center"
                        title="Send WhatsApp Order Update"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => setSelectedInvoiceOrder(o)}
                        className="px-3 py-1.5 rounded-lg bg-[#121212] border border-[#D4AF37]/40 text-[#F4D03F] hover:bg-[#F4D03F] hover:text-black font-bold text-xs transition-colors cursor-pointer inline-flex items-center space-x-1"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Invoice</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* POS Quick Order Modal */}
      {showPOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141414] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
            <h3 className="text-lg font-bold font-serif-luxury text-white border-b border-white/10 pb-2">
              In-Store Counter POS Entry
            </h3>

            <form onSubmit={handleCreatePOSOrder} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={posCustomerName}
                  onChange={(e) => setPosCustomerName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Phone Number</label>
                <input
                  type="text"
                  value={posCustomerPhone}
                  onChange={(e) => setPosCustomerPhone(e.target.value)}
                  placeholder="+91 98100 00000"
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Sweet Item Selected</label>
                <input
                  type="text"
                  value={posItemName}
                  onChange={(e) => setPosItemName(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Quantity (kg)</label>
                  <input
                    type="number"
                    step="0.25"
                    value={posItemQty}
                    onChange={(e) => setPosItemQty(Number(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#D4AF37] uppercase block mb-1">Price per kg (₹)</label>
                  <input
                    type="number"
                    value={posItemPrice}
                    onChange={(e) => setPosItemPrice(Number(e.target.value))}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 font-bold text-sm">
                <span>Total Amount:</span>
                <span className="text-[#F4D03F]">₹{(posItemQty * posItemPrice).toLocaleString()}</span>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPOSModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold text-black"
                >
                  Generate POS Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoiceOrder && (
        <InvoiceModal
          order={selectedInvoiceOrder}
          settings={settings}
          onClose={() => setSelectedInvoiceOrder(null)}
        />
      )}
    </div>
  );
};
