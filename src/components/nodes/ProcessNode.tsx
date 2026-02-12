"use client";

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Cpu, Sparkles, CheckCircle2, Loader2, Code2, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFlowStore, LogicNodeData } from '@/store/useFlowStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const ProcessNode = memo(({ id, data, selected }: NodeProps) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData);
    const status = useFlowStore((state) => state.nodeStatus[id]);
    const [isCompiling, setIsCompiling] = useState(false);
    const [showCode, setShowCode] = useState(false);

    // Cast data safely
    const nodeData = data as LogicNodeData;

    const statusColors: Record<string, string> = {
        idle: selected ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-blue-500/30',
        running: 'border-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]',
        success: 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]',
        error: 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    };

    const handleCompile = async () => {
        if (!nodeData.prompt) return;

        setIsCompiling(true);
        try {
            const response = await fetch('/api/compile-node', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: nodeData.prompt }),
            });

            const result = await response.json();
            if (result.code) {
                updateNodeData(id, { code: result.code });
            }
        } catch (error) {
            console.error('Failed to compile:', error);
        } finally {
            setIsCompiling(false);
        }
    };

    return (
        <div className={cn(
            "px-4 py-3 rounded-xl border-2 bg-card min-w-[260px] transition-all duration-300",
            statusColors[status || 'idle']
        )}>
            <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-blue-500 border-2 border-background" />

            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/70">Process</span>
                </div>
                <div className="flex items-center gap-2">
                    {nodeData.code && (
                        <button
                            onClick={() => setShowCode(!showCode)}
                            className="p-1 hover:bg-white/5 rounded text-white/30 hover:text-white/60 transition-colors"
                            title={showCode ? "Hide Code" : "Show Compiled Code"}
                        >
                            {showCode ? <EyeOff size={12} /> : <Code2 size={12} />}
                        </button>
                    )}
                    {nodeData.code && !isCompiling && (
                        <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                            <CheckCircle2 size={10} />
                            Compiled
                        </div>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {!showCode ? (
                    <>
                        <div className="space-y-1">
                            <Label className="text-[10px] text-white/40 uppercase font-bold tracking-tight">Node Name</Label>
                            <Input
                                className="h-8 text-xs bg-white/5 border-white/10 focus:ring-primary/50"
                                placeholder="e.g. Filter Age"
                                value={String(nodeData.label || '')}
                                onChange={(e) => updateNodeData(id, { label: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1 relative">
                            <Label className="text-[10px] text-white/40 uppercase font-bold tracking-tight">Logic Prompt</Label>
                            <textarea
                                className="w-full flex min-h-[90px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-none pr-10 text-white leading-relaxed"
                                placeholder="e.g. If user.age < 18..."
                                value={String(nodeData.prompt || '')}
                                onChange={(e) => updateNodeData(id, { prompt: e.target.value })}
                            />
                            <button
                                onClick={handleCompile}
                                disabled={isCompiling || !nodeData.prompt}
                                className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-white/10 text-white transition-all shadow-lg active:scale-95 z-10"
                                title="Compile Logic"
                            >
                                {isCompiling ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="space-y-2 animate-in fade-in duration-300">
                        <Label className="text-[10px] text-blue-400/60 uppercase font-bold tracking-tight flex items-center justify-between">
                            Compiled JavaScript
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">DEV VIEW</span>
                        </Label>
                        <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-[10px] text-blue-300/80 leading-relaxed max-h-[140px] overflow-y-auto break-all">
                            {String(nodeData.code || '')}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full h-7 text-[10px] text-white/40 hover:text-white"
                            onClick={() => setShowCode(false)}
                        >
                            Back to Editor
                        </Button>
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-blue-500 border-2 border-background" />
        </div>
    );
});

ProcessNode.displayName = 'ProcessNode';
