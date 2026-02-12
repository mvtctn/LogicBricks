"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Github, Mail, ArrowRight, Loader2, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast.success("Welcome back to LogicBricks!");
            router.push('/dashboard');
        } catch (error: any) {
            toast.error("Login failed", {
                description: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleGithubLogin = async () => {
        toast.info("GitHub Login is currently in preview mode.");
        // Mock success for demo purposes if needed, or implement real flow
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[440px] z-10"
            >
                <div className="glass p-8 rounded-[32px] border border-border/50 shadow-2xl space-y-8 relative overflow-hidden">
                    {/* Decorative Top Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

                    {/* Logo & Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-xl shadow-primary/20 mb-4 group cursor-pointer">
                            <Box className="text-primary-foreground group-hover:scale-110 transition-transform" size={28} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Welcome Back</h1>
                        <p className="text-muted-foreground text-sm">Continue building your intelligent logic flows.</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                            <Input
                                type="email"
                                placeholder="name@company.com"
                                className="h-12 bg-muted/30 border-border focus:ring-primary/20 rounded-xl"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Password</Label>
                                <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-primary hover:underline">Forgot?</Link>
                            </div>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-12 bg-muted/30 border-border focus:ring-primary/20 rounded-xl"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} className="ml-2" />
                                </>
                            )}
                        </Button>
                    </form>

                    {/* Separator */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-widest">
                            <span className="bg-background px-4 text-muted-foreground/40">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Logic */}
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            variant="outline"
                            className="h-11 border-border bg-muted/20 hover:bg-muted/40 rounded-xl font-semibold text-xs gap-2"
                            onClick={handleGithubLogin}
                        >
                            <Github size={16} />
                            GitHub
                        </Button>
                        <Button
                            variant="outline"
                            className="h-11 border-border bg-muted/20 hover:bg-muted/40 rounded-xl font-semibold text-xs gap-2"
                        >
                            <Sparkles size={16} className="text-primary" />
                            SSO
                        </Button>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-xs text-muted-foreground">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-primary font-bold hover:underline">
                            Create Account
                        </Link>
                    </p>
                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale">
                    <Wand2 size={24} />
                    <Sparkles size={24} />
                    <Box size={24} />
                </div>
            </motion.div>
        </div>
    );
}
