import React, { useState } from 'react';
import { FileText, Menu, X, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface NavbarProps {
  onOpenCvModal: () => void;
  onOpenContactModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCvModal, onOpenContactModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Credentials', href: '#credentials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#090d16]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant 3-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-blue-400 transition-colors"
          >
            {PERSONAL_INFO.name}
          </a>

          {/* Zone 2: 4-6 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-white transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenCvModal}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-blue-500/20 active:translate-y-0.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>View Verified CV</span>
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCvModal}
              className="px-2.5 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md"
            >
              CV
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c1322] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-800/60 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCvModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              <FileText className="w-4 h-4" />
              <span>View Verified CV (PDF)</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs font-medium text-slate-300 hover:text-white border border-slate-700 rounded-lg"
            >
              Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
