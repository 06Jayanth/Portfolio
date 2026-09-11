import React, { useState } from 'react';
import { 
  Smile, 
  Frown, 
  Flame, 
  Sun, 
  Calendar as CalendarIcon, 
  BookOpen, 
  BarChart2, 
  Settings, 
  Bell, 
  Check, 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Save, 
  User, 
  Sparkles,
  Heart
} from 'lucide-react';

export const MoodeeInteractiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'selector' | 'journal' | 'calendar' | 'stats' | 'profile' | 'reminders'>('home');
  const [selectedMood, setSelectedMood] = useState<'happy' | 'sad' | 'angry' | 'calm'>('happy');
  const [journalText, setJournalText] = useState(
    'I smiled a lot today, felt relaxed, spent time doing what I love, and ended the day feeling grateful.'
  );
  const [isSaved, setIsSaved] = useState(false);
  const [activeStatsRange, setActiveStatsRange] = useState<'week' | 'month' | 'year'>('week');
  const [selectedDate, setSelectedDate] = useState<number>(9);

  const moodDetails = {
    happy: { label: 'Happy', emoji: '😊', color: '#FACC15', bg: 'bg-amber-100', text: 'text-amber-800', desc: 'Feeling joyful and motivated' },
    sad: { label: 'Sad', emoji: '😢', color: '#60A5FA', bg: 'bg-blue-100', text: 'text-blue-800', desc: 'Feeling low or uninspired' },
    angry: { label: 'Angry', emoji: '😡', color: '#EF4444', bg: 'bg-red-100', text: 'text-red-800', desc: "Feeling frustrated or overwhelmed" },
    calm: { label: 'Calm', emoji: '😌', color: '#84CC16', bg: 'bg-lime-100', text: 'text-lime-800', desc: 'Peaceful, centered and relaxed' },
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="rounded-3xl border border-emerald-900/40 bg-slate-950 shadow-2xl overflow-hidden p-3 sm:p-6 text-slate-900">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-lime-400 flex items-center justify-center text-slate-900 font-bold text-lg shadow-md shadow-lime-900/30">
            😊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">Moodee Interactive Prototype</h3>
              <span className="px-2 py-0.5 rounded bg-lime-400/20 text-lime-400 text-[10px] font-mono font-bold">
                iPhone 17 Frames 25-33
              </span>
            </div>
            <p className="text-slate-400 text-xs">Mood tracker with calendar heatmap, gratitude journal & analytics.</p>
          </div>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 max-w-full overflow-x-auto">
          {[
            { id: 'home', label: 'Home Feed' },
            { id: 'selector', label: 'Check-In' },
            { id: 'journal', label: 'Journal' },
            { id: 'calendar', label: 'Calendar' },
            { id: 'stats', label: 'Mood Stats' },
            { id: 'reminders', label: 'Reminders' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-lime-400 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* iPhone Device Simulation */}
      <div className="flex justify-center items-center py-2">
        <div className="w-full max-w-[380px] bg-[#EBF8F7] rounded-[44px] shadow-2xl border-[10px] border-slate-800 relative overflow-hidden flex flex-col min-h-[640px] max-h-[700px] select-none">
          
          {/* iOS Status Bar */}
          <div className="w-full h-7 bg-[#EBF8F7] flex items-center justify-between px-6 text-[11px] font-bold text-slate-800 select-none z-20 shrink-0">
            <span>9:30 PM</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto -mt-1 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 ml-auto mr-1.5"></div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2 border border-slate-800 rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-slate-800 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* SCREEN CONTENT */}
          <div className="flex-1 overflow-y-auto p-5 pb-20 relative">
            
            {/* 1. HOME SCREEN (Frame 28) */}
            {activeTab === 'home' && (
              <div className="space-y-4">
                {/* Header with Orion avatar */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Hello, Orion!</h2>
                    <p className="text-[11px] text-slate-500">A great day to check your mood</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setActiveTab('reminders')}
                      className="w-8 h-8 rounded-full bg-white/80 border border-slate-200 flex items-center justify-center text-slate-700 shadow-2xs"
                    >
                      <Bell className="w-4 h-4" />
                    </button>
                    <div 
                      onClick={() => setActiveTab('profile')}
                      className="w-9 h-9 rounded-full bg-amber-100 border-2 border-white overflow-hidden shadow-2xs cursor-pointer"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80" 
                        alt="Orion" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Today's Mood Card (Frame 28) */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Today's mood</span>
                    <button 
                      onClick={() => setActiveTab('selector')}
                      className="text-[10px] font-bold text-emerald-700 hover:underline cursor-pointer"
                    >
                      Change Mood →
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl shadow-inner">
                        {moodDetails[selectedMood].emoji}
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900">{moodDetails[selectedMood].label}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">9:30 am</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>

                {/* Horizontal Mini Calendar Strip */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">Calendar</span>
                    <button 
                      onClick={() => setActiveTab('calendar')}
                      className="text-[10px] text-slate-400 hover:text-slate-800"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { day: 'Mon', num: '01', mood: '😊', color: 'bg-amber-400' },
                      { day: 'Tue', num: '02', mood: '😡', color: 'bg-red-400' },
                      { day: 'Wed', num: '03', mood: '😊', color: 'bg-amber-400' },
                      { day: 'Thu', num: '04', mood: '😌', color: 'bg-lime-400' },
                    ].map((item) => (
                      <div 
                        key={item.num}
                        onClick={() => setActiveTab('calendar')}
                        className="p-2.5 rounded-2xl bg-[#1F2913] text-white text-center cursor-pointer hover:scale-105 transition-transform"
                      >
                        <span className="text-[10px] text-lime-200/70 block">{item.day}</span>
                        <span className="text-xs font-extrabold block my-0.5">{item.num}</span>
                        <span className="text-sm block">{item.mood}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Today's Journal Prompt */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Today's Journal</span>
                  <div 
                    onClick={() => setActiveTab('journal')}
                    className="p-3.5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center font-bold">
                        ✍️
                      </div>
                      <span className="text-xs font-semibold text-slate-800">Write Journal</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            )}

            {/* 2. MOOD SELECTOR SCREEN (Frame 27) */}
            {activeTab === 'selector' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Check-in</span>
                  <div className="w-7"></div>
                </div>

                <div className="text-center space-y-1">
                  <h2 className="text-lg font-black text-slate-900">How are you feeling today?</h2>
                  <p className="text-xs text-slate-500">Choose the mood that best describe you.</p>
                </div>

                {/* 4 Mood Cards Grid (Frame 27) */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {[
                    { id: 'happy', label: 'Happy', emoji: '😊', desc: 'Feeling good', border: 'border-amber-400', bg: 'bg-amber-50' },
                    { id: 'sad', label: 'Sad', emoji: '😢', desc: 'Feeling low', border: 'border-blue-400', bg: 'bg-blue-50' },
                    { id: 'angry', label: 'Angry', emoji: '😡', desc: 'Feeling mad', border: 'border-red-400', bg: 'bg-red-50' },
                    { id: 'calm', label: 'Calm', emoji: '😌', desc: 'Feeling serene', border: 'border-lime-400', bg: 'bg-lime-50' },
                  ].map((mood) => {
                    const isSelected = selectedMood === mood.id;
                    return (
                      <div
                        key={mood.id}
                        onClick={() => setSelectedMood(mood.id as any)}
                        className={`p-4 rounded-3xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-2 relative shadow-xs ${
                          isSelected 
                            ? `${mood.border} ${mood.bg} ring-2 ring-emerald-500/20 scale-102` 
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-lime-500 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                        <span className="text-4xl">{mood.emoji}</span>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{mood.label}</h4>
                          <span className="text-[10px] text-slate-400">{mood.desc}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <button
                  onClick={() => setActiveTab('home')}
                  className="w-full py-3.5 rounded-2xl bg-[#BDD753] hover:bg-[#acc643] text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer mt-4"
                >
                  Continue
                </button>
              </div>
            )}

            {/* 3. JOURNAL ENTRY SCREEN (Frame 29) */}
            {activeTab === 'journal' && (
              <form onSubmit={handleSaveJournal} className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    type="button"
                    onClick={() => setActiveTab('home')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Journal</span>
                  <div className="w-7"></div>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📝</span>
                    <h3 className="text-xs font-bold text-slate-800">Write your Journal</h3>
                  </div>

                  <textarea
                    value={journalText}
                    onChange={(e) => setJournalText(e.target.value)}
                    rows={6}
                    className="w-full p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-lime-500 leading-relaxed resize-none"
                    placeholder="Express your thoughts freely..."
                  />

                  {/* Formatting tools & Save */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <span className="p-1.5 rounded-lg bg-slate-100 hover:text-slate-700 cursor-pointer">🏷️</span>
                      <span className="p-1.5 rounded-lg bg-slate-100 hover:text-slate-700 cursor-pointer">📷</span>
                      <span className="p-1.5 rounded-lg bg-slate-100 hover:text-slate-700 cursor-pointer">✨</span>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2 rounded-xl bg-[#BDD753] hover:bg-[#acc643] text-slate-950 font-bold text-xs shadow-xs flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSaved ? 'Saved!' : 'Save'}</span>
                    </button>
                  </div>
                </div>

                {isSaved && (
                  <div className="p-3 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold text-center animate-fade-in">
                    ✓ Journal entry saved to your reflection calendar!
                  </div>
                )}
              </form>
            )}

            {/* 4. CALENDAR HEATMAP (Frame 30) */}
            {activeTab === 'calendar' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Calendar</span>
                  <div className="w-7"></div>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <ChevronLeft className="w-4 h-4 text-slate-400 cursor-pointer" />
                    <span>May 2026</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 cursor-pointer" />
                  </div>

                  {/* Day header */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>

                  {/* Month grid */}
                  <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                    {[
                      { d: '', mood: null }, { d: '', mood: null }, { d: '', mood: null }, { d: '', mood: null }, { d: 1, mood: '😊' }, { d: 2, mood: '😡' }, { d: 3, mood: '😊' },
                      { d: 4, mood: '😌' }, { d: 5, mood: '😊' }, { d: 6, mood: '😢' }, { d: 7, mood: '😢' }, { d: 8, mood: '😊' }, { d: 9, mood: '😡' }, { d: 10, mood: '😊' },
                      { d: 11, mood: '😌' }, { d: 12, mood: '😊' }, { d: 13, mood: '😊' }, { d: 14, mood: '😢' }, { d: 15, mood: '😡' }, { d: 16, mood: '😊' }, { d: 17, mood: '😌' },
                      { d: 18, mood: '😊' }, { d: 19, mood: '😊' }, { d: 20, mood: '😊' }, { d: 21, mood: '😌' }, { d: 22, mood: '😊' }, { d: 23, mood: '😊' }, { d: 24, mood: '😊' },
                      { d: 25, mood: '😊' }, { d: 26, mood: null }, { d: 27, mood: null }, { d: 28, mood: null }, { d: 29, mood: null }, { d: 30, mood: null }, { d: 31, mood: null },
                    ].map((cell, idx) => (
                      <div
                        key={idx}
                        onClick={() => { if (cell.d) setSelectedDate(cell.d as number); }}
                        className={`h-7 rounded-lg flex flex-col items-center justify-center font-bold text-[9px] cursor-pointer transition-all ${
                          cell.d === selectedDate
                            ? 'bg-slate-900 text-white scale-110 shadow-xs'
                            : cell.d
                            ? 'hover:bg-slate-100 text-slate-700'
                            : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        {cell.mood ? <span>{cell.mood}</span> : <span>{cell.d}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Day Mood Card (Frame 30) */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-red-100 border border-red-200 flex items-center justify-center text-3xl">
                    😡
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">May 09, Thursday</h4>
                    <p className="text-[11px] text-red-600 font-medium">I'm feeling angry today</p>
                    <span className="text-[10px] text-slate-400">Recorded at 8:40 PM</span>
                  </div>
                </div>
              </div>
            )}

            {/* 5. MOOD STATS & CHARTS (Frame 31) */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Mood Stats</span>
                  <div className="w-7"></div>
                </div>

                {/* Range switcher */}
                <div className="flex p-1 rounded-xl bg-slate-200/70 text-xs font-bold">
                  {['week', 'month', 'year'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveStatsRange(range as any)}
                      className={`flex-1 py-1.5 rounded-lg capitalize transition-all ${
                        activeStatsRange === range ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Chart Box (Frame 31) */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">My weekly mood</span>
                    <span className="font-mono text-[11px] text-slate-500">01-07 May 2026</span>
                  </div>

                  {/* SVG Line Graph */}
                  <div className="h-44 w-full bg-amber-50/40 rounded-2xl p-2 flex items-center justify-center relative">
                    <svg viewBox="0 0 300 160" className="w-full h-full">
                      {/* Grid Lines */}
                      <line x1="40" y1="25" x2="280" y2="25" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="40" y1="55" x2="280" y2="55" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="40" y1="85" x2="280" y2="85" stroke="#E2E8F0" strokeDasharray="3 3" />
                      <line x1="40" y1="115" x2="280" y2="115" stroke="#E2E8F0" strokeDasharray="3 3" />

                      {/* Emoji Y-axis */}
                      <text x="10" y="30" fontSize="14">😊</text>
                      <text x="10" y="60" fontSize="14">😡</text>
                      <text x="10" y="90" fontSize="14">😢</text>
                      <text x="10" y="120" fontSize="14">😌</text>

                      {/* Line Chart Path matching Frame 31 */}
                      <path
                        d="M 50 30 L 85 30 L 120 70 L 155 130 L 190 90 L 225 35 L 260 90"
                        fill="none"
                        stroke="#1F2913"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      {/* Plot dots */}
                      {[
                        { x: 50, y: 30 },
                        { x: 85, y: 30 },
                        { x: 120, y: 70 },
                        { x: 155, y: 130 },
                        { x: 190, y: 90 },
                        { x: 225, y: 35 },
                        { x: 260, y: 90 },
                      ].map((dot, idx) => (
                        <circle key={idx} cx={dot.x} cy={dot.y} r="3.5" fill="#BDD753" stroke="#1F2913" strokeWidth="1.5" />
                      ))}

                      {/* X-axis labels */}
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((label, idx) => (
                        <text key={idx} x={50 + idx * 35} y="150" fontSize="10" textAnchor="middle" fill="#64748B" fontWeight="bold">
                          {label}
                        </text>
                      ))}
                    </svg>
                  </div>
                </div>
              </div>
            )}

            {/* 6. REMINDERS SCREEN (Frame 33) */}
            {activeTab === 'reminders' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Remainder</span>
                  <div className="w-7"></div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Today</span>
                  
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Status</span>
                      <span>09:30 am</span>
                    </div>
                    <p className="font-semibold text-slate-800">Todays mood successfully saved.</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-lime-50 border border-lime-200 text-xs space-y-1">
                    <div className="flex justify-between text-[10px] text-lime-800">
                      <span>Daily Prompt</span>
                      <span>08:30 am</span>
                    </div>
                    <p className="font-semibold text-slate-800">A gentle reminder set your mood and save your journal.</p>
                  </div>

                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pt-2">Yesterday</span>
                  
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span>Reflection Alert</span>
                      <span>11:30 am</span>
                    </div>
                    <p className="font-semibold text-slate-800">You were angry yesterday. Would you like to practice breathing exercises?</p>
                  </div>
                </div>
              </div>
            )}

            {/* 7. PROFILE SCREEN (Frame 32) */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('home')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Setting</span>
                  <div className="w-7"></div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 py-2">
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-amber-100">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80" 
                      alt="Orion" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Orion</h3>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 text-xs font-semibold text-slate-700">
                  {['My Profile', 'Mood History', 'Journal Entries', 'Notifications', 'Help & Support', 'About Us'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 hover:text-emerald-700 cursor-pointer">
                      <span>{item}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Curved Bottom Navigation Bar (Frame 28) */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-[#1F2913] flex items-center justify-around px-4 text-lime-200 z-20 shadow-lg">
            <button 
              onClick={() => setActiveTab('home')}
              className={`p-2 transition-transform ${activeTab === 'home' ? 'text-white scale-115' : 'opacity-70'}`}
              title="Home"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('journal')}
              className={`p-2 transition-transform ${activeTab === 'journal' ? 'text-white scale-115' : 'opacity-70'}`}
              title="Journal"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            
            {/* Elevated Center Calendar Button */}
            <button 
              onClick={() => setActiveTab('calendar')}
              className="w-10 h-10 -mt-6 rounded-full bg-[#BDD753] text-slate-950 flex items-center justify-center shadow-lg border-2 border-[#1F2913] hover:scale-110 transition-transform font-bold"
              title="Calendar Heatmap"
            >
              <CalendarIcon className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button 
              onClick={() => setActiveTab('stats')}
              className={`p-2 transition-transform ${activeTab === 'stats' ? 'text-white scale-115' : 'opacity-70'}`}
              title="Mood Stats"
            >
              <BarChart2 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`p-2 transition-transform ${activeTab === 'profile' ? 'text-white scale-115' : 'opacity-70'}`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
