import React from 'react';
import { FileText, Download, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ResumeSectionProps {
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onOpenResume }) => {
  return (
    <section id="resume" className="py-16 md:py-20 bg-[#F8F9FA] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#1D1D1F] text-white p-8 sm:p-12 border border-gray-800/80 shadow-sm relative overflow-hidden">
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">
            
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Curriculum Vitae</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Want to know more about me?
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed">
                Download my comprehensive resume detailing academic background, end-to-end design case studies, design system architecture, and UX design certificates.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ATS-Friendly Format
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Updated for 2026 Opportunities
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <button
                onClick={onOpenResume}
                id="btn-download-resume"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-bold text-[#1D1D1F] bg-white hover:bg-gray-100 transition-all cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={onOpenResume}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-xs font-semibold text-gray-300 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>View Online</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
