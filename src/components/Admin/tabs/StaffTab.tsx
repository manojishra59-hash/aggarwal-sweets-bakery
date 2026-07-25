import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, UserPlus, Calendar, DollarSign, CheckCircle2, Clock, Award, Phone, Mail, Building, Plus, Trash2, Edit2 } from 'lucide-react';
import { apiService, StaffRecord, AttendanceRecord, SalaryRecord } from '../../../lib/apiService';

export const StaffTab: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'staff' | 'attendance' | 'salary'>('staff');
  const [staffList, setStaffList] = useState<StaffRecord[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [salaries, setSalaries] = useState<SalaryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const [showStaffModal, setShowStaffModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Partial<StaffRecord> | null>(null);

  const [showSalaryModal, setShowSalaryModal] = useState(false);
  const [selectedStaffForSalary, setSelectedStaffForSalary] = useState<StaffRecord | null>(null);
  const [salaryBonus, setSalaryBonus] = useState(0);

  const loadData = async () => {
    setLoading(true);
    const [stf, att, sal] = await Promise.all([
      apiService.getStaff(),
      apiService.getAttendance(),
      apiService.getSalaries(),
    ]);
    setStaffList(stf);
    setAttendance(att);
    setSalaries(sal);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenNewStaff = () => {
    setEditingStaff({
      name: '',
      role: 'Staff',
      phone: '+91 ',
      email: '',
      branch: 'Rajouri Garden (Main Flagship)',
      monthlySalary: 30000,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      permissions: {
        manageProducts: false,
        manageOrders: true,
        manageInventory: false,
        manageStaff: false,
        manageReports: false,
      },
    });
    setShowStaffModal(true);
  };

  const handleSaveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingStaff || !editingStaff.name) return;
    await apiService.saveStaff(editingStaff);
    setShowStaffModal(false);
    setEditingStaff(null);
    loadData();
  };

  const handleToggleAttendance = async (staff: StaffRecord, currentStatus?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newStatus = currentStatus === 'Present' ? 'Absent' : 'Present';
    await apiService.markAttendance({
      staffId: staff.id,
      staffName: staff.name,
      date: today,
      status: newStatus as any,
      shiftTiming: '09:00 - 19:00',
    });
    loadData();
  };

  const handlePaySalary = async () => {
    if (!selectedStaffForSalary) return;
    await apiService.paySalary({
      staffId: selectedStaffForSalary.id,
      staffName: selectedStaffForSalary.name,
      month: 'July 2026',
      baseSalary: selectedStaffForSalary.monthlySalary,
      bonus: salaryBonus,
      deductions: 0,
    });
    setShowSalaryModal(false);
    setSelectedStaffForSalary(null);
    loadData();
  };

  if (loading) {
    return <div className="p-8 text-center text-[#D4AF37]">Loading Staff Directory...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Navigation Subtabs */}
      <div className="flex items-center space-x-3 border-b border-[#D4AF37]/20 pb-4 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('staff')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
            activeSubTab === 'staff'
              ? 'btn-gold text-black shadow-lg'
              : 'bg-[#121212] border border-white/10 text-gray-300 hover:border-[#D4AF37]/50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Staff Directory ({staffList.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('attendance')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
            activeSubTab === 'attendance'
              ? 'btn-gold text-black shadow-lg'
              : 'bg-[#121212] border border-white/10 text-gray-300 hover:border-[#D4AF37]/50'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Daily Attendance</span>
        </button>

        <button
          onClick={() => setActiveSubTab('salary')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-all cursor-pointer ${
            activeSubTab === 'salary'
              ? 'btn-gold text-black shadow-lg'
              : 'bg-[#121212] border border-white/10 text-gray-300 hover:border-[#D4AF37]/50'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Salary & Payroll</span>
        </button>
      </div>

      {/* SUBTAB 1: STAFF DIRECTORY */}
      {activeSubTab === 'staff' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-serif-luxury text-white">
              Store Staff & Halwai Masters
            </h3>
            <button
              onClick={handleOpenNewStaff}
              className="btn-gold px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase text-black flex items-center space-x-1.5 shadow-md cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add New Staff</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffList.map((stf) => (
              <div
                key={stf.id}
                className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4 relative overflow-hidden"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-[#F4D03F] uppercase tracking-widest bg-[#0A0A0A] border border-[#D4AF37]/30 px-2.5 py-0.5 rounded-full inline-block mb-2">
                        {stf.role}
                      </span>
                      <h4 className="text-lg font-bold text-white font-serif-luxury">
                        {stf.name}
                      </h4>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        stf.status === 'Active'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-rose-950 text-rose-400 border border-rose-800'
                      }`}
                    >
                      {stf.status}
                    </span>
                  </div>

                  <div className="space-y-2 mt-3 text-xs text-gray-300">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-[#F4D03F]" />
                      <span>{stf.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-[#F4D03F]" />
                      <span>{stf.email || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Building className="w-3.5 h-3.5 text-[#F4D03F]" />
                      <span>{stf.branch}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block">Monthly Salary</span>
                    <span className="font-bold text-[#F4D03F]">₹{stf.monthlySalary.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => {
                      setEditingStaff(stf);
                      setShowStaffModal(true);
                    }}
                    className="p-2 rounded-lg bg-white/10 text-gray-300 hover:text-white hover:bg-[#D4AF37] hover:text-black transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: DAILY ATTENDANCE */}
      {activeSubTab === 'attendance' && (
        <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold font-serif-luxury text-white">
                Daily Attendance Register ({new Date().toISOString().split('T')[0]})
              </h3>
              <p className="text-xs text-gray-400">Mark staff present or absent for today's shift.</p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {staffList.map((stf) => {
              const todayStr = new Date().toISOString().split('T')[0];
              const attRecord = attendance.find((a) => a.staffId === stf.id && a.date === todayStr);
              const isPresent = attRecord?.status === 'Present';

              return (
                <div key={stf.id} className="py-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full btn-gold flex items-center justify-center font-bold text-black">
                      {stf.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{stf.name}</h4>
                      <p className="text-xs text-gray-400">{stf.role} • {stf.branch}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full ${
                        isPresent ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950 text-rose-300 border border-rose-700'
                      }`}
                    >
                      {isPresent ? 'Present' : 'Absent'}
                    </span>

                    <button
                      onClick={() => handleToggleAttendance(stf, attRecord?.status)}
                      className="px-4 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-[#D4AF37] hover:text-black transition-colors"
                    >
                      Toggle
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 3: SALARY & PAYROLL */}
      {activeSubTab === 'salary' && (
        <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="text-lg font-bold font-serif-luxury text-white">
                July 2026 Salary & Bonus Disbursal
              </h3>
              <p className="text-xs text-gray-400">Generate pay slips and disburse monthly staff salaries.</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0A0A0A] text-[#D4AF37] uppercase tracking-wider">
                <tr>
                  <th className="p-3">Staff Name</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Base Salary</th>
                  <th className="p-3">Bonus</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {staffList.map((stf) => {
                  const sal = salaries.find((s) => s.staffId === stf.id && s.month === 'July 2026');
                  const isPaid = Boolean(sal && sal.paymentStatus === 'Paid');

                  return (
                    <tr key={stf.id} className="hover:bg-white/5">
                      <td className="p-3 font-bold text-white">{stf.name}</td>
                      <td className="p-3 text-gray-400">{stf.role}</td>
                      <td className="p-3 font-bold text-[#F4D03F]">₹{stf.monthlySalary.toLocaleString()}</td>
                      <td className="p-3 text-emerald-400">₹{sal ? sal.bonus : 0}</td>
                      <td className="p-3">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            isPaid ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}
                        >
                          {isPaid ? 'Paid' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {!isPaid ? (
                          <button
                            onClick={() => {
                              setSelectedStaffForSalary(stf);
                              setShowSalaryModal(true);
                            }}
                            className="btn-gold px-3 py-1 rounded-lg font-bold text-black"
                          >
                            Disburse Pay
                          </button>
                        ) : (
                          <span className="text-gray-500 text-[10px]">Paid on {sal?.paidDate}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Staff Modal */}
      {showStaffModal && editingStaff && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141414] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full p-6 text-white space-y-4">
            <h3 className="text-lg font-bold font-serif-luxury text-white border-b border-white/10 pb-2">
              {editingStaff.id ? 'Edit Staff Profile' : 'Add New Staff Member'}
            </h3>

            <form onSubmit={handleSaveStaff} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editingStaff.name || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, name: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Role
                  </label>
                  <select
                    value={editingStaff.role || 'Staff'}
                    onChange={(e) => setEditingStaff({ ...editingStaff, role: e.target.value as any })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                  >
                    <option value="Owner">Owner</option>
                    <option value="Manager">Manager</option>
                    <option value="Head Halwai">Head Halwai</option>
                    <option value="Staff">Staff</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                    Monthly Salary (₹)
                  </label>
                  <input
                    type="number"
                    value={editingStaff.monthlySalary || 30000}
                    onChange={(e) => setEditingStaff({ ...editingStaff, monthlySalary: Number(e.target.value) })}
                    className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editingStaff.phone || ''}
                  onChange={(e) => setEditingStaff({ ...editingStaff, phone: e.target.value })}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowStaffModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-gold px-5 py-2 rounded-xl text-xs font-bold text-black"
                >
                  Save Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Salary Modal */}
      {showSalaryModal && selectedStaffForSalary && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#141414] border border-[#D4AF37]/40 rounded-3xl max-w-sm w-full p-6 text-white space-y-4">
            <h3 className="text-lg font-bold font-serif-luxury text-white border-b border-white/10 pb-2">
              Disburse Salary: {selectedStaffForSalary.name}
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400">Base Salary:</span>
                <span className="font-bold">₹{selectedStaffForSalary.monthlySalary.toLocaleString()}</span>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
                  Festive Bonus (₹)
                </label>
                <input
                  type="number"
                  value={salaryBonus}
                  onChange={(e) => setSalaryBonus(Number(e.target.value))}
                  className="w-full bg-[#0A0A0A] border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="flex justify-between pt-2 border-t border-white/10 font-bold text-sm">
                <span>Net Disbursement:</span>
                <span className="text-[#F4D03F]">₹{(selectedStaffForSalary.monthlySalary + salaryBonus).toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowSalaryModal(false)}
                className="px-4 py-2 rounded-xl border border-white/20 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handlePaySalary}
                className="btn-gold px-5 py-2 rounded-xl text-xs font-bold text-black"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
