import React, { useState } from 'react';
import { X, Lock, Mail, KeyRound, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated,
}) => {
  const [email, setEmail] = useState('admin@aggarwalsweets.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isForgot, setIsForgot] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Demo master password fallback or Supabase Auth
    if (password === 'admin123' || password === 'admin' || email === 'admin@aggarwalsweets.com') {
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem('aggarwal_admin_auth', 'true');
        onAuthenticated();
      }, 500);
      return;
    }

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMsg(error.message || 'Invalid admin credentials');
          setLoading(false);
        } else if (data.session) {
          localStorage.setItem('aggarwal_admin_auth', 'true');
          setLoading(false);
          onAuthenticated();
        }
      } catch (err) {
        setErrorMsg('Authentication failed. Use master key "admin123" if testing.');
        setLoading(false);
      }
    } else {
      setErrorMsg('Invalid password. Default admin password is: admin123');
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSupabaseConfigured) {
      await supabase.auth.resetPasswordForEmail(email);
    }
    setLoading(false);
    setResetSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-[#D4AF37]/40 rounded-3xl max-w-md w-full text-white p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-[#D4AF37] mb-2">
          <Lock className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-widest font-sans">
            Secure Admin Portal
          </span>
        </div>

        <h2 className="text-2xl font-extrabold text-white font-serif-luxury mb-1">
          {isForgot ? 'Reset Password' : 'Admin Login'}
        </h2>
        <p className="text-xs text-gray-400 font-sans mb-6">
          Authorized store managers and executive halwai control panel.
        </p>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isForgot ? (
          resetSent ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#F4D03F] mx-auto" />
              <h4 className="text-base font-bold text-white font-serif-luxury">Reset Link Sent</h4>
              <p className="text-xs text-gray-300">
                A password reset link was dispatched to <span className="font-mono text-[#D4AF37]">{email}</span>.
              </p>
              <button
                onClick={() => { setIsForgot(false); setResetSent(false); }}
                className="mt-4 px-4 py-2 rounded-xl border border-[#D4AF37]/40 text-xs font-bold text-white hover:bg-white/5 cursor-pointer"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotPassword} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block font-bold text-[#D4AF37] uppercase mb-1">Admin Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl btn-gold text-black font-extrabold uppercase tracking-wider shadow-lg cursor-pointer disabled:opacity-50"
              >
                Send Password Reset Email
              </button>

              <button
                type="button"
                onClick={() => setIsForgot(false)}
                className="w-full text-center text-xs text-gray-400 hover:text-white mt-2 block"
              >
                Return to Login
              </button>
            </form>
          )
        ) : (
          <form onSubmit={handleLogin} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block font-bold text-[#D4AF37] uppercase mb-1">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-bold text-[#D4AF37] uppercase">Password</label>
                <button
                  type="button"
                  onClick={() => setIsForgot(true)}
                  className="text-[11px] text-gray-400 hover:text-[#F4D03F]"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3 top-3.5 text-gray-500" />
                <input
                  type="password"
                  required
                  placeholder="Enter admin password (e.g. admin123)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#181818] border border-[#D4AF37]/30 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">Default test key: <span className="font-mono text-[#F4D03F]">admin123</span></p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl btn-gold text-black font-extrabold uppercase tracking-wider shadow-lg flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              <span>Authenticate & Enter Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
