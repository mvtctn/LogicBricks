"use client";

import React, { useEffect, useState } from 'react';
import { Box, Plus, Layers, Play, Search, Bell, ChevronDown, Clock, ArrowRight, Settings } from 'lucide-react';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Dashboard() {
  const [flows, setFlows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const isConfigured = process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-supabase-url');

  useEffect(() => {
    async function fetchFlows() {
      if (!isConfigured) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('flows')
          .select('*')
          .order('updated_at', { ascending: false });

        if (data) setFlows(data);
      } catch (e) {
        console.error("Dashboard fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchFlows();
  }, [isConfigured]);

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden font-sans">
      {/* Top Navigation */}
      <header className="h-14 border-b border-white/5 flex items-center justify-between px-6 glass relative z-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Box className="text-white" size={20} />
            </div>
            <span className="font-bold text-lg tracking-tight">Logic<span className="text-primary">Bricks</span></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/editor">
            <Button size="sm" className="font-bold gap-2">
              <Plus size={16} />
              New Flow
            </Button>
          </Link>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 overflow-hidden border border-white/20" />
        </div>
      </header>

      {/* Hero / Welcome */}
      <main className="flex-1 overflow-y-auto p-8 max-w-6xl mx-auto w-full">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">My Bricks</h1>
            <p className="text-white/40">Manage your backend logic flows and API endpoints.</p>
          </div>
          {!isConfigured && (
            <div className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs flex items-center gap-2 animate-pulse">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Supabase setup required in .env.local
            </div>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : flows.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-white/5 rounded-3xl">
            <Layers className="text-white/10 mb-4" size={48} />
            <p className="text-white/30 text-sm mb-6">No flows found. Create your first logic brick.</p>
            <Link href="/editor">
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                Start Building
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {flows.map((flow) => (
              <Link href={`/editor?id=${flow.id}`} key={flow.id}>
                <Card className="p-6 bg-white/[0.02] border-white/5 hover:border-primary/50 hover:bg-white/[0.05] transition-all group cursor-pointer relative overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Layers className="text-indigo-400" size={20} />
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/20 group-hover:text-primary transition-colors">
                        EDIT FLOW <ArrowRight size={12} />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-white transition-colors">{flow.name}</h3>
                    <div className="flex items-center gap-2 text-white/20 text-xs mt-4">
                      <Clock size={12} />
                      {new Date(flow.updated_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-500 uppercase tracking-wider">
                      Active
                    </div>
                    <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-wider">
                      {flow.nodes?.length || 0} Nodes
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}

        {!isConfigured && flows.length > 0 && (
          <div className="mt-12 p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Settings className="text-primary" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">Persistence is disabled</h4>
                <p className="text-sm text-white/40 max-w-md">Your project is running in demo mode. To save your flows permanently, connect your Supabase project in <code className="text-primary font-mono">.env.local</code>.</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
