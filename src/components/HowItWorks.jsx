import React, { useState } from 'react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Discovery Call",
      duration: "Day 1 - 3",
      summary: "Menu analysis & system diagnostics",
      description: "A 30-minute scoping call where we analyze your menu layout, average ticket size, floor table map, and existing POS network (Toast, Square, etc.) to design your voice agents and AR scope.",
      deliverables: ["POS integration roadmap", "AR modeling count list", "Custom pricing proposal"]
    },
    {
      number: "02",
      title: "Custom Build Phase",
      duration: "Weeks 1 - 6",
      summary: "3D menu modeling & Voice training",
      description: "Our engineers digitize your dishes into photo-real 3D models for AR and calibrate your custom voice ordering model to handle your specific ingredient modifiers, side pairings, and dietary allergen flags.",
      deliverables: ["Interactive 3D menu assets", "Calibrated Voice ordering agent", "Kitchen POS sync bridge"]
    },
    {
      number: "03",
      title: "POS Sync & Training",
      duration: "Weeks 7 - 9",
      summary: "Hardware setup & staff onboarding",
      description: "We connect the SmartDine engine to your restaurant POS terminal and kitchen displays. We run a 2-hour onboarding session with your kitchen and floor staff. No technical skills needed.",
      deliverables: ["POS & KDS live integration test", "Staff reference cheat-sheet", "QR table code templates"]
    },
    {
      number: "04",
      title: "Live Launch",
      duration: "Week 10 - 12",
      summary: "System launch & 30-day monitoring",
      description: "We go live at your tables! Our technical support is on-site (or live remote) for launch day. We monitor ordering logs for 30 days post-launch to tune voice thresholds and optimize upsell conversion rates.",
      deliverables: ["On-site/Remote launch support", "30-day analytics report", "Weekly voice model calibration updates"]
    }
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-gray-50 relative overflow-hidden">
      {/* Visual accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald-light px-3.5 py-1.5 rounded-full inline-block mb-4">
            Implementation Timeline
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-dark tracking-tight mt-2">
            Done-For-You Setup in 12 Weeks
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-normal leading-relaxed">
            From initial consultation to live launch, we manage the entire technical setup, modeling, and POS integration. You focus on the food.
          </p>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* Stepper Navigation Header */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Timeline Bar (Line connecting steps) */}
          <div className="relative">
            <div className="absolute top-[26px] left-[5%] right-[5%] h-1 bg-gray-200 z-0 rounded-full" />
            <div 
              className="absolute top-[26px] left-[5%] h-1 bg-emerald z-0 rounded-full transition-all duration-500" 
              style={{ width: `${(activeStep / (steps.length - 1)) * 90}%` }}
            />

            {/* Step Badges */}
            <div className="flex justify-between items-center relative z-10">
              {steps.map((step, idx) => {
                const isCompleted = idx < activeStep;
                const isActive = idx === activeStep;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStep(idx)}
                    className="flex flex-col items-center focus:outline-none group"
                  >
                    <div 
                      className={`w-14 h-14 rounded-full flex items-center justify-center font-mono font-black text-lg shadow-md border transition-all duration-300 ${
                        isActive 
                          ? 'bg-navy text-emerald border-emerald scale-110 shadow-lg shadow-navy/15'
                          : isCompleted
                            ? 'bg-emerald text-navy border-emerald'
                            : 'bg-white text-gray-400 border-gray-200 group-hover:border-gray-300'
                      }`}
                    >
                      {step.number}
                    </div>
                    <span 
                      className={`mt-3 text-xs font-bold font-mono tracking-wider transition-colors duration-200 ${
                        isActive ? 'text-navy-dark' : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    >
                      {step.title.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Step Detailed Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-150 p-6 md:p-10 shadow-2xl transition-all duration-300 hover:shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Col (8 cols): Description */}
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-emerald-light/60 text-emerald-dark font-mono text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  ⏱️ {steps[activeStep].duration}
                </span>
                <span className="text-gray-400 font-mono text-xs">·</span>
                <span className="text-gray-500 font-medium text-xs font-mono">{steps[activeStep].summary}</span>
              </div>
              
              <h3 className="text-2xl font-black text-navy-dark tracking-tight">
                {steps[activeStep].title}
              </h3>
              
              <p className="text-gray-600 text-sm md:text-base leading-relaxed font-normal">
                {steps[activeStep].description}
              </p>
            </div>

            {/* Right Col (4 cols): Deliverables */}
            <div className="md:col-span-4 bg-gray-50 rounded-2xl p-5 border border-gray-100/80">
              <h4 className="text-[10px] font-black text-navy-dark uppercase tracking-widest mb-3 font-mono">
                Key Deliverables
              </h4>
              <ul className="space-y-2.5">
                {steps[activeStep].deliverables.map((item, i) => (
                  <li key={i} className="flex items-start text-xs text-gray-600 font-medium">
                    <svg className="w-4 h-4 text-emerald mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
