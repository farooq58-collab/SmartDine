import React from 'react';

export default function FeaturesSection() {
  const features = [
    {
      title: "Voice Agent Ordering 🎙️",
      description: "Customers scan a QR code at the table and speak their order naturally. AI answers menu questions, handles custom dietary requests, takes orders, and instantly notifies the kitchen.",
      emoji: "🎙️",
      stats: [
        { value: "80%", label: "Fewer Errors" },
        { value: "0", label: "Staff Needed" },
        { value: "2x", label: "Faster Turn" }
      ]
    },
    {
      title: "AR-Based Menu System 📱",
      description: "No app download required. Customers point their smartphone camera at any menu item and see a photo-real, life-size 3D preview of the dish directly on their table before ordering.",
      emoji: "📱",
      stats: [
        { value: "3x", label: "Upsell Rate" },
        { value: "+22%", label: "Spend/Visit" },
        { value: "94%", label: "Sat. Rate" }
      ]
    },
    {
      title: "Food Trend Intelligence 📊",
      description: "AI continuously scans local social media feeds (TikTok, Instagram), delivery platforms, and search engine trends to surface what dishes and flavors your city is craving right now.",
      emoji: "📊",
      stats: [
        { value: "Real-Time", label: "Data Stream" },
        { value: "City-Level", label: "Insights" },
        { value: "Weekly", label: "Reports" }
      ]
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald-light px-3.5 py-1.5 rounded-full inline-block mb-4">
            Three Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-dark tracking-tight mt-2">
            Everything Your Restaurant Needs to Win
          </h2>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-xl shadow-gray-100/80 border border-gray-100 hover:shadow-2xl hover:border-emerald/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group h-full"
            >
              {/* Top Colored Border (emerald to navy gradient) */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-emerald to-navy" />

              {/* Card Body */}
              <div className="p-8 flex-grow">
                {/* Emoji Box */}
                <div className="w-14 h-14 bg-emerald-light rounded-2xl flex items-center justify-center text-2xl text-emerald-dark mb-6 border border-emerald/10 group-hover:scale-110 transition-transform duration-300">
                  <span>{feature.emoji}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-navy-dark mb-4 tracking-tight group-hover:text-emerald transition-colors duration-200">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              {/* Stats Footer Row */}
              <div className="px-8 pb-8 pt-6 mt-auto border-t border-gray-100/60 bg-gray-50/50">
                <div className="grid grid-cols-3 gap-1 text-center">
                  {feature.stats.map((stat, sIdx) => (
                    <div
                      key={sIdx}
                      className={`${
                        sIdx !== 0 ? 'border-l border-gray-200/80' : ''
                      } px-1`}
                    >
                      <span className="block text-lg md:text-xl font-extrabold text-emerald leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider leading-tight block">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
