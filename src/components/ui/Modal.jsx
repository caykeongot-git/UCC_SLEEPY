import React from 'react';
import { cn } from '../../utils/cn';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-sm animate-in fade-in duration-300">
      <div 
        className={cn(
          "w-full max-w-lg bg-dark-800 border border-dark-700 rounded-lg shadow-2xl animate-in zoom-in-95 duration-300",
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-700">
          <h3 className="text-sm font-bold uppercase tracking-widest text-light-100">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-dark-700 text-light-500 hover:text-light-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-light-300">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
