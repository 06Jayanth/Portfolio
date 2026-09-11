import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { F2PShooterInteractiveScreen } from './F2PShooterInteractiveScreen';
import { FoodgoInteractiveScreen } from './FoodgoInteractiveScreen';
import { WeatherInteractiveScreen } from './WeatherInteractiveScreen';
import { MoodeeInteractiveScreen } from './MoodeeInteractiveScreen';
import { LevelUpInteractiveScreen } from './LevelUpInteractiveScreen';
import { TravioInteractiveScreen } from './TravioInteractiveScreen';
import { AICareerCoachInteractiveScreen } from './AICareerCoachInteractiveScreen';
import { QuinternInteractiveScreen } from './QuinternInteractiveScreen';
import { SpotifyInteractiveScreen } from './SpotifyInteractiveScreen';
import { FinFlowInteractiveScreen } from './FinFlowInteractiveScreen';
import { 
  X, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Figma, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Monitor, 
  Copy, 
  Check, 
  Sparkles, 
  User, 
  AlertCircle, 
  Activity, 
  Maximize2 
} from 'lucide-react';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (projectId: string) => void;
  allProjects: Project[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'research' | 'screens' | 'decisions'>('overview');
  const [showInteractiveSim, setShowInteractiveSim] = useState(false);

  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!project) return null;

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];
  const isAdobeXd = project.figmaPrototypeUrl.includes('xd.adobe.com') || (project.tools || []).includes('Adobe XD');

  const handleCopyFigmaLink = () => {
    navigator.clipboard.writeText(project.figmaPrototypeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div
      id="case-study-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex justify-center p-0 sm:p-4 md:p-6 transition-all"
    >
      <div
        id="case-study-content-container"
        className="relative w-full max-w-5xl bg-white sm:rounded-3xl shadow-2xl min-h-screen sm:min-h-0 sm:my-auto overflow-hidden flex flex-col border border-slate-200"
      >
        
        {/* Sticky Top Bar with Close and Quick Actions */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              id="case-study-back-btn"
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Portfolio</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block" />
            <span className="text-xs font-bold text-slate-900 line-clamp-1">
              {project.title} — Case Study
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Prototype button */}
            {isAdobeXd ? (
              <a
                href={project.figmaPrototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#FF2BC2] hover:bg-[#d91ea2] shadow-xs transition-colors"
                title="Open Adobe XD Prototype"
              >
                <span className="px-1 py-0.2 bg-black text-white text-[10px] font-mono rounded font-extrabold">Xd</span>
                <span>View Adobe XD Prototype</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            ) : (
              <a
                href={project.figmaPrototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition-colors"
              >
                <Figma className="w-3.5 h-3.5" />
                <span>View Prototype</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            )}

            <button
              onClick={onClose}
              id="case-study-close-btn"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 md:p-12 space-y-16 overflow-y-auto">
          
          {/* Hero Banner Section */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
                {project.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                {project.platform}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-xs font-mono text-slate-600">
                {project.duration}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-600 leading-relaxed max-w-3xl">
                {project.tagline}
              </p>
            </div>

            {/* Quick Metadata Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Role</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{project.role}</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Timeline</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{project.duration}</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Platform</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800">{project.platform}</span>
              </div>
              <div>
                <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Prototype</span>
                <button
                  onClick={handleCopyFigmaLink}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedLink ? 'Copied Link' : isAdobeXd ? 'Copy Adobe XD Link' : 'Copy Figma Link'}</span>
                </button>
              </div>
            </div>

            {/* Large Project Hero Visual Mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg aspect-16/9 bg-slate-100">
              <img
                src={project.thumbnail}
                alt={`${project.title} High fidelity design mockup`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* 1. Project Overview & Problem Statement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-3 p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Project Overview
              </span>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {project.overview}
              </p>
            </div>

            <div className="space-y-3 p-6 rounded-2xl bg-amber-50/50 border border-amber-200/70 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                Problem Statement
              </span>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                {project.problemStatement}
              </p>
            </div>
          </div>

          {/* 2. Design Objective */}
          <div className="p-6 sm:p-8 rounded-2xl bg-indigo-50/60 border border-indigo-100 shadow-2xs">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block mb-2">
              Design Objective
            </span>
            <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
              {project.designObjective}
            </p>
          </div>

          {/* 3. Target Users & Personas */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">User Research</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Target Users & Personas</h2>
              <p className="text-sm text-slate-600">Empirical user interviews conducted during the discovery phase.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {project.targetUsers.map((user, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                      {user.persona[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">{user.persona}</h3>
                      <span className="text-xs text-slate-500">{user.role}</span>
                    </div>
                  </div>

                  <blockquote className="p-3 rounded-xl bg-slate-50 border-l-2 border-indigo-500 text-xs text-slate-700 italic">
                    "{user.quote}"
                  </blockquote>

                  <div className="space-y-1.5">
                    <span className="text-xs font-bold text-slate-700 block">Core Pain Points:</span>
                    <ul className="space-y-1">
                      {user.painPoints.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. User Flow Architecture */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Information Architecture</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">User Flow Diagram</h2>
              <p className="text-sm text-slate-600">Primary task completion pathway designed for minimum cognitive load.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.userFlow.map((flow, fIdx) => (
                <div key={fIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 relative">
                  <span className="text-xs font-mono font-bold text-indigo-600">{flow.step}</span>
                  <h4 className="text-sm font-bold text-slate-900">{flow.action}</h4>
                  <span className="inline-block px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-medium text-slate-600">
                    Screen: {flow.screen}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {flow.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Wireframes & Structural Insights */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Low-Fidelity Validation</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Wireframes & Structural Decisions</h2>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                Key Wireframe Testing Takeaways
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {project.wireframeInsights.map((insight, wIdx) => (
                  <div key={wIdx} className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                    <span className="block text-indigo-400 font-bold mb-1">0{wIdx + 1}. Insight</span>
                    {insight}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 6. UI Designs & Design System Tokens */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Visual Identity</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Design System & Colors</h2>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.colorPalette.map((color, cIdx) => (
                <div key={cIdx} className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <div
                    className="w-full h-12 rounded-lg border border-black/10 shadow-inner"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <span className="block text-xs font-bold text-slate-900">{color.name}</span>
                    <span className="block text-[11px] font-mono text-slate-500">{color.hex}</span>
                    <span className="block text-[11px] text-slate-600">{color.role}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Typography */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Typography Hierarchy</span>
              <div className="space-y-2">
                {project.typography.map((type, tIdx) => (
                  <div key={tIdx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg bg-white border border-slate-200 text-xs gap-1">
                    <div>
                      <strong className="text-slate-900">{type.style}: </strong>
                      <span className="text-slate-600 font-mono">{type.sample}</span>
                    </div>
                    <span className="text-slate-500 text-[11px]">{type.usage}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 7. Final Screens & Mockups */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">High-Fidelity UI</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Final Screens & Flows</h2>
                <p className="text-sm text-slate-600">Polished Figma screens exported with dev-ready tokens.</p>
              </div>

              <a
                href={project.figmaPrototypeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs self-start sm:self-auto"
              >
                <Figma className="w-4 h-4" />
                <span>Open in Figma</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Screens List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screens.map((screen, sIdx) => (
                <div
                  key={sIdx}
                  className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
                >
                  {/* Screen Frame Mockup */}
                  <div className="relative bg-slate-100 p-4 border-b border-slate-200 overflow-hidden">
                    <div className="rounded-xl overflow-hidden shadow-xs border border-slate-200 bg-white">
                      <img
                        src={project.thumbnail}
                        alt={screen.title}
                        className="w-full h-48 sm:h-56 object-cover object-top group-hover:scale-102 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {screen.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-semibold">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{screen.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{screen.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 8. Interactive Prototype Simulator Box */}
          <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-1 rounded bg-indigo-500/30 text-indigo-200 text-xs font-mono font-semibold">
                  Interactive Prototype Preview
                </span>
                <h3 className="text-xl sm:text-2xl font-bold mt-2">
                  Experience the {project.title} Prototype
                </h3>
                <p className="text-xs sm:text-sm text-indigo-200 max-w-xl">
                  Interactive micro-interactions, smart animated transitions, and tactile user feedback built in Figma.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={project.figmaPrototypeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 flex items-center gap-2 shadow-lg"
                >
                  <Figma className="w-4 h-4 text-purple-600" />
                  <span>View Prototype in Figma</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Embedded Live Interactive Simulation for Projects */}
            {project.id === 'f2p-shooter' ? (
              <div className="pt-2">
                <F2PShooterInteractiveScreen />
              </div>
            ) : project.id === 'foodgo' ? (
              <div className="pt-2">
                <FoodgoInteractiveScreen />
              </div>
            ) : project.id === 'weather-atmosphere' ? (
              <div className="pt-2">
                <WeatherInteractiveScreen />
              </div>
            ) : project.id === 'moodee' ? (
              <div className="pt-2">
                <MoodeeInteractiveScreen />
              </div>
            ) : project.id === 'levelup' ? (
              <div className="pt-2">
                <LevelUpInteractiveScreen />
              </div>
            ) : project.id === 'travio' ? (
              <div className="pt-2">
                <TravioInteractiveScreen />
              </div>
            ) : project.id === 'ai-career-coach' ? (
              <div className="pt-2">
                <AICareerCoachInteractiveScreen />
              </div>
            ) : project.id === 'quintern' ? (
              <div className="pt-2">
                <QuinternInteractiveScreen />
              </div>
            ) : project.id === 'spotify-redesign' ? (
              <div className="pt-2">
                <SpotifyInteractiveScreen />
              </div>
            ) : project.id === 'finflow' ? (
              <div className="pt-2">
                <FinFlowInteractiveScreen />
              </div>
            ) : (
              /* Standard Prototype Placeholder Box */
              <div className="rounded-xl border border-indigo-500/30 bg-slate-950/60 p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
                  <Figma className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Live Figma Prototype Embed Ready</h4>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    Prototype URL is mapped to: <code className="text-indigo-300">{project.figmaPrototypeUrl}</code>. You can click above to launch in full screen with hot-spot hints enabled.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 9. Design Decisions & Impact */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Strategic Thinking</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Key Design Decisions</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.designDecisions.map((dec, dIdx) => (
                <div key={dIdx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                  <span className="text-xs font-mono font-bold text-indigo-600">Decision 0{dIdx + 1}</span>
                  <h4 className="text-sm font-bold text-slate-900">{dec.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{dec.description}</p>
                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Impact: {dec.impact}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 10. Challenges & Solutions */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Problem Solving</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Challenges & Solutions</h2>
            </div>

            <div className="space-y-4">
              {project.challengesAndSolutions.map((cs, cIdx) => (
                <div key={cIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">The Challenge</span>
                    <p className="text-xs sm:text-sm text-slate-800 font-medium">{cs.challenge}</p>
                  </div>
                  <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
                    <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">The UX Solution</span>
                    <p className="text-xs sm:text-sm text-slate-800">{cs.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 11. Final Outcome & Takeaways */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">Measurable Impact</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Final Outcome & Metrics</h2>
              <p className="text-sm text-slate-600 mt-1">{project.finalOutcome.summary}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.finalOutcome.stats.map((st, sIdx) => (
                <div key={sIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-1">
                  <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-600">{st.value}</span>
                  <span className="block text-xs font-medium text-slate-600">{st.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation to Next / Prev Projects */}
          <div className="pt-8 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={() => onSelectProject(prevProject.id)}
              id="prev-project-nav-btn"
              className="group flex items-center gap-2 text-left"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[11px] text-slate-400">Previous Project</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {prevProject.title}
                </span>
              </div>
            </button>

            <button
              onClick={() => onSelectProject(nextProject.id)}
              id="next-project-nav-btn"
              className="group flex items-center gap-2 text-right"
            >
              <div>
                <span className="block text-[11px] text-slate-400">Next Project</span>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-50 flex items-center justify-center text-slate-600 group-hover:text-indigo-600 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
