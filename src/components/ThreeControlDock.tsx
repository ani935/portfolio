import React, { useState, useEffect } from 'react';
import {
  Compass,
  FileText,
  Eye,
  EyeOff,
  Sliders,
  ChevronDown,
  ChevronUp,
  RotateCw,
  Sparkles,
  BookOpen,
  Layers,
  Cpu
} from 'lucide-react';

interface ThreeControlDockProps {
  activeView: 'global' | 'rag' | 'news' | 'agri' | 'casestudies';
  onSelectView: (view: 'global' | 'rag' | 'news' | 'agri' | 'casestudies') => void;
  onOpenCvModal: () => void;
  onScrollToCaseStudies: () => void;
  is3dOnlyMode: boolean;
  onToggle3dOnlyMode: () => void;
}

export const ThreeControlDock: React.FC<ThreeControlDockProps> = ({
  activeView,
  onSelectView,
  onOpenCvModal,
  onScrollToCaseStudies,
  is3dOnlyMode,
  onToggle3dOnlyMode,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Keyboard shortcut 'H' to toggle HUD
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        setIsCollapsed((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const cameraPresets = [
    { id: 'global', label: 'Global View', icon: Compass },
    { id: 'rag', label: 'Document RAG Pod', icon: Cpu },
    { id: 'news', label: 'News Agent Pod', icon: Layers },
    { id: 'agri', label: 'AgriTech Vision', icon: Sparkles },
    { id: 'casestudies', label: 'Case Studies Vault', icon: BookOpen },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94vw] max-w-4xl transition-all duration-300">
      {/* Collapse / Expand Toggle Button on Dock Top Edge */}
      <div className="flex justify-center mb-1.5">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-1.5 px-3 py-1 text-[11px] font-mono text-slate-400 hover:text-white bg-slate-900/90 border border-slate-800 rounded-t-lg backdrop-blur-md transition-colors"
          title="Press 'H' on keyboard to toggle"
        >
          {isCollapsed ? (
            <>
              <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Show 3D Navigation Dock</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              <span>Hide Dock (H)</span>
            </>
          )}
        </button>
      </div>

      {/* Main Glassmorphic Dock Container */}
      {!isCollapsed && (
        <div className="bg-[#090d16]/95 border border-slate-800 rounded-2xl shadow-2xl p-2.5 sm:p-3 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-in slide-in-from-bottom-2 duration-200">
          {/* Camera Focus Selector Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto p-1 bg-slate-950/80 rounded-xl border border-slate-800/80">
            {cameraPresets.map((preset) => {
              const Icon = preset.icon;
              const isActive = activeView === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => onSelectView(preset.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Portfolio Triggers & Mode Switch */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onToggle3dOnlyMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
                is3dOnlyMode
                  ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/40'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
              }`}
            >
              <span>{is3dOnlyMode ? 'Exit Full 3D' : 'Full 3D Mode'}</span>
            </button>

            <button
              onClick={onOpenCvModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm shadow-blue-500/20"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Verified CV</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
