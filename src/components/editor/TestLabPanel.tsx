"use client";

import React, { useState } from 'react';
import { Beaker, Play, Terminal, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFlowStore } from '@/store/useFlowStore';
import { cn } from '@/lib/utils';

export default function TestLabPanel() {
    const [jsonInput, setJsonInput] = useState('{\n  "age": 15,\n  "email": "user@example.com"\n}');
    const [result, setResult] = useState<any>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { nodes, edges, setNodeStatus, resetAllStatuses } = useFlowStore();

    const runFlow = async () => {
        setIsRunning(true);
        setError(null);
        setResult(null);
        resetAllStatuses();

        try {
            let currentData = JSON.parse(jsonInput);

            // 1. Find Start Node
            const startNode = nodes.find(n => n.type === 'startNode');
            if (!startNode) throw new Error("Could not find 'Start' node in your flow.");

            setNodeStatus(startNode.id, 'running');
            await new Promise(r => setTimeout(r, 400)); // Visual delay
            setNodeStatus(startNode.id, 'success');

            let currentNodeId = startNode.id;
            let pathFound = true;

            while (pathFound) {
                // Find outgoing edges
                const nextEdge = edges.find(e => e.source === currentNodeId);
                if (!nextEdge) {
                    pathFound = false;
                    break;
                }

                const nextNode = nodes.find(n => n.id === nextEdge.target);
                if (!nextNode) {
                    pathFound = false;
                    break;
                }

                currentNodeId = nextNode.id;
                setNodeStatus(currentNodeId, 'running');
                await new Promise(r => setTimeout(r, 600)); // Visual delay

                if (nextNode.type === 'processNode') {
                    const code = nextNode.data.code;
                    if (!code) {
                        setNodeStatus(currentNodeId, 'error');
                        throw new Error(`Process Node '${nextNode.data.label}' is not compiled yet.`);
                    }

                    try {
                        // Execute code
                        const executeLogic = new Function('data', code);
                        const output = executeLogic(currentData);
                        currentData = output ?? currentData; // If returns nothing, keep data
                        setNodeStatus(currentNodeId, 'success');
                    } catch (err: any) {
                        setNodeStatus(currentNodeId, 'error');
                        throw new Error(`Error in ${nextNode.data.label}: ${err.message}`);
                    }
                } else if (nextNode.type === 'endNode') {
                    setNodeStatus(currentNodeId, 'success');
                    setResult(currentData);
                    pathFound = false;
                }
            }

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="w-80 h-full border-l border-white/5 flex flex-col bg-background/50 backdrop-blur-xl z-20">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Beaker className="text-primary w-5 h-5" />
                    <h2 className="font-semibold text-sm">Test Lab</h2>
                </div>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-6 overflow-y-auto">
                {/* Input Section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Mock Input (JSON)</Label>
                        <Terminal size={12} className="text-white/20" />
                    </div>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        className="w-full h-40 bg-black/40 border border-white/10 rounded-xl p-3 font-mono text-[11px] text-white/80 resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-all"
                    />
                    <Button
                        onClick={runFlow}
                        disabled={isRunning}
                        className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-10 shadow-lg shadow-primary/20"
                    >
                        {isRunning ? (
                            <span className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Executing...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Play size={14} fill="currentColor" />
                                Run Flow
                            </span>
                        )}
                    </Button>
                </div>

                {/* Status / Output Section */}
                <div className="space-y-3 flex-1 flex flex-col">
                    <Label className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Execution Log</Label>

                    <div className="flex-1 rounded-xl bg-black/20 border border-white/5 p-4 font-mono text-[11px] overflow-y-auto space-y-2">
                        {!isRunning && !result && !error && (
                            <div className="text-white/20 italic">Press Run to start simulation...</div>
                        )}

                        {isRunning && (
                            <div className="text-blue-400 flex items-center gap-2">
                                <ChevronRight size={12} className="animate-pulse" />
                                Traversing logic path...
                            </div>
                        )}

                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-2">
                                <AlertCircle size={14} className="shrink-0 mt-0.5" />
                                <div>
                                    <div className="font-bold mb-0.5 uppercase text-[9px]">Execution Failed</div>
                                    {error}
                                </div>
                            </div>
                        )}

                        {result && (
                            <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="text-emerald-400 flex items-center gap-2 font-bold">
                                    <CheckCircle2 size={14} />
                                    SUCCESS
                                </div>
                                <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10 ">
                                    <div className="text-[9px] text-white/30 uppercase mb-2">Final Output</div>
                                    <pre className="text-emerald-400/90 whitespace-pre-wrap">
                                        {JSON.stringify(result, null, 2)}
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
