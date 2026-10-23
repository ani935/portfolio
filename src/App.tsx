/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ThreeHeroSection } from './components/ThreeHeroSection';
import { ThreeControlDock } from './components/ThreeControlDock';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { CaseStudies } from './components/CaseStudies';
import { Testimonials } from './components/Testimonials';
import { SkillsAndCredentials } from './components/SkillsAndCredentials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CvModal } from './components/CvModal';

export default function App() {
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState<boolean>(false);
  const [active3dView, setActive3dView] = useState<'global' | 'rag' | 'news' | 'agri' | 'casestudies'>('global');
  const [is3dOnlyMode, setIs3dOnlyMode] = useState<boolean>(false);

  const handleOpenCaseStudy = (id: string) => {
    setSelectedCaseStudyId(id);
  };

  const handleCloseCaseStudy = () => {
    setSelectedCaseStudyId(null);
  };

  const handleSelectProjectFrom3d = (projectId: string) => {
    // Map project ID to case study ID
    if (projectId === 'pdf-analysis-rag') {
      setSelectedCaseStudyId('cs-pdf-rag');
    } else if (projectId === 'ai-news-agent') {
      setSelectedCaseStudyId('cs-news-agent');
    } else if (projectId === 'agricultural-development') {
      setSelectedCaseStudyId('cs-agricultural-ml');
    }
  };

  const handleScrollToCaseStudies = () => {
    setIs3dOnlyMode(false);
    setTimeout(() => {
      const el = document.getElementById('case-studies');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleScrollToContact = () => {
    setIs3dOnlyMode(false);
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* 3-Zone Compliant Top Navigation Bar */}
      <Navbar
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onOpenContactModal={handleScrollToContact}
      />

      {/* Main 3D Interactive Spatial Hero Canvas */}
      <ThreeHeroSection
        activeView={active3dView}
        onSelectProject={handleSelectProjectFrom3d}
        onSelectCaseStudy={handleOpenCaseStudy}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onExploreCaseStudies={handleScrollToCaseStudies}
        is3dOnlyMode={is3dOnlyMode}
      />

      {/* 3D Bottom Control Dock pinned to bottom center */}
      <ThreeControlDock
        activeView={active3dView}
        onSelectView={(view) => setActive3dView(view)}
        onOpenCvModal={() => setIsCvModalOpen(true)}
        onScrollToCaseStudies={handleScrollToCaseStudies}
        is3dOnlyMode={is3dOnlyMode}
        onToggle3dOnlyMode={() => setIs3dOnlyMode(!is3dOnlyMode)}
      />

      {/* Portfolio Content (Shown in full hybrid view) */}
      {!is3dOnlyMode && (
        <main>
          {/* Detailed Engineering Hero / Terminal Simulator */}
          <Hero
            onOpenCvModal={() => setIsCvModalOpen(true)}
            onExploreCaseStudies={handleScrollToCaseStudies}
          />

          {/* Selected Flagship Projects from CV */}
          <Projects onSelectCaseStudy={handleOpenCaseStudy} />

          {/* Dedicated Downloadable Project Case Studies Section (Explicit User Requirement) */}
          <CaseStudies onSelectCaseStudy={handleOpenCaseStudy} />

          {/* Dedicated Testimonials Section (Explicit User Requirement) */}
          <Testimonials />

          {/* Skills Matrix, Certifications & Academic Background */}
          <SkillsAndCredentials />

          {/* Direct Contact & Collaboration Channels */}
          <ContactSection />
        </main>
      )}

      {/* Clean, Non-ornamental Footer */}
      {!is3dOnlyMode && <Footer onOpenCvModal={() => setIsCvModalOpen(true)} />}

      {/* Interactive Case Study Reader & Downloader Modal */}
      <CaseStudyModal
        caseStudyId={selectedCaseStudyId}
        onClose={handleCloseCaseStudy}
      />

      {/* Verified CV PDF Preview & Direct Downloader Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
}
