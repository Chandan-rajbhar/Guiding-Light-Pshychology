import React, { useState } from 'react';
import Header from './Header';
import BottomNavigation from './BottomNavigation';
import NavigationDrawer from './NavigationDrawer';

export default function PhoneFrame({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#E5ECF2] p-0 md:p-6 lg:p-8">
      {/* Desktop Realistic Smartphone Mockup Outer Container */}
      <div className="relative w-full md:w-[412px] h-screen md:h-[860px] md:max-h-[92vh] flex flex-col bg-white md:rounded-[44px] shadow-none md:shadow-phone md:border-[10px] md:border-[#1E232A] overflow-hidden select-none">
        
        {/* Hardware details: Side buttons on desktop */}
        <div className="hidden md:block absolute -left-[13px] top-[120px] w-[3px] h-[36px] bg-[#2C313A] rounded-l-sm" />
        <div className="hidden md:block absolute -left-[13px] top-[168px] w-[3px] h-[50px] bg-[#2C313A] rounded-l-sm" />
        <div className="hidden md:block absolute -left-[13px] top-[226px] w-[3px] h-[50px] bg-[#2C313A] rounded-l-sm" />
        <div className="hidden md:block absolute -right-[13px] top-[180px] w-[3px] h-[75px] bg-[#2C313A] rounded-r-sm" />

        {/* Global Application Header */}
        <Header onOpenMenu={() => setDrawerOpen(true)} />

        {/* Slide-out Drawer Navigation */}
        <NavigationDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />

        {/* Main Independently Scrollable Screen Container */}
        <div 
          id="phone-scroll-container" 
          className="relative flex-1 overflow-y-auto overflow-x-hidden phone-screen-scroll bg-[#FAF7F2] pb-24"
        >
          {children}
        </div>

        {/* Fixed Bottom Navigation Bar inside the Phone Frame */}
        <BottomNavigation />

        {/* Mobile Home Bar indicator on desktop frame */}
        <div className="hidden md:flex justify-center pb-2 pt-1 bg-white shrink-0">
          <div className="w-32 h-1 bg-neutral-300 rounded-full" />
        </div>
      </div>
    </div>
  );
}
