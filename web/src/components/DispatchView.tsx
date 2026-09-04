"use client";

import React from "react";
import { DailyReport, TechNewsItem } from "../types/intelligence";
import { HeroDavid3D } from "./HeroDavid3D";
import { Shield, Sparkles, Terminal, Activity, ArrowUpRight, Flame, Layers } from "lucide-react";

interface DispatchViewProps {
  report: DailyReport;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onExploreRadar: () => void;
}

export const DispatchView: React.FC<DispatchViewProps> = ({
  report,
  isAudioPlaying,
  onToggleAudio,
  onExploreRadar,
}) => {
  // Parse paragraphs of executive summary
  const summaryParagraphs = report.executive_summary
    ? report.executive_summary.split(/(?<=[.?!])\s+(?=[A-Z])/)
    : [];

  return (
    <div className="space-y-0 pb-16">
      
      {/* 1. Monumental 3D Hero */}
      <HeroDavid3D
        report={report}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={onToggleAudio}
        onExploreRadar={onExploreRadar}
      />

      {/* 2. Key Intelligence Metric Ribbon */}
      <section className="border-b border-stone-300 bg-[#E2DFD7] py-6 px-4 sm:px-6 md:px-12 font-mono text-xs text-stone-900">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="border-l-2 border-stone-900 pl-3">
            <span className="text-[10px] text-stone-500 uppercase tracking-widest block">
              THREAT CLIMATE
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-base sm:text-lg font-bold text-amber-900">
                {report.threat_level}
              </span>
              {report.yesterday_threat_level && (
                <span className="text-[10px] text-stone-600">
                  (WAS {report.yesterday_threat_level})
                </span>
              )}
            </div>
          </div>

          <div className="border-l-2 border-stone-400 pl-3">
            <span className="text-[10px] text-stone-500 uppercase tracking-widest block">
              ACTIVE VULNERABILITIES
            </span>
            <div className="text-base sm:text-lg font-bold mt-0.5">
              {report.cves.length} CVEs
            </div>
          </div>

          <div className="border-l-2 border-stone-400 pl-3">
            <span className="text-[10px] text-stone-500 uppercase tracking-widest block">
              AI RESEARCH & WEIGHTS
            </span>
            <div className="text-base sm:text-lg font-bold mt-0.5">
              {report.ai_breakthroughs.length} BREAKTHROUGHS
            </div>
          </div>

          <div className="border-l-2 border-stone-400 pl-3">
            <span className="text-[10px] text-stone-500 uppercase tracking-widest block">
              DEVELOPER ARSENAL
            </span>
            <div className="text-base sm:text-lg font-bold mt-0.5">
              {report.trending_tools.length} TRENDING TOOLS
            </div>
          </div>

        </div>
      </section>

      {/* 3. Executive Briefing & Key Takeaways */}
      <section className="py-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-8">
        
        <div className="flex items-center justify-between border-b border-stone-300 pb-3">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
            <Activity className="w-4 h-4 text-stone-900" />
            <span>EXECUTIVE BRIEFING // CYCLE {report.date}</span>
          </div>
          <span className="font-mono text-[10px] text-stone-500 uppercase tracking-wider">
            SYNTHESIS ENGINE GEMINI-2.5
          </span>
        </div>

        {/* Executive Summary Text */}
        <div className="bg-white/80 border border-stone-300 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold tracking-tight">
            Daily Intelligence Synthesis
          </h2>
          <p className="font-sans text-stone-800 leading-relaxed text-sm sm:text-base">
            {report.executive_summary}
          </p>
        </div>

        {/* 4 Key Takeaways Grid */}
        <div className="space-y-3">
          <div className="font-mono text-xs uppercase tracking-widest text-stone-700 font-bold">
            STRATEGIC TAKEAWAYS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.key_takeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="bg-white/60 border border-stone-300/80 p-4 sm:p-5 flex items-start gap-3 hover:border-stone-900 transition-colors"
              >
                <span className="font-mono text-xs font-bold bg-stone-900 text-stone-100 px-2 py-0.5 rounded-none shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <p className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                  {takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* 4. Top Tech News & Industry Shifts (Tech News First!) */}
      <section className="py-12 px-4 sm:px-6 md:px-12 bg-[#E5E2DA] border-t border-b border-stone-300">
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-300/80 pb-3">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
                <Sparkles className="w-4 h-4 text-stone-900" />
                <span>TOP TECH NEWS & ARCHITECTURAL SHIFTS</span>
              </div>
              <p className="font-serif text-stone-600 italic text-sm mt-0.5">
                Frontier model milestones, high-signal engineering discussions, and platform disruptions.
              </p>
            </div>

            <button
              onClick={onExploreRadar}
              className="font-mono text-xs uppercase font-bold text-stone-900 hover:text-stone-600 flex items-center gap-1.5"
            >
              <span>View Full Radar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {report.tech_news.map((news, idx) => (
              <article
                key={idx}
                className="bg-white/80 border border-stone-300 p-5 flex flex-col justify-between space-y-4 hover:border-stone-900 transition-all hover:shadow-md group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 border-b border-stone-200 pb-2">
                    <span className="font-bold text-stone-800 uppercase">{news.source}</span>
                    <span className="bg-stone-200 text-stone-800 px-1.5 py-0.5 font-semibold">
                      +{news.score} PTS
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base text-stone-900 group-hover:text-stone-700 leading-snug">
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-start justify-between gap-2"
                    >
                      <span>{news.headline}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-400 group-hover:text-stone-900 transition-colors" />
                    </a>
                  </h3>

                  <p className="font-sans text-xs text-stone-700 leading-relaxed">
                    {news.analysis}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-500">
                  {news.is_new_today && (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold uppercase">
                      <Flame className="w-3 h-3" />
                      NEW TODAY
                    </span>
                  )}
                  <span className="text-stone-400 uppercase tracking-wider">
                    ANALYZED
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Direct Deep-Dive Invitation */}
      <section className="py-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
        <h3 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold">
          Explore the Full Tactical Spectrum
        </h3>
        <p className="font-sans text-sm text-stone-600 max-w-xl">
          Inspect deep-dive vulnerability telemetry with FIRST.org EPSS exploit rankings, explore ArXiv research papers, or download trending GitHub tools.
        </p>
        <button
          onClick={onExploreRadar}
          className="bg-[#111113] text-stone-100 hover:bg-stone-800 px-8 py-3.5 font-mono text-xs uppercase font-bold tracking-widest transition-all shadow-md active:scale-98 flex items-center gap-2"
        >
          <span>Open Full Intelligence Radar</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
