
import React from 'react';
import { RssIcon } from '../Icons';

const RssFeedPanel: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-full text-gray-500 border-2 border-dashed border-gray-700 rounded-md">
            <RssIcon className="w-12 h-12 mb-2" />
            <p className="text-sm font-medium">RSS Feed Panel</p>
            <p className="text-xs">Configuration needed</p>
        </div>
    );
};

export default RssFeedPanel;
