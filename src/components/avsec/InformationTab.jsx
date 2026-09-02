'use client';
import React from 'react';
import { Megaphone, Phone, Plus, Edit3, Trash2 } from 'lucide-react';

export default function InformationTab({
  announcements,
  emergencyContacts,
  currentUser,
  changeTabWithLoading,
  setAdminSubTab,
  openAddAnnouncementModal,
  openEditAnnouncementModal,
  handleDeleteAnnouncement,
  openAddContactModal,
  openEditContactModal,
  handleDeleteContact
}) {
  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Pengumuman & Informasi Security</h1>
          <p className="text-slate-500 text-sm mt-1">Siaran arahan tugas harian dan direktori nomor kontak darurat.</p>
        </div>
        {currentUser?.role === 'ADMIN' && (
          <button
            onClick={() => { changeTabWithLoading('admin'); setAdminSubTab('announcements'); openAddAnnouncementModal(); }}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer self-start"
          >
            <Plus className="w-4 h-4" /> Terbitkan Pengumuman Baru
          </button>
        )}
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section Pengumuman */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-amber-500" />
              Siaran Pengumuman Harian ({announcements.length})
            </h2>
          </div>

          <div className="space-y-3.5">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">{ann.shift}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${ann.priority === 'Kritis' ? 'bg-red-100 text-red-700' : ann.priority === 'Penting' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                    {ann.priority}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{ann.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{ann.content}</p>

                {currentUser?.role === 'ADMIN' && (
                  <div className="pt-2 flex justify-end gap-2 border-t border-slate-200/60">
                    <button onClick={() => openEditAnnouncementModal(ann)} className="text-xs text-blue-600 font-semibold flex items-center gap-1 hover:underline">
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button onClick={() => handleDeleteAnnouncement(ann.id, ann.title)} className="text-xs text-red-600 font-semibold flex items-center gap-1 hover:underline">
                      <Trash2 className="w-3.5 h-3.5" /> Hapus
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section Kontak Darurat */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-600" />
              Direktori Kontak Darurat ({emergencyContacts.length})
            </h2>
            {currentUser?.role === 'ADMIN' && (
              <button onClick={openAddContactModal} className="text-xs text-blue-600 font-bold hover:underline">
                + Tambah Kontak
              </button>
            )}
          </div>

          <div className="space-y-3">
            {emergencyContacts.map((c) => (
              <div key={c.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{c.nama}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">{c.status}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">{c.kontak}</span>
                  {currentUser?.role === 'ADMIN' && (
                    <div className="flex gap-1">
                      <button onClick={() => openEditContactModal(c)} className="p-1 text-slate-400 hover:text-blue-600">
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteContact(c.id, c.nama)} className="p-1 text-slate-400 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
