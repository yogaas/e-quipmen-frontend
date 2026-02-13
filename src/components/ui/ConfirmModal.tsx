import React from 'react';
import { Button } from './Button';
import { CheckCircle,  Trash, Trash2, } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  variant?: 'danger' | 'primary' | 'success';
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ 
  isOpen, onClose, onConfirm, title, message, variant = 'danger' 
}) => {
    if (!isOpen) return null;

    const iconPrimary = (variant == 'danger')? <Trash2 size={18}  className='mr-2'/> : <CheckCircle size={18} className='mr-2' />; 
    const buttonConfirm = variant == 'danger'? <Button variant="danger" onClick={onConfirm} className="flex-1">{iconPrimary} Konfirmnasi</Button> : <Button variant="primary" onClick={onConfirm} className="flex-1">{iconPrimary} Konfirmnasi</Button>;

  return (
    <div className="fixed inset-0 backdrop-blur-sm animate-in fade-in duration-200 z-50 flex items-center justify-center bg-slate-900/40">
      <div className={`bg-white dark:bg-slate-900 w-full max-w-xs rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200`}>
        <div className="p-6">
        <div className="text-center">
        <div className={`w-16 h-16 ${variant === 'danger' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'} rounded-full flex items-center justify-center mx-auto mb-4`}>
          {variant === 'danger' ? <Trash /> : <CheckCircle />}
        </div>
        <h3 className="text-xl font-black text-slate-800 mb-2 tracking-tight">{title}</h3>
        <p className="text-sm text-slate-500 mb-8 leading-relaxed font-medium">
          {message}
        </p>
      </div>
      <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">Batal</Button>
            {buttonConfirm}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ConfirmModal;