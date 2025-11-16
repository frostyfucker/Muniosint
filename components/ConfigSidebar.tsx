
import React from 'react';
import { PanelType } from '../types';
import { XIcon, CameraIcon, RssIcon, VideoIcon, CubeIcon } from './Icons';

interface ConfigSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onAddPanel: (type: PanelType) => void;
}

const panelOptions: { type: PanelType; label: string; icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { type: 'CAMERA_FEED', label: 'Camera Feed', icon: CameraIcon },
    { type: 'RSS_FEED', label: 'RSS Feed', icon: RssIcon },
    { type: 'RTMP_STREAM', label: 'RTMP Stream', icon: VideoIcon },
    { type: '3D_SCENE', label: '3D Scene', icon: CubeIcon },
];

const ConfigSidebar: React.FC<ConfigSidebarProps> = ({ isOpen, onClose, onAddPanel }) => {
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div
                className={`fixed top-0 right-0 h-full w-72 bg-gray-800 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-lg font-semibold text-white">Add Panels</h2>
                    <button onClick={onClose} className="p-1 rounded-md text-gray-400 hover:bg-gray-700 hover:text-white">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-4 space-y-2">
                    {panelOptions.map(({ type, label, icon: Icon }) => (
                         <button
                            key={type}
                            onClick={() => onAddPanel(type)}
                            className="w-full flex items-center p-3 text-left bg-gray-900/50 hover:bg-gray-700 rounded-md transition-colors"
                        >
                            <Icon className="w-5 h-5 mr-3 text-indigo-400" />
                            <span className="text-sm font-medium text-gray-200">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ConfigSidebar;
