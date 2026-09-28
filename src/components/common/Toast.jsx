import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
// ============================================================
// NEXORA — Toast Notification Component
// ============================================================

const ICONS = { success: CheckCircle, error: AlertCircle, info: Info };
const COLORS = { success: 'var(--color-green)', error: 'var(--color-red)', info: 'var(--color-primary)' };

function Toast({ id, message, type = 'info', onDismiss }) {
  const Icon = ICONS[type] || Info;
  return (
    <div className={`toast toast-${type} animate-slideInRight`}>
      <Icon size={16} style={{ color: COLORS[type], flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={() => onDismiss(id)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 0 }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default function ToastContainer({ toasts, onDismiss }) {
  if (!toasts.length) return null;
  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((t) => (
        <Toast key={t.id} {...t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
