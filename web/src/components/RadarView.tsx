"use client";

import React, { useState, useMemo } from "react";
import { DailyReport } from "../types/intelligence";
import { Search, ArrowUpRight } from "lucide-react";
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
    <div className="pt-24 pb-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Editorial Header */}
      <div className="border-b border-stone-300 pb-6 space-y-2">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-500">
          RADAR SPECTRUM · CYCLE {report.date}
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
          Tactical Signal Radar
        </h1>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          Daily indexed intelligence across frontier AI papers, rising open-source tools, and high-probability exploit vulnerabilities.
        </p>
      </div>

      {/* Clean Minimal Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-stone-300 pb-4">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 absolute left-0 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search signals, CVEs, papers, or tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-6 pr-4 py-1.5 bg-transparent font-sans text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none border-b border-transparent focus:border-stone-900 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {(["all", "ai", "tools", "cve"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 uppercase transition-colors ${
                activeFilter === filter
                  ? "bg-stone-900 text-stone-100 font-bold"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {filter === "all" ? "ALL" : filter.toUpperCase()}
            </button>
          ))}
        </div>

      </div>

      {/* SECTION 1: AI FRONTIER & PAPERS */}
      {filteredAi.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-baseline justify-between border-b border-stone-300 pb-2">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
              AI Research & Open Weights
            </h2>
            <span className="font-mono text-[10px] text-stone-500 uppercase">
              {filteredAi.length} PAPERS
            </span>
          </div>

          <div className="divide-y divide-stone-200">
            {filteredAi.map((ai, idx) => (
              <article
                key={idx}
                onClick={() => onOpenModal({ type: "ai", item: ai })}
                className="py-5 space-y-2 cursor-pointer group hover:bg-stone-200/40 px-3 -mx-3 transition-colors"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-stone-500">
                  <span className="font-semibold text-stone-800 uppercase">{ai.category}</span>
                  <span>▲ {ai.upvotes_or_likes} UPVOTES</span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-stone-900 group-hover:text-stone-700 leading-snug flex items-start justify-between gap-2">
                  <span>{ai.title}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </h3>

                <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {ai.summary}
                </p>

                <div className="font-sans text-xs text-stone-900 italic pt-1">
                  <strong className="font-mono not-italic uppercase text-[10px] text-stone-500 mr-2">
                    IMPACT:
                  </strong>
                  {ai.why_it_matters}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: DEVELOPER ARSENAL */}
      {filteredTools.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-baseline justify-between border-b border-stone-300 pb-2">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
              Developer Arsenal & Tooling
            </h2>
            <span className="font-mono text-[10px] text-stone-500 uppercase">
              {filteredTools.length} REPOSITORIES
            </span>
          </div>

          <div className="divide-y divide-stone-200">
            {filteredTools.map((tool, idx) => (
              <article
                key={idx}
                onClick={() => onOpenModal({ type: "tool", item: tool })}
                className="py-5 space-y-2 cursor-pointer group hover:bg-stone-200/40 px-3 -mx-3 transition-colors"
              >
                <div className="flex items-center justify-between font-mono text-[10px] text-stone-500">
                  <span className="font-semibold text-stone-800 uppercase">{tool.language || "CODE"}</span>
                  <span className="font-bold text-stone-900">★ {tool.stars.toLocaleString()}</span>
                </div>

                <h3 className="font-mono text-base font-bold text-stone-900 group-hover:text-stone-700 leading-snug flex items-start justify-between gap-2">
                  <span>{tool.repo_name}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-400 group-hover:text-stone-900 transition-colors" />
                </h3>

                <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {tool.description}
                </p>

                <div className="font-mono text-[11px] text-stone-600 pt-1">
                  <span className="text-stone-400 uppercase mr-2">USE CASE:</span>
                  {tool.use_case}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 3: DEFENSIVE CYBER RADAR */}
      {filteredCves.length > 0 && (
        <section className="space-y-6 pt-4">
          <div className="flex items-baseline justify-between border-b border-stone-300 pb-2">
            <h2 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900">
              Vulnerability Ledger (EPSS Enriched)
            </h2>
            <span className="font-mono text-[10px] text-stone-500 uppercase">
              {filteredCves.length} EXPLOITS
            </span>
          </div>

          <div className="divide-y divide-stone-200">
            {filteredCves.map((cve, idx) => {
              const epssPercent = cve.epss_score ? (cve.epss_score * 100).toFixed(2) : null;
              return (
                <article
                  key={idx}
                  onClick={() => onOpenModal({ type: "cve", item: cve })}
                  className="py-5 space-y-2 cursor-pointer group hover:bg-stone-200/40 px-3 -mx-3 transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-stone-600">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-stone-900">{cve.id}</span>
                      <span>·</span>
                      <span className="text-stone-500">{cve.vendor} / {cve.product}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {epssPercent && (
                        <span className="text-stone-900 font-semibold">
                          EPSS: {epssPercent}%
                        </span>
                      )}
                      <span className="font-bold text-red-800 text-[10px]">{cve.severity}</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-semibold text-stone-900 group-hover:text-stone-700 leading-snug flex items-start justify-between gap-2">
                    <span>{cve.title}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-400 group-hover:text-stone-900 transition-colors" />
                  </h3>

                  <p className="font-sans text-xs text-stone-700 leading-relaxed line-clamp-2">
                    {cve.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      )}

    </div>
  );
};
