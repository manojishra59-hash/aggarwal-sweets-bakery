import React, { useState } from 'react';
import { Save, CheckCircle2, Store, Phone, Mail, MapPin, Clock, FileText } from 'lucide-react';
import { apiService, SettingsRecord } from '../../../lib/apiService';

interface SettingsTabProps {
  settings: SettingsRecord;
  onRefresh: () => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({ settings, onRefresh }) => {
  const [form, setForm] = useState<SettingsRecord>({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await apiService.saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    onRefresh();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <div>
          <h3 className="text-base font-bold font-serif-luxury text-white">Store Identity & Billing Settings</h3>
          <p className="text-xs text-gray-400">Configure phone, address, GSTIN and store opening schedule</p>
        </div>
        <button
          onClick={handleSave}
          className="btn-gold text-black px-5 py-2.5 rounded-xl text-xs font-black flex items-center space-x-2 cursor-pointer shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Store settings saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-[#181818] p-6 rounded-2xl border border-[#D4AF37]/30 shadow-lg space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-[#D4AF37] uppercase mb-1">Business Name</label>
            <input
              type="text"
              value={form.businessName}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              className="w-full bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <div>
            <label className="block font-bold text-[#D4AF37] uppercase mb-1">GSTIN Number</label>
            <input
              type="text"
              value={form.gstNumber}
              onChange={(e) => setForm({ ...form, gstNumber: e.target.value })}
              className="w-full bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-[#D4AF37] uppercase mb-1">Store Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
          <div>
            <label className="block font-bold text-[#D4AF37] uppercase mb-1">WhatsApp Hotline</label>
            <input
              type="text"
              value={form.whatsapp}
              onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
              className="w-full bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#D4AF37]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-[#D4AF37] uppercase mb-1">Flagship Store Address</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div>
          <label className="block font-bold text-[#D4AF37] uppercase mb-1">Store Opening Hours</label>
          <input
            type="text"
            value={form.openingHours}
            onChange={(e) => setForm({ ...form, openingHours: e.target.value })}
            className="w-full bg-[#121212] border border-[#D4AF37]/30 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </form>
    </div>
  );
};
