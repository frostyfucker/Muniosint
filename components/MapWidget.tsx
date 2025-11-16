
import React from 'react';
import { MapPinIcon } from './Icons';

const MapWidget: React.FC = () => {
    return (
        <div className="bg-gray-800 rounded-lg p-3">
            <h2 className="text-lg font-semibold text-white px-2 mb-3 flex items-center">
                <MapPinIcon className="w-5 h-5 mr-2 text-indigo-400" />
                Recon Map
            </h2>
            <div className="aspect-w-1 aspect-h-1 bg-gray-900 rounded-md overflow-hidden relative">
                <div 
                    className="absolute inset-0 bg-cover bg-center opacity-40" 
                    style={{ backgroundImage: "url('https://picsum.photos/seed/map/400/400')" }}
                ></div>
                <div className="absolute inset-0" style={{background: 'linear-gradient(to top, #111827, transparent 70%)'}}></div>
                 <div className="p-3 relative flex flex-col justify-end">
                    <p className="text-sm font-semibold text-white">Jackson County, IN</p>
                    <p className="text-xs text-gray-400">3 Active Advisories</p>
                </div>
            </div>
             <div className="mt-3 px-1 space-y-2">
                <label className="flex items-center text-sm">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-2 text-gray-300">Municipal Assets</span>
                </label>
                 <label className="flex items-center text-sm">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500" />
                    <span className="ml-2 text-gray-300">Incidents</span>
                </label>
                 <label className="flex items-center text-sm">
                    <input type="checkbox" className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-indigo-600 focus:ring-indigo-500" defaultChecked />
                    <span className="ml-2 text-gray-300">Risk Categories</span>
                </label>
            </div>
        </div>
    );
};

export default MapWidget;
