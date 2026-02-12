"use client";

import React from 'react';
import NodesSidebar from '@/components/editor/NodesSidebar';
import FlowEditor from '@/components/editor/FlowEditor';
import { Box, Save, Play, Settings, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function EditorPage() {
    return (
        <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 glass shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Box className="text-white" size={18} />
                        </div>
                        <span className="font-bold text-sm tracking-tight hidden sm:block">LogicBricks <span className="text-white/30 font-normal">/</span> My Workflow</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-xs gap-2 text-white/60 hover:text-white">
                        <Settings size={14} />
                        Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs gap-2 text-white/60 hover:text-white">
                        <Share2 size={14} />
                        Share
                    </Button>
                    <div className="w-px h-4 bg-white/10 mx-2" />
                    <Button variant="outline" size="sm" className="text-xs gap-2 border-white/10 bg-white/5">
                        <Save size={14} />
                        Save Draft
                    </Button>
                    <Button size="sm" className="text-xs gap-2 px-4 font-bold shadow-lg shadow-primary/20">
                        <Play size={14} />
                        Deploy Flow
                    </Button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                <NodesSidebar />
                <section className="flex-1 relative">
                    <FlowEditor />
                </section>
            </main>
        </div>
    );
}
