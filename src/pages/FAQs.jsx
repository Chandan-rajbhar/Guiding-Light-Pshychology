import React from 'react';
import { HelpCircle, MessageSquare, Phone, Calendar } from 'lucide-react';
import { faqsData } from '../data/faqs';
import { doctorData } from '../data/doctor';
import FAQAccordion from '../components/FAQAccordion';
import BackButton from '../components/BackButton';
import CTASection from '../components/CTASection';

export default function FAQs() {
  return (
    <div className="space-y-6 px-4 py-4 md:px-5">
      <BackButton label="Back to Home" to="/" />

      {/* Header */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-primarySoft text-brand-primary text-xs font-semibold mb-2">
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

      {/* Accordion List */}
      <FAQAccordion items={faqsData} defaultOpenIndex={0} />

      {/* Still Have Questions Box */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-3">
        <h3 className="font-serif font-bold text-base text-brand-dark">
          Still Have Questions?
        </h3>
        <p className="text-xs text-neutral-600 leading-relaxed">
          I am happy to discuss your specific questions or goals during a free 15-minute phone consultation.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <a
            href={`tel:${doctorData.phone}`}
            className="py-2.5 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-brand-primary" />
            <span>Call {doctorData.phone}</span>
          </a>

          <a
            href={doctorData.almaBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book on Alma</span>
          </a>
        </div>
      </div>

      {/* Bottom CTA */}
      <CTASection />
    </div>
  );
}
