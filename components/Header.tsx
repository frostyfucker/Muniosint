
import React from 'react';
import { UndoIcon, MenuIcon, SettingsIcon } from './Icons';

interface HeaderProps {
    onUndo: () => void;
    onToggleMainSidebar: () => void;
    onToggleConfigSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUndo, onToggleMainSidebar, onToggleConfigSidebar }) => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-700">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                         <button
                            onClick={onToggleMainSidebar}
                            className="md:hidden mr-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-label="Toggle sidebar"
                        >
                            <MenuIcon className="h-6 w-6" />
                        </button>
                        <div className="flex-shrink-0 flex items-center">
                             <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <h1 className="ml-4 text-xl font-bold text-white tracking-wider hidden sm:block">
                                Municipal OSINT Dashboard
                            </h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="flex items-center text-sm text-yellow-400 bg-yellow-900/50 px-3 py-1 rounded-full">
                            <span className="font-semibold">Dry Run Default:</span>
                            <span className="ml-1.5 font-mono bg-yellow-400 text-yellow-900 px-2 rounded">ON</span>
                        </div>
                        <button
                            onClick={onUndo}
                            className="flex items-center justify-center bg-gray-700 hover:bg-indigo-600 text-gray-200 font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                            aria-label="Undo last action"
                        >
                            <UndoIcon className="w-5 h-5 mr-2" />
                            Undo
                        </button>
                        <button
                            onClick={onToggleConfigSidebar}
                            className="flex items-center justify-center bg-gray-700 hover:bg-indigo-600 text-gray-200 p-2 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                            aria-label="Open settings"
                        >
                            <SettingsIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
