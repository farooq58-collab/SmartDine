import React, { useState } from 'react';

export default function ROICalculator() {
  const [dailyOrders, setDailyOrders] = useState(150);
  const [averageCheck, setAverageCheck] = useState(35);

  // ROI Math
  // Average spend increases by 22% on upsells. Let's assume the AI upsells 40% of tables (3x improvement)
  const upsellRate = 0.40;
  const increasePerUpsell = averageCheck * 0.22;
  const monthlyUpsellRevenue = dailyOrders * 30 * upsellRate * increasePerUpsell;

  // Labor efficiency & order error reductions: Estimated $0.75 saved per order in staff time and food waste
  const monthlyEfficiencySavings = dailyOrders * 30 * 0.75;

  const totalMonthlyGain = monthlyUpsellRevenue + monthlyEfficiencySavings;
  const annualGain = totalMonthlyGain * 12;

  // Implementation fee is flat $4,999
  const paybackMonths = (4999 / totalMonthlyGain).toFixed(1);

  return (
    <section id="roi-calculator" className="py-20 md:py-28 bg-navy-dark relative overflow-hidden border-b border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald/10 border border-emerald/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
            ROI Calculator
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2">
            Calculate Your Extra Monthly Profit
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 font-normal leading-relaxed">
            See how fast the one-time <span className="text-emerald font-semibold">$4,999 flat implementation fee</span> pays for itself in your restaurant. Zero monthly subscription costs.
          </p>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* Calculator Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Sliders Area (7 cols) */}
          <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-md flex flex-col justify-between space-y-8">
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              📊 Adjust Your Restaurant Stats
            </h3>

            {/* Slider 1: Daily Orders */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-semibold text-gray-300">Daily Order Volume</label>
                <span className="text-2xl font-black text-emerald font-mono">{dailyOrders} <span className="text-xs text-gray-400 font-normal">orders/day</span></span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="5"
                value={dailyOrders}
                onChange={(e) => setDailyOrders(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald"
              />
              <div className="flex justify-between text-xs text-gray-500 font-mono">
                <span>30 orders</span>
                <span>500 orders</span>
              </div>
            </div>

            {/* Slider 2: Average Check Size */}
            <div className="space-y-3">
              <div className="flex justify-between items-baseline">
                <label className="text-sm font-semibold text-gray-300">Average Check Size</label>
                <span className="text-2xl font-black text-emerald font-mono">${averageCheck} <span className="text-xs text-gray-400 font-normal">USD</span></span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                step="2"
                value={averageCheck}
                onChange={(e) => setAverageCheck(parseInt(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald"
              />
              <div className="flex justify-between text-xs text-gray-500 font-mono">
                <span>$10 check</span>
                <span>$150 check</span>
              </div>
            </div>

            {/* Logic / Metric Explanation Footnote */}
            <div className="bg-white/[0.01] border border-white/5 p-4 rounded-xl text-xs text-gray-500 space-y-2 font-mono">
              <p>📌 **How we calculate this**: </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>AI Voice agents pitch targeted menu upsells, averaging +22% larger tickets on ~40% of orders.</li>
                <li>Staff time saved + zero order errors cuts kitchen waste and speeds table turnover (calculated at $0.75 savings/order).</li>
              </ul>
            </div>
          </div>

          {/* Results Summary Area (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-navy to-navy-dark border-2 border-emerald/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Corner visual accent */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald/10 rounded-full blur-xl group-hover:bg-emerald/20 transition-all duration-500" />
            
            <div className="space-y-6">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-emerald font-mono">
                YOUR GAIN ESTIMATE
              </h4>
              
              <div>
                <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                  Est. Additional Profit / Month
                </span>
                <span className="text-4xl md:text-5xl font-black text-white font-mono tracking-tight">
                  ${Math.round(totalMonthlyGain).toLocaleString()}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                    Annual Extra Revenue
                  </span>
                  <span className="text-xl font-bold text-emerald font-mono">
                    +${Math.round(annualGain).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold block uppercase tracking-wider">
                    Flat Setup Payback
                  </span>
                  <span className="text-xl font-bold text-white font-mono">
                    ~{paybackMonths <= 0.5 ? '2 weeks' : `${paybackMonths} months`}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
              <div className="bg-emerald/5 border border-emerald/20 rounded-xl p-4 text-center">
                <span className="block text-xs font-bold text-emerald uppercase tracking-wider mb-0.5">
                  100% Flat Implementation
                </span>
                <span className="text-xs text-gray-300">
                  Pay $4,999 once. Keep all extra profits forever.
                </span>
              </div>

              <a
                href="https://wa.me/923342865069"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-extrabold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-200 shadow-lg shadow-emerald/10 hover:scale-[1.01] active:scale-[0.99]"
              >
                Claim Your AI Setup
                <svg
                  className="w-4 h-4 ml-1.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
