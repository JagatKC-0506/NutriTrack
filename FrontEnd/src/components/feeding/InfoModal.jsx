import { useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

export default function InfoModal({ title, detail, source, icon, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#1c1b21] rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[85vh] overflow-y-auto shadow-2xl animate-slide-up"
      >
        <div className="flex items-center justify-between p-5 border-b border-[#2b2c37]">
          <div className="flex items-center gap-3 min-w-0">
            {icon && <span className="text-xl flex-shrink-0">{icon}</span>}
            <h2 className="text-base font-semibold text-slate-200 truncate">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 hover:text-slate-200 transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <p className="text-sm text-slate-300 leading-relaxed">{detail}</p>

          {source && (
            <div className="flex items-start gap-2 bg-slate-800/50 rounded-xl p-3">
              <ExternalLink size={14} className="text-slate-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-500">{source}</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm font-semibold rounded-xl hover:from-pink-600 hover:to-pink-700 transition-all shadow-lg shadow-pink-500/20"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
