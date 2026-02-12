"use client";

import React from 'react';
import Link from 'next/link';
import {
    Box,
    ShieldCheck,
    CheckCircle2,
    Zap,
    Layers,
    Lock,
    MessageCircle,
    Building2,
    Users2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';

export default function EnterprisePage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 h-20 bg-background/80 backdrop-blur-md border-b border-border px-6 md:px-12">
                <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Box className="text-primary-foreground" size={18} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground">LogicBricks</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/solutions" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Solutions</Link>
                        <Link href="/pricing" className="text-sm font-semibold text-muted-foreground hover:text-foreground">Pricing</Link>
                        <ModeToggle />
                        <Link href="/editor">
                            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-8">Talk to Sales</Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-40">
                    <div className="space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
                            <Building2 size={12} />
                            Enterprise Grade
                        </div>
                        <h1 className="text-6xl md:text-7xl font-black leading-tight tracking-tighter text-foreground">Scale with <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 text-foreground">confidence.</span></h1>
                        <p className="text-xl text-muted-foreground leading-relaxed font-medium">Power your mission-critical pipelines with LogicBricks. We provide the security, reliability, and support that global enterprises demand.</p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="flex items-center gap-2 bg-muted/40 px-4 py-2 rounded-xl border border-border">
                                <ShieldCheck className="text-blue-500 dark:text-blue-400" size={18} />
                                <span className="text-sm font-bold">SOC2 Certified</span>
                            </div>
                            <div className="flex items-center gap-2 bg-muted/40 px-4 py-2 rounded-xl border border-border">
                                <Lock className="text-emerald-500 dark:text-emerald-400" size={18} />
                                <span className="text-sm font-bold">Single Sign-On (SSO)</span>
                            </div>
                            <div className="flex items-center gap-2 bg-muted/40 px-4 py-2 rounded-xl border border-border">
                                <CheckCircle2 className="text-blue-500 dark:text-blue-400" size={18} />
                                <span className="text-sm font-bold">99.99% SLA</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted/40 rounded-[48px] border border-border p-10 md:p-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-blue-500/5 pointer-events-none group-hover:bg-blue-500/10 transition-colors" />
                        <h3 className="text-2xl font-bold mb-8 relative z-10">Request a custom demo</h3>
                        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">First Name</label>
                                    <Input className="bg-background border-border h-12 rounded-xl" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Last Name</label>
                                    <Input className="bg-background border-border h-12 rounded-xl" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Company Email</label>
                                <Input className="bg-background border-border h-12 rounded-xl" placeholder="john@company.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">Company Size</label>
                                <select className="w-full bg-background border border-border h-12 rounded-xl px-4 text-sm text-foreground focus:ring-1 focus:ring-blue-500 outline-none">
                                    <option>100-500 employees</option>
                                    <option>500-1000 employees</option>
                                    <option>1000+ employees</option>
                                </select>
                            </div>
                            <Button className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-primary-foreground font-black uppercase tracking-widest text-xs rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]">
                                Submit Request
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="text-center space-y-20 border-t border-border pt-32">
                    <h2 className="text-3xl font-black italic tracking-tight text-foreground">Trusted by engineering teams everywhere</h2>
                    <div className="grid md:grid-cols-3 gap-12 text-left">
                        {[
                            { title: 'Full Control', desc: 'Run on our secure global infrastructure or deploy to your own private cloud via LogicBricks Runner.', icon: Layers },
                            { title: 'Expert Support', desc: 'Direct channel to our engineering team for design reviews, performance auditing, and debugging.', icon: MessageCircle },
                            { title: 'Team Governance', desc: 'Granular role-based access control, audit logs, and environment-specific secret management.', icon: Users2 },
                        ].map((f, i) => (
                            <div key={i} className="space-y-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400"><f.icon size={24} /></div>
                                <h4 className="text-xl font-bold text-foreground">{f.title}</h4>
                                <p className="text-muted-foreground/60 leading-relaxed font-semibold italic">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
