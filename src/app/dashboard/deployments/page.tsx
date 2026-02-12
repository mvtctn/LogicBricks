"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import {
    History,
    Rocket,
    ExternalLink,
    Activity,
    Clock,
    CheckCircle2,
    XCircle,
    MoreHorizontal,
    Search,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const deployments = [
    {
        id: 'dep_8f2a1b9',
        flowName: 'Customer Onboarding Flow',
        version: 'v1.2.4',
        status: 'Active',
        endpoint: 'logicbricks.com/v1/run/flow-cust-001',
        deployedAt: '2 hours ago',
        avgExecution: '124ms'
    },
    {
        id: 'dep_5c3d2e1',
        flowName: 'Email Filter Logic',
        version: 'v1.0.1',
        status: 'Active',
        endpoint: 'logicbricks.com/v1/run/flow-email-88',
        deployedAt: 'Jan 28, 2026',
        avgExecution: '45ms'
    },
    {
        id: 'dep_1a2b3c4',
        flowName: 'Legacy Data Migration',
        version: 'v0.9.8',
        status: 'Inactive',
        endpoint: 'logicbricks.com/v1/run/flow-leg-55',
        deployedAt: 'Dec 15, 2025',
        avgExecution: '1.2s'
    },
    {
        id: 'dep_9x8y7z6',
        flowName: 'Test Sandbox',
        version: 'v1.1.0',
        status: 'Failed',
        endpoint: '-',
        deployedAt: 'Dec 10, 2025',
        avgExecution: '-'
    }
];

export default function DeploymentsPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">Deployments</h1>
                <p className="text-muted-foreground text-lg">Track and manage your live API endpoints and version history.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-muted/40 border-border">
                    <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest">Live Endpoints</CardTitle>
                        <Activity size={14} className="text-emerald-400" />
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                        <div className="text-2xl font-black">12</div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/40 border-border">
                    <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest">Total Req (24h)</CardTitle>
                        <Rocket size={14} className="text-primary" />
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                        <div className="text-2xl font-black">2.4k</div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/40 border-border">
                    <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest">Success Rate</CardTitle>
                        <CheckCircle2 size={14} className="text-emerald-400" />
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                        <div className="text-2xl font-black">99.2%</div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/40 border-border">
                    <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground/50 tracking-widest">Uptime</CardTitle>
                        <Clock size={14} className="text-primary" />
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                        <div className="text-2xl font-black">100%</div>
                    </CardContent>
                </Card>
            </div>

            {/* List Section */}
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/40 p-4 rounded-2xl border border-border">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-2.5 text-muted-foreground/40" size={16} />
                        <Input placeholder="Filter by flow name or ID..." className="bg-background border-border pl-10 h-10" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-muted/40 border-border text-xs gap-2">
                            <Filter size={14} />
                            Filter
                        </Button>
                        <Button variant="outline" size="sm" className="bg-muted/40 border-border text-xs">Recently Deployed</Button>
                    </div>
                </div>

                <Card className="bg-muted/40 border-border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border bg-muted/20">
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Deployment</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Status</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Version</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Avg. Time</TableHead>
                                <TableHead className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Timestamp</TableHead>
                                <TableHead className="text-right text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {deployments.map((dep) => (
                                <TableRow key={dep.id} className="border-border group transition-colors hover:bg-muted/20">
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{dep.flowName}</span>
                                            <span className="text-[10px] font-mono text-muted-foreground/40">{dep.id}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {dep.status === 'Active' ? (
                                            <Badge className="bg-emerald-500/10 text-emerald-400 border-none shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse" />
                                                Active
                                            </Badge>
                                        ) : dep.status === 'Failed' ? (
                                            <Badge className="bg-red-500/10 text-red-400 border-none">
                                                <XCircle size={10} className="mr-2" />
                                                Failed
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-muted text-muted-foreground/50 border-none">Inactive</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-mono text-[11px] text-muted-foreground">{dep.version}</TableCell>
                                    <TableCell className="text-xs font-medium text-muted-foreground">{dep.avgExecution}</TableCell>
                                    <TableCell className="text-xs text-muted-foreground/50">{dep.deployedAt}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/40 hover:text-foreground" title="Open API">
                                                <ExternalLink size={14} />
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/40 hover:text-foreground">
                                                        <MoreHorizontal size={14} />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="bg-background border-border" align="end">
                                                    <DropdownMenuLabel className="text-[10px] uppercase text-muted-foreground/50">Management</DropdownMenuLabel>
                                                    <DropdownMenuItem className="text-xs">View Metrics</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs">Logs & Monitoring</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs">Rollback to this version</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-xs text-red-400">Terminate Endpoint</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
