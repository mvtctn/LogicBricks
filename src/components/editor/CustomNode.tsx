"use client";

import React, { memo } from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { LogicNodeData } from '@/store/useFlowStore';
import { Zap, Play, Filter, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

export type LogicNode = Node<LogicNodeData, 'trigger' | 'action' | 'logic'>;

const iconMap = {
    trigger: Zap,
    action: Play,
    logic: Filter,
};

const colorMap = {
    trigger: 'text-amber-400 bg-amber-400/10 border-amber-400/50',
    action: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/50',
    logic: 'text-indigo-400 bg-indigo-400/10 border-indigo-400/50',
};

export const CustomNode = memo((props: NodeProps<LogicNode>) => {
    const { data, selected } = props;
    const Icon = iconMap[data.type as keyof typeof iconMap] || Box;
    const colors = colorMap[data.type as keyof typeof colorMap] || 'text-slate-400 bg-slate-400/10 border-slate-400/50';

    return (
        <div className={cn(
            "px-4 py-3 rounded-xl glass-card min-w-[200px] transition-all duration-200",
            selected ? "ring-2 ring-primary border-primary/50 shadow-[0_0_20px_rgba(139,92,246,0.3)]" : "hover:border-white/20"
        )}>
            {data.type !== 'trigger' && (
                <Handle type="target" position={Position.Top} className="w-3 h-3 border-2 border-background bg-primary" />
            )}

            <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg border", colors)}>
                    <Icon size={18} />
                </div>
                <div>
                    <div className="text-sm font-semibold text-white/90">{data.label}</div>
                    {data.description && (
                        <div className="text-[10px] text-white/50 leading-tight mt-0.5">{data.description}</div>
                    )}
                </div>
            </div>

            <Handle type="source" position={Position.Bottom} className="w-3 h-3 border-2 border-background bg-primary" />
        </div>
    );
});

CustomNode.displayName = 'CustomNode';
