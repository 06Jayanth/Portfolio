import React, { useState } from 'react';
import { 
  CloudRain, 
  Wind, 
  Droplets, 
  Sun, 
  CloudLightning, 
  Search, 
  MapPin, 
  Menu, 
  ChevronDown, 
  ArrowLeft, 
  Home, 
  FileText, 
  CloudSun,
  Sparkles,
  Zap,
  Compass
} from 'lucide-react';

export const WeatherInteractiveScreen: React.FC = () => {
  const [activeFrame, setActiveFrame] = useState<'storm' | 'sunny' | 'search' | 'report'>('storm');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState({
    name: 'New York, USA',
    code: 'NYC, USA',
    temp: 19,
    aqi: 24,
    highLow: '19°/ 20°',
    status: 'Thunderstorm',
    date: 'Wednesday, 12 May'
  });

  const cities = [
    { name: 'New York, USA', temp: '19°', aqi: 'AQI 24', range: '19°/ 20°', condition: 'Rainy' },
    { name: 'Bangalore, IND', temp: '21°', aqi: 'AQI 28', range: '21°/ 20°', condition: 'Sunny' },
    { name: 'Los, USA', temp: '19°', aqi: 'AQI 24', range: '19°/ 20°', condition: 'Cloudy' },
    { name: 'Kolkata, IND', temp: '21°', aqi: 'AQI 28', range: '21°/ 20°', condition: 'Humid' },
  ];

  return (
    <div className="rounded-3xl border border-slate-700/80 bg-slate-950 shadow-2xl overflow-hidden p-3 sm:p-6 text-white">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400 font-bold text-sm shadow-md">
            <CloudLightning className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">Atmosphere Weather 3D</h3>
              <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 text-[10px] font-mono font-bold">
                iPhone 13 & 14 Frames
              </span>
            </div>
            <p className="text-slate-400 text-xs">Glassmorphic tactile weather experience with 3D render states.</p>
          </div>
        </div>

        {/* Frame Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 max-w-full overflow-x-auto">
          {[
            { id: 'storm', label: 'Frame 2: Stormy Night' },
            { id: 'sunny', label: 'Frame 5: Sunny BLR' },
            { id: 'search', label: 'Frame 7: Multi-City' },
            { id: 'report', label: 'Frame 8: 7-Day Forecast' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFrame(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeFrame === tab.id
                  ? 'bg-sky-600 text-white shadow-sm'
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
        <div className="w-full max-w-[380px] rounded-[44px] shadow-2xl border-[10px] border-slate-800 relative overflow-hidden flex flex-col min-h-[640px] max-h-[700px] select-none">
          
          {/* BACKGROUND THEME GRADIENTS */}
          <div className={`absolute inset-0 transition-colors duration-700 ${
            activeFrame === 'storm'
              ? 'bg-gradient-to-b from-[#0B1528] via-[#10233D] to-[#0A182E]'
              : activeFrame === 'sunny'
              ? 'bg-gradient-to-b from-[#1C3B5E] via-[#2A4D74] to-[#162A42]'
              : 'bg-gradient-to-b from-[#0F1E33] via-[#162D4A] to-[#0E1E34]'
          }`}>
            {/* Ambient Lighting Gradients */}
            <div className="absolute top-1/4 -left-12 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/3 -right-12 w-56 h-56 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          </div>

          {/* iOS Status Bar */}
          <div className="w-full h-7 flex items-center justify-between px-6 text-[11px] font-bold text-sky-200 select-none z-20 shrink-0">
            <span>9:41</span>
            <div className="w-20 h-4 bg-black/60 backdrop-blur-md rounded-full mx-auto -mt-1 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ml-auto mr-1.5"></div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2 border border-sky-200/80 rounded-xs p-0.5 flex items-center">
                <div className="w-full h-full bg-sky-200 rounded-2xs"></div>
              </div>
            </div>
          </div>

          {/* SCREEN CONTENT */}
          <div className="relative z-10 flex-1 overflow-y-auto p-5 pb-20 flex flex-col">
            
            {/* 1. STORMY NIGHT MODE (iPhone 13 & 14 - 2) */}
            {activeFrame === 'storm' && (
              <div className="flex-1 flex flex-col justify-between space-y-4 text-center">
                {/* Top Nav Header */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg cursor-pointer">
                    <Menu className="w-4 h-4 text-sky-200" />
                  </div>

                  {/* Location Pill */}
                  <div 
                    onClick={() => setActiveFrame('search')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-100 shadow-lg cursor-pointer hover:bg-white/15"
                  >
                    <MapPin className="w-3.5 h-3.5 text-sky-300" />
                    <span>NYC, USA</span>
                    <ChevronDown className="w-3 h-3 text-sky-300" />
                  </div>
                </div>

                {/* Big Heading */}
                <div>
                  <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
                    Today's
                  </h1>
                </div>

                {/* 3D Glassmorphic Storm Cloud with Lightning & Rain */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="relative w-48 h-36 flex items-center justify-center">
                    {/* Glowing cloud back aura */}
                    <div className="absolute inset-0 bg-sky-400/20 rounded-full blur-2xl animate-pulse"></div>

                    {/* SVG 3D Stylized Storm Cloud */}
                    <svg viewBox="0 0 200 150" className="w-44 h-32 drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
                      <defs>
                        <linearGradient id="stormGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#A5C8E4" stopOpacity="0.9" />
                          <stop offset="50%" stopColor="#6C8DA8" stopOpacity="0.95" />
                          <stop offset="100%" stopColor="#3B5B75" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="boltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFF275" />
                          <stop offset="100%" stopColor="#FFB300" />
                        </linearGradient>
                      </defs>

                      {/* Cloud shape */}
                      <path
                        d="M 50 90 A 30 30 0 0 1 80 40 A 38 38 0 0 1 140 46 A 28 28 0 0 1 170 80 A 24 24 0 0 1 155 105 L 50 105 A 20 20 0 0 1 50 90 Z"
                        fill="url(#stormGrad)"
                        filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))"
                      />
                      {/* Highlight sheen */}
                      <path
                        d="M 85 46 A 32 32 0 0 1 135 50"
                        stroke="rgba(255,255,255,0.6)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />

                      {/* Lightning Bolt */}
                      <polygon
                        points="105,95 95,115 108,115 98,138 118,110 106,110"
                        fill="url(#boltGrad)"
                        filter="drop-shadow(0 0 8px #FFD54F)"
                      />

                      {/* Rain droplets */}
                      <line x1="65" y1="115" x2="60" y2="125" stroke="#7DD3FC" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      <line x1="80" y1="120" x2="75" y2="130" stroke="#7DD3FC" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      <line x1="125" y1="118" x2="120" y2="128" stroke="#7DD3FC" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                      <line x1="145" y1="115" x2="140" y2="125" stroke="#7DD3FC" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
                    </svg>
                  </div>
                </div>

                {/* Date & Big Temperature */}
                <div className="space-y-1">
                  <p className="text-xs text-sky-200/80 font-medium">Wednesday, 12 May</p>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-100 to-sky-300 drop-shadow-xl tracking-tight">
                    19°
                  </div>
                </div>

                {/* Frosted Glass Metrics Pills */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shadow-lg">
                    <CloudRain className="w-5 h-5 mx-auto text-sky-300 mb-1" />
                    <span className="text-xs font-bold block text-white">90%</span>
                    <span className="text-[10px] text-sky-200/70">Rain</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shadow-lg">
                    <Wind className="w-5 h-5 mx-auto text-sky-300 mb-1" />
                    <span className="text-xs font-bold block text-white">7km/h</span>
                    <span className="text-[10px] text-sky-200/70">Wind</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shadow-lg">
                    <Droplets className="w-5 h-5 mx-auto text-sky-300 mb-1" />
                    <span className="text-xs font-bold block text-white">21%</span>
                    <span className="text-[10px] text-sky-200/70">Humidity</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DAYTIME SUNNY MODE (iPhone 13 & 14 - 5) */}
            {activeFrame === 'sunny' && (
              <div className="flex-1 flex flex-col justify-between space-y-4 text-center">
                {/* Top Nav Header */}
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
                    <Menu className="w-4 h-4 text-sky-200" />
                  </div>

                  {/* Location Pill */}
                  <div 
                    onClick={() => setActiveFrame('search')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-sky-100 shadow-lg cursor-pointer hover:bg-white/15"
                  >
                    <MapPin className="w-3.5 h-3.5 text-amber-300" />
                    <span>BLR, IND</span>
                    <ChevronDown className="w-3 h-3 text-sky-300" />
                  </div>
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-wide text-white drop-shadow-md">
                    Today's
                  </h1>
                </div>

                {/* 3D Sun & Fluffy Cloud */}
                <div className="relative py-2 flex items-center justify-center">
                  <div className="relative w-48 h-36 flex items-center justify-center">
                    {/* Glowing Sun behind Cloud */}
                    <div className="absolute top-2 right-8 w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-200 rounded-full shadow-[0_0_40px_#FBBF24] animate-pulse"></div>

                    {/* SVG Puffy Cloud */}
                    <svg viewBox="0 0 200 150" className="w-44 h-32 relative z-10 drop-shadow-[0_12px_24px_rgba(0,0,0,0.4)]">
                      <defs>
                        <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFFFFF" />
                          <stop offset="60%" stopColor="#E2E8F0" />
                          <stop offset="100%" stopColor="#CBD5E1" />
                        </linearGradient>
                      </defs>

                      <path
                        d="M 50 90 A 30 30 0 0 1 80 40 A 38 38 0 0 1 140 46 A 28 28 0 0 1 170 80 A 24 24 0 0 1 155 105 L 50 105 A 20 20 0 0 1 50 90 Z"
                        fill="url(#cloudGrad)"
                      />
                      <path
                        d="M 85 45 A 32 32 0 0 1 135 50"
                        stroke="rgba(255,255,255,0.9)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>

                {/* Date & Big Temperature */}
                <div className="space-y-1">
                  <p className="text-xs text-sky-200/80 font-medium">Wednesday, 12 May</p>
                  <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300 drop-shadow-xl tracking-tight">
                    21°
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shadow-lg">
                    <Sun className="w-5 h-5 mx-auto text-amber-300 mb-1" />
                    <span className="text-xs font-bold block text-white">20%</span>
                    <span className="text-[10px] text-sky-200/70">Sunny</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shadow-lg">
                    <Wind className="w-5 h-5 mx-auto text-sky-300 mb-1" />
                    <span className="text-xs font-bold block text-white">7km/h</span>
                    <span className="text-[10px] text-sky-200/70">Wind</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center shadow-lg">
                    <Droplets className="w-5 h-5 mx-auto text-sky-300 mb-1" />
                    <span className="text-xs font-bold block text-white">12%</span>
                    <span className="text-[10px] text-sky-200/70">Humidity</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. MULTI-CITY SEARCH & AQI (iPhone 13 & 14 - 7) */}
            {activeFrame === 'search' && (
              <div className="space-y-3">
                {/* Search Bar matching Frame 7 */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setActiveFrame('storm')}
                    className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-sky-200 hover:bg-white/20 shrink-0"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-sky-100">
                    <Search className="w-3.5 h-3.5 text-sky-300 shrink-0" />
                    <input
                      type="text"
                      placeholder="Enter locations"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-hidden w-full placeholder:text-sky-300/60 text-xs text-white"
                    />
                  </div>
                </div>

                {/* City Cards List */}
                <div className="space-y-2.5 pt-2">
                  {cities
                    .filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((city, idx) => (
                      <div
                        key={idx}
                        onClick={() => {
                          if (city.name.includes('Bangalore')) setActiveFrame('sunny');
                          else setActiveFrame('storm');
                        }}
                        className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/15 transition-all cursor-pointer flex items-center justify-between shadow-lg"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                            <span>{city.name}</span>
                            <MapPin className="w-3 h-3 text-sky-300" />
                          </div>
                          <div className="text-[11px] text-sky-200/70 font-mono">
                            {city.aqi} • {city.range}
                          </div>
                        </div>

                        <div className="text-2xl font-black text-white">
                          {city.temp}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 4. NEXT 7 DAYS FORECAST (iPhone 13 & 14 - 8) */}
            {activeFrame === 'report' && (
              <div className="space-y-3.5">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setActiveFrame('storm')}
                    className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-sky-200 hover:bg-white/20"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <h2 className="text-lg font-bold text-white">Next 7 days</h2>
                </div>

                {/* Hero Tomorrow Card (Frame 8) */}
                <div className="p-4 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-amber-400/30 flex items-center justify-center">
                        <CloudSun className="w-7 h-7 text-amber-300" />
                      </div>
                      <div>
                        <span className="text-[11px] text-sky-200 block font-medium">Tomorrow</span>
                        <span className="text-xs font-bold text-white">Mostly Sunny</span>
                      </div>
                    </div>
                    <div className="text-xl font-black text-white">
                      20°/ 24°
                    </div>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-3 gap-2 pt-1 border-t border-white/10">
                    <div className="text-center">
                      <span className="text-[11px] font-bold block text-white">20%</span>
                      <span className="text-[9px] text-sky-200/70">Sunny</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[11px] font-bold block text-white">7km/h</span>
                      <span className="text-[9px] text-sky-200/70">Wind</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[11px] font-bold block text-white">12%</span>
                      <span className="text-[9px] text-sky-200/70">Humidity</span>
                    </div>
                  </div>
                </div>

                {/* Weekly Forecast List Card */}
                <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 shadow-xl space-y-2.5">
                  {[
                    { day: 'Mon', condition: 'Sunny', icon: Sun, temp: '20°/ 24°', iconColor: 'text-amber-300' },
                    { day: 'Tue', condition: 'Rainy', icon: CloudRain, temp: '19°/ 20°', iconColor: 'text-sky-300' },
                    { day: 'Wed', condition: 'Storm', icon: CloudLightning, temp: '19°/ 20°', iconColor: 'text-yellow-300' },
                    { day: 'Thu', condition: 'Thunder', icon: Zap, temp: '19°/ 20°', iconColor: 'text-blue-300' },
                  ].map((row, idx) => {
                    const Icon = row.icon;
                    return (
                      <div key={idx} className="flex items-center justify-between py-1.5 border-b border-white/10 last:border-0 text-xs">
                        <span className="font-bold text-white w-10">{row.day}</span>
                        <div className="flex items-center gap-2 flex-1 justify-center">
                          <Icon className={`w-3.5 h-3.5 ${row.iconColor}`} />
                          <span className="text-sky-200 font-medium">{row.condition}</span>
                        </div>
                        <span className="font-mono text-white font-semibold text-right w-16">{row.temp}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Frosted Glass Bottom Navigation Pill (Frames 2, 5, 7, 8) */}
          <div className="absolute bottom-3 inset-x-6 h-12 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-around px-4 text-white z-20 shadow-2xl">
            <button
              onClick={() => setActiveFrame('storm')}
              className={`p-2 transition-all cursor-pointer ${
                activeFrame === 'storm' || activeFrame === 'sunny' ? 'text-sky-300 scale-110' : 'text-sky-200/60 hover:text-white'
              }`}
              title="Home Weather"
            >
              <Home className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveFrame('search')}
              className={`p-2 transition-all cursor-pointer ${
                activeFrame === 'search' ? 'text-sky-300 scale-110' : 'text-sky-200/60 hover:text-white'
              }`}
              title="Search Cities"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveFrame('report')}
              className={`p-2 transition-all cursor-pointer ${
                activeFrame === 'report' ? 'text-sky-300 scale-110' : 'text-sky-200/60 hover:text-white'
              }`}
              title="7-Day Report"
            >
              <FileText className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
