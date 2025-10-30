

import React from 'react';
import { useData } from '../../context/DataContext.tsx';
import Toast from './Toast.tsx';

const ToastContainer: React.FC = () => {
  const { toasts } = useData();

  return (
    <div className="fixed top-5 right-5 z-[150] w-full max-w-xs space-y-3">
      {toasts.map(toast => (
        <Toast key={toast.id} message={toast.message} type={toast.type} />
      ))}
    </div>
  );
};

export default ToastContainer;