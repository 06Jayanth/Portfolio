import React, { useState } from 'react';
import { 
  Users, 
  Layers, 
  Calendar, 
  CheckSquare, 
  Star, 
  Bot, 
  Download, 
  Settings, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  ArrowUpRight, 
  Check, 
  X,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

export const QuinternInteractiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'interns' | 'attendance' | 'tasks' | 'evaluation' | 'ai' | 'export'>('dashboard');
  const [internSearch, setInternSearch] = useState('');
  const [filterDomain, setFilterDomain] = useState<'all' | 'ui-ux' | 'frontend' | 'ai-ml'>('all');
  const [exportFormat, setExportFormat] = useState<'csv' | 'xlsx' | 'pdf'>('xlsx');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Intern Roster data matching screenshot
  const [interns, setInterns] = useState([
    { id: 'INT-01', name: 'Aarav Sharma', role: 'UI/UX Design', domain: 'ui-ux', college: 'RV College of Engg', mentor: 'Jayanth G', score: 96, attendance: '98%', status: 'Active' },
    { id: 'INT-02', name: 'Pooja Hegde', role: 'Frontend (React)', domain: 'frontend', college: 'PES University', mentor: 'Dev Team Lead', score: 91, attendance: '94%', status: 'Active' },
    { id: 'INT-03', name: 'Rohan Varma', role: 'AI / ML Engineer', domain: 'ai-ml', college: 'BMS College', mentor: 'AI Lead', score: 88, attendance: '92%', status: 'Review' },
    { id: 'INT-04', name: 'Sneha Kulkarni', role: 'UI/UX Design', domain: 'ui-ux', college: 'MS Ramaiah', mentor: 'Jayanth G', score: 94, attendance: '96%', status: 'Active' },
    { id: 'INT-05', name: 'Vikram Mehta', role: 'Backend Node.js', domain: 'frontend', college: 'IIIT Bangalore', mentor: 'Arch Lead', score: 85, attendance: '90%', status: 'Active' },
  ]);

  // Tasks verification queue
  const [tasks, setTasks] = useState([
    { id: 'TSK-101', title: 'FoodGo Mobile Checkout UI Redesign', intern: 'Aarav Sharma', domain: 'UI/UX', submitted: 'Today 11:30 AM', status: 'Pending Review' },
    { id: 'TSK-102', title: 'Design Token Exporter API Endpoint', intern: 'Pooja Hegde', domain: 'Frontend', submitted: 'Yesterday', status: 'Approved' },
    { id: 'TSK-103', title: 'ATS Keyword Embeddings Model v2', intern: 'Rohan Varma', domain: 'AI/ML', submitted: '2 days ago', status: 'Pending Review' }
  ]);

  const handleApproveTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: 'Approved' } : t));
  };

  const handleTriggerExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1200);
  };

  const filteredInterns = interns.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(internSearch.toLowerCase()) || i.role.toLowerCase().includes(internSearch.toLowerCase());
    const matchesDomain = filterDomain === 'all' || i.domain === filterDomain;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="rounded-3xl border border-purple-900/50 bg-[#0B0F19] shadow-2xl overflow-hidden p-3 sm:p-6 text-slate-100">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-purple-900/30 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-purple-900/40">
            Q
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">Quintern Interactive SaaS Prototype</h3>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono font-bold">
                Dark SaaS • 11 Frames
              </span>
            </div>
            <p className="text-slate-400 text-xs">Workforce management, intern rosters, attendance heatmaps & task verification.</p>
          </div>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-purple-900/40 max-w-full overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'interns', label: 'Intern Roster' },
            { id: 'attendance', label: 'Attendance Matrix' },
            { id: 'tasks', label: 'Task Verification' },
            { id: 'evaluation', label: 'Ratings & Review' },
            { id: 'ai', label: 'AI Assistant' },
            { id: 'export', label: 'Export Data' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Realistic Dark SaaS Browser Shell */}
      <div className="rounded-2xl border border-purple-900/40 bg-[#0F172A]/70 shadow-2xl overflow-hidden flex flex-col min-h-[580px]">
        {/* Browser Top Bar */}
        <div className="h-9 bg-[#0B0F19] border-b border-purple-900/30 flex items-center px-4 justify-between select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
          </div>
          <div className="px-6 py-1 rounded-md bg-[#070A12] text-slate-400 text-[11px] font-mono border border-purple-900/30 flex items-center gap-1.5">
            <span className="text-purple-400">https://</span>quintern.enterprise.io/{activeTab}
          </div>
          <div className="text-[10px] text-purple-400 font-mono">ADMIN PORTAL</div>
        </div>

        {/* Dashboard Shell with Left Nav */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-[#0A0E17]">
          
          {/* Left Navigation */}
          <div className="w-full md:w-56 bg-[#0D121F] border-r border-purple-900/30 p-4 flex flex-col justify-between shrink-0">
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 px-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center font-black text-xs text-white">
                  Q
                </div>
                <div>
                  <h4 className="text-xs font-black text-white tracking-wider">QUINTERN</h4>
                  <span className="text-[9px] text-purple-400 font-bold block">Enterprise Workforce</span>
                </div>
              </div>

              <div className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: <Layers className="w-4 h-4" /> },
                  { id: 'interns', label: 'Interns', icon: <Users className="w-4 h-4" />, count: '245' },
                  { id: 'attendance', label: 'Attendance', icon: <Calendar className="w-4 h-4" /> },
                  { id: 'tasks', label: 'Tasks & Verification', icon: <CheckSquare className="w-4 h-4" />, count: '3' },
                  { id: 'evaluation', label: 'Rating & Evaluation', icon: <Star className="w-4 h-4" /> },
                  { id: 'ai', label: 'AI Assistant', icon: <Bot className="w-4 h-4" /> },
                  { id: 'export', label: 'Export Reports', icon: <Download className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === item.id
                        ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40'
                        : 'text-slate-400 hover:bg-slate-800/60 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    {item.count && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300 font-mono font-bold">
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-purple-900/20 flex items-center gap-2.5 px-2">
              <div className="w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-xs text-purple-300">
                AD
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">Administrator</div>
                <div className="text-[10px] text-purple-400 truncate">jayanthofficial.0610@gmail.com</div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Canvas */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto max-h-[620px] text-slate-100">

            {/* 1. DASHBOARD VIEW */}
            {activeTab === 'dashboard' && (
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-extrabold text-white">Welcome back, Admin!</h2>
                    <p className="text-xs text-slate-400">Internship Program 2026 • Summer Cohort Performance</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setActiveTab('export')}
                      className="px-3 py-1.5 rounded-xl bg-purple-900/40 border border-purple-500/30 text-purple-300 text-xs font-bold hover:bg-purple-800/50 flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Export Data
                    </button>
                  </div>
                </div>

                {/* 4 Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { label: 'Active Interns', val: '245', change: '+18 this month', color: 'text-purple-400' },
                    { label: 'Active Projects', val: '18', change: '4 Ready for Demo', color: 'text-blue-400' },
                    { label: 'Avg Attendance', val: '94.2%', change: '+2.4% vs Spring', color: 'text-emerald-400' },
                    { label: 'Tasks Verified', val: '1,234', change: '96% on schedule', color: 'text-amber-400' },
                  ].map((stat, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#0F1626] border border-purple-900/30 shadow-xs">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1">{stat.label}</span>
                      <div className={`text-2xl font-black ${stat.color}`}>{stat.val}</div>
                      <span className="text-[10px] text-slate-400 block mt-1">{stat.change}</span>
                    </div>
                  ))}
                </div>

                {/* Performance Curve Simulation & Project Status */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 p-4 rounded-2xl bg-[#0F1626] border border-purple-900/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Cohort Performance Velocity</h4>
                      <span className="text-[10px] text-purple-400 font-mono font-bold">Weekly Aggregate</span>
                    </div>
                    {/* SVG Vector Wave Graph */}
                    <div className="h-36 w-full relative flex items-end pt-4">
                      <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0,70 Q60,30 120,55 T240,25 T360,40 T400,20 L400,100 L0,100 Z"
                          fill="url(#purpleGrad)"
                        />
                        <path
                          d="M0,70 Q60,30 120,55 T240,25 T360,40 T400,20"
                          fill="none"
                          stroke="#A855F7"
                          strokeWidth="3"
                        />
                        <circle cx="240" cy="25" r="4" fill="#A855F7" className="animate-ping" />
                        <circle cx="240" cy="25" r="4" fill="#FFFFFF" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1 border-t border-purple-900/20">
                      <span>Week 1</span>
                      <span>Week 2</span>
                      <span>Week 3</span>
                      <span>Week 4 (Sprint Peak)</span>
                    </div>
                  </div>

                  {/* Active Projects Quick Card */}
                  <div className="p-4 rounded-2xl bg-[#0F1626] border border-purple-900/30 space-y-3">
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">Priority Projects</h4>
                    <div className="space-y-2.5 text-xs">
                      {[
                        { name: 'FinTech Mobile App', leads: '6 Interns', progress: '92%' },
                        { name: 'AI Resume Scanner', leads: '4 Interns', progress: '84%' },
                        { name: 'E-Commerce Revamp', leads: '5 Interns', progress: '76%' },
                      ].map((proj, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-900/60 border border-purple-900/20">
                          <div className="flex justify-between font-bold text-slate-200">
                            <span>{proj.name}</span>
                            <span className="text-purple-400">{proj.progress}</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-purple-500 rounded-full" style={{ width: proj.progress }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. INTERNS DIRECTORY */}
            {activeTab === 'interns' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-purple-900/30">
                  <div>
                    <h3 className="text-sm font-black text-white">Intern Workforce Directory</h3>
                    <p className="text-xs text-slate-400">Browse, filter, and track performance scores for all 245 active interns.</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        value={internSearch}
                        onChange={(e) => setInternSearch(e.target.value)}
                        placeholder="Search intern or role..."
                        className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-purple-900/40 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                      />
                    </div>
                    <select
                      value={filterDomain}
                      onChange={(e) => setFilterDomain(e.target.value as any)}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-purple-900/40 text-xs text-slate-300"
                    >
                      <option value="all">All Domains</option>
                      <option value="ui-ux">UI/UX Design</option>
                      <option value="frontend">Frontend</option>
                      <option value="ai-ml">AI / ML</option>
                    </select>
                  </div>
                </div>

                {/* Table View */}
                <div className="rounded-2xl border border-purple-900/30 overflow-hidden bg-[#0F1626]">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#0B0F19] text-slate-400 font-bold border-b border-purple-900/20">
                      <tr>
                        <th className="p-3">Intern Name</th>
                        <th className="p-3">Domain Role</th>
                        <th className="p-3">University</th>
                        <th className="p-3">Mentor</th>
                        <th className="p-3 text-center">Score</th>
                        <th className="p-3 text-center">Attendance</th>
                        <th className="p-3 text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-900/10">
                      {filteredInterns.map((intern) => (
                        <tr key={intern.id} className="hover:bg-purple-900/10 transition-colors">
                          <td className="p-3 font-bold text-white flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-[10px] text-purple-300">
                              {intern.name[0]}
                            </div>
                            {intern.name}
                          </td>
                          <td className="p-3 text-slate-300">{intern.role}</td>
                          <td className="p-3 text-slate-400">{intern.college}</td>
                          <td className="p-3 text-purple-300">{intern.mentor}</td>
                          <td className="p-3 text-center font-bold text-emerald-400">{intern.score}%</td>
                          <td className="p-3 text-center font-mono text-slate-300">{intern.attendance}</td>
                          <td className="p-3 text-right">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              intern.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              {intern.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 3. ATTENDANCE MATRIX */}
            {activeTab === 'attendance' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-purple-900/30">
                  <div>
                    <h3 className="text-sm font-black text-white">Monthly Attendance Management & Heatmap</h3>
                    <p className="text-xs text-slate-400">May 2026 • 94.2% Attendance Rate across 245 Interns</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Present</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Leave</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Absent</span>
                  </div>
                </div>

                {/* Simulated Attendance Calendar Grid */}
                <div className="p-4 rounded-2xl bg-[#0F1626] border border-purple-900/30 space-y-3">
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-1">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 28 }).map((_, i) => {
                      const day = i + 1;
                      const isWeekend = (i % 7 === 5) || (i % 7 === 6);
                      const isAbsent = day === 12 || day === 19;
                      const isLeave = day === 8;
                      return (
                        <div 
                          key={i} 
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isWeekend
                              ? 'bg-slate-900/30 border-slate-800 text-slate-600'
                              : isAbsent
                              ? 'bg-red-500/10 border-red-500/30 text-red-300'
                              : isLeave
                              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                              : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 font-bold'
                          }`}
                        >
                          <span className="text-xs font-mono">{day}</span>
                          <span className="block text-[9px] mt-0.5 opacity-80">
                            {isWeekend ? 'Off' : isAbsent ? 'Absent' : isLeave ? 'Leave' : '98%'}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 4. TASK VERIFICATION */}
            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-purple-900/30">
                  <div>
                    <h3 className="text-sm font-black text-white">Task Verification & Submission Queue</h3>
                    <p className="text-xs text-slate-400">Review deliverables submitted by interns before milestone sign-off.</p>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-purple-900/40 text-purple-300 text-xs font-bold">
                    3 Pending Approvals
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 rounded-2xl bg-[#0F1626] border border-purple-900/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-purple-400 text-xs font-bold">{task.id}</span>
                          <h4 className="text-xs font-black text-white">{task.title}</h4>
                        </div>
                        <span className="text-xs text-slate-400 block mt-1">
                          Submitted by <strong className="text-slate-200">{task.intern}</strong> ({task.domain}) • {task.submitted}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        {task.status === 'Approved' ? (
                          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Approved
                          </span>
                        ) : (
                          <button
                            onClick={() => handleApproveTask(task.id)}
                            className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" /> Approve Task
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. RATINGS & EVALUATION */}
            {activeTab === 'evaluation' && (
              <div className="space-y-4">
                <div className="pb-2 border-b border-purple-900/30">
                  <h3 className="text-sm font-black text-white">360-Degree Intern Evaluation & Ranking</h3>
                  <p className="text-xs text-slate-400">Performance appraisal scores based on speed, code/design quality, and mentor reviews.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {interns.slice(0, 4).map((intern, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-[#0F1626] border border-purple-900/30 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-purple-600/30 border border-purple-500/40 flex items-center justify-center font-bold text-sm text-purple-300">
                            {intern.name[0]}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">{intern.name}</h4>
                            <span className="text-[10px] text-slate-400">{intern.role}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-black text-emerald-400">{intern.score}/100</div>
                          <div className="text-amber-400 text-xs">{'★'.repeat(5)}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1 border-t border-purple-900/20">
                        <div className="p-2 rounded-xl bg-slate-900/60">
                          <span className="text-[9px] text-slate-400 block">Autonomy</span>
                          <strong className="text-purple-300">9.5/10</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900/60">
                          <span className="text-[9px] text-slate-400 block">Quality</span>
                          <strong className="text-purple-300">9.8/10</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-900/60">
                          <span className="text-[9px] text-slate-400 block">Punctuality</span>
                          <strong className="text-purple-300">{intern.attendance}</strong>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. AI ASSISTANT */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <div className="pb-2 border-b border-purple-900/30">
                  <h3 className="text-sm font-black text-white">Quintern AI Workforce Assistant</h3>
                  <p className="text-xs text-slate-400">Ask automated questions about cohort velocity, pending reviews, and skill deficiencies.</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0F1626] border border-purple-900/30 space-y-4">
                  <div className="p-3 rounded-xl bg-purple-950/50 border border-purple-800/40 text-xs text-purple-200 leading-relaxed">
                    <strong className="block text-purple-300 font-bold mb-1">🤖 AI Cohort Briefing:</strong>
                    "UI/UX Design interns have completed 96% of sprint deliverables ahead of deadline. Aarav Sharma and Sneha Kulkarni demonstrated exceptional proficiency in Figma Variables & token management. Recommend fast-tracking both for junior design associate offers."
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-purple-900/20">
                      <span className="text-[10px] text-slate-400 block">Recommended Action</span>
                      <strong className="text-white">Schedule Mock Design Crit for Week 5</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/60 border border-purple-900/20">
                      <span className="text-[10px] text-slate-400 block">Skill Bottleneck</span>
                      <strong className="text-amber-400">Backend GraphQL API integration</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. EXPORT DATA MODAL */}
            {activeTab === 'export' && (
              <div className="max-w-md mx-auto p-5 rounded-2xl bg-[#0F1626] border border-purple-900/40 shadow-xl space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-10 h-10 rounded-2xl bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto">
                    <Download className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black text-white">Export Intern Analytics</h3>
                  <p className="text-xs text-slate-400">Download filtered intern data, task verification logs, and attendance summaries.</p>
                </div>

                {/* Format selection */}
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  {[
                    { id: 'xlsx', label: 'Excel (.xlsx)', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> },
                    { id: 'csv', label: 'CSV Format', icon: <FileText className="w-4 h-4 text-blue-400" /> },
                    { id: 'pdf', label: 'PDF Report', icon: <FileText className="w-4 h-4 text-red-400" /> },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      onClick={() => setExportFormat(fmt.id as any)}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                        exportFormat === fmt.id ? 'bg-purple-600/30 border-purple-500 text-white' : 'bg-slate-900/60 border-purple-900/20 text-slate-400'
                      }`}
                    >
                      {fmt.icon}
                      <span>{fmt.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleTriggerExport}
                  disabled={isExporting}
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isExporting ? 'Generating Report...' : exportSuccess ? 'Report Downloaded!' : 'Download Export Report'}
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

    </div>
  );
};
