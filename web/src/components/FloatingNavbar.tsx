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
    <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-3 sm:gap-5 bg-[#111113] text-stone-300 border border-stone-800 rounded-full px-4 py-2 shadow-2xl backdrop-blur-md">
        
        {/* Brand */}
        <div className="flex items-center gap-2.5 pr-2 sm:pr-3 border-r border-stone-800">
          <span className="font-serif font-bold tracking-widest text-sm text-stone-100 uppercase">
            TECHPULSE
          </span>
          <span className="font-mono text-[9px] tracking-wider uppercase text-stone-500 hidden md:inline">
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
                className={`relative px-3 sm:px-4 py-1 rounded-full font-mono text-[11px] tracking-wider transition-colors uppercase ${
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
                <span className="relative z-10 opacity-50 text-[9px] mr-1">{item.num}</span>
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Audio Toggle */}
        <div className="pl-1 sm:pl-2 border-l border-stone-800">
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 p-1.5 rounded-full transition-colors ${
              isAudioPlaying
                ? "text-amber-400 bg-stone-900"
                : "text-stone-500 hover:text-stone-300"
            }`}
            title={isAudioPlaying ? "Mute 142.8 MHz Frequency" : "Tune in to 142.8 MHz Frequency"}
          >
            {isAudioPlaying ? (
              <Volume2 className="w-3.5 h-3.5" />
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
};
