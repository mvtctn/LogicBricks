"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import {
    User,
    Mail,
    Globe,
    Github,
    Twitter,
    Camera,
    ShieldCheck,
    Zap,
    Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

export default function ProfilePage() {
    const handleUpdate = () => {
        toast.success("Profile updated", {
            description: "Your changes have been saved to the cloud."
        });
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div>
                <h1 className="text-4xl font-black tracking-tight mb-2">My Profile</h1>
                <p className="text-muted-foreground text-lg">Manage your identity and public appearance on LogicBricks.</p>
            </div>

            <Separator className="bg-border" />

            {/* Profile Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Avatar & Basic Info */}
                <div className="lg:col-span-1 space-y-6">
                    <Card className="bg-muted/40 border-border overflow-hidden">
                        <CardHeader className="text-center pb-2">
                            <div className="relative inline-block mx-auto mb-4 group">
                                <Avatar className="h-32 w-32 border-4 border-primary/20 shadow-2xl transition-transform group-hover:scale-105 duration-300">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>LB</AvatarFallback>
                                </Avatar>
                                <button className="absolute bottom-1 right-1 p-2 bg-primary rounded-full text-white shadow-xl translate-y-1 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <CardTitle className="text-xl">Guest Developer</CardTitle>
                            <CardDescription>@guest_dev</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground p-2 rounded-lg bg-muted/40 border border-border">
                                <Zap className="text-primary" size={16} />
                                <span className="font-medium">Early Adopter</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/60 p-2 rounded-lg bg-white/5 border border-white/5">
                                <ShieldCheck className="text-emerald-400" size={16} />
                                <span className="font-medium">Verified Identity</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-muted/40 border-border">
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground/50">Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/40 h-10">
                                <Github className="mr-3" size={16} />
                                Link GitHub
                            </Button>
                            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/40 h-10">
                                <Twitter className="mr-3" size={16} />
                                Link Twitter
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Detailed Forms */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="bg-card border-border backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your name, email and bio.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-xs uppercase font-bold text-muted-foreground/60 tracking-wider">First Name</Label>
                                    <Input id="firstName" defaultValue="Guest" className="bg-muted/40 border-border" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-xs uppercase font-bold text-muted-foreground/60 tracking-wider">Last Name</Label>
                                    <Input id="lastName" defaultValue="Developer" className="bg-muted/40 border-border" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-xs uppercase font-bold text-muted-foreground/60 tracking-wider">Email Address</Label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-3 top-3 text-muted-foreground/40" />
                                    <Input id="email" defaultValue="guest@logicbricks.com" className="bg-muted/40 border-border pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="website" className="text-xs uppercase font-bold text-muted-foreground/60 tracking-wider">Portfolio / Website</Label>
                                <div className="relative">
                                    <Globe size={16} className="absolute left-3 top-3 text-muted-foreground/40" />
                                    <Input id="website" placeholder="https://yourlink.com" className="bg-muted/40 border-border pl-10" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bio" className="text-xs uppercase font-bold text-muted-foreground/60 tracking-wider">Biography</Label>
                                <textarea
                                    id="bio"
                                    className="w-full h-32 bg-muted/40 border border-border rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none"
                                    defaultValue="Building modular logic flows for the next generation of AI agents."
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                                <div>
                                    <p className="text-sm font-bold text-orange-200">Public Profile</p>
                                    <p className="text-xs text-orange-200/50">Allow others to view your public logic brick flows.</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-orange-500" />
                            </div>

                            <Separator className="bg-border" />

                            <div className="flex justify-end">
                                <Button onClick={handleUpdate} className="bg-primary hover:bg-primary/90 px-8 font-bold gap-2 shadow-lg shadow-primary/20">
                                    <Save size={16} />
                                    Save Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
