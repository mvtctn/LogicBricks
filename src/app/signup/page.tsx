"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Mail, Lock, User, ArrowRight, Loader2, Sparkles, Wand2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');

    const router = useRouter();
    const supabase = createClient();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    }
                }
            });

            if (error) throw error;

            setIsSuccess(true);
            toast.success("Account created successfully!");
        } catch (error: any) {
            toast.error("Sign up failed", {
                description: error.message
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center p-4 bg-background overflow-hidden relative">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-[440px] z-10 text-center space-y-6 glass p-10 rounded-[40px] border border-emerald-500/20 shadow-2xl"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <CheckCircle2 className="text-emerald-500" size={40} />
                    </div>
                    <h1 className="text-3xl font-black tracking-tight text-foreground">Check your email</h1>
                    <p className="text-muted-foreground leading-relaxed">
                        We've sent a verification link to <span className="text-foreground font-bold">{email}</span>.
                        Please confirm your email to activate your account.
                    </p>
                    <div className="pt-4">
                        <Link href="/login">
                            <Button variant="outline" className="w-full border-border bg-muted/20 hover:bg-muted/40 h-12 rounded-xl font-bold">
                                Back to Login
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-background">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-[480px] z-10"
            >
                <div className="glass p-8 md:p-10 rounded-[40px] border border-border/50 shadow-2xl space-y-8 relative overflow-hidden">
                    {/* Decorative Header Glow */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

                    {/* Logo & Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-xl shadow-primary/20 mb-4 group cursor-pointer">
                            <Box className="text-primary-foreground group-hover:scale-110 transition-transform" size={28} />
                        </div>
                        <h1 className="text-3xl font-black tracking-tight text-foreground">Create your account</h1>
                        <p className="text-muted-foreground text-sm">Join the next generation of AI flow builders.</p>
                    </div>

                    {/* Sign Up Form */}
                    <form onSubmit={handleSignUp} className="space-y-5">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Full Name</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-3.5 text-muted-foreground/40" size={18} />
                                <Input
                                    type="text"
                                    placeholder="John Doe"
                                    className="h-12 bg-muted/30 border-border focus:ring-primary/20 rounded-xl pl-10"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Email Address</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3.5 text-muted-foreground/40" size={18} />
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    className="h-12 bg-muted/30 border-border focus:ring-primary/20 rounded-xl pl-10"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3.5 text-muted-foreground/40" size={18} />
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    className="h-12 bg-muted/30 border-border focus:ring-primary/20 rounded-xl pl-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <div className="pt-2">
                            <Button
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] gap-2"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin" size={20} />
                                ) : (
                                    <>
                                        <span>Create Account</span>
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="text-center space-y-4">
                        <p className="text-xs text-muted-foreground">
                            By creating an account, you agree to our{' '}
                            <Link href="#" className="text-primary hover:underline">Terms</Link> and{' '}
                            <Link href="#" className="text-primary hover:underline">Privacy Policy</Link>.
                        </p>

                        <Separator className="bg-border/50" />

                        <p className="text-sm text-muted-foreground">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary font-bold hover:underline">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-8 flex items-center justify-center gap-6 opacity-30 grayscale pointer-events-none">
                    <Sparkles size={24} />
                    <Wand2 size={24} />
                    <Box size={24} />
                </div>
            </motion.div>
        </div>
    );
}
