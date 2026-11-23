import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, ExternalLink, Phone, Mail, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import { drawerNavLinks } from '../data/navigation';
import { doctorData } from '../data/doctor';

export default function NavigationDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 overflow-hidden flex">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer content */}
      <div className="relative ml-auto w-[82%] max-w-[320px] h-full bg-[#FAF8F5] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-200/80 bg-white">
          <div className="flex items-center space-x-2.5">
            <img 
              src="/assets/images/guidings-1019x1024.png" 
              alt="Logo" 
              className="w-7 h-7 object-contain"
            />
            <span className="font-serif font-semibold text-brand-dark text-base">
              Guiding Light
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-neutral-800 rounded-full hover:bg-neutral-100"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Doctor Quick Badge */}
        <div className="p-4 mx-4 mt-4 bg-white rounded-2xl border border-neutral-100 shadow-xs flex items-center space-x-3">
          <img 
            src="/assets/images/dr.png" 
            alt="Dr. Anna" 
            className="w-11 h-11 rounded-full object-cover ring-2 ring-brand-primary/20"
          />
          <div>
            <h4 className="text-sm font-semibold text-brand-dark font-serif">Dr. Anna</h4>
            <p className="text-[11px] text-brand-muted leading-tight">Licensed Psychologist</p>
            <span className="inline-block mt-0.5 text-[10px] text-brand-primary font-medium">13+ Years Experience</span>
          </div>
        </div>

        {/* Links List */}
        <nav className="flex-1 overflow-y-auto px-4 py-3 space-y-1">
          {drawerNavLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              end={item.path === '/'}
              className={({ isActive }) => `
                flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-colors
                ${isActive 
                  ? 'bg-brand-primary text-white font-medium shadow-xs' 
                  : 'text-neutral-700 hover:bg-neutral-100/80 hover:text-brand-primary'
                }
              `}
            >
              <span>{item.label}</span>
              <span className="text-xs opacity-60">→</span>
            </NavLink>
          ))}

          {/* External Alma Booking Button */}
          <div className="pt-2">
            <a
              href={doctorData.almaBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium bg-brand-accentLight text-brand-dark border border-brand-accent/30 hover:bg-brand-accent/20 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-brand-accentDark" />
                <span>Book on Alma</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </a>
          </div>
        </nav>

        {/* Drawer Footer Contact */}
        <div className="p-4 border-t border-neutral-200 bg-white space-y-2 text-xs">
          <a 
            href={`tel:${doctorData.phone}`} 
            className="flex items-center space-x-2.5 text-neutral-700 hover:text-brand-primary"
          >
            <Phone className="w-3.5 h-3.5 text-brand-primary" />
            <span>{doctorData.phone}</span>
          </a>
          <a 
            href={`mailto:${doctorData.email}`} 
            className="flex items-center space-x-2.5 text-neutral-700 hover:text-brand-primary truncate"
          >
            <Mail className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            <span className="truncate">{doctorData.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
