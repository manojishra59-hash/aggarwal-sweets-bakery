import React from 'react';
import { Printer, Download, X, Check, Award } from 'lucide-react';
import { StaffOrder } from './types';
import { BRAND_NAME, BRAND_PHONE } from '../../data/sweetsData';

interface InvoiceModalProps {
  order: StaffOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const gstAmount = Math.round(order.totalAmount * 0.05);
  const subtotal = order.totalAmount - gstAmount;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-[#121212] border border-[#D4AF37]/50 rounded-2xl max-w-2xl w-full p-6 text-white shadow-2xl relative max-h-[90vh] overflow-y-auto font-sans">
        {/* Header Action Buttons */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30 print:hidden">
          <div className="flex items-center space-x-2 text-[#F4D03F] font-bold text-xs">
            <Award className="w-4 h-4" />
            <span>Tax Invoice / Cash Receipt</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs flex items-center space-x-1.5 shadow-md hover:scale-105 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-[#222222] text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-6 bg-white text-black rounded-xl mt-4 print:p-0 print:m-0 space-y-6">
          {/* Brand & Invoice Details */}
          <div className="flex justify-between items-start border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-xl font-black font-serif text-[#8C6B1B]">{BRAND_NAME}</h2>
              <p className="text-xs text-gray-600 mt-0.5">Authentic Royal Indian Sweets & Namkeen</p>
              <p className="text-xs text-gray-500">GSTIN: 07AAACG1234F1Z8 | FSSAI: 10019011000123</p>
              <p className="text-xs text-gray-500">Connaught Place & Model Town, New Delhi</p>
              <p className="text-xs text-gray-500">Phone: {BRAND_PHONE}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-[#8C6B1B] text-white font-mono text-xs font-bold rounded">
                INVOICE #{order.id}
              </span>
              <p className="text-xs text-gray-500 mt-2">Date: {new Date(order.createdAt).toLocaleDateString('en-IN')}</p>
              <p className="text-xs text-gray-500">Payment: <strong className="text-black">{order.paymentMethod} ({order.paymentStatus})</strong></p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-gray-50 p-3.5 rounded-lg border border-gray-200">
            <div>
              <span className="text-gray-500 block uppercase font-bold text-[10px]">Billed To:</span>
              <p className="font-bold text-gray-900 text-sm">{order.customerName}</p>
              <p className="text-gray-600">{order.customerPhone}</p>
              <p className="text-gray-600">{order.customerEmail}</p>
            </div>
            <div>
              <span className="text-gray-500 block uppercase font-bold text-[10px]">Delivery Address:</span>
              <p className="text-gray-800">{order.deliveryAddress}</p>
              {order.notes && <p className="text-amber-800 italic mt-1 font-semibold">Note: {order.notes}</p>}
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#1A1A1A] text-white font-serif uppercase tracking-wider">
                <th className="p-2.5 rounded-l">Item Description</th>
                <th className="p-2.5 text-center">Qty (Kg)</th>
                <th className="p-2.5 text-right">Rate / Kg</th>
                <th className="p-2.5 text-right rounded-r">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-2.5 font-bold text-gray-900">{item.sweetName}</td>
                  <td className="p-2.5 text-center font-mono">{item.quantityKg} kg</td>
                  <td className="p-2.5 text-right font-mono">₹{item.pricePerKg}</td>
                  <td className="p-2.5 text-right font-mono font-bold">₹{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pricing Breakdown */}
          <div className="flex justify-between items-end border-t border-gray-300 pt-4 text-xs">
            <div className="text-gray-500 text-[11px] max-w-xs">
              <p>Thank you for celebrating with Aggarwal Sweets!</p>
              <p className="font-semibold text-gray-700 mt-1">Authentic Ghee • Fresh Daily Batch</p>
            </div>
            <div className="w-56 space-y-1.5 text-right">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>GST (5% Included):</span>
                <span className="font-mono">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Express Delivery:</span>
                <span className="font-mono text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-black border-t-2 border-black pt-2">
                <span>Grand Total:</span>
                <span className="font-mono text-[#8C6B1B]">₹{order.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
