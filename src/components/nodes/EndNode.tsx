"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Flag, Terminal, Trash2 } from 'lucide-react';
import { useFlowStore } from '@/store/useFlowStore';
import { cn } from '@/lib/utils';
import { NodeMenu } from '../editor/NodeMenu';

export const EndNode = memo(({ id, data, selected }: NodeProps) => {
    const status = useFlowStore((state) => state.nodeStatus[id]);
    const result = (data as any).result;

    const statusColors: Record<string, string> = {
        idle: selected ? 'border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]' : 'border-border',
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
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-red-500 rounded-lg text-white">
                        <Flag size={14} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest text-foreground">End Point</span>
                </div>
                {result && <Terminal size={12} className="text-emerald-500 animate-pulse" />}
            </div>

            {result ? (
                <div className="mt-2 space-y-2 animate-in fade-in slide-in-from-top-1 duration-300">
                    <div className="text-[9px] uppercase font-bold text-muted-foreground/30 tracking-tighter">Result Output</div>
                    <div className="p-2 rounded bg-muted/50 border border-border font-mono text-[10px] text-emerald-600 dark:text-emerald-300/90 break-all max-h-[100px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap leading-tight">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                </div>
            ) : (
                <div className="mt-1 text-[9px] text-muted-foreground/20 italic">
                    Waiting for data...
                </div>
            )}

            <Handle
                type="target"
                position={Position.Left}
                className="w-3 h-3 !bg-red-500 border-2 border-background"
            />
        </div>
    );
});

EndNode.displayName = 'EndNode';
