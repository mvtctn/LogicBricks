"use client";

import React, { useState } from 'react';
import {
    Plus,
    ArrowUpCircle,
    Mic,
    Sparkles,
    Github,
    Clock,
    Search as SearchIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DashboardPage() {
    const [prompt, setPrompt] = useState("");

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden bg-background">
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 z-0 opacity-40 dark:opacity-20 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-400 dark:bg-blue-600 blur-[150px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-pink-400 dark:bg-pink-600 blur-[150px]" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-indigo-400 dark:bg-indigo-600 blur-[150px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl text-center space-y-12">
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-4"
                    >
                        <Sparkles size={12} className="text-primary" />
                        v2.0 LogicBricks AI
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black tracking-tight text-foreground"
                    >
                        What should we build, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">Van?</span>
                    </motion.h1>
                </div>

                {/* Central AI Input Box */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative max-w-2xl mx-auto"
                >
                    <div className="relative bg-muted/50 dark:bg-muted/30 rounded-[32px] shadow-2xl shadow-indigo-500/10 border border-border p-3 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                        <textarea
                            placeholder="Ask LogicBricks to create an internal tool that..."
                            className="w-full h-32 md:h-24 bg-transparent border-none focus:ring-0 p-4 text-lg text-foreground placeholder:text-muted-foreground/40 resize-none font-medium leading-relaxed"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        />
                        <div className="flex items-center justify-between px-2 pb-2">
                            <div className="flex items-center gap-1">
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full h-10 w-10">
                                    <Plus size={20} />
                                </Button>
                                <div className="h-6 w-px bg-border mx-1" />
                                <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-xs font-semibold gap-1 px-3">
                                    Plan
                                </Button>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground rounded-full h-10 w-10">
                                    <Mic size={18} />
                                </Button>
                                <Link href="/editor">
                                    <Button size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-10 w-10 transition-all shadow-lg hover:shadow-primary/30">
                                        <ArrowUpCircle size={22} />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Shortcuts/Suggestions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    <button className="px-4 py-2 rounded-full border border-border bg-muted/30 hover:bg-muted transition-colors text-sm text-muted-foreground flex items-center gap-2">
                        <Github size={14} />
                        Sync from GitHub
                    </button>
                    <button className="px-4 py-2 rounded-full border border-border bg-muted/30 hover:bg-muted transition-colors text-sm text-muted-foreground flex items-center gap-2">
                        <Clock size={14} />
                        Recent Templates
                    </button>
                    <button className="px-4 py-2 rounded-full border border-border bg-muted/30 hover:bg-muted transition-colors text-sm text-muted-foreground flex items-center gap-2">
                        <SearchIcon size={14} />
                        Browse Marketplace
                    </button>
                </motion.div>
            </div>

            {/* Bottom Info Panels (Lovable style) */}
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end pointer-events-none">
                <div className="bg-muted/40 backdrop-blur-xl border border-border p-4 rounded-2xl w-64 pointer-events-auto hover:bg-muted/60 transition-colors cursor-pointer group">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Share LogicBricks</h4>
                    <p className="text-xs text-foreground font-semibold">Get 10 credits for each friend you invite.</p>
                </div>

                <div className="bg-muted/40 backdrop-blur-xl border border-border p-4 rounded-2xl w-64 pointer-events-auto hover:bg-muted/60 transition-colors cursor-pointer text-right">
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Upgrade to Pro</h4>
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-xs text-foreground font-black italic">Go Infinite</span>
                        <div className="w-5 h-5 rounded bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold italic shadow-lg shadow-primary/20">P</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
