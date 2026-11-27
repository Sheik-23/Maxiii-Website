import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'trying' | 'success' | 'error' | 'duplicate';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message: string;
  subtext?: string;
  autoClose?: boolean;
}

interface ToastProps {
  toast: ToastData | null;
  onDismiss: () => void;
}

const CARD_ACCENT: Record<ToastType, string> = {
  trying: 'border-l-4 border-l-saffron',
  success: 'border-l-4 border-l-[#10B981]',
  error: 'border-l-4 border-l-[#EF4444]',
  duplicate: 'border-l-4 border-l-[#3B82F6]'
};

const TITLE_ACCENT: Record<ToastType, string> = {
  trying: 'text-saffron',
  success: 'text-[#10B981]',
  error: 'text-[#EF4444]',
  duplicate: 'text-[#60A5FA]'
};

export const Toast: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (!toast || toast.autoClose === false) return;
    const duration = toast.type === 'trying' ? 12000 : 5000;
    const timer = setTimeout(() => {
      onDismiss();
    }, duration);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed top-7 right-7 z-[999999] flex flex-col gap-[10px] max-w-[420px] w-[calc(100vw-32px)] pointer-events-none max-[600px]:top-5 max-[600px]:right-4 max-[600px]:left-4 max-[600px]:w-auto"
      aria-live="polite"
      aria-atomic="true"
    >
      {toast && (
        <div
          key={toast.id + '-' + toast.type}
          className={`pointer-events-auto bg-[#0B0B0E] text-[#FAF8F5] border border-white/14 rounded-[12px] py-4 px-[18px] shadow-[0_16px_40px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.08)] flex items-start gap-[14px] font-sans backdrop-blur-lg animate-[toastEnter_0.34s_cubic-bezier(0.34,1.56,0.64,1)_both] ${CARD_ACCENT[toast.type]}`}
          role="status"
        >
            <div className="shrink-0 flex items-center justify-center w-6 h-6 mt-0.5">
              {toast.type === 'trying' && (
                <div className="w-[18px] h-[18px] border-2 border-[rgba(255,138,31,0.25)] border-t-saffron rounded-full animate-[spin_0.8s_linear_infinite]" />
              )}
              {toast.type === 'success' && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="2" />
                  <polyline points="6 10.5 8.8 13.5 14 7.5" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {toast.type === 'duplicate' && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="#3B82F6" strokeWidth="2" />
                  <line x1="10" y1="9" x2="10" y2="14" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="10" cy="6" r="1" fill="#3B82F6" />
                </svg>
              )}
              {toast.type === 'error' && (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="9" stroke="#EF4444" strokeWidth="2" />
                  <line x1="10" y1="6" x2="10" y2="11" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="10" cy="14" r="1" fill="#EF4444" />
                </svg>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className={`font-display text-[14px] font-bold tracking-[0.04em] uppercase ${TITLE_ACCENT[toast.type]}`}>
                  {toast.title}
                </span>
                <button
                  type="button"
                  className="bg-transparent border-0 text-[rgba(250,248,245,0.5)] cursor-pointer px-1 text-[18px] leading-none transition-colors duration-150 hover:text-[#FAF8F5]"
                  onClick={onDismiss}
                  aria-label="Close notification"
                >
                  &times;
                </button>
              </div>
              <div className="text-[13px] leading-[1.45] text-[rgba(250,248,245,0.85)] break-words">
                {toast.message}
              </div>
              {toast.subtext && (
                <div className="text-[11.5px] leading-[1.4] text-[rgba(250,248,245,0.55)] mt-1">
                  {toast.subtext}
                </div>
              )}
            </div>
        </div>
      )}
    </div>,
    document.body
  );
};
