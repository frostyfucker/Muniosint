
import React, { useState, useEffect, useCallback } from 'react';
import { Project, FileEntry, OSINTFeed, Panel as PanelType, PanelType as PType } from './types';
import Header from './components/Header';
import ProjectList from './components/ProjectList';
import FilesTable from './components/FilesTable';
import MapWidget from './components/MapWidget';
import MoveFileModal from './components/MoveFileModal';
import Toast from './components/Toast';
import FeedManager from './components/FeedManager';
import ConfigSidebar from './components/ConfigSidebar';
import Panel from './components/panels/Panel';
import CameraFeedPanel from './components/panels/CameraFeedPanel';
import RssFeedPanel from './components/panels/RssFeedPanel';
import RtmpStreamPanel from './components/panels/RtmpStreamPanel';
import ThreeJsPanel from './components/panels/ThreeJsPanel';

// Mock API functions to simulate backend interaction
const MOCK_FILES: FileEntry[] = [
    { id: 1, path: '/home/roy/projects/jackson_county_audit/report.docx', project: 'jackson_county_audit', size: 1258291, mtime: 1672531199, sha256: 'a1b2c3d4...', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', readonly: 0 },
    { id: 2, path: '/home/roy/projects/jackson_county_audit/data/survey_results.csv', project: 'jackson_county_audit', size: 5124, mtime: 1672444799, sha256: 'b2c3d4e5...', mime: 'text/csv', readonly: 0 },
    { id: 3, path: '/home/roy/clients/city_of_seymour/rfp_2023.pdf', project: 'city_of_seymour', size: 2097152, mtime: 1672358399, sha256: 'c3d4e5f6...', mime: 'application/pdf', readonly: 0 },
    { id: 4, path: '/mnt/rclonedrive/archive/meeting_minutes_2022.zip', project: 'archive', size: 53687091, mtime: 1671753599, sha256: 'd4e5f6a7...', mime: 'application/zip', readonly: 1 },
    { id: 5, path: '/home/roy/projects/jackson_county_audit/notes.txt', project: 'jackson_county_audit', size: 1024, mtime: 1672531199, sha256: 'e5f6a7b8...', mime: 'text/plain', readonly: 0 },
    { id: 6, path: '/usr/local/bin/some_script.sh', project: 'system_files', size: 4096, mtime: 1671158399, sha256: 'f6a7b8c9...', mime: 'application/x-sh', readonly: 1 },
];

const MOCK_FEEDS: OSINTFeed[] = [
    { id: 1, name: 'Jackson County Advisories', url: 'https://jacksoncounty.gov/advisories.rss', updateInterval: 60, parser: 'RSS' },
    { id: 2, name: 'Seymour City Council Minutes', url: 'https://seymourcity.com/api/minutes', updateInterval: 1440, parser: 'JSON' },
];

const getMockProjects = async (): Promise<Project[]> => {
    await new Promise(res => setTimeout(res, 500));
    const projectCounts = MOCK_FILES.reduce((acc, file) => {
        acc[file.project] = (acc[file.project] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);
    return Object.entries(projectCounts).map(([project, count]) => ({ project, count }));
};

const getMockFiles = async (project: string | null): Promise<FileEntry[]> => {
    await new Promise(res => setTimeout(res, 800));
    if (project) {
        return MOCK_FILES.filter(f => f.project === project);
    }
    return MOCK_FILES;
};

const getMockFeeds = async (): Promise<OSINTFeed[]> => {
    await new Promise(res => setTimeout(res, 300));
    return MOCK_FEEDS;
};

const App: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [files, setFiles] = useState<FileEntry[]>([]);
    const [feeds, setFeeds] = useState<OSINTFeed[]>([]);
    const [panels, setPanels] = useState<PanelType[]>([]);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [loadingFiles, setLoadingFiles] = useState(true);
    const [movingFile, setMovingFile] = useState<FileEntry | null>(null);
    const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
    const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(false);
    const [isConfigSidebarOpen, setIsConfigSidebarOpen] = useState(false);


    const fetchProjects = useCallback(async () => {
        try {
            const data = await getMockProjects();
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects", error);
            setToast({ message: 'Failed to load projects.', type: 'error' });
        }
    }, []);

    const fetchFiles = useCallback(async (project: string | null) => {
        setLoadingFiles(true);
        try {
            const data = await getMockFiles(project);
            setFiles(data);
        } catch (error) {
            console.error("Failed to fetch files", error);
            setToast({ message: 'Failed to load files.', type: 'error' });
        } finally {
            setLoadingFiles(false);
        }
    }, []);

    const fetchFeeds = useCallback(async () => {
        try {
            const data = await getMockFeeds();
            setFeeds(data);
        } catch (error) {
            console.error("Failed to fetch feeds", error);
            setToast({ message: 'Failed to load OSINT feeds.', type: 'error' });
        }
    }, []);

    useEffect(() => {
        fetchProjects();
        fetchFiles(null);
        fetchFeeds();
    }, [fetchProjects, fetchFiles, fetchFeeds]);

    const handleSelectProject = (project: string | null) => {
        setSelectedProject(project);
        fetchFiles(project);
        setIsMainSidebarOpen(false); // Close sidebar on selection in mobile
    };
    
    const handleUndo = async () => {
        setToast({ message: "Simulating undo...", type: 'success'});
        await new Promise(res => setTimeout(res, 1000));
        setToast({ message: "Last action undone.", type: 'success' });
        fetchFiles(selectedProject);
    };

    const handleConfirmMove = (src: string, dst: string, dryRun: boolean) => {
        console.log(`Moving ${src} to ${dst}`, { dryRun });
        setMovingFile(null);
        if (dryRun) {
            setToast({ message: `[Dry Run] File would be moved to ${dst}`, type: 'success' });
        } else {
            setToast({ message: `File moved to ${dst}`, type: 'success' });
            setFiles(files.filter(f => f.path !== src));
        }
    };

    const handleAddFeed = (newFeed: Omit<OSINTFeed, 'id'>) => {
        const feedToAdd = { ...newFeed, id: Date.now() };
        setFeeds(prev => [...prev, feedToAdd]);
        setToast({ message: `Feed '${newFeed.name}' added.`, type: 'success' });
    };

    const handleDeleteFeed = (id: number) => {
        const feedName = feeds.find(f => f.id === id)?.name || 'Feed';
        setFeeds(prev => prev.filter(feed => feed.id !== id));
        setToast({ message: `'${feedName}' deleted.`, type: 'success' });
    };

    const handleAddPanel = (type: PType) => {
        const newPanel: PanelType = {
            id: `${type}-${Date.now()}`,
            type: type,
            title: `${type.replace(/_/g, ' ')} Panel`
        };
        setPanels(prev => [...prev, newPanel]);
        setToast({ message: `Added ${newPanel.title}.`, type: 'success'});
        setIsConfigSidebarOpen(false);
    };
    
    const handleRemovePanel = (id: string) => {
        const panelTitle = panels.find(p => p.id === id)?.title || 'Panel';
        setPanels(prev => prev.filter(p => p.id !== id));
        setToast({ message: `Removed ${panelTitle}.`, type: 'success' });
    };
    
    const renderPanelContent = (panel: PanelType) => {
        switch (panel.type) {
            case 'CAMERA_FEED': return <CameraFeedPanel />;
            case 'RSS_FEED': return <RssFeedPanel />;
            case 'RTMP_STREAM': return <RtmpStreamPanel />;
            case '3D_SCENE': return <ThreeJsPanel />;
            default: return null;
        }
    };

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
            <Header 
                onUndo={handleUndo} 
                onToggleMainSidebar={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
                onToggleConfigSidebar={() => setIsConfigSidebarOpen(!isConfigSidebarOpen)}
            />
            <main className="flex flex-col md:flex-row p-4 gap-4">
                <aside className={`${isMainSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-64 lg:w-72 flex-shrink-0 space-y-4`}>
                    <ProjectList 
                        projects={projects}
                        selectedProject={selectedProject}
                        onSelectProject={handleSelectProject}
                    />
                    <MapWidget />
                    <FeedManager 
                        feeds={feeds}
                        onAddFeed={handleAddFeed}
                        onDeleteFeed={handleDeleteFeed}
                    />
                </aside>
                <div className="flex-1 min-w-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="lg:col-span-2">
                             <FilesTable 
                                files={files} 
                                isLoading={loadingFiles}
                                onMove={(file) => setMovingFile(file)}
                            />
                        </div>
                        {panels.map(panel => (
                            <Panel key={panel.id} title={panel.title} onClose={() => handleRemovePanel(panel.id)}>
                                {renderPanelContent(panel)}
                            </Panel>
                        ))}
                    </div>
                </div>
            </main>
            <ConfigSidebar 
                isOpen={isConfigSidebarOpen}
                onClose={() => setIsConfigSidebarOpen(false)}
                onAddPanel={handleAddPanel}
            />
            {movingFile && (
                <MoveFileModal
                    file={movingFile}
                    onClose={() => setMovingFile(null)}
                    onConfirmMove={handleConfirmMove}
                />
            )}
        </div>
    );
};

export default App;
