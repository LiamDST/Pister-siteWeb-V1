import { createContext, useContext, useCallback, useState, useEffect, useRef } from 'react';
import { CheckCircle2, XCircle, Info, AlertTriangle, X } from 'lucide-react';

/* ── Context ─────────────────────────────────────────────── */
const ToastContext = createContext(null);

const ICONS = {
  success: <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />,
  error:   <XCircle     className="w-4 h-4 text-red-400    shrink-0" />,
  info:    <Info        className="w-4 h-4 text-blue-400   shrink-0" />,
  warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
};

const BORDERS = {
  success: 'border-blue-500/30',
  error:   'border-red-500/30',
  info:    'border-blue-500/30',
  warning: 'border-amber-500/30',
};

/* ── Toast item ─────────────────────────────────────────── */
function ToastItem({ id, type = 'info', title, message, duration = 4000, onRemove }) {
  const [exiting, setExiting] = useState(false);
  const timerRef = useRef(null);

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => onRemove(id), 350);
  }, [id, onRemove]);

  useEffect(() => {
    timerRef.current = setTimeout(dismiss, duration);
    return () => clearTimeout(timerRef.current);
  }, [dismiss, duration]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        flex items-start gap-3 w-full max-w-sm
        bg-navy-900/95 backdrop-blur-sm
        border ${BORDERS[type]}
        rounded-2xl px-4 py-3.5 shadow-xl shadow-black/30
        transition-all duration-350 ease-out
        ${exiting ? 'opacity-0 translate-x-8 scale-95' : 'opacity-100 translate-x-0 scale-100'}
      `}
    >
      {ICONS[type]}
      <div className="flex-1 min-w-0">
        {title && <p className="text-sm font-semibold text-white leading-snug">{title}</p>}
        {message && <p className="text-xs text-white/60 mt-0.5 leading-relaxed">{message}</p>}
      </div>
      <button
        onClick={dismiss}
        aria-label="Fermer"
        className="text-white/30 hover:text-white/70 transition-colors mt-0.5 shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ── Provider ────────────────────────────────────────────── */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(({ type = 'info', title, message, duration = 4000 }) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, type, title, message, duration }]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Helpers courts
  const toast = {
    success: (title, message, opts) => addToast({ type: 'success', title, message, ...opts }),
    error:   (title, message, opts) => addToast({ type: 'error',   title, message, ...opts }),
    info:    (title, message, opts) => addToast({ type: 'info',    title, message, ...opts }),
    warning: (title, message, opts) => addToast({ type: 'warning', title, message, ...opts }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Portail des toasts */}
      <div
        aria-label="Notifications"
        className="fixed bottom-24 right-4 sm:right-6 z-[200] flex flex-col gap-2 items-end pointer-events-none"
      >
        {toasts.map(t => (
          <div key={t.id} className="pointer-events-auto animate-slideUp">
            <ToastItem {...t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

/* ── Hook ────────────────────────────────────────────────── */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
