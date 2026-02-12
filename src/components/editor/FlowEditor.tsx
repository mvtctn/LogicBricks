"use client";

import { useRef, useCallback } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    NodeTypes,
    useReactFlow,
    ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useFlowStore } from '@/hooks/use-flow-store';
import { StartNode } from '../nodes/StartNode';
import { ProcessNode } from '../nodes/ProcessNode';
import { EndNode } from '../nodes/EndNode';

const nodeTypes: NodeTypes = {
    startNode: StartNode,
    processNode: ProcessNode,
    endNode: EndNode,
};

let id = 0;
const getId = () => `node_${id++}`;

function FlowCanvas() {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useFlowStore();
    const { screenToFlowPosition } = useReactFlow();

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');

            if (!type) return;

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type}`, prompt: '', type: type as any },
            };

            addNode(newNode);
        },
        [screenToFlowPosition, addNode]
    );

    return (
        <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                nodeTypes={nodeTypes}
                colorMode="dark"
                fitView
                className="logic-grid"
            >
                <Background color="#333" gap={20} />
                <Controls className="!bg-background/80 !backdrop-blur-md !border-white/10 !rounded-lg" />
                <Panel position="top-left" className="glass p-3 rounded-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Editor Mode</span>
                </Panel>
            </ReactFlow>
        </div>
    );
}

export default function FlowEditor() {
    return (
        <ReactFlowProvider>
            <FlowCanvas />
        </ReactFlowProvider>
    );
}
