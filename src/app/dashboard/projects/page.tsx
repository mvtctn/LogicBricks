"use client";

import React, { useState } from 'react';
import {
    LayoutGrid,
    Search,
    Filter,
    MoreVertical,
    Clock,
    Star,
    Users,
    Plus,
    Box,
    ExternalLink,
    Zap,
    Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const projects = [
    {
        id: '1',
        name: 'E-commerce API Hooks',
        desc: 'Product filtering and checkout logic for Headless CMS.',
        updated: '12m ago',
        starred: true,
        shared: false,
        nodes: 12,
        executions: '2.4k',
        status: 'Active'
    },
    {
        id: '2',
        name: 'Auth Middleware Flow',
        desc: 'JWT validation and role-based access control logic.',
        updated: '2h ago',
        starred: false,
        shared: true,
        nodes: 8,
        executions: '12k',
        status: 'Active'
    },
    {
        id: '3',
        name: 'Image Processor',
        desc: 'Automatically crop and watermark uploaded images.',
        updated: 'Yesterday',
        starred: true,
        shared: false,
        nodes: 5,
        executions: '840',
        status: 'Inactive'
    },
    {
        id: '4',
        name: 'CRM Webhook',
        desc: 'Sync customer data between HubSpot and internal DB.',
        updated: '3 days ago',
        starred: false,
        shared: false,
        nodes: 15,
        executions: '150',
        status: 'Active'
    },
    {
        id: '5',
        name: 'Slack Bot Logic',
        desc: 'Handling /commands and interactive components.',
        updated: '1 week ago',
        starred: false,
        shared: true,
        nodes: 9,
        executions: '3.1k',
        status: 'Active'
    },
    {
        id: '6',
        name: 'Data Scraper Flow',
        desc: 'Weekly report generation from 12 different sources.',
        updated: '2 weeks ago',
        starred: true,
        shared: false,
        nodes: 24,
        executions: '12',
        status: 'Failed'
    }
];

import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export default function ProjectsPage() {
    const [view, setView] = useState<'grid' | 'list'>('grid');
    const [isLoading, setIsLoading] = useState(true);
    const [projects, setProjects] = useState<any[]>([]);
    const supabase = createClient();

    const fetchProjects = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('flows')
                .select('*')
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setProjects(data || []);
        } catch (error: any) {
            toast.error("Failed to load projects", { description: error.message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;

        try {
            const { error } = await supabase
                .from('flows')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setProjects(projects.filter(p => p.id !== id));
            toast.success("Project deleted");
        } catch (error: any) {
            toast.error("Delete failed", { description: error.message });
        }
    };

    React.useEffect(() => {
        fetchProjects();
    }, []);

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <Loader2 className="animate-spin text-primary" size={32} />
            </div>
        );
    }

    return (
        <div className="flex-1 p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight mb-1 flex items-center gap-3 text-foreground">
                        <LayoutGrid className="text-primary" />
                        All Projects
                    </h1>
                    <p className="text-muted-foreground">Manage and organize all your logic brick flows in one place.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Link href="/editor">
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-2 shadow-lg shadow-primary/20">
                            <Plus size={18} />
                            New Project
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/30 p-4 rounded-2xl border border-border">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 text-muted-foreground/40" size={16} />
                    <Input placeholder="Search projects..." className="bg-background/50 border-border pl-10 h-10 rounded-xl" />
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" size="sm" className="bg-background/50 border-border text-xs gap-2 rounded-lg">
                        <Filter size={14} />
                        Filter
                    </Button>
                    <div className="h-4 w-px bg-border" />
                    <div className="flex items-center gap-1 bg-background/50 p-1 rounded-lg border border-border">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-7 w-7 rounded-md transition-all", view === 'grid' ? "bg-primary/20 text-primary" : "text-muted-foreground")}
                            onClick={() => setView('grid')}
                        >
                            <LayoutGrid size={14} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-7 w-7 rounded-md transition-all", view === 'list' ? "bg-primary/20 text-primary" : "text-muted-foreground")}
                            onClick={() => setView('list')}
                        >
                            <MoreVertical size={14} className="rotate-90" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="group overflow-hidden bg-muted/20 border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                        <CardHeader className="pb-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center text-primary">
                                        <Box size={16} />
                                    </div>
                                    <Badge variant="outline" className={cn(
                                        "text-[10px] font-bold border-none",
                                        project.status === 'Active' ? "bg-emerald-500/10 text-emerald-500" :
                                            project.status === 'Failed' ? "bg-red-500/10 text-red-500" : "bg-muted text-muted-foreground"
                                    )}>
                                        {project.status}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                    {project.starred && <Star size={14} className="fill-amber-400 text-amber-400" />}
                                    {project.shared && <Users size={14} className="text-primary" />}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical size={14} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-background border-border" align="end">
                                            <DropdownMenuItem>Rename</DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => handleDelete(project.id)} className="text-red-500">Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors truncate">
                                {project.name}
                            </CardTitle>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed h-10">
                                {project.nodes?.length || 0} nodes in this flow.
                            </p>
                        </CardHeader>
                        <CardContent className="pb-4 space-y-4">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Clock size={12} />
                                    <span>Updated {new Date(project.updated_at).toLocaleDateString()}</span>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="pt-0 flex items-center gap-2 border-t border-border mt-2 pt-4 bg-muted/30">
                            <Link href={`/editor?id=${project.id}`} className="flex-1">
                                <Button variant="ghost" className="w-full text-xs font-bold gap-2 h-8">
                                    <Box size={14} />
                                    Open Flow
                                </Button>
                            </Link>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                <ExternalLink size={14} />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}

                {/* Create New Card */}
                <Link href="/editor" className="group h-full">
                    <Card className="h-full border-2 border-dashed border-border bg-transparent hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center p-8 space-y-4 cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-muted border border-border flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all duration-300">
                            <Plus size={24} />
                        </div>
                        <div className="text-center">
                            <h3 className="font-bold text-foreground">New Project</h3>
                            <p className="text-xs text-muted-foreground mt-1">Start building a new flow</p>
                        </div>
                    </Card>
                </Link>
            </div>
        </div>
    );
}
