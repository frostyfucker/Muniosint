
export interface Project {
  project: string;
  count: number;
}

export interface FileEntry {
  id: number;
  path: string;
  project: string;
  size: number;
  mtime: number;
  sha256: string | null;
  mime: string;
  readonly: 0 | 1;
}

export interface OSINTFeed {
  id: number;
  name: string;
  url: string;
  updateInterval: number; // in minutes
  parser: 'JSON' | 'RSS' | 'Custom';
}

export type PanelType = 'CAMERA_FEED' | 'RSS_FEED' | 'RTMP_STREAM' | '3D_SCENE';

export interface Panel {
  id: string;
  type: PanelType;
  title: string;
}
