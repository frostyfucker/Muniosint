
import React from 'react';
import { CameraIcon } from '../Icons';

const CameraFeedPanel: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 border-2 border-dashed border-gray-700 rounded-md">
            <CameraIcon className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">Camera Feed Offline</p>
        </div>
    );
};

export default CameraFeedPanel;
