import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

// Scenario scripts
const scenarios = {
  popular: {
    customer: "What is your most popular dish tonight?",
    agent: "Tonight's crowd-favorite is our Truffle Risotto 🍄 — prepared with wild porcini mushrooms, fresh truffle oil, and aged parmesan. It has been ordered 34 times this week! Shall I add one for your table?",
    badge: "Upsell Opportunity",
    kdsUpdate: null
  },
  dietary: {
    customer: "Do you have any gluten-free dishes?",
    agent: "Yes, absolutely! Our Pan-Seared Salmon 🐟 is entirely gluten-free and served with organic wild rice. I will also flag your order as a severe gluten allergy to the kitchen. Would you like to order that?",
    badge: "Allergy Safe-Lock",
    kdsUpdate: null
  },
  pairing: {
    customer: "Can you recommend a wine to go with the salmon?",
    agent: "Excellent choice! I recommend pairing the salmon with our crisp Sonoma Chardonnay 🥂. It cuts through the rich flavor beautifully. Would you like me to add a glass for $12?",
    badge: "Smart Cross-Sell",
    kdsUpdate: null
  },
  checkout: {
    customer: "Yes, add the salmon and chardonnay. Table 7.",
    agent: "Done! I've placed the order: 1x Pan-Seared Salmon (Severe Gluten Allergy) + 1x Sonoma Chardonnay. Kitchen has been notified. Estimated prep time: 14 minutes. 💳 Your total is updated in POS.",
    badge: "Instant KDS Sync",
    kdsUpdate: { id: '#1894', table: 'Table 7', items: '1x Salmon (GF), 1x Chardonnay', status: 'Cooking', time: 'Just now' }
  }
};

export default function Hero() {
  const [activeChip, setActiveChip] = useState('popular');
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [kdsOrders, setKdsOrders] = useState([
    { id: '#1892', table: 'Table 4', items: '1x Ribeye Steak, 1x IPA Beer', status: 'In Kitchen', time: '4 mins ago' },
    { id: '#1893', table: 'Table 12', items: '2x Spicy Pasta, 1x Coke Zero', status: 'Queued', time: '1 min ago' },
  ]);
  const posConnected = true;

  // Run scenario simulation
  const runScenario = useCallback((key) => {
    setActiveChip(key);
    setIsTyping(true);
    
    // Clear message feed and simulate typing
    setMessages([]);
    
    const scenario = scenarios[key];
    
    // Simulate customer speaking/typing
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'customer', text: scenario.customer }]);
      setIsTyping(false);
      
      // Simulate agent response lag
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: 'agent', text: scenario.agent, badge: scenario.badge }]);
        
        // If checkout scenario, append order to Kitchen Display System (KDS)
        if (scenario.kdsUpdate) {
          setKdsOrders(prev => {
            // Check if Table 7 order already exists in current list to prevent duplicate appends
            if (prev.some(o => o.table === 'Table 7')) return prev;
            return [...prev, scenario.kdsUpdate];
          });
        }
      }, 900);
    }, 600);
  }, []);

  // Run default scenario on load
  useEffect(() => {
    runScenario('popular');
  }, [runScenario]);

  const scrollToPricing = (e) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = pricingSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-navy-dark pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/5">
      {/* Background glow effects for premium look */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Core Hero Content */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Top Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald/30 bg-emerald/5 backdrop-blur-sm mb-8 animate-float">
            <span className="text-emerald text-xs sm:text-sm font-semibold tracking-wide flex items-center gap-1.5 select-none">
              🍽️ Done-For-You AI Voice & AR Menu Integration
            </span>
          </div>

          {/* H1 Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-none max-w-5xl mx-auto">
            The Future of Dining <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-emerald via-emerald-dark to-blue-400 bg-clip-text text-transparent relative">
              Is Already Here
            </span>
          </h1>

          {/* Subtext */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-normal leading-relaxed">
            Voice ordering, augmented reality menus, and food trend intelligence. Installed, calibrated, and synced with your POS in <span className="text-white font-semibold">8–12 weeks</span>.
          </p>

          {/* Chronological Queue Solution Callout */}
          <div className="mt-8 max-w-3xl mx-auto p-5 bg-white/[0.02] border border-white/10 rounded-2xl text-left backdrop-blur-sm relative group hover:border-emerald/30 transition-colors duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald/5 rounded-full blur-xl group-hover:bg-emerald/10 transition-colors" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <span className="flex-shrink-0 inline-flex items-center justify-center px-3 py-1 rounded bg-emerald/15 border border-emerald/30 text-emerald text-xs font-bold font-mono uppercase tracking-wide">
                Key Advantage
              </span>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Solve Staffing Shortages & Table Bottlenecks
              </h3>
            </div>
            <p className="mt-3 text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
              Guests scan a QR code and order verbally. SmartDine queues orders in strict chronological sequence — Table 3 places an order first, it hits the kitchen first. Zero lost tickets, zero order confusion, and faster tables.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto flex-grow inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/20 hover:scale-[1.03] active:scale-[0.98]"
            >
              Start Free Trial
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="w-full sm:w-auto flex-grow inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-extrabold text-white border border-white/20 hover:bg-white/5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              See Pricing Plans
            </a>
          </div>
        </div>

        {/* Interactive Simulation Dashboard: Chat Terminal & KDS Side-by-Side */}
        <div className="mt-16 md:mt-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Column 1: Interactive Chat Simulator (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:border-emerald/30 transition-colors duration-300 min-h-[480px]">
            
            {/* Terminal Header */}
            <div className="bg-navy-dark/95 px-6 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald" />
                </span>
                <span className="text-xs font-bold text-gray-400 font-mono tracking-wider ml-2 uppercase">
                  Table 7 voice ordering simulator
                </span>
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${posConnected ? 'bg-emerald/10 text-emerald' : 'bg-red-500/10 text-red-400'}`}>
                POS Sync: Active
              </span>
            </div>

            {/* Chat Content Display */}
            <div className="p-6 space-y-6 flex-grow overflow-y-auto max-h-[350px] bg-navy-dark/30">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'customer' ? 'flex-row-reverse' : ''}`}>
                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 ${
                    msg.sender === 'customer' ? 'bg-white/10' : 'bg-emerald/10 border border-emerald/30'
                  }`}>
                    {msg.sender === 'customer' ? '👤' : '🎙️'}
                  </div>
                  
                  {/* Message Bubble */}
                  <div className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm relative ${
                    msg.sender === 'customer' 
                      ? 'bg-white/10 border border-white/15 text-gray-200' 
                      : 'bg-emerald/5 border border-emerald/20 text-white'
                  }`}>
                    <span className="block text-[9px] font-extrabold uppercase tracking-wider mb-1 opacity-60">
                      {msg.sender === 'customer' ? 'Customer' : 'SmartDine Voice AI'}
                    </span>
                    <p className="leading-relaxed font-mono">{msg.text}</p>
                    {msg.badge && (
                      <span className="absolute -top-2 right-4 text-[9px] font-bold bg-emerald text-navy px-2 py-0.2 rounded font-mono shadow">
                        {msg.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center space-x-2 text-gray-500 font-mono text-xs pl-12">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce" />
                  <span>Customer speaking...</span>
                </div>
              )}
            </div>

            {/* Interactive Prompt Chips */}
            <div className="p-4 bg-navy-dark/70 border-t border-white/10 space-y-3">
              <span className="block text-[10px] font-extrabold uppercase tracking-widest text-gray-400 font-mono">
                Click a question to test the voice agent:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => runScenario('popular')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wide transition-all border ${
                    activeChip === 'popular'
                      ? 'bg-emerald text-navy border-emerald shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Popular Dish? 🍄
                </button>
                <button
                  onClick={() => runScenario('dietary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wide transition-all border ${
                    activeChip === 'dietary'
                      ? 'bg-emerald text-navy border-emerald shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Gluten Allergy? 🥦
                </button>
                <button
                  onClick={() => runScenario('pairing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wide transition-all border ${
                    activeChip === 'pairing'
                      ? 'bg-emerald text-navy border-emerald shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Wine Pairing? 🍷
                </button>
                <button
                  onClick={() => runScenario('checkout')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wide transition-all border ${
                    activeChip === 'checkout'
                      ? 'bg-emerald text-navy border-emerald shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  Confirm & Send to POS 🚀
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Kitchen Display System (KDS) Monitor (5 cols) */}
          <div className="lg:col-span-5 backdrop-blur-md bg-[#0b0f19] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between hover:border-emerald/20 transition-colors duration-300 min-h-[480px]">
            
            {/* Monitor Header */}
            <div className="space-y-1 pb-4 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white tracking-wide font-mono">
                  SmartDine KDS Monitor
                </h4>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald shadow-[0_0_8px_#10b981]" />
              </div>
              <p className="text-[10px] text-gray-500 font-mono">Live kitchen ticketing queue</p>
            </div>

            {/* KDS Queue items */}
            <div className="flex-grow py-6 space-y-4">
              <div className="flex items-center justify-between text-[10px] font-bold text-gray-400 font-mono tracking-wider border-b border-white/5 pb-2">
                <span>QUEUE CHRONOLOGY</span>
                <span>STATUS</span>
              </div>

              {kdsOrders.map((order, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-xl border font-mono transition-all duration-500 ${
                    order.table === 'Table 7'
                      ? 'bg-emerald/5 border-emerald/30 shadow-md shadow-emerald/5 animate-pulse'
                      : 'bg-white/[0.01] border-white/5'
                  }`}
                >
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-xs font-black text-white">{order.table} <span className="text-[10px] text-gray-500 font-normal">({order.id})</span></span>
                    <span className="text-[10px] text-gray-400">{order.time}</span>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">{order.items}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1.5">
                      <span className={`w-2 h-2 rounded-full ${order.status === 'Cooking' ? 'bg-orange-400' : order.status === 'In Kitchen' ? 'bg-blue-400' : 'bg-gray-400'}`} />
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{order.status}</span>
                    </div>
                    {order.table === 'Table 7' && (
                      <span className="text-[9px] font-bold bg-emerald/20 text-emerald border border-emerald/30 px-1.5 py-0.5 rounded">
                        Queued Chronologically
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* KDS status footer info */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-[10px] font-mono text-gray-500">
                <span>Total Active Tickets: {kdsOrders.length}</span>
                <span>Kitchen Avg: 12.8 mins</span>
              </div>
              <p className="text-[9px] font-mono text-gray-600 leading-tight">
                *SmartDine locks ticket ordering slots based on millisecond arrival time. Prevents cook confusion and double preparation.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
