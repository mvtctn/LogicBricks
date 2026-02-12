"use client";

import React from 'react';
import { Play, Cpu, Flag, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const nodeTypes = [
    { type: 'startNode', label: 'Start Node', icon: Play, color: 'bg-emerald-500' },
    { type: 'processNode', label: 'Process Node', icon: Cpu, color: 'bg-indigo-500' },
    { type: 'endNode', label: 'End Node', icon: Flag, color: 'bg-red-500' },
];

export default function NodesSidebar() {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div className="w-64 border-r border-white/5 bg-background/50 backdrop-blur-xl p-4 flex flex-col gap-6">
            <div>
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-4">Core Bricks</h3>
                <div className="grid gap-3">
                    {nodeTypes.map((node) => (
                        <div
                            key={node.type}
                            draggable
                            onDragStart={(e) => onDragStart(e, node.type)}
                            className="group flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all cursor-grab active:cursor-grabbing"
                        >
                            <div className={cn("p-2 rounded-lg text-white", node.color)}>
                                <node.icon size={16} />
                            </div>
                            <div className="flex-1">
                                <div className="text-xs font-semibold">{node.label}</div>
                                <div className="text-[10px] text-white/40 leading-tight">Drag to canvas</div>
                            </div>
                            <Plus size={14} className="text-white/20 group-hover:text-white/60 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-auto p-4 rounded-xl bg-primary/5 border border-primary/10">
                <div className="text-[10px] font-bold text-primary uppercase mb-1">Tip</div>
                <p className="text-[10px] text-white/40 leading-normal">
                    Connect nodes from right (source) to left (target) handles to define the logic flow.
                </p>
            </div>
        </div>
    );
}
