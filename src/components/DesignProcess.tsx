import React, { useState } from 'react';
import { PROCESS_STAGES } from '../data/portfolioData';
import { 
  Sparkles, 
  Search, 
  Target, 
  Layout, 
  Palette, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Layers 
} from 'lucide-react';

export const DesignProcess: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return Search;
      case 'Target':
        return Target;
      case 'Layout':
        return Layout;
      case 'Palette':
        return Palette;
      case 'Cpu':
        return Cpu;
      case 'CheckCircle2':
        return CheckCircle2;
      case 'Sparkles':
      default:
        return Sparkles;
    }
  };

  const selectedStage = PROCESS_STAGES.find((s) => s.number === activeStep) || PROCESS_STAGES[0];
  const ActiveIcon = getIcon(selectedStage.iconName);

  return (
    <section id="process" className="py-20 md:py-28 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
            Design Process
          </h2>
          <p className="mt-2 text-base text-gray-500 leading-relaxed">
            A structured, human-first progression from ambiguous problem discovery to pixel-precise, tested execution.
          </p>
        </div>

        {/* Process Flow Line Cards (Bento style) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
          {PROCESS_STAGES.map((stage) => {
            const IconComp = getIcon(stage.iconName);
            const isActive = activeStep === stage.number;
            return (
              <button
                key={stage.number}
                onClick={() => setActiveStep(stage.number)}
                id={`process-step-${stage.number}`}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between min-h-[140px] cursor-pointer group ${
                  isActive
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-md'
                    : 'bg-white text-[#1D1D1F] border-gray-100 hover:border-gray-200 hover:bg-gray-50/60 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={`text-xs font-mono font-bold ${
                      isActive ? 'text-indigo-400' : 'text-gray-400 group-hover:text-indigo-600'
                    }`}
                  >
                    0{stage.number}
                  </span>
                  <div
                    className={`p-1.5 rounded-lg ${
                      isActive ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className={`text-sm font-bold ${isActive ? 'text-white' : 'text-[#1D1D1F]'}`}>
                    {stage.name}
                  </h3>
                  <p
                    className={`text-[11px] leading-tight mt-1 line-clamp-2 ${
                      isActive ? 'text-gray-300' : 'text-gray-500'
                    }`}
                  >
                    {stage.shortDesc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Deep-Dive Bento Card */}
        <div className="rounded-3xl bg-white border border-gray-100 p-8 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  <ActiveIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-indigo-600">Stage 0{selectedStage.number} of 07</span>
                  <h3 className="text-2xl font-bold text-[#1D1D1F]">{selectedStage.name}</h3>
                </div>
              </div>

              <p className="text-base text-gray-600 leading-relaxed">
                {selectedStage.description}
              </p>

              {/* Navigation buttons to next/prev step */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  disabled={selectedStage.number === 1}
                  onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  Previous Stage
                </button>
                <button
                  disabled={selectedStage.number === PROCESS_STAGES.length}
                  onClick={() => setActiveStep((prev) => Math.min(PROCESS_STAGES.length, prev + 1))}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-indigo-100"
                >
                  <span>Next: {PROCESS_STAGES[selectedStage.number % PROCESS_STAGES.length]?.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Deliverables Checklist Bento Box */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1D1D1F]">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Deliverables & Artifacts</span>
              </div>
              
              <ul className="space-y-2.5 pt-1">
                {selectedStage.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
