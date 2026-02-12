"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  ChevronDown,
  Play,
  Code2,
  Cpu,
  Github,
  Twitter,
  Menu,
  X,
  Plus,
  Mic,
  ArrowUpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ModeToggle } from '@/components/mode-toggle';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '/solutions' },
    { name: 'Docs', href: '/docs' },
    { name: 'Resources', href: '/dashboard/templates' },
    { name: 'Enterprise', href: '/enterprise' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Community', href: '/dashboard/discover' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Background Ambient Glow (Lovable style) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] rounded-full bg-pink-400/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] rounded-full bg-indigo-400/10 blur-[100px]" />
      </div>

      {/* Navigation */}
      <header className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 px-6 md:px-12",
        scrolled ? "h-16 bg-background/80 backdrop-blur-md border-b border-border" : "h-20 bg-transparent"
      )}>
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                <Box className="text-background" size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">LogicBricks</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 group"
                >
                  {link.name}
                  {['Solutions', 'Resources'].includes(link.name) && <ChevronDown size={14} className="group-hover:translate-y-0.5 transition-transform" />}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <Link href="/login">
              <Button variant="ghost" className="text-sm font-semibold hover:bg-muted">Log in</Button>
            </Link>
            <Link href="/login">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-6 shadow-sm">Get started</Button>
            </Link>
          </div>

          <button
            className="md:hidden text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-600 text-xs font-medium mb-8 hover:bg-slate-100 transition-colors cursor-pointer group"
        >
          <span className="bg-blue-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">New</span>
          Introducing a smarter LogicBricks AI
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
        >
          Build something <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Powerful</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium"
        >
          Automate backend logic and build serverless apps by chatting with AI
        </motion.p>

        {/* Main Action Input (Lovable style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative max-w-3xl mx-auto mb-20"
        >
          <div className="relative bg-card rounded-[24px] shadow-xl shadow-foreground/5 border border-border p-2 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <textarea
              placeholder="Ask LogicBricks to create an onboarding flow for SaaS..."
              className="w-full h-32 md:h-24 bg-transparent border-none focus:ring-0 p-4 text-lg text-foreground placeholder:text-muted-foreground/30 resize-none font-medium leading-relaxed"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <div className="flex items-center justify-between px-2 pb-2">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 rounded-full h-10 w-10">
                  <Plus size={20} />
                </Button>
                <div className="h-6 w-px bg-slate-100 mx-1" />
                <Button variant="ghost" className="text-slate-400 hover:text-slate-600 text-xs font-semibold gap-1 px-3">
                  Plan
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 rounded-full h-10 w-10">
                  <Mic size={18} />
                </Button>
                <Link href="/editor">
                  <Button size="icon" className="bg-slate-300 hover:bg-slate-900 text-white rounded-full h-10 w-10 transition-colors shadow-lg shadow-slate-200">
                    <ArrowUpCircle size={22} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Preview / Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="bg-muted rounded-2xl border border-border shadow-2xl overflow-hidden p-2 group hover:border-accent transition-all duration-500">
            <div className="rounded-xl border border-border bg-background shadow-sm overflow-hidden flex flex-col aspect-[16/9]">
              {/* Inner editor mockup */}
              <div className="h-8 bg-muted border-b border-border flex items-center px-4 gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
                <div className="w-2.5 h-2.5 rounded-full bg-border" />
              </div>
              <div className="flex-1 bg-muted/50 p-8 flex items-center justify-center relative overflow-hidden">
                {/* Decorative canvas elements */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="flex items-center gap-12 z-10">
                  <div className="w-32 h-20 rounded-xl bg-background border-2 border-emerald-400 shadow-lg flex items-center justify-center font-bold text-xs text-emerald-600 uppercase tracking-widest">Start</div>
                  <div className="w-12 h-1 bg-border rounded-full" />
                  <div className="w-40 h-28 rounded-xl bg-background border-2 border-blue-500 shadow-xl flex flex-col p-4 gap-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Cpu size={14} className="text-blue-500" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Process</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full" />
                    <div className="w-4/5 h-2 bg-muted rounded-full" />
                  </div>
                  <div className="w-12 h-1 bg-border rounded-full" />
                  <div className="w-32 h-20 rounded-xl bg-background border-2 border-red-400 shadow-lg flex items-center justify-center font-bold text-xs text-red-600 uppercase tracking-widest">End</div>
                </div>
              </div>
            </div>
          </div>
          {/* Floating Cards for "premium" feel */}
          <div className="absolute -top-6 -right-6 md:-right-12 hidden md:block w-48 bg-card p-4 rounded-xl shadow-2xl border border-border animate-bounce group-hover:animate-none">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-blue-500" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">AI Insight</span>
            </div>
            <p className="text-[11px] text-foreground leading-relaxed font-medium">Logic optimized for 45ms execution time.</p>
          </div>
        </motion.div>
      </main>

      {/* Features Info */}
      <section className="bg-muted/50 py-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-8 tracking-tight">Backend as simple as chatting with a friend.</h2>
            <div className="space-y-6">
              {[
                { title: 'Natural Language Execution', desc: 'No need to master complex syntax. Just describe what you want the logic to do.', icon: Zap, color: 'text-amber-500' },
                { title: 'Instant Deployment', desc: 'Deploy your logic hooks to a production-ready API endpoint in seconds.', icon: Globe, color: 'text-blue-500' },
                { title: 'Enterprise Security', desc: 'Encrypted logic, isolated execution environments, and full audit logs.', icon: Shield, color: 'text-emerald-500' },
              ].map((f, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center shadow-sm group-hover:border-accent transition-colors">
                    <f.icon className={f.color} size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground mb-1">{f.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="aspect-square bg-background rounded-3xl border border-border shadow-sm p-8 flex flex-col justify-between">
                <Code2 size={32} className="text-muted-foreground/40" />
                <div className="text-4xl font-bold tracking-tighter">90%</div>
                <div className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Less Boilerplate</div>
              </div>
              <div className="aspect-[4/5] bg-foreground rounded-3xl shadow-xl p-8 flex flex-col justify-end text-background">
                <Zap size={32} className="text-blue-400 mb-4" />
                <div className="text-2xl font-bold mb-2 tracking-tight">Instant Scaling</div>
                <p className="text-sm text-muted-foreground leading-relaxed">Runs on global edge infrastructure.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="aspect-[4/5] bg-blue-600 rounded-3xl shadow-xl p-8 flex flex-col justify-end text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <Sparkles size={32} className="mb-4" />
                <div className="text-2xl font-bold mb-2 tracking-tight">AI Generated</div>
                <p className="text-sm text-white/80 leading-relaxed">Perfectly optimized JavaScript for every case.</p>
              </div>
              <div className="aspect-square bg-background rounded-3xl border border-border shadow-sm p-8 flex flex-col justify-between">
                <Shield size={32} className="text-muted-foreground/40" />
                <div className="text-lg font-bold leading-tight text-foreground">SOC2 Compliant Environment</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto rounded-[40px] bg-foreground p-12 md:p-24 text-center text-background relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
          <h2 className="text-4xl md:text-5xl font-bold mb-8 relative z-10 tracking-tight">Ready to build something <span className="italic text-blue-400">Lovable</span>?</h2>
          <p className="text-muted-foreground text-lg mb-12 relative z-10 max-w-xl mx-auto">Join 10,000+ developers automating their backend with LogicBricks.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/editor">
              <Button className="bg-background text-foreground hover:bg-background/90 rounded-full px-8 py-6 text-lg font-bold border-none">Start for free</Button>
            </Link>
            <Button variant="ghost" className="text-background hover:bg-background/10 rounded-full px-8 py-6 text-lg font-bold border-none">Talk to sales</Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <Box className="text-background" size={18} />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">LogicBricks</span>
            </div>
            <p className="text-muted-foreground max-w-xs leading-relaxed mb-6">The visual canvas for AI-powered backend logic. Built for humans, powered by machines.</p>
            <div className="flex items-center gap-4">
              <Twitter className="text-muted-foreground hover:text-foreground transition-colors pointer-events-auto cursor-pointer" size={20} />
              <Github className="text-muted-foreground hover:text-foreground transition-colors pointer-events-auto cursor-pointer" size={20} />
            </div>
          </div>
          <div>
            <h6 className="font-bold text-sm mb-4">Product</h6>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Features</a></li>
              <li><a href="#" className="hover:text-foreground">Security</a></li>
              <li><a href="#" className="hover:text-foreground">Roadmap</a></li>
              <li><a href="#" className="hover:text-foreground">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm mb-4 text-foreground">Company</h6>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">About</a></li>
              <li><a href="#" className="hover:text-foreground">Careers</a></li>
              <li><a href="#" className="hover:text-foreground">Privacy</a></li>
              <li><a href="#" className="hover:text-foreground">Terms</a></li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold text-sm mb-4 text-foreground">Resources</h6>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground">Help Center</a></li>
              <li><a href="#" className="hover:text-foreground">Community</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between text-xs text-muted-foreground font-medium">
          <p>© 2026 LogicBricks. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Built with Love for Logic.</p>
        </div>
      </footer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[60] bg-background p-6 pt-24"
          >
            <nav className="flex flex-col gap-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl tracking-tight text-foreground">Menu</span>
                <ModeToggle />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link href="/editor" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-foreground text-background py-6 text-lg rounded-2xl hover:bg-foreground/90">Get Started</Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
