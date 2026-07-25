import React, { useState, useEffect } from 'react';
import { Building2, Plus, MapPin, Phone, User, TrendingUp, CheckCircle2, Edit2, ShieldCheck, DollarSign } from 'lucide-react';
import { apiService, BranchRecord } from '../../../lib/apiService';

export const BranchesTab: React.FC = () => {
  const [branches, setBranches] = useState<BranchRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Partial<BranchRecord> | null>(null);

  const loadBranches = async () => {
    setLoading(true);
    const bList = await apiService.getBranches();
    setBranches(bList);
    setLoading(false);
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const handleOpenNew = () => {
    setEditingBranch({
      name: '',
      address: '',
      phone: '+91 ',
      managerName: '',
      isActive: true,
      todaySales: 0,
    });
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBranch || !editingBranch.name) return;
    await apiService.saveBranch(editingBranch);
    setShowModal(false);
    setEditingBranch(null);
    loadBranches();
  };

  if (loading) {
    return <div className="p-8 text-center text-[#D4AF37]">Loading Multi-Branch Network...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-[#1A1A1A] via-[#121212] to-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center space-x-2 text-[#F4D03F] mb-1">
            <Building2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest font-sans">
              Multi-Branch Enterprise Network
            </span>
          </div>
          <h2 className="text-2xl font-bold font-serif-luxury text-white">
            Store Outlets & Franchises
          </h2>
          <p className="text-xs text-gray-400 font-sans mt-1">
            Manage separate store outlets, branch managers, branch-specific sales, and local inventories.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="btn-gold px-5 py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black flex items-center space-x-2 shadow-lg hover:scale-105 transition-transform cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Store Branch</span>
        </button>
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((br) => (
          <div
            key={br.id}
            className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-[#D4AF37] transition-all"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#F4D03F] uppercase tracking-widest bg-[#0A0A0A] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full inline-block mb-2">
                    {br.isActive ? 'Active Outlet' : 'Inactive'}
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif-luxury">
                    {br.name}
                  </h3>
                </div>

                <button
                  onClick={() => {
                    setEditingBranch(br);
                    setShowModal(true);
                  }}
                  className="p-2 rounded-lg bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2 mt-4 text-xs text-gray-300">
                <div className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 text-[#F4D03F] shrink-0 mt-0.5" />
                  <span>{br.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#F4D03F] shrink-0" />
                  <span>{br.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#F4D03F] shrink-0" />
                  <span>Manager: <strong className="text-white">{br.managerName}</strong></span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block uppercase tracking-wider">Today's Revenue</span>
                <span className="text-lg font-black text-[#F4D03F]">₹{br.todaySales.toLocaleString()}</span>
              </div>

              <div className="flex items-center space-x-1 text-emerald-400 text-xs font-bold bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-800">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+14.2%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Branch Modal */}
      {showModal && editingBranch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141414] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
            <h3 className="text-lg font-bold font-serif-luxury text-white border-b border-white/10 pb-2">
              {editingBranch.id ? 'Edit Store Outlet' : 'Add New Branch Outlet'}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Outlet Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Connaught Place Boutique Outlet"
                  value={editingBranch.name || ''}
                  onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Full Store Address
                </label>
                <textarea
                  rows={2}
                  value={editingBranch.address || ''}
                  onChange={(e) => setEditingBranch({ ...editingBranch, address: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Store Phone
                  </label>
                  <input
                    type="text"
                    value={editingBranch.phone || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, phone: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Manager In-Charge
                  </label>
                  <input
                    type="text"
                    value={editingBranch.managerName || ''}
                    onChange={(e) => setEditingBranch({ ...editingBranch, managerName: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold text-black"
                >
                  Save Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
