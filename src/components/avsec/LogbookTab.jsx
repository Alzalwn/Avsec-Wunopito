import React from 'react';
import {
  PlusCircle,
  FileCheck,
  ExternalLink,
  Clock,
  Trash2,
  Printer,
  Edit3
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
  requestDeleteReport
}) {
  const currentFormObj = activeFormObj || logbookCategories.find(c => c.id === selectedFormKey) || logbookCategories[0] || {
    id: 'default',
    title: 'LOGBOOK AVSEC',
    url: '',
    nativeUrl: '',
    sheetsUrl: googleSheetsUrl
  };

  return (
    <div className="space-y-6">
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

      {/* TAB 1: INPUT LAPORAN BARU (GOOGLE FORM EMBED) */}
      {logbookMainTab === 'form' && (
        <div className="space-y-5">
          {/* Logbook Selector Buttons (Dynamic) */}
          <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider px-2">Pilih Form Logbook:</span>
            {logbookCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedFormKey(cat.id); setIsIframeLoading(true); }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${selectedFormKey === cat.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {cat.title}
              </button>
            ))}

            <a
              href={currentFormObj.nativeUrl}
              target="_blank"
              rel="noreferrer"
              className="ml-auto flex items-center gap-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
            >
              Buka Form di Tab Baru <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Form Embed Container */}
          <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden relative min-h-[780px]">
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
            />
          </div>
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
