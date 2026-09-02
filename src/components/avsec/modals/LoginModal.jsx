'use client';
import React from 'react';
import { Lock, UserCircle, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import logo from '../../../assets/logo.jpeg';

export default function LoginModal({
  isOpen,
  onClose,
  username,
  setUsername,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  showPassword,
  setShowPassword,
  loginError,
  isLoggingIn,
  handleLogin
}) {
  if (!isOpen) return null;

  const logoSrc = logo.src || logo;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <img src={logoSrc} alt="Logo" className="w-7 h-7 rounded-full object-cover border border-amber-400" />
            Login Akun Petugas AVSEC
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {loginError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">ID Pas Bandara / NIP / Username</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Contoh: AV-001 atau admin"
                className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                required
              />
              <UserCircle className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password System</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password Anda"
                className="w-full pl-9 pr-9 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 absolute right-3 top-3 cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              Ingat ID Pas Saya
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all text-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoggingIn ? 'Memverifikasi...' : 'Masuk Portal'}
          </button>
        </form>
      </div>
    </div>
  );
}
