import React, { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function FAQAccordion({ items, defaultOpenIndex = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={item.id || idx}
            className={`rounded-2xl transition-all duration-300 border bg-white overflow-hidden ${
              isOpen 
                ? 'border-brand-primary/40 shadow-card ring-2 ring-brand-primary/10' 
                : 'border-neutral-200/80 shadow-2xs hover:shadow-card hover:border-neutral-300'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left p-4 flex items-start justify-between gap-3 focus:outline-hidden group"
              aria-expanded={isOpen}
            >
              <div className="flex items-start space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-all ${
                  isOpen 
                    ? 'bg-brand-primary text-white shadow-2xs' 
                    : 'bg-brand-primarySoft text-brand-primary group-hover:bg-brand-primaryLight'
                }`}>
                  {idx + 1}
                </span>
                <span className={`text-[13px] font-semibold leading-snug transition-colors ${
                  isOpen ? 'text-brand-primaryDark' : 'text-brand-dark group-hover:text-brand-primary'
                }`}>
                  {item.question}
                </span>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 shrink-0 mt-0.5 ${
                isOpen 
                  ? 'bg-brand-primarySoft text-brand-primary rotate-180' 
                  : 'bg-neutral-100 text-neutral-400 group-hover:text-neutral-600'
              }`}>
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 pt-0 animate-in fade-in duration-200">
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#FAF8F5] to-[#F5F1EB] border border-neutral-200/60 text-xs text-neutral-700 leading-relaxed space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-[10px] font-bold text-brand-primary uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-brand-accentDark" />
                    <span>Dr. Anna's Guidance</span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed font-sans text-xs">
                    {item.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
