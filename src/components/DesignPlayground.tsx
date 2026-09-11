import React, { useState } from 'react';
import { PlaygroundItem } from '../types';
import { usePortfolio } from '../context/PortfolioContext';
import { FoodgoInteractiveScreen } from './FoodgoInteractiveScreen';
import { WeatherInteractiveScreen } from './WeatherInteractiveScreen';
import { MoodeeInteractiveScreen } from './MoodeeInteractiveScreen';
import { LevelUpInteractiveScreen } from './LevelUpInteractiveScreen';
import { TravioInteractiveScreen } from './TravioInteractiveScreen';
import { AICareerCoachInteractiveScreen } from './AICareerCoachInteractiveScreen';
import { QuinternInteractiveScreen } from './QuinternInteractiveScreen';
import { SpotifyInteractiveScreen } from './SpotifyInteractiveScreen';
import { FinFlowInteractiveScreen } from './FinFlowInteractiveScreen';
import { Sparkles, Maximize2, X, ArrowLeft, ArrowRight, Figma, Copy, Check, Play } from 'lucide-react';

export const DesignPlayground: React.FC = () => {
  const { playgroundItems } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxItem, setLightboxItem] = useState<PlaygroundItem | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [lightboxViewMode, setLightboxViewMode] = useState<'mockup' | 'simulator'>('mockup');

  const categories = ['All', 'Mobile UI', 'Web & SaaS', 'Components', 'Experimental'];

  const visibleItems = (playgroundItems || []).filter(item => !item.hidden);

  const filteredItems = visibleItems.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.category === selectedCategory;
  });

  const handleNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxItem || visibleItems.length === 0) return;
    const currentIndex = visibleItems.findIndex((i) => i.id === lightboxItem.id);
    const nextIndex = (currentIndex + 1) % visibleItems.length;
    setLightboxItem(visibleItems[nextIndex]);
  };

  const handlePrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxItem || visibleItems.length === 0) return;
    const currentIndex = visibleItems.findIndex((i) => i.id === lightboxItem.id);
    const prevIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    setLightboxItem(visibleItems[prevIndex]);
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="playground" className="py-20 md:py-28 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-xs font-semibold text-purple-700 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explorations & Experiments</span>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1D1D1F] tracking-tight">
                Design Playground
              </h2>
            </div>
            <p className="mt-2 text-base text-gray-500 max-w-xl leading-relaxed">
              A curated collection of standalone Figma screens, UI components, micro-interactions, and design system experiments.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white border border-gray-100 shadow-xs self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1D1D1F] text-white shadow-xs'
                    : 'text-gray-500 hover:text-black hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Playground Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl p-8">
            <p className="text-gray-500 text-sm">No playground screens in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                id={`playground-card-${item.id}`}
                className="group rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-3.5 cursor-pointer flex flex-col relative"
              >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-gray-50 border border-gray-100/80">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Subtle top Figma frame pill */}
                <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] font-mono text-slate-700 border border-white/80 shadow-xs">
                  <span className="text-[#A259FF] font-bold">❖</span>
                  <span className="truncate max-w-[160px]">{item.figmaFrame}</span>
                </div>

                {/* Hover trigger button */}
                <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-2 rounded-xl bg-white text-[#1D1D1F] text-xs font-bold shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Open Lightbox</span>
                  </span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] text-gray-400 font-mono">
                    <span className="font-semibold text-indigo-600 font-sans">{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#1D1D1F] group-hover:text-indigo-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      </div>

      {/* Lightbox Modal */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2">
                <span className="text-[#A259FF] font-bold">❖</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{lightboxItem.title}</h3>
                  <span className="text-xs text-slate-500 font-mono">{lightboxItem.figmaFrame}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevLightbox}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                  title="Previous design"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextLightbox}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                  title="Next design"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setLightboxItem(null)}
                  className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
                  title="Close lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Interactive View Toggle if Interactive Item */}
            {(lightboxItem.id.startsWith('pg-foodgo') || 
              lightboxItem.id.startsWith('pg-weather') ||
              lightboxItem.id.startsWith('pg-moodee') ||
              lightboxItem.id.startsWith('pg-levelup') ||
              lightboxItem.id.startsWith('pg-travio') ||
              lightboxItem.id.startsWith('pg-aicareercoach') ||
              lightboxItem.id.startsWith('pg-quintern') ||
              lightboxItem.id.startsWith('pg-spotify') ||
              lightboxItem.id.startsWith('pg-finflow')) && (
              <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Preview Mode:</span>
                <div className="flex items-center gap-1.5 p-0.5 rounded-lg bg-slate-200/80">
                  <button
                    onClick={() => setLightboxViewMode('mockup')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      lightboxViewMode === 'mockup' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Hi-Fi Mockup
                  </button>
                  <button
                    onClick={() => setLightboxViewMode('simulator')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      lightboxViewMode === 'simulator' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Live Interactive Simulation</span>
                  </button>
                </div>
              </div>
            )}

            {/* Content Area */}
            <div className="p-6 overflow-y-auto space-y-6">
              {lightboxViewMode === 'simulator' && (
                lightboxItem.id.startsWith('pg-foodgo') || 
                lightboxItem.id.startsWith('pg-weather') ||
                lightboxItem.id.startsWith('pg-moodee') ||
                lightboxItem.id.startsWith('pg-levelup') ||
                lightboxItem.id.startsWith('pg-travio') ||
                lightboxItem.id.startsWith('pg-aicareercoach') ||
                lightboxItem.id.startsWith('pg-quintern') ||
                lightboxItem.id.startsWith('pg-spotify') ||
                lightboxItem.id.startsWith('pg-finflow')
              ) ? (
                <div className="rounded-2xl overflow-hidden">
                  {lightboxItem.id.startsWith('pg-foodgo') ? (
                    <FoodgoInteractiveScreen />
                  ) : lightboxItem.id.startsWith('pg-weather') ? (
                    <WeatherInteractiveScreen />
                  ) : lightboxItem.id.startsWith('pg-moodee') ? (
                    <MoodeeInteractiveScreen />
                  ) : lightboxItem.id.startsWith('pg-levelup') ? (
                    <LevelUpInteractiveScreen />
                  ) : lightboxItem.id.startsWith('pg-travio') ? (
                    <TravioInteractiveScreen />
                  ) : lightboxItem.id.startsWith('pg-aicareercoach') ? (
                    <AICareerCoachInteractiveScreen />
                  ) : lightboxItem.id.startsWith('pg-quintern') ? (
                    <QuinternInteractiveScreen />
                  ) : lightboxItem.id.startsWith('pg-spotify') ? (
                    <SpotifyInteractiveScreen />
                  ) : (
                    <FinFlowInteractiveScreen />
                  )}
                </div>
              ) : (
                <div className="rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 max-h-[50vh] flex items-center justify-center">
                  <img
                    src={lightboxItem.image}
                    alt={lightboxItem.title}
                    className="w-full h-full object-contain max-h-[50vh]"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {/* Design Spec Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="sm:col-span-2 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 block">
                    Design Intent & Specs
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {lightboxItem.description}
                  </p>
                  {lightboxItem.details && (
                    <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-200">
                      {lightboxItem.details}
                    </p>
                  )}
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-800 block">Figma Specs</span>
                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Category:</span>
                      <span className="font-semibold text-slate-800">{lightboxItem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Accent Token:</span>
                      <button
                        onClick={() => handleCopyColor(lightboxItem.color)}
                        className="font-mono font-semibold text-indigo-600 flex items-center gap-1 hover:underline"
                      >
                        <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: lightboxItem.color }}></span>
                        <span>{lightboxItem.color}</span>
                        {copiedCode ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Created:</span>
                      <span className="text-slate-700">{lightboxItem.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
