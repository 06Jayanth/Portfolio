import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowRight, Figma, Sparkles, Smartphone, Monitor } from 'lucide-react';

interface FeaturedProjectsProps {
  onOpenCaseStudy: (projectId: string) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onOpenCaseStudy }) => {
  const { projects } = usePortfolio();
  const [filter, setFilter] = useState<'All' | 'Mobile App' | 'Web Application' | 'Game UI'>('All');

  const visibleProjects = (projects || []).filter(p => !p.hidden);

  const filteredProjects = visibleProjects.filter((p) => {
    if (filter === 'All') return true;
    if (filter === 'Game UI') {
      return p.category.includes('Game') || (p.tools || []).includes('Adobe XD') || p.id === 'f2p-shooter';
    }
    return p.platform === filter;
  });

  return (
    <section id="work" className="py-20 md:py-28 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Selected Portfolio</span>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight">
                Featured Work
              </h2>
            </div>
            <p className="mt-2 text-base text-slate-600 max-w-xl leading-relaxed">
              In-depth UI/UX design case studies spanning mobile experiences, SaaS workflows, and AI intelligence platforms.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-white border border-slate-200 shadow-xs self-start md:self-auto">
            {(['All', 'Mobile App', 'Web Application', 'Game UI'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards List */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-3xl p-8">
            <p className="text-slate-500 text-sm">No projects found for the selected category.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden p-6 sm:p-8 relative"
              >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* Visual Thumbnail Column */}
                <div
                  className={`lg:col-span-7 rounded-2xl overflow-hidden border border-slate-200/80 bg-slate-50 relative cursor-pointer ${
                    index % 2 === 1 ? 'lg:order-2' : ''
                  }`}
                  onClick={() => onOpenCaseStudy(project.id)}
                >
                  <div className="relative aspect-16/10 sm:aspect-16/9 w-full h-full min-h-[320px]">
                    <img
                      src={project.thumbnail}
                      alt={`${project.title} UI/UX Mockup`}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Top Pill Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-xs font-bold text-slate-900 shadow-xs border border-white/80">
                        {project.platform === 'Mobile App' ? (
                          <Smartphone className="w-3.5 h-3.5 text-blue-600" />
                        ) : (
                          <Monitor className="w-3.5 h-3.5 text-blue-600" />
                        )}
                        {project.platform}
                      </span>
                    </div>

                    {/* Figma / Adobe XD Tag */}
                    <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-mono font-medium text-slate-700 shadow-xs border border-white/80">
                      {project.tools?.includes('Adobe XD') ? (
                        <>
                          <span className="px-1 py-0.2 bg-[#FF2BC2] text-white text-[9px] font-mono rounded font-extrabold">Xd</span>
                          <span>Adobe XD Design</span>
                        </>
                      ) : (
                        <>
                          <span className="text-[#A259FF] font-bold">❖</span>
                          <span>Figma System</span>
                        </>
                      )}
                    </div>

                    {/* Hover Inspect CTA Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/20 backdrop-blur-[2px]">
                      <span className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        <span>Read Case Study</span>
                        <ArrowRight className="w-4 h-4 text-blue-600" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Project Details Column */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    index % 2 === 1 ? 'lg:order-1' : ''
                  }`}
                >
                  <div className="space-y-4">
                    {/* Category Label */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-400 font-mono font-medium">
                        {project.duration}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3
                        onClick={() => onOpenCaseStudy(project.id)}
                        className="text-2xl sm:text-3xl font-bold text-[#0F172A] hover:text-blue-600 cursor-pointer transition-colors"
                      >
                        {project.title}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-600">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {project.overview}
                    </p>

                    {/* Tools Used Chips */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tools & Methods</span>
                      <div className="flex flex-wrap gap-1.5">
                        {(project.tools || []).map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-700 text-xs font-medium border border-slate-200/70"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Metric Highlights Bento Tiles */}
                    {(project.finalOutcome?.stats?.length ?? 0) > 0 && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {project.finalOutcome.stats.slice(0, 2).map((st, sIdx) => (
                          <div key={sIdx} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                            <span className="block text-xl font-bold text-slate-900">
                              {st.value}
                            </span>
                            <span className="block text-[11px] font-medium text-slate-500 line-clamp-1 mt-0.5">
                              {st.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                    <button
                      onClick={() => onOpenCaseStudy(project.id)}
                      id={`btn-case-study-${project.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-sm transition-all group/btn cursor-pointer"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>

                    {project.figmaPrototypeUrl.includes('xd.adobe.com') || (project.tools || []).includes('Adobe XD') ? (
                      <a
                        href={project.figmaPrototypeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF2BC2] hover:text-[#d91ea2] transition-colors cursor-pointer"
                        title="Open Adobe XD Prototype"
                      >
                        <span className="font-mono font-extrabold text-[10px] px-1 py-0.2 rounded bg-pink-100 text-[#FF2BC2]">Xd</span>
                        <span>Adobe XD Prototype</span>
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenCaseStudy(project.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Inspect interactive screens"
                      >
                        <Figma className="w-4 h-4 text-[#A259FF]" />
                        <span>Figma Screens</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      </div>
    </section>
  );
};
