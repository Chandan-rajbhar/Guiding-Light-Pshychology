import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  ExternalLink, 
  ClipboardCheck, 
  Layers, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { adhdTestingData } from '../data/adhdTesting';
import { doctorData } from '../data/doctor';
import BackButton from '../components/BackButton';
import CTASection from '../components/CTASection';

const featureIcons = {
  ClipboardCheck,
  Layers,
  Users,
  CheckCircle2
};

export default function ADHDTesting() {
  const navigate = useNavigate();
  const [selectedSign, setSelectedSign] = useState('focus');

  return (
    <div className="space-y-6 px-4 py-4 md:px-5">
      <BackButton label="Back to Home" to="/" />

      {/* Hero Card */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-primarySoft text-brand-primary text-xs font-semibold mb-3">
            <Brain className="w-3.5 h-3.5" />
            <span>Diagnostic Assessment</span>
          </div>

          <h1 className="font-serif text-2xl font-bold text-brand-dark tracking-tight leading-snug">
            {adhdTestingData.title}
          </h1>

          <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-sans">
            {adhdTestingData.intro}
          </p>

          <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
            <a
              href={adhdTestingData.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-5 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-xs transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Book Assessment on Alma</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>

            <button
              onClick={() => navigate('/contact')}
              className="py-3 px-4 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-800 border border-neutral-200 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
            >
              <span>Ask a Question</span>
            </button>
          </div>
        </div>
      </div>

      {/* What is ADHD Testing */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-3">
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-primary">Overview</span>
        <h2 className="font-serif font-bold text-lg text-brand-dark">
          {adhdTestingData.whatIsAdhdTesting.heading}
        </h2>
        <p className="text-xs text-neutral-700 leading-relaxed">
          {adhdTestingData.whatIsAdhdTesting.description}
        </p>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {adhdTestingData.features.map((feat, idx) => {
            const Icon = featureIcons[feat.icon] || ClipboardCheck;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-[#FAF8F5] border border-neutral-200/60">
                <div className="w-8 h-8 rounded-xl bg-white shadow-2xs flex items-center justify-center mb-2.5">
                  <Icon className="w-4 h-4 text-brand-primary" />
                </div>
                <h3 className="font-serif font-semibold text-xs text-brand-dark mb-1">
                  {feat.title}
                </h3>
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Signs You May Need ADHD Testing - Interactive Selector */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-3">
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-accentDark">
          Self Reflection
        </span>
        <h2 className="font-serif font-bold text-lg text-brand-dark">
          {adhdTestingData.signsSection.heading}
        </h2>
        <p className="text-xs text-neutral-600 leading-relaxed">
          {adhdTestingData.signsSection.subheading}
        </p>

        {/* Signs Grid / Selector */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          {adhdTestingData.signsSection.signs.map((sign) => {
            const isSelected = selectedSign === sign.id;
            return (
              <button
                key={sign.id}
                onClick={() => setSelectedSign(sign.id)}
                className={`p-3 text-left rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                    : 'bg-neutral-50/80 hover:bg-neutral-100 text-brand-dark border-neutral-200'
                }`}
              >
                <h4 className="text-xs font-semibold leading-tight">{sign.title}</h4>
                <p className={`text-[10px] mt-1 line-clamp-2 ${isSelected ? 'text-white/90' : 'text-neutral-500'}`}>
                  {sign.shortDesc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Sign Detailed Card */}
        {(() => {
          const current = adhdTestingData.signsSection.signs.find(s => s.id === selectedSign);
          if (!current) return null;
          return (
            <div className="mt-3 p-4 rounded-2xl bg-brand-primarySoft/50 border border-brand-primary/20 animate-in fade-in duration-200">
              <div className="flex items-center space-x-2 text-brand-primary font-semibold text-xs mb-1">
                <AlertCircle className="w-4 h-4" />
                <span>Understanding: {current.title}</span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {current.details}
              </p>
            </div>
          );
        })()}
      </div>

      {/* 4-Step Evaluation Process */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-3">
        <h2 className="font-serif font-bold text-lg text-brand-dark">
          The Assessment Process
        </h2>

        <div className="space-y-2.5 pt-1">
          {adhdTestingData.evaluationSteps.map((step) => (
            <div key={step.step} className="flex items-start space-x-3 p-3 rounded-2xl bg-neutral-50 border border-neutral-100">
              <span className="font-mono text-xs font-bold text-brand-primary bg-white px-2 py-1 rounded-lg shadow-2xs shrink-0">
                {step.step}
              </span>
              <div>
                <h4 className="font-serif font-semibold text-xs text-brand-dark">
                  {step.title}
                </h4>
                <p className="text-[11px] text-neutral-600 mt-0.5 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Booking Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-br from-[#FAF8F5] to-[#F1ECE1] border border-brand-accent/40 shadow-xs flex flex-col items-center text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-white shadow-2xs flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-brand-accentDark" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-base text-brand-dark">
            Schedule Your Evaluation
          </h3>
          <p className="text-xs text-neutral-600 max-w-xs mt-1">
            Official assessments are booked securely through Alma for transparent insurance and scheduling.
          </p>
        </div>

        <a
          href={adhdTestingData.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs"
        >
          <span>Open Alma Booking Portal</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Global Final CTA */}
      <CTASection />
    </div>
  );
}
