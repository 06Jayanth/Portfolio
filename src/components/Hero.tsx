import React, { useState } from 'react';
import { ArrowRight, Sparkles, Layers, Copy, Check, Eye, FileText, ArrowUpRight, Smartphone, Monitor } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface HeroProps {
  onExploreWork: () => void;
  onOpenCaseStudy: (projectId: string) => void;
  onOpenResume?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onOpenCaseStudy, onOpenResume }) => {
  const { personalInfo } = usePortfolio();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (personalInfo.email) {
      navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <section
      id="hero"
      className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-[#F8F9FA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Bento Tile 1: Main Introduction (col-span-7) */}
          <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-sm relative group">

            <div>
              {/* Eyebrow badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <h2 className="text-slate-500 text-xs sm:text-sm font-bold uppercase tracking-widest">
                  {personalInfo.title || 'UI/UX Designer & Creative Problem Solver'}
                </h2>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[50px] font-bold leading-[1.12] text-[#0F172A] mb-6 tracking-tight">
                Hi, I'm {personalInfo.name} — creating simple & intuitive{' '}
                <span className="text-blue-600">experiences.</span>
              </h1>

              {/* Bio Subtitle */}
              <p className="text-slate-600 text-base sm:text-lg mb-8 max-w-lg leading-relaxed">
                {personalInfo.shortBio}
              </p>
            </div>

            {/* Actions & Copy Email */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreWork}
                id="hero-view-work-btn"
                className="bg-slate-900 text-white px-7 py-3.5 rounded-xl font-semibold shadow-sm hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                id="hero-contact-btn"
                className="border border-slate-200 px-7 py-3.5 rounded-xl font-semibold hover:bg-slate-50 text-slate-900 transition-colors cursor-pointer"
              >
                Contact Me
              </a>

              <button
                onClick={handleCopyEmail}
                id="hero-copy-email-chip"
                title={`Copy email address: ${personalInfo.email}`}
                className="inline-flex items-center gap-1.5 px-4 py-3.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Bento Tile 2: Travio Travel Booking Visual Mockup (col-span-5) */}
          <div
            onClick={() => onOpenCaseStudy('travio')}
            className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm relative group min-h-[380px] sm:min-h-[420px] flex flex-col justify-end cursor-pointer"
          >
            <img
              src="/src/assets/images/travio_mockup_1788621722329.jpg"
              alt="Travio Travel Booking Mobile UI/UX Design Mockup"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-103 transition-all duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Top Figma Chip */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-xs border border-white/80">
              <span className="text-blue-600 font-bold">❖</span>
              <span>Mobile App • Figma</span>
            </div>

            {/* Bottom Gradient Bar Overlay */}
            <div className="relative z-10 p-6 sm:p-8 bg-gradient-to-t from-black/85 via-black/45 to-transparent text-white">
              <div className="flex justify-between items-end gap-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                    Mobile App • Figma
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
                    Travio
                  </h3>
                  <p className="text-sm text-gray-300 mt-1 max-w-xs line-clamp-2">
                    Travel booking mobile application with destination search, trip booking, and secure payments.
                  </p>
                </div>

                <button
                  id="hero-btn-travio-case"
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-md px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white transition-all shrink-0 cursor-pointer"
                >
                  Case Study
                </button>
              </div>
            </div>
          </div>

          {/* Lower Bento Row */}

          {/* Bento Tile 3: Featured Work (LevelUp) - (col-span-4) */}
          <div
            onClick={() => onOpenCaseStudy('levelup')}
            className="lg:col-span-4 bg-white border border-gray-100 rounded-3xl p-6 flex flex-col justify-between shadow-sm group hover:border-gray-200 transition-all cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-xl text-[#1D1D1F]">Featured Work</h3>
              <span className="text-xs font-bold px-2.5 py-1 bg-gray-100 rounded-md text-gray-500 font-mono">
                02
              </span>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 flex-1 flex flex-col gap-3 border border-gray-100/80">
              <div className="h-36 bg-gray-200 rounded-xl overflow-hidden relative">
                <img
                  src="/src/assets/images/levelup_mockup_1788621696498.jpg"
                  alt="LevelUp E-Learning Mobile App Mockup"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
                  Mobile App
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-base text-[#1D1D1F] group-hover:text-blue-600 transition-colors">
                  LevelUp
                </span>
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                  E-Learning
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                E-learning mobile app with course browsing, assessments, progress tracking, and leaderboards.
              </p>
            </div>
          </div>

          {/* Bento Tile 4: Stack & Tools Dark Obsidian Tile (col-span-3) */}
          <div className="lg:col-span-3 bg-[#0F172A] rounded-3xl p-6 text-white flex flex-col justify-between shadow-md border border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Stack & Tools
              </span>
              <div className="flex flex-wrap gap-2 mt-3">
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-medium text-slate-200">
                  Figma
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-medium text-slate-200">
                  Adobe CC
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-medium text-slate-200">
                  Prototyping
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-medium text-slate-200">
                  User Research
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-medium text-slate-200">
                  Design Systems
                </div>
                <div className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-medium text-slate-200">
                  Wireframing
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-white/10 mt-4">
              <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-bold text-xs text-slate-200" title="Figma">
                ❖
              </div>
              <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-bold text-xs text-pink-400" title="Adobe XD">
                Xd
              </div>
              <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-bold text-xs text-blue-400" title="Photoshop">
                Ps
              </div>
              <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center font-bold text-xs text-amber-400" title="Illustrator">
                Ai
              </div>
            </div>
          </div>

          {/* Bento Tile 5: Let's create together (col-span-5) */}
          <div className="lg:col-span-5 bg-white border border-gray-100 rounded-3xl p-6 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-sm">
            <div className="space-y-3">
              <h4 className="text-lg sm:text-xl font-bold text-[#1D1D1F] leading-snug">
                Let's create something <br />
                meaningful together.
              </h4>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                {personalInfo.linkedin && (
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold hover:text-blue-600 transition-colors uppercase tracking-wider"
                  >
                    LinkedIn
                  </a>
                )}
                {personalInfo.figma && (
                  <>
                    <span>•</span>
                    <a
                      href={personalInfo.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold hover:text-blue-600 transition-colors uppercase tracking-wider"
                    >
                      Figma
                    </a>
                  </>
                )}
                {personalInfo.twitter && (
                  <>
                    <span>•</span>
                    <a
                      href={personalInfo.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold hover:text-blue-600 transition-colors uppercase tracking-wider"
                    >
                      Twitter/X
                    </a>
                  </>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenResume}
              className="w-20 h-20 rounded-full border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-[11px] font-bold text-slate-700 hover:border-slate-900 hover:text-slate-900 hover:bg-slate-50 transition-all text-center p-2 shrink-0 group cursor-pointer"
            >
              <span>Resume</span>
              <span className="text-[10px] text-slate-400 group-hover:text-slate-900">PDF</span>
            </button>
          </div>

          {/* Bento Tile 6: AI Career Coach Project Pill Banner */}
          <div
            onClick={() => onOpenCaseStudy('ai-career-coach')}
            className="lg:col-span-12 bg-slate-100/90 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between p-4 sm:px-6 gap-3 cursor-pointer hover:bg-slate-200/70 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Featured Case Study: AI Career Coach
              </span>
              <span className="hidden md:inline text-xs text-slate-600">
                — Interactive Voice Mock Interview Studio & Readiness Matrix
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 group-hover:translate-x-0.5 transition-transform">
              <span>Inspect Case Study</span>
              <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
            </div>
          </div>

        </div>

        {/* Stats Bento Strip */}
        <div className="mt-8 relative">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {personalInfo.stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex flex-col justify-center"
              >
                <span className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs font-medium text-gray-500 mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
