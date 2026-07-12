"use client";

import { useState } from "react";
import Link from "next/link";

type AgentStatus = "idle" | "running" | "success" | "error";

const mockData = [
  { sku: "SKU-1001", name: "Wireless Earbuds", stock: 50, velocity: 5.2, compPrice: 45.99, myPrice: 49.99, days: 9.6, status: "price_drop" },
  { sku: "SKU-1002", name: "Smart Watch", stock: 12, velocity: 3.1, compPrice: 120.00, myPrice: 129.99, days: 3.9, status: "reorder" },
  { sku: "SKU-1003", name: "Mechanical Keyboard", stock: 85, velocity: 1.5, compPrice: 89.50, myPrice: 85.00, days: 56.7, status: "optimal" },
  { sku: "SKU-1004", name: "Gaming Mouse", stock: 5, velocity: 2.0, compPrice: 55.00, myPrice: 59.99, days: 2.5, status: "critical" },
  { sku: "SKU-1005", name: "USB-C Hub", stock: 200, velocity: 10.0, compPrice: 22.99, myPrice: 25.00, days: 20.0, status: "price_drop" },
];

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  price_drop: { label: "Price Drop Suggested", color: "#60a5fa", bg: "rgba(96,165,250,0.1)" },
  reorder:    { label: "Supplier Order Drafted", color: "#fbbf24", bg: "rgba(251,191,36,0.1)" },
  optimal:    { label: "Optimal ✓", color: "#34d399", bg: "rgba(52,211,153,0.1)" },
  critical:   { label: "⚠ Stockout Risk", color: "#f87171", bg: "rgba(248,113,113,0.1)" },
};

export default function DashboardPage() {
  const [agentStatus, setAgentStatus] = useState<AgentStatus>("idle");
  const [agentMessage, setAgentMessage] = useState("");
  const [agentResult, setAgentResult] = useState("");
  const [pricingData, setPricingData] = useState(mockData);
  const [showResult, setShowResult] = useState(false);

  const runAgent = async () => {
    setAgentStatus("running");
    setAgentMessage("Initializing Groq agents...");
    setShowResult(false);

    try {
      const res = await fetch("http://localhost:8000/api/run-agent", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setAgentStatus("success");
        setAgentMessage("Agent cycle completed!");
        setAgentResult(data.result || data.message);
        setShowResult(true);
        // Simulate price update after agent run
        setPricingData(prev => prev.map(item =>
          item.status === "price_drop"
            ? { ...item, myPrice: parseFloat((item.compPrice * 0.97).toFixed(2)) }
            : item
        ));
      } else {
        throw new Error(data.detail || "Agent failed");
      }
    } catch (err: any) {
      setAgentStatus("error");
      setAgentMessage("Backend unreachable. Run: python3 agent_core/main.py");
    }

    setTimeout(() => {
      if (agentStatus !== "error") setAgentStatus("idle");
    }, 5000);
  };

  const kpis = [
    { label: "Pricing Adjustments Today", value: "142", sub: "+12.5% Margin Impact", icon: "📈", color: "#34d399" },
    { label: "Stockout Risks Prevented", value: "8", sub: "2 Draft Orders Pending", icon: "📦", color: "#fbbf24" },
    { label: "Competitor Scrapes Today", value: "12,400", sub: "Across 5 major platforms", icon: "🔍", color: "#60a5fa" },
    { label: "Revenue Recovered", value: "$4,820", sub: "This week via repricing", icon: "💰", color: "#f87171" },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 glass flex items-center justify-between px-6 py-4" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderTop: 'none' }}>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-amber-300 hover:text-amber-200 transition-colors">
            ← Back
          </Link>
          <span className="text-white/20">|</span>
          <h1 className="text-xl font-black gradient-text">Agent Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Agent Active
          </div>
          <button
            id="run-agent-btn"
            onClick={runAgent}
            disabled={agentStatus === "running"}
            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
              agentStatus === "running"
                ? "glass opacity-50 cursor-not-allowed text-amber-300"
                : "glass-btn-primary"
            }`}
          >
            {agentStatus === "running" ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Running Agents…
              </span>
            ) : "▶ Run Agent Cycle"}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Agent Status Banner */}
        {agentStatus !== "idle" && (
          <div className={`glass rounded-2xl p-4 flex items-center gap-4 border ${
            agentStatus === "success" ? "border-emerald-500/30" :
            agentStatus === "error"   ? "border-red-500/30" :
            "border-amber-500/30"
          } animate-fade-in-up`}>
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              agentStatus === "success" ? "bg-emerald-400" :
              agentStatus === "error"   ? "bg-red-400" :
              "bg-amber-400"
            }`} />
            <span className="text-sm font-medium text-amber-100">{agentMessage}</span>
          </div>
        )}

        {/* Agent Result */}
        {showResult && agentResult && (
          <div className="glass rounded-2xl p-6 border border-emerald-500/20 animate-fade-in-up">
            <h3 className="text-sm font-bold text-emerald-400 mb-3 uppercase tracking-widest">Agent Cycle Result</h3>
            <p className="text-amber-100/80 text-sm leading-relaxed whitespace-pre-wrap">{agentResult}</p>
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {kpis.map((k, i) => (
            <div key={i} className="glass rounded-2xl p-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{k.icon}</span>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: k.color }} />
              </div>
              <div className="text-3xl font-black text-white mb-1" style={{ textShadow: `0 0 20px ${k.color}40` }}>{k.value}</div>
              <div className="text-xs text-amber-200/50 mb-1">{k.label}</div>
              <div className="text-xs font-medium" style={{ color: k.color }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Inventory & Pricing Table */}
        <div className="glass rounded-2xl overflow-hidden animate-fade-in-up delay-300">
          <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/10">
            <h2 className="text-lg font-black text-amber-100">Live Inventory & Pricing</h2>
            <span className="text-xs px-3 py-1 glass rounded-full text-emerald-400 border border-emerald-500/20 animate-pulse">
              ● Real-time
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-amber-500/10">
                  <th className="text-left px-6 py-3 text-xs font-bold text-amber-200/50 uppercase tracking-widest">Product</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-amber-200/50 uppercase tracking-widest">Stock</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-amber-200/50 uppercase tracking-widest">Days Left</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-amber-200/50 uppercase tracking-widest">My Price</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-amber-200/50 uppercase tracking-widest">Comp. Avg</th>
                  <th className="text-left px-6 py-3 text-xs font-bold text-amber-200/50 uppercase tracking-widest">Agent Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-500/5">
                {pricingData.map((item) => {
                  const st = statusConfig[item.status];
                  return (
                    <tr key={item.sku} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-amber-100">{item.name}</div>
                        <div className="text-xs text-amber-200/40">{item.sku}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-semibold ${item.stock < 15 ? 'text-red-400 bg-red-500/10 border border-red-500/20' : 'text-amber-200/70 glass'}`}>
                          {item.stock} units
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-bold ${item.days < 5 ? 'text-red-400' : item.days < 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {item.days.toFixed(1)} days
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-white">${item.myPrice}</td>
                      <td className="px-6 py-4 text-amber-200/50">${item.compPrice}</td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-3 py-1.5 rounded-lg font-semibold" style={{ color: st.color, background: st.bg }}>
                          {st.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fade-in-up delay-400">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-amber-200 mb-4 text-sm uppercase tracking-widest">Pricing Actions</h3>
            <div className="space-y-3">
              <button
                id="apply-suggested-prices-btn"
                onClick={() => {
                  setPricingData(prev => prev.map(i => i.status === "price_drop" ? { ...i, myPrice: parseFloat((i.compPrice * 0.97).toFixed(2)) } : i));
                }}
                className="w-full glass-btn py-2.5 px-4 rounded-xl text-sm font-semibold text-left"
              >
                ✓ Apply All Suggested Prices
              </button>
              <button
                id="match-competitor-btn"
                onClick={() => {
                  setPricingData(prev => prev.map(i => ({ ...i, myPrice: parseFloat((i.compPrice * 0.99).toFixed(2)) })));
                }}
                className="w-full glass-btn py-2.5 px-4 rounded-xl text-sm font-semibold text-left"
              >
                🎯 Match All Competitor Prices
              </button>
              <button
                id="reset-prices-btn"
                onClick={() => setPricingData(mockData)}
                className="w-full glass-btn py-2.5 px-4 rounded-xl text-sm font-semibold text-left"
              >
                ↺ Reset to Original Prices
              </button>
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-amber-200 mb-4 text-sm uppercase tracking-widest">Inventory Actions</h3>
            <div className="space-y-3">
              <button
                id="draft-reorders-btn"
                onClick={() => alert("Draft reorder emails generated for SKU-1002 and SKU-1004!")}
                className="w-full glass-btn py-2.5 px-4 rounded-xl text-sm font-semibold text-left"
              >
                📧 Draft Reorder Emails
              </button>
              <button
                id="flag-critical-btn"
                onClick={() => alert("Critical items (< 5 days supply): Gaming Mouse (SKU-1004)")}
                className="w-full glass-btn py-2.5 px-4 rounded-xl text-sm font-semibold text-left"
              >
                ⚠ Flag Critical Items
              </button>
              <button
                id="export-report-btn"
                onClick={() => alert("Inventory report exported to CSV!")}
                className="w-full glass-btn py-2.5 px-4 rounded-xl text-sm font-semibold text-left"
              >
                📊 Export Inventory Report
              </button>
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-amber-200 mb-4 text-sm uppercase tracking-widest">Agent Insights</h3>
            <div className="space-y-3 text-sm">
              <div className="glass rounded-xl p-3">
                <div className="text-xs text-amber-200/50 mb-1">Market Researcher</div>
                <div className="text-amber-100 text-xs">Found 3 SKUs priced above competitor average by &gt;5%</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-xs text-amber-200/50 mb-1">Inventory Specialist</div>
                <div className="text-amber-100 text-xs">Gaming Mouse will stock out in 2.5 days at current velocity</div>
              </div>
              <div className="glass rounded-xl p-3">
                <div className="text-xs text-amber-200/50 mb-1">Pricing Strategist</div>
                <div className="text-amber-100 text-xs">Reducing Earbuds price to $44.71 could boost conversion by ~18%</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
