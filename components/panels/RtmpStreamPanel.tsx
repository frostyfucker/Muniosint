
import React from 'react';
import { VideoIcon } from '../Icons';

const RtmpStreamPanel: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 border-2 border-dashed border-gray-700 rounded-md">
            <VideoIcon className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">RTMP Stream Offline</p>
             <p className="text-xs">Enter stream key to connect</p>
        </div>
    );
};

export default RtmpStreamPanel;
