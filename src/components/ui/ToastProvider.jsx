import React from 'react';
import { Toaster } from 'react-hot-toast';

const ToastProvider = () => {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#1E293B',
          color: '#F8FAFC',
          borderRadius: '8px',
          border: '1px solid #334155',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#1E293B',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#1E293B',
          },
        },
      }}
    />
  );
};

export default ToastProvider;
export { toast } from 'react-hot-toast';
