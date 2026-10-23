import React from 'react';
import { ArrowUpRight, BookOpen, Layers, CheckCircle2, Sparkles, Sprout, FileSearch, Newspaper } from 'lucide-react';
import { PROJECTS, Project } from '../data/portfolioData';

interface ProjectsProps {
  onSelectCaseStudy: (caseStudyId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectCaseStudy }) => {
  const getProjectIcon = (id: string) => {
    switch (id) {
      case 'agricultural-development':
        return <Sprout className="w-5 h-5 text-emerald-400" />;
      case 'pdf-analysis-rag':
        return <FileSearch className="w-5 h-5 text-blue-400" />;
      case 'ai-news-agent':
        return <Newspaper className="w-5 h-5 text-indigo-400" />;
      default:
        return <Layers className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <section className="py-20 border-b border-slate-800/80" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Engineering Portfolio
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Selected AI & Machine Learning Systems
            </h2>
          </div>
          <p className="text-sm text-slate-400 max-w-md">
            Production systems designed with computational efficiency, localized inferencing, and real-world deployment viability.
          </p>
        </div>

        {/* 3 Project Showcase Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project: Project, index: number) => (
            <div
              key={project.id}
              className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700/80 transition-all hover:shadow-xl hover:shadow-blue-950/20 group"
            >
              {/* Header: Editorial numbering + Category */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-slate-800/70 rounded-lg group-hover:scale-105 transition-transform">
                      {getProjectIcon(project.id)}
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      0{index + 1}. {project.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">{project.period}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>

                {/* Short narrative summary */}
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {project.shortDescription}
                </p>

                {/* CV Bullet Points with subtle checkmark */}
                <div className="space-y-2.5 mb-6">
                  {project.bulletPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                      <span className="text-blue-400 mt-0.5 shrink-0">▪</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Tech stack & Case Study Link */}
              <div className="pt-5 border-t border-slate-800/80 space-y-4">
                {/* Clean unboxed tech list with dividers */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-400">
                  <span className="text-slate-500 font-medium">Stack:</span>
                  {project.technologies.map((tech, i) => (
                    <React.Fragment key={tech}>
                      <span className="text-slate-300">{tech}</span>
                      {i < project.technologies.length - 1 && (
                        <span aria-hidden="true" className="text-slate-700">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Action button */}
                <button
                  onClick={() => onSelectCaseStudy(project.caseStudyId)}
                  className="w-full flex items-center justify-between px-4 py-2.5 bg-slate-800/80 hover:bg-blue-600/90 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition-all group/btn"
                >
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-blue-400 group-hover/btn:text-white" />
                    <span>View In-Depth Case Study</span>
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
