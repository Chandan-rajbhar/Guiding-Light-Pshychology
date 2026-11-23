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
    <nav 
      style={{ backgroundColor: '#ffffff' }}
      className="fixed md:absolute bottom-[max(0.75rem,env(safe-area-inset-bottom))] inset-x-3.5 z-40 max-w-[390px] mx-auto bg-white rounded-[26px] border border-neutral-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.06)] px-2 py-2 select-none"
    >
      <div className="flex items-center justify-between w-full">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.path === '/'}
              className="flex-1 flex flex-col items-center justify-center py-0.5 group focus:outline-hidden"
            >
              {({ isActive }) => (
                <>
                  {/* Soft Rounded Capsule Pill Behind Active Icon */}
                  <div
                    className={`flex items-center justify-center w-12 h-7 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-[#EEF2FD] text-brand-primaryDark shadow-2xs'
                        : 'bg-transparent text-[#94A3B8] group-hover:bg-neutral-100/50 group-hover:text-neutral-700'
                    }`}
                  >
                    <Icon
                      className={`w-[19px] h-[19px] transition-transform duration-200 ${
                        isActive
                          ? 'stroke-[2.3px] text-brand-primaryDark scale-105'
                          : 'stroke-[1.8px] text-[#94A3B8] group-hover:text-neutral-700'
                      }`}
                    />
                  </div>

                  {/* Tab Label */}
                  <span
                    className={`text-[10px] mt-1 tracking-tight transition-colors duration-200 ${
                      isActive
                        ? 'font-bold text-brand-primaryDark'
                        : 'font-medium text-[#94A3B8] group-hover:text-neutral-700'
                    }`}
                  >
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
