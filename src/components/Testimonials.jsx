import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Our biggest headache was queue congestion during the Friday rush. SmartDine AI solved this overnight. Now tables order directly through the voice agent. Orders are queued chronologically, errors have dropped to zero, and ticket sizes are up 24%.",
      author: "Marcus Vance",
      role: "Owner, The Oak Grill",
      location: "London",
      metrics: {
        label: "Monthly Revenue Increase",
        value: "+$14,200",
        highlight: "Paid back in 11 days"
      },
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      quote: "Guests love the AR menu previewer. They can see the dishes in 3D right on their tables, which gives them the confidence to order higher-margin specials. Our average spend per customer has increased by 19%. This is a game-changer.",
      author: "Elena Rostova",
      role: "Operations Director, Saffron Bistro",
      location: "Manchester",
      metrics: {
        label: "Average Check Increase",
        value: "+19.5%",
        highlight: "3x higher upsell rate"
      },
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120&h=120"
    },
    {
      quote: "We were skeptical about voice recognition in a noisy dining room, but the system functions flawlessly. The integration with our existing POS was smooth, and the weekly trend intelligence helps us optimize inventory and cut food waste by 15%.",
      author: "Chef David Chang",
      role: "Head Chef, Umai Kitchen",
      location: "Birmingham",
      metrics: {
        label: "Inventory Waste Reduction",
        value: "-15.2%",
        highlight: "Zero staff training issues"
      },
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120"
    }
  ];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald-light px-3.5 py-1.5 rounded-full inline-block mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-dark tracking-tight mt-2">
            Proven Results From Top Restaurants
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-normal">
            See how restaurant owners and chefs are scaling operations and growing profits with SmartDine AI.
          </p>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-gray-150 p-8 shadow-xl shadow-gray-100/50 hover:shadow-2xl hover:border-emerald/20 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between h-full relative group"
            >
              <div>
                {/* Metrics Highlight Box */}
                <div className="bg-emerald-light/40 border border-emerald/10 rounded-2xl p-5 mb-6 text-center">
                  <span className="text-3xl font-black text-emerald-dark block mb-0.5 font-mono">
                    {t.metrics.value}
                  </span>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block leading-tight">
                    {t.metrics.label}
                  </span>
                  <span className="text-[10px] font-bold text-emerald/80 mt-1.5 inline-block font-mono bg-white px-2 py-0.5 rounded-md border border-emerald/5">
                    {t.metrics.highlight}
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-gray-600 text-sm italic leading-relaxed font-normal mb-8">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-12 h-12 rounded-full object-cover border border-emerald/20 shadow-md group-hover:scale-105 transition-transform duration-300"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-navy-dark leading-none mb-1">
                    {t.author}
                  </h4>
                  <p className="text-[11px] font-semibold text-gray-500 block leading-tight">
                    {t.role}
                  </p>
                  <p className="text-[10px] font-mono text-emerald mt-0.5 leading-none">
                    📍 {t.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
