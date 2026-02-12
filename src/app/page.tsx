"use client";

import React from 'react';
import { Layers, Box, Cpu, Search, User, Bell, ChevronDown } from 'lucide-react';
import FlowEditor from '@/components/editor/FlowEditor';
import AISidebar from '@/components/editor/AISidebar';

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden">
      {/* Top Navigation */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 glass relative z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Box className="text-white" size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">Logic<span className="text-primary">Bricks</span></span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {['Flows', 'Functions', 'Tables', 'API Keys'].map((item, idx) => (
              <button
                key={item}
                className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${idx === 0 ? 'bg-primary/10 text-primary' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
            <input
              type="text"
              placeholder="Search flows..."
              className="bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 pl-4 border-l border-white/5">
            <button className="p-2 hover:bg-white/5 rounded-lg text-white/50 relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full" />
            </button>
            <div className="flex items-center gap-2 ml-2 p-1.5 rounded-xl hover:bg-white/5 cursor-pointer transition-all">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 overflow-hidden border border-white/20" />
              <ChevronDown size={14} className="text-white/30" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Side: Flow Editor */}
        <section className="flex-1 relative overflow-hidden">
          <FlowEditor />
          {/* Breadcrumbs/Mini Map UI overlay would go here */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 p-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 z-10 shadow-2xl">
            <button className="p-1.5 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all">
              <Cpu size={14} />
            </button>
            <div className="w-px h-4 bg-white/10" />
            <div className="text-[10px] font-mono text-white/40 tracking-widest px-2 uppercase">Runtime: Cloud-Edge</div>
          </div>
        </section>

        {/* Right Side: AI Panel */}
        <aside className="h-full">
          <AISidebar />
        </aside>
      </main>
    </div>
  );
}
