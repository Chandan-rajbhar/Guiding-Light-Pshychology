import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

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
            className={`rounded-2xl transition-all duration-200 border ${
              isOpen 
                ? 'bg-white border-brand-primary/30 shadow-card' 
                : 'bg-white/80 hover:bg-white border-neutral-200/70 shadow-xs'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full text-left p-4.5 flex items-start justify-between gap-3 focus:outline-hidden"
              aria-expanded={isOpen}
            >
              <div className="flex items-start space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 mt-0.5 ${
                  isOpen ? 'bg-brand-primary text-white' : 'bg-neutral-100 text-neutral-600'
                }`}>
                  {idx + 1}
                </span>
                <span className="text-[13px] md:text-sm font-semibold text-brand-dark leading-snug">
                  {item.question}
                </span>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-brand-muted shrink-0 transition-transform duration-200 mt-0.5 ${
                  isOpen ? 'rotate-180 text-brand-primary' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-neutral-100 text-xs md:text-[13px] text-neutral-700 leading-relaxed animate-in fade-in duration-200">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
