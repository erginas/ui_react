// src/common/components/Toast.tsx
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

// call toast.success('Mesaj') or toast.error('Hata') from anywhere
export const notifySuccess = (msg: string) => toast.success(msg);
export const notifyError = (msg: string) => toast.error(msg);

export const ToastContainer: React.FC = () => (
  <Toaster position="top-right" reverseOrder={false} />
);