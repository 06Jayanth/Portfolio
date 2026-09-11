import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Heart, 
  Mic2, 
  Users, 
  Disc, 
  Sliders, 
  Share2, 
  ListMusic, 
  Sparkles, 
  Radio, 
  Search, 
  Home, 
  Library, 
  Volume2, 
  Flame, 
  ThumbsUp,
  Music2
} from 'lucide-react';

export const SpotifyInteractiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'player' | 'karaoke' | 'party' | 'dna'>('player');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLiked, setIsLiked] = useState(true);
  const [vocalLevel, setVocalLevel] = useState(30); // 0 = Pure Karaoke Instrumental, 100 = Full Vocals
  const [partyReaction, setPartyReaction] = useState<string | null>(null);
  const [queueVotes, setQueueVotes] = useState<Record<string, number>>({ 'q-1': 14, 'q-2': 9, 'q-3': 6 });

  const currentSong = {
    title: 'Starboy (Remix Edition)',
    artist: 'The Weeknd, Daft Punk',
    album: 'Starboy',
    duration: '3:50',
    currentTime: '1:42',
    progress: 44,
    bpm: 186,
    key: 'G Major',
    sample: "Inspired by Giorgio Moroder synth arpeggios & 80s electro-funk"
  };

  const lyrics = [
    { text: "I'm tryna put you in the worst mood, ah", active: false },
    { text: "P1 cleaner than your church shoes, ah", active: false },
    { text: "Milli point two just to hurt you, ah", active: true },
    { text: "All red Lamb' just to tease you, ah", active: false },
    { text: "None of these toys on lease too, ah", active: false }
  ];

  const handleVote = (id: string) => {
    setQueueVotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleSendReaction = (emoji: string) => {
    setPartyReaction(emoji);
    setTimeout(() => setPartyReaction(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-emerald-950 bg-[#090C0A] shadow-2xl overflow-hidden p-3 sm:p-6 text-white">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-white/10 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center text-black font-black text-sm shadow-md shadow-emerald-900/40">
            <Music2 className="w-4 h-4 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">Spotify Mobile Redesign</h3>
              <span className="px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1DB954] text-[10px] font-mono font-bold">
                New Features Added
              </span>
            </div>
            <p className="text-slate-400 text-xs">Live karaoke mode with vocal remover, collaborative listening room, and Song DNA.</p>
          </div>
        </div>

        {/* Screen Switcher */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-black/60 rounded-xl border border-white/10 max-w-full overflow-x-auto">
          {[
            { id: 'player', label: 'Now Playing' },
            { id: 'karaoke', label: '🎤 Live Karaoke Mode' },
            { id: 'party', label: '🎉 Virtual Party Room' },
            { id: 'dna', label: '🧬 Song DNA & Samples' },
            { id: 'home', label: 'Personalized Home' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-[#1DB954] text-black shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Smartphone Shell */}
      <div className="max-w-sm mx-auto rounded-[40px] border-4 border-zinc-800 bg-[#121212] shadow-2xl overflow-hidden flex flex-col relative min-h-[580px]">
        
        {/* Dynamic Island / Notch */}
        <div className="pt-3 pb-1 px-6 flex justify-between items-center bg-transparent select-none z-20">
          <span className="text-xs font-bold text-slate-300">9:41</span>
          <div className="w-24 h-4 rounded-full bg-black flex items-center justify-center gap-1.5 border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]"></span>
            <span className="text-[9px] text-slate-400 font-mono">Spotify Hi-Fi</span>
          </div>
          <div className="flex items-center gap-1 text-slate-300 text-xs">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Top Header Bar */}
        <div className="px-5 py-2 flex items-center justify-between z-10">
          <button 
            onClick={() => setActiveTab('home')}
            className="text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
          >
            {activeTab === 'home' ? 'Good Evening' : 'Playing from Playlist'}
          </button>
          <span className="text-[11px] font-bold text-white uppercase tracking-wider">
            {activeTab === 'home' ? 'For Jayanth' : 'Today\'s Top Hits'}
          </span>
          <button className="text-slate-400 hover:text-white">
            <Share2 className="w-4 h-4" />
          </button>
        </div>

        {/* SCREEN CONTENTS */}
        <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">

          {/* 1. NOW PLAYING SCREEN */}
          {activeTab === 'player' && (
            <div className="space-y-5 my-auto">
              {/* Album Art with Dynamic Ambient Glow */}
              <div className="relative mx-auto w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-gradient-to-br from-amber-600 via-rose-600 to-indigo-900 flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center backdrop-blur-md mb-2">
                  <Disc className={`w-12 h-12 text-white/90 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
                </div>
                <h4 className="text-lg font-black text-white drop-shadow-md">STARBOY</h4>
                <span className="text-xs text-white/80 font-semibold drop-shadow-sm">The Weeknd • Daft Punk</span>
              </div>

              {/* Title & Like */}
              <div className="flex items-center justify-between pt-2">
                <div>
                  <h3 className="text-base font-extrabold text-white">{currentSong.title}</h3>
                  <p className="text-xs text-slate-400">{currentSong.artist}</p>
                </div>
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="cursor-pointer transition-transform active:scale-90"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-[#1DB954] text-[#1DB954]' : 'text-slate-400'}`} />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative cursor-pointer">
                  <div className="h-full bg-[#1DB954] rounded-full" style={{ width: `${currentSong.progress}%` }}></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>{currentSong.currentTime}</span>
                  <span>{currentSong.duration}</span>
                </div>
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between px-3">
                <button className="text-slate-400 hover:text-white">
                  <Radio className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-5">
                  <button className="text-white hover:text-[#1DB954] transition-colors">
                    <SkipBack className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
                  </button>
                  <button className="text-white hover:text-[#1DB954] transition-colors">
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>
                <button 
                  onClick={() => setActiveTab('karaoke')}
                  className="p-2 rounded-xl bg-white/10 hover:bg-[#1DB954] hover:text-black transition-all text-slate-300"
                  title="Open Live Karaoke"
                >
                  <Mic2 className="w-4 h-4" />
                </button>
              </div>

              {/* New Features Quick Launch Bar */}
              <div className="pt-2 grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setActiveTab('karaoke')}
                  className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-center hover:border-[#1DB954] cursor-pointer"
                >
                  <Mic2 className="w-4 h-4 text-[#1DB954] mx-auto mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-300 block">Live Karaoke</span>
                </button>
                <button 
                  onClick={() => setActiveTab('party')}
                  className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-center hover:border-amber-400 cursor-pointer"
                >
                  <Users className="w-4 h-4 text-amber-400 mx-auto mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-300 block">Party Room</span>
                </button>
                <button 
                  onClick={() => setActiveTab('dna')}
                  className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-center hover:border-purple-400 cursor-pointer"
                >
                  <Disc className="w-4 h-4 text-purple-400 mx-auto mb-0.5" />
                  <span className="text-[10px] font-bold text-slate-300 block">Song DNA</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. LIVE KARAOKE MODE WITH VOCAL REMOVER SLIDER */}
          {activeTab === 'karaoke' && (
            <div className="space-y-4 my-auto">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#1DB954] text-black flex items-center justify-center font-bold">
                    <Mic2 className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-black text-white">Live Karaoke Mode</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[#1DB954] text-[9px] font-mono font-bold">
                  {vocalLevel <= 20 ? 'Karaoke Beat' : vocalLevel >= 80 ? 'Full Original' : 'Lead Vocal Backing'}
                </span>
              </div>

              {/* Vocal Remover Isolation Slider */}
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300">Vocal Isolation Slider</span>
                  <span className="text-[#1DB954] font-mono">{vocalLevel}% Vocals</span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={vocalLevel}
                  onChange={(e) => setVocalLevel(Number(e.target.value))}
                  className="w-full accent-[#1DB954] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-slate-400 font-mono">
                  <span>0% (Sing Solo)</span>
                  <span>50% (Duo Duet)</span>
                  <span>100% (Original)</span>
                </div>
              </div>

              {/* Real-time Syllable Synced Lyrics */}
              <div className="space-y-2 py-2">
                {lyrics.map((line, idx) => (
                  <div 
                    key={idx}
                    className={`p-2.5 rounded-xl transition-all ${
                      line.active 
                        ? 'bg-gradient-to-r from-emerald-950 to-zinc-900 border border-[#1DB954] text-white font-extrabold text-sm scale-105 shadow-md' 
                        : 'text-slate-500 text-xs font-medium'
                    }`}
                  >
                    {line.text}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <span className="text-[10px] text-slate-400">Microphone connected • Real-time pitch assist active</span>
              </div>
            </div>
          )}

          {/* 3. VIRTUAL LISTENING ROOM (PARTY MODE) */}
          {activeTab === 'party' && (
            <div className="space-y-4 my-auto">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <h4 className="text-xs font-black text-white">Party Room: Late Night Beats</h4>
                  <p className="text-[10px] text-slate-400">3 Friends listening in sync</p>
                </div>
                <div className="flex -space-x-2">
                  {['#F59E0B', '#10B981', '#6366F1'].map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border border-black flex items-center justify-center text-[9px] font-bold" style={{ backgroundColor: c }}>
                      {['R', 'M', 'A'][i]}
                    </div>
                  ))}
                </div>
              </div>

              {/* Flying Reactions */}
              {partyReaction && (
                <div className="text-center py-1 text-2xl animate-bounce">
                  {partyReaction}
                </div>
              )}

              {/* Collaborative Upvote Queue */}
              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 space-y-2.5">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-300 uppercase tracking-wider text-[10px]">Up Next Voting Queue</span>
                  <span className="text-[#1DB954] text-[10px]">Top Voted Plays Next</span>
                </div>

                {[
                  { id: 'q-1', title: 'Blinding Lights', artist: 'The Weeknd' },
                  { id: 'q-2', title: 'Levitating', artist: 'Dua Lipa' },
                  { id: 'q-3', title: 'As It Was', artist: 'Harry Styles' }
                ].map((item) => (
                  <div key={item.id} className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      <span className="text-[10px] text-slate-400">{item.artist}</span>
                    </div>
                    <button 
                      onClick={() => handleVote(item.id)}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-[#1DB954] hover:text-black transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>{queueVotes[item.id] || 0}</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Spatial Emoji Bar */}
              <div className="flex justify-between p-2 rounded-xl bg-zinc-900 border border-white/10">
                {['🔥', '💃', '🎧', '⚡', '🙌'].map((emoji, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSendReaction(emoji)}
                    className="p-1.5 hover:scale-125 transition-transform text-base cursor-pointer"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. SONG DNA & SAMPLES */}
          {activeTab === 'dna' && (
            <div className="space-y-4 my-auto">
              <div className="pb-2 border-b border-white/10">
                <h4 className="text-xs font-black text-white">Song DNA & Sample Roots</h4>
                <p className="text-[10px] text-slate-400">Discover harmonic composition and vintage sample influences.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-zinc-900 border border-white/10 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-black/60 border border-white/5">
                    <span className="text-[9px] text-slate-400 block uppercase">Tempo (BPM)</span>
                    <strong className="text-sm font-black text-[#1DB954]">{currentSong.bpm} BPM</strong>
                  </div>
                  <div className="p-2 rounded-xl bg-black/60 border border-white/5">
                    <span className="text-[9px] text-slate-400 block uppercase">Key & Scale</span>
                    <strong className="text-sm font-black text-purple-400">{currentSong.key}</strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Sample Origins:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {currentSong.sample}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Production Credits:</span>
                  <p className="text-xs text-slate-300">
                    Thomas Bangalter, Guy-Manuel de Homem-Christo, Doc McKinney, Cirkut.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 5. HOME FEED */}
          {activeTab === 'home' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-sm font-black text-white">Made For Jayanth</h3>
                <p className="text-[10px] text-slate-400">Your daily personalized algorithmic mixes</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { title: 'Daily Mix 1', desc: 'The Weeknd, Post Malone', color: 'from-blue-600 to-indigo-900' },
                  { title: 'Discover Weekly', desc: 'Updated every Monday', color: 'from-emerald-600 to-teal-900' },
                  { title: 'DJ X (AI)', desc: 'Smart Voice DJ Curation', color: 'from-purple-600 to-pink-900' },
                  { title: 'Chill Lo-Fi Work', desc: 'Deep focus coding beats', color: 'from-amber-600 to-rose-900' }
                ].map((item, i) => (
                  <div 
                    key={i}
                    onClick={() => setActiveTab('player')}
                    className={`p-3 rounded-xl bg-gradient-to-br ${item.color} shadow-md cursor-pointer hover:scale-102 transition-transform`}
                  >
                    <h5 className="text-xs font-black text-white">{item.title}</h5>
                    <span className="text-[9px] text-white/80 block mt-0.5">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Bottom Navigation Dock */}
        <div className="h-14 bg-black/90 border-t border-white/10 px-6 flex items-center justify-between z-10">
          <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center ${activeTab === 'home' ? 'text-[#1DB954]' : 'text-slate-400'}`}>
            <Home className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">Home</span>
          </button>
          <button onClick={() => setActiveTab('player')} className={`flex flex-col items-center ${activeTab === 'player' ? 'text-[#1DB954]' : 'text-slate-400'}`}>
            <Disc className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">Player</span>
          </button>
          <button onClick={() => setActiveTab('karaoke')} className={`flex flex-col items-center ${activeTab === 'karaoke' ? 'text-[#1DB954]' : 'text-slate-400'}`}>
            <Mic2 className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">Karaoke</span>
          </button>
          <button onClick={() => setActiveTab('party')} className={`flex flex-col items-center ${activeTab === 'party' ? 'text-[#1DB954]' : 'text-slate-400'}`}>
            <Users className="w-4 h-4" />
            <span className="text-[9px] font-bold mt-0.5">Party</span>
          </button>
        </div>

      </div>

    </div>
  );
};
