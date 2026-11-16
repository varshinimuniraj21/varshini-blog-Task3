import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="toast-icon success" />,
    error: <AlertCircle size={18} className="toast-icon error" />,
    info: <Info size={18} className="toast-icon info" />
  };

  return (
    <div className={`toast-container ${toast.type || 'info'}`} role="status" aria-live="polite">
      <div className="toast-content">
        {icons[toast.type] || icons.info}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button 
        type="button" 
        onClick={onClose} 
        className="toast-close-btn" 
        aria-label="Dismiss notification"
      >
        <X size={15} />
      </button>
    </div>
  );
}
