import React, { useState } from 'react';
import { 
  Sparkles, 
  FileText, 
  Video, 
  BarChart3, 
  Briefcase, 
  User, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Search, 
  MessageSquare, 
  Award, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Send,
  UploadCloud,
  Check,
  Zap,
  Star
} from 'lucide-react';

export const AICareerCoachInteractiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'welcome' | 'dashboard' | 'resume' | 'interview' | 'skills' | 'jobs' | 'profile'>('dashboard');
  const [isScanningResume, setIsScanningResume] = useState(false);
  const [resumeUploaded, setResumeUploaded] = useState(true);
  const [interviewMessage, setInterviewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: "Hello Jayanth! I'm your AI Interview Coach. Let's practice behavioral questions for a Product Designer role. Tell me about a time you had to defend a design decision against engineering constraints.",
      time: '10:42 AM'
    }
  ]);

  const handleSendMessage = () => {
    if (!interviewMessage.trim()) return;
    const userMsg = interviewMessage;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: '10:44 AM' }]);
    setInterviewMessage('');

    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: "Excellent structure! You articulated the trade-off clearly using the STAR method. Your speech clarity was 94% and tone was confident. Next question: How do you measure the success of a design system adoption?",
          time: '10:45 AM'
        }
      ]);
    }, 1200);
  };

  const handleScanResume = () => {
    setIsScanningResume(true);
    setTimeout(() => {
      setIsScanningResume(false);
      setResumeUploaded(true);
    }, 1500);
  };

  return (
    <div className="rounded-3xl border border-blue-900/40 bg-slate-950 shadow-2xl overflow-hidden p-3 sm:p-6 text-slate-900">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-blue-900/40">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">AI Career Coach Interactive Prototype</h3>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px] font-mono font-bold">
                Desktop Web App • 8 Screens
              </span>
            </div>
            <p className="text-slate-400 text-xs">ATS resume analyzer, live AI mock interview, skill gap graph & job matching.</p>
          </div>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 max-w-full overflow-x-auto">
          {[
            { id: 'welcome', label: 'Welcome Page' },
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'resume', label: 'Resume Analyzer' },
            { id: 'interview', label: 'Mock Interview' },
            { id: 'skills', label: 'Skill Gap' },
            { id: 'jobs', label: 'Job Matches' },
            { id: 'profile', label: 'Profile Progress' }
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

      {/* Realistic Desktop Browser Shell */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 shadow-2xl overflow-hidden flex flex-col min-h-[580px]">
        {/* Browser Top Bar */}
        <div className="h-9 bg-slate-900 border-b border-slate-800 flex items-center px-4 justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="px-6 py-1 rounded-md bg-slate-950 text-slate-400 text-[11px] font-mono border border-slate-800 flex items-center gap-1.5">
            <span className="text-blue-400">https://</span>aicareercoach.design/app/{activeTab}
          </div>
          <div className="text-[10px] text-slate-500 font-mono">1440 × 900</div>
        </div>

        {/* Browser Content Area */}
        <div className="flex-1 bg-slate-50 flex flex-col md:flex-row overflow-hidden">

          {/* Left Navigation Sidebar (Shown on all app screens except welcome) */}
          {activeTab !== 'welcome' && (
            <div className="w-full md:w-56 bg-white border-r border-slate-200 p-4 flex flex-col justify-between shrink-0">
              <div className="space-y-6">
                {/* Brand */}
                <div className="flex items-center gap-2.5 px-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 tracking-tight">AI Career Coach</h4>
                    <span className="text-[10px] text-blue-600 font-bold block">Pro Scholar</span>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="space-y-1">
                  {[
                    { id: 'dashboard', label: 'Dashboard', icon: <TrendingUp className="w-4 h-4" /> },
                    { id: 'resume', label: 'Resume Analyzer', icon: <FileText className="w-4 h-4" />, badge: 'ATS 84%' },
                    { id: 'interview', label: 'Mock Interview', icon: <Video className="w-4 h-4" />, badge: 'Live AI' },
                    { id: 'skills', label: 'Skill Gap', icon: <BarChart3 className="w-4 h-4" /> },
                    { id: 'jobs', label: 'Job Matches', icon: <Briefcase className="w-4 h-4" />, badge: '12 New' },
                    { id: 'profile', label: 'Profile & Progress', icon: <User className="w-4 h-4" /> }
                  ].map((nav) => (
                    <button
                      key={nav.id}
                      onClick={() => setActiveTab(nav.id as any)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        activeTab === nav.id
                          ? 'bg-blue-50 text-blue-700 font-extrabold border border-blue-100'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {nav.icon}
                        <span>{nav.label}</span>
                      </div>
                      {nav.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${
                          activeTab === nav.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {nav.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Footnote */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5 px-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-bold text-xs text-blue-700">
                  JG
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-slate-900 truncate">Jayanth G</div>
                  <div className="text-[10px] text-slate-400 truncate">jayanthofficial.0610@gmail.com</div>
                </div>
              </div>
            </div>
          )}

          {/* MAIN PAGE VIEW */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[620px]">
            
            {/* 1. WELCOME / LANDING PAGE */}
            {activeTab === 'welcome' && (
              <div className="space-y-6 max-w-4xl mx-auto py-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span className="font-extrabold text-slate-900 text-sm">AI Career Coach</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => setActiveTab('dashboard')}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                    >
                      Get Started Free
                    </button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center pt-4">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
                      <Zap className="w-3.5 h-3.5" />
                      Powered by Gemini 2.5 & ATS Heuristics
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">
                      Land Your Dream Job With <span className="text-blue-600">AI Guidance</span>
                    </h1>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      AI-driven resume optimization, real-time audio mock interviews, automated skill gap mapping, and tailored job matches built for modern tech careers.
                    </p>
                    <div className="flex items-center gap-3 pt-2">
                      <button 
                        onClick={() => setActiveTab('dashboard')}
                        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 cursor-pointer"
                      >
                        Launch Interactive App <ArrowRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setActiveTab('resume')}
                        className="px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
                      >
                        Try Resume Scan
                      </button>
                    </div>
                    <div className="flex items-center gap-3 pt-4 text-xs text-slate-500">
                      <div className="flex -space-x-2">
                        {['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B'].map((c, i) => (
                          <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[10px] text-white font-bold" style={{ backgroundColor: c }}>
                            {['A', 'L', 'S', 'J'][i]}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="flex text-amber-400">
                          {'★'.repeat(5)}
                        </div>
                        <span className="text-[11px] font-semibold text-slate-700">Loved by 10,000+ candidates</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200/80 shadow-lg space-y-3">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                          84%
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">ATS Resume Match</h4>
                          <span className="text-[10px] text-slate-500">Product Designer @ Stripe</span>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Optimized</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span>Career Readiness</span>
                        <span className="text-blue-600">72%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full w-[72%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-5">
                {/* Hero Banner with Circular Score */}
                <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="space-y-1 text-center md:text-left">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                      Target Role: Lead Product Designer
                    </span>
                    <h2 className="text-xl font-extrabold">Ready to Ace Your Dream Job, Jayanth?</h2>
                    <p className="text-xs text-blue-100 max-w-md">
                      Your ATS resume score improved by +14% this week. Complete your design system mock interview to reach top-tier readiness.
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20">
                    <div className="w-14 h-14 rounded-full border-4 border-emerald-400 flex items-center justify-center font-black text-base text-white">
                      72%
                    </div>
                    <div>
                      <div className="text-xs font-bold">Readiness Score</div>
                      <span className="text-[10px] text-emerald-300 font-semibold">Ready for Senior Roles</span>
                    </div>
                  </div>
                </div>

                {/* 4 Metric Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: 'ATS Resume Score', val: '84/100', icon: <FileText className="w-4 h-4 text-emerald-600" />, sub: '+8% vs benchmark' },
                    { label: 'Mock Interviews', val: '6 Completed', icon: <Video className="w-4 h-4 text-blue-600" />, sub: '92% Speech Clarity' },
                    { label: 'Skills Mastered', val: '14 of 18', icon: <BarChart3 className="w-4 h-4 text-purple-600" />, sub: 'Figma, Heuristics' },
                    { label: 'Job Matches', val: '12 Active', icon: <Briefcase className="w-4 h-4 text-amber-600" />, sub: '4 Fast-Track Referrals' },
                  ].map((card, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-bold text-slate-500">{card.label}</span>
                        <div className="p-1.5 rounded-lg bg-slate-50">{card.icon}</div>
                      </div>
                      <div className="text-lg font-black text-slate-900">{card.val}</div>
                      <span className="text-[10px] text-emerald-600 font-semibold">{card.sub}</span>
                    </div>
                  ))}
                </div>

                {/* Split Action: Recent Tasks & Recommended Jobs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recommended Next Steps</h4>
                      <span className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">View Roadmap</span>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: 'Practice Behavioral Interview: Design Heuristics', time: '15 min', tag: 'High Priority', action: () => setActiveTab('interview') },
                        { title: 'Fix Missing ATS Keywords: Design Tokens, WCAG 2.2', time: '5 min', tag: 'Resume', action: () => setActiveTab('resume') },
                        { title: 'Complete Skill Gap Quiz: Design Systems 2.0', time: '10 min', tag: 'Skill', action: () => setActiveTab('skills') }
                      ].map((task, i) => (
                        <div 
                          key={i} 
                          onClick={task.action}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-200 transition-all cursor-pointer flex items-center justify-between"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">{task.title}</span>
                            <span className="text-[10px] text-slate-400">{task.time}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-blue-100 text-blue-700">
                            {task.tag}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">High-Match Opportunities</h4>
                      <button onClick={() => setActiveTab('jobs')} className="text-[10px] text-blue-600 font-bold hover:underline cursor-pointer">
                        See All 12 →
                      </button>
                    </div>

                    <div className="space-y-2">
                      {[
                        { title: 'Design System Lead', company: 'Acme SaaS Corp', match: '94%', salary: '$140k - $165k' },
                        { title: 'Senior Product Designer', company: 'Nova FinTech', match: '88%', salary: '$130k - $155k' }
                      ].map((job, i) => (
                        <div key={i} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-extrabold text-slate-900">{job.title}</div>
                            <span className="text-[10px] text-slate-500">{job.company} • {job.salary}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-black text-emerald-600">{job.match}</span>
                            <span className="text-[9px] text-slate-400 block">AI Match</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. RESUME ANALYZER (ATS Heuristics) */}
            {activeTab === 'resume' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">AI Resume Optimizer & ATS Scanner</h3>
                    <p className="text-xs text-slate-500">Benchmarked against 5,000+ hired Product Designer resumes.</p>
                  </div>
                  <button 
                    onClick={handleScanResume}
                    disabled={isScanningResume}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 cursor-pointer self-start"
                  >
                    <UploadCloud className="w-4 h-4" />
                    {isScanningResume ? 'Scanning Resume...' : 'Re-Scan PDF Resume'}
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {/* Left Column: ATS Score Breakdown */}
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                    <div className="text-center p-3 rounded-xl bg-blue-50 border border-blue-100">
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Overall ATS Score</span>
                      <div className="text-3xl font-black text-slate-900 mt-1">84<span className="text-sm text-slate-400 font-normal">/100</span></div>
                      <span className="text-[10px] text-emerald-600 font-bold">Top 12% of Applicants</span>
                    </div>

                    <div className="space-y-2.5 text-xs">
                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Keyword Match</span>
                          <span className="text-emerald-600">88%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 w-[88%]"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Quantified Impact</span>
                          <span className="text-blue-600">80%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-[80%]"></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>Formatting & Hierarchy</span>
                          <span className="text-purple-600">92%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-purple-500 w-[92%]"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right 2 Columns: Audit Findings & Keyword Suggestions */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Validated Strengths
                      </h4>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Strong action verbs ("Architected", "Engineered", "Conducted usability studies").</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>Clear metrics included (e.g. "reduced cart drop-off by 39%").</span>
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-xs space-y-3 bg-amber-50/40">
                      <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        Missing Keywords to Add
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {['WCAG 2.2 AAA Accessibility', 'Design Tokens', 'Design System Governance', 'Cross-functional OKRs', 'Figma Variables'].map((kw, i) => (
                          <span key={i} className="px-2.5 py-1 rounded-lg bg-white border border-amber-300 text-amber-900 text-xs font-semibold shadow-2xs">
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. MOCK INTERVIEW (Live Interactive AI Chat) */}
            {activeTab === 'interview' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">AI Mock Interview Practice Session</h3>
                    <p className="text-xs text-slate-500">Real-time speech clarity, STAR framework rating & constructive feedback.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      AI Coach Online
                    </span>
                  </div>
                </div>

                {/* Chat Stream Window */}
                <div className="h-64 p-4 rounded-2xl bg-white border border-slate-200 overflow-y-auto space-y-3">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender === 'ai' && (
                        <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                          AI
                        </div>
                      )}
                      <div className={`max-w-md p-3 rounded-2xl text-xs ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                          : 'bg-slate-100 text-slate-800 rounded-tl-none leading-relaxed'
                      }`}>
                        {msg.text}
                        <span className={`block text-[9px] mt-1 ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                          {msg.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={interviewMessage}
                    onChange={(e) => setInterviewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type or dictate your response (e.g. In my previous role at...)"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-600 shadow-2xs"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Answer</span>
                  </button>
                </div>
              </div>
            )}

            {/* 5. SKILL GAP ANALYSIS */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-200">
                  <h3 className="text-sm font-black text-slate-900">Skill Gap Analysis: Lead Product Designer</h3>
                  <p className="text-xs text-slate-500">Comparison of your current skill proficiencies against top employer job descriptions.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Core Competencies Comparison</h4>
                    <div className="space-y-3 text-xs">
                      {[
                        { skill: 'Figma & Auto-Layout', current: 95, target: 90, status: 'Mastered' },
                        { skill: 'User Research & Synthesis', current: 80, target: 85, status: 'Near Target' },
                        { skill: 'Interactive Prototyping', current: 85, target: 80, status: 'Mastered' },
                        { skill: 'Design System Governance', current: 75, target: 90, status: 'Priority Gap' },
                        { skill: 'Front-end Feasibility (HTML/CSS)', current: 65, target: 70, status: 'Minor Gap' }
                      ].map((item, i) => (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>{item.skill}</span>
                            <span className={item.current >= item.target ? 'text-emerald-600' : 'text-blue-600'}>
                              {item.current}% / {item.target}%
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-slate-100 overflow-hidden relative">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.current}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Personalized Upskill Courses</h4>
                    <div className="space-y-2 text-xs">
                      {[
                        { title: 'Design System Tokens Studio with GitHub Sync', duration: '2.5 hrs', provider: 'Figma Academy' },
                        { title: 'Advanced Usability Testing for Senior Roles', duration: '3 hrs', provider: 'Interaction Design Foundation' },
                        { title: 'Designing for WCAG 2.2 AAA Contrast & Keyboard UX', duration: '1.5 hrs', provider: 'WebAIM' }
                      ].map((course, i) => (
                        <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900 block">{course.title}</span>
                            <span className="text-[10px] text-slate-500">{course.provider} • {course.duration}</span>
                          </div>
                          <button className="px-2.5 py-1 rounded bg-blue-600 text-white font-bold text-[10px] hover:bg-blue-700 cursor-pointer">
                            Start
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. JOB MATCHES */}
            {activeTab === 'jobs' && (
              <div className="space-y-4">
                <div className="pb-2 border-b border-slate-200 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Tailored Job Recommendations (12 Matches)</h3>
                    <p className="text-xs text-slate-500">AI-matched using your ATS score and skill gap profile.</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600">Updated 2h ago</span>
                </div>

                <div className="space-y-3">
                  {[
                    { title: 'Design System Lead', company: 'Acme SaaS Corp', loc: 'Bangalore / Remote', match: 94, salary: '₹28 - 36 LPA', tags: ['Figma Variables', 'Tokens', 'Web & Mobile'] },
                    { title: 'Senior Product Designer', company: 'Nova FinTech', loc: 'Remote', match: 88, salary: '₹24 - 30 LPA', tags: ['Design Sprints', 'Mobile Banking', 'Design Systems'] },
                    { title: 'UI/UX Interaction Architect', company: 'CloudCorp Inc', loc: 'Hyderabad / Hybrid', match: 82, salary: '₹22 - 28 LPA', tags: ['Enterprise UX', 'Design Thinking'] }
                  ].map((job, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-black text-slate-900">{job.title}</h4>
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            {job.match}% AI Match
                          </span>
                        </div>
                        <span className="text-xs text-slate-600 block mt-0.5">{job.company} • {job.loc} • {job.salary}</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {job.tags.map((t, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-medium">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer whitespace-nowrap self-end sm:self-center">
                        Apply with 1-Click
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. PROFILE & PROGRESS */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-base flex items-center justify-center shadow-md shadow-blue-500/30">
                      JG
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Jayanth G</h4>
                      <p className="text-xs text-slate-500">Lead UI/UX Designer & Product Strategist</p>
                      <span className="text-[10px] text-blue-600 font-mono font-semibold">jayanthofficial.0610@gmail.com</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                    Job Seeker Active
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Weekly Improvement Trend</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      You've gained +18 points in Interview Confidence and +14 points in ATS Resume Compatibility over the last 30 days.
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-xs font-bold text-emerald-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Ready to apply to Tier 1 Product Companies</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Career Badges Earned</h5>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {['ATS Resume Master', 'Interview Pro (92%)', 'Figma Token Leader', 'Fast Responder'].map((badge, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold">
                          🎖️ {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
