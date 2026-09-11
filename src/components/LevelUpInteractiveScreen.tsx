import React, { useState } from 'react';
import { 
  BookOpen, 
  Award, 
  Trophy, 
  User, 
  Flame, 
  CheckCircle, 
  Clock, 
  ChevronRight, 
  ArrowLeft, 
  Play, 
  Check, 
  Sparkles,
  HelpCircle,
  BarChart,
  LogOut,
  Bell
} from 'lucide-react';

export const LevelUpInteractiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'quiz' | 'rewards' | 'leaderboard' | 'profile'>('courses');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(0); // Default to option 0: User Experience
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [leaderboardRange, setLeaderboardRange] = useState<'daily' | 'monthly' | 'alltime'>('monthly');
  const [claimedReward, setClaimedReward] = useState(false);
  const [userXp, setUserXp] = useState(90);

  const quizOptions = [
    { label: 'A', text: 'User Experience', isCorrect: true },
    { label: 'B', text: 'User Extension', isCorrect: false },
    { label: 'C', text: 'Unified Experience', isCorrect: false },
    { label: 'D', text: 'User Execution', isCorrect: false },
  ];

  const handleClaim = () => {
    if (!claimedReward) {
      setClaimedReward(true);
      setUserXp((prev) => Math.min(100, prev + 10));
    }
  };

  return (
    <div className="rounded-3xl border border-blue-900/40 bg-slate-950 shadow-2xl overflow-hidden p-3 sm:p-6 text-slate-900">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-900/40">
            LU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">LevelUp Interactive Prototype</h3>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold">
                iPhone 17 Frames 1-18
              </span>
            </div>
            <p className="text-slate-400 text-xs">Gamified design learning platform with live quizzes & XP leaderboards.</p>
          </div>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 max-w-full overflow-x-auto">
          {[
            { id: 'courses', label: 'Courses Feed' },
            { id: 'quiz', label: 'Interactive Quiz' },
            { id: 'rewards', label: 'XP & Streaks' },
            { id: 'leaderboard', label: 'Leaderboard' },
            { id: 'profile', label: 'Sia Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white font-bold shadow-sm'
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
        <div className="w-full max-w-[380px] bg-slate-50 rounded-[44px] shadow-2xl border-[10px] border-slate-800 relative overflow-hidden flex flex-col min-h-[640px] max-h-[700px] select-none">
          
          {/* iOS Status Bar */}
          <div className="w-full h-7 bg-slate-50 flex items-center justify-between px-6 text-[11px] font-bold text-slate-800 select-none z-20 shrink-0">
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
            
            {/* 1. COURSES FEED (iPhone 17 - Course Frames) */}
            {activeTab === 'courses' && (
              <div className="space-y-4">
                {/* Header with Sia */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">Hi, Sia!</h2>
                    <p className="text-[11px] text-slate-500">Ready to boost your design skills?</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 shadow-2xs">
                      <Bell className="w-4 h-4" />
                    </button>
                    <div 
                      onClick={() => setActiveTab('profile')}
                      className="w-9 h-9 rounded-full bg-blue-100 border-2 border-white overflow-hidden shadow-2xs cursor-pointer"
                    >
                      <img 
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80" 
                        alt="Sia" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Hero Learning Progress Card */}
                <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold tracking-wide uppercase text-blue-200 text-[10px]">Learning Progress</span>
                    <span className="font-mono font-extrabold text-amber-300">81%</span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-base font-black">Fundamentals of Design</h3>
                    <p className="text-[11px] text-blue-100">Module 4: Wireframing & Usability</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-blue-900/50 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full w-[81%] transition-all"></div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-blue-200">9 of 11 lessons finished</span>
                    <button
                      onClick={() => setActiveTab('quiz')}
                      className="px-3 py-1.5 rounded-xl bg-white text-blue-900 font-bold text-xs hover:bg-blue-50 shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>Quiz Time</span>
                    </button>
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 block">Course Categories</span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 cursor-pointer hover:border-blue-300">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                        ✒️
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">UI/UX Design</h4>
                      <p className="text-[10px] text-slate-400">14 modules • Certification</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 cursor-pointer hover:border-blue-300">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                        🎨
                      </div>
                      <h4 className="text-xs font-bold text-slate-900">Graphic Design</h4>
                      <p className="text-[10px] text-slate-400">8 modules • Color theory</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. INTERACTIVE QUIZ TIME (iPhone 17 - Quiz Frames) */}
            {activeTab === 'quiz' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('courses')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Quiz Time</span>
                  <button 
                    onClick={() => setActiveTab('rewards')}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-800"
                  >
                    Skip
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-blue-600">Question 3 out of 10</span>
                  <h3 className="text-base font-black text-slate-900 leading-snug">
                    What does UX stand for?
                  </h3>
                </div>

                {/* Multiple Choice Radio List */}
                <div className="space-y-2.5 pt-1">
                  {quizOptions.map((opt, idx) => {
                    const isSelected = selectedAnswer === idx;
                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          setSelectedAnswer(idx);
                          setIsAnswerSubmitted(true);
                        }}
                        className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/80 shadow-xs'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {opt.label}
                          </span>
                          <span className={`text-xs font-semibold ${isSelected ? 'text-blue-950 font-bold' : 'text-slate-700'}`}>
                            {opt.text}
                          </span>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {isAnswerSubmitted && selectedAnswer === 0 && (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-semibold flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Correct! User Experience encompasses all aspects of the end-user's interaction. (+10 XP)</span>
                  </div>
                )}

                <button
                  onClick={() => setActiveTab('rewards')}
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer mt-3"
                >
                  Next Question →
                </button>
              </div>
            )}

            {/* 3. REWARDS & STREAKS (iPhone 17 - Rewards Frames) */}
            {activeTab === 'rewards' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('courses')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Rewards & XP</span>
                  <div className="w-7"></div>
                </div>

                {/* Level Card */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs text-center space-y-2">
                  <span className="text-xs font-bold text-blue-600">Level 2</span>
                  <div className="text-2xl font-black text-slate-900">{userXp} / 100 XP</div>

                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${userXp}%` }}></div>
                  </div>

                  <button
                    onClick={handleClaim}
                    disabled={claimedReward}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                      claimedReward
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                    }`}
                  >
                    {claimedReward ? '✓ Daily Reward Claimed (+10 XP)' : 'Claim Daily Rewards (+10 XP)'}
                  </button>
                </div>

                {/* Stats */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-800 block">Your Stats</span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center space-y-0.5">
                      <span className="text-[10px] text-slate-400 block">Total Done</span>
                      <span className="text-base font-extrabold text-slate-900 block">45</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center space-y-0.5">
                      <span className="text-[10px] text-slate-400 block">Time Spent</span>
                      <span className="text-base font-extrabold text-slate-900 block">12h</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 text-center space-y-0.5">
                      <span className="text-[10px] text-amber-500 font-bold block">🔥 Streak</span>
                      <span className="text-base font-extrabold text-slate-900 block">18 days</span>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-slate-800 block">Achievement Badges</span>
                  <div className="flex gap-2">
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 flex-1 flex items-center gap-2">
                      <span className="text-2xl">🥈</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Silver Medal</h4>
                        <span className="text-[10px] text-slate-400">Design Prodigy</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white border border-slate-200 flex-1 flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Super Streak</h4>
                        <span className="text-[10px] text-slate-400">18 Days Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. LEADERBOARD (iPhone 17 - Leaderboard Frames) */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('courses')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Leaderboard</span>
                  <div className="w-7"></div>
                </div>

                {/* Range Filter */}
                <div className="flex p-1 rounded-xl bg-slate-200/80 text-xs font-bold">
                  {['daily', 'monthly', 'alltime'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setLeaderboardRange(range as any)}
                      className={`flex-1 py-1 rounded-lg capitalize transition-all ${
                        leaderboardRange === range ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Top 3 Podium Cards */}
                <div className="p-4 rounded-3xl bg-gradient-to-b from-blue-900 to-indigo-900 text-white shadow-md flex items-end justify-around pt-8 pb-3">
                  {/* 2nd Place */}
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-xs">🥈</span>
                    <div className="w-10 h-10 rounded-full border-2 border-slate-300 overflow-hidden bg-slate-700">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Ryn" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] font-bold">Ryn</span>
                    <span className="text-[10px] text-blue-200">3.8k XP</span>
                  </div>

                  {/* 1st Place (Center Podium) */}
                  <div className="flex flex-col items-center space-y-1 -mt-5">
                    <span className="text-lg">👑</span>
                    <div className="w-12 h-12 rounded-full border-2 border-amber-400 overflow-hidden bg-amber-600 shadow-lg">
                      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Sia" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-extrabold text-amber-300">Sia (You)</span>
                    <span className="text-[11px] font-bold text-white">4.5k XP</span>
                  </div>

                  {/* 3rd Place */}
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-xs">🥉</span>
                    <div className="w-10 h-10 rounded-full border-2 border-amber-600 overflow-hidden bg-slate-700">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Anaya" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] font-bold">Anaya</span>
                    <span className="text-[10px] text-blue-200">3.1k XP</span>
                  </div>
                </div>

                {/* Weekly Ranking List */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block text-[11px]">Weekly Ranking</span>
                  {[
                    { rank: '04', name: 'Cayden', xp: '2.8k XP' },
                    { rank: '05', name: 'Aarav', xp: '2.5k XP' },
                  ].map((user) => (
                    <div key={user.rank} className="flex items-center justify-between py-1 border-b border-slate-100 last:border-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-slate-400 font-bold text-[10px]">{user.rank}</span>
                        <span className="font-semibold text-slate-800">{user.name}</span>
                      </div>
                      <span className="font-mono text-blue-600 font-bold">{user.xp}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SIA PROFILE (iPhone 17 - Profile Frames) */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('courses')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Profile</span>
                  <div className="w-7"></div>
                </div>

                <div className="flex flex-col items-center justify-center space-y-2 py-2">
                  <div className="w-20 h-20 rounded-full border-4 border-white shadow-md overflow-hidden bg-blue-100">
                    <img 
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80" 
                      alt="Sia" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Sia Patel</h3>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
                    Product Design Scholar
                  </span>
                </div>

                <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2 text-xs font-semibold text-slate-700">
                  {['View Profile', 'History', 'My Certificates', 'Notifications', 'Help & Feedback'].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 hover:text-blue-600 cursor-pointer">
                      <span>{item}</span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Bottom Dock Navigation */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-white border-t border-slate-200 flex items-center justify-around px-4 text-slate-400 z-20 shadow-lg">
            <button 
              onClick={() => setActiveTab('courses')}
              className={`p-2 transition-colors ${activeTab === 'courses' ? 'text-blue-600' : 'hover:text-slate-600'}`}
              title="Courses"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('quiz')}
              className={`p-2 transition-colors ${activeTab === 'quiz' ? 'text-blue-600' : 'hover:text-slate-600'}`}
              title="Quiz"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('rewards')}
              className={`p-2 transition-colors ${activeTab === 'rewards' ? 'text-blue-600' : 'hover:text-slate-600'}`}
              title="Rewards"
            >
              <Award className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('leaderboard')}
              className={`p-2 transition-colors ${activeTab === 'leaderboard' ? 'text-blue-600' : 'hover:text-slate-600'}`}
              title="Leaderboard"
            >
              <Trophy className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('profile')}
              className={`p-2 transition-colors ${activeTab === 'profile' ? 'text-blue-600' : 'hover:text-slate-600'}`}
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
