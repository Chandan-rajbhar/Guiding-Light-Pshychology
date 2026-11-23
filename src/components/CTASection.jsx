import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Calendar, Phone } from 'lucide-react';
import { doctorData } from '../data/doctor';

export default function CTASection({ 
  title = doctorData.finalCta.heading,
  subtitle = doctorData.finalCta.subheading,
  buttonText = doctorData.finalCta.buttonText,
  showAlmaLink = true 
}) {
  const navigate = useNavigate();

  return (
    <section className="my-6 p-6 rounded-3xl bg-gradient-to-br from-[#4A6F8C] to-[#5F84A2] text-white shadow-soft relative overflow-hidden">
      {/* Subtle organic background curve */}
      <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-brand-accent/20 blur-xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3">
          <Sparkles className="w-5 h-5 text-brand-accentLight" />
        </div>

        <h3 className="text-lg md:text-xl font-serif font-bold tracking-tight mb-2">
          {title}
        </h3>

        <p className="text-xs text-white/90 leading-relaxed mb-5 max-w-sm">
          {subtitle}
        </p>

        <div className="w-full flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => navigate('/contact')}
            className="flex-1 py-3 px-5 rounded-2xl bg-white text-brand-primaryDark font-semibold text-xs flex items-center justify-center space-x-1.5 shadow-md hover:bg-neutral-50 active:scale-[0.98] transition-all"
          >
            <span>{buttonText}</span>
            <ArrowRight className="w-3.5 h-3.5 text-brand-primary" />
          </button>

          {showAlmaLink && (
            <a
              href={doctorData.almaBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Assessment</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
