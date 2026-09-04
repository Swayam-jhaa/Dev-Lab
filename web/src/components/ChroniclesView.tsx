"use client";

import React from "react";
import { DailyReport, ArchiveIndexItem } from "../types/intelligence";
import { ArrowUpRight } from "lucide-react";

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
    <div className="pt-24 pb-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Editorial Header */}
      <div className="border-b border-stone-300 pb-6 space-y-2">
        <div className="font-mono text-xs uppercase tracking-widest text-stone-500">
          CHRONICLES · HISTORICAL ARCHIVE & STREAK LEDGER
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-semibold text-stone-900 tracking-tight">
          Intelligence Archive
        </h1>
        <p className="font-sans text-stone-600 text-sm sm:text-base leading-relaxed">
          Permanent chronological ledger of daily tech and cyber intelligence, syndication endpoints, and automated streak engine execution records.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Historical Index (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="font-mono text-xs uppercase tracking-wider text-stone-500 font-bold border-b border-stone-300 pb-2">
            RECORDED CYCLES ({archiveIndex.length})
          </div>

          <div className="divide-y divide-stone-200">
            {archiveIndex.map((entry) => {
              const isSelected = entry.date === selectedDate;
              return (
                <div
                  key={entry.date}
                  onClick={() => onSelectDate(entry.date)}
                  className={`py-5 space-y-2 cursor-pointer transition-colors ${
                    isSelected ? "bg-stone-200/60 px-3 -mx-3" : "hover:bg-stone-200/30 px-3 -mx-3"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="font-bold text-stone-900 text-sm">{entry.date}</span>
                    <span className="text-[11px] text-stone-600 font-semibold uppercase">
                      THREAT: {entry.threat_level}
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed line-clamp-2">
                    {entry.summary}
                  </p>

                  <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 pt-1">
                    <span>
                      {entry.cves_count} CVEs · {entry.ai_count} PAPERS · {entry.tools_count} TOOLS
                    </span>
                    <span className="font-bold text-stone-900 uppercase">
                      {isSelected ? "ACTIVE" : "VIEW →"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Syndication & Engine Details (5 cols) */}
        <div className="lg:col-span-5 space-y-10">
          
          {/* Syndication */}
          <div className="space-y-4 border-b border-stone-300 pb-8">
            <div className="font-mono text-xs uppercase tracking-wider text-stone-900 font-bold">
              SYNDICATION FEEDS
            </div>

            <p className="font-sans text-xs text-stone-700 leading-relaxed">
              Standard XML syndication endpoints for Feedly, Inoreader, Slack, or webhook automation.
            </p>

            <div className="space-y-2 font-mono text-xs">
              <a
                href="/data/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 border-b border-stone-200 text-stone-800 hover:text-stone-950 group"
              >
                <span>RSS 2.0 (rss.xml)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </a>

              <a
                href="/data/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-2 border-b border-stone-200 text-stone-800 hover:text-stone-950 group"
              >
                <span>ATOM (feed.xml)</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-900 transition-colors" />
              </a>
            </div>
          </div>

          {/* Engine Provenance */}
          <div className="space-y-3 font-mono text-xs text-stone-700">
            <div className="font-bold text-stone-900 uppercase">
              STREAK ENGINE SPECIFICATION
            </div>

            <div className="space-y-1.5 text-[11px] leading-relaxed">
              <div className="flex justify-between border-b border-stone-200 py-1">
                <span className="text-stone-500">SCHEDULE:</span>
                <span className="font-semibold">04:15 UTC DAILY</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 py-1">
                <span className="text-stone-500">JITTER WINDOW:</span>
                <span className="font-semibold">15m – 120m ORGANIC</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 py-1">
                <span className="text-stone-500">SERIALIZATION:</span>
                <span className="font-semibold">DUAL JSON + MD</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 py-1">
                <span className="text-stone-500">AUTHOR:</span>
                <span className="font-semibold">swayam jha</span>
              </div>
            </div>
          </div>

          {/* Quotation */}
          <div className="pt-2 font-serif italic text-sm text-stone-700 leading-relaxed">
            &ldquo;We can only see a short distance ahead, but we can see plenty there that needs to be done.&rdquo;
            <div className="font-mono text-[10px] uppercase not-italic text-stone-500 mt-1">
              — Alan Turing (1950)
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
