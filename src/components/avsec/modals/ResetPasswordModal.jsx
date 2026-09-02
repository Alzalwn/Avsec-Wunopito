'use client';
import React from 'react';
import { KeyRound, X } from 'lucide-react';

export default function ResetPasswordModal({
  isOpen,
  onClose,
  resetTargetUser,
  newPasswordValue,
  setNewPasswordValue,
  handleSaveResetPassword
}) {
  if (!isOpen || !resetTargetUser) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-500" />
            Reset Password Akun Personel
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveResetPassword} className="space-y-4 text-xs">
          <p className="text-slate-600">
            Kembalikan password login untuk personel: <b className="text-slate-900">{resetTargetUser.nama}</b> ({resetTargetUser.id_pas}) ke password default.
          </p>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Password Default Pengembalian</label>
            <input
              type="text"
              value={newPasswordValue}
              onChange={(e) => setNewPasswordValue(e.target.value)}
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-sm font-bold text-slate-800"
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
              className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md cursor-pointer"
            >
              Konfirmasi Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
