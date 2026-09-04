"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Crosshair, Activity, Radio, Volume2, VolumeX, Sliders, ArrowUpRight } from "lucide-react";
import { DailyReport } from "../types/intelligence";
import { getAudioFrequencyData, updateFrequency } from "../utils/audioSynth";

interface HeroDavid3DProps {
  report: DailyReport;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  onExploreRadar: () => void;
}

export const HeroDavid3D: React.FC<HeroDavid3DProps> = ({
  report,
  isAudioPlaying,
  onToggleAudio,
  onExploreRadar,
}) => {
  const [currentFreq, setCurrentFreq] = useState(142.8);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse interactive 3D perspective tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 28, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [-600, 600], [-8, 8]);
  const rotateX = useTransform(smoothMouseY, [-400, 400], [6, -6]);
  const lightX = useTransform(smoothMouseX, [-600, 600], [30, 70]);
  const lightY = useTransform(smoothMouseY, [-400, 400], [20, 60]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handlePresetSelect = (hz: number) => {
    setCurrentFreq(hz);
    updateFrequency(hz);
  };

  // HTML5 Canvas Synthwave Waveform animation across mouth
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;
      const numBars = 120;
      const barWidth = width / numBars;

      // Extract real audio frequency data if playing, or procedural oscillation
      const audioData = isAudioPlaying ? getAudioFrequencyData() : null;

      // Draw horizontal central laser beam filament
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let x = 0; x < width; x += 4) {
        const normX = x / width;
        // Envelope: tapered at edges, maximum in center (over mouth)
        const envelope = Math.sin(normX * Math.PI);
        const wave = Math.sin(normX * 18 + phase * 4) * Math.cos(normX * 9 - phase * 2);
        const yOffset = wave * 6 * envelope;
        ctx.lineTo(x, centerY + yOffset);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Draw dense vertical frequency bars
      for (let i = 0; i < numBars; i++) {
        const normI = i / numBars;
        // Center envelope bell curve
        const envelope = Math.pow(Math.sin(normI * Math.PI), 1.8);
        
        let amplitude = 0;
        if (audioData && audioData.length > 0) {
          const binIndex = Math.floor((i / numBars) * (audioData.length / 2));
          amplitude = (audioData[binIndex] / 255) * 38;
        } else {
          // Procedural interference wave with randomized micro-spikes
          const freqFactor = currentFreq / 142.8;
          const s1 = Math.sin(i * 0.22 * freqFactor + phase * 3);
          const s2 = Math.cos(i * 0.11 - phase * 2);
          const s3 = Math.sin(i * 0.45 + phase * 5);
          const jitter = (Math.sin(i * 7 + phase * 8) + 1) * 0.5;
          amplitude = Math.abs(s1 * 0.6 + s2 * 0.3 + s3 * 0.1) * (18 + jitter * 12);
        }

        const barHeight = Math.max(3, amplitude * envelope * 1.6);
        const xPos = i * barWidth;

        // Gradient for glowing bars
        const grad = ctx.createLinearGradient(xPos, centerY - barHeight, xPos, centerY + barHeight);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.3, "rgba(240, 248, 255, 0.75)");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
        grad.addColorStop(0.7, "rgba(240, 248, 255, 0.75)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(xPos + 1, centerY - barHeight / 2, Math.max(1.5, barWidth - 1.5), barHeight);
      }

      // Outer ethereal glow flare in center
      const radialGlow = ctx.createRadialGradient(
        width / 2, centerY, 5,
        width / 2, centerY, width * 0.4
      );
      radialGlow.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      radialGlow.addColorStop(0.4, "rgba(220, 235, 255, 0.10)");
      radialGlow.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      phase += 0.04;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAudioPlaying, currentFreq]);

  // Frequency presets
  const presets = [
    { hz: 71.4, name: "SUB-DRIFT" },
    { hz: 142.8, name: "SOLAR APEX" },
    { hz: 214.2, name: "HARMONIC" },
  ];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] w-full flex flex-col justify-between overflow-hidden pt-20 pb-8 px-4 sm:px-6 md:px-12 select-none border-b border-stone-300 bg-[#ECEAE4]"
    >
      {/* Background grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-60 z-0" />

      {/* Top Editorial Row (Above Statue) */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono tracking-widest text-[#242322] border-b border-stone-300/80 pb-3">
        <div className="flex items-center gap-2">
          <Crosshair className="w-3.5 h-3.5 text-stone-900" />
          <span className="font-bold uppercase tracking-[0.25em] text-[10px] sm:text-[11px]">
            ARCHITECTURE // THE DIGITAL FRONTIER
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[10px] sm:text-[11px] text-stone-600 uppercase tracking-widest">
          <span>CYCLE {report.date}</span>
          <span>•</span>
          <span>INTEL DEFCON 02</span>
          <span>•</span>
          <span className="text-stone-900 font-bold">OF THE FREQUENCY •••</span>
        </div>
      </div>

      {/* Center 3D Perspective Stage */}
      <div
        className="relative z-10 my-auto flex items-center justify-center py-4 w-full"
        style={{ perspective: "1200px" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative max-w-5xl w-full aspect-[16/9.5] max-h-[680px] rounded-sm overflow-hidden shadow-3d-bust border border-stone-300/60 bg-[#DCD8CF]"
        >
          {/* Base Artwork Layer (The Classical Michelangelo David Bust) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/david-hero.png"
            alt="Michelangelo David with Cybernetic Frequency Halo"
            className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.01]"
          />

          {/* Dynamic 3D Cursor Spotlight Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-50 z-10"
            style={{
              background: useTransform(
                [lightX, lightY],
                ([lx, ly]) =>
                  `radial-gradient(circle 550px at ${lx}% ${ly}%, rgba(255,255,255,0.7) 0%, transparent 70%)`
              ),
            }}
          />

          {/* Dynamic Animated Synthwave Waveform Canvas Over Mouth */}
          <div
            className="absolute top-[49%] sm:top-[51%] left-[12%] right-[14%] h-20 sm:h-24 pointer-events-none z-20 flex items-center justify-center shadow-neon-wave"
          >
            <canvas
              ref={canvasRef}
              width={1000}
              height={140}
              className="w-full h-full"
            />
          </div>

          {/* HUD Target Lock Callout Pinned to Waveform / Mouth */}
          <div
            className="absolute top-[41%] sm:top-[43%] right-[22%] sm:right-[26%] z-30 pointer-events-auto cursor-pointer"
            onClick={onToggleAudio}
          >
            <div className="flex items-center gap-2 bg-[#111113]/90 text-stone-100 border border-stone-700/80 px-2.5 py-1 rounded-none shadow-lg backdrop-blur-xs hover:border-amber-400 transition-all group">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider">
                • FREQ {currentFreq.toFixed(1)} MHZ
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] text-stone-800 font-semibold tracking-widest uppercase mt-0.5 pl-1">
              <span>SIGNAL LOCKED</span>
              <span className="text-amber-700">··|||···</span>
            </div>
          </div>

          {/* Left Ruler Tick Scale Overlays (01, 02, 03) */}
          <div className="absolute top-8 left-4 sm:left-6 z-20 flex flex-col justify-between h-[80%] font-mono text-[9px] sm:text-[10px] text-stone-500 pointer-events-none">
            <div className="flex items-center gap-1">
              <span className="w-2 h-[1px] bg-stone-500" />
              <span>03</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-[1px] bg-stone-500" />
              <span>02</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-[1px] bg-stone-500" />
              <span>01</span>
            </div>
          </div>

          {/* Bottom-Left Transmission Telemetry HUD */}
          <div className="absolute bottom-4 sm:bottom-6 left-6 sm:left-8 z-20 hidden md:block bg-white/40 border border-stone-400/50 p-2.5 backdrop-blur-xs font-mono text-[10px] leading-relaxed text-stone-900 shadow-sm">
            <div className="font-bold border-b border-stone-400/40 pb-1 mb-1 tracking-wider text-[9px] text-stone-700">
              TRANSMISSION TELEMETRY
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
              <span className="text-stone-600">CYCLE:</span>
              <span className="font-semibold text-right">{report.date}</span>
              <span className="text-stone-600">THREAT:</span>
              <span className="font-semibold text-right text-amber-900">{report.threat_level}</span>
              <span className="text-stone-600">SIGNALS:</span>
              <span className="font-semibold text-right">
                {report.cves.length + report.ai_breakthroughs.length + report.trending_tools.length + report.tech_news.length} ITEMS
              </span>
              <span className="text-stone-600">CARRIER:</span>
              <span className="font-semibold text-right">{currentFreq} MHZ</span>
            </div>
          </div>

          {/* Bottom-Right Wave Intensity Dot Matrix Equalizer */}
          <div className="absolute bottom-4 sm:bottom-6 right-6 sm:right-8 z-20 hidden md:block bg-white/40 border border-stone-400/50 p-2.5 backdrop-blur-xs font-mono text-[10px] leading-relaxed text-stone-900 shadow-sm">
            <div className="flex items-center justify-between border-b border-stone-400/40 pb-1 mb-1">
              <span className="font-bold text-[9px] text-stone-700">SPECTRUM // 01</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((dot) => (
                  <span
                    key={dot}
                    className={`w-1 h-1 rounded-full ${
                      isAudioPlaying ? "bg-amber-600 animate-pulse" : "bg-stone-500"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5">
              <span className="text-stone-600">AMPLITUDE:</span>
              <span className="font-semibold text-right">{isAudioPlaying ? "86%" : "42%"}</span>
              <span className="text-stone-600">PHASE:</span>
              <span className="font-semibold text-right">0.35 RAD</span>
              <span className="text-stone-600">MODE:</span>
              <span className="font-semibold text-right">MONO / SYNTH</span>
            </div>
          </div>

        </motion.div>
      </div>

      {/* Bottom Interactive Controls Row */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-300/80">
        
        {/* Frequency Preset Buttons */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-stone-600 mr-1 hidden sm:inline">
            PRESETS:
          </span>
          {presets.map((preset) => {
            const active = currentFreq === preset.hz;
            return (
              <button
                key={preset.name}
                onClick={() => handlePresetSelect(preset.hz)}
                className={`font-mono text-[10px] uppercase px-3 py-1 border transition-all ${
                  active
                    ? "bg-[#111113] text-stone-100 border-[#111113] font-bold shadow-xs"
                    : "bg-white/60 text-stone-700 border-stone-300 hover:bg-stone-200"
                }`}
              >
                {preset.name} ({preset.hz}M)
              </button>
            );
          })}
        </div>

        {/* Action Button: Explore Radar */}
        <div className="flex items-center gap-3">
          <button
            onClick={onExploreRadar}
            className="flex items-center gap-2 bg-[#111113] text-stone-100 hover:bg-stone-800 px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-widest transition-all shadow-md active:scale-98"
          >
            <span>Enter Intelligence Radar</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
