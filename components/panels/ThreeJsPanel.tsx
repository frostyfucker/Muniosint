
import React from 'react';
import { CubeIcon } from '../Icons';

const ThreeJsPanel: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 border-2 border-dashed border-gray-700 rounded-md">
            <CubeIcon className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">3D Scene Canvas</p>
            <p className="text-xs">Loading immersive experience...</p>
        </div>
    );
};

export default ThreeJsPanel;
