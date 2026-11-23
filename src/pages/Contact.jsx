import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  ExternalLink, 
  Clock, 
  Linkedin, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';
import { doctorData } from '../data/doctor';
import ContactForm from '../components/ContactForm';
import BackButton from '../components/BackButton';

export default function Contact() {
  return (
    <div className="space-y-6 px-4 py-4 md:px-5">
      <BackButton label="Back to Home" to="/" />

      {/* Header */}
      <div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-primary">
          Guiding Light Psychology
        </span>
        <h1 className="font-serif text-2xl font-bold text-brand-dark tracking-tight mt-0.5">
          Get In Touch
        </h1>
        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
          Ready to begin? Contact Guiding Light Psychology today to schedule your free 15-minute phone consultation.
        </p>
      </div>

      {/* Quick Direct Actions Card */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-3">
        <h3 className="font-serif font-bold text-sm text-brand-dark">
          Direct Communication
        </h3>

        <div className="space-y-2">
          {/* Phone call button */}
          <a
            href={`tel:${doctorData.phone}`}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-primarySoft/60 hover:bg-brand-primarySoft border border-brand-primary/15 transition-all group"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-white shadow-2xs flex items-center justify-center text-brand-primary">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-brand-primary block">Phone Consultation</span>
                <span className="text-xs font-semibold text-brand-dark group-hover:text-brand-primary">
                  {doctorData.phone}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-brand-primary">Tap to Call</span>
          </a>

          {/* Email button */}
          <a
            href={`mailto:${doctorData.email}`}
            className="flex items-center justify-between p-3.5 rounded-2xl bg-neutral-50 hover:bg-neutral-100/80 border border-neutral-200/70 transition-all group"
          >
            <div className="flex items-center space-x-3 truncate">
              <div className="w-9 h-9 rounded-xl bg-white shadow-2xs flex items-center justify-center text-brand-primary shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="text-[10px] uppercase font-semibold text-neutral-500 block">Email Inquiries</span>
                <span className="text-xs font-semibold text-brand-dark truncate block group-hover:text-brand-primary">
                  {doctorData.email}
                </span>
              </div>
            </div>
            <span className="text-xs font-medium text-neutral-500 shrink-0 ml-2">Email</span>
          </a>

          {/* Virtual Practice Location */}
          <div className="flex items-center space-x-3 p-3.5 rounded-2xl bg-[#FAF8F5] border border-neutral-200/60">
            <div className="w-9 h-9 rounded-xl bg-white shadow-2xs flex items-center justify-center text-brand-accentDark shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-neutral-500 block">Practice Availability</span>
              <span className="text-xs font-semibold text-brand-dark">
                {doctorData.location}
              </span>
            </div>
          </div>
        </div>

        {/* Alma External Booking Card */}
        <div className="pt-2">
          <a
            href={doctorData.almaBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-xs hover:shadow-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-accentLight" />
            <span>Book Directly on Alma</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>

      {/* Interactive Contact Form */}
      <ContactForm />

      {/* Professional Profiles */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0077b5]/10 flex items-center justify-center text-[#0077b5]">
            <Linkedin className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-brand-dark">LinkedIn Profile</h4>
            <p className="text-[11px] text-neutral-500">Connect with Dr. Anna Shtrauh</p>
          </div>
        </div>
        <a
          href={doctorData.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-1.5 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-medium text-neutral-700 flex items-center space-x-1"
        >
          <span>View</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Footer Info */}
      <div className="text-center py-4 text-[11px] text-neutral-400 space-y-1">
        <p>Guiding Light Psychology • All Rights Reserved</p>
        <p>Providing telehealth and psychological care nationwide</p>
      </div>
    </div>
  );
}
