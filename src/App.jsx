import React, { useState } from 'react';
import { 
  Lock, 
  UserCircle, 
  LayoutDashboard, 
  FileText, 
  BookOpen, 
  Users, 
  Settings, 
  LogOut, 
  AlertTriangle,
  Search,
  Download,
  CheckCircle2,
  Clock,
  XCircle,
  Menu,
  X,
  Eye,
  EyeOff
} from 'lucide-react';

import logo from '../WhatsApp Image 2026-01-26 at 10.11.20 AM.jpeg';

// NOTE: This file previously used TypeScript "type" and "interface" declarations
// which caused esbuild to fail because the file is plain .jsx. Replaced with
// runtime-only shapes / comments below.

// Role: 'ADMIN' | 'USER'
// User: { id, username, nama_lengkap, role, status_aktif }
// Personnel: { id, nama, id_pas, jabatan, lisensi, status_lisensi, masa_berlaku }

const mockPersonnel = [
  { id: '1', nama: 'Budi Santoso', id_pas: 'AV-001', jabatan: 'Komandan Regu', lisensi: 'Senior', status_lisensi: 'Aktif', masa_berlaku: '2027-10-12' },
  { id: '2', nama: 'Siti Aminah', id_pas: 'AV-042', jabatan: 'Operator X-Ray', lisensi: 'Junior', status_lisensi: 'Mendekati Expired', masa_berlaku: '2026-09-15' },
  { id: '3', nama: 'Ahmad Dahlan', id_pas: 'AV-088', jabatan: 'Petugas Patroli', lisensi: 'Basic', status_lisensi: 'Kedaluwarsa', masa_berlaku: '2026-01-20' },
  { id: '4', nama: 'Diana Putri', id_pas: 'AV-015', jabatan: 'Supervisor', lisensi: 'Management', status_lisensi: 'Aktif', masa_berlaku: '2028-05-01' },
];

const mockDocs = [
  { id: 1, title: 'SOP Pemeriksaan Penumpang & Barang Bawaan', kategori: 'Prosedur', tanggal: '2025-11-10', ukuran: '2.4 MB' },
  { id: 2, title: 'KP 167 Tahun 2023 - Program Keamanan Penerbangan', kategori: 'Regulasi Dirjen', tanggal: '2023-08-22', ukuran: '5.1 MB' },
  { id: 3, title: 'Instruksi Kerja Pengoperasian Mesin X-Ray', kategori: 'Instruksi Kerja', tanggal: '2026-02-15', ukuran: '1.2 MB' },
  { id: 4, title: 'Prosedur Penanganan Barang Dilarang (Prohibited Items)', kategori: 'Prosedur', tanggal: '2025-12-01', ukuran: '3.0 MB' },
];

export default function AvsecWunopitoPortal() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    // Simulasi delay jaringan
    setTimeout(() => {
      if (username === 'admin' && password === 'admin123') {
        setCurrentUser({ id: 'u1', username: 'admin', nama_lengkap: 'Admin Wunopito', role: 'ADMIN', status_aktif: true });
        setActiveTab('dashboard');
      } else if (username === 'user' && password === 'user123') {
        setCurrentUser({ id: 'u2', username: 'user', nama_lengkap: 'Petugas AVSEC', role: 'USER', status_aktif: true });
        setActiveTab('dashboard');
      } else {
        setLoginError('Kredensial tidak valid. Silakan periksa kembali Username dan Password Anda.');
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUsername('');
    setPassword('');
    setActiveTab('dashboard');
  };

  const navItemClass = (tabName) => `
    flex items-center w-full text-left px-4 py-3 rounded-lg transition-all duration-200
    ${activeTab === tabName 
      ? 'bg-blue-600 text-white shadow-md' 
      : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
  `;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          <div className="absolute top-40 -left-40 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="w-full max-w-5xl flex flex-col md:flex-row bg-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 border border-slate-700">
          
          {/* Left Side: Branding / Info */}
          <div className="md:w-5/12 bg-gradient-to-b from-blue-900 to-slate-900 p-10 flex flex-col justify-between text-white border-r border-slate-700">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <img src={logo} alt="Logo Aviation Security Wunopito Airport" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
              </div>
              <h2 className="text-3xl font-bold mb-4 leading-tight">Portal Operasional Keamanan</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Sistem informasi terpusat untuk manajemen pelaporan, dokumen regulasi, dan data personel Aviation Security Bandara Wunopito.
              </p>
            </div>
            
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-yellow-400">Akses Terbatas</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Sistem ini hanya dapat diakses oleh personel yang berwenang. Segala aktivitas di dalam portal direkam oleh sistem.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Form */}
          <div className="md:w-7/12 p-10 bg-slate-800 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <h3 className="text-2xl font-bold text-white mb-2">Selamat Datang</h3>
              <p className="text-slate-400 mb-8 text-sm">Silakan masukkan kredensial Anda untuk melanjutkan.</p>

              {loginError && (
                <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm flex items-center gap-3 animate-fade-in">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{loginError}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Username / ID Pas</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCircle className="h-5 w-5 text-slate-500" />
                    </div>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Masukkan ID Pas Anda"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-500" />
                    </div>
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 pr-10 py-3 border border-slate-600 rounded-lg bg-slate-900 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500[...]
                      placeholder="••••••••"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-slate-500 hover:text-slate-300 transition-colors" />
                      ) : (
                        <Eye className="h-5 w-5 text-slate-500 hover:text-slate-300 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="text-sm">
                    <a href="#" onClick={(e) => { e.preventDefault(); alert('Silakan hubungi Admin (Ext. 112) untuk mereset password Anda.'); }} className="font-medium text-blue-400 hover:text-blue-300"> 
                      Lupa password?
                    </a>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isLoggingIn}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  {isLoggingIn ? 'Memverifikasi...' : 'Login ke Sistem'}
                </button>
                
                <div className="mt-6 text-center text-xs text-slate-500 border-t border-slate-700 pt-4">
                  Gunakan <b className="text-slate-300">admin / admin123</b> atau <b className="text-slate-300">user / user123</b> untuk demo.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      
      {/* Mobile Header */}
      <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo Aviation Security" className="w-10 h-10 object-contain" />
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transition-transform duration-300 fixed md:static top-0 left-0 h-full w-64 bg-slate-900 text-white flex flex-col z-30 shadow-xl md:shadow-none
      `}>
        <div className="p-6 border-b border-slate-800 hidden md:block">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Logo Aviation Security" className="w-16 h-16 object-contain" />
          </div>
        </div>
        
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
              <UserCircle className="w-6 h-6 text-slate-300" />
            </div>
            <div>
              <p className="text-sm font-semibold truncate">{currentUser.nama_lengkap}</p>
              <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded uppercase ${currentUser.role === 'ADMIN' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800/20 text-slate-300 border border-slate-700/30'}`}>
                {currentUser.role}
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <button onClick={() => {setActiveTab('dashboard'); setIsMobileMenuOpen(false);}} className={navItemClass('dashboard')}>
            <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
          </button>
          <button onClick={() => {setActiveTab('reports'); setIsMobileMenuOpen(false);}} className={navItemClass('reports')}>
            <FileText className="w-5 h-5 mr-3" /> Pelaporan
          </button>
          <button onClick={() => {setActiveTab('documents'); setIsMobileMenuOpen(false);}} className={navItemClass('documents')}>
            <BookOpen className="w-5 h-5 mr-3" /> Pusat Dokumen
          </button>
          <button onClick={() => {setActiveTab('personnel'); setIsMobileMenuOpen(false);}} className={navItemClass('personnel')}>
            <Users className="w-5 h-5 mr-3" /> Data Personil
          </button>

          {currentUser.role === 'ADMIN' && (
            <>
              <div className="pt-4 pb-2">
                <p className="text-xs font-semibold text-slate-500 uppercase px-4">Administrator</p>
              </div>
              <button onClick={() => {setActiveTab('admin'); setIsMobileMenuOpen(false);}} className={navItemClass('admin')}>
                <Settings className="w-5 h-5 mr-3" /> Admin Panel
              </button>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/10 hover:text-red-400 text-slate-300 font-medium py-2.5 px-4 rounded-lg">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto w-full max-w-7xl mx-auto">
        
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <header className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Dashboard Operasional</h1>
              <p className="text-slate-500 mt-1">Selamat bertugas. Selalu utamakan keselamatan dan keamanan penerbangan.</p>
            </header>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Personel On Duty</h3>
                  <div className="flex items-baseline mt-2">
                    <p className="text-3xl font-bold text-slate-800">12</p>
                    <p className="text-sm font-medium text-slate-500 ml-2">Orang</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Laporan Hari Ini</h3>
                  <div className="flex items-baseline mt-2">
                    <p className="text-3xl font-bold text-slate-800">5</p>
                    <p className="text-sm font-medium text-slate-500 ml-2">Log Masuk</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Status Keamanan</h3>
                  <div className="flex items-baseline mt-2">
                    <p className="text-xl font-bold text-green-600">KONDUSIF</p>
                  </div>
                </div>
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
              {/* Quick Actions */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  Pintasan <span className="text-slate-400 font-normal text-sm">(Quick Links)</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button onClick={() => setActiveTab('reports')} className="p-4 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-100 rounded-xl text-center transition-all g[...]
                    <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5" />
                    </div>
                    <span className="block mt-3 text-sm font-semibold text-slate-700">Log Patroli</span>
                  </button>
                  <button onClick={() => setActiveTab('reports')} className="p-4 bg-slate-50 hover:bg-red-50 hover:border-red-200 border border-slate-100 rounded-xl text-center transition-all gro[...]
                    <div className="w-10 h-10 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm text-red-600 group-hover:scale-110 transition-transform">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <span className="block mt-3 text-sm font-semibold text-slate-700">Lapor Insiden</span>
                  </button>

