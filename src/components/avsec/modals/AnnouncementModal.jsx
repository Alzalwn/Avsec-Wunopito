'use client';
import React from 'react';
import { Megaphone, X, Save } from 'lucide-react';

export default function AnnouncementModal({
  isOpen,
  onClose,
  editingAnnouncement,
  announcementForm,
  setAnnouncementForm,
  handleSaveAnnouncement
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-amber-500" />
            {editingAnnouncement ? 'Edit Pengumuman / Instruksi' : 'Terbitkan Pengumuman Baru'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveAnnouncement} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Judul / Subjek Instruksi</label>
            <input
              type="text"
              value={announcementForm.title}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
              placeholder="Contoh: Pemeriksaan Ketat Bagasi Flight Siang"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Shift / Unit</label>
              <select
                value={announcementForm.shift}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, shift: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              >
                <option>Shift Pagi (06:00 - 14:00 WITA)</option>
                <option>Shift Siang (14:00 - 22:00 WITA)</option>
                <option>Perimeter Security</option>
                <option>Semua Personel</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tingkat Prioritas</label>
              <select
                value={announcementForm.priority}
                onChange={(e) => setAnnouncementForm({ ...announcementForm, priority: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
              >
                <option>Normal</option>
                <option>Penting</option>
                <option>Kritis</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Rincian Instruksi</label>
            <textarea
              rows={4}
              value={announcementForm.content}
              onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
              placeholder="Tuliskan arahan tugas yang perlu diperhatikan oleh personel..."
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
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
              className="flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" /> Terbitkan ke Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
