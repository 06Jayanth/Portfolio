import React, { useState } from 'react';
import { 
  Wallet, 
  TrendingUp, 
  PlusCircle, 
  Target, 
  Bot, 
  PieChart, 
  User, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Coins, 
  Check, 
  Plus, 
  ChevronRight, 
  Sparkles,
  ShieldCheck,
  CreditCard,
  Layers,
  Calendar
} from 'lucide-react';

export const FinFlowInteractiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stack' | 'home' | 'expense' | 'goals' | 'ai' | 'analytics'>('home');
  const [balance, setBalance] = useState(50450);
  const [expenseAmount, setExpenseAmount] = useState('850');
  const [selectedCategory, setSelectedCategory] = useState('Food');
  const [coinCount, setCoinCount] = useState(5);
  const [expenseSuccess, setExpenseSuccess] = useState(false);

  const transactions = [
    { id: 'tx-1', title: 'Swiggy Gourmet Dining', cat: 'Food & Dining', amount: -850, date: 'Today, 1:45 PM', type: 'debit' },
    { id: 'tx-2', title: 'Freelance UI Design Payout', cat: 'Income Transfer', amount: 25000, date: 'Yesterday', type: 'credit' },
    { id: 'tx-3', title: 'Uber Premier Cab', cat: 'Transport', amount: -340, date: '3 Sep 2026', type: 'debit' },
    { id: 'tx-4', title: 'Netflix 4K Ultra Sub', cat: 'Entertainment', amount: -649, date: '1 Sep 2026', type: 'debit' }
  ];

  const goals = [
    { id: 'g-1', title: 'MacBook Pro M3 Max', current: 85000, target: 120000, pct: 70, color: 'bg-emerald-500' },
    { id: 'g-2', title: 'Trip to Goa with Friends', current: 15000, target: 20000, pct: 75, color: 'bg-amber-500' },
    { id: 'g-3', title: 'Emergency Savings Fund', current: 45000, target: 60000, pct: 75, color: 'bg-blue-500' }
  ];

  const handleAddCoin = () => {
    setCoinCount(prev => (prev < 10 ? prev + 1 : 1));
  };

  const handleLogExpense = () => {
    const num = Number(expenseAmount) || 0;
    if (num <= 0) return;
    setBalance(prev => prev - num);
    setExpenseSuccess(true);
    setTimeout(() => {
      setExpenseSuccess(false);
      setActiveTab('home');
    }, 1200);
  };

  return (
    <div className="rounded-3xl border border-emerald-900/40 bg-slate-950 shadow-2xl overflow-hidden p-3 sm:p-6 text-slate-900">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-emerald-900/40">
            F
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">FinFlow Smart Finance Prototype</h3>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                Mobile App • 12 Frames
              </span>
            </div>
            <p className="text-slate-400 text-xs">Coin stacking animation, expense tracker, goal jars & AI savings insights.</p>
          </div>
        </div>

        {/* Screen Switcher */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 max-w-full overflow-x-auto">
          {[
            { id: 'home', label: 'Home Dashboard' },
            { id: 'stack', label: '🪙 Coin Stacking Intro' },
            { id: 'expense', label: 'Add Expense' },
            { id: 'goals', label: 'Savings Goals' },
            { id: 'ai', label: 'FinBot AI Insights' },
            { id: 'analytics', label: 'Analytics' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Realistic Smartphone Shell */}
      <div className="max-w-sm mx-auto rounded-[40px] border-4 border-slate-700 bg-white shadow-2xl overflow-hidden flex flex-col relative min-h-[580px]">
        
        {/* Top Status Notch */}
        <div className="pt-3 pb-1 px-6 flex justify-between items-center bg-white select-none z-10 border-b border-slate-100">
          <span className="text-xs font-bold text-slate-800">9:41</span>
          <div className="w-20 h-3.5 rounded-full bg-slate-900"></div>
          <div className="flex items-center gap-1 text-slate-700 text-xs">
            <span className="font-mono text-[10px]">5G</span>
            <span>98%</span>
          </div>
        </div>

        {/* Main Phone Content Canvas */}
        <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto bg-[#F8FAFC]">

          {/* 1. COIN STACKING ANIMATION SEQUENCE */}
          {activeTab === 'stack' && (
            <div className="my-auto text-center space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Figma Interactive Sequence</span>
                <h3 className="text-xl font-black text-slate-900">Smart Finance, <span className="text-emerald-600">Simplified</span></h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Watch your micro-savings accumulate coin by coin into tangible wealth goals.
                </p>
              </div>

              {/* Interactive Coin Stack Visualizer */}
              <div className="py-6 flex flex-col items-center justify-center min-h-[160px]">
                <div className="relative flex flex-col-reverse items-center">
                  {Array.from({ length: coinCount }).map((_, i) => (
                    <div
                      key={i}
                      className="w-28 h-7 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 border-2 border-amber-600 shadow-md flex items-center justify-center -mt-3.5 transform transition-all duration-300 hover:scale-105"
                      style={{ zIndex: i + 1 }}
                    >
                      <span className="text-[11px] font-black text-amber-900">₹ 1,000</span>
                    </div>
                  ))}
                </div>
                <span className="text-xs font-extrabold text-amber-900 mt-4">
                  ₹ {(coinCount * 1000).toLocaleString('en-IN')} Saved in Coin Vault
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleAddCoin}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs shadow-md transition-all cursor-pointer"
                >
                  + Drop Another Gold Coin ({coinCount}/10)
                </button>
                <div>
                  <button
                    onClick={() => setActiveTab('home')}
                    className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
                  >
                    Enter Home Dashboard →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. HOME DASHBOARD */}
          {activeTab === 'home' && (
            <div className="space-y-4">
              {/* Header Greeting */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center font-bold text-xs text-emerald-700">
                    JG
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Welcome back</span>
                    <h4 className="text-xs font-black text-slate-900">Hi, Jayanth!</h4>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>

              {/* Total Balance Card */}
              <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-emerald-100 font-bold uppercase tracking-wider">Total Net Balance</span>
                    <div className="text-2xl font-black tracking-tight mt-0.5">
                      ₹ {balance.toLocaleString('en-IN')}.00
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold">
                    78% Budget
                  </span>
                </div>

                <div className="pt-2 border-t border-white/15 flex justify-between text-xs font-semibold">
                  <div>
                    <span className="text-[9px] text-emerald-100 block">Total Savings</span>
                    <strong className="text-sm font-bold">₹ 18,200</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-emerald-100 block">Monthly Inflow</span>
                    <strong className="text-sm font-bold">+₹ 45,000</strong>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                {[
                  { label: 'Add Exp', icon: <PlusCircle className="w-4 h-4 text-emerald-600" />, action: () => setActiveTab('expense') },
                  { label: 'Goals', icon: <Target className="w-4 h-4 text-amber-600" />, action: () => setActiveTab('goals') },
                  { label: 'FinBot', icon: <Bot className="w-4 h-4 text-blue-600" />, action: () => setActiveTab('ai') },
                  { label: 'Analytics', icon: <PieChart className="w-4 h-4 text-purple-600" />, action: () => setActiveTab('analytics') },
                ].map((act, i) => (
                  <button
                    key={i}
                    onClick={act.action}
                    className="p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-emerald-300 transition-all flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <div className="p-2 rounded-xl bg-slate-50">{act.icon}</div>
                    <span className="text-[10px] font-bold text-slate-700">{act.label}</span>
                  </button>
                ))}
              </div>

              {/* Recent Transactions List */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider">Recent Activity</h5>
                  <button onClick={() => setActiveTab('expense')} className="text-[10px] text-emerald-600 font-bold hover:underline cursor-pointer">
                    + Log New
                  </button>
                </div>

                <div className="space-y-1.5">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          tx.type === 'credit' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {tx.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{tx.title}</div>
                          <span className="text-[10px] text-slate-400">{tx.cat} • {tx.date}</span>
                        </div>
                      </div>
                      <span className={`text-xs font-black ${tx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                        {tx.type === 'credit' ? '+' : ''}₹ {Math.abs(tx.amount).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 3. ADD EXPENSE SCREEN */}
          {activeTab === 'expense' && (
            <div className="space-y-4 my-auto">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Fast Expense Entry</span>
                <h4 className="text-sm font-black text-slate-900">Enter Amount Spent</h4>
                <div className="flex items-center justify-center text-3xl font-black text-slate-900 mt-2">
                  <span className="text-emerald-600 mr-1">₹</span>
                  <input
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                    className="w-36 text-center border-b-2 border-emerald-500 focus:outline-none font-mono"
                  />
                </div>
              </div>

              {/* Category selector */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Select Category</span>
                <div className="grid grid-cols-3 gap-2">
                  {['Food', 'Travel', 'Shopping', 'Bills', 'Gaming', 'Health'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCategory(c)}
                      className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === c
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLogExpense}
                disabled={expenseSuccess}
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {expenseSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Expense Logged to Vault!</span>
                  </>
                ) : (
                  <span>Log ₹{expenseAmount || 0} Expense</span>
                )}
              </button>
            </div>
          )}

          {/* 4. SAVINGS GOALS */}
          {activeTab === 'goals' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <div>
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Goal Jars</h4>
                  <p className="text-[10px] text-slate-400">Automated micro-savings allocations</p>
                </div>
                <button className="text-[10px] font-bold text-emerald-600 hover:underline cursor-pointer">
                  + Create Goal
                </button>
              </div>

              <div className="space-y-3">
                {goals.map((g) => (
                  <div key={g.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-extrabold text-slate-900">{g.title}</span>
                      <span className="text-xs font-black text-emerald-600">{g.pct}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full ${g.color} rounded-full`} style={{ width: `${g.pct}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>₹ {g.current.toLocaleString('en-IN')}</span>
                      <span>Target: ₹ {g.target.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. FINBOT AI INSIGHTS */}
          {activeTab === 'ai' && (
            <div className="space-y-3 my-auto">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-slate-900">FinBot Smart Advisor</h5>
                    <span className="text-[9px] text-emerald-700 font-bold">Live Heuristic Analysis</span>
                  </div>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed pt-1">
                  "Great discipline this week, Jayanth! You spent 18% less on food delivery compared to last month. At this velocity, your <strong>MacBook Pro M3 Max</strong> fund will hit 100% 12 days ahead of schedule."
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-slate-200 space-y-1.5 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Suggested Micro-Move:</span>
                <p className="text-slate-600">
                  Round up today's lunch change to auto-deposit ₹45 into your Goa Vacation Jar.
                </p>
                <button 
                  onClick={() => setActiveTab('goals')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-[10px] hover:bg-emerald-700 cursor-pointer"
                >
                  Confirm Round-Up
                </button>
              </div>
            </div>
          )}

          {/* 6. ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <div className="pb-1 border-b border-slate-200">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider">Monthly Breakdown</h4>
                <p className="text-[10px] text-slate-400">Total Spent: ₹ 31,450</p>
              </div>

              {/* Category bars */}
              <div className="space-y-2.5 text-xs">
                {[
                  { cat: 'Food & Dining', val: '34%', amt: '₹ 10,693', color: 'bg-emerald-500' },
                  { cat: 'Housing & Utilities', val: '28%', amt: '₹ 8,806', color: 'bg-blue-500' },
                  { cat: 'Cab & Transit', val: '16%', amt: '₹ 5,032', color: 'bg-amber-500' },
                  { cat: 'Entertainment & Fun', val: '12%', amt: '₹ 3,774', color: 'bg-purple-500' },
                  { cat: 'Health & Fitness', val: '10%', amt: '₹ 3,145', color: 'bg-rose-500' },
                ].map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between font-bold">
                      <span className="text-slate-800">{item.cat}</span>
                      <span className="text-slate-500 font-mono">{item.amt} ({item.val})</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: item.val }}></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-base">🔥</span>
                  <div>
                    <span className="font-bold text-emerald-900 block">24-Day Financial Streak</span>
                    <span className="text-[10px] text-emerald-700">Logged budget daily</span>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-800">+120 XP</span>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation Dock */}
        <div className="h-14 bg-white border-t border-slate-100 px-6 flex items-center justify-between z-10">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-emerald-600' : 'text-slate-400'}`}>
            <Wallet className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">Wallet</span>
          </button>
          <button onClick={() => setActiveTab('expense')} className={`flex flex-col items-center ${activeTab === 'expense' ? 'text-emerald-600' : 'text-slate-400'}`}>
            <PlusCircle className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">Log</span>
          </button>
          <button onClick={() => setActiveTab('goals')} className={`flex flex-col items-center ${activeTab === 'goals' ? 'text-emerald-600' : 'text-slate-400'}`}>
            <Target className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">Goals</span>
          </button>
          <button onClick={() => setActiveTab('analytics')} className={`flex flex-col items-center ${activeTab === 'analytics' ? 'text-emerald-600' : 'text-slate-400'}`}>
            <PieChart className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">Reports</span>
          </button>
        </div>

      </div>

    </div>
  );
};
