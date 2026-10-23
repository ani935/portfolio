import React, { useState } from 'react';
import {
  Download,
  FileText,
  Printer,
  BookOpen,
  ArrowRight,
  Search,
  ExternalLink,
  SlidersHorizontal,
  Check,
  PackageCheck
} from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '../data/portfolioData';
import { downloadCaseStudyMarkdown, downloadAllCaseStudiesBundle, printCaseStudy } from '../utils/downloadUtils';

interface CaseStudiesProps {
  onSelectCaseStudy: (caseStudyId: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onSelectCaseStudy }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadedAllState, setDownloadedAllState] = useState<boolean>(false);
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Case Studies' },
    { id: 'Generative AI & RAG', label: 'Gen-AI & RAG' },
    { id: 'Agentic AI & Automation', label: 'Agentic Automation' },
    { id: 'Machine Learning & Computer Vision', label: 'Computer Vision & ML' },
  ];

  const filteredStudies = CASE_STUDIES.filter((cs) => {
    const matchesCategory = selectedCategory === 'all' || cs.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      cs.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.executiveSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cs.technicalHighlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleDownloadAll = () => {
    downloadAllCaseStudiesBundle(CASE_STUDIES);
    setDownloadedAllState(true);
    setTimeout(() => setDownloadedAllState(false), 2500);
  };

  const handleDownloadSingle = (e: React.MouseEvent, cs: CaseStudy) => {
    e.stopPropagation();
    downloadCaseStudyMarkdown(cs);
    setDownloadedItem(cs.id);
    setTimeout(() => setDownloadedItem(null), 2000);
  };

  const handlePrintSingle = (e: React.MouseEvent, cs: CaseStudy) => {
    e.stopPropagation();
    printCaseStudy(cs);
  };

  return (
    <section className="py-20 border-b border-slate-800/80 bg-slate-950/40" id="case-studies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
              <span>Technical Publications</span>
              <span aria-hidden="true">·</span>
              <span>Open Source Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Downloadable Project Case Studies
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
              Exhaustive engineering post-mortems and system design briefs documenting model training,
              vector retrieval latency, token constraints, and real-world deployment trade-offs.
            </p>
          </div>

          {/* Master Batch Download Button */}
          <div className="shrink-0">
            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 rounded-lg transition-all shadow-sm active:translate-y-0.5"
            >
              {downloadedAllState ? (
                <>
                  <PackageCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Compendium Downloaded (.md)</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-blue-400" />
                  <span>Download All Studies Bundle (.md)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800/60">
          {/* Segmented Category Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search case studies..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="space-y-6">
          {filteredStudies.map((study) => (
            <div
              key={study.id}
              onClick={() => onSelectCaseStudy(study.id)}
              className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-6 sm:p-8 hover:border-slate-700 transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-blue-950/10"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                {/* Content Column */}
                <div className="flex-1 space-y-4">
                  {/* Metadata Row: Clean unboxed text with separators */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-mono">
                    <span className="text-blue-400 font-medium">{study.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.date}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.readTime}</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">{study.subtitle}</p>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
                    {study.executiveSummary}
                  </p>

                  {/* Quantitative Benchmarks Strip */}
                  <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {study.benchmarks.map((bench) => (
                      <div
                        key={bench.metric}
                        className="bg-slate-950/60 border border-slate-800/80 rounded-lg p-3 text-left"
                      >
                        <div className="text-lg font-bold text-blue-400 font-mono tabular-nums">
                          {bench.value}
                        </div>
                        <div className="text-xs font-semibold text-slate-200 mt-0.5">{bench.metric}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{bench.context}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Sidebar / Download Triggers */}
                <div className="lg:w-60 flex flex-col justify-between gap-4 pt-4 lg:pt-0 lg:border-l lg:border-slate-800/80 lg:pl-6 shrink-0">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase text-slate-500 tracking-wider">
                      Available Downloads
                    </div>

                    {/* Download Markdown */}
                    <button
                      onClick={(e) => handleDownloadSingle(e, study)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors border border-slate-700/60"
                      title="Download Markdown documentation"
                    >
                      <span className="flex items-center gap-2">
                        {downloadedItem === study.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Download className="w-3.5 h-3.5 text-blue-400" />
                        )}
                        <span>{downloadedItem === study.id ? 'Downloaded' : 'Markdown (.md)'}</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">~6 KB</span>
                    </button>

                    {/* Print / PDF view */}
                    <button
                      onClick={(e) => handlePrintSingle(e, study)}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white rounded-lg transition-colors border border-slate-700/50"
                      title="Export clean PDF via browser print"
                    >
                      <span className="flex items-center gap-2">
                        <Printer className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Print / Save PDF</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">Vector</span>
                    </button>
                  </div>

                  {/* Primary In-App Reader Button */}
                  <button
                    onClick={() => onSelectCaseStudy(study.id)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm shadow-blue-500/20"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Read In-App</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredStudies.length === 0 && (
            <div className="p-12 text-center rounded-xl bg-slate-900/40 border border-slate-800">
              <FileText className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-400">No case studies matching your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-blue-400 hover:underline"
              >
                Reset search filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
