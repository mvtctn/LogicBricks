"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Play } from 'lucide-react';

export const StartNode = memo(({ selected }: NodeProps) => {
    return (
        <div className={`px-4 py-2 rounded-lg border-2 bg-background transition-all ${selected ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'border-emerald-500/50'}`}>
            <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-500 rounded-md text-white">
                    <Play size={14} fill="currentColor" />
                </div>
                <span className="text-sm font-bold text-emerald-500 uppercase tracking-wider">Start</span>
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
