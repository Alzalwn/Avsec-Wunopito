'use client';
import React, { useState, useEffect } from 'react';
import {
  PlusCircle,
  FileCheck,
  ExternalLink,
  Clock,
  Trash2,
  Printer,
  Edit3,
  Smartphone,
  AlertTriangle,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Compass,
  Zap,
  Send,
  Sparkles,
  MapPin,
  User,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { googleSheetsUrl } from '../../utils/helpers.js';

export default function LogbookTab({
  logbookMainTab,
  setLogbookMainTab,
  logbookCategories,
  selectedFormKey,
  setSelectedFormKey,
  isIframeLoading,
  setIsIframeLoading,
  activeFormObj,
  currentUser,
  selectedReportIds,
  requestBulkDeleteReports,
  reportList,
  toggleSelectAllReports,
  toggleSelectReport,
  openEditReportModal,
  requestDeleteReport,
  handleCreateReport
}) {
  const [showCookieHelp, setShowCookieHelp] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [inputMode, setInputMode] = useState('web'); // 'web' | 'google_form'

  const currentFormObj = activeFormObj || logbookCategories.find(c => c.id === selectedFormKey) || logbookCategories[0] || {
    id: 'default',
    title: 'LOGBOOK AVSEC',
    url: '',
    nativeUrl: '',
    sheetsUrl: googleSheetsUrl
  };

  // State untuk form web langsung (native)
  const [formData, setFormData] = useState({
    lokasi: 'SCP 1 (Screening Penumpang)',
    waktu: '',
    pelapor: currentUser?.nama || '',
    ringkasan: '',
    status: 'Selesai'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Inisialisasi waktu dan pelapor
  useEffect(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setFormData(prev => ({
      ...prev,
      waktu: prev.waktu || `${hours}:${minutes} WITA`,
      pelapor: prev.pelapor || currentUser?.nama || ''
    }));
  }, [currentUser]);

  const quickLocations = [
    'SCP 1 (Screening Penumpang)',
    'SCP 2 (Screening Bagasi)',
    'Perimeter Pagar Runway',
    'Main Gate Access Airside',
    'Gedung Terminal Keberangkatan',
    'Pos Jaga Komando AVSEC'
  ];

  const handleCopyLink = () => {
    const link = currentFormObj.nativeUrl || currentFormObj.url;
    if (navigator?.clipboard && link) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSubmitWebReport = async (e) => {
    e.preventDefault();
    if (!formData.lokasi.trim() || !formData.pelapor.trim() || !formData.ringkasan.trim()) {
      alert('Mohon lengkapi lokasi, nama pelapor, dan ringkasan temuan.');
      return;
    }

    setIsSubmitting(true);
    const newReport = {
      tipe: currentFormObj.title || 'Log Operasional AVSEC',
      lokasi: formData.lokasi.trim(),
      waktu: formData.waktu.trim() || `${new Date().getHours()}:${new Date().getMinutes()} WITA`,
      pelapor: formData.pelapor.trim(),
      status: formData.status,
      ringkasan: formData.ringkasan.trim()
    };

    if (handleCreateReport) {
      const res = await handleCreateReport(newReport);
      if (res && res.success) {
        setSubmitSuccess(true);
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        setFormData(prev => ({
          ...prev,
          ringkasan: '',
          waktu: `${hours}:${minutes} WITA`
        }));
        setTimeout(() => setSubmitSuccess(false), 6000);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pelaporan & Log Operasional</h1>
          <p className="text-slate-500 text-sm mt-1">Pencatatan logbook AVSEC terpusat langsung di web atau via Google Forms.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLogbookMainTab('form')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${logbookMainTab === 'form' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <PlusCircle className="w-4 h-4" /> Tab 1: Input Laporan Baru
          </button>
          <button
            onClick={() => setLogbookMainTab('rekap')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${logbookMainTab === 'rekap' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <FileCheck className="w-4 h-4" /> Tab 2: Riwayat & Rekap Log ({reportList.length})
          </button>
        </div>
      </header>

      {/* TAB 1: INPUT LAPORAN BARU */}
      {logbookMainTab === 'form' && (
        <div className="space-y-5">
          {/* Switcher Mode Input: Form Web Langsung vs Google Form */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setInputMode('web')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  inputMode === 'web'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                Formulir Cepat Web (Rekomendasi HP)
              </button>
              <button
                type="button"
                onClick={() => setInputMode('google_form')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  inputMode === 'google_form'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Google Form Eksternal
              </button>
            </div>

            <div className="text-xs text-slate-500 px-3 hidden md:block">
              {inputMode === 'web' ? (
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Bebas kendala cookie & otomatis masuk ke Riwayat Rekap Log
                </span>
              ) : (
                <span className="text-amber-700 font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Menggunakan formulir Google Forms bawaan
                </span>
              )}
            </div>
          </div>

          {/* Kategori Selector Buttons (Dynamic) */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">Pilih Kategori Logbook:</span>
            {logbookCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedFormKey(cat.id); setIsIframeLoading(true); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedFormKey === cat.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {cat.title}
              </button>
            ))}

            {inputMode === 'google_form' && (
              <a
                href={currentFormObj.nativeUrl || currentFormObj.url}
                target="_blank"
                rel="noreferrer"
                className="ml-auto flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
              >
                Buka Form di Tab Baru <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* ================= MODE 1: FORMULIR CEPAT WEB NATIVE ================= */}
          {inputMode === 'web' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="p-5 sm:p-6 bg-gradient-to-r from-blue-900 via-slate-900 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30">
                      Input Langsung di Web
                    </span>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> Bebas Cookie HP
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mt-2">{currentFormObj.title}</h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Laporan yang dikirim dari formulir ini langsung tersimpan ke database portal dan seketika masuk ke Rekap Log.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setLogbookMainTab('rekap')}
                  className="self-start sm:self-center px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4 text-emerald-400" /> Lihat Riwayat ({reportList.length})
                </button>
              </div>

              {submitSuccess && (
                <div className="m-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between gap-3 animate-fadeIn">
                  <div className="flex items-center gap-2.5 text-xs font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Laporan berhasil dikirim dan langsung masuk ke Riwayat Rekap Log!</span>
                  </div>
                  <button
                    onClick={() => setLogbookMainTab('rekap')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer"
                  >
                    Buka Rekap Log &rarr;
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmitWebReport} className="p-5 sm:p-7 space-y-6">
                {/* Quick Location Chips */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Pilih Cepat Titik Lokasi:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {quickLocations.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setFormData({ ...formData, lokasi: loc })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                          formData.lokasi === loc
                            ? 'bg-blue-600 text-white font-bold shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Lokasi Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600" /> Lokasi Titik Tugas <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lokasi}
                      onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                      placeholder="Contoh: SCP 1, Perimeter Runway 07, Main Gate..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Waktu Pelaporan */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-600" /> Waktu / Jam Pelaporan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.waktu}
                      onChange={(e) => setFormData({ ...formData, waktu: e.target.value })}
                      placeholder="Contoh: 08:30 WITA"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium font-mono"
                    />
                  </div>

                  {/* Petugas Pelapor */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-blue-600" /> Nama Petugas Pelapor <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.pelapor}
                      onChange={(e) => setFormData({ ...formData, pelapor: e.target.value })}
                      placeholder="Nama personel pelapor..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>

                  {/* Status Laporan */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Status Laporan <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Selesai', 'Ditangani', 'Dalam Proses'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setFormData({ ...formData, status: st })}
                          className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                            formData.status === st
                              ? st === 'Selesai'
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                : st === 'Ditangani'
                                ? 'bg-amber-500 border-amber-500 text-white shadow-xs'
                                : 'bg-blue-600 border-blue-600 text-white shadow-xs'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Ringkasan / Temuan */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Ringkasan Kegiatan / Temuan Operasional <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.ringkasan}
                    onChange={(e) => setFormData({ ...formData, ringkasan: e.target.value })}
                    placeholder="Tuliskan uraian hasil pemantauan, pemeriksaan personel/barang/kendaraan, atau tindakan yang telah diambil..."
                    className="w-full p-4 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all leading-relaxed font-medium"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
                  <p className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    Laporan akan otomatis memiliki ID Log baru (misal: RPT-XXXX) dan dapat dilihat di Tab 2.
                  </p>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="w-4 h-4 animate-spin" />
                        <span>Menyimpan Laporan...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Kirim & Simpan ke Rekap Log</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ================= MODE 2: GOOGLE FORM EKSTERNAL ================= */}
          {inputMode === 'google_form' && (
            <>
              {/* SMART MOBILE & COOKIE ASSISTANCE CARD */}
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50/70 border border-amber-200/90 rounded-2xl p-4 sm:p-5 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 bg-amber-500 text-white rounded-xl shadow-xs shrink-0 mt-0.5">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-sm text-slate-900">Akses Google Form via Smartphone / Masalah Cookie?</h3>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-amber-200/80 text-amber-900 rounded-full">
                          Penting untuk HP
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        Browser HP secara otomatis memblokir <em>third-party cookies</em> di dalam bingkai, sehingga Google Form dapat meminta verifikasi cookie. Anda bisa beralih ke <strong>Formulir Cepat Web</strong> di atas atau gunakan tombol di samping untuk membuka form di tab baru.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href={currentFormObj.nativeUrl || currentFormObj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-sm transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> Buka Form Langsung (Rekomendasi HP)
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                      title="Salin tautan formulir Google Form"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-500" />
                          <span>Salin Link</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowCookieHelp(!showCookieHelp)}
                      className="flex items-center gap-1 text-xs font-semibold text-amber-900 hover:text-amber-950 bg-amber-200/60 hover:bg-amber-200 px-3 py-2.5 rounded-xl transition-all cursor-pointer"
                    >
                      <HelpCircle className="w-4 h-4 text-amber-700" />
                      <span>Panduan Cookie</span>
                      {showCookieHelp ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
                    </button>
                  </div>
                </div>

                {/* Collapsible Guidance Accordion */}
                {showCookieHelp && (
                  <div className="mt-4 pt-4 border-t border-amber-200 text-xs text-slate-700 space-y-3 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white/80 p-3 rounded-xl border border-amber-200/70">
                        <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-blue-700">
                          <Compass className="w-3.5 h-3.5" /> Google Chrome (Android / HP)
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-slate-600">
                          <li>Buka aplikasi <strong>Chrome</strong> di HP Anda.</li>
                          <li>Ketuk titik tiga di pojok kanan atas &gt; pilih <strong>Setelan</strong>.</li>
                          <li>Pilih <strong>Setelan Situs</strong> &gt; <strong>Cookie Pihak Ketiga</strong>.</li>
                          <li>Pilih <strong>Izinkan cookie pihak ketiga</strong> (atau gunakan tombol <em>"Buka Form Langsung"</em> di atas).</li>
                        </ol>
                      </div>
                      <div className="bg-white/80 p-3 rounded-xl border border-amber-200/70">
                        <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-indigo-700">
                          <ShieldAlert className="w-3.5 h-3.5" /> Safari / iPhone (iOS)
                        </h4>
                        <ol className="list-decimal list-inside space-y-1 text-slate-600">
                          <li>Buka <strong>Pengaturan (Settings)</strong> iPhone.</li>
                          <li>Gulir ke bawah dan pilih <strong>Safari</strong>.</li>
                          <li>Pada bagian Privasi & Keamanan, matikan <strong>"Cegah Pelacakan Lintas Situs"</strong> (Prevent Cross-Site Tracking).</li>
                          <li>Atau cukup beralih ke <strong>Formulir Cepat Web</strong> untuk mengisi tanpa perlu ubah setelan.</li>
                        </ol>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Embed Container */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden relative min-h-[780px]">
                {/* Top Bar above Iframe */}
                <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Tampilan Embed Form: <span className="font-bold text-slate-900">{currentFormObj.title}</span>
                  </span>
                  <a
                    href={currentFormObj.nativeUrl || currentFormObj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                  >
                    Buka Layar Penuh <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {isIframeLoading && (
                  <div className="absolute inset-0 bg-white/90 z-10 flex flex-col items-center justify-center space-y-3">
                    <Clock className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-sm font-bold text-slate-700">Memuat {currentFormObj.title}...</p>
                  </div>
                )}
                <iframe
                  src={currentFormObj.url}
                  onLoad={() => setIsIframeLoading(false)}
                  className="w-full h-[780px] border-0"
                  title={currentFormObj.title}
                  allow="camera; microphone; geolocation"
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: RIWAYAT & REKAP LOG (GOOGLE SHEETS / TABLE) */}
      {logbookMainTab === 'rekap' && (
        <div className="space-y-5">
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Rekapitulasi Data Logbook Google Sheets</h3>
              <p className="text-xs text-slate-500 mt-0.5">Tampilan data tanggapan yang terhubung langsung dengan spreadsheet internal.</p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {currentUser?.role === 'ADMIN' && selectedReportIds.length > 0 && (
                <button
                  onClick={requestBulkDeleteReports}
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Hapus Masal ({selectedReportIds.length})
                </button>
              )}
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 text-slate-600" /> Ekspor PDF / Cetak Laporan
              </button>
              <a
                href={currentFormObj.sheetsUrl || googleSheetsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                Buka Google Sheets Full <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider">Log Operasional Terdaftar ({reportList.length})</h4>
              <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Sync Google Sheets
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                    {currentUser?.role === 'ADMIN' && (
                      <th className="p-4 w-10 text-center">
                        <input
                          type="checkbox"
                          checked={selectedReportIds.length === reportList.length && reportList.length > 0}
                          onChange={toggleSelectAllReports}
                          className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </th>
                    )}
                    <th className="p-4">ID Log</th>
                    <th className="p-4">Jenis Laporan</th>
                    <th className="p-4">Lokasi Titik Tugas</th>
                    <th className="p-4">Waktu</th>
                    <th className="p-4">Petugas Pelapor</th>
                    <th className="p-4">Ringkasan / Temuan</th>
                    <th className="p-4">Status</th>
                    {currentUser?.role === 'ADMIN' && (
                      <th className="p-4 text-center">Aksi (Admin)</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {reportList.map((rpt) => (
                    <tr key={rpt.id} className={`hover:bg-slate-50 transition-colors ${selectedReportIds.includes(rpt.id) ? 'bg-blue-50/50' : ''}`}>
                      {currentUser?.role === 'ADMIN' && (
                        <td className="p-4 text-center">
                          <input
                            type="checkbox"
                            checked={selectedReportIds.includes(rpt.id)}
                            onChange={() => toggleSelectReport(rpt.id)}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                        </td>
                      )}
                      <td className="p-4 font-mono font-bold text-slate-900">{rpt.id}</td>
                      <td className="p-4 font-bold text-slate-800">{rpt.tipe}</td>
                      <td className="p-4 font-medium text-slate-600">{rpt.lokasi}</td>
                      <td className="p-4 font-mono text-slate-500">{rpt.waktu}</td>
                      <td className="p-4 font-semibold text-slate-800">{rpt.pelapor}</td>
                      <td className="p-4 max-w-xs truncate text-slate-600" title={rpt.ringkasan}>{rpt.ringkasan}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${rpt.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {rpt.status}
                        </span>
                      </td>
                      {currentUser?.role === 'ADMIN' && (
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => openEditReportModal(rpt)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer border border-blue-200"
                              title="Edit Record Log"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => requestDeleteReport(rpt.id)}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer border border-red-200"
                              title="Hapus Record Log"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
