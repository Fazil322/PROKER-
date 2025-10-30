

import React, { useState, useEffect } from 'react';
import { Toast as ToastType } from '../../types.ts';

const toastConfig = {
    success: {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        bg: 'bg-green-100 border-green-400 dark:bg-green-900/50 dark:border-green-700',
        text: 'text-green-800 dark:text-green-200'
    },
    error: {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        bg: 'bg-red-100 border-red-400 dark:bg-red-900/50 dark:border-red-700',
        text: 'text-red-800 dark:text-red-200'
    },
    info: {
        icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        bg: 'bg-blue-100 border-blue-400 dark:bg-blue-900/50 dark:border-blue-700',
        text: 'text-blue-800 dark:text-blue-200'
    }
}

const Toast: React.FC<Omit<ToastType, 'id'>> = ({ message, type }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 2800);
        return () => clearTimeout(timer);
    }, []);

    const config = toastConfig[type];

    return (
        <div className={`
            p-4 rounded-lg shadow-lg border-l-4 flex items-center space-x-3
            transition-all duration-300 ease-in-out backdrop-blur-sm
            ${config.bg} ${config.text}
            ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
        `}>
            {config.icon}
            <p className="text-sm font-medium">{message}</p>
        </div>
    );
};

export default Toast;