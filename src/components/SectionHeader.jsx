import React from 'react';

export default function SectionHeader({ title, subtitle, badge, align = 'left', className = '' }) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col ${alignClass} mb-4 ${className}`}>
      {badge && (
        <span className="inline-block px-2.5 py-0.5 mb-2 text-[11px] font-semibold tracking-wider uppercase text-brand-primary bg-brand-primaryLight/80 rounded-full">
          {badge}
        </span>
      )}
      <h2 className="text-xl md:text-2xl font-serif font-bold text-brand-dark tracking-tight leading-snug">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1.5 text-xs text-neutral-600 leading-relaxed max-w-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
