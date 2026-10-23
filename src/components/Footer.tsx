import React from 'react';
import { FileText, ArrowUp, Mail, Phone } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenCvModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCvModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800 bg-[#070b12] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div>
            <div className="text-base font-bold text-white">{PERSONAL_INFO.name}</div>
            <div className="text-xs text-slate-400 mt-0.5">
              Agentic AI & Machine Learning Engineer · Brainware University (9.14 CGPA)
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
              <span>{PERSONAL_INFO.email}</span>
              <span aria-hidden="true">·</span>
              <span>{PERSONAL_INFO.phone}</span>
              <span aria-hidden="true">·</span>
              <span>Kolkata, India</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenCvModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Verified CV Document</span>
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. All project case studies and technical materials available for open review.
          </div>
          <div className="flex items-center gap-4">
            <a href="#projects" className="hover:text-slate-300 transition-colors">Projects</a>
            <a href="#case-studies" className="hover:text-slate-300 transition-colors">Case Studies</a>
            <a href="#testimonials" className="hover:text-slate-300 transition-colors">Testimonials</a>
            <a href="#credentials" className="hover:text-slate-300 transition-colors">Credentials</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
