import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      description: "A 30-minute call to analyze your menu, POS requirements, and restaurant automation goals."
    },
    {
      number: "02",
      title: "We Build It",
      description: "All three customized systems (Voice ordering, AR-menus, trend engine) built to your exact brand."
    },
    {
      number: "03",
      title: "Staff Training",
      description: "A 2-hour guided onboarding session for your kitchen and floor staff. No technical skills needed."
    },
    {
      number: "04",
      title: "You Go Live",
      description: "Launch-day technical support + 30 days of post-launch optimization monitoring and support."
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald-light px-3.5 py-1.5 rounded-full inline-block mb-4">
            Implementation Timeline
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-dark tracking-tight mt-2">
            Up and Running in 8–12 Weeks
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 max-w-xl mx-auto font-normal">
            From initial consultation to live launch, we manage the entire technical setup and integration.
          </p>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-emerald/10 via-emerald/40 to-emerald/10 z-0" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-10 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-xl shadow-gray-200/40 border border-gray-100/80 flex flex-col items-center text-center hover:shadow-2xl hover:border-emerald/10 hover:-translate-y-1 transition-all duration-300 group h-full"
              >
                {/* Step Badge */}
                <div className="w-14 h-14 bg-navy border border-emerald/30 text-emerald rounded-full flex items-center justify-center font-mono font-black text-lg shadow-md mb-6 group-hover:scale-110 group-hover:border-emerald transition-transform duration-300">
                  {step.number}
                </div>

                {/* Step Title */}
                <h3 className="text-lg font-bold text-navy-dark mb-3 tracking-tight group-hover:text-emerald transition-colors duration-200">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-sm text-gray-500 leading-relaxed font-normal">
                  {step.description}
                </p>

                {/* Desktop Direction Indicator */}
                {idx !== steps.length - 1 && (
                  <div className="hidden md:flex absolute top-[36px] -right-[18px] z-20 items-center justify-center text-emerald/40">
                    <svg
                      className="w-8 h-8 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
