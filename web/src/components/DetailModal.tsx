"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, Shield, Sparkles, Terminal, AlertTriangle, CheckCircle, Flame } from "lucide-react";
import { CveItem, AiBreakthrough, TrendingTool } from "../types/intelligence";

export type ModalPayload =
  | { type: "cve"; item: CveItem }
  | { type: "ai"; item: AiBreakthrough }
  | { type: "tool"; item: TrendingTool }
  | null;

interface DetailModalProps {
  payload: ModalPayload;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ payload, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!payload) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative z-10 w-full max-w-2xl bg-[#F4F2EC] border border-stone-400/80 shadow-2xl p-6 sm:p-8 space-y-6 text-stone-900"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-stone-300 pb-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-700">
              {payload.type === "cve" && (
                <>
                  <Shield className="w-4 h-4 text-red-700" />
                  <span>VULNERABILITY DOSSIER // {payload.item.id}</span>
                </>
              )}
              {payload.type === "ai" && (
                <>
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>AI BREAKTHROUGH DOSSIER // {payload.item.category}</span>
                </>
              )}
              {payload.type === "tool" && (
                <>
                  <Terminal className="w-4 h-4 text-stone-900" />
                  <span>TOOL ARSENAL DOSSIER // {payload.item.repo_name}</span>
                </>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1 hover:bg-stone-300 rounded-none transition-colors text-stone-600 hover:text-stone-900"
              title="Close (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Body */}
          {payload.type === "cve" && (
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5 font-mono text-xs">
                  <span className="font-bold px-2 py-0.5 bg-red-800 text-white">
                    {payload.item.severity}
                  </span>
                  <span className="bg-stone-200 text-stone-800 px-2 py-0.5">
                    {payload.item.vendor} // {payload.item.product}
                  </span>
                  {payload.item.epss_score !== null && payload.item.epss_score !== undefined && (
                    <span className="bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 font-bold">
                      EPSS: {(payload.item.epss_score * 100).toFixed(2)}%
                    </span>
                  )}
                  {payload.item.is_new_today && (
                    <span className="flex items-center gap-1 text-emerald-700 font-bold">
                      <Flame className="w-3.5 h-3.5" />
                      NEW TODAY
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-stone-900 leading-snug">
                  {payload.item.title}
                </h3>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  TECHNICAL DESCRIPTION:
                </span>
                <p className="font-sans text-sm text-stone-800 leading-relaxed bg-white/70 p-4 border border-stone-200">
                  {payload.item.description}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  OFFICIAL REMEDIATION:
                </span>
                <div className="bg-stone-900 text-stone-100 p-4 font-mono text-xs leading-relaxed">
                  <div className="text-amber-400 mb-1 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    ACTION REQUIRED
                  </div>
                  {payload.item.remediation}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={payload.item.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#111113] text-stone-100 hover:bg-stone-800 px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors"
                >
                  <span>Open Official Advisory</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {payload.type === "ai" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                  <span className="font-bold px-2 py-0.5 bg-stone-900 text-white">
                    {payload.item.category}
                  </span>
                  <span className="bg-stone-200 text-stone-800 px-2 py-0.5">
                    ▲ {payload.item.upvotes_or_likes} UPVOTES
                  </span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-stone-900 leading-snug">
                  {payload.item.title}
                </h3>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  RESEARCH SUMMARY:
                </span>
                <p className="font-sans text-sm text-stone-800 leading-relaxed bg-white/70 p-4 border border-stone-200">
                  {payload.item.summary}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  WHY IT MATTERS:
                </span>
                <p className="font-sans text-sm text-stone-900 bg-amber-50/70 p-4 border border-amber-200 leading-relaxed font-medium">
                  {payload.item.why_it_matters}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={payload.item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#111113] text-stone-100 hover:bg-stone-800 px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors"
                >
                  <span>Inspect Paper on Hugging Face / ArXiv</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {payload.type === "tool" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
                  <span className="font-bold px-2 py-0.5 bg-stone-900 text-white">
                    {payload.item.language || "POLYGLOT"}
                  </span>
                  <span className="bg-stone-200 text-stone-800 px-2 py-0.5 font-bold">
                    ★ {payload.item.stars.toLocaleString()} STARS
                  </span>
                </div>
                <h3 className="font-mono text-2xl font-bold text-stone-900 leading-snug">
                  {payload.item.repo_name}
                </h3>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  DESCRIPTION:
                </span>
                <p className="font-sans text-sm text-stone-800 leading-relaxed bg-white/70 p-4 border border-stone-200">
                  {payload.item.description}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-xs font-bold text-stone-600 uppercase tracking-wider block">
                  PRIMARY DEVELOPER USE CASE:
                </span>
                <p className="font-sans text-sm text-stone-900 bg-stone-100 p-4 border border-stone-300 leading-relaxed">
                  {payload.item.use_case}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={payload.item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#111113] text-stone-100 hover:bg-stone-800 px-5 py-2.5 font-mono text-xs uppercase font-bold tracking-wider transition-colors"
                >
                  <span>Open GitHub Repository</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
