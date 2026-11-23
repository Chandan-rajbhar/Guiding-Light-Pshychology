import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2,
  ArrowRight,
  Calendar,
  Phone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart
} from 'lucide-react';
import { servicesData } from '../data/services';
import { doctorData } from '../data/doctor';
import BackButton from '../components/BackButton';
import CTASection from '../components/CTASection';

export default function TherapyDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = servicesData.findIndex(s => s.slug === slug);
  const service = servicesData[currentIndex] || servicesData[0];

  const prevService = currentIndex > 0 ? servicesData[currentIndex - 1] : servicesData[servicesData.length - 1];
  const nextService = currentIndex < servicesData.length - 1 ? servicesData[currentIndex + 1] : servicesData[0];

  return (
    <div className="space-y-4 px-4 pt-2.5 pb-6 md:px-5">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between">
        <BackButton label="All Services" to="/therapies" />
        <span className="text-[11px] text-neutral-400 font-medium">
          {currentIndex + 1} of {servicesData.length}
        </span>
      </div>

      {/* Main Service Hero Card */}
      <div className="bg-white rounded-3xl overflow-hidden border border-neutral-100 shadow-sm">
        {/* Banner Image */}
        {service.image ? (
          <div className="relative h-48 w-full bg-neutral-100">
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Float Icon */}
            <div className="absolute bottom-4 left-5 flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-2 shadow-md flex items-center justify-center">
                <img src={service.icon} alt="" className="w-full h-full object-contain" />
              </div>
              <div className="text-white">
                <span className="text-[10px] tracking-wider uppercase font-semibold text-brand-accentLight">
                  Service {currentIndex + 1}
                </span>
                <h1 className="font-serif text-lg font-bold leading-tight drop-shadow-sm">
                  {service.title}
                </h1>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 border-b border-neutral-100 flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-primarySoft p-2 flex items-center justify-center shrink-0">
              <img src={service.icon} alt="" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-brand-primary">
                Service {currentIndex + 1}
              </span>
              <h1 className="font-serif text-xl font-bold text-brand-dark leading-tight">
                {service.title}
              </h1>
            </div>
          </div>
        )}

        <div className="p-5 md:p-6 space-y-4">
          {/* Main Headline & Lead */}
          <div>
            <h2 className="font-serif text-lg md:text-xl font-bold text-brand-dark mb-2">
              {service.headline}
            </h2>
            <p className="text-xs md:text-[13px] text-neutral-800 font-medium leading-relaxed bg-[#FAF8F5] p-3.5 rounded-2xl border border-brand-accent/20">
              {service.lead}
            </p>
          </div>

          {/* Detailed Paragraphs from Website */}
          <div className="space-y-3 text-xs md:text-[13px] text-neutral-700 leading-relaxed">
            {service.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Key Clinical Focus / Points */}
          {service.keyPoints && service.keyPoints.length > 0 && (
            <div className="pt-2">
              <h3 className="font-serif font-bold text-sm text-brand-dark mb-3">
                How We Address This In Therapy:
              </h3>
              <div className="space-y-2">
                {service.keyPoints.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-neutral-50/80 border border-neutral-200/60">
                    <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <span className="text-xs text-neutral-800 leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Callout */}
          <div className="mt-5 p-4 rounded-2xl bg-brand-primarySoft/60 border border-brand-primary/20 flex flex-col space-y-3">
            <div>
              <h4 className="font-serif font-bold text-xs text-brand-dark">
                {service.ctaText}
              </h4>
              <p className="text-[11px] text-neutral-600 mt-0.5">
                {service.ctaDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => navigate('/contact')}
                className="py-2.5 px-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-1 transition-all"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={doctorData.almaBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-50 text-brand-dark border border-neutral-300 text-xs font-medium flex items-center justify-center space-x-1 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                <span>Book on Alma</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Previous / Next Service Navigator */}
      <div className="grid grid-cols-2 gap-3">
        <Link
          to={`/therapies/${prevService.slug}`}
          className="p-3 bg-white rounded-2xl border border-neutral-100 shadow-2xs hover:border-brand-primary/40 flex items-center space-x-2 transition-all group"
        >
          <ChevronLeft className="w-4 h-4 text-neutral-400 group-hover:text-brand-primary shrink-0" />
          <div className="truncate text-left">
            <span className="text-[10px] text-neutral-400 block uppercase">Previous</span>
            <span className="text-xs font-semibold text-brand-dark truncate block group-hover:text-brand-primary">
              {prevService.shortTitle}
            </span>
          </div>
        </Link>

        <Link
          to={`/therapies/${nextService.slug}`}
          className="p-3 bg-white rounded-2xl border border-neutral-100 shadow-2xs hover:border-brand-primary/40 flex items-center justify-end space-x-2 transition-all group text-right"
        >
          <div className="truncate text-right">
            <span className="text-[10px] text-neutral-400 block uppercase">Next</span>
            <span className="text-xs font-semibold text-brand-dark truncate block group-hover:text-brand-primary">
              {nextService.shortTitle}
            </span>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-brand-primary shrink-0" />
        </Link>
      </div>

      {/* Global Final CTA */}
      <CTASection />
    </div>
  );
}
