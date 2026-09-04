"use client";

import React from "react";
import { DailyReport } from "../types/intelligence";
import { HeroDavid3D } from "./HeroDavid3D";
import { ArrowUpRight } from "lucide-react";
import { formatDateFriendly } from "../lib/utils";

interface DispatchViewProps {
  report: DailyReport;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onExplore: () => void;
}

export const DispatchView: React.FC<DispatchViewProps> = ({
  report,
  isAudioPlaying,
  onToggleAudio,
  onExplore,
}) => {
  const leadStory = report.tech_news[0];
  const secondaryStories = report.tech_news.slice(1);
  const friendlyDate = formatDateFriendly(report.date);

  return (
    <div className="space-y-0 pb-24">
      
      {/* 1. Serene 3D Classical Hero */}
      <HeroDavid3D
        report={report}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={onToggleAudio}
      />

      {/* 2. Editorial Broadsheet: Daily Intelligence Briefing */}
      <article className="max-w-5xl mx-auto px-4 sm:px-8 pt-16 pb-12 space-y-12">
        
        {/* Newspaper Masthead Line */}
        <div className="border-t-2 border-b border-stone-900 py-3 flex items-center justify-between text-xs font-mono tracking-widest text-stone-700 uppercase tabular-nums">
          <span>DAILY EDITION · {friendlyDate.toUpperCase()}</span>
          <span className="font-bold text-stone-900 hidden sm:inline">EXECUTIVE TECH & CYBER INTELLIGENCE</span>
          <span>SECURITY CLIMATE: {report.threat_level}</span>
        </div>

        {/* Lead Headline & Executive Essay */}
        <div className="space-y-6">
          <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 font-semibold tracking-tight leading-tight">
            Today&apos;s Executive Briefing
          </h1>
          
          <div className="font-sans text-stone-800 text-base sm:text-lg leading-relaxed max-w-prose">
            <p className="first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-stone-900 leading-relaxed">
              {report.executive_summary}
            </p>
          </div>
        </div>

        {/* Key Takeaways: Polished Shadcn-style Card Grid */}
        <div className="border-t border-stone-300 pt-8 space-y-6">
          <div>
            <div className="font-mono text-[11px] tracking-widest uppercase text-[#57534E] font-bold">
              KEY TAKEAWAYS FOR TODAY
            </div>
            <p className="text-stone-600 text-xs mt-1">
              High-priority strategic developments synthesized from today&apos;s global research and vulnerability feeds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {report.key_takeaways.map((takeaway, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-xl border border-stone-300/80 bg-stone-100/70 hover:bg-stone-50/90 transition-all duration-200 card-hover-glow shadow-xs"
              >
                <span className="font-mono text-xs font-bold text-stone-900 bg-stone-200/80 border border-stone-300 px-2 py-0.5 rounded shrink-0 mt-0.5 tabular-nums">
                  0{idx + 1}
                </span>
                <p className="font-sans text-sm text-stone-800 leading-relaxed">
                  {takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>

      </article>

      {/* 3. Tech News Section: Polished Interactive Editorial Cards */}
      <section className="border-t border-stone-300 bg-[#E5E2DA] py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="flex items-baseline justify-between border-b border-stone-400/60 pb-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold">
                Top Tech Stories & Industry Shifts
              </h2>
              <p className="font-sans text-xs text-stone-600 mt-1">
                Highest-ranked community discussions and critical technology breakthroughs.
              </p>
            </div>

            <button
              onClick={onExplore}
              className="font-mono text-xs text-stone-700 hover:text-stone-950 uppercase tracking-wider font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 bg-stone-100 hover:bg-stone-50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
            >
              <span>Explore All Stories & Tools</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>

          {/* Lead Story Feature Card */}
          {leadStory && (
            <div className="rounded-2xl border border-stone-300/90 bg-white/70 backdrop-blur-xs p-6 sm:p-8 card-hover-glow shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2.5 font-mono text-[11px] text-[#57534E] tabular-nums">
                  <span className="font-bold text-stone-900 bg-stone-200/80 px-2 py-0.5 rounded text-[10px] uppercase">
                    {leadStory.source}
                  </span>
                  <span>·</span>
                  <span className="font-medium text-stone-700">+{leadStory.score} COMMUNITY POINTS</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 leading-snug">
                  <a
                    href={leadStory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-start gap-2 hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                  >
                    <span>{leadStory.headline}</span>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" aria-hidden="true" />
                  </a>
                </h3>

                <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed max-w-prose">
                  {leadStory.analysis}
                </p>
              </div>

              <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-stone-300/80 pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between text-xs font-mono text-[#57534E] space-y-4">
                <div className="bg-stone-100/80 p-4 rounded-xl border border-stone-200">
                  <div className="font-bold text-stone-900 uppercase text-[10px] mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
                    WHY THIS MATTERS
                  </div>
                  <p className="font-sans text-xs text-stone-700 leading-relaxed">
                    Primary architectural shift analyzed from community discussion and model releases.
                  </p>
                </div>
                <div className="text-[10px] text-[#57534E] uppercase tabular-nums">
                  VERIFIED REPORT · {friendlyDate}
                </div>
              </div>
            </div>
          )}

          {/* Secondary Stories: 2-Column Responsive Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {secondaryStories.map((news, idx) => (
              <article
                key={idx}
                className="rounded-xl border border-stone-300/80 bg-white/60 hover:bg-white/90 p-5 space-y-3 card-hover-glow transition-all duration-300 shadow-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 font-mono text-[10px] text-[#57534E] uppercase tabular-nums">
                    <span className="font-semibold text-stone-800 bg-stone-200/60 px-1.5 py-0.5 rounded">
                      {news.source}
                    </span>
                    <span>·</span>
                    <span>+{news.score} PTS</span>
                  </div>

                  <h4 className="font-serif text-xl font-semibold text-stone-900 leading-snug">
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-2 hover:text-stone-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900"
                    >
                      <span>{news.headline}</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all mt-1" aria-hidden="true" />
                    </a>
                  </h4>

                  <p className="font-sans text-xs text-stone-700 leading-relaxed">
                    {news.analysis}
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>Community Story</span>
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-stone-800 hover:text-stone-950 underline"
                  >
                    Read Source ↗
                  </a>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

