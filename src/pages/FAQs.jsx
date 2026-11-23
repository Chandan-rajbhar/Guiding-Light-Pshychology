import React from 'react';
import { HelpCircle, MessageSquare, Phone, Calendar } from 'lucide-react';
import { faqsData } from '../data/faqs';
import { doctorData } from '../data/doctor';
import FAQAccordion from '../components/FAQAccordion';
import BackButton from '../components/BackButton';
import CTASection from '../components/CTASection';

export default function FAQs() {
  return (
    <div className="space-y-4 px-4 pt-2.5 pb-6 md:px-5">
      {/* Header with Back Button and Title (tight spacing) */}
      <div>
        <BackButton label="Back to Home" to="/" />
        <div className="mt-1">
          <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-brand-primarySoft text-brand-primary text-[11px] font-semibold mb-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h1 className="font-serif text-2xl font-bold text-brand-dark tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            Helpful answers regarding therapy sessions, scheduling, clinical approach, and what to expect.
          </p>
        </div>
      </div>

      {/* Accordion List */}
      <FAQAccordion items={faqsData} defaultOpenIndex={0} />

      {/* Still Have Questions Box - Polished Personal Card */}
      <div className="bg-white rounded-3xl p-4.5 border border-neutral-100 shadow-sm space-y-3">
        <div className="flex items-center space-x-3">
          <img
            src={doctorData.photo}
            alt="Dr. Anna"
            className="w-11 h-11 rounded-2xl object-cover ring-2 ring-brand-primary/20 shadow-2xs shrink-0"
          />
          <div>
            <h3 className="font-serif font-bold text-sm text-brand-dark">
              Still Have Questions?
            </h3>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Discuss your goals directly during a free 15-minute phone consultation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1">
          <a
            href={`tel:${doctorData.phone}`}
            className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-neutral-50 border border-neutral-200/90 text-xs font-semibold text-neutral-800 flex items-center justify-center space-x-1.5 transition-all shadow-2xs active:scale-[0.98] whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            <span>Call Doctor</span>
          </a>

          <a
            href={doctorData.almaBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-2xs active:scale-[0.98] whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>Book on Alma</span>
          </a>
        </div>
      </div>

      {/* Bottom CTA */}
      <CTASection />
    </div>
  );
}
