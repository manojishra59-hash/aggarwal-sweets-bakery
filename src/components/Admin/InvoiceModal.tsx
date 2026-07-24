import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';
import { OrderRecord, SettingsRecord } from '../../lib/apiService';

interface InvoiceModalProps {
  order: OrderRecord | null;
  settings: SettingsRecord;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ order, settings, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('printable-invoice');
    if (!element) return;
    
    // Trigger standard browser save to PDF via print window
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Invoice - ${order.orderNumber}</title>
            <style>
              body { font-family: system-ui, sans-serif; padding: 20px; color: #111; }
              .header { border-bottom: 2px solid #d4af37; padding-bottom: 15px; margin-bottom: 20px; }
              .title { font-size: 24px; font-weight: bold; color: #000; }
              .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
              .table th { background-color: #f9f9f9; }
              .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
            </style>
          </head>
          <body>
            ${element.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-2xl max-w-2xl w-full text-white p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Header Actions */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#F4D03F]" />
            <h3 className="text-lg font-bold font-serif-luxury text-white">Tax Invoice #{order.orderNumber}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-[#1D1D1D] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs font-bold text-white flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#F4D03F]" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 rounded-lg btn-gold text-xs font-black text-black flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-invoice" className="bg-white text-black p-8 rounded-xl shadow-inner font-sans">
          {/* Brand & Invoice Header */}
          <div className="flex justify-between items-start border-b-2 border-[#D4AF37] pb-6 mb-6">
            <div>
              <h1 className="text-2xl font-black text-black uppercase tracking-wider font-serif">{settings.businessName}</h1>
              <p className="text-xs text-gray-600 mt-1">{settings.tagline}</p>
              <p className="text-xs text-gray-500 max-w-xs mt-1">{settings.address}</p>
              <p className="text-xs text-gray-500 font-mono">GSTIN: {settings.gstNumber}</p>
              <p className="text-xs text-gray-500">Ph: {settings.phone}</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#8B6B11] text-xs font-black uppercase rounded mb-2">
                Official Tax Invoice
              </span>
              <p className="text-sm font-extrabold text-black">Invoice No: <span className="font-mono">{order.orderNumber}</span></p>
              <p className="text-xs text-gray-500">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p className="text-xs font-bold text-emerald-700 mt-1">Status: {order.status}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6 text-xs">
            <div>
              <span className="text-gray-400 font-bold uppercase block mb-1">Billed To:</span>
              <p className="font-extrabold text-sm text-black">{order.customerName}</p>
              <p className="text-gray-600">{order.customerPhone}</p>
              <p className="text-gray-600">{order.customerEmail || 'N/A'}</p>
            </div>
            <div>
              <span className="text-gray-400 font-bold uppercase block mb-1">Delivery Address:</span>
              <p className="text-gray-800 leading-relaxed">{order.deliveryAddress}</p>
              <p className="text-gray-500 mt-1">Payment Method: <span className="font-bold">{order.paymentMethod}</span></p>
            </div>
          </div>

          {/* Order Items Table */}
          <table className="w-full text-xs text-left mb-6 border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white font-bold uppercase text-[10px]">
                <th className="p-2.5 rounded-l">Item & Sweet Name</th>
                <th className="p-2.5 text-center">Qty (kg)</th>
                <th className="p-2.5 text-right">Rate / kg</th>
                <th className="p-2.5 text-right rounded-r">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-2.5 font-bold text-gray-900">{item.sweetName}</td>
                    <td className="p-2.5 text-center font-mono">{item.quantityKg} kg</td>
                    <td className="p-2.5 text-right font-mono">₹{item.unitPrice}</td>
                    <td className="p-2.5 text-right font-mono font-bold">₹{item.totalPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="p-2.5 font-bold text-gray-900">Custom Royal Sweet Selection</td>
                  <td className="p-2.5 text-center font-mono">1 Box</td>
                  <td className="p-2.5 text-right font-mono">₹{order.totalAmount}</td>
                  <td className="p-2.5 text-right font-mono font-bold">₹{order.totalAmount}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Calculation Breakdown */}
          <div className="flex justify-between items-end border-t-2 border-gray-900 pt-4">
            <div className="text-xs text-gray-500 max-w-xs">
              <p className="font-bold text-black mb-1">Terms & Conditions:</p>
              <p>• Goods once sold cannot be returned or exchanged.</p>
              <p>• Store fresh sweets in a cool, dry place or refrigerate.</p>
            </div>
            <div className="text-right space-y-1 text-xs">
              <div className="flex justify-between space-x-8 text-gray-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{order.totalAmount + (order.discountAmount || 0)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between space-x-8 text-emerald-600 font-bold">
                  <span>Discount ({order.couponCode || 'Promo'}):</span>
                  <span className="font-mono">-₹{order.discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between space-x-8 text-sm font-black text-black border-t border-gray-300 pt-1">
                <span>Grand Total:</span>
                <span className="font-mono text-base text-amber-700">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 text-center text-[10px] text-gray-400 uppercase tracking-widest">
            Thank you for celebrating sweetness with {settings.businessName}!
          </div>
        </div>
      </div>
    </div>
  );
};
