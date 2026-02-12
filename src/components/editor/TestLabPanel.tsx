"use client";

import React, { useState } from 'react';
import { Beaker, Play, Terminal, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useFlowStore } from '@/store/useFlowStore';
import { cn } from '@/lib/utils';

export default function TestLabPanel() {
    const {
        testInput,
        setTestInput,
        testOutput,
        logs,
        isRunning,
        runFlow
    } = useFlowStore();

    return (
        <div className="w-full h-full flex flex-col bg-background/50 backdrop-blur-xl">
            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Beaker className="text-primary w-5 h-5" />
                    <h2 className="font-semibold text-sm">Test Lab</h2>
                </div>
            </div>

            <div className="flex-1 p-4 flex flex-col gap-6 overflow-y-auto">
                {/* Input Section */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-[10px] uppercase font-bold text-muted-foreground/50 tracking-widest">Mock Input (JSON)</Label>
                        <Terminal size={12} className="text-muted-foreground/20" />
                    </div>
                    <textarea
                        value={testInput}
                        onChange={(e) => setTestInput(e.target.value)}
                        className="w-full h-40 bg-muted/40 dark:bg-black/40 border border-border rounded-xl p-3 font-mono text-[11px] text-foreground dark:text-white/80 resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-all md:h-64"
                        placeholder='{ "key": "value" }'
                    />
                    <Button
                        onClick={runFlow}
                        disabled={isRunning}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-10 shadow-lg shadow-primary/20"
                    >
                        {isRunning ? (
                            <span className="flex items-center gap-2">
                                <div className="w-3 h-3 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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
                <div className="space-y-3 flex-1 flex flex-col min-h-0">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground/50 tracking-widest">Execution Log</Label>

                    <div className="flex-1 rounded-xl bg-muted/20 dark:bg-black/20 border border-border p-4 font-mono text-[11px] overflow-y-auto space-y-2 max-h-[300px]">
                        {logs.length === 0 && (
                            <div className="text-muted-foreground/30 italic">Press Run to start simulation...</div>
                        )}

                        {logs.map((log, i) => (
                            <div key={i} className={cn(
                                "flex items-center gap-2",
                                log.includes('[Error]') ? "text-red-500" :
                                    log.includes('[Success]') ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/80 dark:text-white/60"
                            )}>
                                {log.includes('[Execution]') && <ChevronRight size={10} className="text-primary" />}
                                {log}
                            </div>
                        ))}
                    </div>

                    {testOutput && (
                        <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div className={cn(
                                "p-3 rounded-lg border",
                                testOutput.includes('Error') ? "bg-red-500/5 border-red-500/10 text-red-400" : "bg-emerald-500/5 border-emerald-500/10 text-emerald-400"
                            )}>
                                <div className="text-[9px] uppercase mb-2 opacity-50">Result Output</div>
                                <pre className="whitespace-pre-wrap font-bold">
                                    {testOutput}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

