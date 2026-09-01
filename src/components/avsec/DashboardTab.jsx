import React from 'react';
import logo from '../../assets/logo.jpeg';
import {
  Radio,
  Users,
  FileText,
  BookOpen,
  CheckCircle2,
  KeyRound,
  Shield,
  Search,
  ChevronRight,
  FileCheck,
  Megaphone,
  ShieldCheck
} from 'lucide-react';

export default function DashboardTab({
  personnelList,
  reportList,
  docList,
  announcements,
  emergencyContacts,
  currentUser,
  changeTabWithLoading,
  setLogbookMainTab,
  setSelectedFormKey,
  setIsIframeLoading,
  setAdminSubTab,
  setAnnouncementSubTab
}) {
  const logoSrc = logo.src || logo;

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img src={logoSrc} alt="AVSEC Logo" className="w-12 h-12 rounded-xl object-cover border-2 border-amber-400 shadow-md flex-shrink-0" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Dashboard Operasional</h1>
            <p className="text-slate-500 text-sm mt-0.5">Bandara Wunopito (LWE / WATW) - Unit Aviation Security</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3.5 py-2 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span>STATUS OPERASIONAL: NORMAL / KONDUSIF</span>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Personel</p>
            <div className="flex items-baseline mt-1.5">
              <p className="text-2xl font-black text-slate-900">{personnelList.length}</p>
              <span className="text-xs font-medium text-slate-500 ml-1.5">Terdaftar</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Laporan Hari Ini</p>
            <div className="flex items-baseline mt-1.5">
              <p className="text-2xl font-black text-slate-900">{reportList.length}</p>
              <span className="text-xs font-medium text-slate-500 ml-1.5">Log Masuk</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">SOP & Regulasi</p>
            <div className="flex items-baseline mt-1.5">
              <p className="text-2xl font-black text-slate-900">{docList.length}</p>
              <span className="text-xs font-medium text-slate-500 ml-1.5">Dokumen</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lisensi Aktif</p>
            <div className="flex items-baseline mt-1.5">
              <p className="text-2xl font-black text-emerald-600">
                {Math.round((personnelList.filter(p => p.status_lisensi === 'Aktif').length / (personnelList.length || 1)) * 100)}%
              </p>
              <span className="text-xs font-medium text-slate-500 ml-1.5">Kepatuhan</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Radio className="w-5 h-5 text-blue-600" />
            Pintasan Operasional Cepat
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <button
              onClick={() => { changeTabWithLoading('logbook'); setLogbookMainTab('form'); setSelectedFormKey('access_control'); setIsIframeLoading(true); }}
              className="p-4 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-xs text-blue-600 group-hover:scale-105 transition-transform">
                <KeyRound className="w-5 h-5" />
              </div>
              <span className="block mt-3 text-xs font-bold text-slate-800">Logbook Access Control</span>
            </button>

            <button
              onClick={() => { changeTabWithLoading('logbook'); setLogbookMainTab('form'); setSelectedFormKey('patroli'); setIsIframeLoading(true); }}
              className="p-4 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-xs text-indigo-600 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5" />
              </div>
              <span className="block mt-3 text-xs font-bold text-slate-800">Logbook Patroli</span>
            </button>

            <button
              onClick={() => { changeTabWithLoading('logbook'); setLogbookMainTab('form'); setSelectedFormKey('penyisiran'); setIsIframeLoading(true); }}
              className="p-4 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-xs text-emerald-600 group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5" />
              </div>
              <span className="block mt-3 text-xs font-bold text-slate-800">Logbook Penyisiran</span>
            </button>

            <button
              onClick={() => changeTabWithLoading('dokumen')}
              className="p-4 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 border border-slate-200 rounded-2xl text-center transition-all group cursor-pointer"
            >
              <div className="w-11 h-11 mx-auto bg-white rounded-xl flex items-center justify-center shadow-xs text-amber-600 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="block mt-3 text-xs font-bold text-slate-800">Pusat SOP & Regulasi</span>
            </button>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Rekapitulasi Logbook Operasional</h3>
                <p className="text-xs text-slate-500 mt-0.5">Data logbook harian terintegrasi real-time dari Google Sheets.</p>
              </div>
              <button
                onClick={() => { changeTabWithLoading('logbook'); setLogbookMainTab('rekap'); }}
                className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer self-start sm:self-auto mt-1 sm:mt-0"
              >
                Lihat Semua <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Preview Ringkas (3 Log Terbaru) */}
            <div className="space-y-2.5 mb-4">
              {reportList.slice(0, 3).map((rpt) => (
                <div key={rpt.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold">{rpt.id}</span>
                      <span className="font-bold text-slate-900">{rpt.tipe}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">{rpt.lokasi}</span>
                    </div>
                    <p className="text-slate-600 mt-1">{rpt.ringkasan}</p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
                    <span className="text-slate-400 font-mono">{rpt.waktu}</span>
                    <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${rpt.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {rpt.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => { changeTabWithLoading('logbook'); setLogbookMainTab('rekap'); }}
              className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <FileCheck className="w-4 h-4 text-emerald-600" />
              Buka Tab 2: Riwayat & Rekap Log (Google Sheets) ↗
            </button>
          </div>
        </div>

        {/* Right Side Widgets */}
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-2xl shadow-xs p-6 text-white border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold flex items-center gap-2 text-amber-400">
                <Megaphone className="w-5 h-5" /> Instruksi & Pengumuman Harian
              </h2>
              {currentUser?.role === 'ADMIN' && (
                <button
                  onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('announcements'); }}
                  className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline cursor-pointer"
                >
                  Kelola
                </button>
              )}
            </div>

            <div className="space-y-3.5 text-xs">
              {announcements.map((ann) => (
                <div key={ann.id} className={`border-l-2 pl-3 ${ann.priority === 'Kritis' ? 'border-red-500' : ann.priority === 'Penting' ? 'border-amber-400' : 'border-blue-400'}`}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-slate-400 text-[11px] font-semibold">{ann.shift}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase ${ann.priority === 'Kritis' ? 'bg-red-500/20 text-red-400' : ann.priority === 'Penting' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {ann.priority}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-100 text-xs mt-0.5">{ann.title}</h4>
                  <p className="text-slate-300 leading-relaxed mt-1 text-[11px]">{ann.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-600 rounded-2xl shadow-xs p-6 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-200" /> Kontak Darurat AVSEC
              </h3>
              {currentUser?.role === 'ADMIN' && (
                <button
                  onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('announcements'); setAnnouncementSubTab('kontak'); }}
                  className="text-[10px] text-blue-200 hover:text-white underline font-semibold"
                >
                  Edit Kontak
                </button>
              )}
            </div>
            <div className="mt-3 text-xs space-y-2 text-blue-100 font-medium">
              {emergencyContacts.map((c) => (
                <div key={c.id} className="flex justify-between items-center border-b border-blue-500/40 pb-1.5 last:border-0 last:pb-0">
                  <span>{c.nama}:</span>
                  <span className="text-white font-bold font-mono bg-blue-700/60 px-2 py-0.5 rounded">{c.kontak}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
