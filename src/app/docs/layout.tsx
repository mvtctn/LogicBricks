"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Box,
    Search,
    ChevronRight,
    ChevronDown,
    BookOpen,
    Zap,
    Code2,
    Globe,
    Shield,
    Menu,
    X,
    FileText,
    Cpu,
    Workflow
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';

const docNav = [
    {
        title: 'Getting Started',
        items: [
            { name: 'Introduction', href: '/docs' },
            { name: 'Quickstart', href: '/docs/quickstart' },
            { name: 'Core Concepts', href: '/docs/concepts' },
        ]
    },
    {
        title: 'Building Logic',
        items: [
            { name: 'Nodes Overview', href: '/docs/nodes' },
            { name: 'Process Bricks', href: '/docs/process-bricks' },
            { name: 'AI Generation', href: '/docs/ai-generation' },
            { name: 'Data Mapping', href: '/docs/data-mapping' },
        ]
    },
    {
        title: 'Deployment',
        items: [
            { name: 'API Endpoints', href: '/docs/api-endpoints' },
            { name: 'Version Control', href: '/docs/versions' },
            { name: 'Security', href: '/docs/security' },
        ]
    }
];

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Docs Header */}
            <header className="fixed top-0 w-full z-50 h-16 bg-background/80 backdrop-blur-md border-b border-border px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                            <Box className="text-background" size={18} />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-foreground">LogicBricks</span>
                        <span className="text-[10px] font-black uppercase tracking-widest bg-muted px-1.5 py-0.5 rounded ml-1 text-muted-foreground">Docs</span>
                    </Link>

                    <div className="hidden md:flex relative w-64 lg:w-96">
                        <Search className="absolute left-3 top-2.5 text-muted-foreground/40" size={14} />
                        <Input
                            placeholder="Search documentation..."
                            className="h-9 bg-muted/50 border-border pl-9 rounded-full text-sm"
                        />
                        <div className="absolute right-3 top-2.5 flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-bold text-muted-foreground/40">Ctrl</kbd>
                            <kbd className="px-1.5 py-0.5 rounded bg-background border border-border text-[10px] font-bold text-muted-foreground/40">K</kbd>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Link href="/dashboard" className="hidden md:block">
                        <Button variant="ghost" className="text-sm font-semibold hover:bg-muted">Dashboard</Button>
                    </Link>
                    <Link href="/editor">
                        <Button className="bg-foreground text-background rounded-full px-6 h-9 text-sm hover:bg-foreground/90">Open Editor</Button>
                    </Link>
                    <button
                        className="md:hidden p-2 text-muted-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex pt-16">
                {/* Desktop Sidebar */}
                <aside className="hidden md:block w-64 lg:w-72 fixed h-[calc(100vh-4rem)] overflow-y-auto py-12 pr-6 border-r border-border/50">
                    <nav className="space-y-8">
                        {docNav.map((section) => (
                            <div key={section.title} className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2">{section.title}</h4>
                                <ul className="space-y-1">
                                    {section.items.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "block px-3 py-2 rounded-lg text-sm font-medium transition-all",
                                                    pathname === item.href
                                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                                )}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main Docs Content */}
                <main className="flex-1 md:ml-64 lg:ml-72 py-12 min-h-[calc(100vh-4rem)]">
                    <div className="max-w-3xl">
                        {children}
                    </div>
                </main>
            </div>

            {/* Mobile Navigation Overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-[60] bg-background pt-20 px-6 overflow-y-auto">
                    <nav className="space-y-8 pb-20">
                        {docNav.map((section) => (
                            <div key={section.title} className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.items.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "text-lg font-bold transition-colors",
                                                    pathname === item.href ? "text-primary" : "text-foreground"
                                                )}
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>
            )}
        </div>
    );
}
