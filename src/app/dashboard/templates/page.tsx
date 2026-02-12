"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import {
    FileCode,
    Search,
    Filter,
    ArrowRight,
    Zap,
    Shield,
    Globe,
    MessageSquare,
    Database,
    Sparkles,
    Layout
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const templates = [
    {
        id: '1',
        name: 'AI Onboarding',
        category: 'AI Agents',
        icon: Sparkles,
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
        desc: 'Ask AI to categorize users based on their initial feedback and personalize steps.',
        tags: ['OpenAI', 'Personalization']
    },
    {
        id: '2',
        name: 'Slack Notification Hub',
        category: 'Communication',
        icon: MessageSquare,
        color: 'text-emerald-500',
        bg: 'bg-emerald-500/10',
        desc: 'Centralize alerts from multiple webhooks and route them to specific Slack channels.',
        tags: ['Slack', 'Webhooks']
    },
    {
        id: '3',
        name: 'Supabase Data Sync',
        category: 'Database',
        icon: Database,
        color: 'text-teal-500',
        bg: 'bg-teal-500/10',
        desc: 'Sync rows between Supabase and other databases with complex transformation logic.',
        tags: ['Supabase', 'SQL']
    },
    {
        id: '4',
        name: 'Stripe Payment Hook',
        category: 'Finance',
        icon: Shield,
        color: 'text-indigo-500',
        bg: 'bg-indigo-500/10',
        desc: 'Securely handle Stripe events, update user credits, and send receipt emails.',
        tags: ['Stripe', 'Security']
    },
    {
        id: '5',
        name: 'Custom Form Handler',
        category: 'Utils',
        icon: Layout,
        color: 'text-amber-500',
        bg: 'bg-amber-500/10',
        desc: 'Validate and sanitize form inputs before pushing them to your main CRM.',
        tags: ['Forms', 'Validation']
    },
    {
        id: '6',
        name: 'Edge API Cache',
        category: 'Performance',
        icon: Zap,
        color: 'text-red-500',
        bg: 'bg-red-500/10',
        desc: 'Implement a custom caching layer for your API logic at the edge.',
        tags: ['Edge', 'Speed']
    }
];

export default function TemplatesPage() {
    return (
        <div className="flex-1 p-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                    <Layout size={12} />
                    Ready-to-use bricks
                </div>
                <h1 className="text-4xl font-black tracking-tight text-foreground">Explore Templates</h1>
                <p className="text-muted-foreground text-lg">Kickstart your development with pre-built logic flows verified by our engineers.</p>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-center gap-4">
                <div className="relative w-full max-w-md">
                    <Search className="absolute left-3 top-2.5 text-muted-foreground/40" size={16} />
                    <Input placeholder="Search templates..." className="bg-muted/50 border-border pl-10 h-10 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="rounded-full h-10 px-6 text-xs font-bold border-border">All Categories</Button>
                    <Button variant="outline" className="rounded-full h-10 px-6 text-xs font-bold border-border">Top Rated</Button>
                </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {templates.map((template) => (
                    <Card key={template.id} className="group flex flex-col bg-muted/20 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                        <CardHeader>
                            <div className="flex items-start justify-between mb-4">
                                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300", template.bg)}>
                                    <template.icon className={template.color} size={24} />
                                </div>
                                <Badge variant="secondary" className="bg-background text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{template.category}</Badge>
                            </div>
                            <CardTitle className="text-xl font-black text-foreground group-hover:text-primary transition-colors">{template.name}</CardTitle>
                            <CardDescription className="line-clamp-3 pt-2 text-sm leading-relaxed">{template.desc}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <div className="flex flex-wrap gap-2 pt-2">
                                {template.tags.map(tag => (
                                    <span key={tag} className="text-[10px] bg-background border border-border px-2 py-0.5 rounded-full text-muted-foreground font-medium">#{tag}</span>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="pt-4 border-t border-border mt-auto">
                            <Button className="w-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground font-bold rounded-xl gap-2 group/btn">
                                Use Template
                                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* Help CTA */}
            <div className="bg-primary rounded-[40px] p-12 text-center text-primary-foreground relative overflow-hidden shadow-2xl shadow-primary/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h2 className="text-3xl font-black mb-4 tracking-tight">Need a custom brick?</h2>
                <p className="text-primary-foreground/70 mb-8 max-w-xl mx-auto">Our engineers can help you build and secure complex logic flows tailored to your specific infrastructure.</p>
                <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 rounded-full font-black uppercase tracking-widest text-xs">Contact Our Team</Button>
            </div>
        </div>
    );
}
