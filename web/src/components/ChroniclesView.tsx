"use client";

import React from "react";
import { DailyReport, ArchiveIndexItem } from "../types/intelligence";
import { Calendar, Rss, GitCommit, Shield, ArrowUpRight, CheckCircle2, Clock, Terminal } from "lucide-react";

interface ChroniclesViewProps {
  report: DailyReport;
  archiveIndex: ArchiveIndexItem[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const ChroniclesView: React.FC<ChroniclesViewProps> = ({
  report,
  archiveIndex,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto space-y-12">
      
      {/* Editorial Header */}
      <div className="border-b border-stone-300 pb-6 space-y-2">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
          <Calendar className="w-4 h-4 text-stone-900" />
          <span>THE CHRONICLES // HISTORICAL ARCHIVE & STREAK PROVENANCE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
          Living Intelligence Ledger
        </h1>
        <p className="font-sans text-stone-600 text-sm sm:text-base max-w-3xl leading-relaxed">
          Permanent chronological archive of daily tech and cyber intelligence, syndication endpoints, and serverless GitHub streak execution logs.
        </p>
      </div>

      {/* Grid: 1. Date Archive Picker & 2. Syndication Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Date Archives (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-300 pb-2">
            <span className="font-mono text-xs uppercase tracking-widest text-stone-900 font-bold">
              HISTORICAL CYCLES ({archiveIndex.length})
            </span>
            <span className="font-mono text-[10px] text-stone-500 uppercase">
              SORTED CHRONOLOGICALLY
            </span>
          </div>

          <div className="space-y-3">
            {archiveIndex.map((entry) => {
              const isSelected = entry.date === selectedDate;
              return (
                <div
                  key={entry.date}
                  onClick={() => onSelectDate(entry.date)}
                  className={`p-4 sm:p-5 border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#111113] text-stone-100 border-[#111113] shadow-md"
                      : "bg-white/80 text-stone-900 border-stone-300 hover:border-stone-900"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-bold tracking-wider text-sm">{entry.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 font-bold uppercase text-[10px] ${
                          isSelected ? "bg-stone-800 text-amber-400" : "bg-stone-200 text-stone-800"
                        }`}
                      >
                        THREAT: {entry.threat_level}
                      </span>
                    </div>
                  </div>

                  <p
                    className={`font-sans text-xs leading-relaxed line-clamp-2 ${
                      isSelected ? "text-stone-300" : "text-stone-700"
                    }`}
                  >
                    {entry.summary}
                  </p>

                  <div
                    className={`mt-3 pt-2 border-t flex flex-wrap items-center justify-between text-[10px] font-mono ${
                      isSelected ? "border-stone-800 text-stone-400" : "border-stone-100 text-stone-500"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{entry.cves_count} CVEs</span>
                      <span>•</span>
                      <span>{entry.ai_count} AI PAPERS</span>
                      <span>•</span>
                      <span>{entry.tools_count} TOOLS</span>
                    </div>

                    <span className="font-bold uppercase tracking-wider">
                      {isSelected ? "CURRENTLY ACTIVE" : "LOAD CYCLE →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: RSS Syndication & Engine Provenance (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* RSS / Atom Syndication Section */}
          <div className="bg-white/80 border border-stone-300 p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-900 font-bold border-b border-stone-200 pb-2">
              <Rss className="w-4 h-4 text-amber-600" />
              <span>SYNDICATION FEEDS</span>
            </div>

            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              Subscribe to TechPulse Intelligence via standard RSS 2.0 or Atom feeds for automated ingestion into Feedly, Inoreader, Slack, or Discord webhooks.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <a
                href="/data/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors text-stone-900"
              >
                <div className="flex items-center gap-2">
                  <Rss className="w-3.5 h-3.5 text-amber-600" />
                  <span className="font-bold">RSS 2.0 FEED</span>
                </div>
                <span className="text-[10px] text-stone-500 flex items-center gap-1">
                  <span>rss.xml</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              <a
                href="/data/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-stone-100 hover:bg-stone-200 border border-stone-300 transition-colors text-stone-900"
              >
                <div className="flex items-center gap-2">
                  <Rss className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-bold">ATOM FEED</span>
                </div>
                <span className="text-[10px] text-stone-500 flex items-center gap-1">
                  <span>feed.xml</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>
            </div>
          </div>

          {/* GitHub Streak Provenance */}
          <div className="bg-[#161518] text-stone-200 border border-stone-800 p-5 sm:p-6 space-y-4 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white font-bold">
                <GitCommit className="w-4 h-4 text-emerald-400" />
                <span>GITHUB STREAK ENGINE</span>
              </div>
              <span className="font-mono text-[9px] text-emerald-400 font-semibold uppercase bg-emerald-950/80 px-2 py-0.5 border border-emerald-800">
                ACTIVE RUNNER
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>SCHEDULE CRON:</span>
                <span className="text-white font-bold">15 4 * * * UTC (DAILY)</span>
              </div>
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>ORGANIC JITTER:</span>
                <span className="text-white font-bold">15m – 120m DELAY RANDOM</span>
              </div>
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>AUTHOR IDENTITY:</span>
                <span className="text-white font-bold">swayam jha</span>
              </div>
              <div className="flex items-center justify-between text-stone-400 text-[11px]">
                <span>STORAGE BACKING:</span>
                <span className="text-white font-bold">GIT DUAL-SERIALIZER</span>
              </div>
            </div>

            <div className="p-3 bg-black/40 border border-stone-800 font-mono text-[10px] text-stone-400 leading-relaxed">
              <div className="text-stone-300 font-bold mb-1">ROTATING CONVENTIONAL COMMITS:</div>
              <div className="text-stone-500 italic">
                feat(pulse): 2026-09-04 daily cyber & AI intelligence report
              </div>
            </div>
          </div>

          {/* Computing Axiom / Philosophical Epigraph */}
          <div className="border border-stone-300 bg-white/60 p-5 font-serif italic text-stone-800 space-y-2">
            <p className="text-sm leading-relaxed">
              &ldquo;We can only see a short distance ahead, but we can see plenty there that needs to be done.&rdquo;
            </p>
            <div className="font-mono text-[10px] uppercase tracking-wider text-stone-500 text-right not-italic">
              — Alan Turing, Computing Machinery and Intelligence (1950)
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
