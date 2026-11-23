import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { 
  ChevronRight, 
  Sparkles, 
  ExternalLink, 
  Phone, 
  Mail, 
  MapPin, 
  Home, 
  User, 
  Heart, 
  Brain, 
  HelpCircle, 
  BookOpen, 
  MessageSquare,
  ShieldCheck 
} from 'lucide-react';
import { doctorData } from '../data/doctor';

export default function MenuPage() {
  const navigate = useNavigate();

  const menuItems = [
    {
      path: '/',
      label: 'Home',
      icon: Home,
      desc: 'Return to home dashboard'
    },
    {
      path: '/meet-dr-anna',
      label: 'Meet Dr. Anna',
      icon: User,
      desc: '13+ years clinical experience & approach'
    },
    {
      path: '/therapies',
      label: 'Explore Therapies (12 Services)',
      icon: Heart,
      desc: 'Evidence-based psychotherapy services'
    },
    {
      path: '/adhd-testing',
      label: 'ADHD Testing & Assessment',
      icon: Brain,
      desc: 'Comprehensive multi-method evaluation'
    },
    {
      path: '/faqs',
      label: 'Frequently Asked Questions',
      icon: HelpCircle,
      desc: 'Common questions about sessions & care'
    },
    {
      path: '/resources',
      label: 'Mental Health Resources',
      icon: BookOpen,
      desc: '41 curated links, associations & crisis helplines'
    },
    {
      path: '/contact',
      label: 'Get In Touch / Contact',
      icon: MessageSquare,
      desc: 'Free 15-minute consultation & direct messages'
    }
  ];

  return (
    <div className="min-h-full px-4 py-4 md:px-5 space-y-4 animate-in fade-in duration-200">
      {/* Page Label */}
      <div className="flex items-center justify-between pt-1 px-1">
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-primary">
          Navigation Menu
        </span>
        <span className="text-[11px] text-neutral-400 font-medium">
          Quick Access
        </span>
      </div>

      {/* Dr. Anna Profile Card - Premium Redesigned Layout */}
      <div 
        onClick={() => navigate('/meet-dr-anna')}
        className="cursor-pointer p-4 bg-white rounded-3xl border border-neutral-200/80 shadow-soft hover:shadow-card-hover hover:border-brand-primary/40 transition-all duration-200 active:scale-[0.99] group relative overflow-hidden"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-brand-primarySoft/50 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between space-x-3.5">
          {/* Avatar with fixed dimensions and badge */}
          <div className="relative shrink-0">
            <img 
              src={doctorData.photo} 
              alt="Dr. Anna" 
              className="w-16 h-16 rounded-2xl object-cover object-top ring-2 ring-brand-primary/25 shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 bg-brand-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-2xs">
              Psy.D.
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary block">
              13+ Years Experience
            </span>
            <h3 className="font-serif font-bold text-base text-brand-dark group-hover:text-brand-primary transition-colors leading-snug truncate">
              Dr. Anna
            </h3>
            <p className="text-xs text-neutral-600 leading-tight">
              Licensed Psychologist
            </p>
            <span className="inline-flex items-center space-x-1 text-[11px] text-brand-primary font-medium mt-0.5 group-hover:underline">
              <span>View Bio & Approach</span>
              <span className="text-xs">→</span>
            </span>
          </div>

          {/* Clean right arrow */}
          <div className="w-8 h-8 rounded-full bg-brand-primarySoft group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center text-brand-primary transition-colors shrink-0 shadow-2xs">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Full Navigation Links List */}
      <div className="space-y-2">
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-muted px-1">
          Menu Destinations
        </span>

        <div className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `
                  flex items-center justify-between p-3.5 rounded-2xl transition-all active:scale-[0.99] border
                  ${isActive 
                    ? 'bg-brand-primary text-white border-brand-primary shadow-soft' 
                    : 'bg-white hover:bg-neutral-50/80 text-brand-dark border-neutral-200/70 shadow-2xs hover:border-brand-primary/30'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center space-x-3 truncate">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-brand-primarySoft text-brand-primary'
                      }`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <div className="truncate">
                        <h4 className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-brand-dark'}`}>
                          {item.label}
                        </h4>
                        <p className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-neutral-500'}`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 ml-2 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Prominent Alma Booking Card */}
      <div className="pt-1">
        <a
          href={doctorData.almaBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-brand-accentLight via-[#F8F1E5] to-[#F2E7D5] border border-brand-accent/40 text-brand-dark shadow-2xs hover:shadow-xs transition-all group"
        >
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-white shadow-xs flex items-center justify-center text-brand-accentDark group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-brand-dark">Book on Alma</h4>
              <p className="text-[10px] text-neutral-600">Secure clinical booking portal</p>
            </div>
          </div>
          <ExternalLink className="w-4 h-4 text-neutral-600 group-hover:text-brand-dark transition-colors" />
        </a>
      </div>

      {/* Direct Contact Footer Card */}
      <div className="p-4 bg-white rounded-2xl border border-neutral-200/70 shadow-xs space-y-2.5 text-xs">
        <span className="text-[10px] font-bold tracking-wider uppercase text-neutral-500 block">
          Direct Inquiries
        </span>

        <a 
          href={`tel:${doctorData.phone}`} 
          className="flex items-center space-x-2.5 text-neutral-800 hover:text-brand-primary transition-colors py-1 px-1 rounded-lg hover:bg-neutral-50"
        >
          <div className="w-7 h-7 rounded-full bg-brand-primarySoft flex items-center justify-center text-brand-primary shrink-0">
            <Phone className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block uppercase leading-none">Phone</span>
            <span className="font-semibold text-xs">{doctorData.phone}</span>
          </div>
        </a>

        <a 
          href={`mailto:${doctorData.email}`} 
          className="flex items-center space-x-2.5 text-neutral-800 hover:text-brand-primary transition-colors py-1 px-1 rounded-lg hover:bg-neutral-50"
        >
          <div className="w-7 h-7 rounded-full bg-brand-primarySoft flex items-center justify-center text-brand-primary shrink-0">
            <Mail className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-neutral-400 block uppercase leading-none">Email</span>
            <span className="font-semibold text-xs text-neutral-800 break-all block">{doctorData.email}</span>
          </div>
        </a>

        <div className="flex items-center space-x-2.5 text-neutral-600 pt-1 border-t border-neutral-100 text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-brand-accentDark shrink-0" />
          <span>{doctorData.location}</span>
        </div>
      </div>
    </div>
  );
}
