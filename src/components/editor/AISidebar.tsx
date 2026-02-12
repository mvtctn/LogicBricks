"use client";

import React, { useState } from 'react';
import { Sparkles, Terminal, Layers, Play, Settings2, Save } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AISidebar() {
    const [prompt, setPrompt] = useState('');

    return (
        <div className="w-80 h-full border-l border-white/5 flex flex-col glass">
            {/* Header */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Sparkles className="text-primary w-5 h-5" />
                    <h2 className="font-semibold text-sm">AI Compiler</h2>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <Settings2 size={16} className="text-white/50" />
                </button>
            </div>

            {/* Tabs / Actions */}
            <div className="flex p-1 gap-1 bg-black/20 mx-4 mt-4 rounded-lg">
                <button className="flex-1 py-1.5 text-[10px] font-medium bg-white/10 rounded-md">PROMPT</button>
                <button className="flex-1 py-1.5 text-[10px] font-medium text-white/40 hover:text-white/70">HISTORY</button>
            </div>

            {/* Input Section */}
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-y-auto">
                <div className="flex-1 relative">
                    <textarea
                        placeholder="Describe your logic... (e.g., 'Filter users with balance > 0 and send email')"
                        className="w-full h-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs resize-none focus:outline-none focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="absolute bottom-3 right-3 flex gap-2">
                        <button className="p-2 bg-primary hover:bg-primary/80 rounded-lg transition-all shadow-lg shadow-primary/20 group">
                            <Terminal size={14} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Info Card */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] space-y-3">
                    <div className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Suggestions</div>
                    <div className="space-y-2">
                        {[
                            "Parse JSON from body",
                            "Connect to Supabase DB",
                            "Check condition: auth is valid",
                            "Send Discord Webhook"
                        ].map((s) => (
                            <button key={s} className="w-full text-left p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] text-white/60 hover:text-white/90 transition-all border border-transparent hover:border-white/10">
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-white/5 grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium transition-all">
                    <Save size={14} />
                    Save Draft
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-xs font-bold transition-all shadow-lg shadow-primary/20">
                    <Play size={14} />
                    Deploy
                </button>
            </div>
        </div>
    );
}
