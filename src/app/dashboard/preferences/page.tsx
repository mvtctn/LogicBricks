"use client";

import React, { useState, useEffect } from 'react';
import {
    Settings as SettingsIcon,
    Shield,
    Bell,
    Key,
    Database,
    Cpu,
    Zap,
    Save,
    Loader2,
    Lock,
    Eye,
    EyeOff,
    Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';

export default function PreferencesPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [showKey, setShowKey] = useState(false);
    const [geminiKey, setGeminiKey] = useState("");
    const supabase = createClient();

    useEffect(() => {
        // Load settings from localStorage or DB
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) setGeminiKey(savedKey);
    }, []);

    const handleSaveGeneral = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            toast.success("Preferences saved", { description: "Your workspace settings have been updated." });
        }, 1000);
    };

    const handleSaveAI = () => {
        localStorage.setItem('gemini_api_key', geminiKey);
        toast.success("AI Configuration updated", { description: "Current API key will be used for flow generation." });
    };

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
                    <SettingsIcon className="text-primary" size={32} />
                    Settings
                </h1>
                <p className="text-muted-foreground text-lg">Manage your workspace configuration and AI integration.</p>
            </div>

            <Separator className="bg-border" />

            <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="bg-muted/40 p-1 border border-border h-12">
                    <TabsTrigger value="general" className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-widest gap-2">
                        <Shield size={14} />
                        General
                    </TabsTrigger>
                    <TabsTrigger value="ai" className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-widest gap-2">
                        <Cpu size={14} />
                        AI Engines
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="data-[state=active]:bg-background data-[state=active]:shadow-sm px-6 font-bold text-xs uppercase tracking-widest gap-2">
                        <Bell size={14} />
                        Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-muted/20 border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Database size={18} className="text-primary" />
                                    Workspace
                                </CardTitle>
                                <CardDescription>Basic configuration for your logic environment.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Workspace Name</Label>
                                    <Input defaultValue="Personal Workspace" className="bg-background border-border" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Default Node Layout</Label>
                                    <select className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:ring-1 focus-visible:ring-primary outline-none text-foreground">
                                        <option>Horizontal (Left to Right)</option>
                                        <option>Vertical (Top to Bottom)</option>
                                        <option>Organic (Scattered)</option>
                                    </select>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/20 border-border">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Lock size={18} className="text-emerald-400" />
                                    Privacy
                                </CardTitle>
                                <CardDescription>Control who can see your logic flows.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-bold">Public Profiling</p>
                                        <p className="text-[11px] text-muted-foreground">Allow search engines to index your flows.</p>
                                    </div>
                                    <Switch />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                                    <div className="space-y-0.5">
                                        <p className="text-sm font-bold">Anonymous Analytics</p>
                                        <p className="text-[11px] text-muted-foreground">Help us improve LogicBricks.</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleSaveGeneral} disabled={isLoading} className="gap-2 font-bold px-8 shadow-lg shadow-primary/10">
                            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            Save Workspace
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="ai" className="max-w-2xl mx-auto py-4">
                    <Card className="glass border-primary/20 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Sparkles size={20} className="text-primary animate-pulse" />
                                AI Architect Configuration
                            </CardTitle>
                            <CardDescription className="text-primary/60">LogicBricks uses Google Gemini to generate and compile your flows.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/80">Google Gemini API Key</Label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-3 text-primary/40" size={16} />
                                    <Input
                                        type={showKey ? "text" : "password"}
                                        placeholder="Enter your Gemini API key..."
                                        className="bg-background border-primary/20 pl-10 h-12 font-mono text-sm focus-visible:ring-primary/20"
                                        value={geminiKey}
                                        onChange={(e) => setGeminiKey(e.target.value)}
                                    />
                                    <button
                                        onClick={() => setShowKey(!showKey)}
                                        className="absolute right-3 top-3 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-muted-foreground/60 leading-relaxed">
                                    Your key is stored locally in your browser and used only for requests from your machine.
                                    Get a free key from <a href="https://aistudio.google.com/" target="_blank" className="text-primary underline">Google AI Studio</a>.
                                </p>
                            </div>

                            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 flex items-start gap-3">
                                <Zap className="text-primary shrink-0 mt-1" size={18} />
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-primary">Advanced AI Features</p>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                                        LogicBricks AI Architect can handle complex logic branching, API connections, and data transformations.
                                    </p>
                                </div>
                            </div>

                            <Button onClick={handleSaveAI} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black h-12 rounded-xl shadow-xl shadow-primary/20">
                                Apply AI Configuration
                            </Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notifications" className="max-w-2xl mx-auto py-8 text-center space-y-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                        <Bell className="text-muted-foreground/40" size={32} />
                    </div>
                    <h3 className="text-xl font-bold">Stay Updated</h3>
                    <p className="text-muted-foreground text-sm max-w-sm mx-auto">Configure how and when you receive alerts about flow executions and system updates.</p>
                    <div className="pt-4">
                        <Button variant="outline" className="border-border text-xs font-black uppercase tracking-widest px-8">Connect Webhooks</Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
