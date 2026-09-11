import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Heart, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Share2, 
  Check, 
  ChevronRight, 
  Send, 
  User, 
  MessageSquare, 
  Home, 
  CreditCard, 
  CheckCircle, 
  Camera, 
  Settings, 
  LogOut,
  Sparkles,
  Flame
} from 'lucide-react';

export const FoodgoInteractiveScreen: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<
    'home' | 'detail' | 'customize' | 'checkout' | 'success' | 'profile' | 'chat'
  >('home');

  // Interactive states
  const [spicyLevel, setSpicyLevel] = useState<number>(3); // 1 to 5
  const [portion, setPortion] = useState<number>(2);
  const [selectedBurger, setSelectedBurger] = useState<string>("Cheeseburger Wendy's Burger");
  const [selectedBurgerPrice, setSelectedBurgerPrice] = useState<number>(8.24);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Customization toppings & sides
  const [selectedToppings, setSelectedToppings] = useState<string[]>(['Tomato', 'Pickles']);
  const [selectedSides, setSelectedSides] = useState<string[]>(['Fries']);
  
  // Payment
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'mastercard' | 'visa'>('mastercard');
  const [saveCard, setSaveCard] = useState<boolean>(true);

  // Chat
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string; time?: string }>>([
    { sender: 'agent', text: 'Hi, how can I help you?' },
    { sender: 'user', text: 'Hello, I ordered two fried chicken burgers, can I know how much time it will get to arrive?' },
    { sender: 'agent', text: 'Ok, please let me check!' },
    { sender: 'user', text: 'Sure...' },
    { sender: 'agent', text: "It'll get 25 minutes to arrive to your address", time: '25 minutes ago' },
    { sender: 'user', text: 'Ok, thanks for your support' },
  ]);
  const [chatInput, setChatInput] = useState<string>('');

  const burgers = [
    {
      id: 'wendys',
      name: "Cheeseburger Wendy's Burger",
      desc: "Wendy's Burger",
      rating: 4.9,
      prepTime: '26 mins',
      price: 8.24,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'veggie',
      name: 'Hamburger Veggie Burger',
      desc: 'Veggie Burger',
      rating: 4.8,
      prepTime: '19 mins',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'chicken',
      name: 'Hamburger Chicken Burger',
      desc: 'Chicken Burger',
      rating: 4.6,
      prepTime: '42 mins',
      price: 12.48,
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: 'fried-chicken',
      name: 'Fried Chicken Burger',
      desc: 'Fried Chicken Burger',
      rating: 4.5,
      prepTime: '14 mins',
      price: 26.99,
      image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: chatInput },
      { sender: 'agent', text: 'Your courier is approaching your street now! Enjoy your Foodgo meal.' }
    ]);
    setChatInput('');
  };

  const toggleTopping = (topping: string) => {
    setSelectedToppings(prev => 
      prev.includes(topping) ? prev.filter(t => t !== topping) : [...prev, topping]
    );
  };

  const toggleSide = (side: string) => {
    setSelectedSides(prev => 
      prev.includes(side) ? prev.filter(s => s !== side) : [...prev, side]
    );
  };

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-slate-900 shadow-2xl overflow-hidden p-3 sm:p-6 text-slate-900">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-red-900/30">
            F
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">Foodgo Mobile Simulator</h3>
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-mono font-bold">
                Figma Frame 45-113
              </span>
            </div>
            <p className="text-slate-400 text-xs">Explore all high-fidelity Figma screens with interactive controls.</p>
          </div>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-800/90 rounded-xl border border-slate-700/60 max-w-full overflow-x-auto">
          {[
            { id: 'home', label: 'Home Feed' },
            { id: 'detail', label: 'Dish Detail' },
            { id: 'customize', label: 'Exploded Builder' },
            { id: 'checkout', label: 'Checkout' },
            { id: 'profile', label: 'Profile' },
            { id: 'chat', label: 'Live Support' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveScreen(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeScreen === tab.id
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* iPhone Frame Container */}
      <div className="flex justify-center items-center py-2">
        <div className="w-full max-w-[380px] bg-white rounded-[44px] shadow-2xl border-[10px] border-slate-800 relative overflow-hidden flex flex-col min-h-[640px] max-h-[700px]">
          
          {/* iOS Status Bar */}
          <div className="w-full h-7 bg-white flex items-center justify-between px-6 text-[11px] font-bold text-slate-800 select-none z-20 shrink-0">
            <span>9:41</span>
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

          {/* SCREEN CONTENT AREA */}
          <div className="flex-1 overflow-y-auto relative pb-16">
            
            {/* 1. HOME SCREEN */}
            {activeScreen === 'home' && (
              <div className="p-5 space-y-4">
                {/* Header with Sophia avatar */}
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 font-serif italic">
                      Foodgo
                    </h1>
                    <p className="text-xs text-slate-400 font-medium">order your favorite food!</p>
                  </div>
                  <button 
                    onClick={() => setActiveScreen('profile')}
                    className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-red-500/20 hover:scale-105 transition-transform"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                      alt="Sophia Patel"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-slate-100/90 text-slate-400 text-xs border border-slate-200/50">
                    <Search className="w-4 h-4 text-slate-400" />
                    <span>Search burgers, combos...</span>
                  </div>
                  <button 
                    onClick={() => setActiveScreen('customize')}
                    className="w-10 h-10 rounded-2xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/30 hover:bg-red-700 transition-colors"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                  </button>
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                  {['All', 'Combos', 'Sliders', 'Classic', 'Drinks'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Burger Grid (2-Column) */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {burgers.map((burger) => (
                    <div
                      key={burger.id}
                      onClick={() => {
                        setSelectedBurger(burger.name);
                        setSelectedBurgerPrice(burger.price);
                        setActiveScreen('detail');
                      }}
                      className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col group relative"
                    >
                      <button 
                        onClick={(e) => { e.stopPropagation(); }}
                        className="absolute top-2.5 right-2.5 p-1 rounded-full text-slate-300 hover:text-red-500 transition-colors"
                      >
                        <Heart className="w-3.5 h-3.5" />
                      </button>

                      <div className="w-full h-24 rounded-xl overflow-hidden mb-2 bg-slate-50 flex items-center justify-center">
                        <img 
                          src={burger.image} 
                          alt={burger.name} 
                          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{burger.name}</h4>
                      <span className="text-[10px] text-slate-400">{burger.desc}</span>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-1 text-[11px] font-bold text-slate-800">
                          <span className="text-amber-500">★</span>
                          <span>{burger.rating}</span>
                        </div>
                        <span className="text-xs font-extrabold text-red-600">${burger.price.toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. PRODUCT DETAIL SCREEN */}
            {activeScreen === 'detail' && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveScreen('home')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Burger Details</span>
                  <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Large Hero Burger Image */}
                <div className="w-full h-44 rounded-2xl overflow-hidden bg-gradient-to-b from-slate-50 to-red-50/30 p-2 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80" 
                    alt="Wendy's Burger" 
                    className="w-40 h-40 object-contain drop-shadow-xl"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Title & Ratings */}
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">{selectedBurger}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-0.5">
                      ★ 4.9
                    </span>
                    <span className="text-xs text-slate-400">• 26 mins delivery</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed">
                  The {selectedBurger} is a classic fast food burger that packs a punch of flavor in every bite. Made with a juicy beef patty cooked to perfection, it's topped with melted American cheese, crispy lettuce, ripe tomato, and crunchy pickles.
                </p>

                {/* Interactive Spicy Slider (Frame 88 / 106) */}
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-red-500" />
                      Spicy Level
                    </span>
                    <span className="text-[11px] font-mono text-red-600">
                      {spicyLevel === 1 ? 'Mild' : spicyLevel === 2 ? 'Medium' : spicyLevel === 3 ? 'Spicy' : 'Flaming Hot'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-emerald-600">Mild</span>
                    <input 
                      type="range" 
                      min="1" 
                      max="4" 
                      value={spicyLevel} 
                      onChange={(e) => setSpicyLevel(Number(e.target.value))}
                      className="flex-1 accent-red-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <span className="text-[10px] font-bold text-red-600">Hot</span>
                  </div>
                </div>

                {/* Portion Stepper */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-xs font-bold text-slate-800">Portion</span>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setPortion(Math.max(1, portion - 1))}
                      className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold text-slate-900 w-4 text-center">{portion}</span>
                    <button 
                      onClick={() => setPortion(portion + 1)}
                      className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center gap-3 pt-2">
                  <div className="px-4 py-3 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-black text-base">
                    ${(selectedBurgerPrice * portion).toFixed(2)}
                  </div>
                  <button 
                    onClick={() => setActiveScreen('customize')}
                    className="flex-1 py-3 px-4 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>CUSTOMIZE & ORDER</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* 3. CUSTOMIZE & EXPLODED BURGER (Frame 96, Frame 110) */}
            {activeScreen === 'customize' && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveScreen('detail')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Figma Frame 110</span>
                  <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Customize Your Burger to Your Tastes
                  </h3>
                  <p className="text-[11px] text-slate-400">Ultimate Craft Experience with real-time ingredients.</p>
                </div>

                {/* Exploded / Deconstructed Burger Visual */}
                <div className="relative p-3 rounded-2xl bg-gradient-to-b from-red-50/50 to-amber-50/50 border border-red-100 flex flex-col items-center justify-center py-4 space-y-1">
                  <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Deconstructed Layers
                  </div>
                  {/* Layer stack */}
                  <div className="w-24 h-6 rounded-t-full bg-amber-400 border border-amber-500 flex items-center justify-center text-[8px] font-bold text-amber-900 shadow-xs">
                    Top Sesame Bun
                  </div>
                  <div className="w-20 h-3 rounded-full bg-red-500 text-white flex items-center justify-center text-[7px] font-bold shadow-xs">
                    Sliced Red Tomatoes
                  </div>
                  <div className="w-22 h-3 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[7px] font-bold shadow-xs">
                    Crisp Pickles & Relish
                  </div>
                  <div className="w-24 h-4 rounded bg-amber-300 border-t border-amber-400 flex items-center justify-center text-[8px] font-bold text-amber-950 shadow-xs">
                    Melted Cheddar Cheese
                  </div>
                  <div className="w-24 h-5 rounded-md bg-stone-700 text-white flex items-center justify-center text-[8px] font-bold shadow-xs">
                    Flame-Grilled Beef Patty
                  </div>
                  <div className="w-26 h-4 rounded-b-xl bg-amber-500 flex items-center justify-center text-[8px] font-bold text-amber-950 shadow-xs">
                    Toasted Bottom Bun
                  </div>
                </div>

                {/* Toppings Section */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800">Select Toppings</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { name: 'Tomato', emoji: '🍅' },
                      { name: 'Onions', emoji: '🧅' },
                      { name: 'Pickles', emoji: '🥒' },
                      { name: 'Bacon', emoji: '🥓' },
                    ].map((item) => {
                      const isSelected = selectedToppings.includes(item.name);
                      return (
                        <button
                          key={item.name}
                          onClick={() => toggleTopping(item.name)}
                          className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                            isSelected 
                              ? 'border-red-500 bg-red-50/50 shadow-xs' 
                              : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-base">{item.emoji}</span>
                          <span className="text-[10px] font-bold text-slate-800">{item.name}</span>
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                            isSelected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isSelected ? '✓' : '+'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Side Options Section */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800">Side Options</span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { name: 'Fries', emoji: '🍟' },
                      { name: 'Coleslaw', emoji: '🥗' },
                      { name: 'Salad', emoji: '🥬' },
                      { name: 'Onion rings', emoji: '🧅' },
                    ].map((item) => {
                      const isSelected = selectedSides.includes(item.name);
                      return (
                        <button
                          key={item.name}
                          onClick={() => toggleSide(item.name)}
                          className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                            isSelected 
                              ? 'border-red-500 bg-red-50/50 shadow-xs' 
                              : 'border-slate-200 bg-slate-50/70 hover:bg-slate-100'
                          }`}
                        >
                          <span className="text-base">{item.emoji}</span>
                          <span className="text-[10px] font-bold text-slate-800">{item.name}</span>
                          <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] ${
                            isSelected ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {isSelected ? '✓' : '+'}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Checkout Footer */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-medium">Total</span>
                    <span className="text-base font-black text-red-600">$16.49</span>
                  </div>
                  <button 
                    onClick={() => setActiveScreen('checkout')}
                    className="px-6 py-3 rounded-2xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors shadow-md shadow-red-500/20"
                  >
                    ORDER NOW
                  </button>
                </div>
              </div>
            )}

            {/* 4. CHECKOUT SCREEN (Frame 102, Frame 111) */}
            {activeScreen === 'checkout' && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveScreen('customize')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Checkout</span>
                  <button className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700">
                    <Search className="w-4 h-4" />
                  </button>
                </div>

                {/* Order Summary Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="text-xs font-bold text-slate-900 block">Order Summary</span>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-600">
                      <span>Order</span>
                      <span>$16.49</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Taxes</span>
                      <span>$0.30</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Delivery fees</span>
                      <span>$1.50</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                      <span>Total:</span>
                      <span>$18.19</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 pt-1">Estimated delivery time: 15-30mins</p>
                </div>

                {/* Payment Methods (Frame 111) */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-900">Payment methods</span>
                  
                  {/* Mastercard */}
                  <div
                    onClick={() => setSelectedPaymentMethod('mastercard')}
                    className={`p-3 rounded-2xl flex items-center justify-between border cursor-pointer transition-all ${
                      selectedPaymentMethod === 'mastercard'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-5 rounded bg-red-500/20 flex items-center justify-center text-[9px] font-extrabold text-red-500">
                        MC
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Credit card</span>
                        <span className={`text-[10px] ${selectedPaymentMethod === 'mastercard' ? 'text-slate-400' : 'text-slate-500'}`}>
                          5105 •••• •••• 0505
                        </span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedPaymentMethod === 'mastercard' ? 'border-red-500 bg-red-500' : 'border-slate-300'
                    }`}>
                      {selectedPaymentMethod === 'mastercard' && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                  </div>

                  {/* Visa */}
                  <div
                    onClick={() => setSelectedPaymentMethod('visa')}
                    className={`p-3 rounded-2xl flex items-center justify-between border cursor-pointer transition-all ${
                      selectedPaymentMethod === 'visa'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                        : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-5 rounded bg-blue-500/20 flex items-center justify-center text-[9px] font-extrabold text-blue-600">
                        VISA
                      </div>
                      <div>
                        <span className="text-xs font-bold block">Debit card</span>
                        <span className={`text-[10px] ${selectedPaymentMethod === 'visa' ? 'text-slate-400' : 'text-slate-500'}`}>
                          3566 •••• •••• 0505
                        </span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedPaymentMethod === 'visa' ? 'border-red-500 bg-red-500' : 'border-slate-300'
                    }`}>
                      {selectedPaymentMethod === 'visa' && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                  </div>

                  {/* Save card checkbox */}
                  <label className="flex items-center gap-2 text-[11px] text-slate-600 pt-1 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={saveCard} 
                      onChange={(e) => setSaveCard(e.target.checked)}
                      className="accent-red-600 rounded" 
                    />
                    <span>Save card details for future payments</span>
                  </label>
                </div>

                {/* Bottom Trigger */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Total price</span>
                    <span className="text-base font-black text-slate-900">$18.19</span>
                  </div>
                  <button 
                    onClick={() => setActiveScreen('success')}
                    className="px-8 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors shadow-md"
                  >
                    PAY NOW
                  </button>
                </div>
              </div>
            )}

            {/* 5. SUCCESS MODAL (Frame 103) */}
            {activeScreen === 'success' && (
              <div className="p-6 h-full flex flex-col items-center justify-center text-center space-y-4 my-auto">
                <div className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-500/30 animate-bounce">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-red-600">Success !</h2>
                  <p className="text-xs text-slate-500 mt-2 max-w-[240px] leading-relaxed">
                    Your payment was successful. A receipt for this purchase has been sent in your email.
                  </p>
                </div>
                <div className="pt-4 w-full">
                  <button 
                    onClick={() => setActiveScreen('home')}
                    className="w-full py-3 rounded-2xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 transition-colors shadow-md shadow-red-500/20"
                  >
                    Go Back
                  </button>
                </div>
              </div>
            )}

            {/* 6. PROFILE SCREEN (Frame 104, Frame 112) */}
            {activeScreen === 'profile' && (
              <div className="space-y-4">
                {/* Red Banner with Avatar */}
                <div className="bg-gradient-to-b from-red-600 to-red-500 p-6 pt-4 text-white relative rounded-b-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <button 
                      onClick={() => setActiveScreen('home')}
                      className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                        <img 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80" 
                          alt="Sophia Patel" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white text-red-600 flex items-center justify-center shadow-xs">
                        <Camera className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form Fields Matching Frame 104 */}
                <div className="px-5 space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Name</label>
                    <div className="px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white">
                      Sophia Patel
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Email</label>
                    <div className="px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white">
                      sophiapatel@gmail.com
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Delivery address</label>
                    <div className="px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white">
                      123 Main St Apartment 4A, New York, NY
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 block mb-1">Password</label>
                    <div className="px-3.5 py-2.5 rounded-2xl border border-slate-200 text-xs font-semibold text-slate-800 bg-white">
                      ••••••••
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="pt-2 space-y-1">
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs font-semibold text-slate-700 cursor-pointer hover:text-red-600">
                      <span>Payment Details</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-slate-100 text-xs font-semibold text-slate-700 cursor-pointer hover:text-red-600">
                      <span>Order history</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-3">
                    <button className="flex-1 py-2.5 rounded-2xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-1.5">
                      <span>Edit Profile</span>
                    </button>
                    <button 
                      onClick={() => setActiveScreen('home')}
                      className="flex-1 py-2.5 rounded-2xl border border-red-500 text-red-600 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-red-50"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 7. LIVE SUPPORT CHAT (Frame 105, Frame 113) */}
            {activeScreen === 'chat' && (
              <div className="p-4 h-full flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <button 
                    onClick={() => setActiveScreen('home')}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-900 block">Foodgo Support</span>
                    <span className="text-[10px] text-emerald-600 font-medium">● Online</span>
                  </div>
                  <div className="w-7"></div>
                </div>

                {/* Messages stream */}
                <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  {chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex gap-2 items-end ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      {msg.sender === 'agent' && (
                        <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] shrink-0">
                          <User className="w-3 h-3" />
                        </div>
                      )}
                      <div
                        className={`max-w-[78%] p-3 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-red-600 text-white rounded-br-xs shadow-xs'
                            : 'bg-slate-100 text-slate-800 rounded-bl-xs'
                        }`}
                      >
                        <p>{msg.text}</p>
                        {msg.time && (
                          <span className="text-[9px] text-slate-400 mt-1 block">{msg.time}</span>
                        )}
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                          <img 
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                            alt="Sophia" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Chat Input Bar */}
                <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type here..."
                    className="flex-1 px-3.5 py-2.5 rounded-full bg-slate-100 text-xs text-slate-800 border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                  <button 
                    type="submit"
                    className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-500/30 hover:bg-red-700"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}

          </div>

          {/* Curved Red Bottom Navigation Bar (Frame 45 & Variations) */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-red-600 flex items-center justify-around px-4 text-white z-20 shadow-lg">
            <button 
              onClick={() => setActiveScreen('home')}
              className={`p-2 transition-transform ${activeScreen === 'home' ? 'scale-110 font-bold' : 'opacity-80'}`}
              title="Home"
            >
              <Home className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveScreen('profile')}
              className={`p-2 transition-transform ${activeScreen === 'profile' ? 'scale-110 font-bold' : 'opacity-80'}`}
              title="Profile"
            >
              <User className="w-5 h-5" />
            </button>
            
            {/* Floating center action button (+) */}
            <button 
              onClick={() => setActiveScreen('customize')}
              className="w-10 h-10 -mt-6 rounded-full bg-white text-red-600 flex items-center justify-center shadow-lg border-2 border-red-600 hover:scale-110 transition-transform font-bold"
              title="Quick Customize"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button 
              onClick={() => setActiveScreen('chat')}
              className={`p-2 transition-transform ${activeScreen === 'chat' ? 'scale-110 font-bold' : 'opacity-80'}`}
              title="Live Chat"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveScreen('detail')}
              className={`p-2 transition-transform ${activeScreen === 'detail' ? 'scale-110 font-bold' : 'opacity-80'}`}
              title="Favorites"
            >
              <Heart className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
