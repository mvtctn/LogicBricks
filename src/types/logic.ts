export type NodeType = 'trigger' | 'action' | 'logic';

export interface LogicNodeData {
    label: string;
    type: NodeType;
    description?: string;
    config?: Record<string, any>;
    code?: string;
    status?: 'idle' | 'running' | 'success' | 'error';
    lastRun?: string;
}

export interface LogicFlow {
    id: string;
    name: string;
    nodes: any[];
    edges: any[];
    createdAt: string;
    updatedAt: string;
}
