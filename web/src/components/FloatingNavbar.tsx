"use client";

import React from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export type PageView = "today" | "explore" | "archive";

interface FloatingNavbarProps {
  currentPage: PageView;
  onSelectPage: (page: PageView) => void;
  threatLevel: string;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  currentPage,
  onSelectPage,
  threatLevel,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const navItems: { id: PageView; label: string; shortLabel: string }[] = [
    { id: "today", label: "Today's Briefing", shortLabel: "Today" },
    { id: "explore", label: "Explore & Tools", shortLabel: "Explore" },
    { id: "archive", label: "Past Editions", shortLabel: "Archive" },
  ];

  const getThreatBadge = (level: string) => {
    switch (level.toUpperCase()) {
      case "CRITICAL":
      case "HIGH":
        return { text: "High Security Risk", color: "text-amber-300 border-amber-500/40 bg-amber-950/40" };
      case "ELEVATED":
      case "GUARDED":
        return { text: "Elevated Risk", color: "text-yellow-300 border-yellow-500/40 bg-yellow-950/40" };
      default:
        return { text: "Normal Status", color: "text-emerald-300 border-emerald-500/40 bg-emerald-950/40" };
    }
  };

  const badge = getThreatBadge(threatLevel);

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        role="navigation"
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-2 sm:gap-4 bg-[#111113]/95 text-stone-300 border border-stone-800/90 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-2xl backdrop-blur-md"
      >
        {/* Brand & Security Badge */}
        <div className="flex items-center gap-2.5 pr-2 sm:pr-3 border-r border-stone-800 shrink-0">
          <span className="font-serif font-bold tracking-widest text-xs sm:text-sm text-stone-100 uppercase">
            TECHPULSE
          </span>
          <span
            className={`font-mono text-[9px] tracking-wider uppercase px-2 py-0.5 rounded-full border hidden sm:inline tabular-nums font-medium ${badge.color}`}
          >
            {badge.text}
          </span>
        </div>

        {/* Center Page Selector */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPage(item.id)}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 sm:px-4 py-1.5 rounded-full font-sans text-xs tracking-wide transition-all uppercase font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
                  active ? "text-stone-900 font-bold" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-stone-100 shadow-md"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10 hidden sm:inline">{item.label}</span>
                <span className="relative z-10 sm:hidden">{item.shortLabel}</span>
              </button>
            );
          })}
        </nav>

        {/* Audio Toggle with Animated Equalizer Bars */}
        <div className="pl-1 sm:pl-2 border-l border-stone-800">
          <button
            onClick={onToggleAudio}
            aria-label={isAudioPlaying ? "Mute ambient audio soundscape" : "Play ambient audio soundscape"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
              isAudioPlaying
                ? "text-amber-300 bg-amber-950/50 border border-amber-500/40"
                : "text-stone-400 hover:text-stone-200 bg-stone-900/60 border border-stone-800"
            }`}
            title={isAudioPlaying ? "Mute 142.8 MHz Ambient Soundscape" : "Play 142.8 MHz Ambient Soundscape"}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" aria-hidden="true" />
                <div className="flex items-end gap-0.5 h-3 w-3" aria-hidden="true">
                  <span className="w-0.5 bg-amber-400 rounded-full animate-[bounce_0.8s_infinite_100ms] h-full" />
                  <span className="w-0.5 bg-amber-400 rounded-full animate-[bounce_0.8s_infinite_300ms] h-2/3" />
                  <span className="w-0.5 bg-amber-400 rounded-full animate-[bounce_0.8s_infinite_200ms] h-4/5" />
                </div>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="text-[10px] font-mono uppercase hidden sm:inline">Audio Off</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
