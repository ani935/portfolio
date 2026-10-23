import React, { useState } from 'react';
import {
  FileText,
  Mail,
  ArrowRight,
  Check,
  Copy,
  Layers,
  Terminal,
  Cpu,
  BookOpen,
  Send,
  Database,
  Radio
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenCvModal: () => void;
  onExploreCaseStudies: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCvModal, onExploreCaseStudies }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activePipeline, setActivePipeline] = useState<'rag' | 'news' | 'agri'>('rag');

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const pipelines = {
    rag: {
      name: 'Local RAG Pipeline',
      tagline: 'Air-Gapped Document Question-Answering',
      nodes: [
        { label: 'PyPDF Ingestion', type: 'Source', detail: 'Recursive 800ch chunking + 150ch overlap' },
        { label: 'ChromaDB Embeddings', type: 'Vector', detail: 'Local cosine vector index in memory' },
        { label: 'Ollama Llama 3.2:1b', type: 'Synthesis', detail: 'Grounded generation with page attribution' }
      ],
      terminalLog: `> python3 rag_engine.py --doc research_paper.pdf
[INFO] Parsed 24 pages in 0.18s
[INFO] Generated 142 semantic vectors into ChromaDB
[QUERY] "What are the benchmark latency metrics?"
[TOP_K] 4 chunks retrieved (similarity: 0.892, 0.841)
[LLAMA3.2] Synthesizing context-grounded response...
>> Grounded Answer: "The system sustained <280ms inference across test sets (Page 14)."
[STATUS] Zero cloud tokens consumed. 100% private.`
    },
    news: {
      name: 'Agentic News Dispatcher',
      tagline: 'Multi-Source Deduplication & Morning Briefing',
      nodes: [
        { label: '15+ RSS Sources', type: 'Ingestion', detail: 'BeautifulSoup sanitization & entity extraction' },
        { label: 'Semantic Deduplication', type: 'Algorithm', detail: 'TF-IDF clustering eliminates 92.8% syndication' },
        { label: 'Gmail SMTP Daemon', type: 'Delivery', detail: 'Automated 7:00 AM executive bullet dispatch' }
      ],
      terminalLog: `> python3 news_agent_cron.py --schedule daily
[SCRAPER] Ingested 184 candidate articles from 14 tech feeds
[DEDUP] Collapsed 76 syndication duplicates into 12 clusters
[RANKING] Scored Top 10 stories by authority & velocity
[OLLAMA] Summarizing 10 stories into JSON schema...
[SMTP] Connecting to smtp.gmail.com:465 with SSL
>> Dispatched Top 10 Intelligence Digest to subscribers.
[STATUS] Cron execution complete in 84.2s.`
    },
    agri: {
      name: 'AgriTech Diagnostic Suite',
      tagline: 'Computer Vision Pathology & N-P-K Balancer',
      nodes: [
        { label: 'Cultivator Leaf Upload', type: 'Input', detail: 'Optimized for low-bandwidth rural 3G mobile' },
        { label: 'CNN Classifier', type: 'Vision', detail: '224x224 normalized image feature extraction' },
        { label: 'NPK Soil Matrix', type: 'Advisory', detail: 'Actionable treatment and fertilizer dosage' }
      ],
      terminalLog: `> python3 agri_inference.py --image field_sample_09.jpg
[PREPROCESS] Normalized tensor to shape (1, 224, 224, 3)
[CNN] Forward pass complete in 240ms
[DIAGNOSIS] Early Blight detected (Confidence: 94.2%)
[SOIL INPUT] N: 42, P: 18, K: 25, pH: 6.4
[RECOMMENDATION] Apply copper oxychloride spray (0.2%)
>> Advisory rendered in lightweight HTML (<140KB total payload).`
    }
  };

  const currentPipe = pipelines[activePipeline];

  return (
    <section className="relative pt-12 pb-20 border-b border-slate-800/80 overflow-hidden" id="about">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {/* Editorial Kicker (Unboxed metadata with separators) */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-blue-400 tracking-wide uppercase">
              <span>Agentic AI & ML Engineer</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>B.Tech CSE (Brainware Univ)</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Kolkata, India</span>
            </div>

            {/* Display Headline with text-wrap: balance */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance">
              Building Autonomous Agentic AI & Local Generative Systems
            </h1>

            {/* Lead Narrative */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              I am a specialized Artificial Intelligence and Machine Learning engineer with hands-on experience deploying
              privacy-preserving RAG architectures, autonomous agentic news pipelines, and agricultural computer vision models.
              Oracle Cloud 2025 Certified Generative AI Professional with an academic record of 9.14 CGPA.
            </p>

            {/* Primary Action Row */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreCaseStudies}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-all shadow-md shadow-blue-600/20 active:translate-y-0.5"
              >
                <span>Read Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenCvModal}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 hover:text-white border border-slate-700 rounded-lg transition-all active:translate-y-0.5"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Verified CV (PDF)</span>
              </button>

              <button
                onClick={copyEmailToClipboard}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 rounded-lg transition-colors"
                title="Copy email to clipboard"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Email Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400" />
                    <span className="font-mono text-xs text-slate-300">{PERSONAL_INFO.email}</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Verification Channels */}
            <div className="pt-4 border-t border-slate-800/70 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Phone:</span>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="font-mono text-slate-300 hover:text-blue-400 transition-colors">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Academic Standing:</span>
                <span className="font-semibold text-slate-200">CGPA 9.14 / 10.0</span>
              </div>
              <span aria-hidden="true" className="text-slate-700">|</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-500">Status:</span>
                <span className="text-blue-400 font-medium">Open to AI & ML Engineering Roles</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Architecture Sandbox & Live Pipeline Inspection */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="h-full bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 pl-2">aniketdas@agentic-core:~$</span>
                </div>

                <span className="text-[11px] font-mono text-slate-500">Interactive Pipeline Lab</span>
              </div>

              {/* Segmented Pipeline Selector Tabs */}
              <div className="p-2 bg-slate-900/90 border-b border-slate-800/80 flex items-center gap-1.5">
                <button
                  onClick={() => setActivePipeline('rag')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap text-center ${
                    activePipeline === 'rag'
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Document RAG
                </button>
                <button
                  onClick={() => setActivePipeline('news')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap text-center ${
                    activePipeline === 'news'
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  AI News Agent
                </button>
                <button
                  onClick={() => setActivePipeline('agri')}
                  className={`flex-1 py-1.5 px-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap text-center ${
                    activePipeline === 'agri'
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  Agritech Vision
                </button>
              </div>

              {/* Pipeline Flow Visualization */}
              <div className="p-4 bg-slate-950/40 border-b border-slate-800/60 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{currentPipe.name}</span>
                  <span className="text-slate-400 text-[11px]">{currentPipe.tagline}</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {currentPipe.nodes.map((node, index) => (
                    <div
                      key={node.label}
                      className="p-2.5 rounded-lg bg-slate-900/90 border border-slate-800 text-left transition-all"
                    >
                      <div className="text-[10px] font-mono uppercase text-blue-400 mb-1">
                        Step 0{index + 1} · {node.type}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 truncate">{node.label}</div>
                      <div className="text-[11px] text-slate-400 line-clamp-2 mt-1">{node.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal Execution Log Window */}
              <div className="p-4 flex-1 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300 overflow-x-auto whitespace-pre selection:bg-blue-600 selection:text-white">
                <code className="text-slate-300">{currentPipe.terminalLog}</code>
              </div>

              {/* Interactive Footer */}
              <div className="px-4 py-2.5 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-blue-400" />
                  <span>Execution Target: Local Ollama / PyTorch</span>
                </div>
                <span className="text-[11px] text-emerald-400 font-mono">Status: Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width Metric Strip Row Below Split (Rigorous quantitative CV data) */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono tabular-nums">
              9.14 <span className="text-base text-slate-400 font-sans font-normal">/ 10.0</span>
            </div>
            <div className="text-sm font-semibold text-white mt-1">B.Tech Academic CGPA</div>
            <div className="text-xs text-slate-400 mt-0.5">Brainware University (AI & ML)</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              3 <span className="text-base text-blue-400 font-sans font-normal">Core Pipelines</span>
            </div>
            <div className="text-sm font-semibold text-white mt-1">Production Deployed Projects</div>
            <div className="text-xs text-slate-400 mt-0.5">Gen-AI, RAG, & Agri-Vision</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono tabular-nums">
              4 <span className="text-base text-slate-400 font-sans font-normal">Credentials</span>
            </div>
            <div className="text-sm font-semibold text-white mt-1">Verified Certifications</div>
            <div className="text-xs text-slate-400 mt-0.5">Oracle Gen-AI, Deloitte, MERN, Evarcity</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/60">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
              87% <span className="text-base text-blue-400 font-sans font-normal">Distinction</span>
            </div>
            <div className="text-sm font-semibold text-white mt-1">Secondary & Higher Secondary</div>
            <div className="text-xs text-slate-400 mt-0.5">Ramakrishna Mission & Narendranath</div>
          </div>
        </div>
      </div>
    </section>
  );
};
