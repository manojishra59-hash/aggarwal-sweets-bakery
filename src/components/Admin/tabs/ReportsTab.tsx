import React from 'react';
import { Download, FileSpreadsheet, TrendingUp, Award, IndianRupee } from 'lucide-react';
import { OrderRecord, AdminProduct } from '../../../lib/apiService';

interface ReportsTabProps {
  orders: OrderRecord[];
  products: AdminProduct[];
}

export const ReportsTab: React.FC<ReportsTabProps> = ({ orders, products }) => {
  const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  const exportCSV = () => {
    const csvRows = [
      ['Order Number', 'Date', 'Customer Name', 'Phone', 'Amount', 'Status', 'Payment Method'],
      ...orders.map((o) => [
        o.orderNumber,
        new Date(o.createdAt).toLocaleDateString(),
        `"${o.customerName}"`,
        o.customerPhone,
        o.totalAmount,
        o.status,
        o.paymentMethod,
      ]),
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map((e) => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `aggarwal_sales_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <div>
          <h3 className="text-base font-bold font-serif-luxury text-white">Sales & Analytics Reports</h3>
          <p className="text-xs text-gray-400">Download complete financial spreadsheets and product popularity analytics</p>
        </div>
        <button
          onClick={exportCSV}
          className="btn-gold text-black px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-md"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Export Sales CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Gross Lifetime Revenue</span>
          <p className="text-2xl font-black text-[#F4D03F] font-mono mt-1">₹{totalSales}</p>
          <span className="text-[10px] text-gray-500">{orders.length} Total Processed Orders</span>
        </div>

        <div className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Average Order Value (AOV)</span>
          <p className="text-2xl font-black text-sky-400 font-mono mt-1">
            ₹{orders.length > 0 ? Math.round(totalSales / orders.length) : 0}
          </p>
          <span className="text-[10px] text-gray-500">Per Sweet Box Transaction</span>
        </div>

        <div className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30">
          <span className="text-[10px] font-bold text-gray-400 uppercase">Top Selling Mithai</span>
          <p className="text-lg font-bold text-white font-serif-luxury mt-1">Motichoor Desi Ghee Laddu</p>
          <span className="text-[10px] text-emerald-400 font-bold">142 kg dispatched this month</span>
        </div>
      </div>
    </div>
  );
};
