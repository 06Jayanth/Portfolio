import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sparkles, 
  Lightbulb, 
  Figma, 
  PenTool, 
  Layout, 
  Layers, 
  Smartphone, 
  Compass, 
  UserCheck, 
  Workflow, 
  Palette
} from 'lucide-react';

export const About: React.FC = () => {
  const { personalInfo } = usePortfolio();
  const skillsList = [
    { name: 'UI Design', desc: 'Aesthetic, clear visual interfaces', icon: Palette },
    { name: 'UX Design', desc: 'Frictionless human pathways', icon: Compass },
    { name: 'Wireframing', desc: 'Rapid low-fidelity ideation', icon: Layout },
    { name: 'Prototyping', desc: 'Interactive Smart Animate flows', icon: Smartphone },
    { name: 'User Research', desc: 'Interviews & usability testing', icon: UserCheck },
    { name: 'Design Systems', desc: 'Tokens, auto-layout & variants', icon: Layers },
    { name: 'Responsive Design', desc: 'Seamless mobile to desktop adaptation', icon: Workflow },
  ];

  const toolsList = [
    { name: 'Figma', role: 'Primary Tool (Auto-Layout, Variables, Dev Mode)', badge: 'Expert' },
    { name: 'FigJam', role: 'Brainstorming, user journeys & team sprints', badge: 'Advanced' },
    { name: 'Adobe XD', role: 'Experience design & rapid wireframing', badge: 'Proficient' },
    { name: 'Photoshop', role: 'Asset editing & visual composition', badge: 'Proficient' },
    { name: 'Illustrator', role: 'Custom vector iconography & brand assets', badge: 'Proficient' },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>About {personalInfo.name}</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
              Designing with empathy, craft, and business purpose.
            </h2>
          </div>
        </div>

        {/* 2-Column Bento Overview & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-5 items-stretch">
          
          {/* Professional Introduction Bento Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xs space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  Professional Bio
                </h3>
              </div>
              <p className="text-base text-slate-600 leading-relaxed">
                {personalInfo.shortBio}
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                My background in Computer Science allows me to design with deep empathy for developers and technical feasibility while fiercely championing the end-user's needs. I obsess over information hierarchy, typographic cadence, and micro-interactions that make software feel alive.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Focus</span>
                <span className="text-sm font-bold text-[#0F172A]">UI/UX Design • Design Systems • Mobile & Web</span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold shrink-0">
                {personalInfo.status || 'Actively Hiring Ready'}
              </span>
            </div>
          </div>

          {/* Design Philosophy Bento Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-xs relative overflow-hidden">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                <Lightbulb className="w-4 h-4" />
                <span>My Design Philosophy</span>
              </div>

              <blockquote className="text-[#0F172A] text-lg sm:text-xl font-medium leading-relaxed italic">
                "{personalInfo.designPhilosophy}"
              </blockquote>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 mt-6">
              <div className="text-center p-2 rounded-xl bg-slate-50 border border-slate-200/50">
                <span className="block text-lg font-bold text-slate-900">01</span>
                <span className="text-xs font-bold text-[#0F172A]">Clarity</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Zero friction</span>
              </div>
              <div className="text-center p-2 rounded-xl bg-slate-50 border border-slate-200/50">
                <span className="block text-lg font-bold text-slate-900">02</span>
                <span className="text-xs font-bold text-[#0F172A]">Pixel Craft</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">Mathematical</span>
              </div>
              <div className="text-center p-2 rounded-xl bg-slate-50 border border-slate-200/50">
                <span className="block text-lg font-bold text-slate-900">03</span>
                <span className="text-xs font-bold text-[#0F172A]">Tested</span>
                <span className="block text-[10px] text-slate-400 mt-0.5">User validated</span>
              </div>
            </div>
          </div>

        </div>

        {/* Skills and Tools Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* Skills Column Bento Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
                <Layout className="w-4 h-4 text-blue-600" />
                <span>Core Design & UX Disciplines</span>
              </h3>
              <span className="text-xs text-slate-400 font-mono font-semibold">7 Disciplines</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {skillsList.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 transition-all flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-colors shrink-0 shadow-2xs">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0F172A]">{skill.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{skill.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tools Column Bento Card */}
          <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-[#0F172A] tracking-tight flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-blue-600" />
                  <span>Design Tooling Mastery</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono font-semibold">5 Tools</span>
              </div>

              <div className="space-y-2.5">
                {toolsList.map((tool, index) => (
                  <div
                    key={index}
                    className="p-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/60 transition-all flex items-center justify-between"
                  >
                    <div className="space-y-0.5">
                      <span className="text-sm font-bold text-[#0F172A]">{tool.name}</span>
                      <p className="text-xs text-slate-500">{tool.role}</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                      tool.badge === 'Expert' 
                        ? 'bg-slate-900 text-white' 
                        : tool.badge === 'Advanced' 
                        ? 'bg-slate-200 text-slate-800' 
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {tool.badge}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
