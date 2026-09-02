'use client';
import React from 'react';
import { Radio, Menu, X, UserCircle, LogOut, Lock } from 'lucide-react';
import logo from '../../assets/logo.jpeg';

export default function Navbar({
  currentUser,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  handleLogout,
  setIsLoginModalOpen
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Operational Status */}
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xs opacity-25 group-hover:opacity-50 transition duration-300"></div>
              <img
                src={logo.src || logo}
                alt="AVSEC Wunopito Logo"
                className="relative w-12 h-12 rounded-xl object-cover border-2 border-white shadow-md transform transition duration-300 group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 leading-none font-sans">
                  PORTAL UTAMA AVSEC
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-blue-200/60 uppercase tracking-wider">
                  WUNOPITO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1 flex items-center gap-1.5">
                <span>Bandara Wunopito Lembata</span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-1 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
                  <Radio className="w-3 h-3 animate-pulse" /> Live System
                </span>
              </p>
            </div>
          </div>

          {/* User Auth Info & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {currentUser ? (
              <div className="flex items-center gap-3 bg-slate-50 p-1.5 pl-4 rounded-2xl border border-slate-200/80">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-900 flex items-center justify-end gap-1.5">
                    <span>{currentUser.nama_lengkap}</span>
                    {currentUser.role === 'ADMIN' ? (
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-md border border-amber-300">ADMIN</span>
                    ) : (
                      <span className="bg-blue-100 text-blue-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-md border border-blue-300">USER</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">ID PAS: {currentUser.username}</div>
                </div>
                <div className="w-9 h-9 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-sm">
                  {currentUser.nama_lengkap?.charAt(0) || 'U'}
                </div>
                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-blue-400" /> Login Petugas / Admin
              </button>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
