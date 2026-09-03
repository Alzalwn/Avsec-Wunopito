'use client';
import React from 'react';
import { Users, X, RefreshCw, Save } from 'lucide-react';

export default function PersonnelModal({
  isOpen,
  onClose,
  editingPersonnel,
  personnelForm,
  setPersonnelForm,
  generateRandomPassword,
  handleSavePersonnel,
  isReadOnly = false,
  isSelfEdit = false
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            {isReadOnly
              ? 'Detail Informasi Personel'
              : isSelfEdit
              ? 'Edit Data Diri Saya'
              : editingPersonnel
              ? 'Detail & Edit Data Personel'
              : 'Tambah Personel & Pembuatan Kredensial'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSavePersonnel} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama Lengkap Personel</label>
            <input
              type="text"
              value={personnelForm.nama}
              onChange={(e) => setPersonnelForm({ ...personnelForm, nama: e.target.value })}
              placeholder="Contoh: Antonius Fernandez"
              className={`w-full p-2.5 border rounded-xl font-medium ${
                isReadOnly
                  ? 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              }`}
              disabled={isReadOnly}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">ID Pas Bandara / NIP (Username)</label>
              <input
                type="text"
                value={personnelForm.id_pas}
                onChange={(e) => setPersonnelForm({ ...personnelForm, id_pas: e.target.value })}
                className={`w-full p-2.5 border rounded-xl font-mono ${
                  isReadOnly || isSelfEdit
                    ? 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                    : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                }`}
                disabled={isReadOnly || isSelfEdit}
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Jabatan / Unit</label>
              <input
                type="text"
                value={personnelForm.jabatan}
                onChange={(e) => setPersonnelForm({ ...personnelForm, jabatan: e.target.value })}
                placeholder="Contoh: Operator X-Ray"
                className={`w-full p-2.5 border rounded-xl ${
                  isReadOnly || isSelfEdit
                    ? 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                    : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                }`}
                disabled={isReadOnly || isSelfEdit}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kontak / No. Telepon</label>
              <input
                type="text"
                value={personnelForm.kontak || ''}
                onChange={(e) => setPersonnelForm({ ...personnelForm, kontak: e.target.value })}
                placeholder="Contoh: 0812-3456-7890"
                className={`w-full p-2.5 border rounded-xl font-medium ${
                  isReadOnly
                    ? 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                    : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                }`}
                disabled={isReadOnly}
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Role Akses System</label>
              <select
                value={personnelForm.role}
                onChange={(e) => setPersonnelForm({ ...personnelForm, role: e.target.value })}
                className={`w-full p-2.5 border rounded-xl font-medium ${
                  isReadOnly || isSelfEdit
                    ? 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                    : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                }`}
                disabled={isReadOnly || isSelfEdit}
              >
                <option value="USER">Petugas Operasional (User)</option>
                <option value="ADMIN">Administrator (Admin)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Kualifikasi Lisensi (SKP)</label>
              <select
                value={personnelForm.lisensi}
                onChange={(e) => setPersonnelForm({ ...personnelForm, lisensi: e.target.value })}
                className={`w-full p-2.5 border rounded-xl font-medium ${
                  isReadOnly || isSelfEdit
                    ? 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                    : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                }`}
                disabled={isReadOnly || isSelfEdit}
              >
                <option>Basic</option>
                <option>Junior</option>
                <option>Senior</option>
                <option>Non Lisensi</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Status Lisensi</label>
              <select
                value={personnelForm.status_lisensi}
                onChange={(e) => setPersonnelForm({ ...personnelForm, status_lisensi: e.target.value })}
                className={`w-full p-2.5 border rounded-xl font-medium ${
                  isReadOnly || isSelfEdit
                    ? 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                    : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                }`}
                disabled={isReadOnly || isSelfEdit}
              >
                <option>Aktif</option>
                <option>Mendekati Expired</option>
                <option>Kedaluwarsa</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Masa Berlaku Lisensi</label>
            <input
              type="date"
              value={personnelForm.masa_berlaku}
              onChange={(e) => setPersonnelForm({ ...personnelForm, masa_berlaku: e.target.value })}
              className={`w-full p-2.5 border rounded-xl font-medium ${
                isReadOnly || isSelfEdit
                  ? 'bg-slate-100 border-slate-200 text-slate-600 cursor-not-allowed'
                  : 'border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              }`}
              disabled={isReadOnly || isSelfEdit}
              required
            />
          </div>

          {!isReadOnly && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block font-bold text-slate-700">
                  {isSelfEdit ? 'Password Akun Saya' : 'Password Bawaan / Default'}
                </label>
                {!isSelfEdit && (
                  <button
                    type="button"
                    onClick={generateRandomPassword}
                    className="text-[11px] text-blue-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Generate Password Acak
                  </button>
                )}
              </div>
              <input
                type="text"
                value={personnelForm.password_default}
                onChange={(e) => setPersonnelForm({ ...personnelForm, password_default: e.target.value })}
                className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-slate-800 font-bold"
                required
              />
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer transition-colors"
            >
              {isReadOnly ? 'Tutup' : 'Batal'}
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all"
              >
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
