"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react';
import { useFlowStore } from '@/store/useFlowStore';
import { cn } from '@/lib/utils';
import { NodeMenu } from '../editor/NodeMenu';

export const StartNode = memo(({ id, selected }: NodeProps) => {
    const status = useFlowStore((state) => state.nodeStatus[id]);

    const statusColors: Record<string, string> = {
        idle: selected ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-border',
        running: 'border-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]',
        success: 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]',
        error: 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    };

    return (
        <div className={cn(
            "px-4 py-3 rounded-xl border-2 bg-card/90 backdrop-blur-xl min-w-[200px] transition-all duration-300 relative group/node",
            statusColors[status || 'idle']
        )}>
            {selected && (
                <div className="absolute -top-3 -right-3 z-50 opacity-0 group-hover/node:opacity-100 transition-opacity">
                    <NodeMenu nodeId={id} />
                </div>
            )}
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                    <Play size={14} fill="currentColor" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Trigger</span>
                    <span className="text-xs font-semibold text-foreground">Manual Entry</span>
                </div>
            </div>

            <Handle
                type="source"
                position={Position.Right}
                className="w-3 h-3 !bg-emerald-500 border-2 border-background"
            />
        </div>
    );
});

StartNode.displayName = 'StartNode';
