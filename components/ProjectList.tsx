
import React from 'react';
import { Project } from '../types';
import { FolderIcon } from './Icons';

interface ProjectListProps {
    projects: Project[];
    selectedProject: string | null;
    onSelectProject: (project: string | null) => void;
}

const ProjectItem: React.FC<{
    name: string;
    count?: number;
    isSelected: boolean;
    onClick: () => void;
}> = ({ name, count, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full text-left flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-md transition-colors duration-150 ${
            isSelected
                ? 'bg-indigo-600 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        <div className="flex items-center truncate">
            <FolderIcon className={`w-5 h-5 mr-3 ${isSelected ? 'text-indigo-200' : 'text-gray-400'}`} />
            <span className="truncate">{name}</span>
        </div>
        {count !== undefined && (
            <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                    isSelected ? 'bg-indigo-400 text-indigo-900' : 'bg-gray-700 text-gray-300'
                }`}
            >
                {count}
            </span>
        )}
    </button>
);

const ProjectList: React.FC<ProjectListProps> = ({ projects, selectedProject, onSelectProject }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-3">
            <h2 className="text-lg font-semibold text-white px-2 mb-3">Projects</h2>
            <nav className="flex flex-col space-y-1">
                <ProjectItem
                    name="All Projects"
                    isSelected={selectedProject === null}
                    onClick={() => onSelectProject(null)}
                />
                {projects.map((p) => (
                    <ProjectItem
                        key={p.project}
                        name={p.project}
                        count={p.count}
                        isSelected={selectedProject === p.project}
                        onClick={() => onSelectProject(p.project)}
                    />
                ))}
            </nav>
        </div>
    );
};

export default ProjectList;
