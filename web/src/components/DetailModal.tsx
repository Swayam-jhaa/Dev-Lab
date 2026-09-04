"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";
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
          initial={{ opacity: 0, scale: 0.97, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 32 }}
          className="relative z-10 w-full max-w-2xl bg-[#ECEAE4] border border-stone-400 shadow-2xl p-6 sm:p-8 space-y-6 text-stone-900"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-stone-300 pb-3">
            <div className="font-mono text-xs uppercase tracking-widest text-stone-500">
              {payload.type === "cve" && `VULNERABILITY DOSSIER · ${payload.item.id}`}
              {payload.type === "ai" && `AI RESEARCH DOSSIER · ${payload.item.category}`}
              {payload.type === "tool" && `TOOL ARSENAL DOSSIER · ${payload.item.repo_name}`}
            </div>

            <button
              onClick={onClose}
              className="p-1 hover:bg-stone-300 transition-colors text-stone-600 hover:text-stone-900"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content Body */}
          {payload.type === "cve" && (
            <div className="space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs text-stone-600">
                  <span className="font-bold text-red-800 uppercase">
                    {payload.item.severity}
                  </span>
                  <span>·</span>
                  <span>{payload.item.vendor} / {payload.item.product}</span>
                  {payload.item.epss_score !== null && payload.item.epss_score !== undefined && (
                    <>
                      <span>·</span>
                      <span className="font-semibold text-stone-900">
                        EPSS: {(payload.item.epss_score * 100).toFixed(2)}%
                      </span>
                    </>
                  )}
                </div>
                <h3 className="font-serif text-2xl font-semibold text-stone-900 leading-snug">
                  {payload.item.title}
                </h3>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-stone-500 block">
                  ANALYSIS:
                </span>
                <p className="font-sans text-sm text-stone-800 leading-relaxed bg-white/60 p-4 border border-stone-300">
                  {payload.item.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-stone-500 block">
                  ACTION REQUIRED:
                </span>
                <div className="bg-stone-900 text-stone-200 p-4 font-mono text-xs leading-relaxed">
                  {payload.item.remediation}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={payload.item.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 px-4 py-2 font-mono text-xs uppercase font-semibold transition-colors"
                >
                  <span>Official Advisory</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {payload.type === "ai" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-stone-600">
                  <span className="font-semibold uppercase">{payload.item.category}</span>
                  <span>·</span>
                  <span>▲ {payload.item.upvotes_or_likes} UPVOTES</span>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-stone-900 leading-snug">
                  {payload.item.title}
                </h3>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-stone-500 block">
                  ABSTRACT:
                </span>
                <p className="font-sans text-sm text-stone-800 leading-relaxed bg-white/60 p-4 border border-stone-300">
                  {payload.item.summary}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-stone-500 block">
                  WHY IT MATTERS:
                </span>
                <p className="font-sans text-sm text-stone-900 bg-amber-50/60 p-4 border border-amber-200 leading-relaxed italic">
                  {payload.item.why_it_matters}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={payload.item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 px-4 py-2 font-mono text-xs uppercase font-semibold transition-colors"
                >
                  <span>Read Paper</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {payload.type === "tool" && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2 font-mono text-xs text-stone-600">
                  <span className="font-semibold uppercase">{payload.item.language || "CODE"}</span>
                  <span>·</span>
                  <span>★ {payload.item.stars.toLocaleString()} STARS</span>
                </div>
                <h3 className="font-mono text-xl font-bold text-stone-900 leading-snug">
                  {payload.item.repo_name}
                </h3>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-stone-500 block">
                  PROJECT SUMMARY:
                </span>
                <p className="font-sans text-sm text-stone-800 leading-relaxed bg-white/60 p-4 border border-stone-300">
                  {payload.item.description}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="font-mono text-[10px] uppercase text-stone-500 block">
                  USE CASE:
                </span>
                <p className="font-mono text-xs text-stone-900 bg-stone-200/60 p-4 border border-stone-300 leading-relaxed">
                  {payload.item.use_case}
                </p>
              </div>

              <div className="pt-2 flex justify-end">
                <a
                  href={payload.item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-stone-900 text-stone-100 hover:bg-stone-800 px-4 py-2 font-mono text-xs uppercase font-semibold transition-colors"
                >
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
