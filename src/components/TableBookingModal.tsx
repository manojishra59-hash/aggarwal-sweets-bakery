import React, { useState } from 'react';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles, Send } from 'lucide-react';
import { apiService } from '../lib/apiService';

interface TableBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TableBookingModal: React.FC<TableBookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    guestsCount: 2,
    bookingDate: new Date().toISOString().split('T')[0],
    bookingTime: '19:00',
    eventType: 'Table Reservation',
    specialRequest: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerPhone.trim()) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      await apiService.createBooking(formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 3000);
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full text-white p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#D4AF37] mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest font-sans">
            Royal Hospitality
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-white font-serif-luxury mb-1">
          Reserve Table & Tasting
        </h2>
        <p className="text-xs text-gray-400 font-sans mb-6">
          Book a private table or tasting session at our Rajouri Garden flagship shop.
        </p>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-16 h-16 text-[#F4D03F] mx-auto" />
            <h3 className="text-2xl font-bold font-serif-luxury text-white">Reservation Confirmed!</h3>
            <p className="text-xs text-gray-300 max-w-xs mx-auto">
              Our store manager will call you shortly to confirm your table arrangement.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 font-bold">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="block font-bold text-[#D4AF37] uppercase mb-1">Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vikram Sharma"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98100 00000"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Guests</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={formData.guestsCount}
                  onChange={(e) => setFormData({ ...formData, guestsCount: Number(e.target.value) })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Date</label>
                <input
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) => setFormData({ ...formData, bookingDate: e.target.value })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Time</label>
                <input
                  type="time"
                  value={formData.bookingTime}
                  onChange={(e) => setFormData({ ...formData, bookingTime: e.target.value })}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-[#D4AF37] uppercase mb-1">Booking Type</label>
              <select
                value={formData.eventType}
                onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="Table Reservation">Table Reservation (Dine-in)</option>
                <option value="Wedding Sweet Tasting">Wedding Sweet Tasting Session</option>
                <option value="Corporate Gifting Consultation">Corporate Gifting Consultation</option>
                <option value="Family Function Booking">Family Function Party</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-[#D4AF37] uppercase mb-1">Special Request</label>
              <textarea
                rows={2}
                placeholder="High chair, window seating, sugar-free tasting requirements..."
                value={formData.specialRequest}
                onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
                className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl btn-gold text-black font-extrabold uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>Confirm Reservation</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
