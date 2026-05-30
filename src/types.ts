export type DatabaseType = 'MySQL' | 'MongoDB' | 'PostgreSQL' | 'Oracle' | 'Redis';

export interface ColumnInfo {
  name: string;
  type: string;
  isPrimary?: boolean;
}

export interface TableInfo {
  id: string;
  name: string;
  rowsCount: number;
  columns: ColumnInfo[];
  selected?: boolean;
}

export interface DatabaseSource {
  id: string;
  name: string;
  type: DatabaseType;
  host: string;
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  tables: TableInfo[];
}

export interface CentralDatabase {
  name: string;
  tables: TableInfo[];
  syncStatus: 'idle' | 'syncing' | 'completed' | 'error';
  lastSyncTime?: string;
}

export interface VisualNode {
  id: string;
  label: string;
  type: 'source-db' | 'central-db' | 'table' | 'aggregator';
  x: number;
  y: number;
  dbType?: DatabaseType;
  status?: string;
  size?: number;
}

export interface VisualEdge {
  id: string;
  from: string;
  to: string;
  active: boolean;
}

export interface PipelineLog {
  timestamp: string;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
}
