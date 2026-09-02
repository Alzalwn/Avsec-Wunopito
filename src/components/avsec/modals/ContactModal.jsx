'use client';
import React from 'react';
import { Phone, X, Save } from 'lucide-react';

export default function ContactModal({
  isOpen,
  onClose,
  editingContact,
  contactForm,
  setContactForm,
  handleSaveContact
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            {editingContact ? 'Edit Kontak Darurat' : 'Tambah Kontak Darurat Baru'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveContact} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Pos / Unit</label>
            <input
              type="text"
              value={contactForm.nama}
              onChange={(e) => setContactForm({ ...contactForm, nama: e.target.value })}
              placeholder="Contoh: Pos Komando AVSEC / Tower ATC Wunopito"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Jenis Kontak / Ekstensi / Frekuensi Radio</label>
            <input
              type="text"
              value={contactForm.kontak}
              onChange={(e) => setContactForm({ ...contactForm, kontak: e.target.value })}
              placeholder="Contoh: Ext. 101 atau Freq 122.4 MHz"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Status Aksesibilitas</label>
            <select
              value={contactForm.status}
              onChange={(e) => setContactForm({ ...contactForm, status: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
            >
              <option>24 Jam Aktif</option>
              <option>Jam Operasional Bandara</option>
            </select>
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
              <Save className="w-4 h-4" /> Simpan Kontak
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
