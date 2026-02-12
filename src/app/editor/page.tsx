"use client";

import React, { Suspense } from 'react';
import NodesSidebar from '@/components/editor/NodesSidebar';
import FlowEditor from '@/components/editor/FlowEditor';
import TestLabPanel from '@/components/editor/TestLabPanel';
import {
    Box,
    Save,
    Play,
    Settings,
    Share2,
    Loader2,
    Check,
    Copy,
    PanelLeft,
    PanelRight,
    User,
    LogOut,
    CreditCard,
    Github,
    History,
    Moon,
    Sun,
    Sparkles,
    Wand2,
    LayoutGrid,
    Plus
} from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useFlowStore } from '@/store/useFlowStore';
import { ReactFlowProvider, useReactFlow } from '@xyflow/react';
import { createClient } from '@/lib/supabase';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

export default function EditorPage() {
    return (
        <ReactFlowProvider>
            <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" /></div>}>
                <EditorContent />
            </Suspense>
        </ReactFlowProvider>
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
        setCurrentFlowName,
        apiKey,
        setApiKey
    } = useFlowStore();

    const [isSaving, setIsSaving] = useState(false);
    const [isDeploying, setIsDeploying] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isDeploySuccessOpen, setIsDeploySuccessOpen] = useState(false);
    const [localApiKey, setLocalApiKey] = useState(apiKey);

    // AI Generate State
    const [isMagicOpen, setIsMagicOpen] = useState(false);
    const [magicPrompt, setMagicPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Sidebar visibility states
    const [showLeftSidebar, setShowLeftSidebar] = useState(true);
    const [showRightSidebar, setShowRightSidebar] = useState(true);
    const [user, setUser] = useState<any>(null);

    const searchParams = useSearchParams();
    const supabase = createClient();
    const { fitView } = useReactFlow();

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };
        getSession();
    }, []);

    useEffect(() => {
        setLocalApiKey(apiKey);
    }, [apiKey]);

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
            const savedProject = localStorage.getItem('currentProject');
            if (savedProject) {
                try {
                    const parsed = JSON.parse(savedProject);
                    setNodes(parsed.nodes || []);
                    setEdges(parsed.edges || []);
                    setCurrentFlowName(parsed.name || 'Restored Project');
                    return;
                } catch (e) {
                    console.error("Failed to restore project", e);
                }
            }

            setCurrentFlowId(null);
            setCurrentFlowName('Untitled Flow');
            setNodes([
                {
                    id: 'node-start',
                    type: 'startNode',
                    position: { x: 100, y: 150 },
                    data: { label: 'Start', type: 'startNode' }
                }
            ]);
            setEdges([]);
        }
    }, [searchParams]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (!user) {
                // For guests, save locally
                const projectData = { name: currentFlowName, nodes, edges, timestamp: Date.now() };
                localStorage.setItem('currentProject', JSON.stringify(projectData));
                toast.success('Saved locally', { description: 'Sign in to sync across devices.' });
                return;
            }

            if (currentFlowId) {
                // Update existing
                const { error } = await supabase
                    .from('flows')
                    .update({
                        name: currentFlowName,
                        nodes,
                        edges,
                        updated_at: new Date().toISOString()
                    })
                    .eq('id', currentFlowId);

                if (error) throw error;
                toast.success('Flow synced to cloud');
            } else {
                // Create new
                const { data, error } = await supabase
                    .from('flows')
                    .insert({
                        user_id: user.id,
                        name: currentFlowName,
                        nodes,
                        edges
                    })
                    .select()
                    .single();

                if (error) throw error;
                if (data) {
                    setCurrentFlowId(data.id);
                    toast.success('Project created and saved');
                }
            }
        } catch (error: any) {
            toast.error('Save failed', { description: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const handleNewProject = () => {
        if (confirm("Create a new project? Unsaved changes might be lost.")) {
            setCurrentFlowId(null);
            setCurrentFlowName('Untitled Flow');
            setNodes([{ id: 'node-start', type: 'startNode', position: { x: 100, y: 150 }, data: { label: 'Start', type: 'startNode' } }]);
            setEdges([]);
            localStorage.removeItem('currentProject');
            toast.info("Started a new flow");
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    const handleDeploy = async () => {
        const incompleteNodes = nodes.filter(n => n.type === 'processNode' && !n.data.code);
        if (incompleteNodes.length > 0) {
            toast.error("Deployment failed", {
                description: `${incompleteNodes.length} Process Node(s) are missing compiled code.`
            });
            return;
        }

        setIsDeploying(true);
        await new Promise(r => setTimeout(r, 2000));
        setIsDeploying(false);
        setIsDeploySuccessOpen(true);
    };

    const handleSettingsSave = () => {
        setApiKey(localApiKey);
        setIsSettingsOpen(false);
        toast.success("Settings updated");
    };

    const handleCopyUrl = () => {
        const url = `https://api.logicbricks.com/v1/run/flow-${currentFlowId || 'demo-123456'}`;
        navigator.clipboard.writeText(url);
        toast.success("API URL copied");
    };

    const handleMagicGenerate = async () => {
        if (!magicPrompt.trim()) return;

        setIsGenerating(true);
        try {
            const response = await fetch('/api/generate-flow', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: magicPrompt }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Failed to generate flow');
            }

            const data = await response.json();

            if (data.nodes && data.edges) {
                setNodes(data.nodes);
                setEdges(data.edges);
                setIsMagicOpen(false);
                setMagicPrompt('');
                toast.success('Flow generated successfully!');

                // Wait for render then fit view
                setTimeout(() => {
                    fitView({ duration: 800, padding: 0.2 });
                }, 100);
            } else {
                throw new Error('AI returned an invalid flow structure');
            }
        } catch (error: any) {
            toast.error('AI Error', {
                description: error.message || 'AI không hiểu yêu cầu, vui lòng thử lại'
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-background overflow-hidden font-sans">
            {/* Header / Heading Bar */}
            <header className="h-14 border-b border-border flex items-center justify-between px-6 glass shrink-0 z-40">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Box className="text-white" size={18} />
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                            <span className="font-bold text-sm tracking-tight hidden sm:block text-foreground">LogicBricks</span>
                            <span className="text-muted-foreground/20">/</span>
                            <Input
                                value={currentFlowName}
                                onChange={(e) => setCurrentFlowName(e.target.value)}
                                className="h-7 w-48 bg-transparent border-transparent hover:border-border focus:border-primary/50 text-sm font-medium px-2 transition-all outline-none ring-0 focus-visible:ring-0 text-foreground"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-7 w-7 transition-colors", showLeftSidebar ? "text-primary bg-primary/10" : "text-muted-foreground/40")}
                            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
                            title="Toggle Bricks Sidebar"
                        >
                            <PanelLeft size={16} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={cn("h-7 w-7 transition-colors", showRightSidebar ? "text-primary bg-primary/10" : "text-muted-foreground/40")}
                            onClick={() => setShowRightSidebar(!showRightSidebar)}
                            title="Toggle Test Lab"
                        >
                            <PanelRight size={16} />
                        </Button>
                    </div>

                    <div className="hidden lg:flex items-center">
                        <Dialog open={isMagicOpen} onOpenChange={setIsMagicOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-xs gap-2 text-primary font-bold hover:bg-primary/10 transition-all rounded-full px-4"
                                >
                                    <Sparkles size={14} className="animate-pulse" />
                                    <span>Magic Generate</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-background border-border sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle className="flex items-center gap-2">
                                        <Wand2 className="w-5 h-5 text-primary" />
                                        <span>AI Flow Architect</span>
                                    </DialogTitle>
                                    <DialogDescription>
                                        Mô tả quy trình bạn muốn xây dựng. AI sẽ tự động thiết kế các Bricks và kết nối chúng cho bạn.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="py-4 space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-xs text-muted-foreground">Mô tả quy trình...</Label>
                                        <Textarea
                                            placeholder="VD: Lấy dữ liệu thời tiết của Hà Nội từ OpenWeather API, sau đó lọc nếu nhiệt độ > 30 độ thì gửi email cảnh báo."
                                            className="min-h-[120px] bg-muted/30 border-border focus:ring-primary/20"
                                            value={magicPrompt}
                                            onChange={(e) => setMagicPrompt(e.target.value)}
                                        />
                                    </div>
                                    <div className="p-3 bg-primary/5 border border-primary/10 rounded-lg">
                                        <p className="text-[10px] text-primary/60 leading-relaxed italic">
                                            Tip: Bạn có thể mô tả các bước cụ thể như "Nếu... thì...", "Lặp qua danh sách...", hoặc "Gọi webhook đến..." để AI hiểu rõ hơn.
                                        </p>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button
                                        onClick={handleMagicGenerate}
                                        disabled={isGenerating || !magicPrompt.trim()}
                                        className="w-full gap-2 font-bold shadow-lg shadow-primary/20"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Designing Flow...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={16} />
                                                Generate Flow
                                            </>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden md:flex items-center gap-2">
                        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-xs gap-2 text-muted-foreground hover:text-foreground">
                                    <Settings size={14} />
                                    <span>Settings</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-background border-border">
                                <DialogHeader>
                                    <DialogTitle>Project Settings</DialogTitle>
                                    <DialogDescription>Configure system API keys and project environment.</DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label>API Key (Gemini/OpenAI)</Label>
                                        <Input
                                            type="password"
                                            placeholder="sk-..."
                                            value={localApiKey}
                                            onChange={(e) => setLocalApiKey(e.target.value)}
                                            className="bg-muted/50 border-border"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button onClick={handleSettingsSave}>Apply Changes</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        <div className="w-px h-4 bg-border mx-1" />

                        <Button
                            variant="outline"
                            size="sm"
                            className="text-xs gap-2 border-border bg-muted/40"
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                            Save
                        </Button>

                        <Button size="sm" className="text-xs gap-2 px-4 font-bold shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleDeploy} disabled={isDeploying}>
                            {isDeploying ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
                            Deploy
                        </Button>
                    </div>

                    <div className="w-px h-6 bg-border mx-1" />

                    <div className="flex items-center gap-2">
                        <ModeToggle />
                        <div className="w-px h-6 bg-border mx-1" />

                        {/* User Menu */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                    <Avatar className="h-8 w-8 border border-border">
                                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                                        <AvatarFallback>LB</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-background border-border" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-none text-foreground">{user?.email?.split('@')[0] || 'Guest Developer'}</p>
                                        <p className="text-xs leading-none text-muted-foreground/60">{user?.email || 'guest@logicbricks.com'}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem className="text-xs text-muted-foreground focus:text-foreground focus:bg-muted" onClick={() => window.location.href = '/dashboard'}>
                                        <LayoutGrid className="mr-2 h-4 w-4" />
                                        <span>Dashboard</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs text-muted-foreground focus:text-foreground focus:bg-muted" onClick={handleNewProject}>
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span>New Project</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-xs text-muted-foreground focus:text-foreground focus:bg-muted">
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Profile</span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator className="bg-border" />
                                <DropdownMenuItem className="text-xs text-red-400 focus:text-red-300 focus:bg-red-500/10" onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex overflow-hidden relative">
                {/* Left Sidebar */}
                <div className={cn(
                    "transition-all duration-300 ease-in-out border-r border-border bg-background",
                    showLeftSidebar ? "w-64 opacity-100" : "w-0 opacity-0 pointer-events-none"
                )}>
                    <NodesSidebar />
                </div>

                {/* Canvas */}
                <section className="flex-1 relative overflow-hidden bg-background">
                    <FlowEditor />
                </section>

                {/* Right Sidebar */}
                <div className={cn(
                    "transition-all duration-300 ease-in-out border-l border-border bg-background",
                    showRightSidebar ? "w-80 opacity-100" : "w-0 opacity-0 pointer-events-none"
                )}>
                    <TestLabPanel />
                </div>

                {/* Floating controls when sidebars are hidden */}
                {!showLeftSidebar && (
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute left-4 top-4 z-30 h-8 w-8 rounded-full shadow-xl bg-background/80 backdrop-blur border border-border"
                        onClick={() => setShowLeftSidebar(true)}
                    >
                        <PanelLeft size={16} />
                    </Button>
                )}
                {!showRightSidebar && (
                    <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-4 top-4 z-30 h-8 w-8 rounded-full shadow-xl bg-background/80 backdrop-blur border border-border"
                        onClick={() => setShowRightSidebar(true)}
                    >
                        <PanelRight size={16} />
                    </Button>
                )}
            </main>

            {/* Deploy Success Success Dialog */}
            <Dialog open={isDeploySuccessOpen} onOpenChange={setIsDeploySuccessOpen}>
                <DialogContent className="bg-background border-border sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2 text-emerald-400">
                            <Check className="w-5 h-5" />
                            Deployment Live
                        </DialogTitle>
                        <DialogDescription>Your flow is now operational as a serverless endpoint.</DialogDescription>
                    </DialogHeader>
                    <div className="py-6 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase text-muted-foreground/50">Production URL</Label>
                            <div className="flex items-center gap-2 p-3 bg-muted border border-border rounded-lg">
                                <code className="flex-1 text-[11px] text-primary truncate">https://api.logicbricks.com/v1/run/flow-{currentFlowId || '123456'}</code>
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCopyUrl}><Copy size={14} /></Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={() => setIsDeploySuccessOpen(false)} className="w-full">Dismiss</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
