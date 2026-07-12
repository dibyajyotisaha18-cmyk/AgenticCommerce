"use client";

import Link from "next/link";

const features = [
  {
    icon: "⚡",
    title: "Groq-Powered Inference",
    desc: "Lightning-fast AI decisions using Groq's LPU chips — competitor analysis and pricing decisions in milliseconds, not seconds.",
    tag: "10x Faster"
  },
  {
    icon: "🎯",
    title: "Dynamic Pricing Engine",
    desc: "Continuously scrapes Google Shopping across thousands of SKUs to find the exact price that maximizes both volume and margin simultaneously.",
    tag: "Auto-Optimized"
  },
  {
    icon: "📦",
    title: "Smart Inventory Forecasting",
    desc: "Predicts exact depletion dates per SKU using sales velocity data and autonomously drafts wholesale restock orders before stockouts hit.",
    tag: "Predictive AI"
  },
  {
    icon: "🤖",
    title: "CrewAI Agent Orchestration",
    desc: "Three specialized AI agents — Market Researcher, Inventory Specialist, and Pricing Strategist — work in sequence on every cycle.",
    tag: "Multi-Agent"
  },
  {
    icon: "🔗",
    title: "Shopify & WooCommerce Ready",
    desc: "Push price updates directly to your live store via the Admin API. No manual intervention needed — changes happen in real-time.",
    tag: "1-Click Deploy"
  },
  {
    icon: "📧",
    title: "Autonomous Supplier Emails",
    desc: "When stock falls below threshold, the agent drafts and sends professional wholesale order emails via SendGrid automatically.",
    tag: "Auto-Draft"
  },
];

const stats = [
  { value: "142+", label: "Price Adjustments / Day" },
  { value: "12,400", label: "Competitor Scrapes / Day" },
  { value: "<50ms", label: "Groq Inference Latency" },
  { value: "99.9%", label: "Agent Uptime" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 glass" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
        <div className="text-xl font-black gradient-text tracking-tight">AgenticCommerce</div>
        <div className="hidden md:flex items-center gap-8 text-sm text-amber-200/70">
          <a href="#features" className="hover:text-amber-300 transition-colors">Features</a>
          <a href="#stats" className="hover:text-amber-300 transition-colors">Performance</a>
          <a href="#how" className="hover:text-amber-300 transition-colors">How It Works</a>
        </div>
        <Link href="/dashboard" className="glass-btn-primary px-5 py-2 rounded-full text-sm font-bold">
          Open Dashboard →
        </Link>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16">
        {/* Trust badge */}
        <div className="animate-fade-in-down mb-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm text-amber-200 animate-pulse-glow">
            <span>✨</span>
            <span>Trusted by forward-thinking e-commerce teams worldwide</span>
          </div>
        </div>

        {/* Headline */}
        <div className="space-y-3 mb-8 max-w-5xl">
          <h1 className="text-6xl md:text-8xl font-black leading-none animate-fade-in-up delay-100 gradient-text">
            Stop Leaking
          </h1>
          <h1 className="text-6xl md:text-8xl font-black leading-none animate-fade-in-up delay-200 text-white">
            Revenue to
          </h1>
          <h1 className="text-6xl md:text-8xl font-black leading-none animate-fade-in-up delay-300 gradient-text">
            Static Pricing.
          </h1>
        </div>

        <p className="text-xl md:text-2xl text-amber-100/80 max-w-2xl leading-relaxed animate-fade-in-up delay-400 mb-12">
          Deploy autonomous AI agents that track competitors in real-time, 
          dynamically optimize your prices, and restock inventory — <span className="text-amber-300 font-semibold">while you sleep.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-500">
          <Link href="/dashboard" className="glass-btn-primary px-10 py-4 rounded-2xl text-lg font-bold inline-block text-center">
            🚀 Launch the Agent Dashboard
          </Link>
          <a href="#features" className="glass-btn px-10 py-4 rounded-2xl text-lg font-semibold inline-block text-center">
            Explore Features ↓
          </a>
        </div>

        {/* Scroll cue */}
        <div className="mt-20 animate-bounce">
          <div className="w-6 h-10 glass rounded-full mx-auto flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-amber-400 rounded-full" />
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section id="stats" className="px-6 py-12">
        <div className="max-w-5xl mx-auto glass rounded-3xl p-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-4xl font-black gradient-text mb-2">{s.value}</div>
              <div className="text-sm text-amber-200/60">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">Everything You Need.</h2>
            <p className="text-amber-100/60 text-lg max-w-xl mx-auto">Built on a modern AI stack — no manual spreadsheets, no static rules, just intelligence at scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="glass rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{f.icon}</span>
                  <span className="text-xs px-3 py-1 glass rounded-full text-amber-300 border border-amber-500/30">{f.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-amber-100 mb-3">{f.title}</h3>
                <p className="text-amber-200/60 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how" className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black gradient-text mb-4">How the Agent Works</h2>
            <p className="text-amber-100/60 text-lg">Three specialized AI agents run sequentially on every cycle</p>
          </div>
          <div className="space-y-4">
            {[
              { step: "01", agent: "Market Intelligence Analyst", desc: "Scrapes Google Shopping and competitor sites across all your SKUs to gather live pricing data and market signals." },
              { step: "02", agent: "Inventory Optimization Specialist", desc: "Analyzes telemetry data to forecast depletion dates. Automatically drafts and sends supplier reorder emails via SendGrid." },
              { step: "03", agent: "Dynamic Pricing Strategist", desc: "Synthesizes market research and inventory levels to calculate the optimal price, then pushes updates directly to Shopify." },
            ].map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 flex gap-6 items-start animate-fade-in-up" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-5xl font-black gradient-text opacity-50 shrink-0 leading-none">{item.step}</div>
                <div>
                  <h3 className="text-xl font-bold text-amber-200 mb-2">{item.agent}</h3>
                  <p className="text-amber-100/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-3xl mx-auto glass rounded-3xl p-12">
          <h2 className="text-4xl md:text-5xl font-black gradient-text mb-6">Ready to Go Autonomous?</h2>
          <p className="text-amber-100/70 text-lg mb-10">Launch the dashboard and let your AI agents handle pricing and inventory — completely hands-free.</p>
          <Link href="/dashboard" className="glass-btn-primary px-12 py-5 rounded-2xl text-xl font-black inline-block">
            🚀 Open Agent Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 border-t border-amber-500/10 text-center text-sm text-amber-200/30">
        Built with CrewAI · Groq · Shopify API · SendGrid
      </footer>
    </div>
  );
}
