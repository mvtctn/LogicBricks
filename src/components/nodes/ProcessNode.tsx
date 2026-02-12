"use client";

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Cpu, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFlowStore } from '@/store/useFlowStore';

export const ProcessNode = memo(({ id, data, selected }: NodeProps) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData);
    const [isCompiling, setIsCompiling] = useState(false);

    const handleCompile = async () => {
        if (!data.prompt) return;

        setIsCompiling(true);
        try {
            const response = await fetch('/api/compile-node', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: data.prompt }),
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
        <div className={`px-4 py-3 rounded-xl border-2 bg-card min-w-[240px] transition-all ${selected ? 'border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-blue-500/30'}`}>
            <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-blue-500 border-2 border-background" />

            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-blue-500" />
                    <span className="text-xs font-bold uppercase tracking-widest text-white/70">Process</span>
                </div>
                {data.code && !isCompiling && (
                    <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                        <CheckCircle2 size={10} />
                        Compiled
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="space-y-1">
                    <Label className="text-[10px] text-white/40 uppercase">Node Name</Label>
                    <Input
                        className="h-8 text-xs bg-white/5 border-white/10"
                        placeholder="e.g. Filter Age"
                        value={data.label as string}
                        onChange={(e) => updateNodeData(id, { label: e.target.value })}
                    />
                </div>

                <div className="space-y-1 relative">
                    <Label className="text-[10px] text-white/40 uppercase">Logic Prompt</Label>
                    <textarea
                        className="w-full flex min-h-[80px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-none pr-10 text-white"
                        placeholder="e.g. If user.age < 18..."
                        value={data.prompt as string || ''}
                        onChange={(e) => updateNodeData(id, { prompt: e.target.value })}
                    />
                    <button
                        onClick={handleCompile}
                        disabled={isCompiling || !data.prompt}
                        className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-blue-500 hover:bg-blue-600 disabled:bg-white/10 text-white transition-all shadow-lg active:scale-95 z-10"
                        title="Compile Logic"
                    >
                        {isCompiling ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                    </button>
                </div>
            </div>

            <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-blue-500 border-2 border-background" />
        </div>
    );
});

ProcessNode.displayName = 'ProcessNode';
