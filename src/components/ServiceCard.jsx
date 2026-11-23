import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Sparkles, 
  Brain, 
  Activity, 
  Shield, 
  Moon, 
  Heart, 
  Leaf, 
  Compass, 
  Smile, 
  Flame, 
  Users, 
  ArrowRight 
} from 'lucide-react';

const iconComponents = {
  User,
  Sparkles,
  Brain,
  Activity,
  Shield,
  Moon,
  Heart,
  Leaf,
  Compass,
  Smile,
  Flame,
  Users
};

export default function ServiceCard({ service, variant = 'full' }) {
  const navigate = useNavigate();
  const IconComponent = iconComponents[service.lucideIcon] || Sparkles;

  const handleClick = () => {
    navigate(`/therapies/${service.slug}`);
  };

  // Compact grid card matching reference screenshot
  if (variant === 'compact') {
    return (
      <div
        onClick={handleClick}
        className="cursor-pointer group flex flex-col items-start justify-between p-4 bg-white/90 hover:bg-white rounded-2xl border border-neutral-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-card-hover transition-all duration-200 active:scale-[0.98]"
      >
        <div className="w-10 h-10 rounded-xl bg-brand-primarySoft flex items-center justify-center mb-3 group-hover:scale-105 transition-transform overflow-hidden">
          {service.icon ? (
            <img 
              src={service.icon} 
              alt={service.shortTitle} 
              className="w-6 h-6 object-contain"
              onError={(e) => {
                // fallback to lucide icon if img fails
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <IconComponent className="w-5 h-5 text-brand-primary" />
          )}
        </div>

        <div>
          <h4 className="text-[13px] font-semibold text-brand-dark leading-tight group-hover:text-brand-primary transition-colors">
            {service.shortTitle || service.title}
          </h4>
        </div>
      </div>
    );
  }

  // Full detailed service card with image, description, and Learn More button
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200/70 shadow-card hover:shadow-card-hover transition-all duration-200 flex flex-col">
      {/* Service Image banner if available */}
      {service.image && (
        <div className="relative h-40 w-full overflow-hidden bg-neutral-100">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-white/95 p-1.5 shadow-sm shrink-0 flex items-center justify-center">
              {service.icon ? (
                <img src={service.icon} alt="" className="w-full h-full object-contain" />
              ) : (
                <IconComponent className="w-4 h-4 text-brand-primary" />
              )}
            </div>
            <span className="text-white text-xs font-medium tracking-wide drop-shadow-sm line-clamp-1">
              Guiding Light Psychology
            </span>
          </div>
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {!service.image && (
            <div className="w-12 h-12 rounded-2xl bg-brand-primarySoft flex items-center justify-center mb-3">
              {service.icon ? (
                <img src={service.icon} alt="" className="w-7 h-7 object-contain" />
              ) : (
                <IconComponent className="w-6 h-6 text-brand-primary" />
              )}
            </div>
          )}

          <h3 className="text-base font-bold text-brand-dark font-serif tracking-tight mb-2 leading-snug">
            {service.title}
          </h3>

          <p className="text-xs text-neutral-600 leading-relaxed mb-4 line-clamp-3">
            {service.shortDescription}
          </p>
        </div>

        <button
          onClick={handleClick}
          className="w-full mt-2 py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-1.5 shadow-xs hover:shadow-sm active:scale-[0.99] transition-all"
        >
          <span>Learn More</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
