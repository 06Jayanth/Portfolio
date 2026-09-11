import React, { useState } from 'react';
import { Settings, Edit3, Plus, Sparkles, X, ChevronUp, ChevronDown, FolderKanban, Palette, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const PortfolioEditorBar: React.FC = () => {
  const { isEditMode, setIsEditMode, openEditor } = usePortfolio();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Expanded Quick Options Menu */}
      {isExpanded && (
        <div className="bg-white/95 backdrop-blur-md border border-gray-200/90 rounded-2xl p-3 shadow-xl flex flex-col gap-2 min-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Portfolio Controls
            </span>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-black p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Toggle Edit Mode */}
          <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100/80 transition-colors">
            <span className="text-xs font-semibold text-[#1D1D1F]">
              Inline Edit Buttons
            </span>
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                isEditMode ? 'bg-indigo-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                  isEditMode ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Quick Tab Jump Buttons */}
          <button
            onClick={() => {
              openEditor('profile');
              setIsExpanded(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-left"
          >
            <Mail className="w-3.5 h-3.5 text-red-500" />
            <span>Edit Gmail & Socials</span>
          </button>

          <button
            onClick={() => {
              openEditor('projects');
              setIsExpanded(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-left"
          >
            <FolderKanban className="w-3.5 h-3.5 text-indigo-500" />
            <span>Add / Remove Projects</span>
          </button>

          <button
            onClick={() => {
              openEditor('playground');
              setIsExpanded(false);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors cursor-pointer text-left"
          >
            <Palette className="w-3.5 h-3.5 text-purple-500" />
            <span>Add / Remove Playground</span>
          </button>
        </div>
      )}

      {/* Main Pill Button */}
      <div className="flex items-center gap-1.5 bg-[#1D1D1F] text-white p-1.5 pl-3.5 rounded-full shadow-xl hover:bg-black transition-all">
        <button
          onClick={() => openEditor('profile')}
          className="flex items-center gap-2 text-xs font-bold cursor-pointer py-1 pr-1"
        >
          <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
          <span>Edit Portfolio</span>
        </button>

        <span className="w-px h-4 bg-white/20"></span>

        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
            isEditMode
              ? 'bg-indigo-600 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
          title="Toggle inline edit icons on cards"
        >
          {isEditMode ? 'Mode: ON' : 'Mode: OFF'}
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="More options"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
};
