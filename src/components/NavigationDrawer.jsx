import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { X, ExternalLink, Phone, Mail, Sparkles, ChevronRight, User } from 'lucide-react';
import { drawerNavLinks } from '../data/navigation';
import { doctorData } from '../data/doctor';

export default function NavigationDrawer({ isOpen, onClose }) {
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen) {
      setIsRendered(true);
      // Next tick triggers the smooth slide-in and fade-in
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 15);
    } else {
      setIsVisible(false);
      // Wait for the 320ms transition to finish before unmounting
      timer = setTimeout(() => {
        setIsRendered(false);
      }, 320);
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  return (
    <div className="absolute inset-0 z-50 overflow-hidden flex">
      {/* Smooth Dark Backdrop */}
      <div 
        onClick={onClose}
        className={`absolute inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity duration-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Smooth Slide-In Mobile Drawer Panel */}
      <div 
        className={`relative ml-auto w-[82%] max-w-[320px] h-full bg-[#FAF8F5] shadow-2xl rounded-l-[28px] border-l border-white/40 flex flex-col z-10 transition-transform duration-320 will-change-transform ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4.5 border-b border-neutral-200/70 bg-white rounded-tl-[28px]">
          <div className="flex items-center space-x-2.5">
            <img 
              src="/assets/images/guidings-1019x1024.png" 
              alt="Guiding Light Logo" 
              className="w-7 h-7 object-contain rounded-full bg-brand-primaryLight/30 p-0.5"
            />
            <span className="font-serif font-semibold text-brand-dark text-base">
              Guiding Light
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-800 rounded-full hover:bg-neutral-100 transition-colors active:scale-95"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Quick Profile Card */}
        <div className="p-3.5 mx-4 mt-3.5 bg-white rounded-2xl border border-neutral-200/70 shadow-xs flex items-center space-x-3">
          <img 
            src={doctorData.photo} 
            alt="Dr. Anna" 
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-primary/20 shadow-xs shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-semibold text-brand-dark font-serif truncate">Dr. Anna</h4>
            <p className="text-[11px] text-brand-muted leading-tight">Licensed Psychologist</p>
            <span className="inline-block mt-0.5 text-[10px] text-brand-primary font-semibold">
              13+ Years Experience
            </span>
          </div>
        </div>

        {/* Navigation Links List */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5 phone-screen-scroll">
          {drawerNavLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              end={item.path === '/'}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] font-medium transition-all active:scale-[0.99]
                ${isActive 
                  ? 'bg-brand-primary text-white shadow-soft font-semibold' 
                  : 'text-neutral-700 hover:bg-white hover:text-brand-primary border border-transparent hover:border-neutral-200/60'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <span className="truncate">{item.label}</span>
                  <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                </>
              )}
            </NavLink>
          ))}

          {/* External Alma Booking Button */}
          <div className="pt-2">
            <a
              href={doctorData.almaBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold bg-gradient-to-r from-brand-accentLight to-[#F5ECE0] text-brand-dark border border-brand-accent/40 hover:border-brand-accent shadow-2xs hover:shadow-xs transition-all group"
            >
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-lg bg-white/80 flex items-center justify-center text-brand-accentDark group-hover:scale-105 transition-transform">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Book on Alma</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500 group-hover:text-brand-dark transition-colors" />
            </a>
          </div>
        </nav>

        {/* Drawer Footer Contact Bar */}
        <div className="p-4 border-t border-neutral-200/80 bg-white rounded-bl-[28px] space-y-2 text-xs">
          <a 
            href={`tel:${doctorData.phone}`} 
            className="flex items-center space-x-2.5 text-neutral-700 hover:text-brand-primary transition-colors py-1 px-1 rounded-lg hover:bg-neutral-50"
          >
            <div className="w-6 h-6 rounded-full bg-brand-primarySoft flex items-center justify-center text-brand-primary shrink-0">
              <Phone className="w-3 h-3" />
            </div>
            <span className="font-medium">{doctorData.phone}</span>
          </a>

          <a 
            href={`mailto:${doctorData.email}`} 
            className="flex items-center space-x-2.5 text-neutral-700 hover:text-brand-primary transition-colors py-1 px-1 rounded-lg hover:bg-neutral-50 truncate"
          >
            <div className="w-6 h-6 rounded-full bg-brand-primarySoft flex items-center justify-center text-brand-primary shrink-0">
              <Mail className="w-3 h-3" />
            </div>
            <span className="truncate font-medium">{doctorData.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
