import React, { useState } from 'react';
import burgerImg from '../assets/smash_burger.png';
import pizzaImg from '../assets/pepperoni_pizza.png';
import latteImg from '../assets/matcha_latte.png';

export default function ARSection() {
  const [selectedDish, setSelectedDish] = useState('burger');
  const [rotation, setRotation] = useState(45);
  const [scale, setScale] = useState(1);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const dishes = {
    burger: {
      name: "Smash Burger 🍔",
      image: burgerImg,
      calories: "740 kcal",
      price: "$14.99",
      description: "Custom blend beef, double cheddar, brioche bun, house sauce.",
      hotspots: [
        { id: 1, top: '22%', left: '48%', label: 'Brioche Bun', desc: 'Slightly toasted, organic buttered brioche bun.' },
        { id: 2, top: '48%', left: '35%', label: 'Aged Cheddar', desc: 'Double melted Wisconsin cheddar cheese.' },
        { id: 3, top: '65%', left: '55%', label: 'Angus Patty', desc: 'Double 80/20 smash beef patty, seared crispy.' }
      ]
    },
    pizza: {
      name: "Pepperoni Pizza 🍕",
      image: pizzaImg,
      calories: "1,120 kcal",
      price: "$18.50",
      description: "Wood-fired crust, mozzarella cheese pull, cured pepperoni.",
      hotspots: [
        { id: 1, top: '25%', left: '40%', label: 'Wood-Fired Crust', desc: '36-hour slow-rise sourdough, hand-stretched.' },
        { id: 2, top: '45%', left: '60%', label: 'Mozzarella', desc: 'Fresh local fior di latte mozzarella cheese.' },
        { id: 3, top: '60%', left: '32%', label: 'Pepperoni', desc: 'Dry-cured cup & char spicy pepperoni slices.' }
      ]
    },
    latte: {
      name: "Matcha Latte 🍵",
      image: latteImg,
      calories: "180 kcal",
      price: "$5.75",
      description: "Organic stone-ground ceremonial matcha with steamed oat milk.",
      hotspots: [
        { id: 1, top: '18%', left: '52%', label: 'Ceremonial Matcha', desc: 'Stone-ground green tea leaves from Uji, Kyoto.' },
        { id: 2, top: '42%', left: '42%', label: 'Organic Oat Milk', desc: 'Steamed Barista-grade oat milk, zero sugars.' },
        { id: 3, top: '70%', left: '50%', label: 'Artisanal Foam', desc: 'Delicate microfoam poured by skilled barista.' }
      ]
    }
  };

  const currentDish = dishes[selectedDish];

  return (
    <section id="ar-menu" className="py-20 md:py-28 bg-gray-50 border-b border-gray-200 relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Context & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald-light px-3.5 py-1.5 rounded-full inline-block mb-4">
                AR Menus That Sell
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy-dark tracking-tight leading-tight">
                Menu Previews in 3D. <br />
                <span className="text-emerald">Increase Intent by 40%.</span>
              </h2>
            </div>

            {/* Pain Point */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
              Flat, static photos don't communicate volume, textures, or real portion size. Guests often feel anxious when ordering high-priced items. 
            </p>

            {/* Solution Block */}
            <div className="p-5 bg-white border-l-4 border-emerald rounded-r-xl shadow-md shadow-gray-200/50">
              <p className="text-navy-dark text-sm md:text-base font-semibold leading-relaxed">
                SmartDine projects a <span className="text-emerald font-bold">1:1 scale 3D model</span> of the dish onto the customer's physical table directly via their phone browser. No app download needed.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-md">
                <span className="block text-3xl md:text-4xl font-black text-emerald mb-1 font-mono">
                  +40%
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block leading-tight">
                  Purchase intent boost on average
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-150 shadow-md">
                <span className="block text-3xl md:text-4xl font-black text-emerald mb-1 font-mono">
                  3.2x
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block leading-tight">
                  Upsell conversion on specials
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Phone AR Viewport */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            
            {/* Background elements */}
            <div className="absolute w-[90%] h-[90%] bg-emerald/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Interactive Row */}
            <div className="relative z-10 w-full max-w-lg flex flex-col md:flex-row items-center gap-8 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-2xl">
              
              {/* Phone Mockup Frame */}
              <div className="relative w-[280px] h-[500px] bg-slate-950 border-[8px] border-slate-900 rounded-[40px] shadow-2xl overflow-hidden flex flex-col flex-shrink-0 select-none">
                
                {/* Phone Speaker Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center">
                  <div className="w-10 h-1 bg-slate-700 rounded-full mb-1" />
                </div>

                {/* Top Status Bar UI Overlay */}
                <div className="absolute top-5 inset-x-0 px-5 flex justify-between items-center text-[10px] text-white/60 font-semibold font-mono z-20">
                  <span>9:41</span>
                  <div className="flex items-center space-x-1">
                    <span>5G</span>
                    <span>🔋 94%</span>
                  </div>
                </div>

                {/* Simulated Camera Viewport Background (Wood Table + Grid Overlay) */}
                <div className="absolute inset-0 bg-[#141822] z-0 overflow-hidden">
                  
                  {/* Perspective grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(16,185,129,0.06)_46%,rgba(16,185,129,0.06)_47%,transparent_48%),linear-gradient(to_right,transparent_49%,rgba(16,185,129,0.06)_50%,rgba(16,185,129,0.06)_51%,transparent_52%)] bg-[size:25px_25px] opacity-50 pointer-events-none" />
                  
                  {/* Surface placement shadow */}
                  <div
                    className="absolute top-[66%] left-1/2 -translate-x-1/2 w-40 h-8 bg-black/60 rounded-full blur-md transition-all duration-300 pointer-events-none"
                    style={{ transform: `translate(-50%, -50%) scale(${scale * 0.9})` }}
                  />

                  {/* Food Image Render Container */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <img
                      src={currentDish.image}
                      alt={currentDish.name}
                      className="w-48 h-48 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out"
                      style={{
                        transform: `rotate(${rotation}deg) scale(${scale}) translateZ(0)`,
                      }}
                    />
                  </div>

                  {/* Interactive Pulse Hotspots in Phone camera */}
                  <div className="absolute inset-0 z-20 pointer-events-auto">
                    {currentDish.hotspots.map((hotspot) => (
                      <div
                        key={hotspot.id}
                        className="absolute cursor-pointer"
                        style={{ top: hotspot.top, left: hotspot.left }}
                        onMouseEnter={() => setActiveHotspot(hotspot)}
                        onMouseLeave={() => setActiveHotspot(null)}
                        onClick={() => setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot)}
                      >
                        {/* Pulse rings */}
                        <div className="w-5 h-5 rounded-full bg-emerald/30 border border-emerald flex items-center justify-center hotspot-pulse">
                          <div className="w-2 h-2 rounded-full bg-emerald" />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dynamic Hotspot Information Tooltip Overlay */}
                  {activeHotspot && (
                    <div className="absolute bottom-16 inset-x-3 z-30 p-3 rounded-xl bg-navy/95 border border-emerald/40 text-white backdrop-blur-md shadow-2xl transition-all duration-300 animate-fade-in font-mono text-[10px]">
                      <div className="flex justify-between items-center mb-1 text-emerald font-bold">
                        <span>🏷️ {activeHotspot.label}</span>
                        <span>Active Info</span>
                      </div>
                      <p className="text-gray-300 font-normal leading-normal">{activeHotspot.desc}</p>
                    </div>
                  )}

                </div>

                {/* AR Mode UI Badges */}
                {!activeHotspot && (
                  <div className="absolute bottom-16 inset-x-4 z-20 flex flex-col gap-2 font-mono text-[10px]">
                    <div className="bg-emerald/10 border border-emerald/30 text-emerald rounded px-2.5 py-1 flex justify-between items-center backdrop-blur-md">
                      <span>AR PREVIEW ACTIVE</span>
                      <span>1:1 SCALE</span>
                    </div>
                    <div className="bg-black/60 text-white/80 rounded px-2.5 py-1 flex justify-between items-center backdrop-blur-md">
                      <span>{currentDish.name}</span>
                      <span>{currentDish.price}</span>
                    </div>
                  </div>
                )}

                {/* Camera Shutter Ring UI Overlay */}
                <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center">
                  <div className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center bg-transparent cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-emerald" />
                  </div>
                </div>
              </div>

              {/* Controls and Selectors (Outside Phone, Right Panel on md) */}
              <div className="flex-grow w-full space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-navy-dark tracking-wider uppercase mb-3 font-mono">
                    Select A Dish
                  </h3>
                  <div className="flex flex-col gap-2">
                    {Object.keys(dishes).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          setSelectedDish(key);
                          setActiveHotspot(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold tracking-wide transition-all duration-200 ${
                          selectedDish === key
                            ? 'bg-navy text-white border-emerald shadow-lg shadow-navy/15 scale-[1.01]'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        {dishes[key].name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Sliders */}
                <div className="space-y-4 pt-4 border-t border-gray-200">
                  {/* Rotation Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-navy-dark mb-1.5 font-mono">
                      <span>ROTATE MODEL</span>
                      <span className="text-emerald">{rotation}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald"
                    />
                  </div>

                  {/* Scale Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-bold text-navy-dark mb-1.5 font-mono">
                      <span>SCALE MODEL</span>
                      <span className="text-emerald">{Math.round(scale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.6"
                      max="1.4"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald"
                    />
                  </div>
                </div>

                {/* Specs / Meta Details */}
                <div className="bg-gray-100/70 p-4 rounded-xl border border-gray-200/80">
                  <div className="flex justify-between items-center mb-1 font-mono">
                    <span className="text-xs font-extrabold text-navy-dark uppercase">Caloric Count</span>
                    <span className="text-xs font-bold text-gray-500">{currentDish.calories}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-normal leading-relaxed">
                    {currentDish.description}
                  </p>
                  <p className="text-[10px] text-emerald font-bold mt-2 font-mono flex items-center gap-1">
                    <span>💡</span> Hover hotspots inside the phone screen to inspect.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
