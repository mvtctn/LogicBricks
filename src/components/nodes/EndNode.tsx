"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Flag } from 'lucide-react';

export const EndNode = memo(({ selected }: NodeProps) => {
    return (
        <div className={`px-4 py-2 rounded-lg border-2 bg-background transition-all ${selected ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' : 'border-red-500/50'}`}>
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
