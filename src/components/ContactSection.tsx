import React, { useState } from 'react';
import { Send, Phone, MessageSquare, CheckCircle2, Loader2 } from 'lucide-react';
import { BRAND_PHONE, BRAND_WHATSAPP } from '../data/sweetsData';
import { apiService } from '../lib/apiService';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid phone number');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      await apiService.submitContactMessage({
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      });
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
      setTimeout(() => setIsSuccess(false), 4000);
    } catch {
      setIsSubmitting(false);
      setErrorMsg('Failed to submit message. Please try again.');
    }
  };


  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#111111] relative border-t border-[#D4AF37]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em] bg-[#161616] px-4 py-1.5 rounded-full border border-[#D4AF37]/30 inline-block shadow-sm">
              Royal Concierge
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-serif-luxury tracking-tight leading-tight">
              Get In Touch With <br />
              <span className="text-gold-gradient">Aggarwal Sweets</span>
            </h2>
            <p className="text-sm sm:text-base text-[#D9D9D9]/80 leading-relaxed font-sans">
              Have inquiries regarding wedding sweet counters, bespoke silver foil trunks, bulk corporate gifting, or custom box arrangements? Our royal concierge team is at your service.
            </p>

            {/* Quick Contact Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={`https://wa.me/${BRAND_WHATSAPP}?text=Hello%20Aggarwal%20Sweets,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1eb855] text-black font-extrabold text-xs tracking-wider uppercase shadow-lg transition-all flex items-center justify-center space-x-2.5"
              >
                <MessageSquare className="w-5 h-5 fill-current" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href={`tel:${BRAND_PHONE}`}
                className="px-6 py-3.5 rounded-xl bg-[#1D1D1D] border border-[#D4AF37]/40 hover:border-[#D4AF37] text-white font-bold text-xs tracking-wider uppercase shadow-lg transition-all flex items-center justify-center space-x-2.5"
              >
                <Phone className="w-5 h-5 text-[#F4D03F]" />
                <span>Call Directly</span>
              </a>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#141414] rounded-2xl p-6 sm:p-10 shadow-2xl border border-[#D4AF37]/30 relative">
              {isSuccess ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <CheckCircle2 className="w-16 h-16 text-[#F4D03F] mx-auto" />
                  <h3 className="text-2xl font-bold font-serif-luxury text-white">
                    Inquiry Received!
                  </h3>
                  <p className="text-sm text-[#D9D9D9]/80 max-w-sm mx-auto font-sans">
                    Thank you for reaching out to Aggarwal Sweets & Bakery. Our concierge team will call you back shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-2xl font-bold font-serif-luxury text-white">
                      Send Us A Message
                    </h3>
                    <p className="text-xs text-[#A3A3A3] font-sans">
                      Fill out the form below and we will respond within 30 minutes.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Vikram Sharma"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                      Message / Requirement
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Specify your sweet box requirements, wedding date, or custom request..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/30 rounded-xl px-4 py-3 text-sm text-white placeholder-[#666] focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl btn-gold text-xs font-black uppercase tracking-widest shadow-xl flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-[#0A0A0A]" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#0A0A0A]" />
                        <span>Submit Royal Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

