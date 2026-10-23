import React, { useEffect, useState } from 'react';
import { X, Download, Printer, ExternalLink, Check, Copy, FileText, Phone, Mail, Award, GraduationCap } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#090d16] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Top Action Header */}
        <div className="px-6 py-4 bg-[#090d16] border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600/10 text-blue-400 rounded-lg border border-blue-500/20">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>Verified Curriculum Vitae</span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                  Official Attachment
                </span>
              </h2>
              <div className="text-xs text-slate-400 font-mono">
                Aniket_Das_AGENTIC_AI_GEN_AI.pdf
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.cvAssetPath}
              download="Aniket_Das_AI_ML_CV.pdf"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm shadow-blue-500/20"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download Original PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close CV preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-950">
          {/* Left/Main Column: Embedded PDF Viewer */}
          <div className="lg:col-span-8 h-[60vh] lg:h-[72vh] bg-slate-900 border-r border-slate-800 flex flex-col">
            <object
              data={PERSONAL_INFO.cvAssetPath}
              type="application/pdf"
              className="w-full h-full flex-1"
            >
              {/* Fallback if browser PDF plugin is blocked or mobile */}
              <div className="p-8 text-center flex flex-col items-center justify-center h-full space-y-4">
                <FileText className="w-12 h-12 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Verified CV Document Ready</h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Your browser does not support inline PDF viewing, or is blocking embedded frames.
                  You can download or view the verified PDF directly:
                </p>
                <a
                  href={PERSONAL_INFO.cvAssetPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open PDF in New Tab</span>
                </a>
              </div>
            </object>
          </div>

          {/* Right Column: Fast Verification & Quick Copy Drawer */}
          <div className="lg:col-span-4 p-6 overflow-y-auto space-y-6 bg-slate-900/40">
            <div>
              <div className="text-[11px] font-mono uppercase text-blue-400 font-semibold tracking-wider mb-2">
                Candidate Summary
              </div>
              <h3 className="text-lg font-bold text-white">{PERSONAL_INFO.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{PERSONAL_INFO.subRole}</p>
            </div>

            {/* Direct Contact Action Box */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="text-xs font-semibold text-slate-300">Direct Verification Channels</div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono truncate">{PERSONAL_INFO.email}</span>
                </span>
                <button
                  onClick={copyEmail}
                  className="text-xs text-blue-400 hover:text-blue-300 px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
                >
                  {copiedEmail ? 'Copied' : 'Copy'}
                </button>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono">{PERSONAL_INFO.phone}</span>
                </span>
                <button
                  onClick={copyPhone}
                  className="text-xs text-blue-400 hover:text-blue-300 px-2 py-0.5 rounded bg-slate-800 border border-slate-700"
                >
                  {copiedPhone ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Academic & Professional Highlights */}
            <div className="space-y-3">
              <div className="text-xs font-semibold text-slate-300">Verified Academic Record</div>
              <div className="text-xs text-slate-400 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span>Brainware Univ (B.Tech AI & ML)</span>
                  <span className="font-mono text-blue-400 font-bold">9.14 CGPA</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Higher Secondary (12th Board)</span>
                  <span className="font-mono text-slate-300">87.0%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Madhyamik (10th Board)</span>
                  <span className="font-mono text-slate-300">87.0%</span>
                </div>
              </div>
            </div>

            {/* Certifications Snapshot */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Certifications Snapshot</div>
              <ul className="text-xs text-slate-400 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400">▪</span>
                  <span>Oracle Cloud Generative AI Professional 2025</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400">▪</span>
                  <span>Deloitte Data Analytics Job Simulation</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400">▪</span>
                  <span>MERN Stack (Ardent Computech)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="text-blue-400">▪</span>
                  <span>Agentic AI & Gen AI (Evarcity)</span>
                </li>
              </ul>
            </div>

            <a
              href={PERSONAL_INFO.cvAssetPath}
              download="Aniket_Das_AI_ML_CV.pdf"
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF File Directly</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
