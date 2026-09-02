'use client';
import React from 'react';
import { BookOpen, X, Save } from 'lucide-react';

export default function DocumentModal({
  isOpen,
  onClose,
  editingDoc,
  docForm,
  setDocForm,
  handleSaveDoc
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            {editingDoc ? 'Edit Data Dokumen SOP' : 'Unggah Dokumen SOP Baru'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveDoc} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul Dokumen / Pedoman</label>
            <input
              type="text"
              value={docForm.title}
              onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
              placeholder="Contoh: SOP Penanganan Ancaman Bom di Bandara"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">URL Google Drive (Target _blank)</label>
            <input
              type="url"
              value={docForm.drive_url}
              onChange={(e) => setDocForm({ ...docForm, drive_url: e.target.value })}
              placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nomor Dokumen</label>
              <input
                type="text"
                value={docForm.nomor}
                onChange={(e) => setDocForm({ ...docForm, nomor: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kategori Dokumen</label>
              <select
                value={docForm.kategori}
                onChange={(e) => setDocForm({ ...docForm, kategori: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              >
                <option>Regulasi Dirjen</option>
                <option>Prosedur</option>
                <option>Instruksi Kerja</option>
                <option>SKP/Lisensi Personel</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Versi / Tahun</label>
              <input
                type="text"
                value={docForm.versi}
                onChange={(e) => setDocForm({ ...docForm, versi: e.target.value })}
                placeholder="v1.0 / 2026"
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimasi Ukuran File</label>
              <input
                type="text"
                value={docForm.ukuran}
                onChange={(e) => setDocForm({ ...docForm, ukuran: e.target.value })}
                placeholder="Contoh: 3.2 MB"
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              />
            </div>
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
              className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" /> Simpan Dokumen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
