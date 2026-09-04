"use client";

import React, { useState, useMemo } from "react";
import { DailyReport, CveItem, AiBreakthrough, TrendingTool } from "../types/intelligence";
import { Search, Shield, Sparkles, Terminal, ArrowUpRight, Flame, Filter, AlertTriangle } from "lucide-react";
import { ModalPayload } from "./DetailModal";

interface RadarViewProps {
  report: DailyReport;
  onOpenModal: (payload: ModalPayload) => void;
}

export const RadarView: React.FC<RadarViewProps> = ({ report, onOpenModal }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "ai" | "tools" | "cve">("all");

  const filteredCves = useMemo(() => {
    if (activeFilter !== "all" && activeFilter !== "cve") return [];
    return report.cves.filter(
      (c) =>
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.vendor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [report.cves, searchQuery, activeFilter]);

  const filteredAi = useMemo(() => {
    if (activeFilter !== "all" && activeFilter !== "ai") return [];
    return report.ai_breakthroughs.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.why_it_matters.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [report.ai_breakthroughs, searchQuery, activeFilter]);

  const filteredTools = useMemo(() => {
    if (activeFilter !== "all" && activeFilter !== "tools") return [];
    return report.trending_tools.filter(
      (t) =>
        t.repo_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.language.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [report.trending_tools, searchQuery, activeFilter]);

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-10">
      
      {/* Editorial Header */}
      <div className="border-b border-stone-300 pb-6 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
          <Shield className="w-4 h-4 text-stone-900" />
          <span>TACTICAL INTELLIGENCE RADAR // CYCLE {report.date}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
          Signal Spectrum & Threat Telemetry
        </h1>
        <p className="font-sans text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Deep-dive analysis across active vulnerability exploits with FIRST.org EPSS scoring, frontier AI model architectures, and rising developer tooling.
        </p>
      </div>

      {/* Search & Filter Command Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white/70 border border-stone-300 p-3 sm:p-4 shadow-xs">
        
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Filter by CVE ID, paper title, tool name, or product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 font-sans text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 font-mono text-xs">
          {(["all", "ai", "tools", "cve"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 uppercase font-medium transition-all ${
                activeFilter === filter
                  ? "bg-[#111113] text-stone-100 font-bold shadow-xs"
                  : "bg-white/80 text-stone-600 border border-stone-200 hover:bg-stone-200"
              }`}
            >
              {filter === "all" ? "ALL SIGNALS" : filter.toUpperCase()}
            </button>
          ))}
        </div>

      </div>

      {/* SECTION 1: AI FRONTIER & OPEN WEIGHTS */}
      {filteredAi.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-300 pb-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>AI RESEARCH PAPERS & OPEN WEIGHTS ({filteredAi.length})</span>
            </div>
            <span className="font-mono text-[10px] text-stone-500 uppercase">HUGGING FACE / ARXIV</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAi.map((ai, idx) => (
              <div
                key={idx}
                onClick={() => onOpenModal({ type: "ai", item: ai })}
                className="bg-white/80 border border-stone-300 p-5 sm:p-6 space-y-4 hover:border-stone-900 transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 border-b border-stone-100 pb-2">
                    <span className="font-bold text-stone-800 uppercase px-1.5 py-0.5 bg-stone-100">
                      {ai.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {ai.is_new_today && (
                        <span className="flex items-center gap-0.5 text-emerald-700 font-bold">
                          <Flame className="w-3 h-3" /> NEW
                        </span>
                      )}
                      <span className="font-semibold text-stone-700">▲ {ai.upvotes_or_likes}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 group-hover:text-stone-700 leading-snug">
                    {ai.title}
                  </h3>

                  <p className="font-sans text-xs text-stone-700 leading-relaxed line-clamp-3">
                    {ai.summary}
                  </p>

                  <div className="bg-amber-50/60 border border-amber-200/80 p-3 font-sans text-xs text-stone-900 leading-relaxed">
                    <strong className="font-mono uppercase text-[9px] text-amber-900 block mb-0.5">
                      WHY IT MATTERS:
                    </strong>
                    {ai.why_it_matters}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-stone-500 border-t border-stone-100">
                  <span className="uppercase tracking-wider group-hover:text-stone-900 font-bold">
                    Click to inspect dossier →
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: DEVELOPER ARSENAL & TOOLS */}
      {filteredTools.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-300 pb-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
              <Terminal className="w-4 h-4 text-stone-900" />
              <span>DEVELOPER ARSENAL // TRENDING OPEN-SOURCE ({filteredTools.length})</span>
            </div>
            <span className="font-mono text-[10px] text-stone-500 uppercase">GITHUB VELOCITY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredTools.map((tool, idx) => (
              <div
                key={idx}
                onClick={() => onOpenModal({ type: "tool", item: tool })}
                className="bg-white/80 border border-stone-300 p-5 space-y-3 hover:border-stone-900 transition-all hover:shadow-md cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 border-b border-stone-100 pb-1.5">
                    <span className="font-bold text-stone-800 uppercase px-1.5 py-0.5 bg-stone-100">
                      {tool.language || "CODE"}
                    </span>
                    <span className="font-bold text-stone-900">
                      ★ {tool.stars.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="font-mono font-bold text-base text-stone-900 group-hover:text-stone-700 break-words">
                    {tool.repo_name}
                  </h3>

                  <p className="font-sans text-xs text-stone-700 leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>

                  <div className="bg-stone-100 p-2.5 font-sans text-xs text-stone-800 leading-relaxed border border-stone-200">
                    <span className="font-mono text-[9px] uppercase text-stone-500 block mb-0.5">
                      USE CASE:
                    </span>
                    {tool.use_case}
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between font-mono text-[10px] text-stone-500 border-t border-stone-100">
                  <span className="uppercase tracking-wider group-hover:text-stone-900 font-bold">
                    Inspect Tool →
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900" />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: DEFENSIVE CYBER RADAR (CVEs with FIRST.org EPSS) */}
      {filteredCves.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-300 pb-2">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
              <Shield className="w-4 h-4 text-red-700" />
              <span>DEFENSIVE VULNERABILITY RADAR // EPSS ENRICHED ({filteredCves.length})</span>
            </div>
            <span className="font-mono text-[10px] text-stone-500 uppercase">CISA KEV + FIRST.ORG</span>
          </div>

          <div className="space-y-4">
            {filteredCves.map((cve, idx) => {
              const epssPercent = cve.epss_score ? (cve.epss_score * 100).toFixed(2) : null;
              const isHighExploit = cve.epss_score ? cve.epss_score > 0.05 : false;

              return (
                <div
                  key={idx}
                  onClick={() => onOpenModal({ type: "cve", item: cve })}
                  className="bg-white/80 border border-stone-300 p-5 sm:p-6 space-y-4 hover:border-stone-900 transition-all hover:shadow-md cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
                    <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-stone-900 text-sm tracking-wider">
                        {cve.id}
                      </span>
                      <span className="bg-stone-200 text-stone-800 px-2 py-0.5">
                        {cve.vendor} / {cve.product}
                      </span>
                      <span className="bg-red-800 text-white px-2 py-0.5 font-bold">
                        {cve.severity}
                      </span>
                      {cve.is_new_today && (
                        <span className="flex items-center gap-1 text-emerald-700 font-bold">
                          <Flame className="w-3.5 h-3.5" />
                          NEW TODAY
                        </span>
                      )}
                    </div>

                    {/* FIRST.org EPSS Exploit Probability Meter */}
                    {epssPercent && (
                      <div className="flex items-center gap-3 font-mono text-xs">
                        <span className="text-stone-500 text-[11px] uppercase">
                          EPSS EXPLOIT PROB:
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 sm:w-32 h-2 bg-stone-200 overflow-hidden">
                            <div
                              className={`h-full ${
                                isHighExploit ? "bg-red-600" : "bg-amber-500"
                              }`}
                              style={{ width: `${Math.min(100, (cve.epss_score || 0) * 400)}%` }}
                            />
                          </div>
                          <span
                            className={`font-bold ${
                              isHighExploit ? "text-red-700" : "text-stone-900"
                            }`}
                          >
                            {epssPercent}%
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 group-hover:text-stone-700 leading-snug">
                      {cve.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed mt-1.5">
                      {cve.description}
                    </p>
                  </div>

                  <div className="bg-stone-900 text-stone-100 p-3 sm:p-4 font-mono text-xs flex items-start gap-2">
                    <span className="text-amber-400 font-bold shrink-0">REMEDIATION:</span>
                    <span className="text-stone-300 leading-relaxed">{cve.remediation}</span>
                  </div>

                  <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 pt-1">
                    <span className="uppercase tracking-wider group-hover:text-stone-900 font-bold">
                      Click to inspect full advisory & attack vectors →
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {filteredAi.length === 0 && filteredTools.length === 0 && filteredCves.length === 0 && (
        <div className="text-center py-16 bg-white/40 border border-stone-300 space-y-2">
          <p className="font-serif text-xl text-stone-700">No signals matched your query.</p>
          <p className="font-mono text-xs text-stone-500">Try clearing the search filter or switching categories.</p>
        </div>
      )}

    </div>
  );
};
