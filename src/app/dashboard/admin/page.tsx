"use client";

import React, { useState, useEffect } from 'react';
import {
    ShieldAlert,
    Users,
    Layers,
    Activity,
    Database,
    Search,
    Filter,
    MoreHorizontal,
    ExternalLink,
    Trash2,
    CheckCircle2,
    XCircle,
    LayoutGrid,
    Loader2,
    Settings as SettingsIcon,
    Zap,
    Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalFlows: 0,
        totalExecutions: '42.8k',
        systemLoad: '12%'
    });
    const [flows, setFlows] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchAdminData = async () => {
            setIsLoading(true);
            try {
                // Fetch all flows (requires admin role/RLS bypass)
                const { data, error } = await supabase
                    .from('flows')
                    .select('*, user_id')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setFlows(data || []);

                // Mock user count for demo (real: would fetch from auth.users or a profiles table)
                setStats(s => ({ ...s, totalFlows: data?.length || 0, totalUsers: 142 }));
            } catch (error: any) {
                console.error("Admin fetch failed:", error);
                toast.error("Admin access restricted", { description: "You might not have sufficient permissions." });
            } finally {
                setIsLoading(false);
            }
        };

        fetchAdminData();
    }, []);

    const handleDeleteFlow = async (id: string) => {
        if (!confirm("ADMIN ACTION: Forever delete this flow?")) return;
        try {
            const { error } = await supabase.from('flows').delete().eq('id', id);
            if (error) throw error;
            setFlows(flows.filter(f => f.id !== id));
            toast.success("Flow purged from system");
        } catch (error: any) {
            toast.error("Cleanup failed", { description: error.message });
        }
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center p-20">
                <div className="text-center space-y-4">
                    <Loader2 className="animate-spin text-primary mx-auto" size={40} />
                    <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">Initializing Super Admin Console...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Admin Header */}
            <div className="flex items-center justify-between bg-primary/5 border border-primary/10 p-6 rounded-3xl backdrop-blur-xl">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/20">
                        <ShieldAlert className="text-primary-foreground" size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Super Admin</h1>
                        <p className="text-muted-foreground font-semibold flex items-center gap-2">
                            <Activity size={14} className="text-emerald-500" />
                            System Oversight & Resource Management
                        </p>
                    </div>
                </div>
                <div className="hidden md:flex gap-3">
                    <Link href="/dashboard/admin/settings">
                        <Button variant="outline" className="border-border rounded-xl font-bold bg-background/50 gap-2">
                            <SettingsIcon size={16} />
                            System Config
                        </Button>
                    </Link>
                    <Button className="bg-primary hover:bg-primary/90 font-bold rounded-xl shadow-lg shadow-primary/20">System Reboot</Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500', trend: '+12% this week' },
                    { label: 'Active Flows', value: stats.totalFlows, icon: Layers, color: 'text-indigo-500', trend: '+4 today' },
                    { label: 'Executions', value: stats.totalExecutions, icon: Zap, color: 'text-amber-500', trend: '-2% (Normal)' },
                    { label: 'Cloud Resources', value: stats.systemLoad, icon: Database, color: 'text-emerald-500', trend: 'Healthy' }
                ].map((stat, i) => (
                    <Card key={i} className="bg-muted/10 border-border hover:border-primary/30 transition-all group">
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{stat.label}</CardTitle>
                            <stat.icon className={stat.color} size={16} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-black">{stat.value}</div>
                            <p className="text-[10px] font-bold text-muted-foreground/60 mt-1">{stat.trend}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Admin Tabs */}
            <Tabs defaultValue="flows" className="space-y-6">
                <TabsList className="bg-muted/40 p-1 border border-border">
                    <TabsTrigger value="flows" className="px-6 font-bold text-xs uppercase tracking-widest">Logic Flows</TabsTrigger>
                    <TabsTrigger value="users" className="px-6 font-bold text-xs uppercase tracking-widest">User Management</TabsTrigger>
                    <TabsTrigger value="infrastructure" className="px-6 font-bold text-xs uppercase tracking-widest">Infrastructure</TabsTrigger>
                </TabsList>

                <TabsContent value="flows" className="space-y-4">
                    <div className="flex items-center justify-between bg-muted/20 p-4 rounded-2xl border border-border">
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-2.5 text-muted-foreground/40" size={16} />
                            <Input placeholder="Search all system flows..." className="bg-background border-border pl-10 rounded-xl" />
                        </div>
                        <Button variant="outline" className="gap-2 border-border font-bold rounded-xl ml-4">
                            <Filter size={16} />
                            Filter
                        </Button>
                    </div>

                    <Card className="bg-background border-border overflow-hidden">
                        <Table>
                            <TableHeader className="bg-muted/30">
                                <TableRow>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Project Name</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Creator ID</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Date Created</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest text-center">Nodes</TableHead>
                                    <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {flows.map((flow) => (
                                    <TableRow key={flow.id} className="hover:bg-muted/10 transition-colors">
                                        <TableCell className="font-black text-foreground">
                                            {flow.name || "Untitled"}
                                            <p className="text-[9px] font-mono text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity truncate max-w-[150px]">
                                                {flow.id}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-xs font-mono text-muted-foreground/80">
                                            {flow.user_id?.substring(0, 15)}...
                                        </TableCell>
                                        <TableCell className="text-xs text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Clock size={12} />
                                                {new Date(flow.created_at).toLocaleDateString()}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center font-bold text-primary">
                                            {flow.nodes?.length || 0}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none text-[10px] font-bold">
                                                Operational
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <MoreHorizontal size={14} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-background border-border">
                                                    <DropdownMenuItem className="gap-2 cursor-pointer" onClick={() => window.open(`/editor?id=${flow.id}`, '_blank')}>
                                                        <ExternalLink size={14} /> View as Admin
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="gap-2 text-red-500 cursor-pointer" onClick={() => handleDeleteFlow(flow.id)}>
                                                        <Trash2 size={14} /> Purge Flow
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {flows.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-32 text-center text-muted-foreground italic">
                                            No flows detected in the system hive.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </Card>
                </TabsContent>

                <TabsContent value="users" className="py-20 text-center space-y-4">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                        <Users className="text-muted-foreground/40" size={24} />
                    </div>
                    <h3 className="text-lg font-bold">User Matrix</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">Access restricted to Root Administrators. Real-time user session monitoring and role escalation tools are located here.</p>
                </TabsContent>

                <TabsContent value="infrastructure" className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                    <Card className="bg-emerald-500/5 border-emerald-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-emerald-400">
                                <CheckCircle2 size={18} />
                                API Edge Cluster
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Region: us-east-1 (Primary)<br />
                                Latency: 12ms<br />
                                Traffic: 840 req/min
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-amber-500/5 border-amber-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-amber-400">
                                <Activity size={18} />
                                AI Compiler Engine
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Queue: 0 items<br />
                                Avg. Compile: 1.2s<br />
                                Model: Gemini-1.5-Flash
                            </p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
