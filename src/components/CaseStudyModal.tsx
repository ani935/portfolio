import React, { useEffect, useState } from 'react';
import { X, Download, Printer, Copy, Check, FileText, ArrowLeft, Cpu, ExternalLink } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData';
import { downloadCaseStudyMarkdown, printCaseStudy } from '../utils/downloadUtils';

interface CaseStudyModalProps {
  caseStudyId: string | null;
  onClose: () => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudyId, onClose }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const study = CASE_STUDIES.find((cs) => cs.id === caseStudyId);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!study) return null;

  const copyCodeToClipboard = () => {
    if (study.codeSnippet) {
      navigator.clipboard.writeText(study.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const copyMarkdownToClipboard = () => {
    navigator.clipboard.writeText(study.markdownContent);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto">
        {/* Top Control Bar */}
        <div className="sticky top-0 z-20 px-6 py-4 bg-[#090d16]/95 backdrop-blur border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 truncate">
            <span className="text-blue-400 font-semibold">{study.category}</span>
            <span aria-hidden="true">/</span>
            <span className="truncate">{study.downloadFilename}</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => downloadCaseStudyMarkdown(study)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Download Markdown file"
            >
              <Download className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Download .MD</span>
            </button>

            <button
              onClick={() => printCaseStudy(study)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              title="Print or export to PDF"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 space-y-8 overflow-y-auto max-h-[85vh]">
          {/* Header section */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
              <span>Published {study.date}</span>
              <span aria-hidden="true">·</span>
              <span>{study.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>By Aniket Das</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              {study.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal leading-relaxed">
              {study.subtitle}
            </p>
          </div>

          {/* Executive Summary Callout */}
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm leading-relaxed space-y-2">
            <div className="text-xs font-mono uppercase text-blue-400 font-semibold tracking-wider">
              Executive Abstract
            </div>
            <p>{study.executiveSummary}</p>
          </div>

          {/* Quantitative Benchmarks Grid */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-3">
              Key Empirical Benchmarks
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {study.benchmarks.map((bench) => (
                <div key={bench.metric} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
                  <div className="text-2xl font-extrabold text-blue-400 font-mono tabular-nums">
                    {bench.value}
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">{bench.metric}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{bench.context}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Problem Statement */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              01. The Problem & Operational Constraint
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {study.challenge}
            </p>
          </div>

          {/* Engineering Solution & Architecture Flow */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              02. Technical Architecture & Ingestion Flow
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {study.solution}
            </p>

            <div className="space-y-3 pt-2">
              {study.architecture.steps.map((step, idx) => (
                <div
                  key={step.name}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-bold text-white">{step.name}</span>
                      <span className="text-xs font-mono text-blue-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {step.tech}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Technical Highlights */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              03. Critical Architectural Decisions
            </h2>
            <ul className="space-y-2.5">
              {study.technicalHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-blue-400 font-bold mt-0.5">▪</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Excerpt */}
          {study.codeSnippet && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  04. Core Implementation Excerpt
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">{study.codeSnippet.filename}</span>
                  <button
                    onClick={copyCodeToClipboard}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs text-slate-300 hover:text-white bg-slate-800 rounded border border-slate-700"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 overflow-x-auto">
                <pre>
                  <code>{study.codeSnippet.code}</code>
                </pre>
              </div>
            </div>
          )}

          {/* Learnings & Takeaways */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-2">
              05. Key Engineering Learnings
            </h2>
            <ul className="space-y-2">
              {study.learnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Action Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Authored by <span className="text-white font-medium">Aniket Das</span> · Brainware University
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyMarkdownToClipboard}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 rounded-lg transition-colors"
              >
                {copiedMarkdown ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMarkdown ? 'Markdown Copied!' : 'Copy Full Markdown'}</span>
              </button>

              <button
                onClick={() => downloadCaseStudyMarkdown(study)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .MD File</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
