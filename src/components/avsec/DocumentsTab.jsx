'use client';
import React from 'react';
import { Plus, Search, FileText, Edit3, ExternalLink } from 'lucide-react';

export default function DocumentsTab({
  docList,
  docSearch,
  setDocSearch,
  docCategory,
  setDocCategory,
  currentUser,
  changeTabWithLoading,
  setAdminSubTab,
  openAddDocModal,
  openEditDocModal
}) {
  const filteredDocs = docList.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(docSearch.toLowerCase()) || d.nomor.toLowerCase().includes(docSearch.toLowerCase());
    const matchesCat = docCategory === 'Semua Kategori' || d.kategori === docCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pusat SOP & Regulasi Aviation Security</h1>
          <p className="text-slate-500 text-sm mt-1">Akses cepat dokumen acuan kerja, peraturan menteri/dirjen, dan instruksi kerja resmi.</p>
        </div>
        {currentUser?.role === 'ADMIN' && (
          <button
            onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('documents'); openAddDocModal(); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer self-start"
          >
            <Plus className="w-4 h-4" /> Upload Dokumen Baru
          </button>
        )}
      </header>

      {/* Toolbar Filter */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-200/80 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            placeholder="Cari real-time berdasarkan judul atau kode dokumen..."
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50"
          />
        </div>

        <select
          value={docCategory}
          onChange={(e) => setDocCategory(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50 font-medium text-slate-700"
        >
          <option>Semua Kategori</option>
          <option>Regulasi Dirjen</option>
          <option>Prosedur</option>
          <option>Instruksi Kerja</option>
          <option>SKP/Lisensi Personel</option>
        </select>
      </div>

      {/* Tabel Dokumen */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="p-4">Kode & Judul Dokumen</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Versi / Tahun</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-red-50 text-red-600 rounded-xl flex-shrink-0 mt-0.5 border border-red-100">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="font-mono text-[11px] font-bold text-slate-500">{doc.nomor}</span>
                        <h3 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{doc.title}</h3>
                        <p className="text-slate-500 text-xs mt-0.5">{doc.deskripsi}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${doc.kategori === 'Regulasi Dirjen' ? 'bg-purple-100 text-purple-700 border border-purple-200' : doc.kategori === 'Prosedur' ? 'bg-blue-100 text-blue-700 border border-blue-200' : doc.kategori === 'SKP/Lisensi Personel' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                      {doc.kategori}
                    </span>
                  </td>
                  <td className="p-4 font-mono font-bold text-slate-600">{doc.versi}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {currentUser?.role === 'ADMIN' && (
                        <button
                          onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('documents'); openEditDocModal(doc); }}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                          title="Edit Dokumen"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                      <a
                        href={doc.drive_url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-xl font-bold text-xs shadow-xs transition-all"
                      >
                        Buka di Drive <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
