import React from 'react';
import { Edit3, X, Save } from 'lucide-react';

export default function EditReportModal({
  isOpen,
  onClose,
  editingReport,
  reportFormState,
  setReportFormState,
  handleSaveReportEdit
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-blue-600" />
            Edit Record Log Operasional ({editingReport?.id})
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveReportEdit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Jenis Laporan Logbook</label>
              <input
                type="text"
                value={reportFormState.tipe}
                onChange={(e) => setReportFormState({ ...reportFormState, tipe: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-semibold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Lokasi Titik Tugas</label>
              <input
                type="text"
                value={reportFormState.lokasi}
                onChange={(e) => setReportFormState({ ...reportFormState, lokasi: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Petugas Pelapor</label>
              <input
                type="text"
                value={reportFormState.pelapor}
                onChange={(e) => setReportFormState({ ...reportFormState, pelapor: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Penanganan</label>
              <select
                value={reportFormState.status}
                onChange={(e) => setReportFormState({ ...reportFormState, status: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold"
              >
                <option value="Selesai">Selesai</option>
                <option value="Ditangani">Ditangani</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Ringkasan / Temuan Field</label>
            <textarea
              rows={3}
              value={reportFormState.ringkasan}
              onChange={(e) => setReportFormState({ ...reportFormState, ringkasan: e.target.value })}
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
              className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer"
            >
              <Save className="w-4 h-4" /> Simpan Perubahan Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
