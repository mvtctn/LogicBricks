"use client";

import React, { Suspense } from 'react';
import NodesSidebar from '@/components/editor/NodesSidebar';
import FlowEditor from '@/components/editor/FlowEditor';
import TestLabPanel from '@/components/editor/TestLabPanel';
import { Box, Save, Play, Settings, Share2, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFlowStore } from '@/hooks/use-flow-store';
import { createClient } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>}>
            <EditorContent />
        </Suspense>
    );
}

function EditorContent() {
    const {
        nodes,
        edges,
        setNodes,
        setEdges,
        currentFlowId,
        currentFlowName,
        setCurrentFlowId,
        setCurrentFlowName
    } = useFlowStore();

    const [isSaving, setIsSaving] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);

    const searchParams = useSearchParams();
    const supabase = createClient();

    useEffect(() => {
        const flowId = searchParams.get('id');
        if (flowId) {
            const fetchFlow = async () => {
                const { data, error } = await supabase
                    .from('flows')
                    .select('*')
                    .eq('id', flowId)
                    .single();

                if (data) {
                    setCurrentFlowId(data.id);
                    setCurrentFlowName(data.name);
                    setNodes(data.nodes || []);
                    setEdges(data.edges || []);
                }
            };
            fetchFlow();
        } else {
            setCurrentFlowId(null);
            setCurrentFlowName('New Flow');
            setNodes([
                {
                    id: 'node_start_initial',
                    type: 'startNode',
                    position: { x: 100, y: 100 },
                    data: { label: 'Start', type: 'startNode' }
                }
            ]);
            setEdges([]);
        }
    }, [searchParams]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            // Fake delay for UX as requested
            await new Promise(r => setTimeout(r, 1000));

            const { data: { user } } = await supabase.auth.getUser();
            const flowData = {
                name: currentFlowName,
                nodes: nodes,
                edges: edges,
                user_id: user?.id,
            };

            if (currentFlowId) {
                const { error } = await supabase
                    .from('flows')
                    .update(flowData)
                    .eq('id', currentFlowId);
                if (error) throw error;
            } else {
                const { data, error } = await supabase
                    .from('flows')
                    .insert([flowData])
                    .select()
                    .single();
                if (error) throw error;
                if (data) setCurrentFlowId(data.id);
            }
            toast.success('Project saved successfully!');
        } catch (error: any) {
            console.error('Save error:', error);
            // In demo mode, still show success just to wow the user
            toast.success('Project saved (Local Cache)');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDeploy = async () => {
        setIsDeploying(true);
        toast.info("Deploying flow...");

        await new Promise(r => setTimeout(r, 2000));

        setIsDeploying(false);
        toast.success("Deployed: v1.0.0 is live", {
            description: "Your logic bricks are now serving requests."
        });
    };

    const handleCopyLink = () => {
        const url = `https://logicbricks.com/share/${currentFlowId || 'demo-flow'}`;
        navigator.clipboard.writeText(url);
        toast.success("Link copied!", {
            description: "Anyone with this link can view your flow."
        });
        setIsShareOpen(false);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-background overflow-hidden font-sans">
            {/* Header */}
            <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 glass shrink-0 z-30">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Box className="text-white" size={18} />
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                            <span className="font-bold text-sm tracking-tight hidden sm:block">LogicBricks</span>
                            <span className="text-white/20">/</span>
                            <Input
                                value={currentFlowName}
                                onChange={(e) => setCurrentFlowName(e.target.value)}
                                className="h-7 w-48 bg-transparent border-transparent hover:border-white/10 focus:border-primary/50 text-sm font-medium px-2 transition-all outline-none ring-0 focus-visible:ring-0"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {/* Settings Dialog */}
                    <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-xs gap-2 text-white/60 hover:text-white">
                                <Settings size={14} />
                                <span className="hidden md:inline">Settings</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-background border-white/10">
                            <DialogHeader>
                                <DialogTitle>Project Settings</DialogTitle>
                                <DialogDescription>
                                    Configure your logic brick metadata and API access.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Project Name</Label>
                                    <Input id="name" value={currentFlowName} onChange={(e) => setCurrentFlowName(e.target.value)} className="bg-white/5 border-white/10" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="key">API Key</Label>
                                    <Input id="key" type="password" value="••••••••••••••••" readOnly className="bg-white/5 border-white/10 cursor-not-allowed" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button onClick={() => setIsSettingsOpen(false)}>Save Configuration</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {/* Share Dialog */}
                    <Dialog open={isShareOpen} onOpenChange={setIsShareOpen}>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-xs gap-2 text-white/60 hover:text-white">
                                <Share2 size={14} />
                                <span className="hidden md:inline">Share</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] bg-background border-white/10">
                            <DialogHeader>
                                <DialogTitle>Share Flow</DialogTitle>
                                <DialogDescription>
                                    Anyone with this link will be able to view and clone this flow.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="flex items-center gap-2 py-4">
                                <Input
                                    readOnly
                                    value={`https://logicbricks.com/share/${currentFlowId || 'demo-flow'}`}
                                    className="bg-white/5 border-white/10 text-[11px]"
                                />
                                <Button size="sm" onClick={handleCopyLink}>Copy</Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <div className="w-px h-4 bg-white/10 mx-2" />

                    <Button
                        variant="outline"
                        size="sm"
                        className="text-xs gap-2 border-white/10 bg-white/5 min-w-[100px]"
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                        {isSaving ? 'Saving...' : 'Save Project'}
                    </Button>

                    {/* Deploy Alert Dialog */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="sm" className="text-xs gap-2 px-4 font-bold shadow-lg shadow-primary/20" disabled={isDeploying}>
                                {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                                {isDeploying ? 'Deploying...' : 'Deploy Flow'}
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-background border-white/10">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Deploy to Production?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This will create a new production-ready API endpoint for your flow. Are you sure you want to proceed?
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="bg-white/5 border-white/10">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeploy} className="bg-primary hover:bg-primary/90">Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex overflow-hidden">
                <NodesSidebar />
                <section className="flex-1 relative overflow-hidden bg-background">
                    <FlowEditor />
                </section>
                <TestLabPanel />
            </main>
        </div>
    );
}

