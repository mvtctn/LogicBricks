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
};

export type LogicNode = Node<LogicNodeData>;

interface FlowState {
    // React Flow State
    nodes: LogicNode[];
    edges: Edge[];
    nodeStatus: Record<string, 'idle' | 'running' | 'success' | 'error'>;
    onNodesChange: OnNodesChange<LogicNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;

    // Simulation State
    testInput: string;
    testOutput: string;
    logs: string[];
    isRunning: boolean;

    // Actions
    setNodes: (nodes: LogicNode[]) => void;
    setEdges: (edges: Edge[]) => void;
    addNode: (node: LogicNode) => void;
    setTestInput: (input: string) => void;
    setNodeStatus: (nodeId: string, status: 'idle' | 'running' | 'success' | 'error') => void;
    resetAllStatuses: () => void;
    runFlow: () => Promise<void>;

    // App State
    currentFlowId: string | null;
    currentFlowName: string;
    setCurrentFlowId: (id: string | null) => void;
    setCurrentFlowName: (name: string) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
    nodes: [],
    edges: [],
    nodeStatus: {},
    testInput: '{\n  "message": "Hello LogicBricks",\n  "count": 10\n}',
    testOutput: '',
    logs: [],
    isRunning: false,
    currentFlowId: null,
    currentFlowName: 'New Flow',

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
    setNodes: (nodes: LogicNode[]) => set({ nodes }),
    setEdges: (edges: Edge[]) => set({ edges }),
    addNode: (node: LogicNode) => set({ nodes: [...get().nodes, node] }),
    setTestInput: (testInput: string) => set({ testInput }),
    setNodeStatus: (nodeId: string, status: 'idle' | 'running' | 'success' | 'error') => {
        set((state) => ({
            nodeStatus: { ...state.nodeStatus, [nodeId]: status },
        }));
    },
    resetAllStatuses: () => set({ nodeStatus: {}, logs: [], testOutput: '' }),
    setCurrentFlowId: (id: string | null) => set({ currentFlowId: id }),
    setCurrentFlowName: (name: string) => set({ currentFlowName: name }),

    runFlow: async () => {
        const { nodes, edges, testInput, setNodeStatus } = get();
        set({ isRunning: true, logs: ['[System] Initializing flow...'], testOutput: '', nodeStatus: {} });

        // Simulate parsing input
        try {
            JSON.parse(testInput);
        } catch (e) {
            set({
                isRunning: false,
                logs: [...get().logs, '[Error] Invalid JSON input!'],
                testOutput: 'Error: Invalid JSON input'
            });
            return;
        }

        // Find start node
        const startNode = nodes.find(n => n.type === 'startNode');
        if (!startNode) {
            set({
                isRunning: false,
                logs: [...get().logs, '[Error] No Start Node found in the flow!']
            });
            return;
        }

        setNodeStatus(startNode.id, 'running');
        set({ logs: [...get().logs, `[Start] Flow triggered from node: ${startNode.id}`] });

        // Visual delay
        await new Promise(resolve => setTimeout(resolve, 800));
        setNodeStatus(startNode.id, 'success');
        set({ logs: [...get().logs, '[Process] Executing logic bricks...'] });

        // Simulate path traversal
        let currentNodeId = startNode.id;
        const visited = new Set();

        while (currentNodeId && !visited.has(currentNodeId)) {
            visited.add(currentNodeId);
            const nextEdge = edges.find(e => e.source === currentNodeId);
            if (!nextEdge) break;

            const nextNode = nodes.find(n => n.id === nextEdge.target);
            if (!nextNode) break;

            currentNodeId = nextNode.id;
            setNodeStatus(currentNodeId, 'running');
            await new Promise(resolve => setTimeout(resolve, 600));
            setNodeStatus(currentNodeId, 'success');
            set({ logs: [...get().logs, `[Execution] Node ${currentNodeId} (${nextNode.type}) executed.`] });
        }

        await new Promise(resolve => setTimeout(resolve, 400));
        set({
            isRunning: false,
            logs: [...get().logs, '[Success] Flow completed successfully.'],
            testOutput: 'Success: Logic executed'
        });
    },
}));
