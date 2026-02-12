import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react';

export type LogicNodeData = {
  label: string;
  type: 'trigger' | 'action' | 'logic' | 'startNode' | 'processNode' | 'endNode';
  description?: string;
  config?: Record<string, any>;
  code?: string; // Compiled JS/Python code
  prompt?: string; // Natural language logic
};

export type LogicNode = Node<LogicNodeData>;

interface FlowState {
  nodes: LogicNode[];
  edges: Edge[];
  nodeStatus: Record<string, 'idle' | 'running' | 'success' | 'error'>;
  onNodesChange: OnNodesChange<LogicNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: LogicNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: LogicNode) => void;
  updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => void;
  setNodeStatus: (nodeId: string, status: 'idle' | 'running' | 'success' | 'error') => void;
  resetAllStatuses: () => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [],
  edges: [],
  nodeStatus: {},
  onNodesChange: (changes: NodeChange<LogicNode>[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: LogicNode[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  addNode: (node: LogicNode) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return { ...node, data: { ...node.data, ...data } };
        }
        return node;
      }),
    });
  },
  setNodeStatus: (nodeId: string, status: 'idle' | 'running' | 'success' | 'error') => {
    set((state) => ({
      nodeStatus: { ...state.nodeStatus, [nodeId]: status },
    }));
  },
  resetAllStatuses: () => {
    set({ nodeStatus: {} });
  },
}));
