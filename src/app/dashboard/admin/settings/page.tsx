"use client";

import React, { useState } from 'react';
import {
    ShieldAlert,
    Settings as SettingsIcon,
    Server,
    Cpu,
    Database,
    Globe,
    Lock,
    Zap,
    AlertTriangle,
    Save,
    History,
    Key,
    Activity,
    Cloud
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

export default function SuperAdminSettings() {
    const [isMaintenance, setIsMaintenance] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const handleGlobalSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            toast.success("System configuration updated", {
                description: "All edge nodes are being synchronized with new parameters."
            });
        }, 1500);
    };

    return (
        <div className="p-8 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black tracking-tighter flex items-center gap-3">
                        <ShieldAlert className="text-primary" size={40} />
                        Global System Settings
                    </h1>
                    <p className="text-muted-foreground text-lg uppercase text-xs font-bold tracking-[0.2em]">Root Level Configuration Console</p>
                </div>
                <Button onClick={handleGlobalSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 font-black px-8 h-12 rounded-xl shadow-xl shadow-primary/20 gap-2">
                    {isSaving ? <Activity className="animate-spin" size={18} /> : <Save size={18} />}
                    Deploy Changes
                </Button>
            </div>

            <Separator className="bg-border" />

            <Tabs defaultValue="ai" className="space-y-8">
                <TabsList className="bg-muted/40 p-1 border border-border h-14">
                    <TabsTrigger value="ai" className="px-8 font-black text-[10px] uppercase tracking-widest gap-2 data-[state=active]:bg-background">
                        <Cpu size={14} /> AI Engine
                    </TabsTrigger>
                    <TabsTrigger value="quota" className="px-8 font-black text-[10px] uppercase tracking-widest gap-2 data-[state=active]:bg-background">
                        <Zap size={14} /> Quotas
                    </TabsTrigger>
                    <TabsTrigger value="security" className="px-8 font-black text-[10px] uppercase tracking-widest gap-2 data-[state=active]:bg-background">
                        <Lock size={14} /> Security
                    </TabsTrigger>
                    <TabsTrigger value="infra" className="px-8 font-black text-[10px] uppercase tracking-widest gap-2 data-[state=active]:bg-background">
                        <Server size={14} /> Fleet
                    </TabsTrigger>
                </TabsList>

                {/* AI Configuration */}
                <TabsContent value="ai" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-muted/10 border-border">
                            <CardHeader>
                                <CardTitle className="text-lg">Primary AI Model</CardTitle>
                                <CardDescription>The default LLM used for architecting logic flows.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Default Model ID</Label>
                                    <select className="w-full h-11 bg-background border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold">
                                        <option value="gemini-1.5-pro">Gemini 1.5 Pro (Standard)</option>
                                        <option value="gemini-1.5-flash">Gemini 1.5 Flash (Performance)</option>
                                        <option value="gemini-2.0-preview">Gemini 2.0 experimental-preview</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">System-wide AI Temperature</Label>
                                    <Input type="number" defaultValue="0.7" step="0.1" className="bg-background border-border h-11" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5 border-primary/20">
                            <CardHeader>
                                <CardTitle className="text-lg">Global AI Tokens</CardTitle>
                                <CardDescription>Emergency keys used when user-keys fail or for free tier.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-primary">Master Gemini Key</Label>
                                    <div className="relative">
                                        <Key className="absolute left-3 top-3 text-primary/40" size={16} />
                                        <Input type="password" value="••••••••••••••••••••••••" readOnly className="pl-10 bg-background border-primary/20 h-11 font-mono" />
                                    </div>
                                </div>
                                <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                                    Stored in HashiCorp Vault. Changes require multi-sig approval.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Quotas & Rate Limits */}
                <TabsContent value="quota" className="space-y-6">
                    <Card className="bg-muted/10 border-border">
                        <CardHeader>
                            <CardTitle>System Performance Enforcements</CardTitle>
                            <CardDescription>Global limits to prevent resource exhaustion.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Max Nodes per Flow</Label>
                                    <Input type="number" defaultValue="100" className="bg-background border-border h-11 font-black" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Global Rate Limit (Req/Min)</Label>
                                    <Input type="number" defaultValue="5000" className="bg-background border-border h-11 font-black" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase text-muted-foreground">Execution Timeout (ms)</Label>
                                    <Input type="number" defaultValue="15000" className="bg-background border-border h-11 font-black" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security & System */}
                <TabsContent value="security" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="bg-red-500/5 border-red-500/20">
                            <CardHeader>
                                <CardTitle className="text-red-500 flex items-center gap-2">
                                    <AlertTriangle size={20} />
                                    Maintenance Mode
                                </CardTitle>
                                <CardDescription>Immediately lock the platform for all users except admins.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-between p-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                                <div className="space-y-1">
                                    <p className="font-black text-sm text-red-700">Platform Lockdown</p>
                                    <p className="text-xs text-red-700/60 leading-relaxed">Redirect all incoming traffic to maintenance splash.</p>
                                </div>
                                <Switch
                                    checked={isMaintenance}
                                    onCheckedChange={setIsMaintenance}
                                    className="data-[state=checked]:bg-red-500"
                                />
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/10 border-border">
                            <CardHeader>
                                <CardTitle>Data Retention</CardTitle>
                                <CardDescription>Cleanup policies for deleted flows and logs.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-bold">Auto-Purge Logs</Label>
                                    <Badge variant="outline" className="font-bold">After 30 Days</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <Label className="text-sm font-bold">Cold Storage Backups</Label>
                                    <Badge variant="outline" className="font-bold text-emerald-500 border-emerald-500/20">Enabled</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Infrastructure Fleet */}
                <TabsContent value="infra" className="space-y-6 text-center">
                    <div className="py-12 bg-muted/20 border-2 border-dashed border-border rounded-[40px] space-y-4">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-primary/20">
                            <Cloud className="text-primary animate-bounce" size={40} />
                        </div>
                        <h2 className="text-2xl font-black">Region Federation</h2>
                        <p className="text-muted-foreground text-sm max-w-sm mx-auto">Manage deployment clusters across multiple cloud providers and edge locations.</p>
                        <div className="pt-4">
                            <Button variant="outline" className="border-border rounded-xl font-bold px-8">View Cluster Map</Button>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>

            {/* Footer Audit Info */}
            <div className="bg-muted/10 border border-border p-6 rounded-3xl flex items-center justify-between text-muted-foreground">
                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                    <History size={16} />
                    Last Global Sync: 12 Feb 2026 21:05
                </div>
                <div className="flex items-center gap-2 text-xs font-medium italic">
                    <Database size={14} />
                    Database Schema: v1.2.4-stable
                </div>
            </div>
        </div>
    );
}
