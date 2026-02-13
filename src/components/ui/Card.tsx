
import React from 'react';

// Added React.HTMLAttributes<HTMLDivElement> to allow onClick and other div props
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode, className?: string }> = ({ children, className = '', ...props }) => (
  <div 
    className={`bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader: React.FC<{ title: string, subtitle?: string, action?: React.ReactNode }> = ({ title, subtitle, action }) => (
  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
    <div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

export const CardContent: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);
