import React from 'react';
import { CheckCircle2 } from 'lucide-react';

export default function NotificationToast({ notification }) {
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-3 text-xs font-semibold">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        <span>{notification}</span>
      </div>
    </div>
  );
}
