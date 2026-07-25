import React, { useState, useEffect } from 'react';
import { ShieldAlert, Download, Upload, Lock, FileText, CheckCircle2, History, Shield, RefreshCw } from 'lucide-react';
import { apiService, ActivityLogRecord } from '../../../lib/apiService';

export const SecurityBackupTab: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLogRecord[]>([]);
  const [restoreStatus, setRestoreStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [restoreMsg, setRestoreMsg] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const l = await apiService.getLogs();
    setLogs(l);
  };

  const handleDownloadBackup = () => {
    const backupStr = apiService.exportBackupJSON();
    const blob = new Blob([backupStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `aggarwal_sweets_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);

    apiService.addLog('Owner', 'Admin', 'Export Data Backup', 'Downloaded complete JSON backup file.');
    loadLogs();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = apiService.restoreBackupJSON(content);
      if (success) {
        setRestoreStatus('success');
        setRestoreMsg('Database restored successfully! All records updated.');
        apiService.addLog('Owner', 'Admin', 'System Backup Restored', 'Restored system database from JSON backup file.');
        loadLogs();
      } else {
        setRestoreStatus('error');
        setRestoreMsg('Failed to parse backup JSON file. Invalid format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 bg-gradient-to-r from-[#1A1A1A] via-[#121212] to-[#1A1A1A] border border-[#D4AF37]/30 rounded-2xl shadow-xl space-y-2">
        <div className="flex items-center space-x-2 text-[#F4D03F]">
          <ShieldAlert className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-widest font-sans">
            Enterprise Security & Governance
          </span>
        </div>
        <h2 className="text-2xl font-bold font-serif-luxury text-white">
          Security, Permissions & Data Backup Engine
        </h2>
        <p className="text-xs text-gray-400 font-sans">
          Manage system security, role-based access control (RBAC), full database JSON snapshots, and audit trail logs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Backup & Restore Panel */}
        <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center space-x-3 text-[#F4D03F] border-b border-white/10 pb-3">
            <Download className="w-5 h-5" />
            <h3 className="text-lg font-bold font-serif-luxury text-white">Data Backup & Disaster Recovery</h3>
          </div>

          <p className="text-xs text-gray-300 leading-relaxed">
            Create an instantaneous snapshot of your store's products, customer CRM, festival campaigns, staff records, orders, and sales history.
          </p>

          <div className="space-y-3 pt-2">
            <button
              onClick={handleDownloadBackup}
              className="btn-gold w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider text-black flex items-center justify-center space-x-2 shadow-lg hover:scale-102 transition-transform cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete System Backup (JSON)</span>
            </button>

            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="restore-upload-input"
              />
              <label
                htmlFor="restore-upload-input"
                className="w-full py-3 rounded-xl border border-white/20 hover:border-[#D4AF37] text-xs font-bold text-gray-300 hover:text-white flex items-center justify-center space-x-2 cursor-pointer bg-white/5 transition-colors"
              >
                <Upload className="w-4 h-4 text-[#F4D03F]" />
                <span>Restore Backup From File</span>
              </label>
            </div>
          </div>

          {restoreStatus === 'success' && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-700 text-emerald-300 rounded-xl text-xs font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{restoreMsg}</span>
            </div>
          )}

          {restoreStatus === 'error' && (
            <div className="p-3 bg-rose-950/80 border border-rose-700 text-rose-300 rounded-xl text-xs font-bold flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{restoreMsg}</span>
            </div>
          )}
        </div>

        {/* Role Permissions Matrix */}
        <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center space-x-3 text-[#F4D03F] border-b border-white/10 pb-3">
            <Shield className="w-5 h-5" />
            <h3 className="text-lg font-bold font-serif-luxury text-white">Role-Based Access Control (RBAC)</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-white block">Owner Role</strong>
                <span className="text-[11px] text-gray-400">Full administrative access across all modules & settings.</span>
              </div>
              <span className="text-[10px] font-bold bg-[#D4AF37] text-black px-2.5 py-0.5 rounded-full">SUPERADMIN</span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-white block">Manager Role</strong>
                <span className="text-[11px] text-gray-400">Manage orders, products, inventory, customers & bookings.</span>
              </div>
              <span className="text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 px-2 py-0.5 rounded-full">MANAGER</span>
            </div>

            <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between">
              <div>
                <strong className="text-white block">Staff Role</strong>
                <span className="text-[11px] text-gray-400">POS order entry, status updates & table booking view.</span>
              </div>
              <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/40 px-2 py-0.5 rounded-full">STAFF</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Logs Audit Trail */}
      <div className="bg-[#121212] border border-[#D4AF37]/30 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center space-x-2 text-[#F4D03F]">
            <History className="w-5 h-5" />
            <h3 className="text-lg font-bold font-serif-luxury text-white">System Activity Logs & Security Audit</h3>
          </div>
          <button
            onClick={loadLogs}
            className="p-1.5 rounded-lg bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="Refresh Logs"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0A0A0A] text-[#D4AF37] uppercase tracking-wider">
              <tr>
                <th className="p-3">Timestamp</th>
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-white/5 text-gray-300">
                  <td className="p-3 text-gray-400 font-mono text-[11px]">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="p-3 font-bold text-white">{log.userName}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold bg-white/10 text-[#F4D03F] px-2 py-0.5 rounded">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="p-3 font-bold text-white">{log.action}</td>
                  <td className="p-3 text-gray-400">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
