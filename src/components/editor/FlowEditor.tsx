"use client";

import React, { useCallback, useMemo } from 'react';
import {
    ReactFlow,
    Background,
    Controls,
    Panel,
    NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useFlowStore } from '@/store/useFlowStore';
import { CustomNode } from './CustomNode';
import { cn } from '@/lib/utils';

const nodeTypes: NodeTypes = {
    trigger: CustomNode,
    action: CustomNode,
    logic: CustomNode,
};

export default function FlowEditor() {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useFlowStore();

    const defaultEdgeOptions = useMemo(() => ({
        animated: true,
        style: { stroke: 'hsl(var(--primary))', strokeWidth: 2 },
    }), []);

    return (
        <div className="w-full h-full relative">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                defaultEdgeOptions={defaultEdgeOptions}
                colorMode="dark"
                fitView
                className="logic-grid"
            >
                <Background color="#333" gap={20} />
                <Controls className="!bg-background/80 !backdrop-blur-md !border-white/10 !rounded-lg" />
                <Panel position="top-left" className="glass p-3 rounded-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-white/70 tracking-wider uppercase">Live Editor</span>
                </Panel>
            </ReactFlow>
        </div>
    );
}
