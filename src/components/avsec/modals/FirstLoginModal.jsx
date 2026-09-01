import React from 'react';
import { Key, AlertCircle } from 'lucide-react';

export default function FirstLoginModal({
  isOpen,
  firstLoginPassForm,
  setFirstLoginPassForm,
  firstLoginError,
  handleSaveFirstLoginPassword
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-slate-800 space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold">Wajib Ganti Password Pertama Kali</h3>
            <p className="text-xs text-slate-400">Demi keamanan akun, silakan ubah password bawaan Anda.</p>
          </div>
        </div>

        {firstLoginError && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{firstLoginError}</span>
          </div>
        )}

        <form onSubmit={handleSaveFirstLoginPassword} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password Baru</label>
            <input
              type="password"
              value={firstLoginPassForm.newPass}
              onChange={(e) => setFirstLoginPassForm({ ...firstLoginPassForm, newPass: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Minimal 6 karakter"
              required
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Konfirmasi Password Baru</label>
            <input
              type="password"
              value={firstLoginPassForm.confirmPass}
              onChange={(e) => setFirstLoginPassForm({ ...firstLoginPassForm, confirmPass: e.target.value })}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Ketik ulang password baru"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg transition-all text-xs cursor-pointer mt-2"
          >
            Simpan & Lanjutkan Masuk Portal
          </button>
        </form>
      </div>
    </div>
  );
}
