import React from 'react';

export default function Pricing() {
  const aiBundleChecklist = [
    "Voice AI ordering agent (QR code-based)",
    "AR-based 3D menu system (unlimited models)",
    "Food trend intelligence local dashboard",
    "Full Toast / Square POS & KDS integration",
    "On-site staff onboarding session (2 hrs)",
    "30 days of active post-launch optimization",
    "Zero monthly commission or SaaS subscription fees"
  ];

  const starterChecklist = [
    "Custom responsive restaurant website",
    "Social media profile setup & optimization",
    "Google Maps & local search registration",
    "Custom domain & business email setup",
    "Interactive digital menu configuration",
    "2-3 week fast-track delivery",
    "1 year of managed hosting included"
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald-light px-3.5 py-1.5 rounded-full inline-block mb-4 animate-cursor">
            No Monthly Subscriptions
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-dark tracking-tight mt-2">
            One-Time Setup Fee. Keep 100% of Profits.
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-normal leading-relaxed">
            Stop paying monthly fees or commissions to SaaS companies. Pay once, own your infrastructure forever.
          </p>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8 items-stretch mb-16">
          
          {/* Card 1: Starter Web & Marketing */}
          <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-emerald/30 hover:scale-[1.01] flex flex-col justify-between">
            <div>
              {/* Bundle Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 mb-6">
                <span className="text-gray-600 text-xs font-bold uppercase tracking-wider font-mono">
                  Online Presence Setup
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-black text-navy-dark tracking-tight font-mono">$1,000</span>
                  <span className="ml-2.5 text-sm text-gray-500 font-semibold font-mono">USD flat fee</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 font-mono leading-relaxed">
                  Ideal for restaurants looking to build a professional digital presence from scratch.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-6" />

              {/* Checklist */}
              <ul className="space-y-4 mb-8">
                {starterChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-emerald"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="ml-3 text-sm md:text-base text-gray-600 font-semibold leading-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* CTA Button */}
              <a
                href="https://wa.me/923342865069"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-base font-extrabold text-white bg-navy hover:bg-navy-dark transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] group"
              >
                Launch Your Website
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>

              {/* Details Note */}
              <span className="text-xs text-gray-400 font-mono mt-5 text-center block leading-relaxed">
                ⏱ 2–3 week delivery · Quick setup
              </span>
            </div>
          </div>

          {/* Card 2: Complete AI Restaurant Bundle (Featured) */}
          <div className="bg-navy-dark border-2 border-emerald rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(16,185,129,0.15)] relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)] hover:scale-[1.01] flex flex-col justify-between">
            {/* Glow Decorative Effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Bundle Badge */}
              <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald/30 bg-emerald/5 mb-6">
                <span className="text-emerald text-xs font-bold uppercase tracking-wider font-mono">
                  Full Automation Package
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-4xl md:text-5xl font-black text-emerald tracking-tight font-mono">$4,999</span>
                  <span className="ml-2.5 text-sm text-gray-400 font-medium font-mono">USD flat fee</span>
                </div>
                <p className="text-xs text-gray-400 mt-2 font-mono leading-relaxed">
                  Our comprehensive suite: voice ordering, AR visual menus, and real-time trend dashboard.
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 my-6" />

              {/* Checklist */}
              <ul className="space-y-4 mb-8">
                {aiBundleChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="w-5 h-5 text-emerald"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="ml-3 text-sm md:text-base text-gray-300 font-semibold leading-tight">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {/* CTA Button */}
              <a
                href="https://wa.me/923342865069"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-base font-extrabold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-300 shadow-md shadow-emerald/20 hover:scale-[1.01] active:scale-[0.99] group"
              >
                Book a Free Demo Call
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>

              {/* Details Note */}
              <span className="text-xs text-gray-500 font-mono mt-5 text-center block leading-relaxed">
                ⏱ 8–12 week delivery · No upfront payment required to start
              </span>
            </div>
          </div>

        </div>

        {/* Sales Comparison Table */}
        <div className="max-w-4xl mx-auto mt-16 p-6 md:p-8 bg-gray-50 rounded-3xl border border-gray-150 shadow-lg">
          <h3 className="text-base md:text-lg font-bold text-navy-dark tracking-tight text-center mb-6">
            Compare The Math: SaaS Systems vs. SmartDine AI
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs text-left text-gray-500 border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 font-extrabold text-navy-dark">COST PARAMETER</th>
                  <th className="py-3 font-extrabold text-gray-400">TRADITIONAL SaaS / COMISSION</th>
                  <th className="py-3 font-extrabold text-emerald">SMARTDINE AI SETUP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-3 font-bold text-navy-dark">Monthly License Fee</td>
                  <td className="py-3 text-red-500">$200 - $600 / month</td>
                  <td className="py-3 font-bold text-emerald">$0 (Forever)</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-navy-dark">Order Commission</td>
                  <td className="py-3 text-red-500">1.5% to 5.0% per transaction</td>
                  <td className="py-3 font-bold text-emerald">0% (Keep every dollar)</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-navy-dark">POS Integration Fees</td>
                  <td className="py-3">$50 / month add-on</td>
                  <td className="py-3 font-bold text-emerald">Included in flat fee</td>
                </tr>
                <tr>
                  <td className="py-3 font-bold text-navy-dark">AR 3D Digitization</td>
                  <td className="py-3">Not available or costly custom models</td>
                  <td className="py-3 font-bold text-emerald">Included in flat fee</td>
                </tr>
                <tr className="bg-emerald/5 font-bold">
                  <td className="py-3 pl-2 text-navy-dark">Year 1 Total Cost (150 orders/day)</td>
                  <td className="py-3 text-red-600">~$12,000+ USD</td>
                  <td className="py-3 text-emerald">$4,999 USD (Total ownership)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-4 leading-normal">
            *Based on industry averages of digital ordering subscriptions and transaction commissions.
          </p>
        </div>

      </div>
    </section>
  );
}
