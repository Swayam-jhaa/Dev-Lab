"use client";

import React from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX, Shield, Radio, Activity } from "lucide-react";

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
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center justify-between gap-2 sm:gap-4 bg-[#111113] text-stone-200 border border-stone-800/80 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-[0_12px_32px_rgba(0,0,0,0.35)] backdrop-blur-md">
        
        {/* Brand & Threat Level Pill */}
        <div className="flex items-center gap-2 pl-1 pr-2 sm:pr-3 border-r border-stone-800">
          <div className="relative flex items-center justify-center w-2.5 h-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </div>
          <span className="font-display font-bold tracking-widest text-xs sm:text-sm text-white uppercase">
            TECHPULSE
          </span>
          <span className="hidden md:inline-flex items-center gap-1 font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full bg-stone-900 border border-stone-750 text-stone-300">
            <Shield className="w-2.5 h-2.5 text-amber-400" />
            {threatLevel}
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
                className={`relative px-2.5 sm:px-4 py-1 rounded-full font-mono text-[11px] sm:text-xs tracking-wider transition-colors uppercase font-medium flex items-center gap-1.5 ${
                  active ? "text-stone-900 font-bold" : "text-stone-400 hover:text-stone-100"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-stone-100 shadow-sm"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 opacity-60 text-[9px]">{item.num}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Audio Frequency Toggle */}
        <div className="pl-1 sm:pl-2 border-l border-stone-800">
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-mono text-[10px] sm:text-[11px] uppercase transition-all tracking-wider ${
              isAudioPlaying
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                : "bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800"
            }`}
            title={isAudioPlaying ? "Mute Frequency Synthesizer" : "Play Ambient 142.8 MHz Carrier Drone"}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                <span className="hidden sm:inline">142.8 MHz</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">MUTE</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
