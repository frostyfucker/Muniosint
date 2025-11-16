
import React, { useState } from 'react';
import { OSINTFeed } from '../types';
import { RssIcon, PlusIcon, TrashIcon, XIcon } from './Icons';

interface FeedManagerProps {
    feeds: OSINTFeed[];
    onAddFeed: (feed: Omit<OSINTFeed, 'id'>) => void;
    onDeleteFeed: (id: number) => void;
}

const FeedManager: React.FC<FeedManagerProps> = ({ feeds, onAddFeed, onDeleteFeed }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [newFeed, setNewFeed] = useState({
        name: '',
        url: '',
        updateInterval: 60,
        parser: 'RSS' as OSINTFeed['parser'],
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewFeed(prev => ({ ...prev, [name]: name === 'updateInterval' ? parseInt(value, 10) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newFeed.name && newFeed.url) {
            onAddFeed(newFeed);
            setNewFeed({ name: '', url: '', updateInterval: 60, parser: 'RSS' });
            setIsAdding(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center justify-between px-2 mb-3">
                <h2 className="text-lg font-semibold text-white flex items-center">
                    <RssIcon className="w-5 h-5 mr-2 text-indigo-400" />
                    OSINT Feeds
                </h2>
                <button 
                    onClick={() => setIsAdding(!isAdding)} 
                    className="p-1 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                    aria-label={isAdding ? 'Cancel' : 'Add new feed'}
                >
                    {isAdding ? <XIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleSubmit} className="p-2 mb-3 bg-gray-900/50 rounded-md space-y-3">
                    <input
                        type="text"
                        name="name"
                        value={newFeed.name}
                        onChange={handleInputChange}
                        placeholder="Feed Name (e.g., City Council Minutes)"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                    <input
                        type="url"
                        name="url"
                        value={newFeed.url}
                        onChange={handleInputChange}
                        placeholder="Feed URL"
                        className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        required
                    />
                    <div className="flex gap-2">
                        <select
                            name="parser"
                            value={newFeed.parser}
                            onChange={handleInputChange}
                            className="flex-1 w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option>RSS</option>
                            <option>JSON</option>
                            <option>Custom</option>
                        </select>
                         <input
                            type="number"
                            name="updateInterval"
                            value={newFeed.updateInterval}
                            onChange={handleInputChange}
                            min="1"
                            className="w-32 bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
                            title="Update interval in minutes"
                        />
                    </div>
                    <button type="submit" className="w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out text-sm">
                        Add Feed
                    </button>
                </form>
            )}

            <div className="space-y-2 px-1">
                {feeds.length > 0 ? feeds.map(feed => (
                    <div key={feed.id} className="group flex items-center justify-between p-2 rounded-md hover:bg-gray-700/50">
                        <div className="truncate">
                            <p className="text-sm font-medium text-gray-200 truncate">{feed.name}</p>
                            <p className="text-xs text-gray-400 truncate">{feed.parser} &bull; Every {feed.updateInterval} mins</p>
                        </div>
                        <button onClick={() => onDeleteFeed(feed.id)} className="ml-2 p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                )) : (
                    <p className="text-sm text-gray-500 text-center py-4">No feeds configured.</p>
                )}
            </div>
        </div>
    );
};

export default FeedManager;
