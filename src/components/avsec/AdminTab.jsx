'use client';
import React from 'react';
import {
  Settings,
  Users,
  BookOpen,
  Megaphone,
  ChevronRight,
  Plus,
  KeyRound,
  Edit3,
  Trash2,
  Phone,
  ShieldCheck,
  Save,
  FileText,
  ExternalLink
} from 'lucide-react';
import { getPasswordStrength } from '../../utils/helpers.js';

export default function AdminTab({
  personnelList,
  docList,
  announcements,
  emergencyContacts,
  logbookCategories,
  adminSubTab,
  setAdminSubTab,
  announcementSubTab,
  setAnnouncementSubTab,
  openAddPersonnelModal,
  openResetPasswordModal,
  openEditPersonnelModal,
  handleDeletePersonnel,
  openAddAnnouncementModal,
  openEditAnnouncementModal,
  handleDeleteAnnouncement,
  openAddContactModal,
  openEditContactModal,
  handleDeleteContact,
  openAddDocModal,
  openEditDocModal,
  handleDeleteDoc,
  currentUser,
  adminSecurityForm,
  setAdminSecurityForm,
  handleSaveAdminSecurity,
  setIsAddLogbookModalOpen,
  handleDeleteLogbookCategory
}) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-2xl shadow-lg shadow-red-600/30">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Administrator Control Panel</h1>
            <p className="text-slate-500 text-sm mt-0.5">Pusat kendali personel, otorisasi akun, dokumen SOP & siaran instruksi harian.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs text-slate-700 font-semibold">
            <Users className="w-4 h-4 text-blue-600" /> {personnelList.length} Personel
          </div>
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs text-slate-700 font-semibold">
            <BookOpen className="w-4 h-4 text-indigo-600" /> {docList.length} SOP
          </div>
          <div className="flex items-center gap-2 bg-slate-100 px-3.5 py-2 rounded-xl text-xs text-slate-700 font-semibold">
            <Megaphone className="w-4 h-4 text-amber-600" /> {announcements.length} Pengumuman
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">

        {/* MODUL 1: MANAJEMEN PERSONEL & AKUN */}
        <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'personnel'
          ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/10'
          : 'border-slate-200/90 hover:border-blue-300 hover:shadow-md'
          }`}>
          <button
            onClick={() => setAdminSubTab(adminSubTab === 'personnel' ? null : 'personnel')}
            className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
          >
            <div className="flex items-start md:items-center gap-5">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'personnel'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105'
                : 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                }`}>
                <Users className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    Manajemen Personel & Pembuatan Akun
                  </h2>
                  <span className="text-xs bg-blue-100 text-blue-700 font-extrabold px-2.5 py-0.5 rounded-full">
                    {personnelList.length} Anggota
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Pendaftaran personel baru, pembuatan kredensial login, atur lisensi SKP, dan reset password akun.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="flex gap-2 text-xs">
                <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl border border-emerald-200/60">
                  {personnelList.filter(p => p.status_lisensi === 'Aktif').length} Aktif
                </span>
                <span className="bg-amber-50 text-amber-700 font-bold px-3 py-1.5 rounded-xl border border-amber-200/60">
                  {personnelList.filter(p => p.status_lisensi === 'Mendekati Expired').length} Warning
                </span>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'personnel' ? 'bg-blue-600 text-white rotate-180 shadow-md shadow-blue-600/20' : 'bg-slate-100 text-slate-600 group-hover:bg-blue-600 group-hover:text-white'
                }`}>
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </button>

          {adminSubTab === 'personnel' && (
            <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Daftar Personel Terdaftar & Kredensial</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kelola otorisasi akun dan status keaktifan lisensi personel.</p>
                </div>
                <button
                  onClick={openAddPersonnelModal}
                  className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> + Tambah Anggota & Pembuatan Kredensial
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
                        <th className="px-5 py-4">Nama & ID Pas (Username)</th>
                        <th className="px-5 py-4">Jabatan / Unit</th>
                        <th className="px-5 py-4">Lisensi SKP</th>
                        <th className="px-5 py-4">Role Akses</th>
                        <th className="px-5 py-4">Status Lisensi</th>
                        <th className="px-5 py-4 text-center">Aksi Password & Akun</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {personnelList.map((p) => (
                        <tr key={p.id} className="hover:bg-blue-50/40 transition-colors">
                          <td className="px-5 py-4">
                            <p className="font-bold text-slate-900 text-sm">{p.nama}</p>
                            <span className="font-mono text-slate-500 text-[11px]">User: {p.username || p.id_pas}</span>
                          </td>
                          <td className="px-5 py-4 font-medium text-slate-700">{p.jabatan}</td>
                          <td className="px-5 py-4">
                            <span className="bg-slate-800 text-white px-2.5 py-1 rounded-lg font-bold text-[11px]">
                              {p.lisensi}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${p.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                              {p.role || 'USER'}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold text-[11px] ${p.status_lisensi === 'Aktif' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : p.status_lisensi === 'Kedaluwarsa' ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200'}`}>
                              {p.status_lisensi}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => openResetPasswordModal(p)}
                                className="flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white rounded-lg text-[11px] font-bold transition-colors cursor-pointer border border-amber-200"
                                title="Reset Password Default"
                              >
                                <KeyRound className="w-3.5 h-3.5" /> Reset Password
                              </button>
                              <button
                                onClick={() => openEditPersonnelModal(p)}
                                className="p-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="Edit Data Personel"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeletePersonnel(p.id, p.nama)}
                                className="p-1.5 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="Hapus Personel"
                              >
                                <Trash2 className="w-4 h-4" />
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
          )}
        </div>

        {/* MODUL 2: MANAJEMEN INSTRUKSI & KONTAK DARURAT */}
        <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'announcements'
          ? 'border-amber-500 shadow-xl ring-2 ring-amber-500/10'
          : 'border-slate-200/90 hover:border-amber-300 hover:shadow-md'
          }`}>
          <button
            onClick={() => setAdminSubTab(adminSubTab === 'announcements' ? null : 'announcements')}
            className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
          >
            <div className="flex items-start md:items-center gap-5">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'announcements'
                ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-amber-50 text-amber-600 group-hover:bg-amber-100'
                }`}>
                <Megaphone className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                    Instruksi & Pengumuman Harian / Kelola Kontak Darurat
                  </h2>
                  <span className="text-xs bg-amber-100 text-amber-700 font-extrabold px-2.5 py-0.5 rounded-full">
                    {announcements.length} Siaran
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Penerbitan arahan pimpinan shift dan kelola nomor ekstensi/frekuensi radio kontak darurat yang tampil di Dashboard Utama.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="flex gap-2 text-xs">
                <span className="bg-amber-50 text-amber-700 font-bold px-3 py-1.5 rounded-xl border border-amber-200/60">
                  {emergencyContacts.length} Kontak Darurat
                </span>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'announcements' ? 'bg-amber-500 text-white rotate-180 shadow-md shadow-amber-500/20' : 'bg-slate-100 text-slate-600 group-hover:bg-amber-500 group-hover:text-white'
                }`}>
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </button>

          {adminSubTab === 'announcements' && (
            <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-5">
              <div className="flex border-b border-slate-200 gap-4">
                <button
                  onClick={() => setAnnouncementSubTab('pengumuman')}
                  className={`pb-3 font-bold text-xs transition-all border-b-2 cursor-pointer ${announcementSubTab === 'pengumuman' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Tab 1: Daftar Pengumuman Shift ({announcements.length})
                </button>
                <button
                  onClick={() => setAnnouncementSubTab('kontak')}
                  className={`pb-3 font-bold text-xs transition-all border-b-2 cursor-pointer ${announcementSubTab === 'kontak' ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                >
                  Tab 2: Kontak Darurat & Frekuensi Radio ({emergencyContacts.length})
                </button>
              </div>

              {announcementSubTab === 'pengumuman' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Daftar Pengumuman Shift Aktif</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Siaran instruksi yang saat ini dapat dilihat oleh seluruh personel.</p>
                    </div>
                    <button
                      onClick={openAddAnnouncementModal}
                      className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> Terbitkan Pengumuman Baru
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-amber-300 transition-all">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase ${ann.priority === 'Kritis' ? 'bg-red-100 text-red-700 border border-red-200' : ann.priority === 'Penting' ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'bg-blue-100 text-blue-700 border border-blue-200'}`}>
                              {ann.priority}
                            </span>
                            <span className="text-[11px] text-slate-400 font-medium text-right">{ann.shift}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm">{ann.title}</h4>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed">{ann.content}</p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditAnnouncementModal(ann)}
                            className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-slate-50 hover:bg-blue-50 border border-slate-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" /> Edit
                          </button>
                          <button
                            onClick={() => handleDeleteAnnouncement(ann.id, ann.title)}
                            className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {announcementSubTab === 'kontak' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Kelola Kontak Darurat & Pos Komando AVSEC</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Perubahan pada tabel ini akan secara otomatis memperbarui widget Kontak Darurat pada Dashboard Utama.</p>
                    </div>
                    <button
                      onClick={openAddContactModal}
                      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                    >
                      <Plus className="w-4 h-4" /> + Tambah Kontak Darurat
                    </button>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs">
                    <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 uppercase tracking-wider font-bold border-b border-slate-200">
                          <th className="p-4">Nama Pos / Unit</th>
                          <th className="p-4">Jenis Kontak / Frekuensi Radio</th>
                          <th className="p-4">Status Aksesibilitas</th>
                          <th className="p-4 text-center">Aksi</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        {emergencyContacts.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-bold text-slate-900">{c.nama}</td>
                            <td className="p-4 font-mono font-bold text-blue-600 text-sm">{c.kontak}</td>
                            <td className="p-4">
                              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px]">
                                {c.status}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => openEditContactModal(c)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                                  title="Edit Kontak"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteContact(c.id, c.nama)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Hapus Kontak"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* MODUL 3: MANAJEMEN SOP */}
        <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'documents'
          ? 'border-indigo-500 shadow-xl ring-2 ring-indigo-500/10'
          : 'border-slate-200/90 hover:border-indigo-300 hover:shadow-md'
          }`}>
          <button
            onClick={() => setAdminSubTab(adminSubTab === 'documents' ? null : 'documents')}
            className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
          >
            <div className="flex items-start md:items-center gap-5">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'documents'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100'
                }`}>
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    Manajemen SOP & Link Google Drive
                  </h2>
                  <span className="text-xs bg-indigo-100 text-indigo-700 font-extrabold px-2.5 py-0.5 rounded-full">
                    {docList.length} Berkas
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Pusat pengunggahan dan pembaruan berkas Standard Operating Procedure (SOP) dan tautan Google Drive.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-4 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
              <div className="flex gap-2 text-xs">
                <span className="bg-purple-50 text-purple-700 font-bold px-3 py-1.5 rounded-xl border border-purple-200/60">
                  {docList.filter(d => d.kategori === 'Regulasi Dirjen').length} Regulasi
                </span>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'documents' ? 'bg-indigo-600 text-white rotate-180 shadow-md shadow-indigo-600/20' : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white'
                }`}>
                <ChevronRight className="w-5 h-5 rotate-90" />
              </div>
            </div>
          </button>

          {adminSubTab === 'documents' && (
            <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Katalog Dokumen Resmi</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kelola aksesibiltas dokumen acuan kerja personel.</p>
                </div>
                <button
                  onClick={openAddDocModal}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Unggah SOP Baru
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
                    <thead>
                      <tr className="bg-slate-50 text-slate-500 uppercase tracking-wider font-bold border-b border-slate-200 text-[11px]">
                        <th className="px-5 py-4">Judul Dokumen</th>
                        <th className="px-5 py-4">Nomor SOP</th>
                        <th className="px-5 py-4">Kategori</th>
                        <th className="px-5 py-4">Versi</th>
                        <th className="px-5 py-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {docList.map((doc) => (
                        <tr key={doc.id} className="hover:bg-indigo-50/40 transition-colors">
                          <td className="px-5 py-4 font-bold text-slate-900 max-w-xs truncate" title={doc.title}>{doc.title}</td>
                          <td className="px-5 py-4 font-mono text-slate-600 font-semibold">{doc.nomor}</td>
                          <td className="px-5 py-4">
                            <span className="px-2.5 py-1 rounded-lg font-bold text-[10px] bg-blue-100 text-blue-700">
                              {doc.kategori}
                            </span>
                          </td>
                          <td className="px-5 py-4 font-mono text-slate-600">{doc.versi}</td>
                          <td className="px-5 py-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => openEditDocModal(doc)}
                                className="p-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="Edit Dokumen"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteDoc(doc.id, doc.title)}
                                className="p-2 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-lg transition-colors cursor-pointer"
                                title="Hapus Dokumen"
                              >
                                <Trash2 className="w-4 h-4" />
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
          )}
        </div>

        {/* MODUL 4: PENGATURAN KREDENSIAL & KEAMANAN AKUN ADMIN */}
        <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'security'
          ? 'border-emerald-500 shadow-xl ring-2 ring-emerald-500/10'
          : 'border-slate-200/90 hover:border-emerald-300 hover:shadow-md'
          }`}>
          <button
            onClick={() => setAdminSubTab(adminSubTab === 'security' ? null : 'security')}
            className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
          >
            <div className="flex items-start md:items-center gap-5">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'security'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-105'
                : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-100'
                }`}>
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    Profil & Keamanan Akun Admin
                  </h2>
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-extrabold px-2.5 py-0.5 rounded-full">
                    Privat Admin
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Ubah kredensial pribadi administrator (Username / ID Pas) dan kata sandi dengan indikator keamanan password.
                </p>
              </div>
            </div>

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'security' ? 'bg-emerald-600 text-white rotate-180' : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-600 group-hover:text-white'
              }`}>
              <ChevronRight className="w-5 h-5 rotate-90" />
            </div>
          </button>

          {adminSubTab === 'security' && (
            <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-6">
              <form onSubmit={handleSaveAdminSecurity} className="max-w-xl space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username / ID Pas Saat Ini</label>
                  <input
                    type="text"
                    value={currentUser?.username || ''}
                    disabled
                    className="w-full p-2.5 bg-slate-200 border border-slate-300 rounded-xl text-slate-600 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Username / ID Pas Baru</label>
                  <input
                    type="text"
                    value={adminSecurityForm.newUsername}
                    onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, newUsername: e.target.value })}
                    placeholder="Biarkan kosong jika tidak diubah"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <hr className="my-3 border-slate-200" />

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Password Saat Ini</label>
                  <input
                    type="password"
                    value={adminSecurityForm.currentPass}
                    onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, currentPass: e.target.value })}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block font-bold text-slate-700">Password Baru</label>
                    {adminSecurityForm.newPass && (
                      <span className={`font-bold text-[11px] ${getPasswordStrength(adminSecurityForm.newPass).color}`}>
                        Kekuatan: {getPasswordStrength(adminSecurityForm.newPass).label}
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={adminSecurityForm.newPass}
                    onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, newPass: e.target.value })}
                    placeholder="Minimal 6 karakter"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                  {adminSecurityForm.newPass && (
                    <div className="w-full bg-slate-200 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${getPasswordStrength(adminSecurityForm.newPass).bg} ${getPasswordStrength(adminSecurityForm.newPass).width}`} />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    value={adminSecurityForm.confirmPass}
                    onChange={(e) => setAdminSecurityForm({ ...adminSecurityForm, confirmPass: e.target.value })}
                    placeholder="Ketik ulang password baru"
                    className="w-full p-2.5 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Save className="w-4 h-4" /> Simpan Perubahan Kredensial
                </button>
              </form>
            </div>
          )}
        </div>

        {/* MODUL 5: PENGATURAN LOGBOOK */}
        <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${adminSubTab === 'logbooks'
          ? 'border-purple-500 shadow-xl ring-2 ring-purple-500/10'
          : 'border-slate-200/90 hover:border-purple-300 hover:shadow-md'
          }`}>
          <button
            onClick={() => setAdminSubTab(adminSubTab === 'logbooks' ? null : 'logbooks')}
            className="w-full flex flex-col md:flex-row md:items-center justify-between p-7 text-left group cursor-pointer transition-colors hover:bg-slate-50/80 gap-6"
          >
            <div className="flex items-start md:items-center gap-5">
              <div className={`p-4 rounded-2xl transition-all duration-300 ${adminSubTab === 'logbooks'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105'
                : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'
                }`}>
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                    Pengaturan Integrasi & Struktur Logbook
                  </h2>
                  <span className="text-xs bg-purple-100 text-purple-700 font-extrabold px-2.5 py-0.5 rounded-full">
                    {logbookCategories.length} Form Logbook
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Kelola daftar kategori logbook (Google Form / Sheets), link embed, dan integrasi tautan rekapitulasi.
                </p>
              </div>
            </div>

            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${adminSubTab === 'logbooks' ? 'bg-purple-600 text-white rotate-180 shadow-md shadow-purple-600/20' : 'bg-slate-100 text-slate-600 group-hover:bg-purple-600 group-hover:text-white'
              }`}>
              <ChevronRight className="w-5 h-5 rotate-90" />
            </div>
          </button>

          {adminSubTab === 'logbooks' && (
            <div className="border-t border-slate-100 p-6 sm:p-7 bg-slate-50/50 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 text-base">Daftar Jenis Logbook Aktif</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Penambahan atau penghapusan pada modul ini akan langsung berdampak ke menu Pelaporan & Log.</p>
                </div>
                <button
                  onClick={() => setIsAddLogbookModalOpen(true)}
                  className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> + Tambah Jenis Logbook Baru
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {logbookCategories.map((cat) => (
                  <div key={cat.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between hover:border-purple-300 transition-all">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900 text-sm">{cat.title}</span>
                        <span className="text-[10px] font-mono bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-md">ID: {cat.id}</span>
                      </div>
                      <p className="text-xs text-slate-500 font-mono truncate" title={cat.url}>Embed: {cat.url}</p>
                      <p className="text-xs text-slate-500 font-mono truncate mt-0.5" title={cat.sheetsUrl}>Sheets: {cat.sheetsUrl}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <a
                        href={cat.nativeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Test Form <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDeleteLogbookCategory(cat.id, cat.title)}
                        className="flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors cursor-pointer border border-red-200"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Hapus Jenis Logbook
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
