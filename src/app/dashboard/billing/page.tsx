"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import {
    CreditCard,
    Check,
    Zap,
    ArrowUpCircle,
    Download,
    Calendar,
    BarChart3,
    History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const plans = [
    {
        name: 'Starter',
        price: '$0',
        description: 'Perfect for small side projects.',
        features: ['5 Active Flows', '1,000 Executions/mo', 'Basic AI Support', 'Community Support'],
        current: true,
        bg: 'bg-muted/40',
        border: 'border-border'
    },
    {
        name: 'Pro',
        price: '$49',
        description: 'For growing businesses and advanced logic.',
        features: ['Unlimited Flows', '100k Executions/mo', 'Premium AI Models', 'Priority Support', 'Custom Domains'],
        current: false,
        bg: 'bg-primary/5',
        border: 'border-primary/20',
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Advanced scaling and security.',
        features: ['Custom Executions', 'Dedicated Infrastructure', 'SLA Guarantee', 'Advanced Analytics', 'Training Support'],
        current: false,
        bg: 'bg-muted/40',
        border: 'border-border'
    }
];

const invoices = [
    { id: 'INV-2026-001', date: 'Feb 12, 2026', amount: '$0.00', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Jan 12, 2026', amount: '$0.00', status: 'Paid' },
];

export default function BillingPage() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2">Billing & Plans</h1>
                    <p className="text-muted-foreground text-lg">Manage your subscription and monitor your resource usage.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <History size={16} className="text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Billing cycle resets in 18 days</span>
                </div>
            </div>

            <Separator className="bg-border" />

            {/* Current Usage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-muted/40 border-border">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase text-muted-foreground/50 tracking-widest">Monthly Executions</CardTitle>
                        <div className="flex items-baseline gap-2 pt-2">
                            <span className="text-3xl font-black">428</span>
                            <span className="text-muted-foreground/30 text-sm">/ 1,000</span>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-[42.8%] shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-muted/40 border-border">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase text-muted-foreground/50 tracking-widest">Active Flows</CardTitle>
                        <div className="flex items-baseline gap-2 pt-2">
                            <span className="text-3xl font-black">3</span>
                            <span className="text-muted-foreground/30 text-sm">/ 5</span>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[60%]"></div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-muted/40 border-border">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-xs font-bold uppercase text-muted-foreground/50 tracking-widest">AI Logic Tokens</CardTitle>
                        <div className="flex items-baseline gap-2 pt-2">
                            <span className="text-3xl font-black">8.4k</span>
                            <span className="text-muted-foreground/30 text-sm">Unbilled</span>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[20%]"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Pricing Plans */}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Zap className="text-primary" size={24} />
                    <h2 className="text-2xl font-bold italic tracking-tight">Available Subscription Plans</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={cn(
                            "relative overflow-hidden transition-all duration-300 hover:-translate-y-2",
                            plan.bg, plan.border,
                            plan.popular && "ring-2 ring-primary/50 shadow-2xl shadow-primary/10"
                        )}>
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-black uppercase px-6 py-1 rotate-45 translate-x-6 translate-y-3">
                                    Popular
                                </div>
                            )}
                            <CardHeader>
                                <Badge variant="outline" className="w-fit mb-2 border-border text-muted-foreground">{plan.name}</Badge>
                                <div className="flex items-baseline gap-1">
                                    <CardTitle className="text-4xl font-black">{plan.price}</CardTitle>
                                    <span className="text-sm text-muted-foreground/50">/month</span>
                                </div>
                                <CardDescription className="pt-2">{plan.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Separator className="bg-border" />
                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-xs text-muted-foreground">
                                            <Check className="text-primary" size={14} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                {plan.current ? (
                                    <Button variant="outline" disabled className="w-full border-border bg-muted text-muted-foreground/40 font-bold uppercase tracking-widest text-[10px]">Current Plan</Button>
                                ) : (
                                    <Button className={cn(
                                        "w-full font-bold shadow-lg transition-all",
                                        plan.popular ? "bg-primary hover:bg-primary/90 shadow-primary/20 text-primary-foreground" : "bg-muted hover:bg-muted/80 text-foreground"
                                    )}>
                                        Upgrade
                                    </Button>
                                )}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Invoices */}
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Download className="text-muted-foreground/40" size={24} />
                    <h2 className="text-2xl font-bold tracking-tight">Invoice History</h2>
                </div>

                <Card className="bg-muted/40 border-border overflow-hidden">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow className="border-border">
                                <TableHead className="text-muted-foreground/50 uppercase font-bold text-[10px] tracking-widest">Invoice ID</TableHead>
                                <TableHead className="text-muted-foreground/50 uppercase font-bold text-[10px] tracking-widest">Date</TableHead>
                                <TableHead className="text-muted-foreground/50 uppercase font-bold text-[10px] tracking-widest">Amount</TableHead>
                                <TableHead className="text-muted-foreground/50 uppercase font-bold text-[10px] tracking-widest">Status</TableHead>
                                <TableHead className="text-right text-muted-foreground/50 uppercase font-bold text-[10px] tracking-widest">Download</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((invoice) => (
                                <TableRow key={invoice.id} className="border-border hover:bg-muted/20 transition-colors">
                                    <TableCell className="font-mono text-xs">{invoice.id}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{invoice.date}</TableCell>
                                    <TableCell className="font-bold">{invoice.amount}</TableCell>
                                    <TableCell>
                                        <Badge className="bg-emerald-500/10 text-emerald-400 border-none hover:bg-emerald-500/20">{invoice.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground/40 hover:text-foreground">
                                            <Download size={14} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </div>
        </div>
    );
}
