import React from 'react';
import { Calendar, Phone, Check, X, Trash2, Clock, Users, Mail } from 'lucide-react';
import { apiService, BookingRecord } from '../../../lib/apiService';

interface BookingsTabProps {
  bookings: BookingRecord[];
  onRefresh: () => void;
}

export const BookingsTab: React.FC<BookingsTabProps> = ({ bookings, onRefresh }) => {
  const handleStatus = async (id: string, status: BookingRecord['status']) => {
    await apiService.updateBookingStatus(id, status);
    onRefresh();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <h3 className="text-base font-bold font-serif-luxury text-white">Table & Event Reservations</h3>
        <span className="text-xs font-mono text-[#F4D03F] font-bold">{bookings.length} Total Bookings</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3 border-b border-gray-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono text-[#D4AF37]">{b.bookingNumber}</span>
                  <h4 className="text-base font-bold font-serif-luxury text-white">{b.customerName}</h4>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                  b.status === 'Approved'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : b.status === 'Rejected'
                    ? 'bg-rose-950 text-rose-300 border border-rose-800'
                    : 'bg-amber-950 text-amber-300 border border-amber-800'
                }`}>
                  {b.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-gray-300 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#F4D03F]" />
                  <span>{b.bookingDate} at {b.bookingTime}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-sky-400" />
                  <span>{b.guestsCount} Guests ({b.eventType})</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <a href={`tel:${b.customerPhone}`} className="hover:underline text-emerald-400 font-bold">{b.customerPhone}</a>
                </div>
                {b.specialRequest && (
                  <p className="text-[11px] text-gray-400 bg-[#121212] p-2.5 rounded-xl border border-white/10 mt-2">
                    <span className="text-[#D4AF37] font-bold">Note: </span>
                    {b.specialRequest}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
              <a
                href={`tel:${b.customerPhone}`}
                className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold flex items-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </a>

              <div className="flex items-center space-x-1.5">
                <button
                  onClick={() => handleStatus(b.id, 'Approved')}
                  className="p-2 rounded-lg bg-emerald-950 text-emerald-400 hover:bg-emerald-900 cursor-pointer"
                  title="Approve Reservation"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleStatus(b.id, 'Rejected')}
                  className="p-2 rounded-lg bg-rose-950 text-rose-400 hover:bg-rose-900 cursor-pointer"
                  title="Reject Reservation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
