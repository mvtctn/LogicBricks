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
  type: 'trigger' | 'action' | 'logic';
  description?: string;
  config?: Record<string, any>;
  code?: string; // Compiled JS/Python code
};

export type LogicNode = Node<LogicNodeData>;

interface FlowState {
  nodes: LogicNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<LogicNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: LogicNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: LogicNode) => void;
  updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
  nodes: [
    {
      id: '1',
      type: 'trigger',
      position: { x: 250, y: 5 },
      data: { label: 'HTTP Trigger', type: 'trigger', description: 'Starts when an endpoint is called' },
    },
  ],
  edges: [],
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
}));
