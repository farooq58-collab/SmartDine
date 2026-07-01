import React, { useState } from 'react';

export default function TrendDashboard() {
  const [selectedCity, setSelectedCity] = useState('London');

  const cityData = {
    London: {
      location: "London, UK",
      datapoints: "18,400+ points",
      trends: [
        { rank: "1", name: "Smash Burgers", tag: "Street food · TikTok viral", change: "+92%", percentage: 92 },
        { rank: "2", name: "Birria Tacos", tag: "Mexican · High demand", change: "+78%", percentage: 78 },
        { rank: "3", name: "Matcha Lattes", tag: "Beverages · Rising fast", change: "+65%", percentage: 65 },
        { rank: "4", name: "Korean Fried Chicken", tag: "Asian fusion · Growing", change: "+51%", percentage: 51 }
      ],
      svgPath: "M10 80 Q 40 50, 80 70 T 150 30 T 220 50 T 290 10 T 360 20"
    },
    NewYork: {
      location: "New York, USA",
      datapoints: "32,900+ points",
      trends: [
        { rank: "1", name: "Pastrami Bao", tag: "Asian Fusion · Lower East Side", change: "+114%", percentage: 95 },
        { rank: "2", name: "Cold Brew Tonic", tag: "Beverage · Cafe trend", change: "+82%", percentage: 82 },
        { rank: "3", name: "Detroit Pizza", tag: "Italian · Deep dish hype", change: "+76%", percentage: 76 },
        { rank: "4", name: "Spicy Rigatoni", tag: "Classic · Instagram viral", change: "+59%", percentage: 59 }
      ],
      svgPath: "M10 90 Q 50 60, 90 40 T 160 50 T 230 20 T 300 30 T 360 5"
    },
    Paris: {
      location: "Paris, France",
      datapoints: "12,100+ points",
      trends: [
        { rank: "1", name: "Truffle Croque", tag: "French Bistro · Luxe twist", change: "+102%", percentage: 89 },
        { rank: "2", name: "Pistachio Croissant", tag: "Bakery · Instagram aesthetic", change: "+88%", percentage: 88 },
        { rank: "3", name: "Matcha Affogato", tag: "Dessert · Summer trend", change: "+71%", percentage: 71 },
        { rank: "4", name: "Frites Sauce", tag: "Fast food · TikTok viral", change: "+48%", percentage: 48 }
      ],
      svgPath: "M10 75 Q 45 70, 85 50 T 155 45 T 225 60 T 295 15 T 360 25"
    }
  };

  const currentData = cityData[selectedCity];

  return (
    <section id="trend-dashboard" className="py-20 md:py-28 bg-navy-dark relative border-b border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald/10 border border-emerald/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Real-Time Demand Scan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2">
            Know What Your City Is Craving
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 font-normal leading-relaxed">
            SmartDine scans local TikTok feeds, Instagram activity, Google Search volumes, and local delivery platforms. Adjust your specials and prep schedules dynamically to match local demand peaks.
          </p>
        </div>

        {/* Dashboard Mockup Grid (Dashboard Card + SVG Graph Card) */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: List (7 cols) */}
          <div className="lg:col-span-7 backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-3xl shadow-2xl overflow-hidden hover:border-emerald/20 transition-colors duration-300 flex flex-col justify-between">
            
            {/* Dashboard Header */}
            <div className="p-6 border-b border-white/10 bg-navy/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Trending Dishes This Week
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Updated 10 minutes ago</p>
              </div>
              
              {/* City Switcher Tabs */}
              <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                {Object.keys(cityData).map((cityKey) => (
                  <button
                    key={cityKey}
                    onClick={() => setSelectedCity(cityKey)}
                    className={`px-3 py-1 text-xs font-bold font-mono rounded-md transition-all ${
                      selectedCity === cityKey
                        ? 'bg-emerald text-navy shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {cityKey === 'NewYork' ? 'New York' : cityKey}
                  </button>
                ))}
              </div>
            </div>

            {/* Trends List */}
            <div className="p-6 md:p-8 space-y-6 flex-grow">
              {currentData.trends.map((trend) => (
                <div key={trend.rank} className="flex items-start space-x-4">
                  {/* Rank Badge */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-sm text-gray-300">
                    #{trend.rank}
                  </div>

                  {/* Trend Details */}
                  <div className="flex-grow">
                    <div className="flex justify-between items-baseline mb-2">
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-wide">
                          {trend.name}
                        </h4>
                        <span className="text-xs text-gray-500 font-mono">
                          {trend.tag}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-extrabold text-emerald font-mono">
                          {trend.change}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald h-full rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        style={{ width: `${trend.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Footer/Status */}
            <div className="bg-navy/40 px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-gray-500 font-mono gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                Aggregated from {currentData.datapoints}
              </span>
              <span className="text-emerald hover:underline cursor-pointer">
                View Full Intelligence Report →
              </span>
            </div>
          </div>

          {/* Right panel: SVG Graph Mock (5 cols) */}
          <div className="lg:col-span-5 bg-[#0b0f19] border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col justify-between hover:border-emerald/20 transition-colors duration-300">
            <div className="space-y-2 border-b border-white/5 pb-4">
              <h4 className="text-sm font-bold text-white font-mono tracking-wider">
                SENTIMENT ANOMALY GRAPH
              </h4>
              <p className="text-[10px] text-gray-500 font-mono">Daily social mention spike scanner</p>
            </div>

            {/* Interactive Graph Box */}
            <div className="flex-grow flex items-center justify-center py-6 relative">
              {/* Background Graph Lines */}
              <div className="absolute inset-x-0 h-[1px] bg-white/5 top-1/4" />
              <div className="absolute inset-x-0 h-[1px] bg-white/5 top-2/4" />
              <div className="absolute inset-x-0 h-[1px] bg-white/5 top-3/4" />
              
              <svg className="w-full h-40 overflow-visible" viewBox="0 0 360 100" fill="none">
                {/* Sentiment curve */}
                <path
                  d={currentData.svgPath}
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="transition-all duration-700 ease-out"
                />
                
                {/* Fill area below curve */}
                <path
                  d={`${currentData.svgPath} L 360 100 L 10 100 Z`}
                  fill="url(#grad)"
                  className="transition-all duration-700 ease-out opacity-25"
                />
                
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Peak pulse dot */}
                <circle cx="290" cy="10" r="4.5" className="fill-emerald hotspot-pulse" />
              </svg>
              
              {/* Overlay Label */}
              <span className="absolute top-8 right-6 text-[9px] font-bold bg-emerald/20 text-emerald border border-emerald/30 px-2 py-0.5 rounded font-mono">
                Volume Peak: Weekend
              </span>
            </div>

            {/* Sentiment meta data */}
            <div className="pt-4 border-t border-white/5 font-mono text-[10px] text-gray-500 space-y-2">
              <div className="flex justify-between">
                <span>Location: {currentData.location}</span>
                <span className="text-emerald">Trend Confirmed</span>
              </div>
              <p className="text-[9px] text-gray-600 leading-tight">
                *Trend intelligence calculates local interest index based on geo-fenced Instagram stories, Google trends, and food blogger publications.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
