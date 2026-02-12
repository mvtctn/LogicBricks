"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Flag } from 'lucide-react';
import { useFlowStore } from '@/store/useFlowStore';
import { cn } from '@/lib/utils';

export const EndNode = memo(({ id, selected }: NodeProps) => {
    const status = useFlowStore((state) => state.nodeStatus[id]);

    const statusColors: Record<string, string> = {
        idle: selected ? 'border-red-500' : 'border-red-500/50',
        running: 'border-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]',
        success: 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]',
        error: 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    };

    return (
        <div className={cn(
            "px-4 py-2 rounded-lg border-2 bg-background transition-all duration-300",
            statusColors[status || 'idle']
        )}>
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-red-500 rounded-md text-white">
                    <Flag size={14} fill="currentColor" />
                </div>
                <span className="text-sm font-bold text-red-500 uppercase tracking-wider">End</span>
            </div>
            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 !bg-red-500 border-2 border-background"
            />
        </div>
    );
});

EndNode.displayName = 'EndNode';
