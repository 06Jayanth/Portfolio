import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Sparkles, Palette, Compass, PenTool, Award } from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { skillCategories } = usePortfolio();

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Design':
        return Palette;
      case 'UX':
        return Compass;
      case 'Tools':
        return PenTool;
      default:
        return Sparkles;
    }
  };

  return (
    <section id="skills" className="py-20 md:py-28 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Core Competencies</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
              Skills & Capabilities
            </h2>
          </div>
          <p className="mt-2 text-base text-gray-500 leading-relaxed">
            A balanced foundation of visual craftsmanship, scientific user research, and industry-grade Figma mastery.
          </p>
        </div>

        {/* 3 Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {skillCategories.map((cat, idx) => {
            const IconComp = getCategoryIcon(cat.category);
            return (
              <div
                key={idx}
                id={`skills-category-${cat.category.toLowerCase()}`}
                className="rounded-3xl bg-white border border-gray-100 p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-all relative"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-[#1D1D1F]">{cat.category}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-medium text-gray-400">
                        {cat.skills.length} skills
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 mt-3 mb-6 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1 hover:border-indigo-200 transition-colors group/item relative"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#1D1D1F]">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-white border border-gray-200 text-gray-700">
                              {skill.proficiency}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 leading-snug">
                          {skill.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Trust Badge */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-medium text-gray-500">
                  <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>Verified via real case studies & usability tests</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
