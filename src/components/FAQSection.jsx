import React, { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Which POS systems does SmartDine AI integrate with?",
      answer: "We support direct, bidirectional API integration with major POS networks including Toast, Lightspeed, Square, Clover, Oracle MICROS, and NCR Aloha. Orders placed via the Voice agent sync into your kitchen displays (KDS) instantly in strict chronological sequence."
    },
    {
      question: "What happens if our restaurant's internet goes down?",
      answer: "SmartDine has a localized offline fallback system. The QR-code menu can still be loaded via guest mobile cellular connections (5G/4G). The system holds orders in a queue on our cloud servers and pushes them to your POS the second your terminal reconnects, ensuring zero lost orders."
    },
    {
      question: "How accurate is the voice ordering agent in a noisy dining room?",
      answer: "Extremely accurate. The voice agent runs advanced noise-filtering models tuned specifically to block out ambient restaurant noise, clinking cutlery, and music. In tests, it maintains a 97.4% order accuracy rate — higher than typical human waitstaff error rates."
    },
    {
      question: "What is the timeline for deployment?",
      answer: "Deployment takes 8 to 12 weeks. This includes digitizing and modeling your menu in photo-real 3D for the AR viewport, training and calibrating the voice model on your specific recipes/allergens, conducting POS connection testing, and running an onboarding session with your staff."
    },
    {
      question: "Are there any hidden monthly fees or order commissions?",
      answer: "No. Unlike traditional restaurant ordering software, SmartDine is a completely done-for-you service with a flat one-time setup fee ($4,999). There are no monthly SaaS subscriptions, no software licensing costs, and 0% order commissions. You keep all profits."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-navy-dark relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald/10 border border-emerald/20 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-400 font-normal">
            Everything you need to know about our integrations, technology, and pricing model.
          </p>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="backdrop-blur-md bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald/30 shadow-lg"
              >
                {/* FAQ Header Button */}
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between text-white hover:text-emerald transition-colors duration-200 focus:outline-none"
                >
                  <span className="text-base md:text-lg font-bold tracking-wide pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 ml-2">
                    <svg
                      className={`w-6 h-6 transform transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-emerald' : 'text-gray-400'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>

                {/* FAQ Body (Animated open/close) */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-white/5 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-5 text-gray-400 text-sm md:text-base leading-relaxed font-normal bg-navy-dark/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
