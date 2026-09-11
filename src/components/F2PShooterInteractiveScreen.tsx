import React, { useState } from 'react';
import { 
  Crosshair, 
  Shield, 
  Flame, 
  Zap, 
  Users, 
  Award, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  RotateCcw, 
  Volume2, 
  Play, 
  Check, 
  Wrench, 
  TrendingUp, 
  Target,
  Sparkles
} from 'lucide-react';

interface WeaponItem {
  id: string;
  name: string;
  type: string;
  caliber: string;
  rarity: string;
  damage: number;
  accuracy: number;
  range: number;
  fireRate: number;
  capacity: number;
  control: number;
  description: string;
  imageSilhouette: string;
}

interface CharacterItem {
  id: string;
  name: string;
  callsign: string;
  role: string;
  specialty: string;
  armorRating: string;
  speedRating: string;
  description: string;
}

interface MissionItem {
  id: string;
  name: string;
  subtitle: string;
  environment: string;
  threatLevel: string;
  objective: string;
  bgGradient: string;
}

export const F2PShooterInteractiveScreen: React.FC = () => {
  const [gameState, setGameState] = useState<'splash' | 'menu' | 'characters' | 'weapons' | 'missions'>('splash');
  const [selectedCharacterIndex, setSelectedCharacterIndex] = useState(0);
  const [selectedWeaponIndex, setSelectedWeaponIndex] = useState(0);
  const [selectedMissionIndex, setSelectedMissionIndex] = useState(0);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [isEquipped, setIsEquipped] = useState(true);
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const prototypeUrl = "https://xd.adobe.com/view/d98fb722-bcf3-4822-8011-ee104e548ada-8cdc/";

  const characters: CharacterItem[] = [
    {
      id: 'atlas',
      name: 'Atlas',
      callsign: 'Gray',
      role: 'Heavy Assault Operative',
      specialty: 'Sustained Suppression & Fortified Armor',
      armorRating: 'Tier 4 Spec-Ops',
      speedRating: 'Moderate Mobility',
      description: 'Special forces pointman equipped with tactical ballistic gear, radio headset, and heavy firearms proficiency.'
    },
    {
      id: 'lucy',
      name: 'Lucy',
      callsign: 'Walker',
      role: 'Tactical Recon Specialist',
      specialty: 'Silent Infiltration & Target Acquisition',
      armorRating: 'Tier 3 Lightweight Kevlar',
      speedRating: 'Agile Velocity',
      description: 'Covert marksman proficient in flanking routes, designated marksman rifles, and thermal reconnaissance.'
    }
  ];

  const weapons: WeaponItem[] = [
    {
      id: 'sniper',
      name: 'AWM Sniper Rifle',
      type: 'SNIPER',
      caliber: '.300 Magnum',
      rarity: 'Uncommon',
      damage: 100,
      accuracy: 98,
      range: 100,
      fireRate: 30,
      capacity: 5,
      control: 25,
      description: 'The Accuracy International Arctic Warfare Magnum is a bolt-action sniper rifle designed for maximum stopping power and pin-point extreme long-range precision.',
      imageSilhouette: 'M10 20 L70 20 L70 23 L140 23 L140 20 L280 20 L280 23 L310 23 L310 26 L120 26 L110 38 L90 42 L70 30 L40 38 L10 38 Z'
    },
    {
      id: 'ar',
      name: 'AKM Tactical Assault Rifle',
      type: 'AR',
      caliber: '7.62x39mm Soviet',
      rarity: 'Uncommon',
      damage: 48,
      accuracy: 75,
      range: 60,
      fireRate: 600,
      capacity: 30,
      control: 52,
      description: 'The AKM is a gas-operated 7.62mm selective-fire assault rifle. Highly rugged, dependable in hostile sandy terrain, and delivers devastating medium-range damage.',
      imageSilhouette: 'M10 22 L80 22 L85 18 L160 18 L165 24 L270 24 L270 27 L150 27 L140 45 L115 50 L105 32 L40 40 L10 38 Z'
    },
    {
      id: 'smg',
      name: 'UMP45 Tactical Submachine Gun',
      type: 'SMG',
      caliber: '.45 ACP High-Impact',
      rarity: 'Uncommon',
      damage: 38,
      accuracy: 82,
      range: 40,
      fireRate: 650,
      capacity: 25,
      control: 78,
      description: 'The Universal Machine Pistol chambered in .45 ACP excels in tight quarter combat (CQC). Lightweight composite polymer frame with high cyclic controllability.',
      imageSilhouette: 'M15 20 L60 20 L65 16 L120 16 L125 22 L220 22 L220 25 L140 25 L130 48 L110 52 L95 28 L40 36 L15 34 Z'
    }
  ];

  const missions: MissionItem[] = [
    {
      id: 'battle-ground',
      name: 'Battle Ground',
      subtitle: 'Desert Forward Outpost',
      environment: 'Arid Military Compound',
      threatLevel: 'Moderate Contact',
      objective: 'Secure FOB perimeter, neutralize insurgent sniper nests, and extract tactical satellite logs.',
      bgGradient: 'from-amber-950/70 via-stone-900 to-black'
    },
    {
      id: 'missile-ground',
      name: 'Missile Ground',
      subtitle: 'Armored Silo Strike Complex',
      environment: 'Fortified Ballistic Silo',
      threatLevel: 'High Armour Threat',
      objective: 'Intercept enemy armored column, disarm mobile ICBM launchers, and defend convoy extraction zone.',
      bgGradient: 'from-stone-900 via-neutral-950 to-black'
    },
    {
      id: 'eye-ground',
      name: 'Eye Ground',
      subtitle: 'Tactical Night Operatives Raid',
      environment: 'Rain-Swept Industrial Sector',
      threatLevel: 'Extreme Lethality',
      objective: 'Night strike under zero-light conditions. Coordinate synchronized takedowns and sabotage power array.',
      bgGradient: 'from-slate-950 via-zinc-900 to-black'
    }
  ];

  const currentWeapon = weapons[selectedWeaponIndex];
  const currentCharacter = characters[selectedCharacterIndex];
  const currentMission = missions[selectedMissionIndex];

  const triggerNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 2500);
  };

  return (
    <div className="w-full rounded-3xl overflow-hidden bg-[#0A0B0E] border border-stone-800 shadow-2xl text-stone-200 font-sans select-none">
      
      {/* Top Interactive Simulation Bar */}
      <div className="px-4 sm:px-6 py-3 bg-[#12141A] border-b border-stone-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-stone-200">
            F2P SHOOTER GAME — Adobe XD Interactive Simulation
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-stone-800 text-stone-400 border border-stone-700">
            iPhone X Landscape (812 × 375)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Direct Adobe XD Prototype Link */}
          <a
            href={prototypeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF2BC2]/15 border border-[#FF2BC2]/40 text-[#FF63D4] hover:bg-[#FF2BC2]/25 text-xs font-bold transition-all shadow-sm"
          >
            <span className="font-mono font-extrabold text-[10px] px-1 py-0.2 bg-[#FF2BC2] text-black rounded">Xd</span>
            <span>Launch Live Adobe XD Prototype</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={() => {
              setGameState('splash');
              setIsUpgraded(false);
              triggerNotice('Reset simulation to Title screen');
            }}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-stone-800 text-xs transition-colors"
            title="Reset Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Screen Frame Container (Landscape Ratio) */}
      <div className="relative min-h-[460px] sm:min-h-[520px] bg-gradient-to-b from-[#0e1017] via-[#08090C] to-black flex flex-col justify-between p-4 sm:p-8 overflow-hidden">
        
        {/* Background Gritty Tactical Smoke & Vignette FX */}
        <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-700 via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/80 pointer-events-none" />

        {/* Dynamic State Feedback Banner */}
        {actionNotice && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 px-4 py-1.5 rounded-full bg-red-600/90 text-white font-mono text-xs font-bold shadow-lg backdrop-blur-md animate-fade-in border border-red-400">
            {actionNotice}
          </div>
        )}

        {/* ================= STATE 1: SPLASH SCREEN ================= */}
        {gameState === 'splash' && (
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/60 text-red-400 text-xs font-mono font-bold tracking-widest uppercase">
                <span>Tactical Military Mobile FPS</span>
              </div>
              
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-widest text-white uppercase drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                F2P <span className="text-red-600">SHOOTER</span> <br />
                G<span className="text-red-600">A</span>M<span className="text-red-600">E</span>
              </h1>

              <p className="text-xs sm:text-sm font-mono text-stone-400 max-w-md mx-auto pt-2">
                Designed in Adobe XD for modern mobile landscape displays with custom armory, operator barracks, and tactical mission deployment.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setGameState('menu')}
                className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 text-white font-mono font-bold text-sm tracking-widest uppercase shadow-lg shadow-red-900/40 transition-all cursor-pointer border border-red-500/50"
              >
                <span className="flex items-center gap-2">
                  <span>TAP TO CONTINUE</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>

            <span className="text-[11px] font-mono text-stone-500">
              iPhone X 16:9 Landscape Prototype Flow
            </span>
          </div>
        )}

        {/* ================= STATE 2: MAIN MENU LOBBY ================= */}
        {gameState === 'menu' && (
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            {/* Top Bar Player Profile */}
            <div className="flex items-center justify-between border-b border-stone-800/80 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-700 flex items-center justify-center font-mono font-extrabold text-red-500 text-lg">
                  8
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-white tracking-wider">
                    Deadly8Ghost
                  </div>
                  <div className="text-[10px] font-mono text-stone-400">
                    ID: 55662210 • Rank: Tier-1 Spec-Ops
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right font-mono text-xs">
                  <span className="text-stone-400 block text-[10px]">Active Operator</span>
                  <span className="font-bold text-red-500">{currentCharacter.name} {currentCharacter.callsign}</span>
                </div>
                <div className="text-right font-mono text-xs pl-3 border-l border-stone-800">
                  <span className="text-stone-400 block text-[10px]">Primary Weapon</span>
                  <span className="font-bold text-stone-200">{currentWeapon.name}</span>
                </div>
              </div>
            </div>

            {/* Middle Stage: Tactical HUD Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto py-6">
              {/* Weapons Armory Node */}
              <div
                onClick={() => setGameState('weapons')}
                className="group p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-red-600/70 hover:bg-stone-900/90 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500">
                    Armory Loadout
                  </span>
                  <Target className="w-4 h-4 text-stone-500 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-red-400 transition-colors">
                    WEAPONS
                  </h3>
                  <p className="text-xs text-stone-400 font-mono">
                    Caliber tuning, stats, repair & upgrade modules (AWM, AKM, UMP45).
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-300 group-hover:text-white flex items-center gap-1 font-bold">
                  <span>Open Armory</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Characters Roster Node */}
              <div
                onClick={() => setGameState('characters')}
                className="group p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-red-600/70 hover:bg-stone-900/90 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500">
                    Barracks
                  </span>
                  <Users className="w-4 h-4 text-stone-500 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-red-400 transition-colors">
                    CHARACTERS
                  </h3>
                  <p className="text-xs text-stone-400 font-mono">
                    Choose Operative: Atlas Gray (Heavy) or Lucy Walker (Recon).
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-300 group-hover:text-white flex items-center gap-1 font-bold">
                  <span>Select Operative</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Missions Carousel Node */}
              <div
                onClick={() => setGameState('missions')}
                className="group p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-red-600/70 hover:bg-stone-900/90 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-red-500">
                    Operations
                  </span>
                  <Crosshair className="w-4 h-4 text-stone-500 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-mono font-bold text-white group-hover:text-red-400 transition-colors">
                    MISSIONS
                  </h3>
                  <p className="text-xs text-stone-400 font-mono">
                    Battle Ground, Missile Ground, and Eye Ground spec-ops strike zones.
                  </p>
                </div>
                <span className="text-xs font-mono text-stone-300 group-hover:text-white flex items-center gap-1 font-bold">
                  <span>Briefing Map</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between border-t border-stone-800/80 pt-4">
              <button
                onClick={() => setGameState('splash')}
                className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-stone-400 hover:text-white transition-colors"
              >
                ← Title Screen
              </button>

              <button
                onClick={() => setGameState('missions')}
                className="px-8 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-sm tracking-widest uppercase shadow-lg shadow-red-950 transition-all cursor-pointer"
              >
                START MISSION
              </button>
            </div>
          </div>
        )}

        {/* ================= STATE 3: CHARACTERS SCREEN ================= */}
        {gameState === 'characters' && (
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-500" />
                <h2 className="text-lg font-mono font-bold text-white tracking-widest uppercase">
                  OPERATIVE SELECTION
                </h2>
              </div>

              <button
                onClick={() => setGameState('menu')}
                className="px-3 py-1 rounded-lg text-xs font-mono font-semibold text-stone-400 hover:text-white bg-stone-900 border border-stone-800"
              >
                BACK TO LOBBY
              </button>
            </div>

            {/* Operative Spotlight Stage */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-auto items-center py-4">
              <div className="md:col-span-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
                    Tactical Callout
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-mono font-extrabold text-white tracking-wider">
                    {currentCharacter.name.toUpperCase()} <span className="text-stone-400">{currentCharacter.callsign.toUpperCase()}</span>
                  </h3>
                  <div className="text-xs font-mono text-red-400 font-semibold">
                    {currentCharacter.role}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-mono">
                  {currentCharacter.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-0.5">
                    <span className="text-[10px] font-mono text-stone-400 block uppercase">Armor Standard</span>
                    <span className="text-xs font-mono font-bold text-stone-200">{currentCharacter.armorRating}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900/80 border border-stone-800 space-y-0.5">
                    <span className="text-[10px] font-mono text-stone-400 block uppercase">Mobility Index</span>
                    <span className="text-xs font-mono font-bold text-stone-200">{currentCharacter.speedRating}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => triggerNotice(`Confirmed ${currentCharacter.name} as active operator!`)}
                    className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs tracking-wider uppercase transition-colors"
                  >
                    CONFIRM OPERATIVE
                  </button>

                  <button
                    onClick={() => {
                      setSelectedCharacterIndex((prev) => (prev === 0 ? 1 : 0));
                    }}
                    className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 font-mono font-bold text-xs tracking-wider uppercase transition-colors"
                  >
                    TOGGLE OPERATIVE
                  </button>
                </div>
              </div>

              {/* Visual Avatar Simulation Preview */}
              <div className="md:col-span-6 flex flex-col items-center justify-center p-6 rounded-2xl bg-stone-900/40 border border-stone-800/80 min-h-[220px]">
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-stone-800 to-stone-700 border-2 border-red-500/80 flex items-center justify-center shadow-xl shadow-red-950/40 text-stone-100">
                  <Users className="w-12 h-12 text-stone-300" />
                </div>
                <div className="mt-4 text-center">
                  <div className="text-sm font-mono font-bold text-white tracking-widest uppercase">
                    {currentCharacter.name} {currentCharacter.callsign}
                  </div>
                  <span className="text-[11px] font-mono text-stone-400">
                    {currentCharacter.specialty}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Nav Carousel Buttons */}
            <div className="flex items-center justify-between border-t border-stone-800 pt-3">
              <button
                onClick={() => setSelectedCharacterIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1))}
                className="flex items-center gap-1 text-xs font-mono text-stone-400 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Character</span>
              </button>

              <span className="text-xs font-mono text-stone-500">
                {selectedCharacterIndex + 1} / {characters.length}
              </span>

              <button
                onClick={() => setSelectedCharacterIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1))}
                className="flex items-center gap-1 text-xs font-mono text-stone-400 hover:text-white"
              >
                <span>Next Character</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STATE 4: WEAPONS ARMORY SCREEN ================= */}
        {gameState === 'weapons' && (
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-red-500" />
                <h2 className="text-lg font-mono font-bold text-white tracking-widest uppercase">
                  ARMORY & WEAPON STATS
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGameState('menu')}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-semibold text-stone-400 hover:text-white bg-stone-900 border border-stone-800"
                >
                  BACK TO LOBBY
                </button>
              </div>
            </div>

            {/* Armory Specs Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto py-3 items-center">
              {/* Left Column: Weapon Stats Matrix */}
              <div className="lg:col-span-5 space-y-3 bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-red-500">
                    WEAPON STATUS
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                    {currentWeapon.rarity} • {currentWeapon.caliber}
                  </span>
                </div>

                {/* Stats Gauges (Matching user XD screenshots) */}
                <div className="space-y-2 text-xs font-mono">
                  {/* Damage */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-400 mb-1">
                      <span>DAMAGE</span>
                      <span className="text-white font-bold">{isUpgraded ? Math.min(100, currentWeapon.damage + 12) : currentWeapon.damage}</span>
                    </div>
                    <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-600 transition-all duration-500" 
                        style={{ width: `${isUpgraded ? Math.min(100, currentWeapon.damage + 12) : currentWeapon.damage}%` }} 
                      />
                    </div>
                  </div>

                  {/* Accuracy */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-400 mb-1">
                      <span>ACCURACY</span>
                      <span className="text-white font-bold">{isUpgraded ? Math.min(100, currentWeapon.accuracy + 8) : currentWeapon.accuracy}</span>
                    </div>
                    <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-amber-500 transition-all duration-500" 
                        style={{ width: `${isUpgraded ? Math.min(100, currentWeapon.accuracy + 8) : currentWeapon.accuracy}%` }} 
                      />
                    </div>
                  </div>

                  {/* Range */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-400 mb-1">
                      <span>RANGE</span>
                      <span className="text-white font-bold">{currentWeapon.range}</span>
                    </div>
                    <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${currentWeapon.range}%` }} />
                    </div>
                  </div>

                  {/* Fire Rate */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-400 mb-1">
                      <span>FIRE RATE</span>
                      <span className="text-white font-bold">{currentWeapon.fireRate} RPM</span>
                    </div>
                    <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${Math.min(100, currentWeapon.fireRate / 7)}%` }} />
                    </div>
                  </div>

                  {/* Capacity */}
                  <div>
                    <div className="flex justify-between text-[11px] text-stone-400 mb-1">
                      <span>CAPACITY</span>
                      <span className="text-white font-bold">{currentWeapon.capacity} RDS</span>
                    </div>
                    <div className="h-2 w-full bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${(currentWeapon.capacity / 40) * 100}%` }} />
                    </div>
                  </div>
                </div>

                {/* Tactical Action Buttons (From XD screens: Upgrade, Repair, Equip/Unequip) */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800">
                  <button
                    onClick={() => {
                      setIsUpgraded(!isUpgraded);
                      triggerNotice(isUpgraded ? 'Weapon reverted to base specs' : 'Weapon UPGRADED! Damage & Accuracy increased!');
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all ${
                      isUpgraded 
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950' 
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    <TrendingUp className="w-3 h-3" />
                    <span>{isUpgraded ? 'UPGRADED ✓' : 'UPGRADE'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsEquipped(!isEquipped);
                      triggerNotice(isEquipped ? 'Weapon unequipped' : 'Weapon equipped to primary loadout!');
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-1 transition-all ${
                      isEquipped 
                        ? 'bg-red-600 text-white' 
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>{isEquipped ? 'EQUIPPED' : 'EQUIP'}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Weapon Silhouette & Narrative */}
              <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedWeaponIndex((prev) => (prev === 0 ? weapons.length - 1 : prev - 1))}
                    className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-red-600/60 text-stone-300 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="text-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold block">
                      {currentWeapon.type}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-mono font-extrabold text-white">
                      {currentWeapon.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedWeaponIndex((prev) => (prev === weapons.length - 1 ? 0 : prev + 1))}
                    className="p-2 rounded-lg bg-stone-900 border border-stone-800 hover:border-red-600/60 text-stone-300 hover:text-white"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Gun Silhouette Preview Box */}
                <div className="p-8 rounded-2xl bg-black/70 border border-stone-800 flex items-center justify-center min-h-[160px] relative overflow-hidden">
                  <div className="text-center space-y-2">
                    <Target className="w-12 h-12 text-red-600/60 mx-auto" />
                    <div className="text-xs font-mono text-stone-400">
                      [ {currentWeapon.type} ] — {currentWeapon.caliber}
                    </div>
                  </div>
                  {isUpgraded && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/50 text-[10px] font-mono font-bold text-emerald-400">
                      MODIFIED SPEC
                    </div>
                  )}
                </div>

                <p className="text-xs text-stone-400 font-mono leading-relaxed bg-stone-900/40 p-3 rounded-xl border border-stone-800/80">
                  {currentWeapon.description}
                </p>
              </div>
            </div>

            {/* Carousel Selector Footer */}
            <div className="flex items-center justify-between border-t border-stone-800 pt-3">
              <span className="text-xs font-mono text-stone-500">
                Switch weapon via arrows or select category
              </span>

              <div className="flex gap-2">
                {weapons.map((w, idx) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWeaponIndex(idx)}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                      selectedWeaponIndex === idx
                        ? 'bg-red-600 text-white'
                        : 'bg-stone-900 text-stone-400 hover:text-white'
                    }`}
                  >
                    {w.type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ================= STATE 5: MISSIONS SCREEN ================= */}
        {gameState === 'missions' && (
          <div className="relative z-10 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2">
                <Crosshair className="w-4 h-4 text-red-500" />
                <h2 className="text-lg font-mono font-bold text-white tracking-widest uppercase">
                  OPERATIONAL THEATRES
                </h2>
              </div>

              <button
                onClick={() => setGameState('menu')}
                className="px-3 py-1 rounded-lg text-xs font-mono font-semibold text-stone-400 hover:text-white bg-stone-900 border border-stone-800"
              >
                BACK TO LOBBY
              </button>
            </div>

            {/* Mission Carousel Stage (Battle Ground / Missile Ground / Eye Ground) */}
            <div className="my-auto py-6 space-y-6">
              <div className="flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedMissionIndex((prev) => (prev === 0 ? missions.length - 1 : prev - 1))}
                  className="p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-red-600 text-stone-300 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Active Mission Card */}
                <div className={`flex-1 max-w-xl p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${currentMission.bgGradient} border border-stone-700 shadow-2xl text-center space-y-3`}>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-red-500 uppercase">
                    THEATRE 0{selectedMissionIndex + 1} • {currentMission.threatLevel}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-wide">
                    {currentMission.name.toUpperCase()}
                  </h3>

                  <div className="text-xs font-mono text-stone-300 font-semibold">
                    {currentMission.subtitle} • {currentMission.environment}
                  </div>

                  <p className="text-xs text-stone-300 font-mono max-w-md mx-auto leading-relaxed pt-1">
                    {currentMission.objective}
                  </p>

                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => triggerNotice(`Deployed to ${currentMission.name}! Loading map assets...`)}
                      className="px-8 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs tracking-widest uppercase shadow-lg shadow-red-950 transition-all cursor-pointer"
                    >
                      SELECT THEATRE
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedMissionIndex((prev) => (prev === missions.length - 1 ? 0 : prev + 1))}
                  className="p-3 rounded-xl bg-stone-900 border border-stone-800 hover:border-red-600 text-stone-300 hover:text-white transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Mission Indicators */}
              <div className="flex justify-center gap-2">
                {missions.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMissionIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      selectedMissionIndex === idx ? 'w-8 bg-red-600' : 'w-2 bg-stone-800 hover:bg-stone-700'
                    }`}
                    title={m.name}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Nav */}
            <div className="flex items-center justify-between border-t border-stone-800 pt-3">
              <button
                onClick={() => setGameState('menu')}
                className="text-xs font-mono text-stone-400 hover:text-white"
              >
                ← Return to Barracks
              </button>

              <span className="text-xs font-mono text-stone-500">
                Mission {selectedMissionIndex + 1} of {missions.length}
              </span>
            </div>
          </div>
        )}

      </div>

      {/* Footer Banner linking to the Adobe XD Prototype */}
      <div className="p-4 bg-[#0E1015] border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-stone-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Complete prototype wireframes & micro-interactions available in Adobe XD.</span>
        </div>

        <a
          href={prototypeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-stone-200 hover:text-red-400 font-bold transition-colors"
        >
          <span>Open Full XD Artboards (xd.adobe.com)</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

    </div>
  );
};
