"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Search,
    Clock,
    LayoutGrid,
    Star,
    Users,
    Compass,
    FileCode,
    BookOpen,
    ChevronDown,
    Plus,
    Box,
    PanelLeftClose,
    PanelLeftOpen,
    Moon,
    Sun,
    Settings,
    LogOut,
    HelpCircle,
    BadgeCheck,
    ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from '@/lib/supabase';

const navItems = [
    {
        section: '', items: [
            { name: 'Home', href: '/dashboard', icon: Home },
            { name: 'Search', href: '#', icon: Search },
        ]
    },
    {
        section: 'Projects', items: [
            { name: 'Recent', href: '#', icon: Clock },
            { name: 'All projects', href: '/dashboard/projects', icon: LayoutGrid },
            { name: 'Starred', href: '#', icon: Star },
            { name: 'Shared with me', href: '#', icon: Users },
        ]
    },
    {
        section: 'Resources', items: [
            { name: 'Discover', href: '/dashboard/discover', icon: Compass },
            { name: 'Templates', href: '/dashboard/templates', icon: FileCode },
            { name: 'Documentation', href: '/docs', icon: BookOpen },
        ]
    },
    {
        section: 'System', items: [
            { name: 'Admin Console', href: '/dashboard/admin', icon: ShieldAlert },
        ]
    }
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { theme, setTheme } = useTheme();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-full bg-background transition-colors duration-500 overflow-hidden font-sans">
            {/* Lovable Sidebar */}
            <aside className={cn(
                "h-full bg-muted/30 border-r border-border flex flex-col transition-all duration-300 ease-in-out z-50",
                sidebarOpen ? "w-64" : "w-0 -translate-x-full lg:w-16 lg:translate-x-0"
            )}>
                {/* Logo & Workspace Selector */}
                <div className="p-4 flex items-center justify-between">
                    <div className={cn("flex items-center gap-2", !sidebarOpen && "lg:hidden")}>
                        <Link href="/" className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Box className="text-primary-foreground" size={18} />
                        </Link>
                    </div>

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 hover:bg-accent rounded-md text-muted-foreground transition-colors"
                    >
                        {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} className="lg:block hidden" />}
                    </button>
                </div>

                {sidebarOpen && (
                    <div className="px-3 mb-4">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="w-full justify-between h-10 px-2 hover:bg-accent group">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">V</div>
                                        <span className="text-sm font-semibold truncate text-foreground group-hover:text-foreground">Van's LogicBricks</span>
                                    </div>
                                    <ChevronDown size={14} className="text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="start">
                                <DropdownMenuItem>Personal Workspace</DropdownMenuItem>
                                <DropdownMenuItem>Team Project</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-primary font-medium">Create Workspace</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto px-3 space-y-6">
                    {navItems.map((group, idx) => (
                        <div key={idx} className="space-y-1">
                            {sidebarOpen && group.section && (
                                <h3 className="px-2 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">
                                    {group.section}
                                </h3>
                            )}
                            {group.items.map((item) => (
                                <Link key={item.name} href={item.href}>
                                    <span className={cn(
                                        "flex items-center gap-3 px-2 py-2 rounded-md text-sm font-medium transition-all group",
                                        pathname === item.href
                                            ? "bg-accent text-accent-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    )}>
                                        <item.icon size={18} className={cn(
                                            "transition-colors",
                                            pathname === item.href ? "text-primary" : "group-hover:text-foreground"
                                        )} />
                                        {sidebarOpen && <span>{item.name}</span>}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Sidebar Bottom */}
                <div className="p-3 border-t border-border space-y-2">
                    {sidebarOpen && (
                        <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 mb-2">
                            <div className="flex items-center gap-2 mb-1">
                                <BadgeCheck size={14} className="text-primary" />
                                <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Pro Plan</span>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">Boost your productivity with AI-driven flows.</p>
                        </div>
                    )}

                    <div className="flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </Button>
                        {sidebarOpen && (
                            <div className="flex items-center gap-2">
                                <Link href="/dashboard/preferences">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                                        <Settings size={18} />
                                    </Button>
                                </Link>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground hover:text-destructive transition-colors"
                                    onClick={async () => {
                                        const supabase = createClient();
                                        await supabase.auth.signOut();
                                        window.location.href = '/login';
                                    }}
                                >
                                    <LogOut size={18} />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto relative bg-background">
                {/* Collapsed Sidebar Toggle (Mobile/Small screens) */}
                {!sidebarOpen && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-4 z-40 h-8 w-8 rounded-md bg-background/80 backdrop-blur border lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <PanelLeftOpen size={18} />
                    </Button>
                )}

                <div className="min-h-full flex flex-col">
                    {children}
                </div>
            </main>
        </div>
    );
}
