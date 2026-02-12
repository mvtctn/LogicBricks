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
import { toast } from 'sonner';

export type LogicNodeData = {
  label: string;
  type: 'trigger' | 'action' | 'logic' | 'startNode' | 'processNode' | 'endNode';
  description?: string;
  config?: Record<string, any>;
  code?: string; // Compiled JS code
  prompt?: string; // Natural language logic
  result?: any; // To store execution result for EndNode
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

  // App State
  currentFlowId: string | null;
  currentFlowName: string;
  apiKey: string;

  // Actions
  setNodes: (nodes: LogicNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (node: LogicNode) => void;
  updateNodeData: (nodeId: string, data: Partial<LogicNodeData>) => void;
  setTestInput: (input: string) => void;
  setNodeStatus: (nodeId: string, status: 'idle' | 'running' | 'success' | 'error') => void;
  resetAllStatuses: () => void;
  setCurrentFlowId: (id: string | null) => void;
  setCurrentFlowName: (name: string) => void;
  setApiKey: (key: string) => void;
  deleteNode: (nodeId: string) => void;
  deleteEdge: (edgeId: string) => void;
  packIntoBrick: (nodeIds: string[]) => void;

  // Core Engine
  runFlow: () => Promise<void>;
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
  currentFlowName: 'Project X',
  apiKey: typeof window !== 'undefined' ? localStorage.getItem('logicbricks_api_key') || '' : '',

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
  setTestInput: (testInput: string) => set({ testInput }),
  setNodeStatus: (nodeId: string, status: 'idle' | 'running' | 'success' | 'error') => {
    set((state) => ({
      nodeStatus: { ...state.nodeStatus, [nodeId]: status },
    }));
  },
  resetAllStatuses: () => set({
    nodeStatus: {},
    logs: [],
    testOutput: '',
    nodes: get().nodes.map(n => ({ ...n, data: { ...n.data, result: undefined } }))
  }),
  setCurrentFlowId: (id: string | null) => set({ currentFlowId: id }),
  setCurrentFlowName: (name: string) => set({ currentFlowName: name }),
  setApiKey: (apiKey: string) => {
    set({ apiKey });
    if (typeof window !== 'undefined') {
      localStorage.setItem('logicbricks_api_key', apiKey);
    }
  },
  deleteNode: (nodeId: string) => {
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== nodeId),
      edges: state.edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
    }));
  },
  deleteEdge: (edgeId: string) => {
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== edgeId),
    }));
  },
  packIntoBrick: (nodeIds: string[]) => {
    if (nodeIds.length < 2) {
      toast.error("Select at least 2 nodes to pack into a brick");
      return;
    }
    toast.info(`Packing ${nodeIds.length} nodes into a custom Brick... (Feature in development)`);
    // Future: Create a sub-flow or a composite node
  },

  runFlow: async () => {
    const { nodes, edges, testInput, setNodeStatus, updateNodeData } = get();

    // Reset state
    set({
      isRunning: true,
      logs: ['[System] Initializing flow engine...'],
      testOutput: '',
      nodeStatus: {}
    });

    // Clear previous results from nodes
    set({
      nodes: nodes.map(n => ({ ...n, data: { ...n.data, result: undefined } }))
    });

    let currentData: any;
    try {
      currentData = JSON.parse(testInput);
      set({ logs: [...get().logs, '[Success] Input parsed successfully.'] });
    } catch (e: any) {
      set({
        isRunning: false,
        logs: [...get().logs, `[Error] Failed to parse input JSON: ${e.message}`],
        testOutput: `Error: ${e.message}`
      });
      toast.error("Invalid JSON input");
      return;
    }

    // 1. Find start node
    const startNode = nodes.find(n => n.type === 'startNode');
    if (!startNode) {
      set({
        isRunning: false,
        logs: [...get().logs, '[Error] Entry point (Start Node) not found!']
      });
      toast.error("No Start Node found");
      return;
    }

    setNodeStatus(startNode.id, 'running');
    set({ logs: [...get().logs, `[Execution] Starting at node: ${startNode.id}`] });

    await new Promise(resolve => setTimeout(resolve, 600));
    setNodeStatus(startNode.id, 'success');

    // 2. Traversal
    let currentNodeId: string | null = startNode.id;
    const visited = new Set<string>();
    const MAX_STEPS = 50;
    let steps = 0;

    while (currentNodeId && steps < MAX_STEPS) {
      steps++;
      visited.add(currentNodeId);

      // Find next edge
      const outgoingEdge = edges.find(e => e.source === currentNodeId);
      if (!outgoingEdge) {
        set({ logs: [...get().logs, `[Info] reached end of path at ${currentNodeId}.`] });
        break;
      }

      const nextNode = nodes.find(n => n.id === outgoingEdge.target);
      if (!nextNode) break;

      currentNodeId = nextNode.id;
      setNodeStatus(currentNodeId, 'running');
      set({ logs: [...get().logs, `[Execution] Moved to node: ${currentNodeId} (${nextNode.type})`] });

      // Visual delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));

      // Execute logic if it's a process node
      if (nextNode.type === 'processNode') {
        const code = nextNode.data.code;
        if (!code) {
          setNodeStatus(currentNodeId, 'error');
          set({
            isRunning: false,
            logs: [...get().logs, `[Error] Node ${currentNodeId} has no compiled code!`]
          });
          toast.error(`Node ${nextNode.data.label || currentNodeId} is missing code.`);
          return;
        }

        try {
          // Execute using new Function
          // The code should be something like "return { ...data, x: 1 };" 
          // or a full function "(data) => { ... }"

          let executeFn;
          if (code.includes('return') && !code.includes('=>')) {
            executeFn = new Function('data', code);
          } else {
            // Assume it's an arrow function or similar
            executeFn = eval(code);
          }

          const result = typeof executeFn === 'function' ? executeFn(currentData) : executeFn;
          currentData = result ?? currentData;

          setNodeStatus(currentNodeId, 'success');
          set({ logs: [...get().logs, `[Success] Node ${currentNodeId} executed successfully.`] });
        } catch (err: any) {
          setNodeStatus(currentNodeId, 'error');
          set({
            isRunning: false,
            logs: [...get().logs, `[Error] Runtime error in node ${currentNodeId}: ${err.message}`]
          });
          toast.error(`Runtime error: ${err.message}`);
          return;
        }
      } else if (nextNode.type === 'endNode') {
        updateNodeData(currentNodeId, { result: currentData });
        setNodeStatus(currentNodeId, 'success');
        set({
          logs: [...get().logs, `[Success] Final result collected at End Node.`],
          testOutput: JSON.stringify(currentData, null, 2)
        });
        break;
      }

      if (visited.has(currentNodeId)) {
        set({ logs: [...get().logs, `[Error] Loop detected at ${currentNodeId}. Stopping.`] });
        toast.error("Infinite loop detected!");
        break;
      }
    }

    set({ isRunning: false });
    if (steps >= MAX_STEPS) {
      toast.warning("Flow reached maximum execution steps (50).");
    } else {
      set({ logs: [...get().logs, '[System] Flow execution completed.'] });
    }
  },
}));
