import React from 'react';

export default function TrendDashboard() {
  const trends = [
    {
      rank: "1",
      name: "Smash Burgers",
      tag: "Street food · TikTok viral",
      change: "+92%",
      percentage: 92,
    },
    {
      rank: "2",
      name: "Birria Tacos",
      tag: "Mexican · High demand",
      change: "+78%",
      percentage: 78,
    },
    {
      rank: "3",
      name: "Matcha Lattes",
      tag: "Beverages · Rising fast",
      change: "+65%",
      percentage: 65,
    },
    {
      rank: "4",
      name: "Korean Fried Chicken",
      tag: "Asian fusion · Growing",
      change: "+51%",
      percentage: 51,
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-navy-dark relative border-b border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-emerald/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald/10 border border-emerald/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Real-Time Demand Scan
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2">
            Know What Your City Is Craving <br className="hidden sm:inline" />
            <span className="text-emerald">— Before Your Competitors Do</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 font-normal leading-relaxed">
            SmartDine AI scans local TikTok feeds, Instagram activity, Google Search volumes, and local delivery platforms. Adjust your specials and prep schedules dynamically to match local demand peaks.
          </p>
        </div>

        {/* Dashboard Mockup Card */}
        <div className="max-w-2xl mx-auto">
          <div className="backdrop-blur-md bg-white/[0.02] border border-emerald/20 rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Dashboard Header */}
            <div className="p-6 border-b border-white/10 bg-navy/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white tracking-wide">
                  Trending Dishes This Week
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">Updated 10 minutes ago</p>
              </div>
              <div className="self-start sm:self-center inline-flex items-center px-3.5 py-1 rounded-full bg-emerald/10 border border-emerald/30 text-emerald text-xs font-semibold tracking-wider font-mono">
                📍 Manchester, UK
              </div>
            </div>

            {/* Trends List */}
            <div className="p-6 md:p-8 space-y-6">
              {trends.map((trend) => (
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
                        <span className="text-xs text-gray-500 font-medium">
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
                    <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald h-full rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(46,204,138,0.5)]"
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
                Aggregated from 14,200+ local data points
              </span>
              <span className="text-emerald hover:underline cursor-pointer">
                View Full Intelligence Report →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
