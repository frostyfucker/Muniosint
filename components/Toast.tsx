
import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, AlertTriangleIcon, XIcon } from './Icons';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onDismiss: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => {
            handleDismiss();
        }, 5000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message, type]);

    const handleDismiss = () => {
        setVisible(false);
        setTimeout(onDismiss, 300); // Wait for fade-out transition
    };

    const isSuccess = type === 'success';
    const bgColor = isSuccess ? 'bg-green-600/90' : 'bg-red-600/90';
    const iconColor = isSuccess ? 'text-green-200' : 'text-red-200';
    const Icon = isSuccess ? CheckCircleIcon : AlertTriangleIcon;

    return (
        <div 
            className={`fixed top-5 right-5 z-50 flex items-center w-full max-w-xs p-4 text-gray-200 ${bgColor} rounded-lg shadow-lg backdrop-blur-sm transition-all duration-300 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}
            role="alert"
        >
            <div className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${iconColor} rounded-lg`}>
                <Icon className="w-5 h-5" />
            </div>
            <div className="ml-3 text-sm font-medium">{message}</div>
            <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white/10 text-gray-300 hover:text-white rounded-lg focus:ring-2 focus:ring-gray-400 p-1.5 hover:bg-white/20 inline-flex h-8 w-8"
                onClick={handleDismiss}
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <XIcon className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Toast;
