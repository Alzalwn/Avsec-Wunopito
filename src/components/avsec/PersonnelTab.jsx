import React from 'react';
import { Plus, Search, Edit3 } from 'lucide-react';

export default function PersonnelTab({
  personnelList,
  personnelSearch,
  setPersonnelSearch,
  licenseFilter,
  setLicenseFilter,
  currentUser,
  changeTabWithLoading,
  setAdminSubTab,
  openAddPersonnelModal,
  openEditPersonnelModal,
  showNotification
}) {
  const filteredPersonnel = personnelList.filter(p => {
    const matchesSearch = p.nama.toLowerCase().includes(personnelSearch.toLowerCase()) || p.id_pas.toLowerCase().includes(personnelSearch.toLowerCase()) || p.jabatan.toLowerCase().includes(personnelSearch.toLowerCase());
    const matchesFilter = licenseFilter === 'Semua' || p.status_lisensi === licenseFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Direktori Personel AVSEC</h1>
          <p className="text-slate-500 text-sm mt-1">Data anggota, sertifikasi lisensi (SKP), dan masa berlaku.</p>
        </div>
        {currentUser?.role === 'ADMIN' && (
          <button
            onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('personnel'); openAddPersonnelModal(); }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer self-start"
          >
            <Plus className="w-4 h-4" /> Tambah Personel
          </button>
        )}
      </header>

      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-3">
          <div className="relative w-full sm:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={personnelSearch}
              onChange={(e) => setPersonnelSearch(e.target.value)}
              placeholder="Cari nama, ID Pas, atau jabatan..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-slate-500 font-semibold">Status:</span>
            <select
              value={licenseFilter}
              onChange={(e) => setLicenseFilter(e.target.value)}
              className="px-3 py-1.5 border border-slate-300 rounded-xl text-xs bg-slate-50 font-medium text-slate-700"
            >
              <option>Semua</option>
              <option>Aktif</option>
              <option>Mendekati Expired</option>
              <option>Kedaluwarsa</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="p-4">Nama Lengkap</th>
                <th className="p-4">ID Pas</th>
                <th className="p-4">Jabatan</th>
                <th className="p-4">Kualifikasi Lisensi</th>
                <th className="p-4">Masa Berlaku</th>
                <th className="p-4">Status Lisensi</th>
                <th className="p-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPersonnel.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{p.nama}</td>
                  <td className="p-4 font-mono font-semibold text-slate-600">{p.id_pas}</td>
                  <td className="p-4 font-medium">{p.jabatan}</td>
                  <td className="p-4">
                    <span className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-bold text-[11px] border border-slate-200">
                      {p.lisensi}
                    </span>
                  </td>
                  <td className="p-4 font-mono">{p.masa_berlaku}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${p.status_lisensi === 'Aktif' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : p.status_lisensi === 'Kedaluwarsa' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${p.status_lisensi === 'Aktif' ? 'bg-emerald-500' : p.status_lisensi === 'Kedaluwarsa' ? 'bg-red-500' : 'bg-amber-500'}`} />
                      {p.status_lisensi}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {currentUser?.role === 'ADMIN' && (
                        <button
                          onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('personnel'); openEditPersonnelModal(p); }}
                          className="text-slate-400 hover:text-blue-600 p-1 rounded cursor-pointer"
                          title="Edit Personel"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => openEditPersonnelModal(p)}
                        className="text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer ml-1"
                      >
                        Detail & Edit
                      </button>
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
