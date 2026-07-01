import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section for indicator
      const sections = ['ar-menu', 'features', 'roi-calculator', 'how-it-works', 'pricing', 'faq'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { label: 'AR Menu', id: 'ar-menu' },
    { label: 'Features', id: 'features' },
    { label: 'ROI Calculator', id: 'roi-calculator' },
    { label: 'Timeline', id: 'how-it-works' },
    { label: 'Pricing', id: 'pricing' },
    { label: 'FAQ', id: 'faq' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-navy-dark/85 backdrop-blur-lg border-b border-white/10 shadow-lg shadow-black/20 py-3' 
          : 'bg-navy-dark border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div 
          className="flex items-center cursor-pointer group" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          {/* Fork + Circuit SVG Logo */}
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full bg-emerald/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <svg
              className="relative w-9 h-9 mr-3 text-emerald transition-transform duration-300 group-hover:scale-105"
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
          </div>
          <span className="font-extrabold text-2xl tracking-tight select-none">
            <span className="text-white">Smart</span>
            <span className="text-emerald">Dine</span>
            <span className="text-white ml-1">AI</span>
          </span>
        </div>

        {/* Middle Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`relative px-1.5 py-1 text-sm font-semibold transition-colors duration-200 ${
                activeSection === link.id 
                  ? 'text-emerald' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald rounded-full shadow-[0_0_8px_#10b981]" />
              )}
            </a>
          ))}
        </nav>

        {/* Right: CTA Button */}
        <div className="flex items-center">
          <a
            href="https://wa.me/923342865069"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-300 shadow-md shadow-emerald/20 hover:scale-[1.03] active:scale-[0.98] group overflow-hidden"
          >
            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center">
              Book a Demo
              <svg
                className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
