import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-emerald/20 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <svg
            className="w-7 h-7 mr-2.5 text-emerald"
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
            
            {/* Circuit paths */}
            <path d="M12 11h4a1 1 0 0 1 1 1v2" />
            <circle cx="17" cy="15" r="1" className="fill-emerald stroke-emerald" />
            
            <path d="M12 14H8a1 1 0 0 0 -1 1v2" />
            <circle cx="7" cy="18" r="1" className="fill-emerald stroke-emerald" />

            <circle cx="12" cy="17" r="1" className="fill-emerald stroke-emerald" />
          </svg>
          <span className="font-extrabold text-xl tracking-tight">
            <span className="text-white">Smart</span>
            <span className="text-emerald">Dine</span>
            <span className="text-white ml-0.5">AI</span>
          </span>
        </div>

        {/* Right: Copyright and Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 font-mono text-xs text-gray-500">
          <span>© 2026 SmartDine AI</span>
          <span className="hidden sm:inline text-white/10">|</span>
          <a
            href="https://wa.me/923342865069"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-emerald transition-colors duration-200 flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 fill-emerald" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.706 1.458h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            +92 334 2865069
          </a>
        </div>
      </div>
    </footer>
  );
}
