import React, { useState } from 'react';
import { Award, GraduationCap, Code2, Server, CheckCircle2, ChevronRight, BookOpen, ExternalLink } from 'lucide-react';
import { SKILL_CATEGORIES, CERTIFICATIONS, EDUCATION_HISTORY } from '../data/portfolioData';

export const SkillsAndCredentials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'skills' | 'certifications' | 'education'>('skills');

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-950/30" id="credentials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              Capabilities & Verified Record
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Skills, Certifications & Academic Background
            </h2>
          </div>

          {/* Segmented Controls for Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'skills'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Technical Skills
            </button>
            <button
              onClick={() => setActiveTab('certifications')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'certifications'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Certifications ({CERTIFICATIONS.length})
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'education'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Education
            </button>
          </div>
        </div>

        {/* Tab 1: Technical Skills Matrix */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {SKILL_CATEGORIES.map((category) => (
              <div
                key={category.name}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-xs text-slate-400 mb-5">{category.description}</p>

                  {/* Clean unboxed skill items with bullet indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {category.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 text-xs text-slate-300 py-1 px-2.5 rounded bg-slate-950/60 border border-slate-800/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                        <span className="truncate">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Certifications */}
        {activeTab === 'certifications' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-200">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.id}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
                      <Award className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">{cert.validity}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{cert.title}</h3>
                  <div className="text-xs font-semibold text-blue-400 mb-4">{cert.issuer}</div>

                  <ul className="space-y-2 mb-5">
                    {cert.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="text-blue-400 mt-0.5">▪</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills tags */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                  <span className="text-slate-500 text-[11px] font-mono mr-1">Focus:</span>
                  {cert.skillsCovered.map((s, i) => (
                    <span key={s} className="text-slate-300">
                      {s}
                      {i < cert.skillsCovered.length - 1 && <span className="text-slate-700 ml-1.5">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Education History */}
        {activeTab === 'education' && (
          <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
            {EDUCATION_HISTORY.map((edu, idx) => (
              <div
                key={edu.institution}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 sm:p-7 relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-400 mb-1">
                      <GraduationCap className="w-4 h-4" />
                      <span>{edu.period}</span>
                      <span aria-hidden="true">·</span>
                      <span>{edu.location}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white">{edu.degree}</h3>
                    <div className="text-sm text-slate-300 font-medium mt-0.5">{edu.institution}</div>
                  </div>

                  <div className="px-3.5 py-1.5 rounded-lg bg-blue-600/15 border border-blue-500/30 text-blue-300 font-mono font-bold text-sm shrink-0 w-fit">
                    {edu.score}
                  </div>
                </div>

                <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                  {edu.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-blue-400 mt-0.5">▪</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
