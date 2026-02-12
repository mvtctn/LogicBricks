"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
    Box,
    ArrowRight,
    Zap,
    Shield,
    Globe,
    Cpu,
    Workflow,
    Code2,
    Network,
    Server
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ModeToggle } from '@/components/mode-toggle';

export default function SolutionsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            {/* Header (Simplified for sub-pages) */}
            <header className="fixed top-0 w-full z-50 h-20 bg-background/80 backdrop-blur-md border-b border-border px-6 md:px-12">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center shadow-lg">
                            <Box className="text-background" size={18} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground">LogicBricks</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <ModeToggle />
                        <Link href="/editor">
                            <Button variant="ghost" className="text-sm font-semibold hover:bg-muted">Log in</Button>
                        </Link>
                        <Link href="/editor">
                            <Button className="bg-foreground text-background rounded-full px-6 shadow-sm hover:bg-foreground/90">Get started</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-24 space-y-6">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">Logic for every <span className="text-blue-600">Infrastructure</span></h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">Whether you're building a simple contact form or a complex global AI orchestrator, LogicBricks scales with you.</p>
                </div>

                {/* Grid Solutions */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: 'AI Orchestration', desc: 'Chain multiple AI models together with complex conditional logic and data processing.', icon: Cpu, color: 'bg-blue-500/10' },
                        { title: 'Webhook Routing', desc: 'Securely receive, validate, and route webhooks from any service to your internal systems.', icon: Network, color: 'bg-emerald-500/10' },
                        { title: 'Serverless Automation', desc: 'Trigger complex background jobs without managing a single server or deployment script.', icon: Zap, color: 'bg-amber-500/10' },
                        { title: 'Data Transformation', desc: 'Transform JSON payloads on the fly between disparate APIs with zero-trust security.', icon: Workflow, color: 'bg-indigo-500/10' },
                        { title: 'Auth Middleware', desc: 'Inject custom authentication and authorization logic into your existing API gateway.', icon: Shield, color: 'bg-muted/50' },
                        { title: 'Edge Logic', desc: 'Run your backend logic at the edge, closer to your users for sub-50ms latency.', icon: Server, color: 'bg-pink-500/10' },
                    ].map((s, i) => (
                        <CardMockup key={i} title={s.title} desc={s.desc} icon={s.icon} color={s.color} />
                    ))}
                </div>

                {/* Enterprise Section */}
                <div className="mt-32 p-12 md:p-24 rounded-[48px] bg-muted/30 border border-border flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <Badge className="bg-primary text-primary-foreground">Enterprise</Badge>
                        <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight leading-tight">Zero-compromise security for large teams.</h2>
                        <p className="text-lg text-muted-foreground font-medium">SOC2 compliance, SSO integration, and dedicated infrastructure for your most critical logic flows.</p>
                        <Button className="bg-foreground text-background px-8 py-6 rounded-full font-bold text-lg hover:bg-foreground/90">Talk to Enterprise Team</Button>
                    </div>
                    <div className="flex-1 w-full bg-card rounded-3xl shadow-2xl border border-border p-8 space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500"><Shield size={24} /></div>
                            <div>
                                <h4 className="font-bold text-foreground">Encrypted Logic</h4>
                                <p className="text-xs text-muted-foreground">Military-grade protection</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500"><Network size={24} /></div>
                            <div>
                                <h4 className="font-bold text-foreground">Dedicated Clusters</h4>
                                <p className="text-xs text-muted-foreground">Isolated execution</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CardMockup({ title, desc, icon: Icon, color }: any) {
    return (
        <div className="p-8 rounded-3xl border border-border bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 group">
            <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", color)}>
                <Icon size={28} className="text-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
            <p className="text-muted-foreground leading-relaxed font-medium mb-6">{desc}</p>
            <Button variant="ghost" className="p-0 text-blue-600 hover:bg-transparent font-bold gap-2 group-hover:gap-3 transition-all">
                Learn more <ArrowRight size={16} />
            </Button>
        </div>
    );
}

function Badge({ children, className }: any) {
    return (
        <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest", className)}>
            {children}
        </span>
    );
}
