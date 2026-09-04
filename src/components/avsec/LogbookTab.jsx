'use client';
import React, { useState, useMemo } from 'react';
import {
  PlusCircle,
  FileCheck,
  ExternalLink,
  Clock,
  Trash2,
  Printer,
  Edit3,
  Smartphone,
  HelpCircle,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  ShieldAlert,
  Compass,
  Calendar,
  Filter,
  Search,
  Table as TableIcon,
  FileSpreadsheet,
  Layers,
  RefreshCw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { googleSheetsUrl } from '../../utils/helpers.js';

const MONTH_NAMES = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
  'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'
];

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
  openEditLogbookModal
}) {
  const [showCookieHelp, setShowCookieHelp] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Tab 2 Specific States
  const [rekapViewMode, setRekapViewMode] = useState('table'); // 'table' | 'sheet_embed'
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedMonth, setSelectedMonth] = useState(8); // 8 = September (current month index 0-11) or 'ALL'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [tableCategoryFilter, setTableCategoryFilter] = useState('ALL');
  const [isSheetIframeLoading, setIsSheetIframeLoading] = useState(true);

  const currentFormObj = activeFormObj || logbookCategories.find(c => c.id === selectedFormKey) || logbookCategories[0] || {
    id: 'default',
    title: 'LOGBOOK AVSEC',
    url: '',
    nativeUrl: '',
    sheetsUrl: googleSheetsUrl
  };

  const handleCopyLink = (text) => {
    const link = text || currentFormObj.nativeUrl || currentFormObj.url;
    if (navigator?.clipboard && link) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Convert Google Sheets URL to safe embed URL
  const getSheetsEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('/pubhtml') || url.includes('/htmlembed')) return url;
    return url.replace(/\/edit(\?.*)?$/, '/preview?rm=minimal');
  };

  // Date parsing helper
  const parseReportDate = (rpt) => {
    if (rpt.created_at) {
      const d = new Date(rpt.created_at);
      if (!isNaN(d.getTime())) return d;
    }
    if (rpt.tanggal) {
      const d = new Date(rpt.tanggal);
      if (!isNaN(d.getTime())) return d;
    }
    if (rpt.waktu) {
      const isoMatch = rpt.waktu.match(/(\d{4})[-/](\d{1,2})[-/](\d{1,2})/);
      if (isoMatch) {
        return new Date(parseInt(isoMatch[1], 10), parseInt(isoMatch[2], 10) - 1, parseInt(isoMatch[3], 10));
      }
      const dmyMatch = rpt.waktu.match(/(\d{1,2})[-/](\d{1,2})[-/](\d{4})/);
      if (dmyMatch) {
        return new Date(parseInt(dmyMatch[3], 10), parseInt(dmyMatch[2], 10) - 1, parseInt(dmyMatch[1], 10));
      }
    }
    // Fallback for initial mock records: September 2026
    return new Date(2026, 8, 4);
  };

  // Extract available years from reportList
  const availableYears = useMemo(() => {
    const yearsSet = new Set([2026, 2025]);
    reportList.forEach((rpt) => {
      const d = parseReportDate(rpt);
      yearsSet.add(d.getFullYear());
    });
    return Array.from(yearsSet).sort((a, b) => b - a);
  }, [reportList]);

  // Compute record count per month for selected year
  const monthlyCounts = useMemo(() => {
    const counts = Array(12).fill(0);
    reportList.forEach((rpt) => {
      const d = parseReportDate(rpt);
      if (d.getFullYear() === selectedYear) {
        counts[d.getMonth()]++;
      }
    });
    return counts;
  }, [reportList, selectedYear]);

  // Filtered reports for Tab 2
  const filteredReports = useMemo(() => {
    return reportList.filter((rpt) => {
      const d = parseReportDate(rpt);
      
      // Filter Year
      if (d.getFullYear() !== selectedYear) return false;

      // Filter Month
      if (selectedMonth !== 'ALL' && d.getMonth() !== selectedMonth) return false;

      // Filter Category (if not 'ALL')
      if (tableCategoryFilter !== 'ALL') {
        const cat = logbookCategories.find(c => c.id === tableCategoryFilter);
        if (cat) {
          const catTitle = cat.title.toLowerCase();
          const rptTipe = (rpt.tipe || '').toLowerCase();
          const matchTitle = rptTipe.includes(catTitle.replace('logbook', '').trim()) ||
                             catTitle.includes(rptTipe.replace('log', '').trim());
          if (!matchTitle && rpt.kategori_id !== tableCategoryFilter) {
            return false;
          }
        }
      }

      // Filter Status
      if (statusFilter !== 'ALL' && rpt.status !== statusFilter) return false;

      // Filter Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchId = (rpt.id || '').toLowerCase().includes(q);
        const matchTipe = (rpt.tipe || '').toLowerCase().includes(q);
        const matchLokasi = (rpt.lokasi || '').toLowerCase().includes(q);
        const matchPelapor = (rpt.pelapor || '').toLowerCase().includes(q);
        const matchRingkasan = (rpt.ringkasan || '').toLowerCase().includes(q);
        if (!matchId && !matchTipe && !matchLokasi && !matchPelapor && !matchRingkasan) {
          return false;
        }
      }

      return true;
    });
  }, [reportList, selectedYear, selectedMonth, tableCategoryFilter, statusFilter, searchQuery, logbookCategories]);

  // Grouped reports by month (used when 'ALL' months is selected)
  const groupedReportsByMonth = useMemo(() => {
    if (selectedMonth !== 'ALL') return null;
    const groups = {};
    filteredReports.forEach((rpt) => {
      const d = parseReportDate(rpt);
      const mIdx = d.getMonth();
      if (!groups[mIdx]) {
        groups[mIdx] = {
          monthIndex: mIdx,
          monthName: MONTH_NAMES[mIdx],
          reports: []
        };
      }
      groups[mIdx].reports.push(rpt);
    });
    // Sort descending by month
    return Object.values(groups).sort((a, b) => b.monthIndex - a.monthIndex);
  }, [filteredReports, selectedMonth]);

  // Stats for the active period
  const stats = useMemo(() => {
    const total = filteredReports.length;
    const selesai = filteredReports.filter(r => r.status === 'Selesai').length;
    const ditangani = filteredReports.filter(r => r.status === 'Ditangani' || r.status === 'Pending').length;
    return { total, selesai, ditangani };
  }, [filteredReports]);

  return (
    <div className="space-y-6">
      {/* HEADER UTAMA */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pelaporan & Log Operasional</h1>
          <p className="text-slate-500 text-sm mt-1">Integrasi Google Form & Google Sheets untuk pencatatan logbook AVSEC terpusat.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setLogbookMainTab('form')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${logbookMainTab === 'form' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <PlusCircle className="w-4 h-4" /> Tab 1: Input Laporan Baru (Google Form)
          </button>
          <button
            onClick={() => setLogbookMainTab('rekap')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${logbookMainTab === 'rekap' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'}`}
          >
            <FileCheck className="w-4 h-4" /> Tab 2: Riwayat & Rekap Log (Google Sheets)
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* TAB 1: INPUT LAPORAN BARU (GOOGLE FORM EMBED)            */}
      {/* ========================================================= */}
      {logbookMainTab === 'form' && (
        <div className="space-y-5">
          {/* Logbook Selector Buttons (Dynamic) */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" /> Pilih Logbook ({logbookCategories.length}):
            </span>
            {logbookCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedFormKey(cat.id); setIsIframeLoading(true); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedFormKey === cat.id ? 'bg-slate-900 text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {cat.title}
              </button>
            ))}

            <a
              href={currentFormObj.nativeUrl || currentFormObj.url}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
            >
              Buka Form di Tab Baru <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

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
                    Browser HP (seperti Chrome & Safari) secara otomatis memblokir <em>third-party cookies</em> di dalam bingkai, sehingga Google Form dapat menampilkan pesan meminta izin cookie atau tidak bisa diisi. Gunakan tombol di samping untuk langsung membuka form di browser HP tanpa hambatan cookie.
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
                  <ExternalLink className="w-4 h-4" /> Buka Form Langsung (Bebas Cookie HP)
                </a>
                <button
                  type="button"
                  onClick={() => handleCopyLink(currentFormObj.nativeUrl || currentFormObj.url)}
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
                      <li>Pilih <strong>Izinkan cookie pihak ketiga</strong> (atau cukup tekan tombol <em>"Buka Form Langsung"</em> di atas).</li>
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
                      <li>Atau cukup tekan tombol <strong>"Buka Form Langsung"</strong> untuk membuka di tab baru tanpa perlu ubah setelan.</li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Form Embed Container */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden relative min-h-[780px]">
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
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: RIWAYAT & REKAP LOG (GOOGLE SHEETS / TABLE)        */}
      {/* ========================================================= */}
      {logbookMainTab === 'rekap' && (
        <div className="space-y-6">

          {/* 1. KATEGORI SELECTOR YANG MENYESUAIKAN JUMLAH LOGBOOK */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Pilih Kategori Logbook Google Sheets</h3>
                  <p className="text-xs text-slate-500">Tampilan dan spreadsheet menyesuaikan dengan logbook aktif yang dipilih ({logbookCategories.length} Logbook terdaftar).</p>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0">
                <button
                  type="button"
                  onClick={() => setRekapViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${rekapViewMode === 'table' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <TableIcon className="w-3.5 h-3.5" /> Tabel Log (Per Bulan)
                </button>
                <button
                  type="button"
                  onClick={() => { setRekapViewMode('sheet_embed'); setIsSheetIframeLoading(true); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${rekapViewMode === 'sheet_embed' ? 'bg-white text-emerald-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" /> Spreadsheet Live (Google Sheets)
                </button>
              </div>
            </div>

            {/* Dynamic Buttons for each Logbook Category */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Logbook:</span>
              {logbookCategories.map((cat) => {
                const isSelected = selectedFormKey === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedFormKey(cat.id);
                      setIsSheetIframeLoading(true);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow-sm ring-2 ring-slate-900 ring-offset-1'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
                    {cat.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. ACTIVE LOGBOOK INFO & ACTIONS BAR */}
          <div className="bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-transparent border border-emerald-200/80 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-xs shrink-0">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                    Google Sheets Aktif
                  </span>
                  <h2 className="text-base font-bold text-slate-900">{currentFormObj.title}</h2>
                </div>
                <p className="text-xs text-slate-600 truncate max-w-xl font-mono" title={currentFormObj.sheetsUrl || googleSheetsUrl}>
                  {currentFormObj.sheetsUrl || googleSheetsUrl}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {currentUser?.role === 'ADMIN' && selectedReportIds.length > 0 && (
                <button
                  onClick={requestBulkDeleteReports}
                  className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Hapus Masal ({selectedReportIds.length})
                </button>
              )}

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
                title="Cetak atau ekspor tabel log per bulan ke PDF"
              >
                <Printer className="w-4 h-4 text-slate-600" /> Ekspor PDF / Cetak
              </button>

              <a
                href={currentFormObj.sheetsUrl || googleSheetsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all"
              >
                Buka Google Sheets Full <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {currentUser?.role === 'ADMIN' && openEditLogbookModal && (
                <button
                  type="button"
                  onClick={() => openEditLogbookModal(currentFormObj)}
                  className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                  title="Ubah atau tempel link Google Sheets untuk logbook ini"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Tempel Link Sheets
                </button>
              )}
            </div>
          </div>

          {/* ========================================================= */}
          {/* SUB-VIEW 1: TABEL LOG OPERASIONAL TERDAFTAR (PER BULAN)   */}
          {/* ========================================================= */}
          {rekapViewMode === 'table' && (
            <div className="space-y-4">
              {/* FILTER PER BULAN & TAHUN */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                {/* Baris Atas: Pemilih Tahun & Pencarian */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Tahun:</span>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
                      className="px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      {availableYears.map((yr) => (
                        <option key={yr} value={yr}>Tahun {yr}</option>
                      ))}
                    </select>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedYear(2026);
                        setSelectedMonth(8); // September
                      }}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ml-1"
                    >
                      Bulan Ini (Sep 2026)
                    </button>
                  </div>

                  {/* Filter Tambahan & Pencarian */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Cari ID, pelapor, lokasi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 sm:w-56"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    >
                      <option value="ALL">Semua Status</option>
                      <option value="Selesai">Selesai</option>
                      <option value="Ditangani">Ditangani</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>

                {/* SEGMENTED MONTH PILLS (JANUARI - DESEMBER + SEMUA BULAN) */}
                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span className="font-bold flex items-center gap-1.5 text-slate-700">
                      <Filter className="w-3.5 h-3.5 text-blue-600" /> Filter Bulan:
                    </span>
                    <span className="text-[11px]">
                      {selectedMonth === 'ALL'
                        ? `Menampilkan Seluruh Bulan Tahun ${selectedYear}`
                        : `Menampilkan Bulan ${MONTH_NAMES[selectedMonth]} ${selectedYear}`}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-thin">
                    <button
                      type="button"
                      onClick={() => setSelectedMonth('ALL')}
                      className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                        selectedMonth === 'ALL'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <span>Semua Bulan</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedMonth === 'ALL' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700 font-extrabold'}`}>
                        {reportList.filter(r => parseReportDate(r).getFullYear() === selectedYear).length}
                      </span>
                    </button>

                    {MONTH_SHORT.map((mShort, idx) => {
                      const count = monthlyCounts[idx];
                      const isSelected = selectedMonth === idx;
                      return (
                        <button
                          key={mShort}
                          type="button"
                          onClick={() => setSelectedMonth(idx)}
                          className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-600 ring-offset-1'
                              : count > 0
                              ? 'bg-blue-50 text-blue-800 hover:bg-blue-100 border border-blue-200/60'
                              : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                          }`}
                        >
                          <span>{mShort}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                            isSelected
                              ? 'bg-blue-700 text-white'
                              : count > 0
                              ? 'bg-blue-200 text-blue-900 font-bold'
                              : 'bg-slate-200/80 text-slate-500'
                          }`}>
                            {count}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SUMMARY STATS PER BULAN */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                    <span className="text-[11px] font-bold text-slate-500 block uppercase">Periode Aktif</span>
                    <span className="text-sm font-black text-slate-900">
                      {selectedMonth === 'ALL' ? `Semua Bulan ${selectedYear}` : `${MONTH_NAMES[selectedMonth]} ${selectedYear}`}
                    </span>
                  </div>
                  <div className="bg-blue-50/60 p-3 rounded-xl border border-blue-200/60">
                    <span className="text-[11px] font-bold text-blue-600 block uppercase">Total Log Tercatat</span>
                    <span className="text-sm font-black text-blue-900">{stats.total} Catatan</span>
                  </div>
                  <div className="bg-emerald-50/60 p-3 rounded-xl border border-emerald-200/60">
                    <span className="text-[11px] font-bold text-emerald-600 block uppercase">Status Selesai</span>
                    <span className="text-sm font-black text-emerald-900">{stats.selesai} Log</span>
                  </div>
                  <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                    <span className="text-[11px] font-bold text-amber-600 block uppercase">Ditangani / Pending</span>
                    <span className="text-sm font-black text-amber-900">{stats.ditangani} Log</span>
                  </div>
                </div>
              </div>

              {/* TABEL DATA LOG OPERASIONAL */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
                <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <TableIcon className="w-4 h-4 text-blue-600" />
                      Log Operasional Terdaftar ({filteredReports.length})
                      {selectedMonth !== 'ALL' && (
                        <span className="text-blue-600 font-bold">
                          — Bulan {MONTH_NAMES[selectedMonth]} {selectedYear}
                        </span>
                      )}
                    </h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-slate-500">
                      Logbook: <strong className="text-slate-800">{currentFormObj.title}</strong>
                    </span>
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Sync Sheets
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                        {currentUser?.role === 'ADMIN' && (
                          <th className="p-4 w-10 text-center">
                            <input
                              type="checkbox"
                              checked={selectedReportIds.length === filteredReports.length && filteredReports.length > 0}
                              onChange={toggleSelectAllReports}
                              className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                          </th>
                        )}
                        <th className="p-4">ID Log</th>
                        <th className="p-4">Jenis Laporan</th>
                        <th className="p-4">Lokasi Titik Tugas</th>
                        <th className="p-4">Tanggal & Waktu</th>
                        <th className="p-4">Petugas Pelapor</th>
                        <th className="p-4">Ringkasan / Temuan</th>
                        <th className="p-4">Status</th>
                        {currentUser?.role === 'ADMIN' && (
                          <th className="p-4 text-center">Aksi (Admin)</th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {/* JIKA MEMILIH SATU BULAN SPESIFIK */}
                      {selectedMonth !== 'ALL' && filteredReports.length > 0 && (
                        filteredReports.map((rpt) => (
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
                            <td className="p-4 font-mono text-slate-500">
                              {rpt.tanggal ? `${rpt.tanggal} • ` : ''}{rpt.waktu}
                            </td>
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
                        ))
                      )}

                      {/* JIKA MEMILIH 'SEMUA BULAN', TAMPILKAN DIKELOMPOKKAN PER BULAN */}
                      {selectedMonth === 'ALL' && groupedReportsByMonth && groupedReportsByMonth.length > 0 && (
                        groupedReportsByMonth.map((grp) => (
                          <React.Fragment key={grp.monthIndex}>
                            {/* Monthly Group Header Banner */}
                            <tr className="bg-slate-100/80 border-y border-slate-200">
                              <td colSpan={currentUser?.role === 'ADMIN' ? 9 : 8} className="px-4 py-2.5">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs text-slate-900 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    Bulan {grp.monthName} {selectedYear}
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-extrabold">
                                      {grp.reports.length} Catatan
                                    </span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setSelectedMonth(grp.monthIndex)}
                                    className="text-[11px] font-bold text-blue-600 hover:underline cursor-pointer"
                                  >
                                    Fokus Bulan Ini &rarr;
                                  </button>
                                </div>
                              </td>
                            </tr>

                            {grp.reports.map((rpt) => (
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
                                <td className="p-4 font-mono text-slate-500">
                                  {rpt.tanggal ? `${rpt.tanggal} • ` : ''}{rpt.waktu}
                                </td>
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
                          </React.Fragment>
                        ))
                      )}

                      {/* EMPTY STATE */}
                      {filteredReports.length === 0 && (
                        <tr>
                          <td colSpan={currentUser?.role === 'ADMIN' ? 9 : 8} className="p-10 text-center text-slate-400">
                            <div className="max-w-md mx-auto space-y-2">
                              <Calendar className="w-10 h-10 mx-auto text-slate-300" />
                              <p className="font-bold text-slate-700 text-sm">
                                Tidak ada log operasional untuk periode {selectedMonth === 'ALL' ? `Tahun ${selectedYear}` : `${MONTH_NAMES[selectedMonth]} ${selectedYear}`}
                              </p>
                              <p className="text-xs text-slate-500">
                                Data laporan yang diinputkan via Google Form atau form logbook akan otomatis tercatat dan tersinkronisasi di rekapitulasi bulan terkait.
                              </p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* SUB-VIEW 2: TAMPILAN SPREADSHEET LIVE (GOOGLE SHEETS)     */}
          {/* ========================================================= */}
          {rekapViewMode === 'sheet_embed' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden relative min-h-[750px]">
                {/* Header Toolbar Iframe */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-bold text-slate-800">
                      Live Google Sheets: <span className="text-emerald-700">{currentFormObj.title}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsSheetIframeLoading(true)}
                      className="flex items-center gap-1 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Muat Ulang
                    </button>
                    <a
                      href={currentFormObj.sheetsUrl || googleSheetsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-700 hover:text-emerald-900 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-lg font-bold transition-all"
                    >
                      Buka di Tab Baru <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Loading state for Sheet Embed */}
                {isSheetIframeLoading && (
                  <div className="absolute inset-0 bg-white/95 z-10 flex flex-col items-center justify-center space-y-3">
                    <Clock className="w-8 h-8 text-emerald-600 animate-spin" />
                    <p className="text-sm font-bold text-slate-700">Menghubungkan ke Google Sheets {currentFormObj.title}...</p>
                    <p className="text-xs text-slate-400 max-w-sm text-center">Memuat isi lembar kerja dan tab bulanan dari spreadsheet internal.</p>
                  </div>
                )}

                <iframe
                  src={getSheetsEmbedUrl(currentFormObj.sheetsUrl || googleSheetsUrl)}
                  onLoad={() => setIsSheetIframeLoading(false)}
                  className="w-full h-[750px] border-0"
                  title={`Google Sheet - ${currentFormObj.title}`}
                  allow="clipboard-read; clipboard-write"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs text-slate-600 flex items-center justify-between">
                <span>Spreadsheet ini mencakup seluruh tab lembar kerja per bulan yang dikelola oleh AVSEC Bandara Wunopito.</span>
                <a
                  href={currentFormObj.sheetsUrl || googleSheetsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-700 font-bold hover:underline shrink-0 ml-4"
                >
                  Buka Spreadsheet Utuh &rarr;
                </a>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
