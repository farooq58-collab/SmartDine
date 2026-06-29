import React, { useState } from 'react';
import burgerImg from '../assets/smash_burger.png';
import pizzaImg from '../assets/pepperoni_pizza.png';
import latteImg from '../assets/matcha_latte.png';

export default function ARSection() {
  const [selectedDish, setSelectedDish] = useState('burger');
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  const dishes = {
    burger: {
      name: "Smash Burger 🍔",
      image: burgerImg,
      calories: "740 kcal",
      price: "$14.99",
      description: "Custom blend beef, double cheddar, brioche bun, house sauce."
    },
    pizza: {
      name: "Pepperoni Pizza 🍕",
      image: pizzaImg,
      calories: "1,120 kcal",
      price: "$18.50",
      description: "Wood-fired crust, mozzarella cheese pull, cured pepperoni."
    },
    latte: {
      name: "Matcha Latte 🍵",
      image: latteImg,
      calories: "180 kcal",
      price: "$5.75",
      description: "Organic stone-ground ceremonial matcha with steamed oat milk."
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
                AR Menus That Build Trust
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-navy-dark tracking-tight leading-tight">
                Stop Misleading Your Guests. <br />
                <span className="text-emerald">Show the Truth.</span>
              </h2>
            </div>

            {/* Pain Point */}
            <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
              Restaurants lose customers every day because food photos lie. A burger photographed with professional lighting looks nothing like what arrives. Customers feel deceived. Orders drop. Reputation suffers.
            </p>

            {/* Solution Block */}
            <div className="p-5 bg-white border-l-4 border-emerald rounded-r-xl shadow-md shadow-gray-200/50">
              <p className="text-navy-dark text-sm md:text-base font-medium leading-relaxed">
                We replace the misleading photo with the <span className="text-emerald font-bold">actual dish</span> — placed on the customer's real table through their phone camera, at real size, before they order.
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md">
                <span className="block text-3xl md:text-4xl font-black text-emerald mb-1">
                  67%
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block leading-tight">
                  Of customers say food looks different from photos
                </span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md">
                <span className="block text-3xl md:text-4xl font-black text-emerald mb-1">
                  +40%
                </span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block leading-tight">
                  Increase in purchase intent with AR experiences
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
                    <span>🔋 88%</span>
                  </div>
                </div>

                {/* Simulated Camera Viewport Background (Wood Table + Grid Overlay) */}
                <div className="absolute inset-0 bg-[#161a24] z-0 overflow-hidden">
                  {/* Perspective grid overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_45%,rgba(46,204,138,0.1)_46%,rgba(46,204,138,0.1)_47%,transparent_48%),linear-gradient(to_right,transparent_49%,rgba(46,204,138,0.1)_50%,rgba(46,204,138,0.1)_51%,transparent_52%)] bg-[size:30px_30px] opacity-40 pointer-events-none" />
                  
                  {/* Camera focus box */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-emerald/30 rounded-xl pointer-events-none" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 border border-emerald/50 rounded-full pointer-events-none" />

                  {/* Surface placement shadow (grows/shrinks with scale) */}
                  <div
                    className="absolute top-[68%] left-1/2 -translate-x-1/2 w-36 h-8 bg-black/40 rounded-full blur-md transition-all duration-100 pointer-events-none"
                    style={{ transform: `translate(-50%, -50%) scale(${scale * 0.9})` }}
                  />

                  {/* Food Image Render Container */}
                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <img
                      src={currentDish.image}
                      alt={currentDish.name}
                      className="w-48 h-48 object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] transition-transform duration-100"
                      style={{
                        transform: `rotate(${rotation}deg) scale(${scale}) translateZ(0)`,
                        filter: "brightness(1.05) contrast(1.02)"
                      }}
                    />
                  </div>
                </div>

                {/* AR Mode UI Badges */}
                <div className="absolute bottom-16 inset-x-4 z-20 flex flex-col gap-2 font-mono text-[10px]">
                  <div className="bg-emerald/10 border border-emerald/30 text-emerald rounded px-2.5 py-1 flex justify-between items-center backdrop-blur-sm">
                    <span>AR MODE: LIVE PREVIEW</span>
                    <span>100% SCALE (1:1)</span>
                  </div>
                  <div className="bg-black/50 text-white/80 rounded px-2.5 py-1 flex justify-between items-center backdrop-blur-sm">
                    <span>{currentDish.name}</span>
                    <span>{currentDish.price}</span>
                  </div>
                </div>

                {/* Camera Shutter Ring UI Overlay */}
                <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center items-center">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center bg-transparent cursor-pointer hover:bg-white/10 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-emerald" />
                  </div>
                </div>
              </div>

              {/* Controls and Selectors (Outside Phone, Right Panel on md) */}
              <div className="flex-grow w-full space-y-6">
                <div>
                  <h3 className="text-sm font-extrabold text-navy-dark tracking-wide uppercase mb-3">
                    Select A Dish
                  </h3>
                  <div className="flex flex-col gap-2">
                    {Object.keys(dishes).map((key) => (
                      <button
                        key={key}
                        onClick={() => setSelectedDish(key)}
                        className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold tracking-wide transition-all duration-200 ${
                          selectedDish === key
                            ? 'bg-navy text-white border-emerald shadow-lg shadow-navy/10'
                            : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
                        }`}
                      >
                        {dishes[key].name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Sliders */}
                <div className="space-y-4 pt-2 border-t border-gray-100">
                  {/* Rotation Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs font-extrabold text-navy-dark mb-1.5">
                      <span>ROTATE MODEL</span>
                      <span className="font-mono text-emerald">{rotation}°</span>
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
                    <div className="flex justify-between items-center text-xs font-extrabold text-navy-dark mb-1.5">
                      <span>SCALE IN SPACE</span>
                      <span className="font-mono text-emerald">{Math.round(scale * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald"
                    />
                  </div>
                </div>

                {/* Specs / Meta Details */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-navy-dark uppercase">Caloric Count</span>
                    <span className="text-xs font-mono font-bold text-gray-500">{currentDish.calories}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-normal leading-relaxed">
                    {currentDish.description}
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
