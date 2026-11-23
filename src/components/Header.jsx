import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, ArrowLeft, Phone } from 'lucide-react';

export default function Header({ onOpenMenu }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isSubpage = location.pathname.startsWith('/therapies/') || 
                    (location.pathname !== '/' && 
                     location.pathname !== '/therapies' && 
                     location.pathname !== '/adhd-testing' && 
                     location.pathname !== '/resources' && 
                     location.pathname !== '/contact');

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] shrink-0">
      <div className="flex items-center space-x-2.5">
        {isSubpage ? (
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1 text-brand-dark hover:text-brand-primary active:scale-95 transition-all rounded-full hover:bg-neutral-100"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-5 h-5 text-brand-dark" />
          </button>
        ) : null}

        <button 
          onClick={() => navigate('/')} 
          className="flex items-center space-x-2 text-left group"
        >
          <img 
            src="/assets/images/guidings-1019x1024.png" 
            alt="Guiding Light Logo" 
            className="w-8 h-8 object-contain rounded-full bg-brand-primaryLight/40 p-0.5 group-hover:scale-105 transition-transform"
          />
          <span className="font-serif text-[18px] font-semibold text-[#2D3748] tracking-tight group-hover:text-brand-primary transition-colors">
            Guiding Light
          </span>
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <a
          href="tel:941-977-5444"
          className="p-2 text-brand-primary hover:bg-brand-primaryLight/50 rounded-full transition-colors"
          title="Call 941-977-5444"
          aria-label="Call Doctor"
        >
          <Phone className="w-4 h-4 text-brand-primary" />
        </a>

        {/* Minimal hamburger menu icon matching reference image */}
        <button
          onClick={onOpenMenu}
          className="p-2 text-neutral-800 hover:text-brand-primary hover:bg-neutral-100 active:scale-95 transition-all rounded-lg"
          aria-label="Open Navigation Menu"
        >
          <div className="w-5 flex flex-col items-end gap-1.5">
            <span className="w-5 h-[2px] bg-neutral-800 rounded-full" />
            <span className="w-3.5 h-[2px] bg-neutral-800 rounded-full" />
          </div>
        </button>
      </div>
    </header>
  );
}
