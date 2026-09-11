import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Bookmark, 
  Ticket, 
  User, 
  Search, 
  Filter, 
  Star, 
  ArrowRight, 
  ArrowLeft, 
  CreditCard, 
  CheckCircle2, 
  Check, 
  RefreshCw, 
  Plane, 
  Building, 
  Bus, 
  Calendar as CalendarIcon, 
  Share2, 
  Heart,
  ChevronRight
} from 'lucide-react';

export const TravioInteractiveScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'explore' | 'detail' | 'booking' | 'summary' | 'payment' | 'success'>('explore');
  const [ticketMode, setTicketMode] = useState<'flight' | 'hotel' | 'bus'>('flight');
  const [tripType, setTripType] = useState<'one-way' | 'round-trip'>('round-trip');
  const [fromCity, setFromCity] = useState('Bangalore (BLR)');
  const [toCity, setToCity] = useState('Mumbai (BOM)');
  const [paymentMethod, setPaymentMethod] = useState<'card-mastercard' | 'card-visa' | 'upi-gpay' | 'upi-phonepe'>('card-mastercard');
  const [isProcessing, setIsProcessing] = useState(false);

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
  };

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab('success');
    }, 1500);
  };

  return (
    <div className="rounded-3xl border border-amber-900/40 bg-slate-950 shadow-2xl overflow-hidden p-3 sm:p-6 text-slate-900">
      
      {/* Top Controller Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-slate-800 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-amber-900/40">
            ⛰️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-base">Travio Interactive Prototype</h3>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-mono font-bold">
                iPhone 17 Frames 1-21
              </span>
            </div>
            <p className="text-slate-400 text-xs">Seamless flight & travel booking with express checkout and confirmation.</p>
          </div>
        </div>

        {/* Screen Switcher Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 max-w-full overflow-x-auto">
          {[
            { id: 'explore', label: 'Explore Feed' },
            { id: 'detail', label: 'Himalaya Detail' },
            { id: 'booking', label: 'Ticket Booking' },
            { id: 'summary', label: 'Trip Summary' },
            { id: 'payment', label: 'Payment Options' },
            { id: 'success', label: 'Confirmation' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
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
        <div className="w-full max-w-[380px] bg-white rounded-[44px] shadow-2xl border-[10px] border-slate-800 relative overflow-hidden flex flex-col min-h-[640px] max-h-[700px] select-none">
          
          {/* iOS Status Bar */}
          <div className="w-full h-7 bg-white flex items-center justify-between px-6 text-[11px] font-bold text-slate-800 select-none z-20 shrink-0">
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
            
            {/* 1. EXPLORE FEED (iPhone 17 - 6) */}
            {activeTab === 'explore' && (
              <div className="space-y-4">
                {/* Header with Leonardo */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-extrabold text-slate-900">Hi, Leonardo!</h2>
                    <p className="text-[11px] text-slate-500">Explore the world</p>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-amber-100 border-2 border-white overflow-hidden shadow-2xs">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" 
                      alt="Leonardo" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                {/* Search Bar with Filter */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-100 text-xs text-slate-400">
                    <Search className="w-4 h-4 text-slate-400" />
                    <span>Search destinations, flights...</span>
                  </div>
                  <button className="p-2 rounded-2xl bg-slate-900 text-white shadow-xs">
                    <Filter className="w-4 h-4" />
                  </button>
                </div>

                {/* Category Pills */}
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  {[
                    { id: 'flight', label: 'Flight', icon: '✈️' },
                    { id: 'hotel', label: 'Hotel', icon: '🏨' },
                    { id: 'train', label: 'Train', icon: '🚆' },
                    { id: 'car', label: 'Car', icon: '🚗' },
                  ].map((cat) => (
                    <div 
                      key={cat.id} 
                      onClick={() => setActiveTab('booking')}
                      className="flex flex-col items-center gap-1 cursor-pointer hover:text-amber-600"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-base shadow-2xs">
                        {cat.icon}
                      </div>
                      <span className="text-[10px] font-semibold">{cat.label}</span>
                    </div>
                  ))}
                </div>

                {/* Popular Places Header */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Popular Places</span>
                    <span className="text-[11px] text-amber-600 font-bold hover:underline cursor-pointer">View All</span>
                  </div>

                  {/* Hero Destination Card: Himalaya (Frame 6) */}
                  <div 
                    onClick={() => setActiveTab('detail')}
                    className="rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm cursor-pointer hover:shadow-md transition-shadow group"
                  >
                    <div className="relative h-40 bg-slate-800 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80" 
                        alt="Himalaya, India" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span>4.9</span>
                      </div>
                      <div className="absolute bottom-3 left-3 text-white">
                        <h3 className="text-sm font-extrabold drop-shadow-md">Himalaya</h3>
                        <p className="text-[10px] text-slate-200 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          <span>India</span>
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400">Starting from</span>
                        <div className="text-sm font-extrabold text-slate-900">$1,200 <span className="text-[10px] font-normal text-slate-500">/ package</span></div>
                      </div>

                      <button className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                        Explore →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. DESTINATION DETAIL (iPhone 17 - 10) */}
            {activeTab === 'detail' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('explore')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Destination</span>
                  <button className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs border border-slate-200">
                    <Heart className="w-4 h-4 text-rose-500" />
                  </button>
                </div>

                <div className="rounded-3xl overflow-hidden h-48 relative border border-slate-200">
                  <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80" 
                    alt="Himalaya" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 text-white">
                    <div>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>4.9 (420 reviews)</span>
                      </div>
                      <h3 className="text-lg font-black">Himalaya, India</h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800">Overview</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The Himalayas are the world's highest and youngest mountain system stretching over 2,400 kilometres across Asia. Includes guided alpine base camp trekking and private flights.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                  <div>
                    <span className="text-[10px] text-slate-400">Total Price</span>
                    <div className="text-lg font-black text-slate-900">$1,200</div>
                  </div>

                  <button
                    onClick={() => setActiveTab('booking')}
                    className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Book a Ticket
                  </button>
                </div>
              </div>
            )}

            {/* 3. TICKET BOOKING SCREEN (iPhone 17 - 8) */}
            {activeTab === 'booking' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('explore')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Ticket Booking</span>
                  <div className="w-7"></div>
                </div>

                {/* Flight / Hotel / Bus Switcher (Frame 8) */}
                <div className="flex p-1 rounded-2xl bg-slate-100 text-xs font-bold">
                  {[
                    { id: 'flight', label: 'Flight', icon: <Plane className="w-3.5 h-3.5" /> },
                    { id: 'hotel', label: 'Hotel', icon: <Building className="w-3.5 h-3.5" /> },
                    { id: 'bus', label: 'Bus', icon: <Bus className="w-3.5 h-3.5" /> },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setTicketMode(mode.id as any)}
                      className={`flex-1 py-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                        ticketMode === mode.id ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-500'
                      }`}
                    >
                      {mode.icon}
                      <span>{mode.label}</span>
                    </button>
                  ))}
                </div>

                {/* Trip Type Selector */}
                <div className="flex items-center gap-4 text-xs font-bold px-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="tripType" 
                      checked={tripType === 'one-way'} 
                      onChange={() => setTripType('one-way')}
                      className="accent-slate-900"
                    />
                    <span>One way</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="tripType" 
                      checked={tripType === 'round-trip'} 
                      onChange={() => setTripType('round-trip')}
                      className="accent-slate-900"
                    />
                    <span>Round way</span>
                  </label>
                </div>

                {/* Cities From & To with Swap */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3 relative">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold">From</span>
                    <span className="text-xs font-extrabold text-slate-900">{fromCity}</span>
                  </div>

                  {/* Swap Button */}
                  <button 
                    onClick={swapCities}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 shadow-xs cursor-pointer transition-transform active:rotate-180"
                    title="Swap Departure and Destination"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>

                  <div className="pt-2 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">To</span>
                    <span className="text-xs font-extrabold text-slate-900">{toCity}</span>
                  </div>
                </div>

                {/* Dates & Passengers */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs">
                    <span className="text-[10px] text-slate-400 block">Depart</span>
                    <span className="font-bold text-slate-900">28 October 26</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs">
                    <span className="text-[10px] text-slate-400 block">Return</span>
                    <span className="font-bold text-slate-900">12 October 26</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs flex justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Passenger</span>
                    <span className="font-bold text-slate-900">2 Adult, 2 Kids</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Class</span>
                    <span className="font-bold text-slate-900">Economy</span>
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div className="text-lg font-black text-slate-900">$1,200</div>
                  <button
                    onClick={() => setActiveTab('summary')}
                    className="px-6 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Proceed to Summary →
                  </button>
                </div>
              </div>
            )}

            {/* 4. TRIP SUMMARY (iPhone 17 - 2) */}
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('booking')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Summary</span>
                  <div className="w-7"></div>
                </div>

                {/* Destination Hero Card */}
                <div className="p-3.5 rounded-3xl bg-white border border-slate-200 shadow-xs flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&auto=format&fit=crop&q=80" 
                    alt="Himalaya" 
                    className="w-16 h-16 rounded-2xl object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="text-xs font-black text-slate-900">Himalaya, India</h4>
                    <span className="text-[10px] text-slate-500 block">May 20 - May 27</span>
                    <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[9px] font-bold">
                      7 Days Adventure
                    </span>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5 text-xs">
                  <span className="font-bold text-slate-900 block text-xs">Trip Breakdown</span>
                  
                  <div className="flex justify-between text-slate-600">
                    <span>Travelers</span>
                    <span className="font-semibold text-slate-800">2 Adult, 2 Kids</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Trip Base Fare</span>
                    <span className="font-mono text-slate-800">$964.0</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Taxes & Airport Surcharge</span>
                    <span className="font-mono text-slate-800">$236.0</span>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex justify-between text-sm font-extrabold text-slate-900">
                    <span>Total Cost</span>
                    <span className="text-emerald-600">$1,200.0</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('payment')}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer mt-2"
                >
                  Continue to Payment →
                </button>
              </div>
            )}

            {/* 5. PAYMENT OPTIONS (iPhone 17 - 15) */}
            {activeTab === 'payment' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setActiveTab('summary')}
                    className="p-1.5 rounded-xl bg-white text-slate-700 shadow-2xs border border-slate-200"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-bold text-slate-800">Payment method</span>
                  <div className="w-7"></div>
                </div>

                {/* Card Payments */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Card Payments</span>
                  
                  {/* Mastercard */}
                  <div 
                    onClick={() => setPaymentMethod('card-mastercard')}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card-mastercard' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center font-bold text-xs text-red-500">
                        🔴🟠
                      </div>
                      <div>
                        <div className="text-xs font-bold">Credit card</div>
                        <div className={`text-[10px] font-mono ${paymentMethod === 'card-mastercard' ? 'text-slate-300' : 'text-slate-400'}`}>
                          5244 **** **** 3912
                        </div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'card-mastercard' ? 'border-white bg-white text-slate-950' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'card-mastercard' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Visa */}
                  <div 
                    onClick={() => setPaymentMethod('card-visa')}
                    className={`p-3.5 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                      paymentMethod === 'card-visa' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center font-bold text-xs text-blue-500">
                        💳
                      </div>
                      <div>
                        <div className="text-xs font-bold">Debit card</div>
                        <div className={`text-[10px] font-mono ${paymentMethod === 'card-visa' ? 'text-slate-300' : 'text-slate-400'}`}>
                          4111 **** **** 8820
                        </div>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      paymentMethod === 'card-visa' ? 'border-white bg-white text-slate-950' : 'border-slate-300'
                    }`}>
                      {paymentMethod === 'card-visa' && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>

                {/* UPI Payments */}
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">UPI Payments</span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'upi-gpay', label: 'Google Pay', icon: '🌐' },
                      { id: 'upi-phonepe', label: 'PhonePe', icon: '🟣' },
                    ].map((upi) => (
                      <div
                        key={upi.id}
                        onClick={() => setPaymentMethod(upi.id as any)}
                        className={`p-3 rounded-2xl border text-center cursor-pointer text-xs font-bold transition-all ${
                          paymentMethod === upi.id ? 'border-slate-900 bg-slate-100 text-slate-900' : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        <span className="text-lg block mb-1">{upi.icon}</span>
                        {upi.label}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer mt-3 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Processing Payment...</span>
                    </>
                  ) : (
                    <span>PAY $1,200.0 NOW</span>
                  )}
                </button>
              </div>
            )}

            {/* 6. BOOKING CONFIRMED (iPhone 17 - 12 & 13) */}
            {activeTab === 'success' && (
              <div className="text-center py-6 space-y-4">
                {/* Confetti Circle */}
                <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-lg animate-bounce">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Booking Confirmed!</span>
                  <h3 className="text-xl font-black text-slate-900">Success!</h3>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Your trip to Himalaya is all set. We've sent the booking vouchers & flight tickets to your registered email.
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Booking ID:</span>
                    <span className="font-mono font-bold text-slate-800">TRV-8942-HL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Destination:</span>
                    <span className="font-bold text-slate-800">Himalaya, India</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Paid:</span>
                    <span className="font-bold text-emerald-600 font-mono">$1,200.0</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('explore')}
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                >
                  Back to Home
                </button>
              </div>
            )}

          </div>

          {/* Bottom Dock Navigation */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-white border-t border-slate-200 flex items-center justify-around px-4 text-slate-400 z-20 shadow-lg">
            <button 
              onClick={() => setActiveTab('explore')}
              className={`p-2 transition-colors ${activeTab === 'explore' ? 'text-slate-900' : 'hover:text-slate-600'}`}
              title="Explore"
            >
              <Compass className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('detail')}
              className={`p-2 transition-colors ${activeTab === 'detail' ? 'text-slate-900' : 'hover:text-slate-600'}`}
              title="Destinations"
            >
              <MapPin className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('booking')}
              className={`p-2 transition-colors ${activeTab === 'booking' ? 'text-slate-900' : 'hover:text-slate-600'}`}
              title="Booking"
            >
              <Ticket className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('summary')}
              className={`p-2 transition-colors ${activeTab === 'summary' ? 'text-slate-900' : 'hover:text-slate-600'}`}
              title="History"
            >
              <Bookmark className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setActiveTab('explore')}
              className="p-2 hover:text-slate-600 transition-colors"
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
