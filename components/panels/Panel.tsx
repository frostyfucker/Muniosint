
import React from 'react';
import { XIcon } from '../Icons';

interface PanelProps {
    title: string;
    onClose: () => void;
    children: React.ReactNode;
}

const Panel: React.FC<PanelProps> = ({ title, onClose, children }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col">
            <header className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-900/50 rounded-t-lg">
                <h3 className="text-sm font-semibold text-white truncate">{title}</h3>
                <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:text-white hover:bg-gray-700">
                    <XIcon className="w-4 h-4" />
                </button>
            </header>
            <div className="flex-1 p-4 min-h-[200px]">
                {children}
            </div>
        </div>
    );
};

export default Panel;
