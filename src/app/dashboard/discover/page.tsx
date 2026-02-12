"use client";

import React from 'react';
import {
    Compass,
    Sparkles,
    TrendingUp,
    Play,
    Heart,
    MessageSquare,
    Share2,
    MoreHorizontal,
    Search,
    User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const discoveries = [
    {
        id: '1',
        title: 'Multi-cloud Image Sync',
        author: '@alex_dev',
        avatar: 'https://github.com/shadcn.png',
        desc: 'A powerful flow that syncs S3 bucket with Google Cloud Storage and Azure Blob instantly.',
        likes: '1.2k',
        comments: '45',
        tags: ['Cloud', 'Infrastructure']
    },
    {
        id: '2',
        title: 'Customer Sentiment Analysis',
        author: '@sarah_k',
        avatar: 'https://i.pravatar.cc/150?u=sarah',
        desc: 'Real-time analysis of support tickets using Gemini 1.5 Pro to prioritize angry customers.',
        likes: '840',
        comments: '12',
        tags: ['AI', 'Support']
    },
    {
        id: '3',
        title: 'Discord Leveling Bot',
        author: '@mike_bricks',
        avatar: 'https://i.pravatar.cc/150?u=mike',
        desc: 'Full XP and leveling system logic for Discord servers with custom badge generation.',
        likes: '2.1k',
        comments: '89',
        tags: ['Discord', 'Gaming']
    }
];

export default function DiscoverPage() {
    return (
        <div className="flex-1 p-8 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2 flex items-center gap-3">
                        <Compass className="text-primary" size={36} />
                        Discover
                    </h1>
                    <p className="text-muted-foreground text-lg">See what others are building and find inspiration for your next flow.</p>
                </div>
                <div className="flex items-center gap-2 bg-muted/30 p-1 rounded-2xl border border-border">
                    <Button variant="ghost" className="rounded-xl text-xs font-bold px-4 py-2 bg-background text-primary shadow-sm">Trending</Button>
                    <Button variant="ghost" className="rounded-xl text-xs font-bold px-4 py-2 text-muted-foreground">Recent</Button>
                    <Button variant="ghost" className="rounded-xl text-xs font-bold px-4 py-2 text-muted-foreground">Staff Picks</Button>
                </div>
            </div>

            {/* Trending Section */}
            <div className="space-y-6">
                <div className="flex items-center gap-2">
                    <TrendingUp size={20} className="text-primary" />
                    <h2 className="text-xl font-bold tracking-tight">Trending Community Bricks</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {discoveries.map((item) => (
                        <Card key={item.id} className="group bg-muted/20 border-border hover:border-primary/30 transition-all duration-500 overflow-hidden flex flex-col">
                            <CardHeader className="pb-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6 border border-border">
                                            <AvatarImage src={item.avatar} />
                                            <AvatarFallback>{item.author[1]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">{item.author}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground opacity-0 group-hover:opacity-100"><MoreHorizontal size={14} /></Button>
                                </div>
                                <CardTitle className="text-xl font-black group-hover:text-primary transition-colors leading-tight">{item.title}</CardTitle>
                                <p className="text-sm text-muted-foreground line-clamp-3 mt-3 leading-relaxed">{item.desc}</p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.map(tag => (
                                        <Badge key={tag} variant="outline" className="text-[10px] font-bold text-muted-foreground/60 border-border bg-background/50 uppercase tracking-widest">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                            <CardFooter className="pt-4 border-t border-border mt-auto flex items-center justify-between bg-muted/30 px-6 py-4">
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-red-500 transition-colors">
                                        <Heart size={16} />
                                        <span className="text-xs font-bold">{item.likes}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                                        <MessageSquare size={16} />
                                        <span className="text-xs font-bold">{item.comments}</span>
                                    </button>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 text-[10px] font-black uppercase tracking-widest gap-2 bg-background border-border hover:bg-primary hover:text-primary-foreground hover:border-primary">
                                    <Play size={12} fill="currentColor" />
                                    Preview
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Newsletter/Join Section */}
            <div className="bg-muted/30 border border-border rounded-[32px] p-12 flex flex-col items-center text-center gap-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <Sparkles className="text-primary animate-pulse" size={32} />
                <div className="space-y-2 relative z-10">
                    <h3 className="text-2xl font-black tracking-tight">Share your Bricks with the world</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">Get recognized in the community and help others build faster with your shared logic.</p>
                </div>
                <div className="flex items-center gap-2 w-full max-w-md relative z-10">
                    <Input placeholder="Enter your project name..." className="h-12 bg-background border-border rounded-xl" />
                    <Button className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground px-6 font-bold rounded-xl shadow-lg shadow-primary/20">
                        Share Now
                    </Button>
                </div>
            </div>
        </div>
    );
}
