import React, { useState } from 'react';
import { ShieldCheck, Trash2, Phone, Mail, Plus, X, UserPlus } from 'lucide-react';
import { StaffMember } from '../types';
import { INITIAL_STAFF } from '../mockStaffData';

export const StaffTab: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('aggarwal_staff_members') || localStorage.getItem('aggarwal_admin_staff');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return INITIAL_STAFF;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: '',
    email: '',
    phone: '',
    role: 'Staff',
    department: 'Billing',
    permissions: ['Billing', 'Order Status Update'],
  });

  const saveStorage = (updated: StaffMember[]) => {
    setStaffList(updated);
    localStorage.setItem('aggarwal_staff_members', JSON.stringify(updated));
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Remove staff member from system access?')) {
      const updated = staffList.filter((s) => s.id !== id);
      saveStorage(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newStaff: StaffMember = {
      id: `STF-${Date.now().toString().slice(-4)}`,
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '+91 98111 00000',
      role: (formData.role as 'Owner' | 'Manager' | 'Staff') || 'Staff',
      department: formData.department || 'Billing',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      permissions: formData.permissions && formData.permissions.length > 0
        ? formData.permissions
        : ['Billing', 'Order Status Update'],
    };

    saveStorage([newStaff, ...staffList]);
    setIsModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'Staff',
      department: 'Billing',
      permissions: ['Billing', 'Order Status Update'],
    });
  };

  const togglePermission = (perm: string) => {
    const current = formData.permissions || [];
    if (current.includes(perm)) {
      setFormData({ ...formData, permissions: current.filter((p) => p !== perm) });
    } else {
      setFormData({ ...formData, permissions: [...current, perm] });
    }
  };

  const availablePermissions = [
    'Full Access',
    'Financials',
    'Orders',
    'Billing',
    'Menu Edit',
    'Inventory',
    'Coupons',
    'Order Status Update',
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#F4D03F]" />
            <span>Staff Administration & Access Control</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage permissions for Owners, Kitchen Managers & Counter Billing Staff</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs flex items-center space-x-1.5 hover:scale-105 transition-all shadow-lg cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Staff Member</span>
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {staffList.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-2xl bg-[#141414] border border-[#D4AF37]/20 text-gray-400 text-xs italic">
            No staff members registered in the system. Click "+ Add Staff Member" above to register new personnel.
          </div>
        ) : (
          staffList.map((member) => (
            <div
              key={member.id}
              className="p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-xl space-y-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-white font-serif">{member.name}</h3>
                  <span className="text-[10px] text-gray-400 font-mono">{member.department} • Joined {member.joinedDate}</span>
                </div>

                <span
                  className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${
                    member.role === 'Owner'
                      ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFF1A8] to-[#D4AF37] text-black border-[#FFE885]'
                      : member.role === 'Manager'
                      ? 'bg-[#222] text-[#F4D03F] border-[#D4AF37]'
                      : 'bg-gray-900 text-gray-300 border-gray-700'
                  }`}
                >
                  {member.role}
                </span>
              </div>

              <div className="space-y-1 text-xs text-gray-300 bg-[#1A1A1A] p-3 rounded-xl border border-gray-800">
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-800 space-y-1">
                <span className="text-[10px] uppercase text-gray-500 font-bold block">Assigned Permissions</span>
                <div className="flex flex-wrap gap-1">
                  {member.permissions.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-black border border-[#D4AF37]/30 text-[#F4D03F] text-[10px] font-mono"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleDelete(member.id)}
                  className="p-1.5 rounded-lg bg-red-950/40 text-red-300 hover:text-white border border-red-500/30 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#141414] border border-[#D4AF37] rounded-2xl p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-lg bg-gray-900 border border-gray-800"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-serif font-bold text-white flex items-center space-x-2 border-b border-gray-800 pb-3">
              <UserPlus className="w-5 h-5 text-[#F4D03F]" />
              <span>Add Staff Access Account</span>
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Chef Rameshwar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@aggarwal.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98111 22334"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-400 font-medium mb-1">System Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                    <option value="Owner">Owner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 font-medium mb-1">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-gray-800 rounded-xl text-white focus:border-[#D4AF37] outline-none"
                  >
                    <option value="Kitchen">Kitchen</option>
                    <option value="Billing">Billing / Counter</option>
                    <option value="Management">Management</option>
                    <option value="Delivery">Delivery & Logistics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 font-medium mb-1">Select Access Permissions</label>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {availablePermissions.map((perm) => {
                    const isSelected = formData.permissions?.includes(perm);
                    return (
                      <button
                        type="button"
                        key={perm}
                        onClick={() => togglePermission(perm)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono border transition-all ${
                          isSelected
                            ? 'bg-[#D4AF37] text-black font-bold border-[#F4D03F]'
                            : 'bg-gray-900 text-gray-400 border-gray-800 hover:text-white'
                        }`}
                      >
                        {perm}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-gray-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold shadow-lg"
                >
                  Create Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

