"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { DailyReport } from "../types/intelligence";
import { getAudioFrequencyData } from "../utils/audioSynth";

interface HeroDavid3DProps {
  report: DailyReport;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export const HeroDavid3D: React.FC<HeroDavid3DProps> = ({
  report,
  isAudioPlaying,
  onToggleAudio,
}) => {
  const [currentFreq] = useState(142.8);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth mouse 3D perspective tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 100 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateY = useTransform(smoothMouseX, [-600, 600], [-5, 5]);
  const rotateX = useTransform(smoothMouseY, [-400, 400], [4, -4]);
  const lightX = useTransform(smoothMouseX, [-600, 600], [35, 65]);
  const lightY = useTransform(smoothMouseY, [-400, 400], [25, 55]);

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
      const numBars = 110;
      const barWidth = width / numBars;

      const audioData = isAudioPlaying ? getAudioFrequencyData() : null;

      // Central glowing laser filament
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let x = 0; x < width; x += 5) {
        const normX = x / width;
        const envelope = Math.sin(normX * Math.PI);
        const wave = Math.sin(normX * 16 + phase * 3) * Math.cos(normX * 8 - phase * 1.5);
        const yOffset = wave * 5 * envelope;
        ctx.lineTo(x, centerY + yOffset);
      }
      ctx.strokeStyle = "rgba(255, 255, 255, 0.95)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Vertical frequency bars
      for (let i = 0; i < numBars; i++) {
        const normI = i / numBars;
        const envelope = Math.pow(Math.sin(normI * Math.PI), 2.0);
        
        let amplitude = 0;
        if (audioData && audioData.length > 0) {
          const binIndex = Math.floor((i / numBars) * (audioData.length / 2));
          amplitude = (audioData[binIndex] / 255) * 36;
        } else {
          const s1 = Math.sin(i * 0.2 + phase * 2.5);
          const s2 = Math.cos(i * 0.12 - phase * 1.8);
          const jitter = (Math.sin(i * 5 + phase * 6) + 1) * 0.5;
          amplitude = Math.abs(s1 * 0.65 + s2 * 0.35) * (14 + jitter * 10);
        }

        const barHeight = Math.max(2, amplitude * envelope * 1.5);
        const xPos = i * barWidth;

        const grad = ctx.createLinearGradient(xPos, centerY - barHeight, xPos, centerY + barHeight);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.35, "rgba(245, 250, 255, 0.75)");
        grad.addColorStop(0.5, "rgba(255, 255, 255, 1.0)");
        grad.addColorStop(0.65, "rgba(245, 250, 255, 0.75)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(xPos + 1, centerY - barHeight / 2, Math.max(1.5, barWidth - 1.5), barHeight);
      }

      phase += 0.035;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isAudioPlaying, currentFreq]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] w-full flex flex-col justify-between overflow-hidden pt-20 pb-8 px-4 sm:px-8 md:px-16 select-none bg-[#ECEAE4]"
    >
      {/* Subtle fine film grain */}
      <div className="absolute inset-0 pointer-events-none bg-grain opacity-40 z-0" aria-hidden="true" />

      {/* Top Subtle Subheader (Matches Reference Artwork) */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex items-center justify-between text-[11px] font-mono tracking-widest text-[#57534E] uppercase border-b border-stone-300/80 pb-3">
        <div>
          <span>INTELLIGENCE DISPATCH</span>
          <span className="mx-2 text-stone-400">/</span>
          <span className="text-stone-800 font-semibold tabular-nums">{report.date}</span>
        </div>

        <div className="hidden sm:flex items-center gap-4 tabular-nums">
          <span>THREAT: <strong className="text-stone-900">{report.threat_level}</strong></span>
          <span className="text-stone-400">·</span>
          <span>CARRIER: {currentFreq.toFixed(1)} MHZ</span>
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
          className="relative max-w-4xl w-full aspect-[16/9.5] max-h-[640px] overflow-hidden shadow-3d-bust bg-[#DCD8CF] border border-stone-300/60"
        >
          {/* Base Classical Sculpture Artwork */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/david-hero.png"
            alt="Classical marble bust of Michelangelo's David with a luminous audio waveform across the mouth"
            className="w-full h-full object-cover object-center filter contrast-[1.03]"
          />

          {/* Dynamic 3D Cursor Spotlight Overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-40 z-10"
            aria-hidden="true"
            style={{
              background: useTransform(
                [lightX, lightY],
                ([lx, ly]) =>
                  `radial-gradient(circle 500px at ${lx}% ${ly}%, rgba(255,255,255,0.7) 0%, transparent 70%)`
              ),
            }}
          />

          {/* Dynamic Animated Synthwave Waveform Canvas Over Mouth */}
          <div
            aria-hidden="true"
            className="absolute top-[49%] sm:top-[51%] left-[10%] right-[14%] h-20 sm:h-24 pointer-events-none z-20 flex items-center justify-center shadow-neon-wave"
          >
            <canvas
              ref={canvasRef}
              width={1000}
              height={140}
              className="w-full h-full"
            />
          </div>

          {/* Minimal Target Lock Callout Tag */}
          <div
            role="button"
            tabIndex={0}
            onClick={onToggleAudio}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggleAudio();
              }
            }}
            aria-label={isAudioPlaying ? "Mute frequency synthesizer" : "Listen to frequency synthesizer"}
            className="absolute top-[41%] sm:top-[43%] right-[18%] sm:right-[24%] z-30 pointer-events-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-100 rounded-none group"
            title={isAudioPlaying ? "Mute Frequency (142.8 MHz)" : "Listen to Frequency (142.8 MHz)"}
          >
            <div className="bg-[#111113] text-stone-200 px-3 py-1.5 font-mono text-[10px] sm:text-xs font-semibold tracking-wider flex items-center gap-2 group-hover:text-white transition-colors">
              <span className={`w-1.5 h-1.5 rounded-full ${isAudioPlaying ? "bg-emerald-400 animate-ping" : "bg-stone-500"}`} />
              <span className="tabular-nums">• FREQ {currentFreq.toFixed(1)} MHZ</span>
            </div>
            <div className="font-mono text-[9px] text-stone-700 tracking-widest uppercase mt-1 pl-0.5 font-semibold">
              SIGNAL LOCKED
            </div>
          </div>

          {/* Minimal Ruler Scale (01, 02, 03) */}
          <div
            aria-hidden="true"
            className="absolute top-8 left-6 z-20 flex flex-col justify-between h-[75%] font-mono text-[9px] text-[#57534E] pointer-events-none tabular-nums"
          >
            <span>03</span>
            <span>02</span>
            <span>01</span>
          </div>

          {/* Clean Telemetry Tag (Bottom Left) */}
          <div className="absolute bottom-5 left-6 z-20 hidden md:block font-mono text-[10px] text-stone-700 pointer-events-none leading-tight tabular-nums">
            <div className="font-semibold text-stone-800">TRANSMISSION DATA</div>
            <div className="text-[#57534E] mt-1">STATUS: SYNCED · {report.cves.length + report.ai_breakthroughs.length + report.trending_tools.length + report.tech_news.length} SIGNALS</div>
          </div>

        </motion.div>
      </div>

      {/* Bottom Minimal Quotation Epigraph */}
      <div className="relative z-20 max-w-5xl mx-auto w-full flex items-center justify-between text-[11px] text-[#57534E] border-t border-stone-300/80 pt-3 font-mono">
        <span className="italic font-serif text-xs text-stone-700">
          &ldquo;The purpose of computing is insight, not numbers.&rdquo;
        </span>
        <span className="hidden sm:inline uppercase tracking-wider text-[10px] text-stone-600 font-semibold">
          RICHARD HAMMING
        </span>
      </div>

    </section>
  );
};
