import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  const plans = [
    {
      name: 'Free',
      badge: 'Get Started',
      monthlyPrice: 0,
      annualPrice: 0,
      description: 'Perfect for trying out SmartDine AI with basic features.',
      features: [
        'Basic menu management (up to 20 items)',
        '50 AI voice agent chats / month',
        'Simple menu dashboard',
        'Email support',
        '1 user account',
      ],
      cta: 'Start Free',
      featured: false,
      badgeColor: 'bg-gray-50 border-gray-200 text-gray-600',
    },
    {
      name: 'Pro',
      badge: 'Most Popular',
      monthlyPrice: 49,
      annualPrice: 39,
      description: 'Full AI-powered dining experience for growing restaurants.',
      features: [
        'Unlimited menu items',
        'Unlimited AI voice agent chats',
        'Live food trend intelligence',
        'AR 3D menu previews',
        'Up to 200 menu items',
        'Priority email & chat support',
        '3 user accounts',
      ],
      cta: 'Start Pro Trial',
      featured: true,
      badgeColor: 'bg-emerald/5 border-emerald/30 text-emerald',
    },
    {
      name: 'Enterprise',
      badge: 'Full Suite',
      monthlyPrice: 149,
      annualPrice: 119,
      description: 'Complete automation for multi-location and high-volume restaurants.',
      features: [
        'Everything in Pro',
        'KDS & order management system',
        'POS integration (Toast / Square)',
        'Unlimited menu items & locations',
        'Custom AI agent training',
        'Dedicated account manager',
        'API access',
        'Unlimited user accounts',
      ],
      cta: 'Contact Sales',
      featured: false,
      badgeColor: 'bg-blue-500/5 border-blue-500/30 text-blue-400',
    },
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald bg-emerald-light px-3.5 py-1.5 rounded-full inline-block mb-4 animate-cursor">
            Simple, Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy-dark tracking-tight mt-2">
            Plans That Scale With Your Restaurant
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-500 font-normal leading-relaxed">
            Start free, upgrade when you're ready. No hidden fees, no contracts, cancel anytime.
          </p>
          <div className="w-16 h-1 bg-emerald mx-auto mt-4 rounded-full" />
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mb-14">
          <span className={`text-sm font-bold transition-colors ${!annual ? 'text-navy-dark' : 'text-gray-400'}`}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${annual ? 'bg-emerald' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${annual ? 'translate-x-7' : 'translate-x-0.5'}`} />
          </button>
          <span className={`text-sm font-bold transition-colors ${annual ? 'text-navy-dark' : 'text-gray-400'}`}>
            Annual <span className="text-emerald font-extrabold text-xs ml-1">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto gap-8 items-stretch mb-16">
          {plans.map((plan) => {
            const price = annual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={plan.name}
                className={`rounded-3xl p-8 md:p-10 relative overflow-hidden transition-all duration-300 hover:scale-[1.01] flex flex-col justify-between ${
                  plan.featured
                    ? 'bg-navy-dark border-2 border-emerald shadow-[0_20px_50px_rgba(16,185,129,0.15)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.25)]'
                    : 'bg-white border border-gray-200 shadow-xl hover:shadow-2xl hover:border-emerald/30'
                }`}
              >
                {/* Glow for featured */}
                {plan.featured && (
                  <div className="absolute top-0 right-0 w-40 h-40 bg-emerald/10 rounded-full blur-3xl pointer-events-none" />
                )}

                <div>
                  {/* Bundle Badge */}
                  <div className={`inline-flex items-center px-4 py-1.5 rounded-full border mb-6 ${plan.badgeColor}`}>
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">
                      {plan.badge}
                    </span>
                  </div>

                  {/* Plan Name */}
                  <h3 className={`text-2xl font-extrabold tracking-tight mb-2 ${plan.featured ? 'text-white' : 'text-navy-dark'}`}>
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-baseline">
                      <span className={`text-4xl md:text-5xl font-black tracking-tight font-mono ${plan.featured ? 'text-emerald' : 'text-navy-dark'}`}>
                        ${price}
                      </span>
                      {price > 0 && (
                        <span className={`ml-2.5 text-sm font-semibold font-mono ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>
                          / month
                        </span>
                      )}
                    </div>
                    <p className={`text-xs mt-2 font-mono leading-relaxed ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>
                      {plan.description}
                    </p>
                  </div>

                  {/* Divider */}
                  <div className={`border-t my-6 ${plan.featured ? 'border-white/10' : 'border-gray-100'}`} />

                  {/* Checklist */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((item, idx) => (
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
                        <span className={`ml-3 text-sm md:text-base font-semibold leading-tight ${plan.featured ? 'text-gray-300' : 'text-gray-600'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  {/* CTA Button */}
                  <Link
                    to="/register"
                    className={`w-full inline-flex items-center justify-center px-6 py-4 rounded-xl text-base font-extrabold transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] group ${
                      plan.featured
                        ? 'text-navy bg-emerald hover:bg-emerald-dark shadow-emerald/20'
                        : 'text-white bg-navy hover:bg-navy-dark'
                    }`}
                  >
                    {plan.cta}
                    <svg
                      className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>

                  {/* Period note */}
                  <span className={`text-xs font-mono mt-5 text-center block leading-relaxed ${plan.featured ? 'text-gray-500' : 'text-gray-400'}`}>
                    {price === 0 ? '🎉 No credit card required' : annual ? '💰 Billed annually' : '⏱ Billed monthly · Cancel anytime'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto mt-16 p-6 md:p-8 bg-gray-50 rounded-3xl border border-gray-150 shadow-lg">
          <h3 className="text-base md:text-lg font-bold text-navy-dark tracking-tight text-center mb-6">
            Compare Plans
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs text-left text-gray-500 border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 font-extrabold text-navy-dark">FEATURE</th>
                  <th className="py-3 font-extrabold text-gray-400 text-center">FREE</th>
                  <th className="py-3 font-extrabold text-emerald text-center">PRO</th>
                  <th className="py-3 font-extrabold text-blue-400 text-center">ENTERPRISE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ['AI Voice Agent Chats', '50/mo', 'Unlimited', 'Unlimited'],
                  ['Menu Items', '20', '200', 'Unlimited'],
                  ['Food Trend Intelligence', '—', '✅', '✅'],
                  ['AR Menu Previews', '—', '✅', '✅'],
                  ['KDS / Order Management', '—', '—', '✅'],
                  ['POS Integration', '—', '—', '✅'],
                  ['Custom AI Training', '—', '—', '✅'],
                  ['User Accounts', '1', '3', 'Unlimited'],
                ].map(([feature, free, pro, ent], idx) => (
                  <tr key={idx}>
                    <td className="py-3 font-bold text-navy-dark">{feature}</td>
                    <td className="py-3 text-center">{free}</td>
                    <td className="py-3 text-center font-bold text-emerald">{pro}</td>
                    <td className="py-3 text-center font-bold text-blue-400">{ent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
