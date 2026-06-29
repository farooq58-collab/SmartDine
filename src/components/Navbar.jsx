import React from 'react';

export default function Navbar() {
  const scrollToPricing = (e) => {
    e.preventDefault();
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToARMenu = (e) => {
    e.preventDefault();
    const arSection = document.getElementById('ar-menu');
    if (arSection) {
      arSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFeatures = (e) => {
    e.preventDefault();
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-navy-dark/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {/* Fork + Circuit SVG Logo */}
          <svg
            className="w-9 h-9 mr-3 text-emerald"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Fork prongs */}
            <path d="M12 2v6" />
            <path d="M9 2v4c0 1.1.9 2 2 2h2c1.1 0 2-.9 2-2V2" />
            {/* Fork handle */}
            <path d="M12 8v8" />
            
            {/* Circuit paths branching from handle */}
            <path d="M12 11h4a1 1 0 0 1 1 1v2" />
            <circle cx="17" cy="15" r="1.5" className="fill-emerald stroke-emerald" />
            
            <path d="M12 14H8a1 1 0 0 0 -1 1v2" />
            <circle cx="7" cy="18" r="1.5" className="fill-emerald stroke-emerald" />

            <circle cx="12" cy="17" r="1.5" className="fill-emerald stroke-emerald" />
            <path d="M12 18.5V22" />
            <circle cx="12" cy="22.5" r="1" className="fill-emerald stroke-emerald" />
          </svg>
          <span className="font-extrabold text-2xl tracking-tight">
            <span className="text-white">Smart</span>
            <span className="text-emerald">Dine</span>
            <span className="text-white ml-1">AI</span>
          </span>
        </div>

        {/* Middle Links (optional, adds premium layout feel) */}
        <nav className="hidden md:flex space-x-8">
          <a
            href="#ar-menu"
            onClick={scrollToARMenu}
            className="text-gray-300 hover:text-emerald text-sm font-medium transition-colors duration-200"
          >
            AR Menu
          </a>
          <a
            href="#features"
            onClick={scrollToFeatures}
            className="text-gray-300 hover:text-emerald text-sm font-medium transition-colors duration-200"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={scrollToHowItWorks}
            className="text-gray-300 hover:text-emerald text-sm font-medium transition-colors duration-200"
          >
            Timeline
          </a>
          <a
            href="#pricing"
            onClick={scrollToPricing}
            className="text-gray-300 hover:text-emerald text-sm font-medium transition-colors duration-200"
          >
            Pricing
          </a>
        </nav>

        {/* Right: CTA Button */}
        <div className="flex items-center">
          <a
            href="https://wa.me/923342865069"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-200 shadow-md shadow-emerald/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a Demo
            <svg
              className="w-4 h-4 ml-1.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
