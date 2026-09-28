// ============================================================
// NEXORA — Modal Component
// ============================================================
import { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 560, footer = null }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay animate-scaleIn" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal-panel" style={{ maxWidth }}>
        {title && (
          <div className="modal-header">
            <h3 style={{ fontSize: 'var(--text-xl)', fontFamily: 'var(--font-display)', fontWeight: 700 }}>{title}</h3>
            <button className="btn btn-icon btn-ghost" onClick={onClose} aria-label="Close">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
