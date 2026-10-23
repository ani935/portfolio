import React from 'react';
import { ArrowRight, FileText, Download, Check, Sparkles, BookOpen, Layers } from 'lucide-react';
import { ThreeCanvas } from './ThreeCanvas';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ThreeHeroSectionProps {
  activeView: 'global' | 'rag' | 'news' | 'agri' | 'casestudies';
  onSelectProject: (projectId: string) => void;
  onSelectCaseStudy: (caseStudyId: string) => void;
  onOpenCvModal: () => void;
  onExploreCaseStudies: () => void;
  is3dOnlyMode: boolean;
}

export const ThreeHeroSection: React.FC<ThreeHeroSectionProps> = ({
  activeView,
  onSelectProject,
  onSelectCaseStudy,
  onOpenCvModal,
  onExploreCaseStudies,
  is3dOnlyMode,
}) => {
  return (
    <section className={`relative w-full ${is3dOnlyMode ? 'h-screen' : 'h-[85vh] min-h-[640px]'} border-b border-slate-800/80 overflow-hidden bg-[#090d16]`}>
      {/* 3D WebGL Canvas Layer */}
      <div className="absolute inset-0 z-0">
        <ThreeCanvas
          activeView={activeView}
          visualStyle="neural"
          onSelectProject={onSelectProject}
          onSelectCaseStudy={onSelectCaseStudy}
        />
      </div>

      {/* Floating Spatial Headline Overlay (Pointer events through to canvas except for buttons) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between pt-10 pb-20 pointer-events-none">
        {/* Top Floating Badge & Identity */}
        <div className="pointer-events-auto max-w-xl bg-slate-950/70 backdrop-blur-md p-5 rounded-2xl border border-slate-800/80 shadow-2xl">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-blue-400 mb-2">
            <span>Agentic AI & ML Engineer</span>
            <span aria-hidden="true">·</span>
            <span>Brainware Univ (9.14 CGPA)</span>
            <span aria-hidden="true">·</span>
            <span>Oracle Gen-AI Certified</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Aniket Das
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Autonomous Agentic Systems, Localized RAG Pipelines & Computer Vision Pathology.
            Explore the interactive 3D spatial neural core or drag to orbit the nodes.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={onExploreCaseStudies}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-md shadow-blue-500/20 pointer-events-auto"
            >
              <span>Download Case Studies</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onOpenCvModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 hover:text-white border border-slate-700 rounded-lg transition-colors pointer-events-auto"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Verified CV (PDF)</span>
            </button>
          </div>
        </div>

        {/* Bottom Orbit Guidance Helper */}
        <div className="flex items-center justify-between text-xs text-slate-400 pointer-events-auto">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-950/80 backdrop-blur border border-slate-800 text-[11px] font-mono">
            <span className="text-blue-400">💡 3D Interaction:</span>
            <span>Click and drag mouse to orbit · Click any glowing orb to inspect architecture</span>
          </div>
        </div>
      </div>
    </section>
  );
};
