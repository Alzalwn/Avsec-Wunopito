'use client';
import React from 'react';
import { Lock, UserCircle, Eye, EyeOff, AlertCircle } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

export default function LoginView({
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
  const logoSrc = logo.src || logo;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Glow Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-xl p-8 rounded-3xl border border-slate-800 shadow-2xl z-10 relative space-y-6">
        {/* Header Branding with Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 via-blue-600 to-indigo-600 rounded-full blur-xs opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <img
              src={logoSrc}
              alt="AVSEC Wunopito Logo"
              className="relative w-24 h-24 rounded-full object-cover border-2 border-amber-400 shadow-2xl mx-auto transform transition duration-300 group-hover:scale-105"
            />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white tracking-tight uppercase mt-1">
              PORTAL AVSEC BANDARA WUNOPITO
            </h1>
            <p className="text-slate-400 text-xs mt-1">
              Sistem Informasi Operasional, SOP & Logbook Terpadu
            </p>
          </div>
        </div>

        {/* Error Alert */}
        {loginError && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{loginError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              ID Pas Bandara / Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan Username atau ID Pas"
                className="w-full pl-10 pr-4 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-500 focus:outline-none transition-all font-medium"
                required
              />
              <UserCircle className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-300 mb-1.5 uppercase tracking-wider">
              Password Sistem
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                className="w-full pl-10 pr-10 py-3 bg-slate-800/80 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-slate-500 focus:outline-none transition-all font-medium"
                required
              />
              <Lock className="w-5 h-5 text-slate-400 absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-white absolute right-3 top-3.5 cursor-pointer transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300 transition-colors">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500"
              />
              Ingat ID Pas Saya
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition-all text-xs cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
          >
            {isLoggingIn ? 'Memverifikasi...' : 'Masuk Ke Portal AVSEC'}
          </button>
        </form>
      </div>

      <footer className="mt-8 text-center text-slate-500 text-xs z-10">
        © 2026 Aviation Security Bandara Wunopito. All rights reserved.
      </footer>
    </div>
  );
}
