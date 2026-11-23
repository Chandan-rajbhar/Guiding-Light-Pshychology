import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Heart, Brain, BookOpen, User } from 'lucide-react';

const navTabs = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/therapies', label: 'Therapies', icon: Heart },
  { path: '/adhd-testing', label: 'Testing', icon: Brain },
  { path: '/resources', label: 'Resources', icon: BookOpen },
  { path: '/contact', label: 'Contact', icon: User }
];

export default function BottomNavigation() {
  return (
    <nav className="z-30 bg-white/95 backdrop-blur-md border-t border-neutral-100 shadow-[0_-4px_20px_rgba(0,0,0,0.04)] px-3 py-2 shrink-0">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'}
              className={({ isActive }) => `
                flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'text-brand-primary scale-105 font-medium' 
                  : 'text-[#8E98A4] hover:text-brand-charcoal hover:scale-102'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <div className={`relative p-1 rounded-full transition-colors ${isActive ? 'bg-brand-primaryLight/60 text-brand-primary' : ''}`}>
                    <Icon 
                      className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'stroke-[2.4px] text-brand-primary' : 'stroke-[1.8px]'}`} 
                    />
                    {isActive && (
                      <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-primary rounded-full" />
                    )}
                  </div>
                  <span className={`text-[11px] mt-0.5 tracking-tight ${isActive ? 'font-semibold text-brand-primary' : 'font-normal'}`}>
                    {tab.label}
                  </span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
