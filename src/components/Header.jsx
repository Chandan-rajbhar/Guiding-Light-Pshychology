import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Phone, X } from 'lucide-react';
import { IoMdMenu } from 'react-icons/io';

export default function Header({ onOpenMenu }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isMenuPage = location.pathname === '/menu';
  const isSubpage = !isMenuPage && (
    location.pathname.startsWith('/therapies/') ||
    (location.pathname !== '/' &&
      location.pathname !== '/therapies' &&
      location.pathname !== '/adhd-testing' &&
      location.pathname !== '/resources' &&
      location.pathname !== '/contact'));

  const handleMenuClick = () => {
    if (isMenuPage) {
      navigate(-1);
    } else {
      navigate('/menu');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-2 bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-[0_1px_3px_rgba(0,0,0,0.03)] shrink-0">
      <div className="flex items-center space-x-2">
        {isSubpage ? (
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 -ml-1 text-brand-dark hover:text-brand-primary active:scale-95 transition-all rounded-full hover:bg-neutral-100"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-4.5 h-4.5 text-brand-dark" />
          </button>
        ) : null}

        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2.5 text-left group"
          aria-label="Guiding Light Psychology Home"
        >
          <img
            src="/assets/images/logo-icon.png"
            alt="Guiding Light Psychology"
            className="w-10 h-10 object-contain shrink-0 group-hover:scale-105 transition-transform drop-shadow-2xs"
          />
          <div className="flex flex-col justify-center">
            <span className="font-serif text-[15.5px] font-bold text-[#2D3748] tracking-tight leading-tight group-hover:text-brand-primary transition-colors">
              Guiding Light
            </span>
            <span className="text-[8.5px] font-bold capitalize tracking-[0.2em] text-brand-primary leading-none mt-0.5">
              Psychology
            </span>
          </div>
        </button>
      </div>

      <div className="flex items-center space-x-2">
        <a
          href="tel:941-977-5444"
          className="w-8 h-8 flex items-center justify-center text-brand-primary hover:bg-brand-primaryLight/50 active:scale-95 rounded-full transition-all border border-brand-primary/20 bg-brand-primarySoft/30"
          title="Call 941-977-5444"
          aria-label="Call Doctor"
        >
          <Phone className="w-3.5 h-3.5 text-brand-primary" />
        </a>

        {/* Minimal hamburger menu icon or close button */}
        <button
          onClick={handleMenuClick}
          className="w-8 h-8 flex items-center justify-center text-neutral-800 hover:text-brand-primary hover:bg-neutral-100 active:scale-95 transition-all rounded-full border border-neutral-200/80 bg-white shadow-2xs"
          aria-label={isMenuPage ? "Close Menu" : "Open Navigation Menu"}
        >
          {isMenuPage ? (
            <X className="w-4.5 h-4.5 text-neutral-800" />
          ) : (
            <IoMdMenu className="w-5 h-5 text-neutral-800" />
          )}
        </button>
      </div>
    </header>
  );
}
