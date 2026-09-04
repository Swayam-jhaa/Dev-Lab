"use client";

import React from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

export type PageView = "dispatch" | "radar" | "chronicles";

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
  const navItems: { id: PageView; label: string; num: string }[] = [
    { id: "dispatch", label: "DISPATCH", num: "01" },
    { id: "radar", label: "RADAR", num: "02" },
    { id: "chronicles", label: "CHRONICLES", num: "03" },
  ];

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        role="navigation"
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center gap-2 sm:gap-5 bg-[#111113] text-stone-300 border border-stone-800 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-2xl backdrop-blur-md"
      >
        {/* Brand & Posture Tag */}
        <div className="flex items-center gap-2 pr-2 sm:pr-3 border-r border-stone-800 shrink-0">
          <span className="font-serif font-bold tracking-widest text-xs sm:text-sm text-stone-100 uppercase">
            TECHPULSE
          </span>
          <span className="font-mono text-[9px] tracking-wider uppercase text-stone-400 hidden sm:inline tabular-nums">
            {threatLevel}
          </span>
        </div>

        {/* Center Page Selector */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectPage(item.id)}
                aria-current={active ? "page" : undefined}
                className={`relative min-h-[38px] px-2.5 sm:px-4 py-1.5 rounded-full font-mono text-[11px] tracking-wider transition-colors uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
                  active ? "text-stone-900 font-bold" : "text-stone-400 hover:text-stone-200"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-stone-100 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10 opacity-50 text-[9px] mr-1 hidden sm:inline tabular-nums">
                  {item.num}
                </span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Audio Toggle */}
        <div className="pl-1 sm:pl-2 border-l border-stone-800">
          <button
            onClick={onToggleAudio}
            aria-label={isAudioPlaying ? "Mute 142.8 MHz ambient synthesizer" : "Unmute 142.8 MHz ambient synthesizer"}
            className={`flex items-center justify-center min-w-[38px] min-h-[38px] p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 ${
              isAudioPlaying
                ? "text-amber-400 bg-stone-900"
                : "text-stone-400 hover:text-stone-200"
            }`}
            title={isAudioPlaying ? "Mute Frequency (142.8 MHz)" : "Play Carrier Drone (142.8 MHz)"}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
