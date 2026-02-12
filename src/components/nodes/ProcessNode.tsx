"use client";

import React, { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Cpu, Sparkles, CheckCircle2, Loader2, Code2, EyeOff, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFlowStore, LogicNodeData } from '@/store/useFlowStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { NodeMenu } from '../editor/NodeMenu';

export const ProcessNode = memo(({ id, data, selected }: NodeProps) => {
    const updateNodeData = useFlowStore((state) => state.updateNodeData);
    const status = useFlowStore((state) => state.nodeStatus[id]);
    const [isCompiling, setIsCompiling] = useState(false);
    const [showCode, setShowCode] = useState(false);

    // Cast data safely
    const nodeData = data as LogicNodeData;

    const statusColors: Record<string, string> = {
        idle: selected ? 'border-primary shadow-[0_0_20px_rgba(59,130,246,0.3)]' : 'border-border',
        running: 'border-blue-400 animate-pulse shadow-[0_0_15px_rgba(96,165,250,0.5)]',
        success: 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]',
        error: 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]',
    };

    const handleCompile = async () => {
        if (!nodeData.prompt) return;

        setIsCompiling(true);
        try {
            await new Promise(r => setTimeout(r, 1500));

            // Mock code generation logic based on prompt keywords
            let generatedCode = "";
            const p = (nodeData.prompt || "").toLowerCase();

            if (p.includes("uppercase") || p.includes("viết hoa")) {
                generatedCode = "(data) => ({ ...data, message: data.message?.toUpperCase() || '' })";
            } else if (p.includes("filter") || p.includes("lọc")) {
                generatedCode = "(data) => { if (data.count > 5) return data; return null; }";
            } else {
                generatedCode = "(data) => ({ ...data, processed: true, timestamp: Date.now() })";
            }

            updateNodeData(id, { code: generatedCode });
        } catch (error) {
            console.error('Failed to compile:', error);
        } finally {
            setIsCompiling(false);
        }
    };

    return (
        <div className={cn(
            "px-4 py-3 rounded-xl border-2 bg-card/90 backdrop-blur-xl min-w-[280px] transition-all duration-300 relative group/node",
            statusColors[status || 'idle']
        )}>
            {selected && (
                <div className="absolute -top-3 -right-3 z-50 opacity-0 group-hover/node:opacity-100 transition-opacity">
                    <NodeMenu nodeId={id} />
                </div>
            )}
            <Handle type="target" position={Position.Left} className="w-3 h-3 !bg-primary border-2 border-background" />

            <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-2">
                <div className="flex items-center gap-2">
                    <Cpu size={16} className="text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Core Logic</span>
                </div>
                <div className="flex items-center gap-2">
                    {nodeData.code && (
                        <button
                            onClick={() => setShowCode(!showCode)}
                            className="p-1 hover:bg-muted rounded text-muted-foreground/30 hover:text-foreground transition-colors"
                            title={showCode ? "Hide Code" : "Show Compiled Code"}
                        >
                            {showCode ? <EyeOff size={12} /> : <Code2 size={12} />}
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {!showCode ? (
                    <>
                        <div className="space-y-1">
                            <Label className="text-[9px] text-muted-foreground/40 uppercase font-bold tracking-tighter">Node Label</Label>
                            <Input
                                className="h-8 text-xs bg-muted/40 border-border focus:border-primary/50 text-foreground"
                                placeholder="e.g. Data Processor"
                                value={nodeData.label || ''}
                                onChange={(e) => updateNodeData(id, { label: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1 relative">
                            <Label className="text-[9px] text-muted-foreground/40 uppercase font-bold tracking-tighter">Execution Prompt</Label>
                            <Textarea
                                className="min-h-[80px] text-xs bg-muted/40 border-border focus:border-primary/50 resize-none text-foreground"
                                placeholder="Describe logic in English or Vietnamese..."
                                value={nodeData.prompt || ''}
                                onChange={(e) => updateNodeData(id, { prompt: e.target.value })}
                            />
                            <Button
                                size="sm"
                                variant="secondary"
                                onClick={handleCompile}
                                disabled={isCompiling || !nodeData.prompt}
                                className="w-full mt-2 h-8 text-[10px] font-bold gap-2 bg-primary/20 hover:bg-primary text-primary hover:text-primary-foreground transition-all border-none"
                            >
                                {isCompiling ? (
                                    <Loader2 size={12} className="animate-spin" />
                                ) : (
                                    <Sparkles size={12} />
                                )}
                                {isCompiling ? "Compiling..." : "Generate Magic Code"}
                            </Button>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                            <span className="text-[9px] uppercase font-bold text-muted-foreground/20 tracking-widest">Status</span>
                            {nodeData.code ? (
                                <div className="flex items-center gap-1 text-[9px] text-emerald-500 font-bold uppercase tracking-widest">
                                    <CheckCircle2 size={10} />
                                    Code Ready
                                </div>
                            ) : (
                                <div className="text-[9px] text-muted-foreground/20 font-bold uppercase tracking-widest">
                                    No code generated
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="space-y-2 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between">
                            <Label className="text-[9px] text-primary uppercase font-bold tracking-widest">Compiled JS Stack</Label>
                            <span className="text-[8px] px-1.5 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary">READ ONLY</span>
                        </div>
                        <div className="p-3 rounded-lg bg-muted/80 dark:bg-black/60 border border-border font-mono text-[10px] text-emerald-600 dark:text-emerald-300/80 leading-relaxed max-h-[160px] overflow-y-auto">
                            {nodeData.code || '// No code generated yet'}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full h-7 text-[10px] text-muted-foreground/40 hover:text-foreground hover:bg-muted"
                            onClick={() => setShowCode(false)}
                        >
                            Return to Designer
                        </Button>
                    </div>
                )}
            </div>

            <Handle type="source" position={Position.Right} className="w-3 h-3 !bg-primary border-2 border-background" />
        </div>
    );
});

ProcessNode.displayName = 'ProcessNode';
