
import React from 'react';
import { FileEntry } from '../types';
import { DownloadIcon, MoveIcon, ReadOnlyIcon, FileIcon } from './Icons';

interface FilesTableProps {
    files: FileEntry[];
    isLoading: boolean;
    onMove: (file: FileEntry) => void;
}

const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const TableRowSkeleton: React.FC = () => (
    <tr className="bg-gray-800 animate-pulse">
        <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-1/4"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-full"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-2/3"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-1/2"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-1/3"></div></td>
        <td className="px-4 py-3"><div className="h-4 bg-gray-700 rounded w-1/4"></div></td>
        <td className="px-4 py-3"><div className="flex gap-2"><div className="h-8 w-16 bg-gray-700 rounded"></div><div className="h-8 w-16 bg-gray-700 rounded"></div></div></td>
    </tr>
);

const FilesTable: React.FC<FilesTableProps> = ({ files, isLoading, onMove }) => {
    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"></th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Path</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Project</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Modified</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Read-Only</th>
                            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {isLoading && Array.from({ length: 5 }).map((_, i) => <TableRowSkeleton key={i} />)}
                        {!isLoading && files.map((f) => (
                            <tr key={f.id} className="hover:bg-gray-700/50 transition-colors duration-150">
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400"><FileIcon className="w-5 h-5" /></td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-mono text-gray-300 max-w-xs truncate" title={f.path}>{f.path}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{f.project}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{formatBytes(f.size)}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-400">{new Date(f.mtime * 1000).toLocaleString()}</td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                                    {f.readonly ? <ReadOnlyIcon className="w-5 h-5 text-yellow-400 inline-block" /> : <span className="text-gray-500">-</span>}
                                </td>
                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => onMove(f)} className="flex items-center text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 px-3 py-1.5 rounded-md text-xs transition">
                                            <MoveIcon className="w-4 h-4 mr-1.5" /> Move
                                        </button>
                                        <a href={`/api/download?path=${encodeURIComponent(f.path)}`} download className="flex items-center text-indigo-400 hover:text-indigo-300 bg-indigo-900/50 hover:bg-indigo-900 px-3 py-1.5 rounded-md text-xs transition">
                                            <DownloadIcon className="w-4 h-4 mr-1.5" /> Download
                                        </a>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {!isLoading && files.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500">No files found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FilesTable;
