import React, { useEffect, useState } from 'react';
import { Mail, Phone, MessageSquare, Check, Trash2 } from 'lucide-react';
import { apiService, ContactRecord } from '../../../lib/apiService';

export const ContactsTab: React.FC = () => {
  const [contacts, setContacts] = useState<ContactRecord[]>([]);

  const loadContacts = async () => {
    const list = await apiService.getContactMessages();
    setContacts(list);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center bg-[#181818] p-4 rounded-2xl border border-[#D4AF37]/30">
        <h3 className="text-base font-bold font-serif-luxury text-white">Contact & Catering Inquiries</h3>
        <span className="text-xs font-mono text-[#F4D03F] font-bold">{contacts.length} Messages</span>
      </div>

      {contacts.length === 0 ? (
        <div className="py-12 text-center bg-[#181818] rounded-2xl border border-gray-800 p-8 text-gray-500">
          No customer inquiries received yet. Form submissions from website will appear here in realtime.
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.id} className="bg-[#181818] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md">
              <div className="flex justify-between items-start border-b border-gray-800 pb-3 mb-3">
                <div>
                  <h4 className="text-base font-bold font-serif-luxury text-white">{c.name}</h4>
                  <div className="flex items-center space-x-4 text-xs text-gray-400 mt-1">
                    <span className="flex items-center space-x-1">
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <a href={`tel:${c.phone}`} className="hover:underline text-emerald-400 font-bold">{c.phone}</a>
                    </span>
                    {c.email && (
                      <span className="flex items-center space-x-1">
                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                        <span>{c.email}</span>
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed bg-[#121212] p-3 rounded-xl border border-white/5">
                "{c.message}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
