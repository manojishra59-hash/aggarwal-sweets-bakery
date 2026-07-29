import React, { useState } from 'react';
import { Calendar, Users, Clock, Check, X, Phone, Mail, Utensils } from 'lucide-react';
import { TableBooking } from '../types';
import { INITIAL_BOOKINGS } from '../mockStaffData';

export const TableBookingsTab: React.FC = () => {
  const [bookings, setBookings] = useState<TableBooking[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_bookings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_BOOKINGS;
  });

  const saveStorage = (updated: TableBooking[]) => {
    setBookings(updated);
    localStorage.setItem('aggarwal_admin_bookings', JSON.stringify(updated));
  };

  const handleUpdateStatus = (id: string, status: TableBooking['status'], tableNum?: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status, tableNumber: tableNum || b.tableNumber || 'T-01' } : b
    );
    saveStorage(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <Utensils className="w-5 h-5 text-[#F4D03F]" />
            <span>Table Reservations & Dining Requests</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage VIP dine-in reservations, tasting platers & family tables</p>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {bookings.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-[#141414] border border-[#D4AF37]/20 text-gray-400 text-xs italic">
            No table reservations recorded.
          </div>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-800 pb-3">
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-lg bg-black border border-[#D4AF37] text-[#F4D03F] font-mono font-bold text-xs">
                    {booking.id}
                  </span>
                  <span className="text-xs font-bold text-white flex items-center space-x-1">
                    <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{booking.guestCount} Guests</span>
                  </span>
                  <span className="text-xs text-gray-400 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{booking.bookingDate} at {booking.bookingTime}</span>
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-bold border uppercase ${
                      booking.status === 'Confirmed'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500'
                        : booking.status === 'Cancelled'
                        ? 'bg-red-950 text-red-300 border-red-500'
                        : 'bg-amber-950 text-amber-300 border-amber-500'
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#1A1A1A] p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <div className="text-sm font-bold text-white">{booking.customerName}</div>
                  <div className="text-gray-400 flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{booking.phone}</span>
                  </div>
                  <div className="text-gray-400 flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{booking.email}</span>
                  </div>
                </div>

                <div className="bg-[#1A1A1A] p-3.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] uppercase text-gray-500 font-bold">Special Requests</span>
                  <p className="text-gray-300 italic">{booking.specialRequests || 'No special requirements.'}</p>
                  {booking.tableNumber && (
                    <div className="text-xs font-bold text-[#F4D03F] mt-1">
                      Assigned Table: {booking.tableNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Accept / Reject Buttons */}
              {booking.status === 'Pending' && (
                <div className="flex justify-end space-x-2 pt-2">
                  <button
                    onClick={() => handleUpdateStatus(booking.id, 'Cancelled')}
                    className="px-4 py-1.5 rounded-xl bg-red-950/40 text-red-300 border border-red-500/30 text-xs font-bold flex items-center space-x-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(booking.id, 'Confirmed', 'Table T-05')}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-extrabold text-xs flex items-center space-x-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Accept & Assign Table</span>
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
