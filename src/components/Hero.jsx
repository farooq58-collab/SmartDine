import React from 'react';

export default function Hero() {
  const scrollToPricing = (e) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchDemo = () => {
    alert("SmartDine AI Demo: Our voice ordering agent operates live at the table via QR code scan. Say 'What's popular?' or specify dietaries, and it places orders directly into your POS.");
  };

  return (
    <section className="relative overflow-hidden bg-navy-dark pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/5">
      {/* Background glow effects for premium look */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-navy/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald/30 bg-emerald/5 backdrop-blur-sm mb-8 animate-fade-in">
          <span className="text-emerald text-sm font-semibold tracking-wide flex items-center gap-1.5">
            🍽️ Done-For-You AI for Restaurants
          </span>
        </div>

        {/* H1 Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          The Future of Dining <br />
          <span className="text-emerald relative">
            Is Already Here
            <span className="absolute bottom-1 left-0 w-full h-[4px] bg-emerald/30 rounded" />
          </span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-normal leading-relaxed">
          Voice ordering, AR menus, and real-time food trend intelligence — all implemented in your restaurant in <span className="text-white font-semibold">8–12 weeks</span>.
        </p>

        {/* Mission / Queue Solution Callout */}
        <div className="mt-8 max-w-3xl mx-auto p-5 bg-white/[0.02] border border-white/10 rounded-2xl text-left backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="flex-shrink-0 inline-flex items-center justify-center px-3 py-1 rounded bg-emerald/15 border border-emerald/30 text-emerald text-xs font-bold font-mono uppercase tracking-wide">
              Our Core Mission
            </span>
            <h3 className="text-sm font-bold text-white tracking-wide">
              Ending Restaurant Queue Bottlenecks & Order Confusion
            </h3>
          </div>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed font-normal">
            By implementing dedicated voice agent systems directly at every table, we solve the queue problem once and for all. All guest orders are queued and processed in a strict, fair chronological sequence. For example, if Table 1 places an order before Table 10, the kitchen is notified and Table 1 is served first. No lost orders, no queue delays, and zero kitchen mix-ups.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-200 shadow-lg shadow-emerald/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            See Pricing
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <button
            onClick={handleWatchDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-lg text-base font-bold text-white border border-white/20 hover:bg-white/5 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Watch Demo
          </button>
        </div>

        {/* Mock Chat Window */}
        <div className="mt-16 md:mt-20 max-w-2xl mx-auto text-left">
          <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl shadow-2xl overflow-hidden hover:border-emerald/30 transition-colors duration-300">
            {/* Top Bar */}
            <div className="bg-navy-dark/80 px-4 py-3 flex items-center border-b border-white/10">
              <div className="flex space-x-1.5 mr-4">
                <span className="w-3 h-3 rounded-full bg-red-500/80 opacity-60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 opacity-60" />
                {/* Green dot active indicator */}
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald" />
                </span>
              </div>
              <span className="text-xs font-semibold text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
                Voice Agent — Table 7 <span className="text-white/25">·</span> The Oak Restaurant, London
              </span>
            </div>

            {/* Chat Content Area */}
            <div className="p-6 space-y-6 font-mono text-sm leading-relaxed max-h-[350px] overflow-y-auto bg-navy/30">
              {/* User message 1 */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                  👤
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 max-w-[85%] text-gray-200">
                  <span className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">Customer</span>
                  What's your most popular dish tonight?
                </div>
              </div>

              {/* Agent message 1 */}
              <div className="flex items-start space-x-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald/10 border border-emerald/30 flex items-center justify-center text-sm">
                  🎙️
                </div>
                <div className="bg-emerald/5 border border-emerald/20 rounded-2xl px-4 py-2.5 max-w-[85%] text-white">
                  <span className="block text-[10px] text-emerald font-bold mb-0.5 uppercase tracking-wider">SmartDine AI</span>
                  Tonight's top pick is our <span className="text-emerald font-semibold">Truffle Risotto 🍄</span> — ordered 34 times this week. Shall I add it for you?
                </div>
              </div>

              {/* User message 2 */}
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm">
                  👤
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 max-w-[85%] text-gray-200">
                  <span className="block text-[10px] text-gray-400 font-bold mb-0.5 uppercase tracking-wider">Customer</span>
                  Yes, and a glass of Pinot Noir.
                </div>
              </div>

              {/* Agent message 2 */}
              <div className="flex items-start space-x-3 justify-start">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald/10 border border-emerald/30 flex items-center justify-center text-sm">
                  🎙️
                </div>
                <div className="bg-emerald/5 border border-emerald/20 rounded-2xl px-4 py-2.5 max-w-[85%] text-white">
                  <span className="block text-[10px] text-emerald font-bold mb-0.5 uppercase tracking-wider">SmartDine AI</span>
                  Order placed <span className="text-emerald">✅ Truffle Risotto + Pinot Noir</span>. Kitchen notified. Estimated <span className="underline decoration-emerald/50">18 mins</span>.
                </div>
              </div>
            </div>

            {/* Bottom UI Bar (adds terminal shell input field design) */}
            <div className="bg-navy-dark/90 px-6 py-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 font-mono">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                <span>Listening for spoken order...</span>
              </div>
              <span className="hidden sm:inline bg-white/5 px-2 py-0.5 rounded text-[10px]">POS Sync Connected</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
