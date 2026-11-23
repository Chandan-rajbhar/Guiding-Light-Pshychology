import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  ChevronRight, 
  HeartHandshake, 
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  VolumeX
} from 'lucide-react';
import { doctorData } from '../data/doctor';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';

export default function Home() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Handle browser autoplay policies gracefully
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Highlighted 4 services matching reference screenshot
  const featuredServices = [
    servicesData.find(s => s.slug === 'adhd-therapy-executive-functioning-coaching') || servicesData[2],
    servicesData.find(s => s.slug === 'individual-therapy-for-adults') || servicesData[0],
    servicesData.find(s => s.slug === 'anxiety-stress') || servicesData[3],
    servicesData.find(s => s.slug === 'sleep-insomnia-support') || servicesData[5]
  ];

  return (
    <div className="space-y-6 px-4 py-4 md:px-5">
      {/* Hero Section - Clean, Seamless Modern Layout (Outer Card Removed) */}
      <section className="space-y-4">
        {/* Real Website Video Container - Sleek Standalone Video Card */}
        <div className="relative w-full h-52 md:h-60 rounded-3xl overflow-hidden bg-neutral-900 shadow-card border border-neutral-200/80 group">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={doctorData.heroImage}
            className="w-full h-full object-cover object-center scale-[1.01]"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={doctorData.heroVideo} type="video/mp4" />
            <source src={doctorData.heroVideoRemote} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Gradient Overlay for contrast and readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Video Control Buttons (Play/Pause & Mute) */}
          <div className="absolute bottom-3.5 right-3.5 flex items-center space-x-2 z-10">
            <button
              onClick={toggleMute}
              className="p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/25 transition-all active:scale-95 shadow-xs"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-brand-accentLight" />}
            </button>
            <button
              onClick={togglePlay}
              className="p-2 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-md border border-white/25 transition-all active:scale-95 shadow-xs"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-brand-accentLight fill-current" />}
            </button>
          </div>

          <div className="absolute bottom-3.5 left-3.5 text-white text-xs font-medium drop-shadow-md z-10">
            Welcome to Guiding Light Psychology
          </div>
        </div>

        {/* Hero Content - Clean, Unboxed & Elegantly Spaced */}
        <div className="px-1 space-y-2.5">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
            <span className="text-[11px] font-bold tracking-wider uppercase text-brand-primary">
              GUIDING LIGHT PSYCHOLOGY
            </span>
          </div>

          <h1 className="font-serif text-2xl md:text-[26px] font-bold text-brand-dark leading-tight tracking-tight">
            A better understanding of you.
          </h1>

          <p className="text-xs md:text-[13px] text-neutral-700 leading-relaxed font-sans font-normal">
            {doctorData.heroHeading}
          </p>

          <div className="p-3 rounded-2xl bg-brand-primarySoft/60 border border-brand-primary/15 text-brand-primaryDark text-xs font-medium italic">
            "{doctorData.heroSubheading}"
          </div>

          <div className="pt-1.5">
            <button
              onClick={() => navigate('/contact')}
              className="w-full py-3.5 px-5 rounded-2xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs md:text-sm font-semibold shadow-soft hover:shadow-card-hover active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <span>{doctorData.heroCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Meet Dr. Anna Card - Matching Reference Screenshot */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm">
        <h3 className="font-serif font-bold text-base text-brand-dark mb-3">
          Meet Dr. Anna
        </h3>

        <div 
          onClick={() => navigate('/meet-dr-anna')}
          className="cursor-pointer group flex items-center justify-between p-3.5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/70 hover:border-brand-primary/40 transition-all duration-200 active:scale-[0.99]"
        >
          <div className="flex items-center space-x-3.5 min-w-0 flex-1">
            <div className="relative shrink-0">
              <img 
                src={doctorData.photo} 
                alt="Dr. Anna" 
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-primary/20 shadow-xs"
              />
              <span className="absolute -bottom-1 -right-1 bg-brand-primary text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full shadow-2xs">
                Psy.D.
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold tracking-wider uppercase text-brand-primary block">
                13+ Years Experience
              </span>
              <h4 className="font-serif font-bold text-sm text-brand-dark group-hover:text-brand-primary transition-colors leading-snug truncate">
                About Dr. Anna
              </h4>
              <p className="text-xs text-neutral-500 leading-tight">
                Discover her approach to therapy.
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-white shadow-2xs group-hover:bg-brand-primary group-hover:text-white flex items-center justify-center text-brand-primary transition-colors shrink-0 ml-2">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Explore Therapies Section - 2-Column Compact Grid from Reference Screenshot */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="font-serif font-bold text-base text-brand-dark">
            Explore Therapies
          </h3>
          <button
            onClick={() => navigate('/therapies')}
            className="text-xs font-medium text-brand-primary hover:text-brand-primaryDark transition-colors flex items-center space-x-0.5"
          >
            <span>View All (12)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2x2 Grid of Featured Therapies matching Screenshot */}
        <div className="grid grid-cols-2 gap-3">
          {featuredServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              variant="compact" 
            />
          ))}
        </div>
      </div>

      {/* All 12 Services Quick List */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-brand-primary">Services I Offer</span>
            <h3 className="font-serif font-bold text-base text-brand-dark">
              Evidence-Based Care
            </h3>
          </div>
          <button
            onClick={() => navigate('/therapies')}
            className="text-xs font-semibold text-brand-primary hover:underline"
          >
            See All 12
          </button>
        </div>

        <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
          Comprehensive, specialized therapeutic support for adults, adolescents, and neurodivergent minds.
        </p>

        <div className="space-y-2.5">
          {servicesData.slice(4, 8).map((service) => (
            <div
              key={service.id}
              onClick={() => navigate(`/therapies/${service.slug}`)}
              className="cursor-pointer flex items-center justify-between p-3 rounded-xl bg-neutral-50 hover:bg-brand-primarySoft/50 transition-all border border-neutral-150"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-white shadow-2xs flex items-center justify-center p-1">
                  <img src={service.icon} alt="" className="w-full h-full object-contain" />
                </div>
                <span className="text-xs font-semibold text-brand-dark">
                  {service.shortTitle}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Therapy Philosophy & Approach Section */}
      <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-brand-accent/25 shadow-xs">
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-accentDark">
          Guiding Principles
        </span>
        <h3 className="font-serif font-bold text-base text-brand-dark mt-1 mb-2">
          {doctorData.philosophy.heading}
        </h3>
        <p className="text-xs text-neutral-700 leading-relaxed mb-4">
          {doctorData.philosophy.lead}
        </p>

        <div className="space-y-2.5">
          {doctorData.philosophy.principles.map((p, i) => (
            <div key={i} className="flex items-start space-x-2.5 bg-white p-3 rounded-2xl border border-neutral-100 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold text-brand-dark">{p.title}</h4>
                <p className="text-[11px] text-neutral-600 mt-0.5 leading-snug">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/meet-dr-anna')}
          className="w-full mt-4 py-2.5 rounded-xl border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1"
        >
          <span>Read Dr. Anna's Full Approach</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Final Call to Action */}
      <CTASection />
    </div>
  );
}
