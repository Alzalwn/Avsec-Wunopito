import React from 'react';
import { Lock, AlertCircle, Trash2 } from 'lucide-react';

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  pendingDeleteAction,
  selectedReportIds,
  adminPasswordInput,
  setAdminPasswordInput,
  adminPasswordError,
  handleConfirmAdminPasswordForDelete
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2.5 bg-red-500/20 text-red-400 rounded-xl border border-red-500/30">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold">Verifikasi Password Admin</h3>
            <p className="text-xs text-slate-400">
              {pendingDeleteAction?.type === 'bulk'
                ? `Otorisasi penghapusan masal ${selectedReportIds.length} record log.`
                : `Otorisasi penghapusan record log ${pendingDeleteAction?.id}.`}
            </p>
          </div>
        </div>

        {adminPasswordError && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{adminPasswordError}</span>
          </div>
        )}

        <form onSubmit={handleConfirmAdminPasswordForDelete} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Masukkan Password Admin</label>
            <input
              type="password"
              value={adminPasswordInput}
              onChange={(e) => setAdminPasswordInput(e.target.value)}
              placeholder="Ketik password admin Anda..."
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-red-500 focus:outline-none font-mono"
              required
              autoFocus
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition-all text-xs cursor-pointer"
            >
              <Trash2 className="w-4 h-4" /> Konfirmasi & Hapus Permanen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
