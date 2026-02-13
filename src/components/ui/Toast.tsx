import React, { useEffect, useState } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);
      
      if (elapsed >= duration) {
        clearInterval(interval);
        onClose();
      }
    }, 10);

    return () => clearInterval(interval);
  }, [onClose, duration]);

  const variants = {
    success: {
      bg: 'bg-white/90',
      border: 'border-emerald-100',
      text: 'text-slate-800',
      accent: 'bg-emerald-500',
      icon: (
        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        </div>
      )
    },
    error: {
      bg: 'bg-white/90',
      border: 'border-rose-100',
      text: 'text-slate-800',
      accent: 'bg-rose-500',
      icon: (
        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </div>
      )
    },
    info: {
      bg: 'bg-white/90',
      border: 'border-blue-100',
      text: 'text-slate-800',
      accent: 'bg-blue-500',
      icon: (
        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
        </div>
      )
    }
  };

  const current = variants[type];

  return (
    <div 
      className={`
        pointer-events-auto
        relative flex items-center gap-4 min-w-[340px] max-w-[510px] 
        p-4 pr-5 rounded-[1rem] border shadow-2xl backdrop-blur-xl
        animate-in slide-in-from-right-12 fade-in duration-500 ease-out
        ${current.bg} ${current.border}
      `}
    >
      <div className="flex-shrink-0">
        {current.icon}
      </div>
      
      <div className="flex-1">
        <p className={`text-sm font-black tracking-tight ${current.text} leading-tight`}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </p>
        <p className="text-xs font-semibold text-slate-500 mt-1">
          {message}
        </p>
      </div>

      <button 
        onClick={onClose}
        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all active:scale-90"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>

      {/* Progress Bar Container */}
      <div className="absolute bottom-1 left-16 right-16 h-1 bg-slate-100/30 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-100 ease-linear ${current.accent}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default Toast;