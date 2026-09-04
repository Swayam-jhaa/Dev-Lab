"use client";

import React from "react";
import { DailyReport } from "../types/intelligence";
import { HeroDavid3D } from "./HeroDavid3D";
import { ArrowUpRight } from "lucide-react";

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
  const leadStory = report.tech_news[0];
  const secondaryStories = report.tech_news.slice(1);

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
        <div className="border-t-2 border-b border-stone-900 py-3 flex items-center justify-between text-xs font-mono tracking-widest text-stone-700 uppercase">
          <span>VOL. 2026 · NO. {report.date.replace(/-/g, ".")}</span>
          <span className="font-bold text-stone-900">EXECUTIVE INTELLIGENCE SYNTHESIS</span>
          <span>POSTURE: {report.threat_level}</span>
        </div>

        {/* Lead Headline & Executive Essay */}
        <div className="space-y-6">
          <h1 className="font-serif text-3xl sm:text-5xl text-stone-900 font-semibold tracking-tight leading-tight">
            Daily Synthesis & Frontier Signals
          </h1>
          
          <div className="font-sans text-stone-800 text-base sm:text-lg leading-relaxed space-y-4 max-w-4xl">
            <p className="first-letter:font-serif first-letter:text-5xl first-letter:float-left first-letter:mr-3 first-letter:font-bold first-letter:text-stone-900">
              {report.executive_summary}
            </p>
          </div>
        </div>

        {/* Strategic Takeaways: Clean Editorial Numbered List (No clunky cards) */}
        <div className="border-t border-stone-300 pt-8 space-y-6">
          <div className="font-mono text-[11px] tracking-widest uppercase text-stone-500 font-bold">
            STRATEGIC TAKEAWAYS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {report.key_takeaways.map((takeaway, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <span className="font-mono text-sm font-bold text-stone-400 shrink-0 mt-0.5">
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

      {/* 3. Tech News Section: Clean Newspaper Grid */}
      <section className="border-t border-stone-300 bg-[#E5E2DA] py-16 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="flex items-baseline justify-between border-b border-stone-400/60 pb-3">
            <div>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-semibold">
                Frontier Shifts & Tech News
              </h2>
            </div>

            <button
              onClick={onExploreRadar}
              className="font-mono text-xs text-stone-700 hover:text-stone-950 uppercase tracking-wider font-semibold flex items-center gap-1"
            >
              <span>Explore Radar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Lead Story Feature */}
          {leadStory && (
            <div className="border-b border-stone-300 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-3 font-mono text-[11px] text-stone-600">
                  <span className="font-bold text-stone-900 uppercase">{leadStory.source}</span>
                  <span>·</span>
                  <span>+{leadStory.score} POINTS</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-4xl font-semibold text-stone-900 leading-snug">
                  <a
                    href={leadStory.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-start gap-2 group"
                  >
                    <span>{leadStory.headline}</span>
                    <ArrowUpRight className="w-5 h-5 shrink-0 text-stone-400 group-hover:text-stone-900 mt-1 transition-colors" />
                  </a>
                </h3>

                <p className="font-sans text-sm sm:text-base text-stone-700 leading-relaxed">
                  {leadStory.analysis}
                </p>
              </div>

              <div className="lg:col-span-4 border-l border-stone-300 pl-6 flex flex-col justify-between text-xs font-mono text-stone-600 space-y-4">
                <div>
                  <div className="font-bold text-stone-900 uppercase text-[10px] mb-1">IMPACT ANALYSIS</div>
                  <p className="font-sans text-xs text-stone-700 leading-relaxed">
                    Primary architectural shift analyzed from community discussion and model releases.
                  </p>
                </div>
                <div className="text-[10px] text-stone-500 uppercase">
                  VERIFIED SIGNAL · CYCLE {report.date}
                </div>
              </div>
            </div>
          )}

          {/* Secondary Stories: 2-Column Clean Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {secondaryStories.map((news, idx) => (
              <article key={idx} className="space-y-2 border-b border-stone-300 md:border-b-0 pb-6 md:pb-0">
                <div className="flex items-center gap-2 font-mono text-[10px] text-stone-500 uppercase">
                  <span className="font-semibold text-stone-800">{news.source}</span>
                  <span>·</span>
                  <span>+{news.score} PTS</span>
                </div>

                <h4 className="font-serif text-xl font-semibold text-stone-900 leading-snug">
                  <a
                    href={news.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-start justify-between gap-2 group"
                  >
                    <span>{news.headline}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 text-stone-400 group-hover:text-stone-900 transition-colors" />
                  </a>
                </h4>

                <p className="font-sans text-xs text-stone-700 leading-relaxed">
                  {news.analysis}
                </p>
              </article>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
