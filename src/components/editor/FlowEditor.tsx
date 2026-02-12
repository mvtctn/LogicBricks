"use client";

import { useRef, useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
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

import { Layers, Package, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFlowStore } from '@/store/useFlowStore';
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

    const selectedNodes = nodes.filter(node => node.selected);
    const canPack = selectedNodes.length >= 2;

    const { theme } = useTheme();
    const [colorMode, setColorMode] = useState<'light' | 'dark'>('dark');

    useEffect(() => {
        if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setColorMode(systemTheme);
        } else {
            setColorMode(theme as 'light' | 'dark');
        }
    }, [theme]);

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
                colorMode={colorMode}
                fitView
                className="logic-grid"
            >
                <Controls className="!bg-background/80 !backdrop-blur-md !border-border !rounded-lg" />
                <Panel position="top-left" className="glass p-3 rounded-lg flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-muted-foreground tracking-widest uppercase">Editor Mode</span>
                </Panel>

                {selectedNodes.length > 1 && (
                    <Panel position="bottom-center" className="glass p-2 rounded-xl flex items-center gap-2 animate-in slide-in-from-bottom-4 duration-300">
                        <div className="flex items-center gap-1 border-r border-border pr-2 mr-1">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase px-2">
                                {selectedNodes.length} Selected
                            </span>
                        </div>

                        {canPack && (
                            <Button
                                size="sm"
                                variant="secondary"
                                className="h-8 text-[11px] font-bold gap-2 bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground border-none shadow-none"
                                onClick={() => useFlowStore.getState().packIntoBrick(selectedNodes.map(n => n.id))}
                            >
                                <Package size={14} />
                                Pack into Brick
                            </Button>
                        )}

                        <Button
                            size="sm"
                            variant="destructive"
                            className="h-8 text-[11px] font-bold gap-2"
                            onClick={() => {
                                selectedNodes.forEach(n => useFlowStore.getState().deleteNode(n.id));
                            }}
                        >
                            <Trash2 size={14} />
                            Delete {selectedNodes.length > 1 ? 'All' : ''}
                        </Button>
                    </Panel>
                )}
            </ReactFlow>
        </div>
    );
}

export default function FlowEditor() {
    return <FlowCanvas />;
}
