import React, { useState } from 'react';
import { ShieldCheck, UserPlus, Trash2, Edit2, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { StaffMember, AdminRole } from '../types';
import { INITIAL_STAFF } from '../mockAdminData';

export const StaffTab: React.FC = () => {
  const [staffList, setStaffList] = useState<StaffMember[]>(() => {
    const saved = localStorage.getItem('aggarwal_admin_staff');
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
    department: 'Counter',
    status: 'Active',
  });

  const saveStorage = (updated: StaffMember[]) => {
    setStaffList(updated);
    localStorage.setItem('aggarwal_admin_staff', JSON.stringify(updated));
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
      id: `STF-${Date.now()}`,
      name: formData.name || 'New Staff',
      email: formData.email || 'staff@aggarwalsweets.com',
      phone: formData.phone || '+91 98111 22334',
      role: (formData.role as AdminRole) || 'Staff',
      department: formData.department || 'Billing',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      permissions:
        formData.role === 'Owner'
          ? ['Full Control', 'Financials', 'Staff Management']
          : formData.role === 'Manager'
          ? ['Orders', 'Menu Edit', 'Inventory']
          : ['Billing', 'Order Updates'],
    };

    saveStorage([...staffList, newStaff]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#141414] border border-[#D4AF37]/30 shadow-xl">
        <div>
          <h2 className="text-xl font-bold font-serif text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-[#F4D03F]" />
            <span>Staff Administration & Access Control</span>
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage permissions for Owners, Kitchen Managers & Counter Billing Staff</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F4D03F] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.4)] border border-[#FFE885] cursor-pointer hover:scale-105 transition-all flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {staffList.map((member) => (
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
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-2xl max-w-md w-full p-6 text-white shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-[#F4D03F] font-serif border-b border-gray-800 pb-2">
              Add Staff Credentials
            </h3>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 mb-1">Role</label>
                  <select
                    value={formData.role || 'Staff'}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as AdminRole })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  >
                    <option value="Staff">Staff</option>
                    <option value="Manager">Manager</option>
                    <option value="Owner">Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-1">Department</label>
                  <select
                    value={formData.department || 'Counter'}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value as any })}
                    className="w-full p-2.5 bg-[#1A1A1A] border border-[#D4AF37]/30 rounded-xl text-white"
                  >
                    <option value="Kitchen">Kitchen</option>
                    <option value="Counter">Counter</option>
                    <option value="Billing">Billing</option>
                    <option value="Management">Management</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-800 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F4D03F] text-black font-extrabold rounded-xl"
                >
                  Create Staff Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
