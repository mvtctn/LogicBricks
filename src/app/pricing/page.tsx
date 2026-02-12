"use client";

import React from 'react';
import Link from 'next/link';
import {
    Box,
    Check,
    Zap,
    Shield,
    Globe,
    ArrowRight,
    Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
    {
        name: 'Starter',
        price: '$0',
        desc: 'For individuals and hobbyists exploring AI.',
        features: ['5 Active Flows', '1,000 Executions/mo', 'Basic AI Support', 'Standard Latency', 'Community Access'],
        color: 'bg-slate-50',
        btn: 'bg-slate-900 text-white hover:bg-slate-800'
    },
    {
        name: 'Pro',
        price: '$49',
        desc: 'For professional developers and growing startups.',
        features: ['Unlimited Flows', '100,000 Executions/mo', 'Premium AI Models', 'Priority Execution', 'Custom Domains', 'Team Collaboration'],
        color: 'bg-blue-600 text-white',
        btn: 'bg-white text-blue-600 hover:bg-slate-100',
        popular: true
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        desc: 'For large teams requiring scale and compliance.',
        features: ['Unlimited Everything', 'Dedicated Clusters', 'SOC2 Compliance', 'SLA Guarantee', '24/7 Priority Support', 'Dedicated Success Manager'],
        color: 'bg-slate-900 text-white',
        btn: 'bg-white text-slate-900 hover:bg-slate-100'
    }
];

export default function PublicPricingPage() {
    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-primary/20">
            {/* Nav */}
            <header className="absolute top-0 w-full z-50 h-20 px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                        <Box className="text-white" size={18} />
                    </div>
                    <span className="font-bold text-xl tracking-tight">LogicBricks</span>
                </Link>
                <div className="flex items-center gap-4">
                    <Link href="/editor">
                        <Button variant="ghost" className="text-sm font-semibold">Log in</Button>
                    </Link>
                    <Link href="/editor">
                        <Button className="bg-slate-900 text-white rounded-full px-6">Get started</Button>
                    </Link>
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900">Simple, predictable <span className="text-blue-600">Pricing</span></h1>
                    <p className="text-xl text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">Choose the plan that fits your project. Change or cancel at any time.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {plans.map((plan) => (
                        <div key={plan.name} className={cn(
                            "relative flex flex-col p-10 rounded-[40px] border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
                            plan.color,
                            plan.popular && "shadow-2xl shadow-blue-200"
                        )}>
                            {plan.popular && (
                                <div className="absolute top-0 right-10 translate-y-[-50%] bg-blue-600 border-4 border-white text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                                    Most Popular
                                </div>
                            )}
                            <div className="mb-8">
                                <h3 className="text-lg font-bold uppercase tracking-widest mb-2 opacity-60">{plan.name}</h3>
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                                    {plan.price !== 'Custom' && <span className="text-lg font-medium opacity-60">/mo</span>}
                                </div>
                                <p className="text-sm font-medium opacity-80 leading-relaxed">{plan.desc}</p>
                            </div>

                            <ul className="space-y-4 mb-10 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-3 text-sm font-medium">
                                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center shrink-0", plan.popular ? "bg-white/20" : "bg-blue-600/10")}>
                                            <Check size={12} className={plan.popular ? "text-white" : "text-blue-600"} />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <Button className={cn("w-full py-7 rounded-2xl font-black uppercase tracking-widest text-xs", plan.btn)}>
                                Get Started
                            </Button>
                        </div>
                    ))}
                </div>

                {/* FAQ Mockup */}
                <div className="max-w-3xl mx-auto space-y-12">
                    <h2 className="text-3xl font-black text-center tracking-tight">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "What counts as an execution?", a: "An execution is counted whenever a flow is triggered via its API endpoint or manually run from the Test Lab." },
                            { q: "Can I upgrade or downgrade at any time?", a: "Yes, you can change your plan whenever you like. Changes will be reflected in your next billing cycle." },
                            { q: "Do you offer discounts for open-source projects?", a: "Absolutely! Contact our community team with your GitHub repo and we'll set you up with a Pro account for free." }
                        ].map((item, i) => (
                            <div key={i} className="p-6 rounded-2xl border border-slate-100 bg-slate-50">
                                <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
