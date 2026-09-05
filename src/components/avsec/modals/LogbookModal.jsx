'use client';
import React, { useState, useEffect } from 'react';
import { FileText, X, Save, Link2, ExternalLink, Clipboard, Check, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function LogbookModal({
  isOpen,
  onClose,
  logbookForm,
  setLogbookForm,
  handleSaveNewLogbook
}) {
  const [copiedForm, setCopiedForm] = useState(false);
  const [copiedSheets, setCopiedSheets] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [formInputUrl, setFormInputUrl] = useState('');

  // Sinkronkan input lokal saat modal dibuka atau logbookForm berubah
  useEffect(() => {
    if (isOpen) {
      setFormInputUrl(logbookForm.nativeUrl || logbookForm.url || '');
    }
  }, [isOpen, logbookForm.id, logbookForm.url, logbookForm.nativeUrl]);

  if (!isOpen) return null;

  // Helper cerdas: Konversi otomatis Google Form link ke embed & native format
  const handleFormUrlChange = (val) => {
    setFormInputUrl(val);
    const clean = val.trim();
    if (!clean) {
      setLogbookForm((prev) => ({ ...prev, url: '', nativeUrl: '' }));
      return;
    }

    if (clean.includes('docs.google.com/forms')) {
      const base = clean.split('?')[0];
      const withView = base.endsWith('/viewform') ? base : `${base}/viewform`;
      const embedUrl = `${withView}?embedded=true`;
      const nativeUrl = `${withView}?usp=header`;
      setLogbookForm((prev) => ({
        ...prev,
        url: embedUrl,
        nativeUrl: nativeUrl
      }));
    } else {
      // Link shortener atau URL lain
      setLogbookForm((prev) => ({
        ...prev,
        url: clean,
        nativeUrl: clean
      }));
    }
  };

  const handlePasteFormUrl = async () => {
    try {
      if (navigator?.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          handleFormUrlChange(text);
          setCopiedForm(true);
          setTimeout(() => setCopiedForm(false), 2000);
        }
      }
    } catch (err) {
      console.warn('Clipboard read error:', err);
    }
  };

  const handlePasteSheetsUrl = async () => {
    try {
      if (navigator?.clipboard) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setLogbookForm((prev) => ({ ...prev, sheetsUrl: text.trim() }));
          setCopiedSheets(true);
          setTimeout(() => setCopiedSheets(false), 2000);
        }
      }
    } catch (err) {
      console.warn('Clipboard read error:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {logbookForm.id ? 'Ubah / Edit Tautan & Link Logbook' : 'Tambah Jenis Logbook Baru'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Perbarui link Google Form dan Google Sheets rekapitulasi operasional.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveNewLogbook} className="space-y-4 text-xs">
          
          {/* Judul Logbook */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Nama / Judul Logbook</label>
            <input
              type="text"
              value={logbookForm.title}
              onChange={(e) => setLogbookForm({ ...logbookForm, title: e.target.value })}
              placeholder="Contoh: LOGBOOK PATROLI AVSEC"
              className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none uppercase font-bold text-slate-900"
              required
            />
          </div>

          {/* Kolom Link Google Form (Cerdas & Otomatis) */}
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-blue-900 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-blue-600" />
                URL / Link Google Form
              </label>
              <button
                type="button"
                onClick={handlePasteFormUrl}
                className="text-[11px] text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded-md border border-blue-200 hover:border-blue-400 transition-colors"
                title="Tempel link dari clipboard"
              >
                {copiedForm ? <Check className="w-3 h-3 text-emerald-600" /> : <Clipboard className="w-3 h-3" />}
                {copiedForm ? 'Ditempel!' : 'Tempel Link'}
              </button>
            </div>

            <input
              type="text"
              value={formInputUrl}
              onChange={(e) => handleFormUrlChange(e.target.value)}
              placeholder="Tempel link Google Form di sini (https://docs.google.com/forms/d/...)"
              className="w-full p-2.5 bg-white border border-blue-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none font-mono text-[11px] text-slate-800"
              required
            />
            <p className="text-[10px] text-blue-700 leading-relaxed">
              💡 Cukup salin link Google Form dari browser Anda dan tempel di atas. Sistem otomatis mengatur format <em>embed</em> agar dapat tampil langsung di dalam portal.
            </p>
          </div>

          {/* Kolom Link Google Sheets Rekapitulasi */}
          <div className="p-3.5 bg-emerald-50/40 rounded-xl border border-emerald-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-emerald-900 flex items-center gap-1.5">
                <Link2 className="w-4 h-4 text-emerald-600" />
                URL Sheet Rekapitulasi (Google Sheets)
              </label>
              <button
                type="button"
                onClick={handlePasteSheetsUrl}
                className="text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1 cursor-pointer bg-white px-2 py-0.5 rounded-md border border-emerald-200 hover:border-emerald-400 transition-colors"
                title="Tempel link sheets dari clipboard"
              >
                {copiedSheets ? <Check className="w-3 h-3 text-emerald-600" /> : <Clipboard className="w-3 h-3" />}
                {copiedSheets ? 'Ditempel!' : 'Tempel Link'}
              </button>
            </div>

            <input
              type="text"
              value={logbookForm.sheetsUrl || ''}
              onChange={(e) => setLogbookForm({ ...logbookForm, sheetsUrl: e.target.value })}
              placeholder="https://docs.google.com/spreadsheets/d/.../edit?usp=sharing"
              className="w-full p-2.5 bg-white border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-[11px] text-slate-800"
            />
            <p className="text-[10px] text-emerald-700 leading-relaxed">
              Salin link Google Sheets rekapan respon. Pastikan hak akses spreadsheet telah disetel ke <em>&quot;Siapa saja yang memiliki link dapat melihat/mengedit&quot;</em>.
            </p>
          </div>

          {/* Toggle Pengaturan Lanjutan (Advanced URL) */}
          <div>
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="text-[11px] text-slate-500 hover:text-slate-700 flex items-center gap-1 font-semibold cursor-pointer"
            >
              {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              {showAdvanced ? 'Sembunyikan Pengaturan URL Lanjutan' : 'Pengaturan URL Lanjutan (Embed & Native terpisah)'}
            </button>

            {showAdvanced && (
              <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div>
                  <label className="block font-bold text-slate-600 mb-0.5 text-[10px]">URL Embed Iframe (Internal)</label>
                  <input
                    type="text"
                    value={logbookForm.url}
                    onChange={(e) => setLogbookForm({ ...logbookForm, url: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono text-[10px]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-600 mb-0.5 text-[10px]">URL Buka Tab Baru (Native)</label>
                  <input
                    type="text"
                    value={logbookForm.nativeUrl}
                    onChange={(e) => setLogbookForm({ ...logbookForm, nativeUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-lg font-mono text-[10px]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-purple-600 hover:bg-purple-700 active:scale-95 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" /> {logbookForm.id ? 'Simpan Perubahan Link' : 'Simpan Jenis Logbook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
