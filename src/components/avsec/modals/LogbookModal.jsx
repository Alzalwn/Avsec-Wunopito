'use client';
import React from 'react';
import { FileText, X, Save } from 'lucide-react';

export default function LogbookModal({
  isOpen,
  onClose,
  logbookForm,
  setLogbookForm,
  handleSaveNewLogbook
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            {logbookForm.id ? 'Ubah / Edit Tautan & Link Logbook' : 'Tambah Jenis Logbook Baru'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveNewLogbook} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama / Judul Logbook</label>
            <input
              type="text"
              value={logbookForm.title}
              onChange={(e) => setLogbookForm({ ...logbookForm, title: e.target.value })}
              placeholder="Contoh: LOGBOOK PEMERIKSAAN CARGO"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none uppercase font-bold"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              URL Sheet Rekapitulasi (Google Sheets) <span className="text-purple-600 font-bold">*Tempel Link Sheets di sini</span>
            </label>
            <input
              type="url"
              value={logbookForm.sheetsUrl}
              onChange={(e) => setLogbookForm({ ...logbookForm, sheetsUrl: e.target.value })}
              placeholder="https://docs.google.com/spreadsheets/d/.../edit?usp=sharing"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono text-[11px]"
              required
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Salin link Google Sheets dari browser lalu tempelkan (*paste*) di atas. Pastikan izin berbagi spreadsheet telah disetel ke <em>&quot;Siapa saja yang memiliki link dapat melihat/mengedit&quot;</em>.
            </p>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Embed Google Form</label>
            <input
              type="url"
              value={logbookForm.url}
              onChange={(e) => setLogbookForm({ ...logbookForm, url: e.target.value })}
              placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono text-[11px]"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Tab Baru Google Form (Native)</label>
            <input
              type="url"
              value={logbookForm.nativeUrl}
              onChange={(e) => setLogbookForm({ ...logbookForm, nativeUrl: e.target.value })}
              placeholder="https://docs.google.com/forms/d/e/.../viewform?usp=header"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none font-mono text-[11px]"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" /> {logbookForm.id ? 'Simpan Perubahan Link' : 'Simpan Jenis Logbook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
