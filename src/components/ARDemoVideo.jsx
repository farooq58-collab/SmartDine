import React from 'react';

export default function ARDemoVideo() {
  return (
    <section id="ar-demo" className="py-20 md:py-28 bg-navy-dark relative overflow-hidden border-b border-white/5">
      {/* Gradient visual accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald/10 border border-emerald/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Interactive Video
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            See a demo of how AR works
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 font-normal leading-relaxed">
            Watch a live demonstration of how easily customers can place, rotate, and view detailed 3D menu dishes directly on their tables using standard mobile web browsers.
          </p>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* Video Player Container */}
        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(46,204,138,0.15)] bg-navy/40 group">
            
            {/* Top Bar Decoration (Browser mockup style) */}
            <div className="bg-navy-dark/90 px-4 py-3.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="bg-white/5 border border-white/10 rounded px-4 py-0.5 text-[10px] text-gray-400 font-mono select-none">
                ar-demo.mp4
              </div>
              <div className="w-14" /> {/* Spacer */}
            </div>

            {/* Video element */}
            <div className="relative w-full bg-black">
              <video
                src="/Video/WhatsApp%20Video%202026-06-29%20at%208.17.36%20PM.mp4"
                className="w-full h-auto block object-contain"
                controls
                playsInline
                preload="metadata"
              />
            </div>
            
            {/* Footer decoration */}
            <div className="px-6 py-4 bg-navy-dark/40 border-t border-white/10 flex justify-between items-center text-xs text-gray-400 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
                Duration: 0:21
              </span>
              <span>HD Video • MP4</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
