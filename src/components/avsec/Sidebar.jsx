'use client';
import React from 'react';
import { LayoutDashboard, FileText, BookOpen, Megaphone, Users, Settings, Lock, LogOut } from 'lucide-react';

export default function Sidebar({
  activeTab,
  changeTabWithLoading,
  currentUser,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setIsLoginModalOpen,
  handleLogout,
  personnelCount,
  docCount,
  announcementCount
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'logbook', label: 'Pelaporan & Log', icon: FileText, badge: 'Live' },
    { id: 'dokumen', label: 'Pusat SOP & Regulasi', icon: BookOpen, badge: docCount },
    { id: 'informasi', label: 'Pengumuman & Kontak', icon: Megaphone, badge: announcementCount },
    { id: 'personnel', label: 'Direktori Personel', icon: Users, badge: personnelCount },
    ...(currentUser?.role === 'ADMIN' ? [{ id: 'admin', label: 'Control Panel Admin', icon: Settings, badge: 'PRO' }] : [])
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-1.5">
          <div className="px-3 py-2 text-[10px] font-black uppercase text-slate-400 tracking-wider">
            Menu Utama Portal
          </div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => changeTabWithLoading(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 translate-x-1'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-6 space-y-3 animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-2">
              <span className="font-extrabold text-sm text-slate-900">Navigasi Menu AVSEC</span>
              <span className="text-xs text-slate-400">Wunopito Airport</span>
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    changeTabWithLoading(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-xs transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] bg-slate-200/60 text-slate-800 px-2 py-0.5 rounded-full font-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-4 border-t border-slate-100">
              {currentUser ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold text-xs rounded-2xl border border-red-200"
                >
                  <LogOut className="w-4 h-4" /> Keluar Sesi Akun
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 text-white font-bold text-xs rounded-2xl shadow-md"
                >
                  <Lock className="w-4 h-4 text-blue-400" /> Login Petugas / Admin
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
