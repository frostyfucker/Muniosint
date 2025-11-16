
import React, { useState } from 'react';
import { FileEntry } from '../types';
import { MoveIcon, XIcon } from './Icons';

interface MoveFileModalProps {
    file: FileEntry;
    onClose: () => void;
    onConfirmMove: (src: string, dst: string, dryRun: boolean) => void;
}

const MoveFileModal: React.FC<MoveFileModalProps> = ({ file, onClose, onConfirmMove }) => {
    const [destination, setDestination] = useState('');
    const [dryRun, setDryRun] = useState(true);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (destination.trim()) {
            onConfirmMove(file.path, destination, dryRun);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 transition-opacity" aria-modal="true" role="dialog">
            <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-lg m-4 transform transition-all">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                        <MoveIcon className="w-5 h-5 mr-2 text-indigo-400" />
                        Move File
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400 mb-1">Source Path</label>
                            <p className="text-sm font-mono bg-gray-900 p-2 rounded text-gray-300 truncate">{file.path}</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="destination" className="block text-sm font-medium text-gray-400 mb-1">Destination Path</label>
                            <input
                                type="text"
                                id="destination"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm font-mono"
                                placeholder="/home/roy/archive/..."
                                required
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                id="dryRun"
                                type="checkbox"
                                checked={dryRun}
                                onChange={(e) => setDryRun(e.target.checked)}
                                className="h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                            />
                            <label htmlFor="dryRun" className="ml-2 block text-sm text-gray-300">
                                Perform a dry-run
                            </label>
                        </div>
                    </div>
                    <div className="bg-gray-800/50 px-6 py-4 flex justify-end gap-3 border-t border-gray-700">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500">
                            Cancel
                        </button>
                        <button type="submit" className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${dryRun ? 'bg-yellow-600 hover:bg-yellow-500 focus:ring-yellow-500' : 'bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-500'}`}>
                            {dryRun ? 'Dry-run Move' : 'Confirm Move'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MoveFileModal;
