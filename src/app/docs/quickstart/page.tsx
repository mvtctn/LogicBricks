"use client";

import React from 'react';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Play,
    Terminal,
    Sparkles,
    MousePointer2,
    Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function QuickstartGuide() {
    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="space-y-4">
                <Link href="/docs" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors text-xs font-bold uppercase tracking-widest mb-2">
                    <ArrowLeft size={12} />
                    Back to Docs
                </Link>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">Quickstart Guide</h1>
                <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    Build and deploy your first AI-generated logic flow in less than 5 minutes.
                </p>
            </div>

            <hr className="border-slate-100" />

            {/* Step 1 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg">1</div>
                    <h2 className="text-2xl font-bold tracking-tight">Create a New Project</h2>
                </div>
                <div className="space-y-4 text-slate-600 pl-12 leading-relaxed">
                    <p>Navigate to your <Link href="/dashboard" className="text-blue-600 font-semibold underline decoration-blue-200 underline-offset-4">Dashboard</Link> and click the <strong>"New Project"</strong> button. This will open the LogicBricks Editor with a default <strong>Start Node</strong> waiting for you on the canvas.</p>
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3 italic text-sm">
                        <Terminal size={16} className="text-slate-400" />
                        Tip: You can also use one of our templates to see a pre-built example.
                    </div>
                </div>
            </section>

            {/* Step 2 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg">2</div>
                    <h2 className="text-2xl font-bold tracking-tight">Add Logic with AI</h2>
                </div>
                <div className="space-y-4 text-slate-600 pl-12 leading-relaxed">
                    <p>Drag a <strong>Process Node</strong> from the left sidebar onto the canvas and connect it to the Start Node. Click on the Process Node to open its settings.</p>
                    <ul className="space-y-3 list-disc pl-5">
                        <li>Locate the <strong>AI Prompt</strong> field.</li>
                        <li>Enter a natural language instruction like: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-pink-600 font-mono text-xs">"If the user's age is over 18, set status to 'adult', otherwise set it to 'minor'."</code></li>
                        <li>Click <strong>"Compile Logic"</strong>. LogicBricks AI will automatically generate the JavaScript code for you.</li>
                    </ul>
                </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg">3</div>
                    <h2 className="text-2xl font-bold tracking-tight">Test Your Flow</h2>
                </div>
                <div className="space-y-4 text-slate-600 pl-12 leading-relaxed">
                    <p>Use the <strong>Test Lab</strong> on the right sidebar to simulate an execution:</p>
                    <ol className="space-y-3 list-decimal pl-5">
                        <li>Enter a sample JSON input like <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">{"{ \"age\": 25 }"}</code>.</li>
                        <li>Click the <strong>"Run Simulation"</strong> button.</li>
                        <li>Watch the nodes light up as the data flows through your logic. Check the <strong>Output</strong> section to see the final result.</li>
                    </ol>
                </div>
            </section>

            {/* Step 4 */}
            <section className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-lg">4</div>
                    <h2 className="text-2xl font-bold tracking-tight">Deploy to Production</h2>
                </div>
                <div className="space-y-4 text-slate-600 pl-12 leading-relaxed">
                    <p>Once you're satisfied with the logic, click <strong>"Deploy Flow"</strong> in the top header. You will receive a unique API endpoint that you can call from your own frontend or backend applications.</p>
                </div>
            </section>

            {/* Success Summary */}
            <div className="p-8 rounded-[32px] bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center gap-4 shadow-xl shadow-emerald-500/5">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg animate-bounce">
                    <Rocket size={32} />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 tracking-tight leading-tight">Congratulations!</h3>
                <p className="text-emerald-700/70 max-w-md font-medium">You've just built your first serverless logic brick flow. You're now ready to tackle more complex logic like multi-conditional routing and external API integrations.</p>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-12 border-t border-slate-100">
                <Link href="/docs">
                    <Button variant="outline" className="rounded-xl font-bold gap-3 group border-slate-200">
                        <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                        Introduction
                    </Button>
                </Link>
                <Link href="/docs/concepts">
                    <Button variant="outline" className="rounded-xl font-bold gap-3 group border-slate-200">
                        Core Concepts
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
